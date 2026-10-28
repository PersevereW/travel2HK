'use strict';
// Checked 2026-10-27. Keep checklist indices 0–6 stable for existing v3 backups.
SOURCES.push(
 {id:'halloween',name:'香港旅发局 · 2026 全城万圣节活动',url:'https://www.discoverhongkong.com/eng/events/halloween/citywide-halloween-cosplay-celebration.html',detail:'核对2026年日期：皇后像广场装置17–31日；31日中环、兰桂坊、旺角及尖东设活动。仅把与行程日期和方向匹配的项目纳入默认路线。'},
 {id:'halloweentst',name:'尖沙咀中心 / 帝国中心 · TST East Halloween Beats',url:'https://www.tsimshatsuicentre.com.hk/sc/promotions/tst-east-halloween-beats/',detail:'10月31日么地道花园16:00–23:00，免费入场；市集16:00起，DJ19:00起。默认只作傍晚短逛，不声称该时段有DJ。'},
 {id:'halloweenlkf',name:'兰桂坊协会 · LKF Halloween 2026',url:'https://lankwaifong.com/pages/lkf-halloween-2026',detail:'31日为 Monsters Night；街区活动与酒吧消费分开，不把30日写成31日主题派对。'},
 {id:'halloweenmonth',name:'香港旅发局 · 万圣月、主题乐园及特别电车',url:'https://www.discoverhongkong.com/eng/events/halloween.html',detail:'主题乐园另购票；万圣特别电车及观光巴士需满足装扮、指定消费及换票规则，与本行程普通电车 / H1 不同。'},
 {id:'hsbcapp',name:'汇丰香港 · 手机开户资格与流程',url:'https://www.hsbc.com.hk/ways-to-bank/mobile-apps/banking/account-opening/',detail:'页面包含指定地区 / 证件手机申请及非HKID分行预约说明；按实际App入口核验，不保证每位访客都能纯线上完成。'},
 {id:'hsbccard',name:'汇丰香港 · Mastercard 借记卡（蓝狮子）',url:'https://www.hsbc.com.hk/zh-cn/debit-cards/products/mastercard-debit-card/',detail:'借记卡关联汇丰One等合资格综合账户，可在开户时或App内申请；不是独立存款账户或信用卡。'},
 {id:'za',name:'众安银行 · 访港旅客开户资格',url:'https://bank.za.group/faqs/Individuals/Account_opening/Open_an_account_for_a_visitor_in_HongKong/66503e51b359be4a195230e8',detail:'18岁以上、在港、有效内地身份证、可收短信的内地手机号、同手机号内地储蓄卡及国家移民管理局记录。'},
 {id:'zafees',name:'众安银行 · 银行收费表',url:'https://bank.za.group/',detail:'从官网进入银行收费表核对账户与卡片费用；无账户管理费不代表实体卡、汇款及所有交易免费。'},
 {id:'anthk',name:'蚂蚁银行香港 · 常见问题 / 访港旅客',url:'https://www.antbank.hk/questions?lang=zh_hk',detail:'浏览器读取动态FAQ：支持合资格内地访客在港App申请，无最低结余收费、无实体卡；访客证券服务受限。摘要见research。'},
 {id:'antmo',name:'蚂蚁银行澳门 · 常见问题',url:'https://www.antbank.mo/questions',detail:'浏览器读取动态FAQ：访澳旅客需在澳申请；身份证及通行证、可用手机号。银行开户后证券服务另申请，当前无实体卡。'},
 {id:'antmofees',name:'蚂蚁银行澳门 · 港美股收费表',url:'https://www.antbank.mo/invest/fee',detail:'美股 / 港股交易有收费，按账户协议及最新收费表核对；不把银行账户免管理费等同证券交易免费。'},
 {id:'antmoapp',name:'蚂蚁银行澳门 · 官方开发者应用介绍',url:'https://apps.apple.com/mo/app/%E8%9E%9E%E8%9F%BB%E9%8A%80%E8%A1%8C-%E6%BE%B3%E9%96%80/id1454335260',detail:'开发者为ANT BANK (MACAO) LIMITED，列无开户门槛 / 无账户管理费。下载从银行官网进入，香港和澳门版分开。'},
 {id:'icbcapp',name:'工银亚洲 · 全新客户网点开户',url:'https://www.icbcasia.com/hk/sc/promotion/mobile-banking-account-opening-service.html',detail:'官方搜索摘要：内地身份证新客可手机提交申请，需在香港激活。线上预申请不等同全程远程完成。'},
 {id:'icbcvtm',name:'工银亚洲 · 2026-04-02 VTM 网络公告',url:'https://v.icbc.com.cn/userfiles/resources/icbc/haiwai/asia/download/tc/2026/press20260402c.pdf',detail:'官方PDF索引核对：落马洲站3楼票务大堂311号闸内、罗湖站LOW K5铺闸外；专人在线开户每日08:00–20:00。直读PDF受403限制，位置及时间来自官方索引，临行再确认。'},
 {id:'bocopen',name:'中银香港 · 大湾区个人服务宝典（开户）',url:'https://www.bochk.com/dam/crossborderservices/25GBAserviceguide_southcross.pdf',detail:'第9–10页：内地访客可在港手机开户；身份证、通行证、近7日发出电子出入境记录、内地电话地址及税务资料；分行作补办。'},
 {id:'bocfees',name:'中银香港 · 一般银行服务收费',url:'https://www.bochk.com/sc/servicecharge.html',detail:'个人储蓄 / 往来账户服务月费按表豁免；个人FPS本地转账等值HK$3,000,000或以下豁免。不包括所有跨境汇款及中转行费用。'},
 {id:'hkessentials',name:'香港旅发局 · 旅客须知',url:'https://www.discoverhongkong.com/eng/travel-guide/traveller-essentials.html',detail:'香港220V / 50Hz、英式方脚三插；紧急求助999。通讯、支付及旅游支持入口。'},
 {id:'moessentials',name:'澳门旅游局 · 实用资料',url:'https://www.macaotourism.gov.mo/en/article/before-you-travel/practical-info',detail:'澳门230V / 50Hz；货币、支付、医疗及通讯。入境携现金及无记名可转让票据总值达MOP120,000须申报。'},
 {id:'octopus',name:'八达通 · 标准租用版及退款',url:'https://www.octopus.com.hk/en/consumer/customer-service/refund/index.html',detail:'租用版有押金；发卡90天内等适用情况下退卡，手续费HK$11或余额1%，取较高者。售卖版规则不同。'},
 {id:'hktaxi',name:'香港运输署 · 的士收费',url:'https://www.td.gov.hk/en/transport_in_hong_kong/public_transport/taxi/taxi_fare_of_hong_kong/index.html',detail:'市区红的首2公里HK$29，后按里程 / 等待计价，行李及过海等可有附加费；大额钞票不保证可找零。'},
 {id:'taxipay',name:'香港政府 · 的士电子支付安排',url:'https://www.info.gov.hk/gia/general/202603/15/P2026031300594p.htm',detail:'2026-04-01起司机需提供至少一种二维码及一种非二维码电子支付；不代表每种钱包都受支持。'},
 {id:'molrt',name:'澳门轻轨 · 车票与票价',url:'https://www.mlm.com.mo/en/general_ticket.html',detail:'成人单程票按计费站数MOP6 / 8 / 10 / 12；跨海区间按两站计。默认澳门半岛旧城路线不必乘轻轨。'},
 {id:'hksmoking',name:'香港卫生署 · 2026控烟法例与罚则',url:'https://www.taco.gov.hk/t/english/legislation/legislation_tcl.html',detail:'2026-01-01起吸烟罪行定额罚款HK$3,000并扩展禁烟场景；04-30起公众地方禁管有指定另类吸烟产品物质；进口禁令另适用。'},
 {id:'hkcustoms',name:'香港海关 · 旅客禁运 / 受管制物品',url:'https://www.customs.gov.hk/en/service-enforcement-information/passenger-clearance/prohibited-controlled-items/index.html',detail:'药物、武器、食品和动植物等受不同法规管制。个人自用不能概括豁免所有禁运项目。'},
 {id:'hkentrytips',name:'香港旅发局 · 海关及入境提醒',url:'https://www.discoverhongkong.com/eng/travel-guide/traveller-essentials/immigrations-and-customs/in.html',detail:'CBD受危险药物管制；胡椒喷雾、电击器等不可当普通防身用品携入；现金等总值超过HK$120,000须按出入境规则申报或披露。'},
 {id:'hktobacco',name:'香港海关 · 烟酒免税额度',url:'https://www.customs.gov.hk/en/service-enforcement-information/passenger-clearance/duty-free-concessions/index.html',detail:'18岁以上自用旅客香烟免税额度19支；超过额度须申报，并不涵盖电子烟或加热烟。'},
 {id:'hklitter',name:'香港政府 · 乱抛垃圾 / 吐痰定额罚款',url:'https://www.news.gov.hk/chi/2023/10/20231020/20231020_125804_174.html',detail:'相关公众地方洁净罪行定额罚款HK$3,000，自2023-10-22生效；不能把烟头随手扔地上。'},
 {id:'mtrrules',name:'港铁 · 香港铁路附例',url:'https://www.highspeed.mtr.com.hk/sc/main/mtr-by-laws.html',detail:'普通港铁已付车费区域内不可饮食，清水也属饮品；勿逃票、冲门或擅用不适用优惠票。'},
 {id:'mosmoking',name:'澳门旅游局 · 禁带电子烟提示',url:'https://www.macaotourism.gov.mo/en/events/whatson/13779/?type=null',detail:'禁止个人携带电子烟入澳门，违反可罚MOP4,000；禁烟区规定另外适用。'},
 {id:'moemergency',name:'澳门政府 · 紧急服务',url:'https://www.gov.mo/en/services/ps-1544/',detail:'紧急医疗、消防及警务求助999。一般旅游咨询用+853 2833 3000。'}
);

