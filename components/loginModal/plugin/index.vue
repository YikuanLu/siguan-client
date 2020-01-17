<template>
  <div class="thirdParty">
    <div class="header">第三方登录</div>
    <ul class="body">
      <li class="bodyItem">
        <a href="#" @click="toWX">
          <IconFont class="icon" style="color:#2CBA51" type="iconweixin" />
          <div class="text">微信</div>
        </a>
      </li>
      <li class="bodyItem">
        <a href="#" @click="toQQ">
          <IconFont class="icon" style="color:#4398EF" type="iconQQ" />
          <div class="text">QQ</div>
        </a>
      </li>
      <li class="bodyItem">
        <a href="#" @click="toWB">
          <IconFont class="icon" style="color:#DF4747" type="iconweibo" />
          <div class="text">微博</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
const WX_APPID = 'wxe33271fa99b30aa4'
const QQ_APPID = '101825307'
const WB_APPID = '3558039751'
const REDIRECT_URI = 'http://test.shangniu.cn/thirdLogin/WX'
const QQ_REDIRECT_URI = 'http%3a%2f%2ftest.shangniu.cn%2fthirdLogin%2fQQ'
const WB_REDIRECT_URI = 'http%3a%2f%2ftest.shangniu.cn%2fthirdLogin%2fWEIBO'
export default {
  name: 'ThirdParty',
  data () {
    return {}
  },
  methods: {
    toWX (e) {
      e.preventDefault()
      const url = `https://open.weixin.qq.com/connect/qrconnect?appid=${WX_APPID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=snsapi_login&state=WX`
      window.location.replace(url)
    },
    toQQ (e) {
      e.preventDefault()
      const url = `https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=${QQ_APPID}&redirect_uri=${QQ_REDIRECT_URI}&state=QQ`
      window.location.replace(url)
    },
    toWB (e) {
      e.preventDefault()
      const url = `https://api.weibo.com/oauth2/authorize?client_id=${WB_APPID}&response_type=code&redirect_uri=${WB_REDIRECT_URI}`
      window.location.replace(url)
    }
  }
}
</script>

<style lang="less" scoped>
.thirdParty {
  .header {
    font-size: 14px;
    color: #333333;
    text-align: center;
    padding: 10px 0;
    border-bottom: 1px solid #dfdfdf;
  }
  .body {
    padding: 30px 0 6px;
    display: flex;
    justify-content: space-around;
    .bodyItem {
      text-align: center;
      .icon {
        font-size: 40px;
      }
      .text {
        margin-top: 10px;
        color: #333333;
        font-size: 14px;
      }
    }
  }
}
</style>
