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
  name: 'DotaTeamDataCompare',
  props: {
    data: {
      type: Object,
      default: () => []
    }
  },
  data () {
    return {
      demoImg: require('@/static/img/game-types/demo.png')
    }
  },
  computed: {

  },
  created () {

  },
  mounted () {
    this.$nextTick(() => {
      this.initLeftChart()
      this.initRightChart()
    })
  },
  methods: {
    initLeftChart () {
      const {
        team_a_match_stat: TeamA,
        team_b_match_stat: TeamB
      } = this.data
      if (!TeamA || !TeamB) {
        return null
      }
      const WinRate = TeamA.winRate
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(this.$refs.blueWinRate)

      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {d}%'
        },
        color: ['#43ABFF', '#d9d9d9'],
        title: {
          text: '胜率',
          left: 'center',
          top: '40%',
          padding: [24, 0],
          textStyle: {
            color: '#999',
            fontSize: 12,
            align: 'center'
          }
        },
        graphic: [
          {
            type: 'text',
            z: 100,
            left: 'center',
            top: '40%',
            style: {
              fill: '#677EEA',
              text: `${WinRate}%`,
              font: '18px bold'
            }
          }
        ],
        series: [
          {
            type: 'pie',
            radius: ['50%', '100%'],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: WinRate, name: '胜' },
              { value: 100 - WinRate, name: '败' }
            ]
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
    initRightChart () {
      const {
        team_a_match_stat: TeamA,
        team_b_match_stat: TeamB
      } = this.data
      if (!TeamA || !TeamB) {
        return null
      }
      const WinRate = TeamB.winRate
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(this.$refs.redWinRate)

      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {d}%'
        },
        color: ['#FF8072', '#d9d9d9'],
        title: {
          text: '胜率',
          left: 'center',
          top: '40%',
          padding: [24, 0],
          textStyle: {
            color: '#999',
            fontSize: 12,
            align: 'center'
          }
        },
        graphic: [
          {
            type: 'text',
            z: 100,
            left: 'center',
            top: '40%',
            style: {
              fill: '#F04844',
              text: `${WinRate}%`,
              font: '18px bold'
            }
          }
        ],
        series: [
          {
            type: 'pie',
            radius: ['50%', '100%'],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: WinRate, name: '胜' },
              { value: 100 - WinRate, name: '败' }
            ]
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  },
  render () {
    const {
      team_a_match_stat: TeamA,
      team_b_match_stat: TeamB
    } = this.data
    if (!TeamA || !TeamB) {
      return <Nodata style="padding: 30px;"></Nodata>
    }

    const leftInfo = (
      <div class="left-info">
        <div class="chart" ref="blueWinRate"></div>
        <p class="win-times">{TeamA.runWin}场</p>
        <p class="consecutive-win">连胜场数</p>
      </div>
    )

    // 计算百分比进度
    function calcPercent (aVal, bVal, role) {
      const all = aVal + bVal
      const aPercent = (aVal / all * 100 - 1)
      const bPercent = (bVal / all * 100 - 1)
      if (role === 'a') { // 减 1是因为中间需要有空隙
        return aPercent + '%'
      } else {
        return bPercent + '%'
      }
    }
    // 构造数据
    const centerLineData = [
      {
        title: '每分钟金钱',
        aData: TeamA.goldPerMin,
        bData: TeamB.goldPerMin
      },
      {
        title: '每分钟经验',
        aData: TeamA.xpPerMin,
        bData: TeamB.xpPerMin
      },
      {
        title: '场均真眼',
        aData: TeamA.sentryWard,
        bData: TeamB.sentryWard
      },
      {
        title: '场均假眼',
        aData: TeamA.observerWard,
        bData: TeamB.observerWard
      },
      {
        title: '场均开雾',
        aData: TeamA.smoke,
        bData: TeamB.smoke
      }
    ]
    const centerInfo = (
      <div class="center-info">
        <div class="score">
          <span class="num left">{TeamA.kda}</span>
          <span class="abbr-en">场均K/D/A</span>
          <span class="num right">{TeamB.kda}</span>
        </div>
        {centerLineData.map((item) => {
          return (
            <div>
              <p class="title">{item.title}</p>
              <div class="ratio">
                <span class="num">{item.aData.toFixed(2)}</span>
                <div class="percent-box">
                  <div class="percent left" style={{ width: calcPercent(item.aData, item.bData, 'a') }}></div>
                  <div class="percent right" style={{ width: calcPercent(item.aData, item.bData, 'b') }}></div>
                </div>
                <span class="num">{item.bData.toFixed(2)}</span>
              </div>
            </div>
          )
        })}
      </div>
    )

    const rightInfo = (
      <div class="right-info">
        <div class="chart" ref="redWinRate"></div>
        <p class="win-times">{TeamB.runWin}场</p>
        <p class="consecutive-win">连胜场数</p>
      </div>
    )
    const dom = (
      <div class="player-box">
        <div class="player-data">
          {leftInfo}
          {centerInfo}
          {rightInfo}
        </div>
      </div>
    )

    return dom
  }
}
</script>

<style lang="less" scoped>

  .player-data{
    padding: 30px 20px 0;
    position: relative;
    min-height: 350px;
    .left-info, .right-info{
      position: absolute;
      top: 100px;
      text-align: center;
      .chart{
        width: 140px;
        height: 140px;
      }
      .win-times{
        font-size: 14px;
        color: #333;
        padding: 11px 0 5px;
      }
      .consecutive-win{
        font-size: 14px;
        color: #999;
      }
    }
    .center-info{
      position: absolute;
      left: 50%;
      top: 30px;
      transform: translateX(-50%);
      .score{
        padding-bottom: 16px;
        text-align: center;
        .num{
          font-size: 20px;
          font-weight: 600;
          padding: 0 50px;
          &.left{
            color: @primary-color;
          }
          &.right{
            color: #F04844;
          }
        }
        .detail{
          font-size: 14px;
          margin: 0 30px;
          &.left{
            color: #677EEA;
          }
          &.right{
            color: #F04844;
          }
        }
        .abbr-en{
          font-size: 16px;
          color: #333;
          font-weight: 600;
        }
      }
      .title{
        font-size: 14px;
        text-align: center;
        color: #333;
        padding: 16px 0 12px;
      }
      .ratio{
        overflow: hidden;
        display: flex;
        justify-content: space-between;
        .num{
          font-size: 12px;
          color: #333;
          float: left;
          width: 50px;
          white-space: nowrap;
          &:nth-child(1){
            text-align: right;
          }
        }
        .percent-box{
          overflow: hidden;
          float: left;
          height: 6px;
          width: 324px;
          margin: 4px 10px 0;
        }
        .percent{
          height: 6px;
          float: left;
          &.left{
            background: #677EEA;
            margin-right: 1%;
          }
          &.right{
            background: #F04844;
          }
        }
      }
    }
    .left-info{
      left: 60px;
    }
    .right-info{
      right: 60px;
    }
  }
</style>
