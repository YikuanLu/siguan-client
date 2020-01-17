/**
 * 首页接口请求
 */
export default {
  banner: '/site/user/ads/getBanner', // banner
  matchList: '/battle/index/matchList', // 首页比赛和实时数据,gameType游戏种类，startTime、endTime unix时间戳
  leagueList: '/battle/index/leagueList', // 首页-赛事进行中
  teamList: '/battle/index/teamList', // 首页-战队进行中
  dayQuantiy: '/battle/index/dayQuantiy' // 获取昨天今天明天的比赛数量
}
