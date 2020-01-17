/**
 * @CUSTOMER_TYPE 个人中心首页类型
 * @COLLECTION_TYPE 个人中心我的收藏类型
 * @NAV_TYPE 头部导航栏菜单
 */

const GAME_TYPE_LIST = [
  {
    itemText: '英雄联盟',
    itemValue: 'lol'
  },
  {
    itemText: 'DOTA2',
    itemValue: 'dota'
  },
  {
    itemText: 'CS:GO',
    itemValue: 'csgo'
  },
  {
    itemText: '王者荣耀',
    itemValue: 'kog'
  },
  {
    itemText: '守望先锋',
    itemValue: 'ow'
  }
]

const CUSTOMER_TYPE = [
  {
    name: '我的收藏',
    icon: 'iconshoucang',
    type: 'collection',
    link: 'collection'
  },
  {
    name: '赛事提醒',
    icon: 'icontixing',
    type: 'reminder',
    link: 'reminder'
  },
  {
    name: '我的评论',
    icon: 'iconpinglun',
    type: 'comment',
    link: 'comment'
  },
  {
    name: '我的文章',
    icon: 'iconwenzhang',
    type: 'article',
    link: 'article'
  },
  {
    name: '我的图集',
    icon: 'icontupian',
    type: 'pictures',
    link: 'pictures'
  },
  {
    name: '我的视频',
    icon: 'iconshipin1',
    type: 'videoList',
    link: 'videoList'
  },
  {
    name: '个人资料',
    icon: 'icongerenziliao',
    type: 'information',
    link: 'information'
  },
  {
    name: '系统消息',
    icon: 'iconshezhi',
    type: 'system',
    link: 'system'
  }
]

const COLLECTION_TYPE = [
  {
    name: '赛事收藏',
    type: ''
  }
  /* {
    name: '文章收藏',
    type: 'article'
  } */
]

// 头部的导航栏
const NAV_TYPE = [
  {
    id: 1,
    name: '首页',
    path: '/',
    exact: true
  },
  {
    id: 2,
    name: '实时比分',
    path: '/live'
  },
  {
    id: 3,
    name: '联赛赛程',
    path: '/match',
    rel: 'nofollow'
  },
  {
    id: 4,
    name: '全网指数',
    path: '/statistic',
    rel: 'nofollow'
  },
  {
    id: 5,
    name: '电竞资讯',
    path: '/news'
  },
  {
    id: 6,
    name: '关于我们',
    path: '/about'
  }
]

// 底部的site-map导航
const FOOT_NAV = [
  [
    {
      name: '英雄联盟'
    },
    {
      name: 'LOL比分直播',
      path: '/live/lol'
    },
    {
      name: 'LOL游戏资讯',
      path: '/news/lol'
    },
    {
      name: 'LOL最新赛程',
      path: '/match/lol'
    },
    {
      name: 'LOL比赛指数',
      path: '/statistic/lol'
    }
  ],
  [
    {
      name: '刀塔2'
    },
    {
      name: 'DOTA2比分直播',
      path: '/live/dota'
    },
    {
      name: 'DOTA2游戏资讯',
      path: '/news/dota'
    },
    {
      name: 'DOTA2最新赛程',
      path: '/match/dota'
    },
    {
      name: 'DOTA2比赛指数',
      path: '/statistic/dota'
    }
  ],
  [
    {
      name: 'CS:GO'
    },
    {
      name: 'CS:GO比分直播',
      path: '/live/csgo'
    },
    {
      name: 'CS:GO游戏资讯',
      path: '/news/csgo'
    },
    {
      name: 'CS:GO最新赛程',
      path: '/match/csgo'
    },
    {
      name: 'CS:GO比赛指数',
      path: '/statistic/csgo'
    }
  ],
  [
    {
      name: '王者荣耀'
    },
    {
      name: '王者比分直播',
      path: '/live/kog'
    },
    {
      name: '王者游戏资讯',
      path: '/news/kog'
    },
    {
      name: '王者最新赛程',
      path: '/match/kog'
    },
    {
      name: '王者比赛指数',
      path: '/statistic/kog'
    }
  ],
  [
    {
      name: '守望先锋'
    },
    {
      name: 'OW比分直播',
      path: '/live/ow'
    },
    {
      name: 'OW游戏资讯',
      path: '/news/ow'
    },
    {
      name: 'OW最新赛程',
      path: '/match/ow'
    },
    {
      name: 'OW比赛指数',
      path: '/statistic/ow'
    }
  ]
]

