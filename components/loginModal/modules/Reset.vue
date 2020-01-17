<script>
import { mapState } from 'vuex'
import { iconStyle, btnStyle } from '../js/scorp'
import { validate } from '@/assets/js/publicFn'
import countdown from '@/components/common/countdown'
import { publicApi, userApi } from '@/api'
import { encryption } from '@/assets/js/secret'
export default {
  name: 'Reset',
  components: {
    countdown
  },
  data () {
    return {
      apiFun: async () => {
        const url = publicApi.commonSms
        const phone = await this.form.getFieldValue('phone')
        return this.$axios.post(url, { phone, type: 2 })
      },
      state: 0,
      canStart: false,
      form: this.$form.createForm(this),
      timer: null
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
  async asyncData ({ $axios }) {},
  mounted () {},
  methods: {
    validate,
    finish () {},
    codeChange (e) {
      const _this = this
      if (!_this.regx.phone.test(e.target.value)) {
        _this.canStart = false
        return
      }
      _this.canStart = true
    },
    submit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          values.password = encryption(
            values.password,
            this.secret.key,
            this.secret.iv
          )
          const url = userApi.resetPwd
          this.$axios.post(url, values).then((res) => {
            console.log(res)
            this.$message.success('修改成功')
            this.$UserModal().show('login')
          })
        }
      })
    }
  },
  render () {
    const { finish, apiFun, canStart, validate, codeChange, submit } = this
    const { getFieldDecorator } = this.form
    // 输入表单
    const resetForm = (
      <div class="reset formContainer">
        <div class="header">找回密码</div>
        <div class="form">
          <a-form onSubmit={submit}>
            {/* 手机号 */}
            <a-form-item hideRequiredMark={true}>
              {getFieldDecorator('phone', {
                rules: [{ validator: validate('phone', '请输入正确手机号') }],
                validateTrigger: 'blur'
              })(
                <a-input
                  size="large"
                  placeholder="手机号"
                  onChange={codeChange}
                >
                  <IconFont slot="prefix" style={iconStyle} type="iconshouji" />
                </a-input>
              )}
            </a-form-item>
            {/* 验证码 */}
            <a-form-item hideRequiredMark={true}>
              {getFieldDecorator('code', {
                rules: [{ required: true, message: '请输入验证码' }],
                validateTrigger: 'blur'
              })(
                <a-input
                  size="large"
                  placeholder="验证码"
                  style={{ width: '240px' }}
                >
                  <IconFont
                    slot="prefix"
                    style={iconStyle}
                    type="iconyanzhengma"
                  />
                </a-input>
              )}
              <div class="countdown fr">
                <countdown
                  apiFun={apiFun}
                  onFinish={finish}
                  canStart={canStart}
                />
              </div>
            </a-form-item>
            {/* 新密码 */}
            <a-form-item hideRequiredMark={true}>
              {getFieldDecorator('password', {
                rules: [
                  {
                    validator: validate('password', '请输入6-20位数字+字母组合')
                  }
                ],
                validateTrigger: 'blur'
              })(
                <a-input size="large" placeholder="设置新密码" type="password">
                  <IconFont slot="prefix" style={iconStyle} type="iconmima" />
                </a-input>
              )}
            </a-form-item>
            <a-button
              class="btn"
              htmlType="submit"
              type="primary"
              size="large"
              block={true}
              style={btnStyle}
            >
              提交
            </a-button>
          </a-form>
        </div>
      </div>
    )

    // 成功页面
    const successElement = <div>修改成功</div>

    if (this.state === 0) {
      return resetForm
    } else {
      return successElement
    }
  }
}
</script>
<style lang="less" scoped>
@import url('../style/public.less');
</style>