const HALLOWEEN = [
 {title:'皇后像广场 · 节庆装置',date:'10.30 周五 · 已加入15:40节点',status:'默认 / 中环顺路',detail:'花园南面装置展期10.17–31，昼夜可看；外观拍摄无需买主题乐园门票，个别活动收费另查。',route:'银行区 → 皇后像广场 → 石板街，不额外跨区。',source:'halloween'},
 {title:'尖东 · 么地道花园',date:'10.31 周六 · 16:00–23:00',status:'默认 / 约16:45短逛',detail:'TST East Halloween Beats，免费入场。先看市集与霓虹装置、征得同意再与变装游客合影；19:00才有DJ。',route:'H1下车 → 花园短拍 → 星光大道向西 → 钟楼 → 佐敦。迟到先保海滨光线。',source:'halloweentst'},
 {title:'兰桂坊 · Monsters Night',date:'10.31 周六 · 晚间',status:'替换方案 / 夜生活最浓',detail:'免费街区活动；酒吧、餐饮及个别派对另收费。明确想看夜场时，用它替换尖东及海滨晚间安排；开放 / 入场与封路看当日公告。',route:'需从湾仔改往中环，回九龙另付交通费；不是默认行程追加项。',source:'halloweenlkf'},
 {title:'旺角 · 朗豪坊外砵兰街',date:'10.31 周六 · 压轴变装活动',status:'替换方案 / 九龙街头气氛',detail:'旅发局列出免费街头变装与演出；具体节目时段看商场公告，不给出未经核实的开场时间。',route:'替换尖东 / 维港晚间活动后另查去旺角交通，不安排回酒店再北上。',source:'halloween'},
 {title:'启德 / 迪士尼 / 海洋公园',date:'启德10.30–31；乐园活动至11.01',status:'整段替换 / 不纳入小计',detail:'启德餐饮海湾有免费万圣活动；两大乐园需买指定门票，日期及产品分别确认。至少预留半天，不在开户、H1与港澳转城之间硬塞。',route:'如选择其中一处，删减同日街拍并重新计算门票与交通。',source:'halloweenmonth'}
];