// 资讯详情页-分享配置
const SHARE_CONFIGS = [
  {
    icon: 'iconpinglun1',
    name: '评论',
    type: 'comment'
  },
  {
    icon: 'iconweibo',
    name: '微博分享',
    type: 'weibo'
  },
  {
    icon: 'iconQQ',
    name: 'QQ分享',
    type: 'QQ'
  },
  {
    icon: 'iconweixin',
    name: '微信分享',
    type: 'weixin'
  },
  {
    icon: 'iconQQkongjian',
    name: '空间分享',
    type: 'QQzone'
  }
]

// 赛事详情数据展示列表Tab项
const MAIN_DATA_TAB_LIST = [
  {
    name: '常规赛',
    type: 'common'
  },
  {
    name: '季后赛',
    type: 'playoffs'
  },
  {
    name: '冒泡赛',
    type: 'bubble'
  }
]

// 赛事详情数据展示列表Tab项
const OTHER_DATA_TAB_LIST = [
  {
    name: '战队分析',
    type: 'team'
  },
  {
    name: '选手分析',
    type: 'player'
  },
  {
    name: '英雄分析',
    type: 'hero'
  }
]

// 战队详情 =>历史赛事|赛事预告
const MATCH_TAB_LIST = [
  {
    name: '全部',
    type: ''
  },
  {
    name: '进行中赛事',
    type: 1
  },
  {
    name: '赛事预告',
    type: 0
  },
  {
    name: '历史赛事',
    type: 2
  }
]

// 战队详情 => 战队综合统计|选手综合统计|英雄综合统计
const STATICTICS_TAB_LIST = [
  {
    name: '战队综合统计',
    type: 'team'
  },
  {
    name: '选手综合统计',
    type: 'player'
  },
  {
    name: '英雄综合统计',
    type: 'hero'
  }
]

// 战队详情 => 战队赛事数据|选手赛事数据|英雄赛事数据
const DETAIL_MATCH_DATA_TAB_LIST = [
  {
    name: '战队赛事数据',
    type: 'team'
  },
  {
    name: '选手赛事数据',
    type: 'player'
  }
]

// 比赛详情页面用
const GAME_ROLE_TAB_LIST = [
  {
    name: '上单',
    id: 1
  },
  {
    name: '打野',
    id: 2
  },
  {
    name: '中单',
    id: 3
  },
  {
    name: '射手',
    id: 4
  },
  {
    name: '辅助',
    id: 5
  }
]

// 比赛详情页面用
const GAME_POSITION_TAB_LIST = [
  {
    name: '1号位',
    id: 1
  },
  {
    name: '2号位',
    id: 2
  },
  {
    name: '3号位',
    id: 3
  },
  {
    name: '4号位',
    id: 4
  },
  {
    name: '5号位',
    id: 5
  }
]

// 比赛详情页面用
const GAME_RATIO_TAB_LIST = [
  {
    name: '输出占比',
    id: 1
  },
  {
    name: '承伤占比',
    id: 2
  },
  {
    name: '经济占比',
    id: 3
  }
]

// 比赛详情页面用
const DOTA_GAME_RATIO_TAB_LIST = [
  {
    name: '金钱',
    id: 1
  },
  {
    name: '每分钟金钱',
    id: 2
  },
  {
    name: '每分钟经验',
    id: 3
  }
]

