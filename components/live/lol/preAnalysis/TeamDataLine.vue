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
  name: 'LolTeamDataLine',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      infoData: this.data.strength_index
    }
  },
  computed: {

  },
  created () {

  },
  mounted () {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  methods: {
    initChart () {
      const { infoData } = this
      const aData = [
        infoData.first_blood_kill_team_a,
        infoData.rate_dragon_team_a,
        infoData.rate_baron_team_a,
        infoData.first_tower_kill_team_a,
        infoData.rate_full_bureau_team_a
      ]
      const bData = [
        infoData.first_blood_kill_team_b,
        infoData.rate_dragon_team_b,
        infoData.rate_baron_team_b,
        infoData.first_tower_kill_team_b,
        infoData.rate_full_bureau_team_b
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
            data: ['一血率', '小龙控制率', '大龙控制率', '一塔率', '满局率'],
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
