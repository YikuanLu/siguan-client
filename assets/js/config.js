// 表格头部样式配置
export const headerStyle = (column) => {
  return {
    style: {
      'background-color': '#fff',
      'border-top': '1px solid #f5f5f5',
      'font-size': '14px',
      color: '#999999'
    }
  }
}

export const formmatTimeParams = 'Y-M-D h:m'

/**
 * 跳转战队
 * @param {id,gameType} params
 */
export function matchTeamUrl (params) {
  return `/match/${params.gameType}/team/${params.id}`
}
/**
 * 跳转联赛
 * @param {id,gameType} params
 */
export function matchLeagueUrl (params) {
  return `/match/${params.gameType}/league/${params.id}`
}
/**
 * 跳转选手
 * @param {id,gameType} params
 */
export function matchPlayerUrl (params) {
  return `/match/${params.gameType}/player/${params.id}`
}

/**
 * @param {matchId,tab,gameType} params
 * tab=1 图文直播
 * tab=2 全网指数
 * tab=3 赛前分析
 * tab=4 赛后数据
 * tab=5 赛事战报
 */
export function liveUrl (params) {
  const queryTab = params.tab ? `?tab=${params.tab}` : ''
  return `/live/${params.gameType}/${params.matchId}${queryTab}`
}

/**
 * 跳转战队
 * @param {id,gameType} params
 */
export function openMatchTeamUrl (vue, params) {
  const routeData = vue.$router.resolve({
    path: `/match/${params.gameType}/team/${params.id}`
  })
  window.open(routeData.href, '_blank')
}

/**
 * 跳转战队
 * @param {id,gameType} params
 */
export function openMatchLeagueUrl (vue, params) {
  const routeData = vue.$router.resolve({
    path: `/match/${params.gameType}/league/${params.id}`
  })
  window.open(routeData.href, '_blank')
}
