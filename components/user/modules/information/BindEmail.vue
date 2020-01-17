<script>
export default {
  data () {
    return {
      form: this.$form.createForm(this)
    }
  },
  methods: {
    getData (e) {
      return new Promise((resolve, reject) => {
        this.form.validateFields((err, values) => {
          if (!err) {
            resolve('finish')
          } else {
            resolve('err')
            // reject(err)
          }
        })
      })
    },
    resetForm () {
      this.form.resetFields()
    }
  },
  render () {
    const { getData } = this
    const { getFieldDecorator } = this.form
    return (
      <div class="editBox">
        <a-form onSubmit={getData}>
          <a-form-item>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: '请输入您的昵称' }]
            })(<a-input placeholder="输入您的昵称" />)}
          </a-form-item>
        </a-form>
        <p class="tip">
          发送后，系统自动发一份邮件到此邮箱，您需要去登录邮箱，
          确认绑定后刷新当前页面，查看绑定结果
        </p>
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
.editBox {
  padding-bottom: 35px;
  .tip {
    font-size: 14px;
    color: #666666;
    line-height: 1.4
  }
}
</style>