// 比赛详情页面用
const GAME_DIFF_TAB_LIST = [
  {
    name: '经济差曲线',
    id: 1
  },
  {
    name: '经验差曲线',
    id: 2
  }
]

const LOL_PLAYER_TAB_LIST = [
  {
    name: '选手联赛数据',
    type: 0
  },
  {
    name: '选手综合数据',
    type: 0
  },
  {
    name: '选手英雄数据',
    type: 0
  }
]

const BET_TYPES = {
  lol: {
    2: '该局获胜',
    4: '先获一血',
    5: '先获五杀',
    6: '先获十杀',
    7: '先获一塔',
    8: '击杀首条小龙',
    9: '击杀首条大龙',
    10: '人头总数奇偶',
    11: '总击杀数大小',
    12: '比赛时间大小'
  },
  dota: {
    2: '该局获胜',
    4: '先获一血',
    5: '先获五杀',
    6: '先获十杀',
    7: '比赛时间大小',
    8: '人头总数奇偶',
    9: '首塔',
    10: '首兵营',
    11: '首肉山'
  },
  csgo: {
    2: '该局获胜',
    3: '上半场手枪局获胜',
    5: '单局让分',
    6: '大小分（回合总数大小）',
    7: '人头总数奇偶',
    8: '回合总数奇偶'
  },
  kog: {
    2: '该局获胜',
    4: '先获五杀',
    5: '先获十杀',
    6: '人头总数奇偶'
  }
}
// 全网指数的构造数据
const STATICS_TYPES = {
  lol: [
    {
      id: 0,
      name: '全场',
      children: {
        1: '全场获胜',
        3: '全场让分获胜'
      }
    },
    {
      id: 1,
      name: '第1局',
      children: BET_TYPES.lol
    },
    {
      id: 2,
      name: '第2局',
      children: BET_TYPES.lol
    },
    {
      id: 3,
      name: '第3局',
      children: BET_TYPES.lol
    },
    {
      id: 4,
      name: '第4局',
      children: BET_TYPES.lol
    },
    {
      id: 5,
      name: '第5局',
      children: BET_TYPES.lol
    }
  ],
  dota: [
    {
      id: 0,
      name: '全场',
      children: {
        1: '全场获胜',
        3: '全场让分获胜'
      }
    },
    {
      id: 1,
      name: '第1局',
      children: BET_TYPES.dota
    },
    {
      id: 2,
      name: '第2局',
      children: BET_TYPES.dota
    },
    {
      id: 3,
      name: '第3局',
      children: BET_TYPES.dota
    },
    {
      id: 4,
      name: '第4局',
      children: BET_TYPES.dota
    },
    {
      id: 5,
      name: '第5局',
      children: BET_TYPES.dota
    }
  ],
  csgo: [
    {
      id: 0,
      name: '全场',
      children: {
        1: '全场获胜',
        4: '全场让分获胜'
      }
    },
    {
      id: 1,
      name: '第1局',
      children: BET_TYPES.csgo
    },
    {
      id: 2,
      name: '第2局',
      children: BET_TYPES.csgo
    },
    {
      id: 3,
      name: '第3局',
      children: BET_TYPES.csgo
    },
    {
      id: 4,
      name: '第4局',
      children: BET_TYPES.csgo
    },
    {
      id: 5,
      name: '第5局',
      children: BET_TYPES.csgo
    }
  ],
  kog: [
    {
      id: 0,
      name: '全场',
      children: {
        1: '全场获胜',
        3: '全场让分获胜'
      }
    },
    {
      id: 1,
      name: '第1局',
      children: BET_TYPES.kog
    },
    {
      id: 2,
      name: '第2局',
      children: BET_TYPES.kog
    },
    {
      id: 3,
      name: '第3局',
      children: BET_TYPES.kog
    },
    {
      id: 4,
      name: '第4局',
      children: BET_TYPES.kog
    },
    {
      id: 5,
      name: '第5局',
      children: BET_TYPES.kog
    },
    {
      id: 6,
      name: '第6局',
      children: BET_TYPES.kog
    },
    {
      id: 7,
      name: '第7局',
      children: BET_TYPES.kog
    }
  ],
  ow: [
    {
      id: 0,
      name: '全场',
      children: {
        1: '全场获胜',
        2: '全场让分获胜'
      }
    }
  ]
}

