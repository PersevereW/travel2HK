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
 assertTest(DAYS.length === 4 && DAYS.flatMap(d=>d.events).length === 32, 'Four days / 32 stops');
 assertTest(ids.size === 32, 'Event identifiers unique');
 assertTest(PORTS.length === 17, '13 Hong Kong controls + 3 Macau controls + other ferry');
 assertTest(PORTS.every(p=>SOURCES.some(s=>s.id===p.source)), 'Port sources exist');
 for (const d of DAYS) for (const e of d.events) if (e.next) assertTest(SOURCES.some(s=>s.id===e.next.source), 'Transport sources exist');
 const total = transportTotals();
 assertTest(total.hkd === 348.9 && total.mop === 6 && total.cnyLow === 146 && total.cnyHigh === 210, 'Currency totals');
 assertTest(validate(defaultState()).version === 3, 'Default backup valid');
 assertTest(tripBudget() === 2962, 'Two Hong Kong nights in HKD, one Zhuhai night in CNY');
 for(const d of DAYS.slice(0,3))assertTest(!d.events.some(e=>e.title.includes('返回深圳')||e.title.includes('罗湖酒店')), 'No repeated Shenzhen overnight');
 assertTest(DAYS[2].events.some(e=>e.title.includes('珠海拱北入住')), 'Sunday overnight in Zhuhai');
 assertTest(DAYS[3].events.some(e=>e.title.includes('莲花山')), 'Monday Shenzhen sightseeing');
 let oldRejected=false;try{validate({...defaultState(),version:2})}catch{oldRejected=true}assertTest(oldRejected,'Old route backups cannot replace new plan');
 const bad = [null, {}, {...defaultState(),day:99}, {...defaultState(),checks:[99]}, {...defaultState(),events:{alien:{done:true}}}, {...defaultState(),events:{'v3-f1':{done:'yes'}}}, {...defaultState(),budget:{...defaultState().budget,hkd:0}}, {...defaultState(),budget:{...defaultState().budget,hotel:NaN}}];
 for(const value of bad){let rejected=false;try{validate(value)}catch{rejected=true}assertTest(rejected,'Invalid backup rejected');}
 assertTest(PHOTO_SPOTS.length===9 && PHOTO_CREDITS.length===9, 'Nine licensed photo references');
 assertTest(new Set(PHOTO_SPOTS.map(p=>p.id)).size===9,'Unique photo spot ids');
 for(const d of DAYS){assertTest(d.route.length>0 && d.routeNote,'Daily geographic route');for(const e of d.events)for(const id of e.photoIds||[])assertTest(spotIds.has(id),'Event photo references resolve');}
 for(const spot of PHOTO_SPOTS){const c=PHOTO_CREDITS.find(c=>c.id===spot.image);assertTest(c?.path.startsWith('assets/photos/')&&c.source.startsWith('https://commons.wikimedia.org/')&&c.license&&c.licenseUrl.startsWith('https://'), 'Photo attribution metadata');}
 for(const shots of [['unknown'],['look-left','look-left'],null]){let rejected=false;try{validate({...defaultState(),shots})}catch{rejected=true}assertTest(rejected,'Invalid photo checklists rejected');}
 assertTest(DAYS[1].events.some(e=>e.next?.mode.includes('H1')&&e.next.note.includes('12 →')), 'Bus boards in Wan Chai to skip Central');
 const starLegs=DAYS.flatMap(d=>d.events).filter(e=>e.next?.source==='starferry');
 assertTest(starLegs.length===1 && DAYS[0].events.includes(starLegs[0]),'Star Ferry once on Friday, not on luggage-transfer Sunday');
 assertTest(starLegs[0].next.amount===5 && starLegs[0].next.to==='尖沙咀天星码头','Friday upper-deck fare and destination');
 assertTest(DAYS[0].events.findIndex(e=>e.id==='v3-f7')<DAYS[0].events.findIndex(e=>e.id==='v3-f6'),'Stone steps then Pedder Street then north to pier');
 const priorV3={...defaultState(),events:{'v3-f7':{note:'保留我原来的石板街备注'}},shots:['look-left']};
 assertTest(validate(priorV3).shots[0]==='look-left','Existing v3 saved checklist remains valid');
 assertTest(esc('<img onerror="x">').includes('&lt;'), 'User text escaped');
 state.events['v3-f1']={title:'<script>alert(1)</script>',note:'"quoted"',done:true};
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

const oldV2={...legacy,version:2,budget:{hotel:700,zhuhai:300,food:200,other:150,hkd:0.92,mop:0.89},events:{'v2-f1':{title:'Old Friday must not override'},'v2-m4':{note:'保留周一笔记'}}};
migrated.legacyForTest=oldV2;
assert.equal(vm.runInContext('migrateLegacy(legacyForTest).events["v2-m4"].note',migrated),'保留周一笔记');
assert.equal(vm.runInContext('migrateLegacy(legacyForTest).events["v2-f1"]',migrated),undefined);
assert.equal(vm.runInContext('migrateLegacy(legacyForTest).budget.hotel',migrated),700);
for(const c of vm.runInContext('PHOTO_CREDITS',migrated))assert.ok(fs.statSync(path.join(__dirname,c.path)).size>1000, 'Local photo exists');

console.log('PASS: data, totals, backup validation, text escaping, and all six pages.');
