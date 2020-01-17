module.exports = {
  // 测试环境
  dev: {
    MODE: 'development',
    BASE_URL: 'http://121.40.239.167:8088/api'
  },
  // 正式环境
  pro: {
    MODE: 'production',
    // BASE_URL: 'http://121.40.239.167:8088/api' // 测试环境接口
    BASE_URL: 'http://121.41.9.4/api' // 正式环境接口（包括香港那台）
  }
}
