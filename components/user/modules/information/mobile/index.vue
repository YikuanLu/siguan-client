<script>
import Countdown from '@/components/common/countdown'
import StepOne from '@/components/user/modules/information/mobile/stepOne' // 步骤一
import stepTwo from '@/components/user/modules/information/mobile/stepTwo' // 步骤一
export default {
  name: 'Mobile',
  components: {
    Countdown,
    StepOne,
    stepTwo
  },
  data () {
    return {
      step: 'one',
      resetPhoneParams: {
        newCode: '',
        newPhone: '',
        oldCode: '',
        oldPhone: ''
      }
    }
  },
  methods: {
    getData () {
      return this.$refs[this.step].submit()
    },
    changeStep (val) {
      this.resetPhoneParams.oldCode = val.values.code
      this.resetPhoneParams.oldPhone = val.values.phone
      this.step = val.step
    }
  },
  render () {
    let vm = null
    const { resetPhoneParams } = this
    if (this.step === 'one') {
      vm = (
        <StepOne
          {...{ ref: 'one' }}
          on-next={(val) => {
            this.changeStep(val)
          }}
        />
      )
    }
    if (this.step === 'two') {
      vm = (
        <stepTwo
          resetPhoneParams = {resetPhoneParams}
          {...{ ref: 'two' }}
          on-finish={(val) => {
            this.changeStep(val)
          }}
        />
      )
    }
    return (
      <div class="mobile">
        {vm}
        <p class="tip">如号码丢失无法获取验证码，可联系客服修改</p>
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
.mobile {
  .countdown {
    width: 110px;
    height: 32px;
    border: 1px solid @primary-color;
    border-radius: 4px;
    color: @primary-color;
  }
  .tip {
    font-size: 14px;
  }
}
</style>