const CSGO_PLAYER_LIST_TAB = [
  {
    name: '当前阵容',
    key: 'currentLineupPlayers'
  },
  {
    name: '历史阵容',
    key: 'historicLineupPlayers'
  },
  {
    name: '替补阵容',
    key: 'standinsPlayers'
  }
]

const CSGO_ANALYSIS_TAB_LIST = [
  {
    name: '战队分析',
    key: 'team'
  },
  {
    name: '选手分析',
    key: 'player'
  }
]

const FOOT_FRIEND_LIST = [
  { name: '电竞比分网', url: 'https://www.shangniu.cn/', rel: true },
  { name: '英雄联盟官网', url: 'https://lol.qq.com/main.shtml' },
  { name: 'DOTA2官网', url: 'https://www.dota2.com.cn/main.htm' },
  { name: '电竞赛事', url: 'https://www.shangniu.cn/match/lol' },
  { name: 'CSGO官网', url: 'https://www.csgo.com.cn/' },
  { name: '尚牛电竞', url: 'https://www.shangniu.cn/' },
  { name: 'DOTA2比分', url: 'https://www.shangniu.cn/live/dota' },
  { name: 'CSGO比分', url: 'https://www.shangniu.cn/live/csgo' },
  { name: '斗鱼LOL直播', url: 'https://www.douyu.com/g_LOL' },
  { name: '虎牙csgo直播', url: 'https://www.huya.com/g/862' },
  { name: '火猫dota2直播', url: 'https://www.huomao.com/channel/dota2' },
  { name: 'LOL贴吧', url: 'https://tieba.baidu.com/f?kw=lol' },
  { name: '飞鲸电竞数据', url: 'https://www.feijing88.com/esport/lol.html', rel: true },
  { name: '足球即时比分', url: 'https://www.bifenlive.com' }
]

const CHINESE_GAME_TYPE_LIST = [
  {
    itemText: '英雄联盟',
    itemValue: 'lol'
  },
  {
    itemText: '刀塔2',
    itemValue: 'dota'
  },
  {
    itemText: '反恐精英',
    itemValue: 'csgo'
  },
  {
    itemText: '王者荣耀',
    itemValue: 'kog'
  },
  {
    itemText: '守望先锋',
    itemValue: 'ow'
  }
]

const GAMENAME_EN = {
  lol: 'LOL',
  dota: 'DOTA2',
  csgo: 'CSGO',
  kog: '王者',
  ow: 'OW'
}

const GAMENAME_CN = {
  lol: '英雄联盟',
  dota: '刀塔2',
  csgo: '反恐精英',
  kog: '王者荣耀',
  ow: '守望先锋'
}

export {
  GAME_TYPE_LIST,
  CUSTOMER_TYPE,
  COLLECTION_TYPE,
  NAV_TYPE,
  FOOT_NAV,
  SHARE_CONFIGS,
  MAIN_DATA_TAB_LIST,
  OTHER_DATA_TAB_LIST,
  MATCH_TAB_LIST,
  STATICTICS_TAB_LIST,
  DETAIL_MATCH_DATA_TAB_LIST,
  GAME_ROLE_TAB_LIST,
  GAME_POSITION_TAB_LIST,
  GAME_RATIO_TAB_LIST,
  GAME_DIFF_TAB_LIST,
  LOL_PLAYER_TAB_LIST,
  DOTA_GAME_RATIO_TAB_LIST,
  STATICS_TYPES,
  CSGO_PLAYER_LIST_TAB,
  CSGO_ANALYSIS_TAB_LIST,
  FOOT_FRIEND_LIST,
  CHINESE_GAME_TYPE_LIST,
  GAMENAME_EN,
  GAMENAME_CN
}