const BANKS = [
 {id:'hsbc',name:'汇丰香港 · One + 蓝狮子',tag:'周五主办 / Mastercard借记卡',apply:'先用HSBC HK App核验资格并申请One，再申请蓝狮子万事达借记卡；蓝狮子要关联合资格账户，不是独立开户。证件与地区入口以App为准。',fee:'2026年起新开户的非香港身份证持有人，过去连续三个月平均全面理财总值需达HK$10,000；未满足要求HK$100/月。不是每月存入1万元，也不要求升卓越。',fallback:'线上失败才联系分行预约，保留周五中环11:30–15:30窗口；卡可能邮寄，不保证旅途中取到。',sources:['hsbcapp','hsbccard','hsbc']},
 {id:'za',name:'众安银行 · ZA Bank',tag:'周五在港 / 手机申请',apply:'18岁以上，在香港境内用官方App申请；备有效内地身份证、同手机号内地储蓄卡、可收短信的内地手机号及有效出入境记录。',fee:'具体账户、卡片和汇款费用看官网收费表；不要把开户奖励当成无条件返现。',fallback:'数字银行以App与客服处理补件；失败先找官方客服，不安排去“众安分行”排队。',sources:['za','zafees']},
 {id:'ant-hk',name:'蚂蚁银行 · 香港',tag:'周五在港 / 与澳门版分开',apply:'官方访客FAQ支持18岁以上内地居民在港App申请：内地二代身份证、有效内地或香港手机号、国家移民管理局有效出入境记录；按要求激活。',fee:'官方列开户免费、活期储蓄不设最低结余收费；目前无实体卡。访客账户不等同可用香港版港美股证券服务。',fallback:'线上失败通过App或官方客服补件；没有实体分行，不为此跑澳门版网点。',sources:['anthk']},
 {id:'icbc',name:'工银亚洲 · App + VTM备用',tag:'周五入境 / 罗湖闸外更顺路',apply:'内地新客可先用工银亚洲App提交“全新客户网点开户”申请；官方说明仍需在香港激活，不当成内地远程完成。',fee:'开户、账户管理、汇款费按所选账户及最新收费表确认；本页不承诺所有产品终身免管理费。',fallback:'罗湖港铁站LOW K5铺（闸外）；落马洲港铁站3楼票务大堂311号（闸内）。专人在线开户每日08:00–20:00；排队、资格及机器状态临行确认。本次走罗湖，不跨去落马洲。',sources:['icbcapp','icbcvtm']},
 {id:'boc',name:'中国银行（香港）',tag:'周五先申请 / 资料充分再补办',apply:'18岁以上内地访客可在港用中银香港App申请；备身份证、通行证、近7日签发的电子出入境记录、内地电话地址及税务资料。可能补件审核，不保证成功。',fee:'个人储蓄 / 往来账户服务月费按现行表豁免；个人FPS本地港币 / 人民币转账等值HK$300万或以下豁免。跨境人民币汇款、中转行与收款行费用另查。',fallback:'App失败才预约分行，地址证明、用途与资金来源如实提供。“申请难”不是固定政策；不因旅游签注就保证能获批。',sources:['bocopen','bocfees']},
 {id:'ant-mo',name:'蚂蚁银行 · 澳门',tag:'周日入澳 / 港美股另申请',apply:'访澳旅客在澳门境内用澳门版App申请，备内地身份证、通行证、有效入境 / 出入境资料及可收短信手机号。周日外港入境后留30分钟提交。',fee:'官方应用介绍列无账户管理费，目前无实体卡。银行开户后在证券页面另申请港美股服务；官网FAQ目前列新开证券账户为保证金融资账户，不提供自动换汇，先备对应币种现金并核对融资风险 / 费用。',fallback:'先联系官方客服核对补件；周日下午不假定有开户柜台。申请证券不等于可把内地个人购汇资金用于境外证券投资。',sources:['antmo','antmoapp','antmofees']}
];
BANKS.forEach(bank=>{bank.check=CHECKS.length;CHECKS.push(bank.name+'：已完成申请或已核对下一步补件');});

