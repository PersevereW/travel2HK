# 拍照与体验版 v3 · 数据来源与核验边界

核验日期 2026-10-27，行程为 10-30 周五至 11-02 周一，全部时间 UTC+8。

## 默认路线

深圳站到达 → 罗湖入港 → 香港佐敦连住两晚（周五中环街拍后乘天星到尖沙咀回酒店，周六坚尼地城 → 叮叮车东行 → 湾仔 → H1 中途上车 → 星光大道 / 维港）→ 周日退房带行李直去上环，14:30 赴澳门外港 → 澳门半岛 → 关闸 / 拱北入珠海 → 拱北 / 珠海站附近住一晚 → 周一早班铁路经广州南到深圳北 → 莲花山 / 市民中心短游 → 下午从深圳北出发回武汉。

周日 14:30 是推荐，船票未购买；铁路 07:00 是目标出发窗口，不是锁定或已经核实的实际车次。周一下午“返武汉”理解为下午离深，不代表下午到达武汉。

## 已读取的官方数据

1. [香港入境处全部 13 个管制站](https://www.immd.gov.hk/eng/contactus/control_points.html)，网页日期 2026-10-27，原始快照 `research/immigration.html`。香港部分全部保留；沙头角暂停服务，不假定恢复。
2. [港铁开放票价 CSV](https://opendata.mtr.com.hk/data/mtr_lines_fares.csv)，9,216 条，快照 `research/mtr_fares.html` 实际为 CSV 文本。新版使用成人八达通普通等 OCT_ADT_FARE；单程票 SINGLE_ADT_FARE 另列：
   - 罗湖（76）→ 佐敦（4）：HK$46.60，单程票 HK$49.50。
   - 佐敦（4）→ 中环（1）：HK$10.60，单程票 HK$12.50。
   - 佐敦（4）→ 坚尼地城（83）：HK$13.20，单程票 HK$15.50。
   - 佐敦（4）→ 上环（26）：HK$10.60，单程票 HK$12.50。
3. [喷射飞航当前港澳船期及价格](https://www2.turbojet.com.hk/zh-tw/%E6%B5%B7-%E8%88%B9/)，快照 `research/hk_macau_current.html`：2026-10-16 起上环→澳门外港包含 14:30 日航，航程约 60 分钟。2026-04-25 起普通位平日日航 HK$194、周末 / 节假日日航 HK$212、夜航 HK$242，含香港离境税。18:30 或之后为夜航。官网要求至少提前 30 分钟入闸，本方案提前 60 分钟到码头。
4. [喷射飞航服务通知](https://www2.turbojet.com.hk/zh-tw/%E6%9C%8D%E5%8B%99%E9%80%9A%E7%9F%A5/) 2026-04-20 公告与上述日 / 夜航价格一致；不使用过期早鸟活动价。
5. [澳门治安警察局办公时间](https://www.fsm.gov.mo/psp/cht/psp_top9_1.html)，快照 `research/macau_ports.html`：关闸 06:00–次日01:00，青茂 24 小时，外港 24 小时。青茂适用资格另核，不能据 24 小时推断所有持证人均可通行。默认周日 20:30 走关闸 / 拱北，步行出入境查验免费。
6. [澳门旅游局市内交通](https://www.macaotourism.gov.mo/en/travelessential/before-you-travel/local-transportation)，更新 2026-06-15，快照 `research/macau_transport.html`。公共巴士现金 MOP 6，不找零。默认旧城→关闸一程计 MOP 6。
7. [汇丰账户比较及费用](https://www.hsbc.com.hk/accounts/)，快照 `research/hsbc_open.html`。非香港身份证持有人 2026 年起新开 HSBC One，最低全面理财总值 HK$10,000，低于要求 HK$100/月。开户所需资金不是旅行支出，未计入旅行预算。

## 非官方线路参考及未核实项目

- [澳门交通资讯网 M134 新马路 / 华侨](https://motransportinfo.com/zh/station/M134)（第三方）列有 3 路往关闸，作为周日公交线路参考。车费由澳门旅游局官方数据支持，路线站点不冒充官方实时承诺。大赛车工程可能导致改道，必须核对当日站牌 / 交通局公告。
- 珠海 → 广州南 → 深圳北：推荐经 12306 购买两程可衔接车票。预算 ¥140–200，组合耗时规划 2–3 小时；不是已核实的票面价或保证有余票。广州南换乘建议至少留 30–45 分钟，目标 10:00 前到深圳北。
- 深圳北 → 莲花北、市民中心 → 深圳北：每程 ¥3–5 为预算，未核实官方站间票价。含进出站步行的耗时是规划值。
- 备用九洲港→蛇口船班与票价未核实，不纳入默认路线和小计；蛇口—澳门旧方案仅保留为其他海路参考。
- 香港房费默认 HK$650/晚 × 2，珠海 ¥280/晚 × 1，餐饮 ¥200/天，其他 ¥150，均为可编辑规划值，不是实时房源或店铺报价。HKD→CNY 0.92、MOP→CNY 0.89 仅作初始预算汇率。
- 步行、候车、通关排队耗时全部是估算，具体以实时地图、现场和交通运营为准。酒店寄存与深圳北行李寄存费用另核，列入可编辑其他预留。
- 银行具体分行、预约及营业时间未确认；周五优先App申请，11:30是需要线下时的建议预约窗口。香港酒店地址未指定，默认佐敦站步行圈，改酒店需重查门到门路线。
- 武汉往返车票尚未提供，长途票价和旅行耗时未计入市内 / 转城预算。默认返程落点深圳北，若实际为深圳站 / 机场，应重新安排周一。

## 本次补充核验

- [香港电车官网](https://www.hktramways.com/en/schedules-fares)：普通电车成人 HK$3.30 / 次，后门上车、前门下车付费。另售票的 TramOramic 不套用这个票价。本次计划从坚尼地城东行，至湾仔庄士敦道一带下车，路上含候车与街道交通耗时为估算。
- [香港运输署巴士路线 / 全程票价 XML](https://static.data.gov.hk/td/routes-fares-xml/ROUTE_BUS.xml)：H1，ROUTE_ID 1475（及不经遮打道的 8220），FULL_FARE 47.6，资料 LAST_UPDATE_DATE 2026-06-08。官方全程旅程时间 65 / 64 分钟不直接套成中途上车的含等车耗时；本页湾仔至尖沙咀用 45–70 分钟规划。原始 H1 条目摘录 `research/h1-official-fare-extract.xml`。
- 城巴开放 API [H1 线路](https://rt.data.gov.hk/v2/transport/citybus/route/CTB/H1)、[H1 去程站序](https://rt.data.gov.hk/v2/transport/citybus/route-stop/CTB/H1/outbound)：已核查第 12 站厦门街（皇后大道东）002481，第 17 站星光大道（梳士巴利道）003301。快照 `research/h1-official-route.json`、`research/h1-official-stops.json`。中途上车跳过已游览的中上环段，不为了总站座位折返。
- H1 **预算按全程 HK$47.60 预留**，不声称中途上车一定与全程同价；若当日公布较低分段价，按实际收取。15:30–15:45 是目标上车窗口，不是锁定的未来发车时间；没有承诺上层位、开篷车辆、前排或落日。
- [香港旅发局开篷观光巴士指南](https://www.discoverhongkong.com/tc/deals/hong-kong-night-bus-tour.html)：“落日飞车”是开篷观光巴士常用名称，H1 白天路段、H2K 夜游及 Big Bus 是不同线路 / 产品；不能把 H2K 晚间 18:30 起班次当作白天夕阳体验。
- [香港旅发局坚尼地城街区指南](https://www.discoverhongkong.com/eng/neighbourhoods/central-and-western-district/how-to-spend-your-day-in-kennedy-town.html) 为海旁与摄影地点参考。本次不进篮球场排队、不绕西环泳棚，不将吉席街参考图标成篮球场或海旁同一机位。
- 傍晚 17:00–18:30 是保留的拍摄窗口，不是精确日落时刻。可核查[天文台 2026 年历](https://www.hko.gov.hk/en/gts/astron2026/files/HKO_almanac_2026.pdf)。云量、街道遮挡、人流会影响成片，不承诺出现特定光线。
- 「望左 / 望右」不是唯一固定景点，中环毕打街 / 德辅道中 / 遮打道一带按现场合法过路点寻找。地面标线参考图未标明这一具体路口，已在图片卡片明确标为示例。
- 9 张照片均来自 Wikimedia Commons，有明确 CC0 / CC BY / CC BY-SA 许可，保存到本地；见 PHOTO_CREDITS.md、assets/photos/credits.json。照片为历史实景，不是现场实时图。

## 新增天星小轮核验

- [天星小轮官方普通渡轮服务](https://www.starferry.com.hk/en/service)：本次周五（非公众假期）中环—尖沙咀成人上层 HK$5、下层 HK$4；周末及公众假期上层 HK$6.50、下层 HK$5.60。预算选择周五上层 HK$5。
- 官网中环出发周五 09:55–20:40 班距为 6 / 8 分钟，首末班 06:30–23:30。17:30 是本行程的目标乘船窗口，不是已锁定班次。船程约 8–10 分钟、含进出闸与候船共 20–35 分钟均为规划估算。
- 选择中环七号码头 → 尖沙咀的普通渡轮，不是另售票的维港游，也不是周日往澳门的喷射飞航。到尖沙咀后沿弥敦道回酒店，不增加往返船程。
- 官网注明随身物品尺寸限 40×40×17.5cm，且无预留座位。因此放在周五轻装游览阶段，行李留酒店；不安排周日退房带大箱搭乘天星。
- 本地 curl 无法获取该页面，数据来自网络查询工具直接读取官网；核实摘要保存于 `research/star-ferry-verified.json`，未伪造 HTML 快照。

## 默认交通计算

- 周五：罗湖→佐敦 46.60 + 佐敦→中环 10.60 + 天星中环→尖沙咀上层 5.00 = HK$62.20。
- 周六：佐敦→坚尼地城 13.20 + 普通电车 3.30 + H1 按全程价预留 47.60 = HK$64.10，其余步行。
- 周日：佐敦→上环 10.60 + 周末日航普通位 212 = HK$222.60；另 MOP 6 公交。
- 周一：铁路中转预算 ¥140–200 + 两程地铁预算 ¥6–10 = ¥146–210，不含返武汉票。

港币交通计划小计 HK$348.90（含 H1 全程价预留），另 MOP 6，人民币交通预算 ¥146–210。按全新默认预算及预算上限折算总规划约 ¥2,962，不含武汉往返长途车票。继承用户自填预算时，总数会相应不同。

## 万圣节、开户清单与出行必看（2026-10-27补充）

- [旅发局2026全城万圣节](https://www.discoverhongkong.com/eng/events/halloween/citywide-halloween-cosplay-celebration.html)：周五安排皇后像广场南面10.17–31装置；周六尖东市集短逛后往海滨向西。兰桂坊、旺角、启德 / 乐园是替换方案，不全部叠加。
- [尖沙咀中心主办公告](https://www.tsimshatsuicentre.com.hk/sc/promotions/tst-east-halloween-beats/)：10月31日么地道花园16:00–23:00免费入场，DJ19:00起。默认16:45–17:10逛市集，不保证DJ。H1目标上车窗口提前至15:30–15:45；延误优先保海滨光线。
- [汇丰One](https://www.hsbc.com.hk/accounts/products/one/)、[蓝狮子借记卡](https://www.hsbc.com.hk/zh-cn/debit-cards/products/mastercard-debit-card/)：One为基础账户，借记卡关联账户申请；非HKID新客按过去三个月平均TRB要求，而非月末一次性存入。App入口、证件和地区资格仍须个别核对。
- [众安访客条件](https://bank.za.group/faqs/Individuals/Account_opening/Open_an_account_for_a_visitor_in_HongKong/66503e51b359be4a195230e8)：在港、身份证、同手机号内地储蓄卡与出入境记录等要求。
- [香港蚂蚁FAQ](https://www.antbank.hk/questions?lang=zh_hk)、[澳门蚂蚁FAQ](https://www.antbank.mo/questions)：空源HTML不能代表没有访客服务，已用浏览器加载动态内容。香港允许合资格内地访客在港申请、无实体卡，访客证券服务不适用；澳门访客在澳申请、银行与证券分别开通，当前新证券账户为保证金融资账户，未自动换汇可能涉及融资，已提醒备对应币种现金及核查费用。
- [中银官方服务宝典](https://www.bochk.com/dam/crossborderservices/25GBAserviceguide_southcross.pdf)第9–10页支持在港线上申请；[收费表](https://www.bochk.com/sc/servicecharge.html)个人FPS本地转账豁免不推广到所有跨境人民币汇款。
- [工银2026VTM公告](https://v.icbc.com.cn/userfiles/resources/icbc/haiwai/asia/download/tc/2026/press20260402c.pdf)官方索引列：罗湖LOW K5铺闸外，落马洲3楼票务大堂311号闸内，专人在线开户每日08:00–20:00。PDF及开户页面直读403，采用官方搜索索引并标明限制；不保证现场机器状态、排队和资格。
- 出行页的电源、货币及通讯分别采用两地旅发机构；澳门官方电压230V/50Hz，不与香港220V/50Hz混写。交通表只引用已核实票价；普通巴士 / 小巴无统一票价，不杜撰区间。
- 法律提醒分别核对香港海关、卫生署2026控烟生效时间、港铁附例及澳门电子烟禁令。旧吸烟罚款HK$1,500不适用于本次2026行程；19支传统烟为香港免税额，非电子烟额度。
- 仅保存事实摘要与链接于 `research/autumn-2026-verified.json`，没有提交整份第三方文章或动态FAQ全文。

新增默认万圣节段仅步行，澳门申请预留30分钟亦不另计交通费，交通总额维持HK$348.90 + MOP6 + 人民币预算¥146–210。收费活动、彩绘、装扮、银行账户资产、替换路线、交通卡押金与未使用优惠不混入默认交通费。

## 恒生香港补充

- [恒生官方跨境开户](https://www.hangseng.com/zh-cn/cross-border-banking/personal/account-opening/)支持年满18岁的合资格内地居民在港连接本地网络后使用恒生Mobile App申请；证件、出入境记录、住址和职业等按银行要求准备。
- [官方手机开户及账户费用](https://www.hangseng.com/zh-hk/personal/banking/account-opening/mobile/)列优进理财无需全面理财总值要求、豁免低额结存服务费；不与优越理财的资金门槛混用，也不推断汇款和全部交易免费。
- 第7个银行目标的勾选编号追加为20，已有银行卡编号7–12和出行准备编号13–19保持不变，旧备份可继续使用。

## 皇岗往返专题（2026-10-28核对）

- [运输署新皇岗交通](https://www.td.gov.hk/tc/transport_in_hong_kong/land_based_cross_boundary_transport/athp/)确认B10成人全程HK$12.10、B13成人HK$27.60，两线双向06:00–次日00:30；口岸24小时不能推断它们通宵。B13为港岛线，非尖沙咀直达。
- [巴士全程票价XML](https://static.data.gov.hk/td/routes-fares-xml/ROUTE_BUS.xml)新下载确认268X成人16.20、268B / 269B 20.80、B10 12.10；[九巴公告](https://www.kmb.hk/news_detail.html?id=1368&year=2026)官方索引确认指定组合按两程较高一程优惠。直接网页为空、浏览器加载超时，已明确这一限制，具体转乘条件需查看APP1933。合资格B10+268X按16.20、268B / 269B+B10按20.80列示。
- 九巴开放API站序与站点数据确认：北行268B / 269B可在尖东站K11 MUSEA（YT632）或尖沙咀转车站中间道（YT102）上车，目的地方向分别朗屏、天水围，途经大榄隧道；南行268X往西九龙方向途经旺角。未声称大榄所有路线一定在同一站柱换车。
- 港铁2026-10-27 CSV快照确认尖沙咀(3)→葵芳(22)成人八达通11、单程票13；加B10后分别23.10 / 25.10。地铁+B10不套九巴公交联程优惠。
- [八达通官方10-12新闻稿](https://www.octopus.com.hk/sc/corporate/media/press-releases/2026/20261012.html)区分深圳地铁特惠站的港铁3元优惠与登记满4程回赠；不将任一种额外扣减B10联程预算。优惠机具体位于A口仍未独立核实。
- [保安局合作查验](https://www.sb.gov.hk/chi/hg/clearance.html)和[口岸FAQ](https://www.sb.gov.hk/chi/hg/faq.html)核对方向楼层、实体证件及不同通道资格；不把一次排队 / 三闸视为每位旅客无登记刷脸。用户所述安检机数量和“完全不排队”仅为当次体验。
- 三个小红书短链无法读取。去程25元、车上20+30分钟、畅通时北上35分钟保留为用户提供参考。尚无承运人当前25元优惠公告，不能保证资格、支付方式、有效期。第三方[巴士资讯网](https://www.i-busnet.com/china/busroute/shenzhen/tst-huanggang.html)仍列成人八达通日间38、深宵43（23:30–05:59），其他支付更贵；网页与用户南下优惠有差异，已并列注明、要求购票前向承运人确认。
- 全部原始数值摘要与官方API摘录保存于research/huanggang-2026-10-28.json；没有将未读取的笔记写作已核实文章。默认四日路线及费用保持原计算，皇岗只提供替换参考。
