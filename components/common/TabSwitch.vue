<script>
/**
 *@params {Array} data Tab项列表
 *@function change(val) 触发状态变更,返回current值
 */
export default {
  name: 'TabSwitch',
  props: {
    data: {
      type: Array,
      required: true
    },
    currentIndex: {
      type: Number,
      default: 0
    },
    customerStyle: {
      type: Object,
      default: () => { return {} }
    }
  },
  methods: {
    change (val) {
      this.$emit('change', val)
    }
  },
  render () {
    const { data, currentIndex, change, customerStyle } = this
    return (
      <div class="tabSwitch" style={customerStyle}>
        {data.map((item, index) => {
          return (
            <span
              class={currentIndex === index ? 'active' : ''}
              on-click={() => change({ data: item, index })}
            >
              {item.name}
            </span>
          )
        })}
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
.tabSwitch {
  padding: 12px 20px;
  span {
    display: inline-block;
    cursor: pointer;
    padding: 10px 16px;
    margin-right: 50px;
    border-radius: 4px;
    color: #333333;
  }
  span.active {
    background-color: @primary-color;
    color: #fff
  }
}
</style>
