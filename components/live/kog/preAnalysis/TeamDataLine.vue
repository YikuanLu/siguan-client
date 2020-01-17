<script>
/**
* 实时比分-详情-赛前分析-战队数据对比组件
* 用法
*/
let echarts
if (process.client) {
  echarts = require('echarts')
}
export default {
  name: 'KogTeamDataLine',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      demoImg: require('@/static/img/game-types/demo.png'),
      infoData: this.data.recentlyTeamData,
      teamA: {},
      teamB: {}
    }
  },
  computed: {

  },
  created () {

  },
  mounted () {
    try {
      this.teamA = this.infoData[0]
      this.teamB = this.infoData[1]
    } catch (error) {

    }
    this.$nextTick(() => {
      this.initChart()
    })
  },
  methods: {
    initChart () {
      const { teamA, teamB } = this
      const aData = [
        teamA.firstBloodRate,
        teamA.smallDragonRate,
        teamA.bigDragonRate
      ]
      const bData = [
        teamB.firstBloodRate,
        teamB.smallDragonRate,
        teamB.bigDragonRate
      ]
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(this.$refs.compareLine)

      const config = {
        type: 'bar',
        barWidth: '18',
        label: {
          normal: {
            show: true,
            formatter: '{c}%',
            position: 'top',
            textStyle: {
              fontSize: 12,
              color: '#999'
            }
          }
        },
        itemStyle: {
          normal: {
            barBorderRadius: [50, 50, 0, 0]
          }
        },
        barGap: '100%'
      }

      const option = {
        tooltip: {
          trigger: 'axis',
          // axisPointer: {
          //   type: 'shadow'
          // }
          formatter: (params) => {
            let value = `${params[0].axisValue}<br/>`
            params.map((item, index) => {
              value += `
                  ${item.marker} ${item.seriesName}：${item.value}% <br/>
                `
            })
            return value
          }
        },
        xAxis: [
          {
            type: 'category',
            data: ['一血率', '小龙控制率', '大龙控制率'],
            axisPointer: {
              type: 'shadow'
            },
            axisLine: {
              lineStyle: {
                color: '#E4E9F3'
              }
            },
            axisLabel: {
              color: '#999'
            }
          }
        ],
        grid: {
          top: '8%',
          bottom: '12%',
          left: 0,
          right: 0
        },
        yAxis: {
          show: false
        },
        series: [
          {
            name: '蓝队',
            color: '#6C81DB',
            data: aData,
            ...config
          },
          {
            name: '红队',
            color: '#FA4F4A',
            data: bData,
            ...config
          }

        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  },
  render () {
    // const {  } = this

    const chart = (
      <div class="chart" ref="compareLine"></div>
    )
    const dom = (
      <div class="player-box">
        {chart}
      </div>
    )

    return dom
  }
}
</script>

<style lang="less" scoped>
  .chart{
    width: 760px;
    height: 224px;
    margin: auto;
  }
</style>
