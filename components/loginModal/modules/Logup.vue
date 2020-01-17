<script>
import { mapState } from 'vuex'
import { iconStyle } from '../js/scorp'
import ThirdParty from '../plugin'
import { validate } from '@/assets/js/publicFn'
import { encryption } from '@/assets/js/secret'
import { userApi, publicApi } from '@/api'
import Countdown from '@/components/common/countdown'
const Cookie = process.client ? require('js-cookie') : undefined
// const Cookie = process.client ? require('js-cookie') : undefined
export default {
  name: 'Login',
  components: {
    ThirdParty,
    Countdown
  },
  data () {
    return {
      form: this.$form.createForm(this),
      checked: true,
      canStart: false,
      data: '',
      apiFun: async () => {
        const url = publicApi.commonSms
        const phone = await this.form.getFieldValue('phone')
        const params = {
          phone,
          type: 0
        }
        return this.$axios.post(url, params)
      }
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
  methods: {
    toSignin () {
      this.$UserModal().show('login')
    },
    // 是否同意协议勾选
    onChange (e) {
      this.checked = e.target.checked
    },
    // 验证码输入框事件判断是否可点击发送短信
    codeChange (e) {
      const _this = this
      if (!_this.regx.phone.test(e.target.value)) {
        _this.canStart = false
        return
      }
      _this.canStart = true
    },
    validate,
    checkPhoneName (params) {
      return this.$axios.get(userApi.checkNamePhone, { params })
    },
    async submit (e) {
      e.preventDefault()
      if (!this.checked) {
        this.$message.warning('请勾选用户协议')
        return
      }
      await this.form.validateFields((err, values) => {
        const url = userApi.registe
        if (!err) {
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
            this.$store.dispatch('setMatchStatus', []) // 清空比赛关注、提醒状态数据
            this.$UserModal().hide()
          })
        }
      })
    }
  },

  render () {
    const {
      toSignin,
      checked,
      onChange,
      apiFun,
      validate,
      codeChange,
      canStart,
      checkPhoneName,
      submit
    } = this
    const { getFieldDecorator } = this.form

    /**
     * validateStatus
     * has-feedback(是否有图标)
     * 可选 ‘success’, ‘warning’, ‘error’, ‘validating’
     */
    const formElement = (
      <a-form hideRequiredMark={true} onSubmit={submit}>
        {/* 昵称 */}
        <a-form-item>
          {getFieldDecorator('nickName', {
            rules: [
              {
                validator: async (rule, value, callback) => {
                  if (!value) {
                    callback(new Error('请输入昵称'))
                    return
                  }
                  try {
                    const params = { nickName: value }
                    const checkStatus = await checkPhoneName(params)
                    if (!checkStatus.status) {
                      callback(new Error('昵称已被使用'))
                      return
                    }
                    callback()
                  } catch {
                    callback(new Error('系统错误'))
                  }
                }
              }
            ],
            validateTrigger: 'blur'
          })(
            <a-input size="large" placeholder="用户昵称">
              <IconFont slot="prefix" style={iconStyle} type="iconxiaolian" />
            </a-input>
          )}
        </a-form-item>

        {/* 手机 */}
        <a-form-item>
          {getFieldDecorator('phone', {
            rules: [
              {
                validator: async (rule, value, callback) => {
                  if (!this.regx.phone.test(value)) {
                    callback(new Error('请输入正确手机号'))
                    return
                  }
                  try {
                    const params = { phone: value }
                    const checkStatus = await checkPhoneName(params)
                    if (!checkStatus.status) {
                      callback(new Error('手机号已注册'))
                      return
                    }
                    callback()
                  } catch {
                    callback(new Error('系统错误'))
                  }
                }
              }
            ],
            validateTrigger: 'blur'
          })(
            <a-input size="large" placeholder="手机号" onChange={codeChange}>
              <IconFont slot="prefix" style={iconStyle} type="iconshouji" />
            </a-input>
          )}
        </a-form-item>

        {/* 验证码 */}
        <a-form-item>
          {getFieldDecorator('code', {
            rules: [{ required: true, message: '请输入验证码' }],
            validateTrigger: 'blur'
          })(
            <a-input
              size="large"
              placeholder="手机短信验证码"
              style={{ width: '240px' }}
            >
              <IconFont slot="prefix" style={iconStyle} type="iconyanzhengma" />
            </a-input>
          )}
          <div class="countdown fr">
            <Countdown apiFun={apiFun} canStart={canStart} />
          </div>
        </a-form-item>

        {/* 密码 */}
        <a-form-item>
          {getFieldDecorator('password', {
            rules: [
              { validator: validate('password', '请输入6-20位数字+字母组合') }
            ],
            validateTrigger: 'blur'
          })(
            <a-input
              size="large"
              placeholder="设置密码6-20位数字+字母组合"
              type="password"
            >
              <IconFont slot="prefix" style={iconStyle} type="iconmima" />
            </a-input>
          )}
        </a-form-item>
        <div class="checkBox clearfix">
          <a-checkbox checked={checked} onChange={onChange}>
            <span>我已阅读并同意</span>
            <nuxt-link to="/user/agreement" target="_blank">
              《尚牛电竞服务使用协议》
            </nuxt-link>
          </a-checkbox>
        </div>
        <a-button
          class="btn"
          htmlType="submit"
          type="primary"
          size="large"
          block={true}
        >
          注册
        </a-button>
      </a-form>
    )

    return (
      <div class="logup formContainer">
        <div class="header">
          <span>注册</span>
          <div class="textBox">
            <span>已有账户请</span>
            <span class="link" onClick={toSignin}>
              登录
            </span>
          </div>
        </div>
        <div class="form">{formElement}</div>
        <ThirdParty />
      </div>
    )
  }
}
</script>
<style lang="less" scoped>
@import url('../style/public.less');
.logup {
  .checkBox {
    font-size: 14px;
    color: #999999;
  }
  .btn {
    margin: 30px 0 20px;
  }
}
</style>
