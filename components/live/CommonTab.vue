<script>
/**
* 实时比分-详情-通用tab切换组件
* 用法
**/
export default {
  name: 'LiveTypeTabs',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      cur: 1
    }
  },
  mounted () {
    this.cur = this.data[0].id
  },
  methods: {
    switchTab (val) {
      this.cur = val
      this.$emit('switchTab', val)
    }
  },
  render () {
    const { data, cur, switchTab } = this

    const dom = (
      <div class="chart-title">
        {data.map((item) => {
          return (
            <div
              class="item"
              onClick={switchTab.bind(this, item.id)}
              class={{ item: true, 'on': cur === item.id }}
            >{item.name}</div>
          )
        })}
      </div>
    )
    return dom
  }
}
</script>
<style scoped lang="less">
  .chart-title{
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    .item{
      flex: 1;
      float: left;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 16px;
      color: #333;
      border: solid 1px #F5F5F5;
      border-left-color: transparent;
      user-select: none;
      cursor: pointer;
      &:first-child{
        border-left-color: #F5F5F5;
      }
      &.on{
        border: solid 1px #C4E4FF;
        background: #F7FBFF;
        color: @primary-color;
      }
    }
  }
</style>
