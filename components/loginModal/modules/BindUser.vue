<script>
import { mapState } from 'vuex'
import { iconStyle, btnStyle } from '../js/scorp'
import { validate } from '@/assets/js/publicFn'
import { userApi, publicApi } from '@/api'
import Countdown from '@/components/common/countdown'
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  name: 'BindUser',
  components: {
    Countdown
  },
  data () {
    return {
      avart: '',
      type: 'wechat',
      apiFun: async () => {
        const url = publicApi.commonSms
        const phone = await this.form.getFieldValue('phone')
        const params = {
          phone,
          type: 0
        }
        return this.$axios.post(url, params)
      },
      checked: true,
      form: this.$form.createForm(this)
    }
  },
  computed: {
    ...mapState('user', {
      formState: state => state.formClear
    }),
    avartType () {
      const type = this.$route.query.type
      switch (type) {
        case 'WX':
          return {
            color: '#2CBA51',
            type: 'iconweixin'
          }
        case 'QQ':
          return {
            color: '#4398EF',
            type: 'iconQQ'
          }
        case 'WEIBO':
          return {
            color: '#DF4747',
            type: 'iconweibo'
          }
        default:
          return {
            color: '',
            type: 'icontupian'
          }
      }
    }
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
    this.avart = this.$store.state.user.headPic
    this.form.setFieldsValue({ nickName: this.$store.state.user.nickName })
  },
  methods: {
    validate,
    onChange (e) {
      this.checked = e.target.checked
    },
    checkPhoneName (params) {
      return this.$axios.get(userApi.checkNamePhone, { params })
    },
    submit (e) {
      e.preventDefault()
      if (!this.checked) {
        this.$message.warning('请勾选用户协议')
        return
      }
      this.form.validateFields((err, values) => {
        if (!err) {
          const params = {
            ...values,
            headPic: this.avart,
            loginType: this.$route.query.state,
            openId: this.$route.query.code
          }
          this.$axios.post(userApi.loginByThird, params).then((res) => {
            this.$store.commit('user/SET_USERINFO', res)
            this.$store.commit('SET_TOKEN', res.token)
            Cookie.set('Token', res.token)
            this.$message.success('登录成功')
            this.$store.dispatch('setMatchStatus', []) // 清空比赛关注、提醒状态数据
            this.$UserModal().hide()
            this.$router.push('/')
          })
        }
      })
    }
  },
  render () {
    const {
      avart,
      avartType,
      apiFun,
      onChange,
      checkPhoneName,
      submit
    } = this
    const { getFieldDecorator } = this.form
    // 注册表单
    const formElement = (
      <div class="form" onSubmit={submit}>
        <a-form>
          {/* 用户昵称 */}
          <a-form-item hideRequiredMark={true}>
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
              <a-input size="large" placeholder="用户名">
                <IconFont slot="prefix" style={iconStyle} type="iconxiaolian" />
              </a-input>
            )}
          </a-form-item>
          {/* 手机号 */}
          <a-form-item hideRequiredMark={true}>
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
              <a-input size="large" placeholder="手机号">
                <IconFont slot="prefix" style={iconStyle} type="iconshouji" />
              </a-input>
            )}
          </a-form-item>
          {/* 验证码 */}
          <a-form-item hideRequiredMark={true}>
            {getFieldDecorator('code', {
              rules: [{ required: true, message: '请输入验证码' }]
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
              <Countdown apiFun={apiFun} />
            </div>
          </a-form-item>
          {/* 使用协议 */}
          <div class="checkBox">
            <a-checkbox checked={this.checked} onChange={onChange}>
              <span>我已阅读并同意</span>
              <nuxt-link to="/">《尚牛电竞服务使用协议》</nuxt-link>
            </a-checkbox>
          </div>
          {/* 按钮 */}
          <a-button
            class="btn"
            type="primary"
            htmlType="submit"
            size="large"
            block={true}
            onClick={submit}
            style={btnStyle}
          >
            提交
          </a-button>
        </a-form>
      </div>
    )

    return (
      <div class="bindUser formContainer">
        <div class="avartBox">
          <IconFont
            class="iconAvart"
            style={`color:${avartType.color}`}
            type={avartType.type}
          />
          <IconFont style="fontSize:35px" type="iconbangding" />
          {avart ? (
            <img class="avart" src={avart} />
          ) : (
            <IconFont style="fontSize:35px" type="iconloading" />
          )}
        </div>
        <div class="text">为了保障您的账号安全，请确定用户名并绑定联系方式</div>
        {formElement}
      </div>
    )
  }
}
</script>
<style lang="less" scoped>
@import url('../style/public.less');
.avartBox {
  width: 340px;
  margin: 25px auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .iconAvart {
    font-size: 90px;
  }
  .avart {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    cursor: pointer;
  }
}
.text {
  font-size: 15px;
  text-align: center;
  color: #212121;
  font-weight: 500;
  margin-bottom: 30px;
}
.checkBox {
  color: #999999;
  margin-bottom: 20px;
}
</style>
