#!/usr/bin/env python3
"""Username-scoped travel notebooks, using only Python's standard library."""
import argparse
import hashlib
import json
import math
import os
import secrets
import sqlite3
import time
import unicodedata
from contextlib import contextmanager
from http import cookies
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parent
SCHEMA = json.loads((ROOT / 'state-schema.json').read_text(encoding='utf-8'))
MAX_USERS = 10  # Includes the reserved qhw administrator.
SESSION_AGE = 7 * 24 * 3600
PUBLIC_FILES = {'index.html', 'style.css', 'data.js', 'guide-data.js', 'app.js'}


def username(value):
    if not isinstance(value, str):
        raise ValueError('请输入用户名')
    value = unicodedata.normalize('NFKC', value.strip()).lower()
    if not 1 <= len(value) <= 8 or not all(c.isalnum() or c in '_-' for c in value):
        raise ValueError('用户名限1–8个字母、数字、汉字、下划线或短横线')
    return value


def validate_state(value):
    if not isinstance(value, dict) or set(value) != {'version', 'day', 'events', 'checks', 'shots', 'note', 'stay', 'budget'}:
        raise ValueError('手帐字段不正确')
    if type(value['version']) is not int or value['version'] != 3 or type(value['day']) is not int or not 0 <= value['day'] <= 3:
        raise ValueError('手帐版本或日期不正确')
    if not isinstance(value['note'], str) or len(value['note']) > 20000 or value['stay'] not in ('jordan', 'tsimshatsui', 'sheungwan'):
        raise ValueError('备注或住宿格式不正确')
    for field, allowed in [('checks', range(SCHEMA['checkCount'])), ('shots', SCHEMA['photoIds'])]:
        items = value[field]
        if not isinstance(items, list) or len(items) > len(allowed):
            raise ValueError('清单格式不正确')
        if field == 'checks' and any(type(item) is not int for item in items):
            raise ValueError('清单编号不正确')
        if field == 'shots' and any(not isinstance(item, str) for item in items):
            raise ValueError('拍照编号不正确')
        if any(item not in allowed for item in items) or len(set(items)) != len(items):
            raise ValueError('清单包含未知或重复项目')
    events = value['events']
    if not isinstance(events, dict) or len(events) > len(SCHEMA['eventIds']):
        raise ValueError('行程格式不正确')
    for key, event in events.items():
        if key not in SCHEMA['eventIds'] or not isinstance(event, dict) or set(event) - {'time', 'title', 'description', 'note', 'done'}:
            raise ValueError('行程字段不正确')
        for field, item in event.items():
            if field == 'done':
                if type(item) is not bool:
                    raise ValueError('完成状态不正确')
            elif not isinstance(item, str) or len(item) > 3000 or (field in ('time', 'title', 'description') and not item.strip()):
                raise ValueError('行程文字不正确')
    budget = value['budget']
    if not isinstance(budget, dict) or set(budget) != {'hotel', 'zhuhai', 'food', 'other', 'hkd', 'mop'}:
        raise ValueError('预算字段不正确')
    for key, amount in budget.items():
        if type(amount) not in (int, float) or not math.isfinite(amount) or not 0 <= amount < 100000 or (key in ('hkd', 'mop') and amount <= 0):
            raise ValueError('预算数值不正确')
    return value


