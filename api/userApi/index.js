/**
 * 用户模块请求
 */
export default {
  getUser: '/user/user/getUser', // 获取用户信息 /GET
  registe: '/user/user/reg', // 注册 /POST
  login: '/user/user/login', // 登录 /POST
  logout: '/user/user/logout', // 登出 /GET
  resetPwd: '/user/user/resetPwd', // 重置密码 /POST
  changeHeadPic: '/user/user/changeHeadPic', // 修改头像 /POST
  changeNickName: '/user/user/changeNickName', // 修改用户名 /POST
  resetPhone: '/user/user/resetPhone', // 修改绑定手机 /POST
  changePwd: '/user/user/changePwd', // 修改密码 /POST
  checkNamePhone: '/user/user/checkNamePhone', // 校验手机号和昵称是否已经注册过
  loginByThird: '/user/user/loginByThird', // 第三方绑定

  getCollectionArticleList: '/kap-boot/home/snUserCollect/list', // 用户收藏文章列表
  collect: '/kap-boot/home/snUserCollect/addOrDel' // 取消收藏
}
