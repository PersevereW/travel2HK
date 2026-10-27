'use strict';
const SOURCES = [
 {id:'imm',name:'香港入境事务处 · 全部 13 个管制站与开放时间',url:'https://www.immd.gov.hk/eng/contactus/control_points.html',detail:'页面更新日期 2026-10-27。包含沙头角暂停服务、皇岗及深圳湾旅客开放时间。'},
 {id:'mtr',name:'港铁开放数据 · 车站间票价 CSV',url:'https://opendata.mtr.com.hk/data/mtr_lines_fares.csv',detail:'已下载 9,216 行票价，行程采用 OCT_ADT_FARE（成人八达通普通等），并保留单程票对照。不含头等附加费。'},
 {id:'mtrplan',name:'港铁 · 行程指南 / 首末班车',url:'https://www.mtr.com.hk/en/customer/jp/index.php',detail:'运行时间因换乘与候车而变，页面时间为规划估算，返程请核查目的地末班列车。'},
 {id:'ferry',name:'喷射飞航 · 航线、船期与票价',url:'https://www2.turbojet.com.hk/zh-tw/%E6%B5%B7-%E8%88%B9/',detail:'上环—澳门外港航程约 60 分钟，2026-10-16 起船期含 14:30；2026-04-25 起普通位平日日航 HK$194、周末日航 HK$212、夜航 HK$242。18:30 起为夜航。'},
 {id:'macau',name:'澳门旅游局 · 市内交通',url:'https://www.macaotourism.gov.mo/en/travelessential/before-you-travel/local-transportation',detail:'更新于 2026-06-15。公共巴士现金票价 MOP 6，不设找零；出租车首 1,600 米 MOP 21，后每 220 米加 MOP 2，另有候车及附加费用。'},
 {id:'hsbc',name:'汇丰香港 · 账户比较与费用',url:'https://www.hsbc.com.hk/accounts/products/one/',detail:'非香港身份证持有人于 2026-01-01 起新开 HSBC One：按过去连续三个月平均全面理财总值 HK$10,000 的要求评估，未达标 HK$100/月；并非月底存入一次即可免。以开户时条款为准。'},
 {id:'branch',name:'汇丰香港 · 分行与开户预约查询',url:'https://www.hsbc.com.hk/branch-finder/',detail:'具体分行、营业时间与预约名额需要你确定银行后确认；页面时间是预留办理窗口，不代表银行预约成功。'},
 {id:'docs',name:'汇丰香港 · 开户申请须知（官方 PDF）',url:'https://www.hsbc.com.hk/content/dam/hsbc/hk/docs/accounts/applyaccount-note-en.pdf',detail:'用于核查身份、地址、税务与账户用途相关材料；柜台可要求补充材料。'},
 {id:'bridge',name:'港珠澳大桥穿梭巴士 · 班次与购票',url:'https://www.hzmbus.com/',detail:'已查到港澳线全天运营及分时班次；本次未获取可验证票价表，因此不把常见旧票价当作现价。'},
 {id:'macauports',name:'澳门治安警察局 · 出入境事务站办公时间',url:'https://www.fsm.gov.mo/psp/cht/psp_top9_1.html',detail:'关闸 06:00–次日01:00；青茂 24 小时（仅限符合条件的持证人）；澳门外港 24 小时，实际航班另查。'},
 {id:'macauroute',name:'澳门交通资讯网 · 3 路与新马路 / 华侨站（第三方线路参考）',url:'https://motransportinfo.com/zh/station/M134',detail:'3 路往关闸方向的站点参考。不是官方实时承诺，临时工程改道以交通局 / 站牌为准。'},
 {id:'szmetro',name:'深圳地铁 · 官方站点与票务查询',url:'https://www.szmc.net/',detail:'默认深圳北—莲花北、市民中心—深圳北；本次未核实官方站间票价，页面用预算区间。'},
 {id:'rail',name:'中国铁路 12306 · 武汉返程 / 西九龙车票',url:'https://www.12306.cn/',detail:'车票按车次、席别、发车站实时报价，未提供返程车次，不能锁定具体离深时间和票价。'},
{"id": "tram", "name": "香港电车 · 路线、乘车方式与现行票价", "url": "https://www.hktramways.com/en/schedules-fares", "detail": "普通电车成人 HK$3.30 / 次；后门上、前门下，下车付款。普通电车与另售票的 TramOramic 怀旧观光电车不是同一产品。"},
{"id": "h1fare", "name": "香港运输署 · 巴士路线与全程票价开放数据", "url": "https://static.data.gov.hk/td/routes-fares-xml/ROUTE_BUS.xml", "detail": "H1 路线编号 1475 / 8220，全程票价 HK$47.60；本次仅乘湾仔到尖沙咀一段，按全程价预留，中途分段如有更低价格以当日公布为准。"},
{"id": "h1stops", "name": "城巴官方 · H1 站序与实时到站", "url": "https://mobile.citybus.com.hk/nwp3/?f=1&ds=H1&dsmode=1&l=2", "detail": "已用官方开放 API 核对：12 厦门街 / 皇后大道东（002481），17 星光大道 / 梳士巴利道（003301）；不保证提前锁定车辆、上层位或目标上车时刻。"},
{"id": "hktbphoto", "name": "香港旅发局 · 港岛西 / 坚尼地城街区与摄影", "url": "https://www.discoverhongkong.com/eng/neighbourhoods/central-and-western-district/how-to-spend-your-day-in-kennedy-town.html", "detail": "用作港岛西摄影地点参考；页面中的参考图与建议机位分别标注，不将历史照片当作当前设施和标线保证。"},
{"id": "busguide", "name": "香港旅发局 · 开篷观光巴士体验", "url": "https://www.discoverhongkong.com/tc/deals/hong-kong-night-bus-tour.html", "detail": "“落日飞车”是开篷巴士体验的常见名称。H1 白天路段、H2K 夜游及 Big Bus 是不同路线 / 产品，不把 H2K 18:30 后夜游安排当成日落体验。"},
{"id": "hko", "name": "香港天文台 · 日出日落时间", "url": "https://www.hko.gov.hk/en/gts/astron2026/files/HKO_almanac_2026.pdf", "detail": "傍晚拍摄窗口只是行程预留，并非精确日落预报；实际日落与天气需临行核对。"},
{"id": "starferry", "name": "天星小轮官方 · 普通渡轮航线、票价与班次", "url": "https://www.starferry.com.hk/en/service", "detail": "中环—尖沙咀：周一至周五非公众假期成人上层 HK$5、下层 HK$4；周末及公众假期上层 HK$6.50、下层 HK$5.60。周五中环出发 09:55–20:40 班距 6–8 分钟，首末班 06:30–23:30。无预留座位；官网随身物品限 40×40×17.5cm，本次周五行李留酒店，不安排周日携大箱乘船。"}
];
const DAYS = [
  {
    "date": "10.30",
    "weekday": "周五",
    "short": "开户街拍",
    "city": "深圳 → 香港",
    "title": "中环街拍之后，坐天星过海。",
    "subtitle": "开户 → 金融区 → 石板街 → 望左望右 → 中环七号码头 → 天星小轮 → 九龙酒店",
    "events": [
      {
        "id": "v3-f1",
        "time": "08:00",
        "title": "深圳站到达 · 直接步行去罗湖口岸",
        "description": "到达的是深圳站（罗湖），不是深圳北站。今天不在深圳寄存或入住，带行李步行去旅检大厅，早餐视通关时间灵活安排。",
        "tag": "抵深入港",
        "next": {
          "to": "罗湖口岸旅检大厅",
          "mode": "步行",
          "duration": "约 10–20 分钟",
          "price": "¥0",
          "source": "imm",
          "kind": "recommend"
        }
      },
      {
        "id": "v3-f2",
        "time": "08:30",
        "title": "罗湖过关 · 前往香港佐敦酒店",
        "description": "凭港澳通行证和有效香港签注出境、入境，排队按约 30–60 分钟估算，繁忙时可能更久。香港连续停留至周日，不再每天往返深圳。 工银亚洲如线上未完成，可在入闸乘港铁前查看罗湖站闸外 LOW K5 铺 VTM（专人在线服务每日 08:00–20:00）；队伍长则跳过，不为此改走落马洲。额外办理时间未含在交通耗时内。",
        "tag": "一次入港",
        "next": {
          "to": "佐敦站 → 酒店寄存行李",
          "mode": "东铁线罗湖 → 九龙塘，转观塘线 → 旺角，转荃湾线 → 佐敦",
          "duration": "约 70–90 分钟（含换乘，不含通关及酒店步行）",
          "price": "HK$46.60",
          "source": "mtr",
          "kind": "recommend",
          "currency": "HKD",
          "amount": 46.6,
          "single": 49.5
        }
      },
      {
        "id": "v3-f3",
        "time": "10:30",
        "title": "佐敦酒店 · 寄存行李后赴中环",
        "description": "默认住佐敦站步行约 5–10 分钟范围，周五、周六连住两晚。需事先确认酒店允许早到寄存，不假定可以提前入住；寄存费另计。交通、通关延误时及时联系银行调整预约。",
        "tag": "香港连住",
        "next": {
          "to": "中环站 → 预约银行分行",
          "mode": "荃湾线佐敦 → 中环；步行到分行",
          "duration": "约 25–40 分钟（含酒店至车站及银行步行）",
          "price": "HK$10.60",
          "source": "mtr",
          "kind": "recommend",
          "currency": "HKD",
          "amount": 10.6,
          "single": 12.5
        }
      },
      {
        "id": "v3-f4",
        "time": "11:30",
        "title": "中环 · 线上申请优先，线下只作补办",
        "references": ["hsbcapp", "bocopen"],
        "description": "预留至 15:30 完成汇丰 One / 蓝狮子万事达借记卡、众安、蚂蚁香港、中银香港及恒生香港的 App 申请、资料上传和午餐；已成功的项目不再跑分行。申请必须符合银行所在地与证件要求。汇丰 / 中银 / 恒生线上失败才联系已确认预约的分行；工银亚洲可用入境时罗湖 VTM。没有预约就不假定可即场办理；全清单及收费见「06 开户与准备」。",
        "tag": "主要任务",
        "priority": true,
        "next": {
          "to": "皇后像广场 / 终审法院外围",
          "mode": "步行",
          "duration": "约 5–10 分钟",
          "price": "HK$0",
          "source": "hktbphoto",
          "kind": "recommend"
        }
      },
      {
        "id": "v3-f5",
        "time": "15:40",
        "title": "皇后像广场 · 万圣节装置与建筑人像",
        "references": ["halloween"],
        "description": "顺路看皇后像广场花园南面的万圣节装置；旅发局列展期 10月17–31日，昼夜可看。只按公共区域外观拍摄安排，参加个别项目的费用以主办方为准。周五没有把周六31日遮打道压轴派对写成当日活动。开户延误先跳过，随后向西步行去石板街。",
        "tag": "顺路街拍",
        "next": {
          "to": "砵典乍街石板街",
          "mode": "步行",
          "duration": "约 10–15 分钟",
          "price": "HK$0",
          "source": "hktbphoto",
          "kind": "recommend"
        }
      },
      {
        "id": "v3-f7",
        "time": "16:00",
        "title": "砵典乍街 · 石板街台阶出片",
        "description": "由皇后大道中走入砵典乍街下段台阶，预留约 30 分钟拍街景人像。拍完沿士丹利街 / 威灵顿街向东走出毕打街，接下一段路面标线与码头，不原路下台阶再绕上环。人多时用 2× 镜头压缩背景，别挡住通行。 万圣节前夕可顺路看看台阶旁节庆饰品摊位，是否营业、装饰规模和价格以现场为准。",
        "tag": "经典街景",
        "photoIds": [
          "pottinger"
        ],
        "next": {
          "to": "毕打街 / 德辅道中路口",
          "mode": "步行",
          "duration": "约 10–15 分钟（经不同街段向东走）",
          "price": "HK$0",
          "source": "hktbphoto",
          "kind": "recommend"
        }
      },
      {
        "id": "v3-f6",
        "time": "16:45",
        "title": "「望左 / 望右」· 中环街口拍照",
        "description": "建议在毕打街与德辅道中、遮打道一带合法过路处寻找 LOOK LEFT / LOOK RIGHT 路面标线。它不是唯一固定打卡点，标线是否清晰以现场为准。站在人行道边缘拍脚步与标线，过街只正常通行，不在车道驻留摆拍。",
        "tag": "你的必拍",
        "photoIds": [
          "look-left"
        ],
        "next": {
          "to": "中环七号码头（天星小轮）",
          "mode": "步行",
          "duration": "约 15–25 分钟（经行人天桥 / 中环码头方向）",
          "price": "HK$0",
          "source": "hktbphoto",
          "kind": "recommend"
        }
      },
      {
        "id": "v3-f8",
        "time": "17:20",
        "title": "中环七号码头 · 乘天星小轮过海",
        "description": "在中环七号码头选择往尖沙咀的普通渡轮上层入口，目标约 17:30 左右搭船，实际班次以现场为准。周五此时官网班距约 6–8 分钟；成人上层 HK$5，下层 HK$4。本次行李仍放香港酒店，只带符合官网 40×40×17.5cm 尺寸限制的白天随身物品；普通渡轮不是另售票的维港游，也不是周日往澳门的喷射飞航。",
        "tag": "新增体验",
        "next": {
          "to": "尖沙咀天星码头",
          "mode": "普通天星小轮 · 中环七号码头 → 尖沙咀 · 上层",
          "duration": "乘船约 8–10 分钟；含候船和进出闸约 20–35 分钟（估算）",
          "price": "HK$5.00",
          "source": "starferry",
          "kind": "recommend",
          "currency": "HKD",
          "amount": 5,
          "note": "周五非公众假期成人上层价；同航线周末上层 HK$6.50、下层 HK$5.60。官网中环往尖沙咀周五 09:55–20:40 班距 6–8 分钟，航班会随海况调整，不保证固定 17:30 发船。"
        },
        "photoIds": [
          "star-ferry"
        ]
      },
      {
        "id": "v3-ferry-walkback",
        "time": "约18:00",
        "title": "尖沙咀码头 · 沿弥敦道回佐敦",
        "description": "下船后经梳士巴利道接弥敦道向北，沿途晚餐，再步行回佐敦酒店。今天只把天星作为回酒店的过海体验，不加星光大道来回折返；星光大道、钟楼和海滨完整拍摄放周六。",
        "tag": "顺路回酒店",
        "next": {
          "to": "佐敦酒店 / 周边晚餐",
          "mode": "步行",
          "duration": "约 25–40 分钟（不含晚餐）",
          "price": "HK$0",
          "source": "mtrplan",
          "kind": "recommend"
        }
      },
      {
        "id": "v3-f9",
        "time": "20:00",
        "title": "回酒店 · 确认周六体验安排",
        "description": "核对银行后续补件，并打开城巴 H1 实时到站与香港电车服务公告。周六从湾仔中途站乘 H1，不能保证上层空位；不为争抢前排再绕回中环总站。",
        "tag": "整理手帐"
      }
    ],
    "route": [
      "中环银行区",
      "皇后像广场",
      "砵典乍街",
      "毕打街路口",
      "中环七号码头",
      "天星小轮",
      "尖沙咀码头",
      "佐敦"
    ],
    "routeNote": "石板街后沿士丹利街 / 威灵顿街向东走出毕打街，再向北去码头，不原路返回石板街。天星小轮承担周五回九龙的过海段；周六保留 H1 和星光大道主拍，不安排当天来回坐船。"
  },
  {
    "date": "10.31",
    "weekday": "周六",
    "short": "万圣街拍",
    "city": "港岛西 → 湾仔 → 尖沙咀",
    "title": "从叮叮声，到维港的暮色。",
    "subtitle": "坚尼地城 → 叮叮车 → 湾仔 → H1 → 尖东万圣市集 → 星光大道 → 维港 / 钟楼 → 佐敦",
    "events": [
      {
        "id": "v3-s1",
        "time": "08:45",
        "title": "佐敦早餐 · 直接去坚尼地城",
        "description": "早餐后过海直达坚尼地城，今天不在旺角、油麻地和港岛之间来回切换。若需补办开户，先确认分行安排，再压缩坚尼地城或湾仔停留，保留傍晚维港窗口。",
        "tag": "一路向东",
        "next": {
          "to": "坚尼地城站 → 海旁",
          "mode": "佐敦荃湾线 → 中环，转港岛线 → 坚尼地城",
          "duration": "约 45–60 分钟（含出站及海旁步行）",
          "price": "HK$13.20",
          "source": "mtr",
          "currency": "HKD",
          "amount": 13.2,
          "single": 15.5,
          "kind": "recommend"
        }
      },
      {
        "id": "v3-s2",
        "time": "10:00",
        "title": "坚尼地城 · 海旁与吉席街",
        "description": "从坚尼地城站步行到新海旁、吉席街一带，拍海风人像和叮叮车穿街。照片中的吉席街用于街景参考，不冒充篮球场海景同一机位；本次不排队进入球场、不绕去西环泳棚。",
        "tag": "海旁街拍",
        "photoIds": [
          "kennedy"
        ],
        "next": {
          "to": "坚尼地城电车总站",
          "mode": "步行",
          "duration": "约 5–15 分钟",
          "price": "HK$0",
          "source": "tram",
          "kind": "recommend"
        }
      },
      {
        "id": "v3-s3",
        "time": "11:15",
        "title": "叮叮车 · 从港岛西慢慢坐到湾仔",
        "description": "在坚尼地城总站乘东行、途经湾仔的电车（看清终点及车内站点指示）。坐到湾仔庄士敦道一带下车，往蓝屋步行。后门上、前门下，下车付款；普通电车成人每次 HK$3.30，不是另收费的怀旧观光电车。",
        "tag": "必体验",
        "photoIds": [
          "dingding"
        ],
        "next": {
          "to": "湾仔庄士敦道 → 蓝屋周边",
          "mode": "东行普通叮叮车 + 步行",
          "duration": "约 65–90 分钟（含候车、乘车与步行，估算）",
          "price": "HK$3.30",
          "currency": "HKD",
          "amount": 3.3,
          "source": "tram",
          "kind": "recommend",
          "note": "可选往跑马地或筲箕湾、途经湾仔的车；以车内指示 / 官方地图确认下车站。上层靠窗坐稳拍摄，不伸出车外。"
        }
      },
      {
        "id": "v3-s4",
        "time": "13:00",
        "title": "湾仔午餐 · 蓝屋、石水渠街与利东街",
        "description": "在湾仔午餐，然后沿石水渠街拍蓝屋外墙，再向北经太原街、利东街走向皇后大道东厦门街站。预留约两小时用餐和拍照，不进入住宅，不依赖室内展馆开放。",
        "tag": "彩色港味",
        "photoIds": [
          "blue-house"
        ],
        "next": {
          "to": "H1 厦门街站（皇后大道东）",
          "mode": "步行",
          "duration": "约 10–20 分钟",
          "price": "HK$0",
          "source": "hktbphoto",
          "kind": "recommend"
        }
      },
      {
        "id": "v3-s5",
        "time": "15:15",
        "title": "H1 站前准备 · 查到站与座位",
        "description": "在官方站号 002481「厦门街，皇后大道东」候车，目标约 15:30–15:45 上 H1 往尖沙咀，班次当天查看。中途站不保证上层位，万圣节封路或延误时先查城巴公告；若赶不上光线，跳过万圣市集直去海滨，不为座位绕回中环。",
        "tag": "不绕回总站",
        "photoIds": [
          "sunset-bus"
        ],
        "next": {
          "to": "星光大道站 → 么地道花园",
          "mode": "城巴 H1 开篷观光巴士 · 湾仔厦门街 → 星光大道",
          "duration": "乘车含候车约 45–70 分钟；下车至花园再步行约 5–10 分钟（估算）",
          "price": "HK$47.60",
          "currency": "HKD",
          "amount": 47.6,
          "source": "h1fare",
          "kind": "recommend",
          "note": "运输署 H1 全程票价 HK$47.60；预算按全程价预留，中途站如适用较低分段价以当日公布为准。官方站序：厦门街 12 → 星光大道 17。乘车体验不保证看到海上落日，也不保证开篷车辆 / 前排位。"
        }
      },
      {
        "id": "v3-s-halloween",
        "time": "约16:45–17:10",
        "title": "尖东么地道花园 · 万圣市集与变装合影",
        "description": "加入 TST East Halloween Beats：10月31日活动 16:00–23:00，免费入场，市集、装置与变装气氛适合短拍；DJ 派对 19:00 才开始，本时段不承诺看到 DJ。先逛约20分钟，17:10前离开保住维港拍摄窗口。若想看夜间DJ，以其替换后面的海滨晚餐段，需重新调整动线，不默认再走回花园。餐饮、彩绘等另付费。",
        "tag": "万圣节正日",
        "next": {
          "to": "星光大道东段 / 李小龙铜像",
          "mode": "步行 · 从么地道花园向南接海滨",
          "duration": "约 10–15 分钟（估算）",
          "price": "HK$0",
          "source": "halloweentst",
          "kind": "recommend"
        }
      },
      {
        "id": "v3-s6",
        "time": "约17:20",
        "title": "星光大道 · 李小龙与海滨人像",
        "description": "从么地道花园向南到星光大道东段李小龙铜像，拍人物与海景，再沿海滨一路向西。目标约17:20开始；如果 H1 延误，跳过花园直接拍海滨。不在日落前再逛商场，也不回尖东追晚间DJ。",
        "tag": "你的必拍",
        "photoIds": [
          "avenue-stars"
        ],
        "next": {
          "to": "尖沙咀海滨中段 → 香港文化中心",
          "mode": "步行",
          "duration": "约 15–25 分钟（不含拍摄）",
          "price": "HK$0",
          "source": "hktbphoto",
          "kind": "recommend"
        }
      },
      {
        "id": "v3-s7",
        "time": "17:30–18:30",
        "title": "维多利亚港 · 暮色、天际线与钟楼",
        "description": "沿星光大道向西走，拍维港对岸天际线、香港文化中心外部和钟楼。17:00–18:30 是本次留出的傍晚拍摄窗口，不是保证的日落时间；天气和实际落日以天文台为准。暮色时人物用 2×，夜景用主摄和栏杆稳定手机。",
        "tag": "你的必拍",
        "photoIds": [
          "victoria-harbour"
        ],
        "next": {
          "to": "钟楼 → 半岛酒店外部 → 弥敦道晚餐",
          "mode": "步行",
          "duration": "约 10–20 分钟",
          "price": "HK$0",
          "source": "hktbphoto",
          "kind": "recommend"
        }
      },
      {
        "id": "v3-s8",
        "time": "19:00",
        "title": "半岛酒店外观 · 沿弥敦道回佐敦",
        "description": "拍半岛外部街景，在尖沙咀至佐敦之间用晚餐，再沿弥敦道向北回酒店。海滨只走一遍，不再回海港城或跨回港岛。今日步行约 6–9 公里，雨天可跳过部分街拍。",
        "tag": "香港第 2 晚",
        "next": {
          "to": "佐敦酒店",
          "mode": "步行",
          "duration": "约 20–35 分钟",
          "price": "HK$0",
          "source": "hktbphoto",
          "kind": "recommend"
        }
      }
    ],
    "route": [
      "坚尼地城",
      "叮叮车东行",
      "湾仔蓝屋",
      "H1 厦门街站",
      "尖东万圣市集",
      "星光大道",
      "维港 / 钟楼",
      "佐敦"
    ],
    "routeNote": "港岛由西向东；H1 在湾仔上车，至尖东先短逛么地道花园，再向南接星光大道。海滨从东向西走到钟楼，最后向北回佐敦；不跨海赶兰桂坊，不回尖东追夜间DJ。所有活动停留与步行耗时为规划值。"
  },
  {
    "date": "11.01",
    "weekday": "周日",
    "short": "港澳珠海",
    "city": "香港 → 澳门 → 珠海",
    "title": "香港再逛半天，下午去澳门。",
    "subtitle": "推荐 14:30 上环 → 澳门外港 · 晚上关闸 / 拱北步行过关 · 珠海住一晚",
    "events": [
      {
        "id": "v3-u1",
        "time": "09:00",
        "title": "香港退房 · 带行李直接去上环",
        "description": "吃完早餐退房，取齐全部行李再上地铁。今天不采用“先去港岛拍照、再回佐敦拿行李”的走法；大箱时少走街区，把午餐和候船放在信德中心。",
        "tag": "只过海一次",
        "next": {
          "to": "上环站 → 西港城外围",
          "mode": "佐敦荃湾线 → 中环，站内换港岛线 → 上环",
          "duration": "约 30–45 分钟（含酒店与出站步行）",
          "price": "HK$10.60",
          "source": "mtr",
          "currency": "HKD",
          "amount": 10.6,
          "single": 12.5,
          "kind": "recommend"
        }
      },
      {
        "id": "v3-u2",
        "time": "10:00",
        "title": "上环最后半天 · 西港城与码头周边",
        "description": "在西港城外围、德辅道西一带拍电车与旧楼，随后沿干诺道西向信德中心走。周五已拍过石板街，今天不再上山重逛；行李全程随身，午餐留在信德中心附近。店铺周日营业以现场为准。",
        "tag": "朝码头走",
        "next": {
          "to": "信德中心三楼港澳码头",
          "mode": "步行",
          "duration": "约 10–20 分钟（不含用餐 / 拍照）",
          "price": "HK$0",
          "source": "hktbphoto",
          "kind": "recommend"
        }
      },
      {
        "id": "v2-u3",
        "time": "13:30",
        "title": "港澳码头 · 报到与香港离境",
        "description": "13:30 前到信德中心三楼港澳码头。建议提前 60 分钟报到，依船票完成出境和检票；船公司要求至少提前 30 分钟入闸。上午带行李一路向码头移动，不再往返佐敦。大件行李托运政策及额外费用以船公司为准。",
        "tag": "候船",
        "next": {
          "to": "澳门外港客运码头",
          "mode": "14:30 上环 → 澳门外港 · 喷射飞航普通位",
          "duration": "官方航程约 60 分钟；澳门入境另预留约 30–60 分钟",
          "price": "HK$212",
          "source": "ferry",
          "kind": "recommend",
          "currency": "HKD",
          "amount": 212,
          "note": "周末日航官方票价，自 2026-04-25 生效；14:30 班在 2026-10-16 起船期中，未购票。"
        }
      },
      {
        "id": "v2-u4",
        "time": "16:15–16:45",
        "title": "澳门外港 · 先申请蚂蚁澳门，再步行旧城",
        "description": "入境后在码头公共休息区坐定约30分钟，用「蚂蚁银行（澳门）」App 提交银行开户及按需申请港美股证券服务，保存入境凭条与有效出入境记录。只在澳门境内提交，不保证当日审批或拿到实体卡。完成后经友谊大马路步行往大三巴，约3公里；拖大箱可改公交 / 的士并另计费用。",
        "tag": "澳门半岛",
        "next": {
          "to": "大三巴牌坊外部广场",
          "mode": "步行",
          "duration": "约 45–60 分钟",
          "price": "MOP 0",
          "source": "macau",
          "kind": "recommend"
        }
      },
      {
        "id": "v2-u5",
        "time": "约17:45",
        "title": "大三巴 · 板樟堂与议事亭前地",
        "description": "拍大三巴外部广场，沿大三巴街、板樟堂街走到议事亭前地，晚餐与小吃留在旧城。这里按公共空间 / 外观游览，不依赖教堂或博物馆的晚间开放。",
        "tag": "旧城晚餐",
        "next": {
          "to": "议事亭前地 → 新马路 / 华侨站",
          "mode": "步行",
          "duration": "约 15–25 分钟（不含晚餐）",
          "price": "MOP 0",
          "source": "macau",
          "kind": "recommend"
        }
      },
      {
        "id": "v2-u6",
        "time": "19:30",
        "title": "旧城出发 · 前往关闸",
        "description": "从新马路 / 华侨站查询 3 路往关闸方向，现金备好 MOP 6，不找零。线路可能因大赛车防撞栏工程临时调整，上车前以交通局实时信息和站牌为准；若停靠调整，改走附近临时站。",
        "tag": "赴珠海",
        "next": {
          "to": "澳门关闸旅检大厅",
          "mode": "公交 3 路往关闸 + 步行；临时改道以现场为准",
          "duration": "约 35–55 分钟（含候车、步行，估算）",
          "price": "MOP 6",
          "source": "macau",
          "kind": "recommend",
          "currency": "MOP",
          "amount": 6,
          "note": "现金票价已由澳门旅游局核实；3 路站点参考交通资讯网，出发前须核查当日工程改道。"
        }
      },
      {
        "id": "v2-u7",
        "time": "20:30",
        "title": "关闸 → 拱北 · 入境珠海",
        "description": "澳门关闸开放 06:00–次日 01:00，推荐 20:30 左右进入旅检大厅，避免踩关门时间。预留约 30–60 分钟通关；步行查验不另收通关费。",
        "tag": "步行过关",
        "next": {
          "to": "珠海拱北 / 珠海站附近酒店",
          "mode": "关闸出境 → 拱北入境；步行到酒店",
          "duration": "通关约 30–60 分钟 + 酒店步行约 10–20 分钟",
          "price": "¥0",
          "source": "macauports",
          "kind": "recommend",
          "note": "备选青茂为 24 小时，但只限符合条件的持证人；默认走关闸 / 拱北，不自动改走青茂。"
        }
      },
      {
        "id": "v2-u8",
        "time": "21:30",
        "title": "珠海拱北入住 · 为周一早出发做准备",
        "description": "酒店优先选珠海站步行约 10–20 分钟范围。核对周一珠海 → 广州南 → 深圳北两程票，建议选 07:00–07:30 左右从珠海出发、10:00 前到深圳北的实际可售组合；无合适车票则缩短深圳游玩。",
        "tag": "珠海第 1 晚"
      }
    ],
    "route": [
      "佐敦退房",
      "上环站",
      "西港城外围",
      "信德中心",
      "澳门外港",
      "旧城",
      "拱北 / 珠海"
    ],
    "routeNote": "退房后直接带行李去上环；上午只在码头附近的平路街区慢逛，午餐后进信德中心候船，不再回佐敦取行李。"
  },
  {
    "date": "11.02",
    "weekday": "周一",
    "short": "深圳返汉",
    "city": "珠海 → 深圳 → 武汉",
    "title": "早到深圳，逛半天再回武汉。",
    "subtitle": "铁路经广州南到深圳北 · 莲花山 / 市民中心短游 · 下午从深圳出发，非下午已到武汉",
    "events": [
      {
        "id": "v2-m1",
        "time": "06:00",
        "title": "珠海退房 · 步行到珠海站",
        "description": "早餐、退房后带齐全部行李前往珠海站（拱北附近，不是珠海北站）。按已购买的早班车安排到站，至少留 30–45 分钟进站候车。",
        "tag": "早出发",
        "next": {
          "to": "珠海站候车大厅",
          "mode": "步行",
          "duration": "约 10–20 分钟（酒店距离不同）",
          "price": "¥0",
          "source": "rail",
          "kind": "recommend"
        }
      },
      {
        "id": "v2-m2",
        "time": "约07:00",
        "title": "珠海 → 广州南 → 深圳北",
        "description": "优先购买可衔接的两程二等座，广州南同站换乘建议至少留 30–45 分钟。这里 07:00 仅是目标出发窗口，不是已核实车次；必须先在 12306 确认实际票面时间、票价和余票。",
        "tag": "铁路转城",
        "next": {
          "to": "深圳北站",
          "mode": "珠海站 → 广州南，同站换乘 → 深圳北",
          "duration": "按车次组合约 2–3 小时（含换乘，规划值）",
          "price": "预算 ¥140–200",
          "source": "rail",
          "kind": "recommend",
          "currency": "CNY",
          "low": 140,
          "high": 200,
          "note": "非官方实时报价；需选 10:00 前抵深组合。两程中转票纳入预算，武汉长途返程另计。"
        }
      },
      {
        "id": "v2-m3",
        "time": "约10:00",
        "title": "深圳北 · 行李寄存后去莲花山",
        "description": "先确认正规寄存点是否营业及取回时间，寄存费用另计。若列车晚点或返汉车次较早，缩短或取消景点；不要为打卡压缩进站候车时间。",
        "tag": "深圳半日",
        "next": {
          "to": "莲花北站 → 莲花山公园北入口",
          "mode": "地铁 4 号线深圳北 → 莲花北，步行到公园",
          "duration": "约 30–45 分钟（含进出站及步行）",
          "price": "预算 ¥3–5",
          "source": "szmetro",
          "kind": "recommend",
          "currency": "CNY",
          "low": 3,
          "high": 5,
          "note": "深圳地铁站间票价尚未获得官方核验，预算待以官方 App 核实。"
        }
      },
      {
        "id": "v2-m4",
        "time": "11:00",
        "title": "莲花山公园 · 市民中心片区",
        "description": "在公园散步，体力允许再看城市中轴线；经公园南侧到市民中心周边午餐。只选一个片区，不再跨去东门或蛇口。若有行李未寄存则缩小步行范围。",
        "tag": "深圳游玩",
        "next": {
          "to": "市民中心周边午餐 / 地铁站",
          "mode": "步行",
          "duration": "约 30–50 分钟（不含爬山停留与午餐）",
          "price": "¥0",
          "source": "szmetro",
          "kind": "recommend"
        }
      },
      {
        "id": "v2-m5",
        "time": "12:30",
        "title": "返回深圳北 · 取行李、候车",
        "description": "市民中心站乘 4 号线回深圳北，取回行李，建议至少提前 60 分钟进入高铁候车安排。默认建议订 15:00 或之后返武汉的车次；若已买更早车票，必须同步提前此段。",
        "tag": "返汉预留",
        "next": {
          "to": "深圳北站 → 取行李与候车",
          "mode": "地铁 4 号线市民中心 → 深圳北",
          "duration": "约 30–45 分钟 + 取行李约 15–30 分钟，另留 60 分钟候车",
          "price": "预算 ¥3–5",
          "source": "szmetro",
          "kind": "recommend",
          "currency": "CNY",
          "low": 3,
          "high": 5,
          "note": "票价为预算；返程发车站暂按深圳北，若实际车票为深圳站 / 机场需重排行程。"
        }
      },
      {
        "id": "v2-m6",
        "time": "下午",
        "title": "深圳北 → 武汉 · 结束旅行",
        "description": "建议 15:00 或之后从深圳出发，具体车次、席别、耗时和票价待你填写。周一下午返回按下午离开深圳理解，不承诺下午抵达武汉。若你要求下午到武汉，深圳游玩时间需要大幅缩短。",
        "tag": "待填车次"
      }
    ],
    "route": [
      "珠海站",
      "广州南换乘",
      "深圳北",
      "莲花山 / 市民中心",
      "深圳北",
      "武汉"
    ],
    "routeNote": "跨城后只逛福田一个片区；返回深圳北是接武汉车次所需的回站段，不再增加跨区景点。"
  }
];
// 香港全量范围：入境事务处公布的 13 个管制站。通关手续免费，交通费另算。
const PORTS=[
 {name:'罗湖 / Lo Wu',group:'深港陆路',hours:'06:30–24:00',way:'步行旅检 + 东铁线',fee:'通关 HK$0；罗湖→中环 HK$52.20',route:'东铁线 → 金钟；去中环站内换荃湾线。约 65–80 分钟，成人八达通普通等。',tip:'周五从深圳站到达后首选，香港两晚连住。口岸关闭时间不等于去罗湖的末班车时间。',source:'imm',fareSource:'mtr'},
 {name:'皇岗 / Huanggang',group:'深港陆路',hours:'24 小时',way:'按当前现场旅检安排；跨境巴士 / 合规车辆',fee:'通关 HK$0；跨境车票实时查询',route:'选择直达旺角 / 佐敦等市区的跨境巴士；约 45–90 分钟车程，另加等车和通关。',tip:'入境处当前页面说明已采用合作查验模式；新旧站场交通以现场和承运人公告为准，旧皇巴攻略不作为现行依据。',source:'imm'},
 {name:'福田 / 落马洲支线',group:'深港陆路',hours:'06:30–22:30',way:'步行旅检 + 东铁线落马洲站',fee:'通关 HK$0；落马洲→金钟 HK$52.20',route:'东铁线直达金钟，约 55–70 分钟；去中环可站内换荃湾线并重查全程票价。',tip:'适合福田口岸附近住宿；返程终点选「落马洲」，不要误乘「罗湖」。',source:'imm',fareSource:'mtr'},
 {name:'深圳湾 / Shenzhen Bay',group:'深港陆路',hours:'旅客 06:30–24:00',way:'步行旅检；港方乘公交 / 跨境车',fee:'通关 HK$0；公交按线路报价（待核）',route:'可查城巴 B3X 至屯门，再接屯马线至尖东；全段约 75–110 分钟，不含通关。',tip:'适合南山住宿。货车 24 小时不代表旅客 24 小时；班次、票价须查询承运人。',source:'imm'},
 {name:'莲塘 / 香园围',group:'深港陆路',hours:'07:00–22:00',way:'步行旅检，港方接巴士',fee:'通关 HK$0；巴士按线路报价（待核）',route:'可查九巴 B9 到屯马线沿线，或 B7 到粉岭接东铁线；到市区约 75–120 分钟。',tip:'适合莲塘片区；非本次主线，巴士班次与票价出发前核对。',source:'imm'},
 {name:'文锦渡 / Man Kam To',group:'深港陆路',hours:'07:00–22:00',way:'过境巴士 / 指定跨境交通',fee:'通关 HK$0；过境车票待核',route:'通过获许可的过境巴士接驳上水，再转东铁线到九龙 / 港岛；约 75–120 分钟。',tip:'不安排为普通步行直达市区的主线；先确认车辆、上客点与班次。',source:'imm'},
 {name:'沙头角 / Sha Tau Kok',group:'深港陆路',hours:'暂停旅客通关',way:'暂停服务',fee:'不适用',route:'不安排出入境路线；选择莲塘 / 罗湖等开放口岸。',tip:'入境处公告：直至另行通知。不能因附近旅游区开放而认为口岸恢复。',source:'imm'},
 {name:'广深港高铁西九龙',group:'铁路',hours:'06:30–23:30',way:'持跨境高铁票；西九龙一地两检',fee:'通关 HK$0；高铁票按车次实时查询',route:'深圳北 / 福田 → 西九龙；出站步行到尖沙咀一带约 20–30 分钟，也可接柯士甸 / 九龙站。',tip:'车程以车票为准；为候车、安检和两地通关留足时间。无高铁票不能把它当作步行口岸。',source:'imm',fareSource:'rail'},
 {name:'港珠澳大桥香港口岸',group:'港澳及海空',hours:'24 小时',way:'金巴往珠海 / 澳门；两端分别办理出入境',fee:'通关 HK$0；金巴票价未核验',route:'香港口岸可查 B6 到东涌，接东涌线去香港站；东涌→中环港铁 HK$24.30，巴士另计，全程约 65–95 分钟。',tip:'不是深圳口岸；从深圳绕行大桥去澳门不作为本次默认推荐。官网港澳线全天营运。',source:'imm',fareSource:'bridge'},
 {name:'港澳客轮码头 / 上环',group:'港澳及海空',hours:'24 小时（口岸）',way:'往来澳门等航线的客轮',fee:'通关 HK$0；船票以具体航线为准',route:'上环信德中心，接上环站港岛线 → 中环；也可步行约 15–25 分钟。',tip:'口岸 24 小时不代表所有航线 24 小时有船。澳门航班参见喷射飞航官网。',source:'imm',fareSource:'ferry'},
 {name:'中国客运码头 / 中港城',group:'港澳及海空',hours:'07:00–24:00',way:'指定跨境客轮',fee:'通关 HK$0；船票按航线查询',route:'位于尖沙咀广东道中港城，步行至尖沙咀站约 10–20 分钟。',tip:'先确认具体航线有开，不把旧港澳航线时刻表当现行船期。',source:'imm'},
 {name:'香港国际机场',group:'港澳及海空',hours:'T1 24 小时；T2 05:15–次日00:15',way:'航空；符合条件的转驳服务另计',fee:'通关 HK$0；机票 / 机场交通实时查询',route:'机场快线 → 香港站；约 24 分钟列车时间，另加候车及进出站。普通市区巴士更便宜但时间更长。',tip:'机场海天码头中转有特定资格，不能当普通深圳游客入香港市区的码头。',source:'imm'},
 {name:'启德邮轮码头',group:'港澳及海空',hours:'06:00–23:00，随邮轮靠泊安排',way:'国际邮轮旅客',fee:'通关 HK$0；船票和市区接驳另计',route:'查当日码头接驳巴士至启德 / 九龙湾等港铁站，再往市中心，约 40–75 分钟。',tip:'不是一般深港或港澳散客渡轮口岸；无邮轮行程不采用。',source:'imm'},
 {name:'深圳蛇口 ↔ 澳门外港（备选参考）',group:'其他海路',hours:'按船班；去 11:00 / 16:30，返 12:30 / 18:00',way:'跨境客轮；两地分别查验证件',fee:'周日在线成人经济舱 HK$275/程',route:'蛇口邮轮中心 → 澳门外港约 60 分钟；外港步行到大三巴约 40–55 分钟，或乘公交现金 MOP 6。',tip:'旧方案海路参考，新方案不乘此线；它不是香港 13 个管制站之一。船班不等于大厅开放时间。',source:'ferry',fareSource:'macau'},
{"name": "澳门外港客运码头（本次入境）", "group": "本次澳门", "hours": "24 小时（口岸）；船班另查", "way": "上环乘喷射飞航赴澳门，外港入境", "fee": "周末日航普通位 HK$212/程；入境查验免费", "route": "推荐周日 14:30 上环出发，约 60 分钟抵外港；入境后步行旧城约 45–60 分钟。", "tip": "抵达后只游澳门半岛，晚上从关闸离境，不回香港、不回蛇口。", "source": "macauports", "fareSource": "ferry"},
{"name": "澳门关闸 / 珠海拱北（本次出境）", "group": "本次澳门", "hours": "06:00–次日01:00", "way": "步行旅检：澳门出境 → 珠海入境", "fee": "查验 ¥0；旧城至关闸公交现金 MOP 6", "route": "议事亭前地周边步行至新马路 / 华侨站，查 3 路往关闸；以当日站牌 / 临时改道为准。过关后步行至拱北酒店。", "tip": "建议周日 20:30 进大厅，约 30–60 分钟通关（估算），不踩最后关门时间。", "source": "macauports", "fareSource": "macau"},
{"name": "青茂（珠澳备用）", "group": "本次澳门", "hours": "24 小时", "way": "仅限符合资格的持证人，须确认可使用的通道", "fee": "步行查验 ¥0；到口岸交通另计", "route": "从澳门市区前往青茂，珠海侧步行至珠海站一带；具体站点另查。", "tip": "不因 24 小时就默认所有旅客都可使用。默认路线走关闸 / 拱北，改走青茂先核验证件资格。", "source": "macauports"}
];
const CHECKS=[
  "港澳通行证原件、有效香港签注及有效澳门签注；默认一次赴港、一次赴澳",
  "先确认各银行 App 开户资格；需要线下补办才预约周五 11:30 之后分行或核查工银 VTM",
  "身份证、地址证明、税务居民资料 / 税号、账户用途和资金来源资料（按银行要求）",
  "可收短信的手机、漫游 / 数据流量、银行卡及少量港币和澳门币现金",
  "周日上环 → 澳门外港 14:30 船票、13:30 报到安排及行李政策",
  "周五周六香港两晚、周日珠海一晚；确认周五早到寄存，周日退房直接带行李去上环",
  "先买周一珠海 → 广州南 → 深圳北中转票，再匹配深圳北 → 武汉下午返程票；查天气与临时改道"
];

