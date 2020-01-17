<template>
  <a-locale-provider :locale="locale">
    <div v-cloak id="app" class="app">
      <c-header></c-header>
      <nuxt />
      <c-footer></c-footer>
      <a-back-top />
    </div>
  </a-locale-provider>
</template>
<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
// import { mapActions } from 'vuex'

// 监听图片出错方法
function listenImgOnError (e) {
  function _listenFun (e) {
    const elem = e.target
    if (elem.tagName.toLowerCase() === 'img') {
      elem.src = require('@/assets/img/mrtp.png')
    }
  }
  document.addEventListener('error', _listenFun, true)
}
export default {
  name: 'App',
  components: {
    cHeader: (resolve) => {
      require(['@/components/common/Header'], resolve)
    },
    cFooter: (resolve) => {
      require(['@/components/common/Footer'], resolve)
    }
  },

  data () {
    return {
      locale: zhCN
    }
  },
  mounted () {
    listenImgOnError()
    this.initStatic()
  },
  methods: {
    // ...mapActions('user', ['setUserInfo'])
    initStatic () {
      // 360自动提交
      const static360 = document.createElement('script')
      static360.src = `https://jspassport.ssl.qhimg.com/11.0.1.js?d182b3f28525f2db83acfaaf6e696dba`
      static360.id = `sozz`
      document.body.appendChild(static360)

      // 百度自动提交
      const curProtocol = window.location.protocol.split(':')[0]
      const staticBaidu = document.createElement('script')
      staticBaidu.src = curProtocol === 'https'
        ? `https://zz.bdstatic.com/linksubmit/push.js`
        : `http://push.zhanzhang.baidu.com/push.js`
      document.body.appendChild(staticBaidu)

      // 友盟统计添加
      const ym = document.createElement('script')
      ym.src = `https://v1.cnzz.com/z_stat.php?id=1278221275&web_id=1278221275`
      document.body.appendChild(ym)

      // 百度统计
      const bd = document.createElement('script')
      bd.src = `https://hm.baidu.com/hm.js?c95eb6bfdfb2628993e507a9f5e0ea01`
      document.body.appendChild(bd)
    }
  }
}
</script>
<style scoped lang="less">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
#app {
  min-width: 1200px;
  &[v-cloak] {
    display: none;
  }
}
</style>
