<script>
export default {
  name: 'Password',
  data () {
    return {
      form: this.$form.createForm(this),
      confirmDirty: false,
      type: [false, false, false]
    }
  },
  methods: {
    blur (e) {
      const value = e.target.value
      this.confirmDirty = this.confirmDirty || !!value
    },
    compareToFirstPassword (rule, value, callback) {
      if (value && value !== this.form.getFieldValue('newPassword')) {
        callback(new Error('两次密码输入不一致'))
      } else {
        callback()
      }
    },
    validateToNextPassword (rule, value, callback) {
      const regex = this.regx.password
      if (!regex.test(value)) {
        callback(new Error('请输入6-20位数字+字母组合'))
      }
      if (value && this.confirmDirty) {
        this.form.validateFields(['confirm'], { force: true })
      }
      callback()
    },
    getData () {
      return new Promise((resolve, reject) => {
        this.form.validateFields((err, values) => {
          if (!err) {
            resolve(values)
          }
        })
      })
    },
    change (index) {
      this.$set(this.type, index, !this.type[index])
    }
  },
  render () {
    const {
      getData,
      compareToFirstPassword,
      validateToNextPassword,
      blur,
      change,
      type
    } = this
    const { getFieldDecorator } = this.form

    const showIcon = (index) => {
      if (this.type[index]) {
        return <IconFont class="icon" type="iconxianshimima" />
      } else {
        return <IconFont class="icon" type="iconxianshimima1" />
      }
    }

    return (
      <a-form onSubmit={getData}>
        <a-form-item class="clearfix inputItem">
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入您的旧密码' }],
            validateTrigger: 'blur'
          })(<a-input placeholder="输入旧密码" type={type[0] ? 'text' : 'password'} />)}
          <span
            on-click={() => {
              change(0)
            }}
          >
            {showIcon(0)}
            {this.type}
          </span>
        </a-form-item>

        <a-form-item class="clearfix inputItem">
          {getFieldDecorator('newPassword', {
            rules: [
              { required: true, message: '请输入您的新密码' },
              { validator: validateToNextPassword }
            ],
            validateTrigger: 'blur'
          })(
            <a-input placeholder="输入新密码" on-blur={blur} type={type[1] ? 'text' : 'password'} />
          )}
          <span
            on-click={() => {
              change(1)
            }}
          >
            {showIcon(1)}
          </span>
        </a-form-item>

        <a-form-item class="clearfix inputItem">
          {getFieldDecorator('confirm', {
            rules: [
              { required: true, message: '请再次输入密码' },
              { validator: compareToFirstPassword }
            ],
            validateTrigger: 'blur'
          })(<a-input placeholder="再次输入您的密码" type={type[2] ? 'text' : 'password'} />)}
          <span
            on-click={() => {
              change(2)
            }}
          >
            {showIcon(2)}
          </span>
        </a-form-item>
      </a-form>
    )
  }
}
</script>

<style lang="less" scoped>
.inputItem {
  position: relative;
  .icon {
    position: absolute;
    cursor: pointer;
    color: #cbcbcb;
    right: 10px;
    top: 0;
  }
}
</style>
