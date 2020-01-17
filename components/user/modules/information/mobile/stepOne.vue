<script>
import { mapState } from 'vuex'
import Countdown from '@/components/common/countdown'
import { publicApi } from '@/api'
export default {
  name: 'MobileOne',
  components: {
    Countdown
  },
  data () {
    return {
      form: this.$form.createForm(this),
      apiFun: () => {
        const url = publicApi.commonSms
        const phone = this.userInfo.phone
        return this.$axios.post(url, { phone, type: 3 })
      }
    }
  },
  computed: {
    ...mapState('user', {
      userInfo: state => state.userInfo
    })
  },
  methods: {
    submit (e) {
      return new Promise((resolve, reject) => {
        this.form.validateFields((err, values) => {
          if (!err) {
            const phone = this.userInfo.phone
            const url = publicApi.validateSmsCode
            const params = Object.assign({ phone }, values)

            this.$axios.post(url, params).then((res) => {
              this.$message.success('验证成功')
              const result = Object.assign({}, {
                values: params,
                type: 'next',
                step: 'two'
              })
              this.$emit('next', result)
              resolve(result)
            })
          }
        })
      })
    },
    resetForm () {
      this.form.resetFields()
    }
  },
  render () {
    const { submit, apiFun } = this
    const { getFieldDecorator } = this.form
    return (
      <a-form onSubmit={submit}>
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
