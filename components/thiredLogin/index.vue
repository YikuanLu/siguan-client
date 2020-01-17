<template>
  <div id="thiredLogin"></div>
</template>

<script>
import { userApi } from '~/api'
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  name: 'ThiredLogin',
  data () {
    return {
      code: '',
      type: ''
    }
  },
  created () {
    const { code, type } = this.$route.query
    this.code = code
    this.type = type
  },
  mounted () {
    if (this.code && this.type) {
      this.getData()
    }
  },
  methods: {
    async getData () {
      const { code, type } = this
      const data = await this.$axios.post(userApi.loginByThird, {
        openId: code,
        loginType: type
      })
      console.log('data.errorCode', data.errorCode)
      if (!data.errorCode) {
        this.$store.commit('user/SET_USERINFO', data)
        this.$store.commit('SET_TOKEN', data.token)
        Cookie.set('Token', data.token)
        this.$message.success('登录成功')
        this.$store.dispatch('setMatchStatus', []) // 清空比赛关注、提醒状态数据
        this.$router.push('/')
      } else {
        this.$store.commit('user/SET_HEADPIC', data.headPic)
        this.$store.commit('user/SET_NICKNAME', data.nickName)
        this.$UserModal().show('bind')
      }
    }
  }
}
</script>
