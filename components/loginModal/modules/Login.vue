
<script>
import { mapState } from 'vuex'
import ThirdParty from '../plugin'
import { iconStyle } from '../js/scorp'
import { validate } from '@/assets/js/publicFn'
import { userApi, extraApi } from '@/api'
import { encryption } from '@/assets/js/secret'
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  name: 'Login',
  components: {
    ThirdParty
  },
  data () {
    return {
      form: this.$form.createForm(this),
      checked: false
    }
  },
  computed: {
    ...mapState('user', {
      formState: state => state.formClear,
      secret: state => state.secret
    })
  },
  watch: {
    formState () {
      const _this = this
      setTimeout(() => {
        _this.form.resetFields()
      }, 300)
    }
  },
  mounted () {
    const phone = localStorage.getItem('phone')
      ? localStorage.getItem('phone')
      : ''
    const password = localStorage.getItem('password')
      ? localStorage.getItem('password')
      : ''
    const checked = localStorage.getItem('isRememberCount')
      ? localStorage.getItem('isRememberCount')
      : false
    this.checked = JSON.parse(checked)
    this.form.setFieldsValue({
      phone,
      password
    })
  },
  methods: {
    // 勾选按钮变化方法
    onChange (e) {
      this.checked = e.target.checked
    },
    // 跳转重置密码
    toReset () {
      this.$UserModal().show('reset')
    },
    // 跳转协议页面
    toLink () {
      this.$UserModal().hide()
      this.$router.resolve('/user/agreement')
      const routeData = this.$router.resolve({
        path: '/user/agreement'
      })
      window.open(routeData.href, '_blank')
    },
    // 跳转注册
    toSignUp () {
      this.$UserModal().show('logup')
    },
    // 获取关注或提醒状态
    getStatus () {
      // 接收登录后事件, 登录后请求数据
      // 接收登出事件, 清空缓存
      this.$axios.get(extraApi.getCollectNotifys).then(async (res) => {
        const statusData = res
        await this.$store.dispatch('setMatchStatus', statusData)
      })
    },
    // 验证方法
    validate,
    submit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (this.checked) {
          localStorage.setItem('phone', values.phone)
          localStorage.setItem('password', values.password)
        } else {
          localStorage.clear('phone')
          localStorage.clear('password')
        }
        localStorage.setItem('isRememberCount', this.checked)
        if (!err) {
          const url = userApi.login
          values.password = encryption(
            values.password,
            this.secret.key,
            this.secret.iv
          )
          this.$axios.post(url, values).then((res) => {
            this.$store.commit('user/SET_USERINFO', res)
            this.$store.commit('SET_TOKEN', res.token)
            Cookie.set('Token', res.token)
            this.$message.success('登录成功')
            this.getStatus() // 去请求比赛关注、提醒状态数据
            this.$UserModal().hide()
          })
        }
      })
    }
  },
  render () {
    const {
      form,
      toSignUp,
      onChange,
      toReset,
      submit,
      // toLink,
      validate
    } = this
    const { getFieldDecorator } = this.form
    /**
     * validateStatus
     * has-feedback(是否有图标)
     * 可选 ‘success’, ‘warning’, ‘error’, ‘validating’
     */
    const formElement = (
      <a-form hideRequiredMark={true} form={form} onSubmit={submit}>
        <a-form-item>
          {getFieldDecorator('phone', {
            rules: [{ validator: validate('phone', '请输入正确手机号') }],
            validateTrigger: 'blur'
          })(
            <a-input size="large" placeholder="手机号">
              <IconFont slot="prefix" style={iconStyle} type="iconshouji" />
            </a-input>
          )}
        </a-form-item>
        <a-form-item>
          {getFieldDecorator('password', {
            rules: [
              { validator: validate('password', '请输入6-20位数字+字母组合') }
            ],
            validateTrigger: 'blur'
          })(
            <a-input size="large" placeholder="密码" type="password">
              <IconFont slot="prefix" style={iconStyle} type="iconmima" />
            </a-input>
          )}
        </a-form-item>
        <a-button
          class="loginBtn"
          htmlType="submit"
          type="primary"
          size="large"
          block={true}
          onClick={submit}
        >
          登录
        </a-button>
      </a-form>
    )

    return (
      <div class="login formContainer">
        <div class="header">
          <span>登录</span>
          <div class="textBox">
            <span>没有账号？立即</span>
            <span class="link" onClick={toSignUp}>
              注册
            </span>
          </div>
        </div>

        <div class="form">{formElement}</div>

        <div class="checkBox clearfix">
          <div class="fl">
            <a-checkbox checked={this.checked} onChange={onChange}>
              <span>下次自动登录</span>
            </a-checkbox>
          </div>
          <div class="fr">
            <a href="javascript:;" onClick={toReset}>
              忘记密码
            </a>
          </div>
        </div>
        <ThirdParty />
      </div>
    )
  }
}
</script>
<style lang="less" scoped>
@import url('../style/public.less');
.login {
  .checkBox {
    padding: 10px 0;
    font-size: 14px;
    a {
      color: #999999;
      font-size: 14px;
    }
  }
  .loginBtn {
    margin-bottom: 18px;
  }
  .protocol {
    font-size: 14px;
    text-align: center;
    color: #999999;
    padding: 10px 0;
    a {
      color: @primary-color;
    }
  }
}
</style>
