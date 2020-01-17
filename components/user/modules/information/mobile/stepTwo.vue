<script>
import Countdown from '@/components/common/countdown'
import { validate } from '@/assets/js/publicFn'
import { userApi, publicApi } from '~/api'
export default {
  name: 'MobileTwo',
  components: {
    Countdown
  },
  props: {
    resetPhoneParams: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      form: this.$form.createForm(this),
      apiFun: async () => {
        const url = publicApi.commonSms
        const phone = await this.form.getFieldValue('phone')
        return this.$axios.post(url, { phone, type: 3 })
      }
    }
  },
  methods: {
    // 验证方法
    validate,
    submit (e) {
      return new Promise((resolve, reject) => {
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log(values)
            const params = Object.assign(this.resetPhoneParams, {
              newCode: values.code,
              newPhone: values.phone
            })
            this.resetPhoneApi(params).then((res) => {
              this.$message.success('修改成功')
              const result = Object.assign({}, {
                values: params,
                type: 'finsh',
                step: 'one'
              })
              this.$emit('next', result)
              resolve(result)
            })
          }
        })
      })
    },
    resetPhoneApi (params) {
      const url = userApi.resetPhone
      return this.$axios.post(url, params)
    },
    resetForm () {
      this.form.resetFields()
    }
  },
  render () {
    const { submit, apiFun, validate } = this
    const { getFieldDecorator } = this.form
    return (
      <a-form onSubmit={submit}>
        <a-form-item class="clearfix">
          {getFieldDecorator('phone', {
            rules: [{ validator: validate('phone', '请输入正确手机号') }],
            validateTrigger: 'blur'
          })(<a-input class="fl" placeholder="输入您的手机号" />)}
        </a-form-item>
        <a-form-item class="clearfix">
          {getFieldDecorator('code', {
            rules: [{ required: true, message: '请输入您的验证码' }],
            validateTrigger: 'blur'
          })(
            <a-input
              class="fl"
              style={{ width: '240px' }}
              placeholder="输入您的验证码"
            />
          )}
          <div class="countdown fr">
            <Countdown apiFun={apiFun} />
          </div>
        </a-form-item>
      </a-form>
    )
  }
}
</script>

<style lang="less" scoped>
.countdown {
  width: 110px;
  height: 32px;
  border: 1px solid @primary-color;
  border-radius: 4px;
  color: @primary-color;
}
</style>
