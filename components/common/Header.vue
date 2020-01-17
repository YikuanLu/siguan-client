<script>
/**
 * 底部组件
 * 用法
 * import cHeader from '~/components/common/Header'
 * components: { cHeader }
 * <c-header></c-header>
 **/
import { mapState } from 'vuex'
import { NAV_TYPE } from '@/assets/js/types'
import { userApi } from '@/api'
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  name: 'Header',
  components: {},
  props: {},
  data () {
    return {
      isShow: false,
      type: '',
      login: '',
      nav: NAV_TYPE
    }
  },
  computed: {
    ...mapState('user', {
      userInfo: state => state.userInfo
    }),
    isLogin () {
      return !!this.$store.state.Token
    }
  },
  created () {},
  mounted () {
    // console.log(this.userInfo)
  },
  methods: {
    toLogin () {
      this.$UserModal().show('login')
    },
    toLogup () {
      this.$UserModal().show('logup')
    },
    toReset () {
      this.$UserModal().show('reset')
    },
    toBind () {
      this.$UserModal().show('bind')
    },
    toExit () {
      const url = userApi.logout
      this.$axios
        .get(url, { params: { token: this.$store.state.Token } })
        .then((res) => {
          this.$message.success('登出成功')
          this.$router.push('/')
          this.$store.commit('user/SET_USERINFO', null)
          this.$store.commit('SET_TOKEN', null)
          // 使外部API上的JWT Cookie无效
          Cookie.remove('Token')
          this.clearStatus() // 登出清空缓存数据
        })
    },
    clearStatus () {
      // 接收登录后事件, 登录后请求数据
      // 接收登出事件, 清空缓存
      this.$store.dispatch('setMatchStatus', [])
    }
  },
  render () {
    const { nav, isLogin, userInfo, toLogin, toLogup, toExit } = this
    const logo = (
      <nuxt-link class="logo" to="/">
        <img height="52" src={require('@/static/img/common/logo.png')} alt />
        <h2>
          欢迎来到尚牛电竞比分网-一家正规专业可靠的电子竞技即时比分数据平台,提供lol比分直播,dota2比分预测,csgo比分分析！
        </h2>
      </nuxt-link>
    )
    const headNav = (
      <div class="nav">
        {nav.map((item) => {
          return (
            <nuxt-link
              key={item.id}
              active-class="actived"
              class="link"
              to={item.path}
              exact={item.exact}
              rel={item.rel}
            >
              {item.name}
            </nuxt-link>
          )
        })}
      </div>
    )

    function showAvatar () {
      if (userInfo && userInfo.headPic) {
        return <img class="avatar" src={userInfo.headPic} alt />
      } else {
        return (
          <IconFont
            slot="prefix"
            style={{ color: '#dddddd', fontSize: '40px' }}
            type="iconyonghutouxiang"
          />
        )
      }
    }
    let nickName = ''
    if (userInfo) {
      nickName = userInfo.nickName
    }

    let showBtnOrUser = null
    if (isLogin) {
      showBtnOrUser = (
        <div class="right-btns">
          <a-dropdown>
            <a class="ant-dropdown-link" href="javascript:;">
              {showAvatar()}
              <span class="nickname">{nickName}</span>
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <nuxt-link class="user-link" to="/user">
                  我的主页
                </nuxt-link>
              </a-menu-item>
              {/*
                  <a-menu-item>
                <nuxt-link class="user-link" to="#">
                  个人资料
                </nuxt-link>
              </a-menu-item>
                 */}
              <a-menu-item>
                <a class="user-link" href="javascript:;" onClick={toExit}>
                  退出
                </a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      )
    } else {
      showBtnOrUser = (
        <div class="right-btns">
          <a-button class="login-btn" onClick={toLogin}>
            登录
          </a-button>
          <a-button class="reg-btn" onClick={toLogup}>
            注册
          </a-button>
        </div>
      )
    }

    const dom = (
      <header class="header">
        <div class="wrap-box">
          {logo}
          {headNav}
          <client-only>{showBtnOrUser}</client-only>
        </div>
      </header>
    )
    return dom
  }
}
</script>

<style lang="less" scoped>
.header {
  min-width: 1200px;
  background: #fff;
  height: 80px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);
  position: relative;
  .wrap-box {
    position: relative;
    width: 1200px;
    margin: auto;
    height: 80px;
  }
  .logo {
    display: inline-block;
    height: 80px;
    line-height: 80px;
    overflow: hidden;
    img {
      height: 52px;
      display: inline-block;
    }
    h2 {
      visibility: hidden;
    }
  }
  .nav {
    display: inline-block;
    font-size: 0;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    .link {
      width: 100px;
      height: 80px;
      line-height: 80px;
      font-size: 16px;
      color: #212121;
      text-align: center;
      color: #202020;
      transition: all 0.3s;
      display: inline-block;
      margin: 0 15px;
      &:hover {
        color: @primary-color;
      }
      &.actived {
        background: @primary-color;
        color: #fff;
      }
    }
  }
  .right-btns {
    position: absolute;
    right: 0;
    top: 0;
    height: 80px;
    line-height: 80px;
    .login-btn {
      color: #999;
    }
    .reg-btn {
      color: @primary-color;
      border-color: @primary-color;
      margin-left: 10px;
    }
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .nickname {
      font-size: 14px;
      color: rgba(51, 51, 51, 1);
      padding-left: 10px;
    }
  }
}
.user-link {
  padding: 12px;
}
.ant-dropdown-link {
  display: flex;
  // justify-content: center;
  align-items: center;
  justify-content: space-around;
  vertical-align: middle;
  height: 80px;
  line-height: 60px;
}
</style>