class TravelServer(ThreadingHTTPServer):
    def __init__(self, address, db_path):
        self.db_path = str(db_path)
        Path(db_path).parent.mkdir(parents=True, exist_ok=True)
        with self.db() as db:
            db.executescript('''
                PRAGMA journal_mode=WAL;
                CREATE TABLE IF NOT EXISTS users (
                    username TEXT PRIMARY KEY, state TEXT, revision INTEGER NOT NULL DEFAULT 0,
                    created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL);
                CREATE TABLE IF NOT EXISTS sessions (
                    token TEXT PRIMARY KEY, username TEXT NOT NULL REFERENCES users(username) ON DELETE CASCADE,
                    expires_at INTEGER NOT NULL);
            ''')
            now = int(time.time())
            db.execute('INSERT OR IGNORE INTO users(username, created_at, updated_at) VALUES(?,?,?)', ('qhw', now, now))
            db.execute('DELETE FROM sessions WHERE expires_at < ?', (now,))
        super().__init__(address, Handler)

    @contextmanager
    def db(self):
        db = sqlite3.connect(self.db_path, timeout=10)
        db.row_factory = sqlite3.Row
        db.execute('PRAGMA foreign_keys=ON')
        try:
            with db:
                yield db
        finally:
            db.close()


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def log_message(self, fmt, *args):
        # Do not log cookie tokens or request bodies.
        super().log_message(fmt, *args)

    def end_headers(self):
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

    def respond(self, status, data, cookie=None):
        body = json.dumps(data, ensure_ascii=False, allow_nan=False).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        if cookie:
            self.send_header('Set-Cookie', cookie)
        self.end_headers()
        self.wfile.write(body)

    def session_token(self):
        jar = cookies.SimpleCookie()
        try:
            jar.load(self.headers.get('Cookie', ''))
            token = jar['travel_session'].value if 'travel_session' in jar else ''
        except cookies.CookieError:
            token = ''
        return hashlib.sha256(token.encode()).hexdigest()

    def current_user(self, db):
        return db.execute('SELECT u.* FROM users u JOIN sessions s USING(username) WHERE s.token=? AND s.expires_at>?',
                          (self.session_token(), int(time.time()))).fetchone()

    def session_cookie(self, token, age):
        secure = '; Secure' if self.headers.get('Origin', '').startswith('https://') or self.headers.get('X-Forwarded-Proto') == 'https' else ''
        return f'travel_session={token}; Path=/; HttpOnly; SameSite=Lax; Max-Age={age}{secure}'

    @staticmethod
    def profile(row):
        return {'username': row['username'], 'isAdmin': row['username'] == 'qhw'}

    def request_body(self):
        origin = self.headers.get('Origin')
        if self.headers.get('Sec-Fetch-Site') == 'cross-site' or (origin and urlsplit(origin).netloc != self.headers.get('Host')):
            raise PermissionError('拒绝跨站写入')
        if self.headers.get_content_type() != 'application/json':
            raise ValueError('请求须为JSON')
        length = int(self.headers.get('Content-Length', '0'))
        if not 0 < length <= 200000 or self.headers.get('Transfer-Encoding'):
            raise ValueError('请求为空或过大')
        data = json.loads(self.rfile.read(length), parse_constant=lambda _: (_ for _ in ()).throw(ValueError('非法数值')))
        if not isinstance(data, dict):
            raise ValueError('请求须为JSON对象')
        return data

    def do_GET(self):
        route = urlsplit(self.path).path
        if route == '/api/me':
            with self.server.db() as db:
                row = self.current_user(db)
            self.respond(200, {'user': self.profile(row) if row else None,
                              'state': json.loads(row['state']) if row and row['state'] else None,
                              'revision': row['revision'] if row else 0})
        elif route == '/api/users':
            with self.server.db() as db:
                row = self.current_user(db)
                if not row or row['username'] != 'qhw':
                    self.respond(403, {'error': '仅qhw管理员可以查看用户列表'})
                    return
                rows = db.execute('SELECT username, created_at, updated_at FROM users ORDER BY created_at, username').fetchall()
            self.respond(200, {'users': [dict(r) for r in rows], 'limit': MAX_USERS})
        elif route.startswith('/api/'):
            self.respond(404, {'error': '接口不存在'})
        elif self.public_path(route):
            super().do_GET()
        else:
            self.send_error(404)

    def public_path(self, route):
        path = unquote(route).lstrip('/') or 'index.html'
        target = (ROOT / path).resolve()
        if not target.is_relative_to(ROOT) or not target.is_file():
            return False
        return path in PUBLIC_FILES or (path.startswith('assets/photos/') and target.suffix.lower() in ('.jpg', '.png', '.webp'))

    def do_HEAD(self):
        if self.public_path(urlsplit(self.path).path):
            super().do_HEAD()
        else:
            self.send_error(404)

    def do_POST(self):
        self.mutate('POST')

    def do_PUT(self):
        self.mutate('PUT')

    def do_DELETE(self):
        self.mutate('DELETE')

    def mutate(self, method):
        try:
            data = self.request_body()
            route = urlsplit(self.path).path
            with self.server.db() as db:
                db.execute('BEGIN IMMEDIATE')
                row = self.current_user(db)
                if method == 'POST' and route == '/api/login':
                    name = username(data.get('username'))
                    target = db.execute('SELECT * FROM users WHERE username=?', (name,)).fetchone()
                    now = int(time.time())
                    if not target:
                        if db.execute('SELECT count(*) FROM users').fetchone()[0] >= MAX_USERS:
                            self.respond(409, {'error': '最多10个用户名（含qhw），请联系管理员删除闲置用户；已有用户名仍可登录'})
                            return
                        db.execute('INSERT INTO users(username,created_at,updated_at) VALUES(?,?,?)', (name, now, now))
                        target = db.execute('SELECT * FROM users WHERE username=?', (name,)).fetchone()
                    token = secrets.token_urlsafe(32)
                    db.execute('DELETE FROM sessions WHERE token=? OR expires_at<?', (self.session_token(), now))
                    db.execute('INSERT INTO sessions VALUES(?,?,?)', (hashlib.sha256(token.encode()).hexdigest(), name, now + SESSION_AGE))
                    db.commit()
                    self.respond(200, {'user': self.profile(target), 'state': json.loads(target['state']) if target['state'] else None,
                                       'revision': target['revision']}, self.session_cookie(token, SESSION_AGE))
                elif method == 'POST' and route == '/api/logout':
                    db.execute('DELETE FROM sessions WHERE token=?', (self.session_token(),))
                    db.commit()
                    self.respond(200, {'ok': True}, self.session_cookie('', 0))
                elif not row:
                    self.respond(401, {'error': '请先输入用户名登录；账户可能已删除或登录过期'})
                elif method == 'PUT' and route == '/api/state':
                    if data.get('username') != row['username']:
                        self.respond(409, {'error': '登录用户已在其他页面切换，请先导出本页备份，再刷新'})
                        return
                    revision = data.get('revision')
                    if type(revision) is not int or revision != row['revision']:
                        self.respond(409, {'error': '同一用户名的数据已在其他页面更新，请先导出本页备份，再刷新获取最新数据'})
                        return
                    state = validate_state(data.get('state'))
                    db.execute('UPDATE users SET state=?, revision=revision+1, updated_at=? WHERE username=?',
                               (json.dumps(state, ensure_ascii=False, allow_nan=False), int(time.time()), row['username']))
                    db.commit()
                    self.respond(200, {'revision': revision + 1})
                elif method == 'DELETE' and route.startswith('/api/users/'):
                    if row['username'] != 'qhw':
                        self.respond(403, {'error': '仅qhw管理员可以删除用户'})
                        return
                    name = username(unquote(route[len('/api/users/'):]))
                    if name == 'qhw':
                        self.respond(403, {'error': '保留qhw管理员，不能删除'})
                        return
                    deleted = db.execute('DELETE FROM users WHERE username=?', (name,)).rowcount
                    db.commit()
                    self.respond(200 if deleted else 404, {'ok': True} if deleted else {'error': '用户不存在'})
                else:
                    self.respond(404, {'error': '接口不存在'})
        except PermissionError as error:
            self.respond(403, {'error': str(error)})
        except (ValueError, TypeError, UnicodeError, json.JSONDecodeError, RecursionError):
            self.respond(400, {'error': '请求格式、用户名或手帐数据不正确'})
        except sqlite3.Error:
            self.respond(503, {'error': '数据库暂时不可用，请保留页面并稍后重试'})


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--host', default='127.0.0.1')
    parser.add_argument('--port', type=int, default=8766)
    parser.add_argument('--db', default=str(ROOT / 'storage' / 'travel.sqlite3'))
    args = parser.parse_args()
    server = TravelServer((args.host, args.port), args.db)
    print(f'Travel planner: http://{args.host}:{server.server_port}', flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == '__main__':
    main()
