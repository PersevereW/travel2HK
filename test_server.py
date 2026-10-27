"""Run with python3 -m unittest -v test_server.py (no extra packages)."""
import concurrent.futures
import copy
import http.client
import json
import tempfile
import threading
import unittest
from pathlib import Path

from server import TravelServer

DEFAULT = {'version': 3, 'day': 0, 'events': {}, 'checks': [], 'shots': [], 'note': '', 'stay': 'jordan',
           'budget': {'hotel': 650, 'zhuhai': 280, 'food': 200, 'other': 150, 'hkd': 0.92, 'mop': 0.89}}


class Client:
    def __init__(self, port):
        self.port, self.cookie = port, ''

    def call(self, path, method='GET', data=None, headers=None):
        conn = http.client.HTTPConnection('127.0.0.1', self.port, timeout=5)
        request_headers = {'Cookie': self.cookie}
        if data is not None:
            request_headers['Content-Type'] = 'application/json'
        request_headers.update(headers or {})
        conn.request(method, path, json.dumps(data) if data is not None else None, request_headers)
        response = conn.getresponse()
        if response.getheader('Set-Cookie'):
            self.cookie = response.getheader('Set-Cookie').split(';')[0]
        raw, status = response.read(), response.status
        conn.close()
        try:
            return status, json.loads(raw)
        except ValueError:
            return status, raw

    def login(self, name):
        return self.call('/api/login', 'POST', {'username': name})

    def save(self, name, state, revision=0):
        return self.call('/api/state', 'PUT', {'username': name, 'state': state, 'revision': revision})


