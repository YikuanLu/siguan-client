/**
 * 公共请求
 */
export default {
  commonSms: '/common/sms/sendSms', // 获取验证码
  validateSmsCode: '/common/sms/validateSmsCode', // 校验验证码 /POST
  getEncryptedString: '/user/user/getEncryptedString', // 获取加密key
  friendLinkList: '/kap-boot/home/snFriendlyLink/queryList', // 底部友情链接
  dictTypes: '/kap-boot/sys/dictItem/listByType', // 各个种类的数据字典
  upload: '/api/common/uploadPics'
}
