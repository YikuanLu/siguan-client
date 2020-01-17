<script>
/**
* 全网指数tab切换组件
**/
export default {
  name: 'RoundTabs',
  props: {
    types: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      cur: 0,
      winType: 0,
      tabs: [],
      handicapTabs: [],
      sortData: [],
      data: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.switchTab(this.types[0])
    })
    // 重置局数tab为全场
    this.$bus.on('resetRoundTab', (val) => {
      this.data = val
      this.switchTab(this.types[0])
    })
  },
  beforeDestory () {
    this.$bus.off('resetRoundTab')
  },
  created () {
  },
  methods: {
    switchTab (item) {
      this.cur = item.id
      this.handicapTabs = this.tabs[this.cur].children
      this.winType = Object.keys(this.handicapTabs)[0]
      this.sortBNum()
    },
    switchBetTab (item) {
      this.winType = item
      this.sortBetType()
    },
    sortBNum () {
      // 先按照局数来筛选
      // eslint-disable-next-line eqeqeq
      this.sortData = this.data.filter(_ => _.boardNum == this.cur)
      this.sortBetType()
    },
    sortBetType () {
      // 再按照赔率类型来筛选
      // 设置指数表格的数据
      // eslint-disable-next-line eqeqeq
      const sortData = this.sortData.filter(_ => _.betType == this.winType)
      this.$bus.emit('setBetData', sortData)
    }
  },
  render () {
    if (!this.types || !this.types.length) { return }

    this.tabs = this.types

    const { cur, tabs, switchTab, handicapTabs, winType, switchBetTab } = this

    const tab1 = (
      tabs.map((item) => {
        return <div
          key={item.id}
          class={{ item: true, actived: cur === item.id }}
          onClick={switchTab.bind(this, item)}>
          <span class="text">{item.name}</span>
        </div>
      })
    )
    const tab2 = (
      Object.keys(handicapTabs).map((k) => {
        return <div
          key={k}
          class={{ item: true, actived: winType === k }}
          onClick={switchBetTab.bind(this, k)}>
          <span class="text">{handicapTabs[k]}</span>
        </div>
      })
    )
    const dom = (
      <div>
        <div class="game-tab">{tab1}</div>
        <div class="game-win-tab">{tab2}</div>
      </div>
    )

    return dom
  }
}
</script>
<style scoped lang="less">
  .game-tab{
    background: #fff;
    border-bottom: solid 1px rgba(245,245,245,1);
    overflow: hidden;
    .item{
      cursor: pointer;
      padding: 20px 0;
      float: left;
      margin: 0 35px;
      .text{
        font-size: 16px;
        color: #212121;
        display: inline-block;
        vertical-align: middle;
      }
      &.actived{
        border-bottom: solid 4px @primary-color;
        .text{
          color: @primary-color;
        }
      }
    }
  }
  .game-win-tab{
    background: #fff;
    border-bottom: solid 1px rgba(245,245,245,1);
    overflow: hidden;
    padding: 20px;
    text-align: center;
    font-size: 0;
    .item{
      cursor: pointer;
      display: inline-block;
      color: #333;
      background:rgba(255,255,255,1);
      border:1px solid rgba(245, 245, 245, 1);
      text-align: center;
      border-radius: 4px;
      margin: 0 4px;
      font-size: 12px;
      width: auto;
      height: 36px;
      line-height: 36px;
      padding: 0 10px;
      &.actived{
        border-color: #C4E4FF;
        color: @primary-color;
      }
    }
  }
</style>
