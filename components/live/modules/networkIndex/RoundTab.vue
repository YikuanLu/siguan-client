<script>
/**
* 实时比分-详情-全网指数局数tab切换组件
* 用法
* @switchTab 点击tab切换的回调
*/
export default {
  name: 'IndexLiveRoundTabs',
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      cur: 1,
      betData: this.data,
      sortData: {}, // 按局数来重组数据
      types: []
    }
  },
  computed: {

  },
  created () {

  },
  mounted () {
    this.getRoundData()
  },
  methods: {
    switchTab (val) {
      this.cur = val
      this.$bus.emit('changeRound', this.sortData[val])
    },
    getStatsRounds () {
      try {
        const roundArr = []
        // 根据数据获取全网指数的总局数
        this.betData.map((item) => {
          if (!roundArr.includes(item.boardNum)) {
            roundArr.push(item.boardNum)
          }
        })
        return roundArr
      } catch (error) {
        return []
      }
    },
    isHasZero (rounds) {
      // 0 表示“全场”
      if (rounds.includes(0)) {
        this.types[0].name = '全场'
        this.switchTab(0)
      } else {
        this.switchTab(rounds[0])
      }
    },
    getRoundData () {
      const rounds = this.getStatsRounds().sort()
      rounds.map((item) => {
        const json = {
          id: item,
          name: `第${item}局`
        }
        this.types.push(json)
        this.sortData[item] = this.betData.filter(_ => _.boardNum === item)
      })
      this.isHasZero(rounds)
    }
  },
  render () {
    const { cur, switchTab, types } = this

    const dom = (
      <div class="game-types-tab">
        {types.map((item, index) => {
          return (
            <div
              key={item.id}
              class={{ item: true, actived: cur === item.id }}
              onClick={switchTab.bind(this, item.id)}>
              <span class="text">{item.name} </span>
            </div>
          )
        })}
      </div>
    )

    return dom
  }
}
</script>

<style lang="less" scoped>
  .game-types-tab{
    padding: 0 20px;
    background: #fff;
    border-bottom: solid 1px rgba(245,245,245,1);
    white-space: nowrap;
    overflow-x: auto;
    .item{
      cursor: pointer;
      padding: 13px 0;
      position: relative;
      display: inline-block;
      margin-right: 60px;
      .text{
        font-size: 14px;
        color: #212121;
        display: inline-block;
        vertical-align: middle;
      }
      .iconfont{
        color: @error-color;
        font-size: 30px;
        position: absolute;
      }
      &.actived{
        border-bottom: solid 4px @primary-color;
        .text{
          color: @primary-color;
        }
      }
    }
  }
</style>