const PHOTO_SPOTS = [
  {
    "id": "pottinger",
    "image": "central",
    "day": 0,
    "order": 1,
    "title": "石板街 · 砵典乍街",
    "area": "中环 → 上环方向",
    "when": "周五 16:00 · 开户后顺路",
    "where": "砵典乍街下段台阶；拍完经士丹利街 / 威灵顿街向东接毕打街",
    "tip": "利用台阶纵深，人物站在侧边不挡路。背景人多时拍中景，等一小段空档再按快门。",
    "frame": "2× 人像，1× 台阶纵深",
    "fee": "免费公共街景",
    "query": "Pottinger Street Hong Kong",
    "caption": "石板街实景参考；游客、店铺装饰和光线会变化。",
    "type": "photo"
  },
  {
    "id": "look-left",
    "image": "crossing",
    "day": 0,
    "order": 2,
    "title": "望左 / 望右路面标线",
    "area": "中环 · 毕打街一带",
    "when": "周五 16:45 · 街拍后向北接码头",
    "where": "毕打街 × 德辅道中 / 遮打道附近合法过路处，按现场标线寻找",
    "tip": "站在人行道上俯拍鞋子与箭头，人物取半身或背影；不在行车道长时间摆拍。",
    "frame": "1× 俯拍标线；2× 拍街头半身",
    "fee": "免费公共街景",
    "query": "Pedder Street Des Voeux Road Central Hong Kong",
    "caption": "望左标线示例，原图未标明中环具体路口，不代表建议地点同一机位。",
    "type": "photo"
  },
  {
    "id": "star-ferry",
    "image": "starferry",
    "day": 0,
    "order": 3,
    "title": "天星小轮 · 坐船过维港",
    "area": "中环七号码头 → 尖沙咀 · 单程",
    "when": "周五目标 17:30 左右 · 班次以现场为准",
    "where": "中环七号码头往尖沙咀普通渡轮上层入口，下船后向北回佐敦",
    "tip": "坐稳后拍侧脸、木椅、舷窗与港岛天际线；靠窗有位再选，船上不设预留座位。只带白天随身小包，行李留酒店。",
    "frame": "1× 舷窗框景；2× 人物与海港",
    "fee": "周五成人上层 HK$5；下层 HK$4",
    "query": "Central Pier 7 Star Ferry Hong Kong",
    "caption": "真实天星小轮历史实景图，非本次船只、座位或日落光线保证。普通渡轮与另售票的维港游不同。",
    "type": "experience"
  },
  {
    "id": "kennedy",
    "image": "kennedy",
    "day": 1,
    "order": 4,
    "title": "坚尼地城 · 海旁与电车街",
    "area": "港岛西端",
    "when": "周六 10:00 · 白天海旁与街景",
    "where": "坚尼地城新海旁、吉席街周边公共行人区",
    "tip": "海旁拍侧身与风吹头发，吉席街拍旧楼和电车层次。街景图不是球场机位；本次不排队进球场。",
    "frame": "海旁 2× 人像；街景 1×",
    "fee": "免费公共街景",
    "query": "Kennedy Town New Praya Hong Kong",
    "caption": "图为吉席街电车街景，不是海旁或篮球场同一角度。",
    "type": "photo"
  },
  {
    "id": "dingding",
    "image": "tram",
    "day": 1,
    "order": 5,
    "title": "叮叮车 · 把港岛坐进镜头",
    "area": "坚尼地城 → 湾仔 · 东行",
    "when": "周六 11:15 · 普通电车一段直坐",
    "where": "坚尼地城总站东行上车，往湾仔庄士敦道方向",
    "tip": "坐稳后用车窗做画框，拍侧脸、倒影和流动街景；玻璃反光明显时让镜头靠近窗，但不伸出车外。",
    "frame": "1× 车窗叙事，短视频 5–10 秒",
    "fee": "普通电车成人 HK$3.30 / 次",
    "query": "Kennedy Town Tram Terminus Hong Kong",
    "caption": "电车实景参考图摄于夜间；本次安排白天普通电车体验，涂装和车辆可能不同。",
    "type": "experience"
  },
  {
    "id": "blue-house",
    "image": "bluehouse",
    "day": 1,
    "order": 6,
    "title": "湾仔蓝屋 · 彩色街角人像",
    "area": "石水渠街 → 太原街 / 利东街",
    "when": "周六 13:00–15:00 · 午餐后",
    "where": "蓝屋石水渠街外部行人区，拍完向北走去 H1 厦门街站",
    "tip": "人站蓝色墙面边侧，用楼宇竖线构图；保留门窗层次。这里是生活街区，不进入住宅拍照。",
    "frame": "2× 中景人像；1× 建筑全景",
    "fee": "外部街景免费，未安排室内参观",
    "query": "Blue House Stone Nullah Lane Hong Kong",
    "caption": "蓝屋历史实景图；现场外墙和遮挡以当天为准。",
    "type": "photo"
  },
  {
    "id": "sunset-bus",
    "image": "bus",
    "day": 1,
    "order": 7,
    "title": "落日飞车 · H1 开篷巴士",
    "area": "湾仔厦门街 → 尖沙咀",
    "when": "周六约 15:30–15:45 目标上车 · 当天查到站",
    "where": "官方站号 002481 厦门街（皇后大道东），H1 往尖沙咀；003301 星光大道站下",
    "tip": "上层有座时坐稳拍半身与城市背景，不为前排倒回总站。风大收好帽子；穿隧道时不拍照，不站立或探身。",
    "frame": "1× 人物 + 城市；避免广角贴脸",
    "fee": "按官方全程价 HK$47.60 预留",
    "query": "Amoy Street Queen's Road East bus stop Hong Kong",
    "caption": "图为真实 H1 开篷车的历史涂装，非本次车辆、座位或日落保证。",
    "type": "experience"
  },
  {
    "id": "avenue-stars",
    "image": "stars",
    "day": 1,
    "order": 8,
    "title": "星光大道 · 海风与电影感",
    "area": "尖沙咀海滨东段 → 西行",
    "when": "周六约17:20 · 尖东市集后顺路",
    "where": "李小龙铜像与星光大道公共海滨；之后向西走向文化中心",
    "tip": "人物与栏杆留一点距离，用海面做留白；拍背影、侧脸和手印细节。避免把整个下午耗在商场里。",
    "frame": "2× 人像；1× 人物与海景",
    "fee": "公共海滨免费",
    "query": "Bruce Lee Statue Avenue of Stars Hong Kong",
    "caption": "星光大道公共海滨实景图，具体人流与光线会变化。",
    "type": "photo"
  },
  {
    "id": "victoria-harbour",
    "image": "harbour",
    "day": 1,
    "order": 9,
    "title": "维多利亚港 · 蓝调与夜景",
    "area": "星光大道 → 文化中心 / 钟楼",
    "when": "周六预留 17:30–18:30 · 以天气和天文台为准",
    "where": "尖沙咀海滨面向港岛天际线，沿海滨一路向西到钟楼",
    "tip": "先拍暮色人物，再拍夜景。手机主摄降低一点曝光，利用栏杆稳定，人物夜景优先附近自然灯光。",
    "frame": "1× 天际线；2× 暮色半身",
    "fee": "公共海滨免费",
    "query": "Tsim Sha Tsui Promenade Clock Tower Hong Kong",
    "caption": "从尖沙咀看港岛的维港夜景全景参考，非实时天气。",
    "type": "photo"
  }
];

