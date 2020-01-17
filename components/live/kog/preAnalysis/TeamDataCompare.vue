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
  name: 'KogTeamDataCompare',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
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
      this.initLeftChart()
      this.initRightChart()
    })
  },
  methods: {
    calcWinRate (data) {
      const rate = (data.winCount / data.playCount * 100).toFixed(0)
      return rate
    },
    initLeftChart () {
      const { teamA, calcWinRate } = this

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
              text: `${calcWinRate(teamA)}%`,
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
              { value: teamA.winCount, name: '胜' },
              { value: teamA.lostCount, name: '败' }
            ]
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
    initRightChart () {
      const { teamB, calcWinRate } = this
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
              text: `${calcWinRate(teamB)}%`,
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
              { value: teamB.winCount, name: '胜' },
              { value: teamB.lostCount, name: '败' }
            ]
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  },
  render () {
    const { teamA, teamB } = this

    const leftInfo = (
      <div class="left-info">
        <div class="chart" ref="blueWinRate"></div>
        <p class="win-times">{teamA.winCount}胜{teamA.lostCount}负</p>
      </div>
    )
    // 计算百分比进度
    function calcPercent (aVal, bVal, role) {
      if (aVal === 0) { return '49%' }
      if (bVal === 0) { return '49%' }
      const all = aVal + bVal
      const aPercent = (aVal / all * 100 - 1)
      const bPercent = (bVal / all * 100 - 1)
      if (role === 'a') { // 减 1是因为中间需要有空隙
        return aPercent + '%'
      } else {
        return bPercent + '%'
      }
    }
    // 计算均场时长
    function calcDuration (seconds) {
      if (!seconds) { return null }
      const h = Math.floor(seconds / 60)
      const s = seconds % 60

      return h + "'" + s + "''"
    }
    // 构造数据
    const centerLineData = [
      {
        title: '场均经济',
        aData: teamA.economicAverage,
        bData: teamB.economicAverage
      },
      {
        title: '场均输出',
        aData: teamA.damageAverage,
        bData: teamB.damageAverage
      },
      {
        title: '场均大龙',
        aData: teamA.bigDragonAverage,
        bData: teamB.bigDragonAverage
      },
      {
        title: '均场时长',
        aData: teamA.timeAverage,
        bData: teamB.timeAverage,
        method: calcDuration
      }
    ]

    const centerInfo = (
      <div class="center-info">
        <div class="score">
          <span class="num left">{teamA.kda}</span>
          <span class="detail left">{teamA.killAverage}/{teamA.deathAverage}/{teamA.assistAverage}</span>
          <span class="abbr-en">K/D/A</span>
          <span class="detail right">{teamB.killAverage}/{teamB.deathAverage}/{teamB.assistAverage}</span>
          <span class="num right">{teamB.kda}</span>
        </div>
        {centerLineData.map((item) => {
          return (
            <div>
              <p class="title">{item.title}</p>
              <div class="ratio">
                <span class="num">{item.method ? item.method(item.aData) : (item.aData)}</span>
                <div class="percent-box">
                  <div class="percent left" style={{ width: calcPercent(item.aData, item.bData, 'a') }}></div>
                  <div class="percent right" style={{ width: calcPercent(item.aData, item.bData, 'b') }}></div>
                </div>
                <span class="num">{item.method ? item.method(item.bData) : (item.bData)}</span>
              </div>
            </div>
          )
        })}
      </div>
    )

    const rightInfo = (
      <div class="right-info">
        <div class="chart" ref="redWinRate"></div>
        <p class="win-times">{teamB.winCount}胜{teamB.lostCount}负</p>
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
    min-height: 320px;
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
          font-size: 16px;
          font-weight: 600;
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
