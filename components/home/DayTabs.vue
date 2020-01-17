<script>
/**
* 首页昨天今天明天组件
* 用法
* @switchTab 切换的回调
* import DayTabs from '~/components/home/DayTabs'
* components: { DayTabs }
* <day-tabs @switchTab="switchDateTab"></day-tabs>
**/
import { getTodayZero } from '@/assets/js/publicFn'
export default {
  name: 'DayTabs',
  props: {
    counts: {
      type: Array,
      default: () => []
    },
    gameType: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      cur: 2,
      tabs: [
        {
          id: 1,
          name: '昨天',
          num: 0,
          timeStamp: getTodayZero(-1)
        },
        {
          id: 2,
          name: '今天',
          num: 0,
          timeStamp: getTodayZero()
        },
        {
          id: 3,
          name: '明天',
          num: 0,
          timeStamp: getTodayZero(1)
        },
        {
          id: 4,
          name: '更多 >>'
        }
      ]
    }
  },
  methods: {
    switchTab (item, index) {
      if (item.id === 4) {
        const routeData = this.$router.resolve({
          path: `/live/${this.gameType === 'all' ? '' : this.gameType}`
        })
        window.open(routeData.href, '_blank')
        return
      }
      this.cur = item.id
      this.$emit('switchTab', item.timeStamp)
    }
  },
  render () {
    const { cur, tabs, switchTab, counts } = this
    tabs[0].num = counts[0]
    tabs[1].num = counts[1]
    tabs[2].num = counts[2]

    const showNum = (num) => {
      if (num) {
        return `（${num}）`
      }
    }
    const tab = (
      tabs.map((v, i) => {
        return (
          <span
            class={{ tab: true, active: v.id === cur }}
            onClick={switchTab.bind(this, v, i)}
          >{v.name}{showNum(v.num)}</span>
        )
      })
    )

    return <div class="day-tabs">{tab}</div>
  }
}
</script>
<style scoped lang="less">
.day-tabs {
  background: #fff;
  .tab {
    width: 90px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    background: rgba(244, 244, 244, 1);
    border-radius: 4px;
    font-size: 14px;
    color: rgba(51, 51, 51, 1);
    margin-right: 10px;
    display: inline-block;
    cursor: pointer;
    &.active {
      background: @primary-color;
      color: #fff;
    }
    i {
      font-style: normal;
    }
  }
}
</style>
