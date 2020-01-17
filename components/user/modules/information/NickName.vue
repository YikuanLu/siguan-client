<script>
export default {
  name: 'NickName',
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
            const result = Object.assign({}, {
              values,
              type: 'finish'
            })
            resolve(result)
          } else {
            resolve('err')
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
            {getFieldDecorator('nickName', {
              rules: [{ required: true, message: '请输入您的昵称' }]
            })(<a-input placeholder="输入您的昵称" />)}
          </a-form-item>
        </a-form>
        <p class="tip">一个月内仅限修改一次，请谨慎修改</p>
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
  }
}
</style>