const PACKING = [
 {title:'证件与离线备份',text:'港澳通行证原件、有效香港 / 澳门签注、身份证；酒店和返程票确认单离线保存。保留两地入境凭条并核对获准逗留期限；银行电子记录需按要求在入境后获取。',source:'imm'},
 {title:'英式转换头 + 充电线',text:'带Type G英式方脚三插转换头、多口充电器、手机 / 相机线和合规充电宝。香港220V/50Hz，澳门官方资料为230V/50Hz；先查充电器铭牌是否支持100–240V，转换头不能变压。澳门酒店插座再向酒店确认。',source:'hkessentials',extraSource:'moessentials'},
 {title:'两地流量 + 短信漫游',text:'买明确覆盖香港和澳门的流量包；内地主号开通港澳漫游以收银行验证码，不等于要开昂贵的漫游数据。eSIM先查手机支持，开户时开启合法定位，不用模拟定位。',source:'hkessentials'},
 {title:'支付备份 + 小额现金',text:'八达通 / 可用手机钱包、已开通境外支付的银行卡，少量HKD和MOP零钞；MOP不要留到香港花。示例携HK$300–500、MOP50–100仅为现金预留建议，已包含于相应餐饮 / 交通花费，不重复加预算。',source:'moessentials'},
 {title:'开户资料包',text:'实名手机号与同号内地储蓄卡、可用邮箱、税务居民编号、真实住址、职业 / 收入与资金来源；地址证明按银行要求备最近3个月账单。用官方App提交证件，别把卡号、密码或证件全文写进本手帐。',source:'bocopen'},
 {title:'轻装拍照与天气',text:'舒适步行鞋、薄外套、折叠伞、日常药品原包装及处方（如适用），相机电池、存储空间。看香港天文台及澳门气象部门预警，船班可能停航。万圣装扮轻便、不带仿真枪刀与烟雾道具。',source:'hko'},
 {title:'行李、保险与车船票',text:'香港酒店两晚与早到寄存、澳门行李去向、周日14:30船票及行李限制、珠海晚入住、周一中转及返汉票逐项确认。考虑含两地医疗和行程延误的旅游保险，保单与紧急联系离线存。',source:'ferry'}
];
PACKING.forEach(item=>{item.check=CHECKS.length;CHECKS.push(item.title+'：已准备 / 已确认');});