const PHOTO_CREDITS = [
  {
    "id": "stars",
    "path": "assets/photos/stars.jpg",
    "title": "File:Avenue of Stars 01-10-2022(6).jpg",
    "source": "https://commons.wikimedia.org/wiki/File:Avenue_of_Stars_01-10-2022(6).jpg",
    "author": "LN9267",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "description": "​This photo is taken in Tsim Sha Tsui.",
    "changes": "缩放与压缩；网页以 cover 方式裁切显示。"
  },
  {
    "id": "harbour",
    "path": "assets/photos/harbour.jpg",
    "title": "File:Central and Victoria Harbour at night, view from Tsim Sha Tsui, Hong Kong, China - 香港，中国 (16903027347).jpg",
    "source": "https://commons.wikimedia.org/wiki/File:Central_and_Victoria_Harbour_at_night,_view_from_Tsim_Sha_Tsui,_Hong_Kong,_China_-_%E9%A6%99%E6%B8%AF%EF%BC%8C%E4%B8%AD%E5%9B%BD_(16903027347).jpg",
    "author": "Romain Pontida",
    "license": "CC BY-SA 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
    "description": "6 pictures panorama stitched with Hugin",
    "changes": "缩放与压缩；网页以 cover 方式裁切显示。"
  },
  {
    "id": "tram",
    "path": "assets/photos/tram.jpg",
    "title": "File:Hong Kong Tramways 36(112) Kennedy Town to Happy Valley 05-03-2016.jpg",
    "source": "https://commons.wikimedia.org/wiki/File:Hong_Kong_Tramways_36(112)_Kennedy_Town_to_Happy_Valley_05-03-2016.jpg",
    "author": "LN9267",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "description": "This photo is taken in Kennedy Town.",
    "changes": "缩放与压缩；网页以 cover 方式裁切显示。"
  },
  {
    "id": "bus",
    "path": "assets/photos/bus.jpg",
    "title": "File:(HKG-Hong Kong) Citybus 59909 SJ5717 H1 2024-05-29.jpg",
    "source": "https://commons.wikimedia.org/wiki/File:(HKG-Hong_Kong)_Citybus_59909_SJ5717_H1_2024-05-29.jpg",
    "author": "S5A-0043",
    "license": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
    "description": "Photo by S5A-0043. CC-BY.",
    "changes": "缩放与压缩；网页以 cover 方式裁切显示。"
  },
  {
    "id": "kennedy",
    "path": "assets/photos/kennedy.jpg",
    "title": "File:Trams lining up on Catchick Street near the Kennedy Town Terminus (Hong Kong).jpg",
    "source": "https://commons.wikimedia.org/wiki/File:Trams_lining_up_on_Catchick_Street_near_the_Kennedy_Town_Terminus_(Hong_Kong).jpg",
    "author": "Mk2010",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "description": "Trams lining up on Catchick Street near the Kennedy Town Terminus, Hong Kong.",
    "changes": "缩放与压缩；网页以 cover 方式裁切显示。"
  },
  {
    "id": "bluehouse",
    "path": "assets/photos/bluehouse.jpg",
    "title": "File:Blue House, Hong Kong.jpg",
    "source": "https://commons.wikimedia.org/wiki/File:Blue_House,_Hong_Kong.jpg",
    "author": "Prosperity Horizons",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "description": "Blue House in Wan Chai, Hong Kong.",
    "changes": "缩放与压缩；网页以 cover 方式裁切显示。"
  },
  {
    "id": "central",
    "path": "assets/photos/central.jpg",
    "title": "File:Pottinger Street in Hong Kong.jpg",
    "source": "https://commons.wikimedia.org/wiki/File:Pottinger_Street_in_Hong_Kong.jpg",
    "author": "Evancyk",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "description": "The stone-paved steps on Pottinger Street in Hong Kong's Central district. The steps lead up to Tai Kwun, a revitalized historical police station that is now a culture site run by the Jockey Club. Lower down, many stalls sell holiday decorations for partygoers around Halloween and Christmastimes.",
    "changes": "缩放与压缩；网页以 cover 方式裁切显示。"
  },
  {
    "id": "crossing",
    "path": "assets/photos/crossing.jpg",
    "title": "File:Hong Kong ⇦ Look Left 望左 road surface marking.jpg",
    "source": "https://commons.wikimedia.org/wiki/File:Hong_Kong_%E2%87%A6_Look_Left_%E6%9C%9B%E5%B7%A6_road_surface_marking.jpg",
    "author": "cogdogblog",
    "license": "CC0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "description": "香港望左路面标线示例；原图未标明本项目建议的中环具体路口，不将其标作同一机位。",
    "changes": "缩放与压缩；网页以 cover 方式裁切显示。"
  },
  {
    "id": "starferry",
    "path": "assets/photos/starferry.jpg",
    "title": "File:Day Star Star Ferry Central to Tsim Sha Tsui 07-04-2023.jpg",
    "source": "https://commons.wikimedia.org/wiki/File:Day_Star_Star_Ferry_Central_to_Tsim_Sha_Tsui_07-04-2023.jpg",
    "author": "LN9267",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "description": "This photo was taken at the Central Pier.",
    "changes": "缩放与压缩；网页以 cover 方式裁切显示。"
  }
];
