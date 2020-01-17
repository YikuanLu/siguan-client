export default {
  name: 'Countdown',
  props: {
    count: {
      type: Number,
      default: 60
    },
    canStart: {
      type: Boolean,
      default: true
    },
    apiFun: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      showContent: '发送验证码',
      mainCount: 60,
      state: 1,
      timer: ''
    }
  },
  computed: {
    eleClass () {
      return (this.canStart && this.state === 1) ? 'canStart' : 'unStart'
    }
  },
  watch: {},
  mounted () {
    clearTimeout(this.timer)
    this.timer = null
  },
  destroyed () {
    this.timer = null
  },
  methods: {
    start () {
      if (this.state === 0 || !this.canStart) {
        return
      }
      this.state = 0
      this.apiFun()
        .then((res) => {
          this.$message.success('发送成功')
          this.mainCount = 59
          this.showContent = `${this.mainCount}s`
          this.timer = setInterval(() => {
            if (this.mainCount > 0) {
              this.mainCount--
              this.showContent = `${this.mainCount}s`
            } else {
              clearTimeout(this.timer)
              this.timer = null
              this.state = 1
              this.mainCount = this.count
              this.finish()
              this.showContent = '发送验证码'
            }
          }, 1000)
        })
        .catch((err) => {
          this.state = 1
          console.log(err)
        })
    },
    finish () {
      this.$emit('finish')
    }
  },
  render () {
    const { showContent, start, eleClass } = this
    return (
      <span class={`countdown-content ${eleClass}`} onclick={start}>
        {showContent}
      </span>
    )
  }
}