// Append new checks after existing ones so saved v3 packing selections keep their meaning.
SOURCES.push(
 {id:'hangsengopen',name:'恒生香港 · 内地居民开户渠道与文件',url:'https://www.hangseng.com/zh-cn/cross-border-banking/personal/account-opening/',detail:'18岁以上内地居民，在香港并连接本地网络，可用恒生Mobile App申请；备身份证、通行证、有效出入境记录等，投资账户另需住址证明。'},
 {id:'hangsengfees',name:'恒生香港 · 手机开户及账户费用',url:'https://www.hangseng.com/zh-hk/personal/banking/account-opening/mobile/',detail:'优进理财不设全面理财总值要求并豁免低额结存服务费；与优越理财的资金及收费要求不同。以申请时账户条款为准。'}
);
BANKS.push({id:'hangseng',name:'恒生银行 · 香港',tag:'周五在港 / 优进理财可选',apply:'年满18岁、持有效内地身份证和港澳通行证，抵港并连接本地网络后用恒生Mobile App申请；备内地住址、有效香港出入境记录及职业 / 收入等资料，投资账户另需住址证明。',fee:'官方列优进理财不设全面理财总值要求，豁免低额结存服务费、无需月费；不等于汇款或所有交易免费。优越理财是另一账户等级，不混用其资金要求。',fallback:'线上失败再通过官网预约香港分行；沿用周五中环办理窗口，实际分行及时间按预约确认，不为开户反复跨区。',sources:['hangsengopen','hangsengfees'],check:CHECKS.length});
CHECKS.push('恒生银行 · 香港：已完成申请或已核对下一步补件');


const TRANSIT_GUIDE = [
 {name:'香港港铁 / 推荐跨区',fare:'本路线成人八达通示例HK$10.60–46.60 / 程',choice:'罗湖至佐敦46.60；佐敦至中环10.60。普通等，头等另收费；用同一张卡 / 同一种支付方式入出闸，二维码价格不一定等同八达通。',source:'mtr'},
 {name:'普通叮叮车 / 推荐体验',fare:'成人HK$3.30 / 次',choice:'只在港岛部分地区行驶，慢但便宜；后门上、前门下，下车付款。万圣特别电车有另行换票规则，不套普通票价。',source:'tram'},
 {name:'专营巴士 / 小巴',fare:'随路线 / 分段；H1按HK$47.60预留',choice:'普通巴士按站牌票价，上车付款、现金通常不找零。小巴看线路和下车方式，首次游客优先港铁。H1另查封路与到站，消费换券不预先扣减预算。',source:'h1fare'},
 {name:'天星小轮 / 推荐过海体验',fare:'中环—尖沙咀成人HK$4–6.50',choice:'周五上层5 / 下层4；周末上层6.50 / 下层5.60。普通渡轮与维港游分别收费；按官网随身物品限制轻装登船。',source:'starferry'},
 {name:'香港的士 / 行李或雨天备选',fare:'市区红的首2公里HK$29',choice:'按表计费，另有行李、等待、过海等费用；一个人跨海通常地铁更划算。2026年4月起需提供二维码和非二维码电子支付，但上车先确认你的钱包是否可用。',source:'hktaxi',extraSource:'taxipay'},
 {name:'港澳喷射飞航 / 默认转城',fare:'本次周日日航普通位HK$212',choice:'上环至澳门外港约60分钟；至少提前30分钟入闸，本方案13:30到码头搭14:30目标船。夜航票价与日航不同，航班以购票确认。',source:'ferry'},
 {name:'澳门公共巴士 / 推荐旧城至口岸',fare:'现金MOP6 / 次，不找零',choice:'只坐一程可准备6元零钱；扫码或优惠卡适用资格另查，不照搬居民优惠。用澳门官方交通信息查临时改道，香港八达通不默认适用澳门普通公交。',source:'macau'},
 {name:'澳门的士 / 拖箱备选',fare:'首1,600米MOP21，其后每220米MOP2',choice:'另有等待和指定地点附加费；走正规候车点按表计费，保存收据。不把网约车App在香港可用推断为澳门也能用。',source:'macau'},
 {name:'澳门轻轨 / 去路氹可选',fare:'成人单程MOP6 / 8 / 10 / 12',choice:'按计费站数收费，跨海段折算两站；本次只逛半岛旧城无需为打卡绕去轻轨。酒店免费接驳车的班次与乘车条件逐家查。',source:'molrt'}
];