class AccountsTest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.db = Path(self.temp.name) / 'private.sqlite3'
        self.server = TravelServer(('127.0.0.1', 0), self.db)
        self.thread = threading.Thread(target=self.server.serve_forever, daemon=True)
        self.thread.start()
        self.port = self.server.server_port
        self.client = Client(self.port)

    def tearDown(self):
        self.server.shutdown()
        self.server.server_close()
        self.thread.join()
        self.temp.cleanup()

    def test_guest_readonly_and_admin_routes_protected(self):
        status, body = self.client.call('/api/me')
        self.assertEqual((status, body['user'], body['state']), (200, None, None))
        self.assertEqual(self.client.save('alice', DEFAULT)[0], 401)
        self.assertEqual(self.client.call('/api/users')[0], 403)
        self.client.login('alice')
        self.assertEqual(self.client.call('/api/users')[0], 403)
        self.assertEqual(self.client.call('/api/users/qhw', 'DELETE', {})[0], 403)
        for resource in ['/server.py', '/storage/travel.sqlite3', '/.git/config', '/%2e%2e/server.py', '/research/ant-hk-faq.txt']:
            self.assertEqual(self.client.call(resource)[0], 404)

    def test_user_state_isolation_and_persistence(self):
        self.assertEqual(self.client.login('alice')[1]['state'], None)
        changed = copy.deepcopy(DEFAULT)
        changed.update(note='alice自己的备注', checks=[7, 13], shots=['star-ferry'])
        changed['events'] = {'v3-f1': {'done': True, 'note': '<script>stored as text</script>'}}
        self.assertEqual(self.client.save('alice', changed)[0], 200)
        bob = Client(self.port)
        self.assertEqual(bob.login('bob')[1]['state'], None)
        self.assertEqual(bob.call('/api/me')[1]['user']['username'], 'bob')
        self.assertEqual(Client(self.port).login('alice')[1]['state'], changed)
        # Storage survives a fresh server instance using the same SQLite file.
        self.server.shutdown()
        self.server.server_close()
        self.thread.join()
        self.server = TravelServer(('127.0.0.1', 0), self.db)
        self.thread = threading.Thread(target=self.server.serve_forever, daemon=True)
        self.thread.start()
        self.port = self.server.server_port
        self.assertEqual(Client(self.port).login('alice')[1]['state'], changed)

    def test_username_validation_and_normalization(self):
        for name in ['', '123456789', '../qhw', '<img>', 'a b', None, ['qhw']]:
            self.assertEqual(self.client.login(name)[0], 400, repr(name))
        self.assertEqual(self.client.login('汉字用户1234')[0], 200)
        status, result = self.client.login(' QHW ')
        self.assertEqual((status, result['user']), (200, {'username': 'qhw', 'isAdmin': True}))
        self.assertEqual(self.client.login('ｑｈｗ')[1]['user']['username'], 'qhw')

    def test_ten_user_limit_is_atomic_and_existing_users_can_login(self):
        with concurrent.futures.ThreadPoolExecutor(max_workers=16) as pool:
            codes = list(pool.map(lambda i: Client(self.port).login('user'+str(i))[0], range(16)))
        self.assertEqual(codes.count(200), 9)  # Reserved qhw is the tenth slot.
        self.assertEqual(codes.count(409), 7)
        self.assertEqual(self.client.login('qhw')[0], 200)
        rows = self.client.call('/api/users')[1]['users']
        self.assertEqual(len(rows), 10)
        self.assertEqual(Client(self.port).login(rows[-1]['username'])[0], 200)
        self.assertFalse(any('state' in row for row in rows))

    def test_delete_clears_state_sessions_and_frees_slot(self):
        self.client.login('alice')
        self.client.save('alice', DEFAULT)
        admin = Client(self.port)
        admin.login('qhw')
        self.assertEqual(admin.call('/api/users/qhw', 'DELETE', {})[0], 403)
        self.assertEqual(admin.call('/api/users/alice', 'DELETE', {})[0], 200)
        self.assertEqual(self.client.call('/api/me')[1]['user'], None)
        self.assertEqual(self.client.save('alice', DEFAULT, 1)[0], 401)
        self.assertEqual(Client(self.port).login('alice')[1]['state'], None)
        self.assertEqual(admin.call('/api/users/missing', 'DELETE', {})[0], 404)

    def test_stale_revision_and_cross_tab_account_switch_cannot_overwrite(self):
        self.client.login('alice')
        other = Client(self.port)
        other.login('alice')
        self.assertEqual(self.client.save('alice', DEFAULT)[0], 200)
        self.assertEqual(other.save('alice', DEFAULT)[0], 409)
        self.client.login('bob')
        self.assertEqual(self.client.save('alice', DEFAULT)[0], 409)
        self.assertIsNone(self.client.call('/api/me')[1]['state'])

    def test_invalid_backups_rejected_and_logout_revokes_session(self):
        self.client.login('alice')
        bad = [None, {}, {**DEFAULT, 'day': True}, {**DEFAULT, 'checks': [True]}, {**DEFAULT, 'checks': [999]},
               {**DEFAULT, 'shots': ['unknown']}, {**DEFAULT, 'events': {'unknown': {'done': True}}},
               {**DEFAULT, 'budget': {**DEFAULT['budget'], 'hkd': 0}}, {**DEFAULT, 'note': 'x'*20001}]
        for state in bad:
            self.assertEqual(self.client.save('alice', state)[0], 400)
        self.assertEqual(self.client.call('/api/logout', 'POST', {})[0], 200)
        self.assertIsNone(self.client.call('/api/me')[1]['user'])
        self.assertEqual(self.client.save('alice', DEFAULT)[0], 401)

    def test_cross_site_write_rejected(self):
        self.assertEqual(self.client.call('/api/login', 'POST', {'username': 'alice'}, {'Origin': 'https://elsewhere.example'})[0], 403)
        self.assertEqual(self.client.call('/api/login', 'POST', {'username': 'alice'}, {'Sec-Fetch-Site': 'cross-site'})[0], 403)
        self.assertEqual(self.client.call('/api/login', 'POST', {'username': 'alice'}, {'Content-Type': 'text/plain'})[0], 400)


if __name__ == '__main__':
    unittest.main()
