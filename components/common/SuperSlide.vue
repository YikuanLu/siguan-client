<script>
/**
 * @params {Array} data 轮播主体列表数据bottomRight:右下角 | middle:中间
 * @scopedSlots {function} 单项组件
 * @slot {slot} header 头部替换文字展示
 * 用法参考 /pages/match/type/_id.vue
 */
export default {
  name: 'SuperSlide',
  props: {
    title: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      require: true,
      default: () => []
    },
    options: {
      type: Object,
      default: (value) => {
        return {}
      }
    },
    customerStyle: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      list: [],
      reloadFlag: false
    }
  },
  watch: {
    data (val) {
      this.list = val
      this.reloadFlag = true
      const timer = setTimeout(() => {
        this.reloadFlag = false
        clearTimeout(timer)
      })
    }
  },
  methods: {
    slideMove (type) {
      this.$refs[type].click()
    }
  },
  render () {
    const { title, list, options, customerStyle } = this
    const { vis } = options

    const pageNum = Math.ceil(list.length / vis)
    const slideArray = new Array(pageNum).fill('')

    const content = slideArray.map((item, index) => {
      const start = vis * index
      const end = vis * index + vis
      const curArr = list.slice(start, end).length
        ? list.slice(start, end)
        : list.slice(start)
      return (
        <div style={{ position: 'relative' }}>
          <ul class="slideContent clearfix">
            {curArr.map((ele, i) => (
              <li class="fl">{this.$scopedSlots.default({ data: ele })}</li>
            ))}
          </ul>
        </div>
      )
    })

    const noData = (
      <div class="noDataBox">
        <Nodata />
      </div>
    )

    const btnGroup =
      list.length > vis ? (
        <div class="fr">
          <IconFont
            class="btnIcon prev"
            type="iconxiayige-copy"
            on-click={() => {
              this.slideMove('pre')
            }}
          />
          <IconFont
            class="btnIcon next"
            type="iconxiayige"
            on-click={() => {
              this.slideMove('next')
            }}
          />
        </div>
      ) : null

    const tabSlot = this.$slots.header
    return (
      <div class="superSlide" style={customerStyle}>
        <div class="header clearfix">
          <div class="title fl">{tabSlot || title}</div>
          {btnGroup}
        </div>

        {list.length ? (
          <a-carousel arrows dots={false} infinite={false}>
            <span style={{ display: 'none' }} ref="pre" slot="prevArrow"></span>
            <span
              style={{ display: 'none' }}
              ref="next"
              slot="nextArrow"
            ></span>
            {content}
          </a-carousel>
        ) : (
          noData
        )}
      </div>
    )
  }
}
</script>
<style lang="less" scoped>
.superSlide {
  position: relative;
  min-height: 180px;
  .header {
    padding: 20px 10px;
    .title {
      color: #212121;
      font-size: 16px;
      font-weight: 600;
    }
    .btnIcon {
      color: #c2c2c2;
      font-size: 20px;
      &:hover {
        color: @primary-color;
      }
    }
    .btnIcon.active {
      color: @primary-color;
    }
    .prev {
      margin-right: 10px;
    }
  }
  .slideContent {
    display: flex;
    justify-content: start;
  }

  .noDataBox {
    width: 100%;
    position: absolute;
    top: 50%;
  }
}
</style>