const TRAVEL_TIPS = [
 {title:'八达通：押金不是车费',text:'分清租用版与售卖版。租用版押金HK$50；90天内等适用退卡情况，收HK$11或余额1%（取较高者）。充值不是额外交通消费，退款手续费按实际记在其他预留。',source:'octopus'},
 {title:'点菜、房费先看总价',text:'看菜单是否另收服务费、茶位或最低消费；买海鲜看计价单位。订香港房间核对含税总价、床型、房间面积、押金与寄存费用；旺季万圣周末别用平日房价当成交价。',source:'hkessentials'},
 {title:'刷卡优先当地货币',text:'在收银和ATM查看实际币种、手续费及汇率，通常选HKD / MOP可避免商户动态货币转换报价；仍需比较发卡行费用。澳门使用港币时先问接受方式及找零币种，不默认按市场汇率结算。',source:'moessentials'},
 {title:'不找陌生人换汇或“包过开户”',text:'从官方商店 / 银行官网下载App；不给代办验证码，不出借账户，不替人过关带包。遇到账户需“安全转账”立即停下，自己拨官网电话核实。',source:'hsbcapp'},
 {title:'街拍与万圣人流',text:'车辆靠左行驶，按现场“望左 / 望右”和灯号过街；拍照留在人行道，不霸占路口、住宅入口及楼梯。合影先征得同意，人流管制听从警员，太挤直接离开；装扮遮脸在证件检查时配合摘除。',source:'halloween'},
 {title:'转城留余量',text:'口岸开放不等于铁路 / 船舶全天有班；香港与澳门各自入境、各核签注与逗留期限。本次一次赴港一次赴澳，周日不回香港；周一先确保中转与返程票再玩深圳。',source:'macauports'}
];

const LAW_TIPS = [
 {title:'电子烟 / 加热烟：两地都别带',text:'香港禁止进口另类吸烟产品，个人自用也不能当豁免；2026年4月30日起公众地方管有指定另类吸烟产品物质亦受禁。澳门禁止个人携电子烟入境，可罚MOP4,000。',source:'hksmoking',extraSource:'mosmoking'},
 {title:'香港吸烟、垃圾、吐痰',text:'法定禁烟区（包括公共交通等）及排队等法定场景不要吸烟；2026年吸烟罪行定额罚款HK$3,000。乱抛垃圾、吐痰等相关洁净罪行定额罚款亦为HK$3,000，烟头也须妥善弃置。',source:'hksmoking',extraSource:'hklitter'},
 {title:'港铁闸内不要吃喝',text:'普通港铁已付车费区内不能进食或饮用饮品，清水也包括在内；吃喝在入闸前处理。用成人合资格票，不逃票、不冲门、不用他人优惠票；细则及例外见附例。',source:'mtrrules'},
 {title:'CBD、防身喷雾、仿真武器',text:'含CBD的油、软糖、美妆等在香港受危险药物法规管制，不因境外合法就可携入。胡椒喷雾、电击器及武器受管制，万圣节不用仿真枪刀作随身道具。',source:'hkentrytips'},
 {title:'香烟19支是免税额度，不是一包',text:'香港18岁以上旅客自用传统香烟免税额度是19支；一包20支已超过，须走申报渠道。不要把这个额度套到电子烟、加热烟或澳门。',source:'hktobacco'},
 {title:'现金申报与受管制药食',text:'入香港现金 / 无记名可转让票据总值超过HK$120,000须按规定申报；澳门入境达MOP120,000或等值即须申报，两地阈值措辞不同。药品、肉蛋、动植物等另有规定，带处方及原包装不等于一概豁免。',source:'hkentrytips',extraSource:'moessentials',thirdSource:'hkcustoms'},
 {title:'逗留与账户如实使用',text:'遵守入境凭条的逗留期限，访客不从事未经许可的工作；开户如实申报税务、用途及资金来源。境内个人购汇不可用于境外证券投资，境外开户并不会自动解除外汇用途限制。',source:'imm',extraSource:'fxrules'}
];
SOURCES.push({id:'fxrules',name:'国家外汇管理局 · 个人外汇管理及购汇用途',url:'https://www.safe.gov.cn/shanghai/2019/1213/1198.html',detail:'个人购汇用途需真实合规，不能以旅游等名义购汇用于境外证券投资；以现行外汇管理规定为准。'});

