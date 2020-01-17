<script>
/**
* 实时比分-详情-经济曲线差组件
* 用法
*/
import CommonTab from '~/components/live/CommonTab'
import { GAME_DIFF_TAB_LIST } from '~/assets/js/types'
let echarts
if (process.client) {
  echarts = require('echarts')
}
export default {
  name: 'LolEconomicGap',
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    battleData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      tabs: GAME_DIFF_TAB_LIST,
      infoData: this.data,
      economic_diff: { // 经济差
        xDatas: [],
        yDatas: []
      },
      xp_diff: { // 经验差
        xDatas: [],
        yDatas: []
      },
      curBattle: {}
    }
  },
  computed: {

  },
  created () {

  },
  mounted () {
    this.$nextTick(() => {
      this.getCurBattle()
      this.dealData()
      this.initChart()
    })
  },
  methods: {
    // 获取当前进行中比赛的局数
    getCurBattle () {
      const curRound = this.infoData.battle_list.filter(_ => _.status === 1)
      if (curRound[0]) {
        this.curBattle = curRound[0]
      }
    },
    dealData () {
      // 处理x，y轴数据
      this.battleData.economic_diff.map((item) => {
        this.economic_diff.xDatas.push(`${Math.floor(item.time / 60)}:00`)
        this.economic_diff.yDatas.push(item.diff)
      })
      this.battleData.xp_diff.map((item) => {
        this.xp_diff.xDatas.push(`${Math.floor(item.time / 60)}:00`)
        this.xp_diff.yDatas.push(item.diff)
      })
    },
    initChart (type = 'economic_diff') {
      const yArr = [...this[type].yDatas]
      const absYArr = yArr.map(Math.abs)
      const maxY = Math.max(...absYArr)
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(this.$refs.EconomicGap)

      const option = {
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(50,50,50,0.9)',
          formatter: (params) => {
            let team
            const curType = type === 'economic_diff' ? '经济差' : '经验差'
            params[0].value > 0
              ? team = `<span style="color: #46B368;">${this.infoData.team_a.short_name}</span>`
              : team = `<span style="color: #FA504C;">${this.infoData.team_b.short_name}</span>`
            const value = `
              ${params[0].axisValue} <br/>
              ${curType}：${team} 领先 ${Math.abs(params[0].value)}
            `
            return value
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          axisLabel: {
            interval: Math.floor(this[type].xDatas.length / 6),
            align: 'right',
            padding: [6, 0, 0, 0],
            textStyle: {
              color: '#999'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#e6e6e6'
            }
          },
          axisTick: {
            show: false
          },
          data: this[type].xDatas
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            fontWeight: 900,
            formatter: (val) => {
              if (val === 0) {
                return `0`
              } else {
                return `${(Math.abs(val) / 1000).toFixed(0)} K`
              }
            },
            color (value, index) {
              if (value > 0) {
                return '#46B368'
              } else if (value < 0) {
                return '#FA504C'
              } else {
                return `#333`
              }
            }
          },
          axisLine: {
            lineStyle: {
              color: '#f1f1f1'
            }
          },
          splitLine: {
            lineStyle: {
              color: '#f1f1f1'
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: [
                'RGBA(248, 203, 208, .1)',
                'RGBA(248, 203, 208, .1)',
                'RGBA(248, 203, 208, .1)',
                'RGBA(167, 221, 189, .1)',
                'RGBA(167, 221, 189, .1)',
                'RGBA(167, 221, 189, .1)'
              ]
            }
          },
          min: -1.1 * maxY,
          max: 1.1 * maxY
        },
        grid: {
          left: 50,
          right: 0,
          bottom: 31,
          top: 20
        },
        graphic: [
          {
            type: 'text',
            z: 100,
            left: '15%',
            top: '82%',
            style: {
              fill: '#FA504C',
              text: this.infoData.team_b.short_name,
              font: '18px bold'
            }
          },
          {
            type: 'text',
            z: 100,
            left: '15%',
            top: '9%',
            style: {
              fill: '#46B368',
              text: this.infoData.team_a.short_name,
              font: '18px bold'
            }
          }
        ],
        visualMap: {
          show: false,
          dimension: 1,
          pieces: [
            { gte: 0, lte: 11 * maxY, color: '#677FEB' }
          ],
          outOfRange: {
            color: '#FA504C'
          }
        },
        series: [{
          smooth: true,
          symbol: 'none',
          data: this[type].yDatas,
          type: 'line'
        }]
      }
      myChart.clear()
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option, true)
    },
    switchTab (val) {
      let type
      val === 1
        ? type = 'economic_diff'
        : type = 'xp_diff'
      this.initChart(type)
    }
  },
  render () {
    const { switchTab, tabs, battleData } = this
    // 经济差和经验差不一定同时有数据，没有数据就不显示了
    let showTabs = tabs
    if (!battleData.economic_diff || !battleData.economic_diff.length) {
      showTabs = [tabs[1]]
    }
    if (!battleData.xp_diff || !battleData.xp_diff.length) {
      showTabs = [tabs[0]]
    }
    const title = (
      <CommonTab
        data={showTabs}
        on-switchTab={switchTab}
      />
    )
    const chart = (
      <div class="chart" ref="EconomicGap"></div>
    )
    const dom = (
      <div class="charts">
        {title}
        {chart}
      </div>
    )

    return dom
  }
}
</script>

<style lang="less" scoped>
  .charts{
    width:415px;
    height:340px;
    .chart{
      width: 415px;
      height: 290px;
      border: 1px solid #f5f5f5;
    }
  }
</style>
