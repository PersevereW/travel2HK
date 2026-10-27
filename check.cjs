// No dependencies: validate data integrity, budget math and untrusted backup imports.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const nodes = new Map();
const node = selector => {
  if (!nodes.has(selector)) nodes.set(selector, { textContent: '', innerHTML: '', style: {}, addEventListener() {}, classList: { toggle() {} } });
  return nodes.get(selector);
};
const context = vm.createContext({
  document: { querySelector: node, querySelectorAll: () => [] },
  window: { addEventListener() {} }, location: { hash: '#itinerary' },
  localStorage: { getItem: () => null, setItem() {} },
  setTimeout: () => 0, clearTimeout() {}, console
});
for (const name of ['data.js', 'app.js']) vm.runInContext(fs.readFileSync(path.join(__dirname, name), 'utf8'), context);
vm.runInContext(`
 const assertTest = (condition, message) => { if (!condition) throw new Error(message); };
 assertTest(DAYS.length === 4 && DAYS.flatMap(d=>d.events).length === 26, 'Four days / 26 stops');
 assertTest(ids.size === 26, 'Event identifiers unique');
 assertTest(PORTS.length === 17, '13 Hong Kong controls + 3 Macau controls + other ferry');
 assertTest(PORTS.every(p=>SOURCES.some(s=>s.id===p.source)), 'Port sources exist');
 for (const d of DAYS) for (const e of d.events) if (e.next) assertTest(SOURCES.some(s=>s.id===e.next.source), 'Transport sources exist');
 const total = transportTotals();
 assertTest(total.hkd === 295.3 && total.mop === 6 && total.cnyLow === 146 && total.cnyHigh === 210, 'Currency totals');
 assertTest(validate(defaultState()).version === 2, 'Default backup valid');
 assertTest(tripBudget() === 2913, 'Two Hong Kong nights in HKD, one Zhuhai night in CNY');
 for(const d of DAYS.slice(0,3))assertTest(!d.events.some(e=>e.title.includes('返回深圳')||e.title.includes('罗湖酒店')), 'No repeated Shenzhen overnight');
 assertTest(DAYS[2].events.some(e=>e.title.includes('珠海拱北入住')), 'Sunday overnight in Zhuhai');
 assertTest(DAYS[3].events.some(e=>e.title.includes('莲花山')), 'Monday Shenzhen sightseeing');
 let oldRejected=false;try{validate({...defaultState(),version:1})}catch{oldRejected=true}assertTest(oldRejected,'Old route backups cannot replace new plan');
 const bad = [null, {}, {...defaultState(),day:99}, {...defaultState(),checks:[99]}, {...defaultState(),events:{alien:{done:true}}}, {...defaultState(),events:{'v2-f1':{done:'yes'}}}, {...defaultState(),budget:{...defaultState().budget,hkd:0}}, {...defaultState(),budget:{...defaultState().budget,hotel:NaN}}];
 for(const value of bad){let rejected=false;try{validate(value)}catch{rejected=true}assertTest(rejected,'Invalid backup rejected');}
 assertTest(esc('<img onerror="x">').includes('&lt;'), 'User text escaped');
 state.events['v2-f1']={title:'<script>alert(1)</script>',note:'"quoted"',done:true};
 assertTest(renderEvent(DAYS[0].events[0]).includes('&lt;script&gt;'), 'Imported text rendered safely');
 for(const name of Object.keys(pages)) {location.hash='#'+name; render(); assertTest(document.querySelector('#main').innerHTML.length>100, 'Page rendered: '+name);}
`, context);
assert.ok(nodes.get('#main').innerHTML.includes('数据来源'));
const legacy = {version:1, note:'保留我的总备注', events:{f1:{title:'旧版酒店，不应覆盖新路线'}}, budget:{food:190,other:80,hkd:0.91,mop:0.88}};
context.localStorage.getItem = key => key === 'travel_to_HK_v1' ? JSON.stringify(legacy) : null;
const migrated = vm.createContext({...context});
for (const name of ['data.js', 'app.js']) vm.runInContext(fs.readFileSync(path.join(__dirname, name), 'utf8'), migrated);
assert.equal(vm.runInContext('state.note', migrated), legacy.note);
assert.equal(vm.runInContext('Object.keys(state.events).length', migrated), 0);
assert.equal(vm.runInContext('state.budget.hotel', migrated), 650);
assert.equal(vm.runInContext('state.budget.zhuhai', migrated), 280);
assert.equal(vm.runInContext('state.budget.food', migrated), 190);
assert.equal(vm.runInContext('legacyBackup.events.f1.title', migrated), legacy.events.f1.title);
console.log('PASS: data, totals, backup validation, text escaping, and all five pages.');
