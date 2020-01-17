/**
 * 接口请求
 */
export default {
  getUserNotifyForMatch: '/battle/user/notify/getUserNotifyForMatch', // 获取用户赛事提醒列表
  getCollectNotifys: '/battle/user/notify/getUserNotifys', // 获取用户赛事收藏提醒列表
  switchUserNotify: '/battle/user/notify/switchUserNotify', // 用户添加赛事提醒
  addGameSupport: '/battle/user/notify/addGameSupport', // 登录用户支持比赛
  getGameSupportQty: '/battle/user/notify/getGameSupportQty' // 查询游戏支持率
}