SOURCES.push(
 {id:'hgtransport',name:'运输署 · 新皇岗口岸交通、票价与服务时间',url:'https://www.td.gov.hk/tc/transport_in_hong_kong/land_based_cross_boundary_transport/athp/',detail:'2026-10-28核对：口岸24小时；B10成人HK$12.10，B13成人HK$27.60，两线双向06:00–次日00:30。B13往返小西湾，服务港岛，不是尖沙咀直达线。'},
 {id:'hgkmb',name:'九巴 · 皇岗B10及指定路线转乘优惠',url:'https://www.kmb.hk/news_detail.html?id=1368&year=2026',detail:'官方公告索引列大部分指定组合按两程较高票价收费，含268X及268B / 269B；直读页面为空、浏览器加载超时，结合官方票价XML和站序核对，实际转乘时限 / 支付条件以APP1933为准。'},
 {id:'hgfares',name:'运输署 · B10、268X、268B / 269B票价开放数据',url:'https://static.data.gov.hk/td/routes-fares-xml/ROUTE_BUS.xml',detail:'2026-10-28下载核对全程成人价：B10 12.10、268X 16.20、268B / 269B 20.80港币；联程价需另符合九巴优惠，不把两程票价直接相加。'},
 {id:'hgstops',name:'九巴官方开放数据 · 268B / 269B及换乘站序',url:'https://data.etabus.gov.hk/v1/transport/kmb/route-stop/268B/inbound/1',detail:'北行268B / 269B含尖东站K11 MUSEA（YT632）、尖沙咀转车站中间道（YT102），至大榄隧道转车站；南行268X经过旺角站。选对行车方向及换乘站位。'},
 {id:'hgcitybus',name:'城巴官方 · B13路线资料',url:'https://rt.data.gov.hk/v2/transport/citybus/route/CTB/B13',detail:'官方API核对B13往返皇岗与小西湾（蓝湾半岛）；中环等港岛站可直达口岸，尖沙咀旅客需另选交通。'},
 {id:'hgoctopus',name:'八达通 · 皇岗回赠与深圳地铁特惠站',url:'https://www.octopus.com.hk/sc/corporate/media/press-releases/2026/20261012.html',detail:'皇岗站拍卡特惠用于同日经罗湖 / 落马洲乘港铁的HK$3扣减；不是B10立减。10.12–11.11登记后同一指定路线满4程的回赠另按规则，B10每4程HK$10。'},
 {id:'hgclearance',name:'保安局 · 皇岗合作查验及登记资格',url:'https://www.sb.gov.hk/chi/hg/clearance.html',detail:'读证与刷脸的资格和登记要求分别适用；内地旅客应备实体通行证及有效香港签注，不把一次排队等同无条件刷脸。'},
 {id:'hghall',name:'保安局 · 皇岗楼层与通讯常见问题',url:'https://www.sb.gov.hk/chi/hg/faq.html',detail:'港方公共运输交汇处L2；深圳往香港查验L4、香港往深圳L5。楼内流动网络为内地网络，Wi-Fi.HK免费Wi-Fi另有覆盖。'},
 {id:'hgcoachref',name:'巴士资讯网 · 油尖跨境快线（第三方参考）',url:'https://www.i-busnet.com/china/busroute/shenzhen/tst-huanggang.html',detail:'第三方列日间成人八达通HK$38，深宵HK$43，其他支付不同；童军中心 / 中港城上车。与用户所提供南下HK$25优惠有差异，保留差异并提醒购票前确认。'},
 {id:'hguserdirect',name:'用户提供的小红书笔记 · 皇岗南下直达',url:'https://xhslink.cn/o/6ZMqCvdfrfe',detail:'用户提供南下新皇岗至中港城HK$25、约50分钟，北上HK$38；短链无法读取，优惠资格 / 期限 / 支付方式未独立核实。'},
 {id:'hguserbus',name:'用户提供的小红书笔记 · B10转268X实测',url:'https://xhslink.cn/o/3c5A7Ye0pRS',detail:'用户提供12.10 + 4.10 = HK$16.20、车上20+30分钟。路线和票价规则另核官方资料，笔记全文无法读取；耗时保留实测标签。'},
 {id:'hguserreturn',name:'用户提供的小红书笔记 · 尖沙咀经葵芳回皇岗',url:'https://xhslink.cn/o/8nyisSE4Ger',detail:'用户提供尖沙咀至葵芳地铁11+B10 12.10=23.10港币。已与港铁成人八达通数据、运输署B10价交叉核对；排队体验不视为未来保证。'}
);

const HUANGGANG_ROUTES = [
 {id:'hg-south-coach',direction:'south',title:'直达尖沙咀 · 中港城',tag:'少换乘 / 优惠需现场核实',fare:'HK$25 南下优惠（待确认）',steps:['深圳地铁7号线皇岗口岸站 → 按A口指示进联检大楼','L4办理出境深圳 / 入境香港 → L2跨境巴士区','确认当班到中港城，再乘油尖跨境快线'],duration:'约50分钟（用户笔记实测，非门到门承诺）',payment:'HK$25仅记录南下优惠，不能套到回程。当前第三方价表仍列成人日间八达通38、深宵43，优惠票种、支付方式与有效期要在售票处确认；其他支付可能更贵。',tip:'中港城在海港城旁，但不是所有时段终点；部分班次去童军中心或油麻地，买票时核对下客点。另加地铁、步行、候车与通关时间。',source:'hgtransport',extraSource:'hgcoachref',noteSource:'hguserdirect'},
 {id:'hg-south-bus',direction:'south',title:'B10 → 大榄隧道 → 268X → 旺角',tag:'去旺角推荐 / 性价比高',fare:'合资格联程 HK$16.20',steps:['皇岗口岸港方L2 → B10往葵芳','大榄隧道转车站下车，按指示找268X南行站位','268X往高铁西九龙站方向，在旺角站一带下车'],duration:'车上约20 + 30分钟（用户实测），不含候车 / 换乘 / 通关',payment:'同一张成人八达通按九巴指定组合、方向和时限转乘：按现行两程较高票价16.20计算；笔记扣费为B10先12.10、268X再4.10。现金或不同支付工具不默认享优惠。',tip:'适合以旺角为目的地；若实际去佐敦，可查询268X继续南行的下车站，避免先去旺角再折返。具体站位、到站与优惠条件看APP1933。',source:'hgfares',extraSource:'hgkmb',noteSource:'hguserbus'},
 {id:'hg-north-coach',direction:'north',title:'尖沙咀直达 · 童军中心 / 中港城',tag:'少换乘推荐 / 带行李可选',fare:'日间成人八达通参考 HK$38',steps:['确认童军中心跨境巴士总站或中港城当班上车点','乘往皇岗口岸的油尖跨境快线','口岸L2下车 → L5办理香港出境 / 深圳入境'],duration:'畅通时约35分钟（用户实测）；勿据此倒推末班或预约',payment:'HK$38是日间八达通参考价，不是所有支付方式统一价。第三方资料列23:30–05:59深宵八达通43；微信 / 支付宝 / 现金另价，以承运人当日售票为准。',tip:'南下25优惠不能拿来买北上票。中港城并非全天有车，夜间先确认童军中心等实际站点；另留候车、拥堵、口岸楼内步行及查验时间。',source:'hgcoachref',extraSource:'hgtransport',noteSource:'hguserdirect'},
 {id:'hg-north-bus',direction:'north',title:'268B / 269B → 大榄隧道 → B10',tag:'尖东出发推荐 / 巴士性价比高',fare:'合资格联程预计 HK$20.80',steps:['尖东站K11 MUSEA（YT632）或尖沙咀转车站中间道（YT102）上车','268B往朗屏 / 269B往天水围方向 → 大榄隧道转车站','找往皇岗口岸的B10站位换乘，不要跟南行站台混淆'],duration:'车上约55–85分钟（规划），另加候车、换乘步行及通关',payment:'268B / 269B全程20.80，B10全程12.10；符合九巴指定联程条件时按较高一程20.80计算，不是32.90。未享优惠或改用现金须重新查价。',tip:'上车前确认路线方向，不能乘往红磡的反向车。官方站序已核实上述两个上车点；大榄换乘的具体站柱与步行按现场指示和APP1933。',source:'hgstops',extraSource:'hgfares',thirdSource:'hgkmb'},
 {id:'hg-north-mtr',direction:'north',title:'荃湾线尖沙咀 → 葵芳 → B10',tag:'不想等268B / 269B时的备选',fare:'HK$11.00 + 12.10 = 23.10',steps:['尖沙咀站乘荃湾线往荃湾方向 → 葵芳','B出口按地图步行至葵翠邨公共运输交汇处B10站点','B10往皇岗口岸 → L2下车后上L5查验'],duration:'地铁约25–35分钟 + B10约45–60分钟（规划），换乘及排队另计',payment:'地铁11.00为成人八达通普通等；单程票13.00时两段合计25.10。港铁与B10不套九巴两程较高票价优惠。',tip:'B出口与过马路路线来自用户笔记，按实时导航及车站指示复核；不要把“B出口”直接当B10站名。B10全线服务时间双向06:00–次日00:30，发车以当天到站为准。',source:'mtr',extraSource:'hgtransport',noteSource:'hguserreturn'},
 {id:'hg-island-b13',direction:'north',title:'港岛直达皇岗 · 城巴B13',tag:'适合中环 / 北角等港岛地区',fare:'成人全程 HK$27.60',steps:['在港岛B13沿线确认往皇岗方向的站点','城巴B13直达皇岗口岸港方公共运输交汇处','L2下车 → L5查验 → 深圳地铁7号线'],duration:'中环至口岸约60–100分钟（规划），起点、路况及候车不同',payment:'B13全线往返皇岗与小西湾（蓝湾半岛），两端服务06:00–次日00:30；以城巴App确认站点、方向、班次及分段收费。',tip:'B13不是尖沙咀直达线；从尖沙咀出发无需为了搭它先跨海到港岛。若人在中环，则可直接查询B13，减少额外换乘。',source:'hgtransport',extraSource:'hgcitybus'}
];
