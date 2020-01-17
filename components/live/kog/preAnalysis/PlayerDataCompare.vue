<script>
/**
* 实时比分-详情-赛前分析-选手数据对比组件
* 用法
*/
import CommonTab from '~/components/live/CommonTab'
import { GAME_ROLE_TAB_LIST } from '~/assets/js/types'
let echarts
if (process.client) {
  echarts = require('echarts')
}
export default {
  name: 'KogPlayerDataCompare',
  props: {
    data: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      demoImg: require('@/static/img/game-types/demo.png'),
      tabs: GAME_ROLE_TAB_LIST,
      posTypes: {
        1: '上单',
        2: '打野',
        3: '中单',
        4: 'ADC',
        5: '辅助'
      },
      curPosition: '上单',
      aIndex: 0, // 每个位置可能会有多个选手，index用于切换, 默认第一个选手
      bIndex: 0
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
      const { data, curPosition, aIndex, bIndex } = this
      const { recentlyPlayerData: allData } = data

      const curData = allData[curPosition]
      const { teamA, teamB } = curData

      const curDataA = teamA[aIndex]
      const curDataB = teamB[bIndex]
      // 构造数据
      if (!curDataA || !curDataB) {
        return null
      }
      const aData = [
        curDataA.economicMinute.toFixed(2),
        curDataA.hitMinute.toFixed(2),
        curDataA.damageDealMinute.toFixed(2),
        curDataA.damageTakenMinute.toFixed(2)
      ]
      const bData = [
        curDataB.economicMinute.toFixed(2),
        curDataB.hitMinute.toFixed(2),
        curDataB.damageDealMinute.toFixed(2),
        curDataB.damageTakenMinute.toFixed(2)
      ]

      function getMax (a, b) {
        return Math.max(a, b) * 1.1
      }
      // 获取雷达图每个点的最大值
      const max = []
      new Array(4).fill(1).map((item, index) => {
        max[index] = getMax(aData[index], bData[index]) + Math.abs(aData[index] - bData[index])
      })

      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(this.$refs.radarChart)

      const option = {
        tooltip: {},
        grid: {
          top: '18%',
          bottom: '18%',
          left: '18%',
          right: '18%'
        },
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: '#999',
              fontSize: 12
            }
          },
          indicator: [
            { name: '每分钟\n经济', max: max[0] },
            { name: '每分钟\n补刀数', max: max[1] },
            { name: '每分钟\n输出', max: max[3] },
            { name: '每分钟\n承受伤害', max: max[4] }
          ],
          radius: 60
        },
        series: [{
          type: 'radar',
          data: [
            {
              value: aData,
              name: '蓝队',
              itemStyle: {
                opacity: 0
              },
              areaStyle: {
                color: 'RGBA(67, 171, 255, .6)'
              },
              lineStyle: {
                color: 'RGBA(67, 171, 255, 1)'
              }
            },
            {
              value: bData,
              name: '红队',
              itemStyle: {
                opacity: 0
              },
              areaStyle: {
                color: 'RGBA(255, 128, 114, .6)'
              },
              lineStyle: {
                color: 'RGBA(255, 128, 114, 1)'
              }
            }
          ]
        }]
      }
      myChart.clear()
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
    switchTab (val) {
      this.curPosition = this.posTypes[val]
      this.$nextTick(() => {
        this.initChart()
      })
    },
    switchPlayer (item, index, type) {
      this[`${type}Index`] = index
      this.$nextTick(() => {
        this.initChart()
      })
    }
  },
  render () {
    const { switchTab, tabs, data, curPosition, aIndex, bIndex, switchPlayer } = this
    const { recentlyPlayerData: allData } = data

    const curData = allData[curPosition]
    const { teamA, teamB } = curData

    const curDataA = teamA[aIndex]
    const curDataB = teamB[bIndex]

    const tab = (
      <CommonTab
        class="tabs"
        data={tabs}
        on-switchTab={switchTab}
      />
    )

    // 构造数据
    if (!curDataA || !curDataB) {
      return (
        <div class="player-box">
          {tab}
          <Nodata style="padding: 30px;"></Nodata>
        </div>
      )
    }

    const centerLineData = [
      {
        title: '出场次数',
        aData: curDataA.playCount,
        bData: curDataB.playCount
      },
      {
        title: 'K/D/A',
        aData: curDataA.kda.toFixed(2),
        bData: curDataB.kda.toFixed(2)
      },
      {
        title: '胜率',
        aData: (curDataA.winCount / curDataA.playCount * 100).toFixed(2) + '%',
        bData: (curDataB.winCount / curDataB.playCount * 100).toFixed(2) + '%'
      },
      {
        title: '场均杀敌数',
        aData: curDataA.killAverage.toFixed(2),
        bData: curDataB.killAverage.toFixed(2)
      },
      {
        title: '场均死亡数',
        aData: curDataA.deathAverage.toFixed(2),
        bData: curDataB.deathAverage.toFixed(2)
      },
      {
        title: '场均助攻数',
        aData: curDataA.assistAverage.toFixed(2),
        bData: curDataB.assistAverage.toFixed(2)
      }
    ]

    const itemCompare = (
      <div class="compare-box">
        <div class="left-info">
          <div class="thumb-img">
            {teamA.map((item, index) => {
              return (
                <img class="thumb-img"
                  src={item.avatar}
                  class={{ on: aIndex === index }}
                  onClick={switchPlayer.bind(this, item, index, 'a')}
                  alt="" />
              )
            })}
          </div>
          <div class="avatar">
            <p class="player-name">{curDataA.nickname}</p>
            <span class="country-logo">{curDataA.country}</span>
            <img class="player-avatar" src={curDataA.avatar} alt="" />
          </div>
        </div>
        <div class="list">
          {centerLineData.map((item) => {
            return (
              <div class="item">
                <span class="num left">{item.aData}</span>
                <span class="key">{item.title}</span>
                <span class="num right">{item.bData}</span>
              </div>
            )
          })}
        </div>
        <div class="right-info">
          <div class="thumb-img">
            {teamB.map((item, index) => {
              return (
                <img class="thumb-img"
                  src={item.avatar}
                  class={{ on: bIndex === index }}
                  onClick={switchPlayer.bind(this, item, index, 'b')}
                  alt="" />
              )
            })}
          </div>
          <div class="avatar">
            <p class="player-name">{curDataB.nickname}</p>
            <span class="country-logo">{curDataB.country}</span>
            <img class="player-avatar" src={curDataB.avatar} alt="" />
          </div>
        </div>
      </div>
    )

    // 转换成百分比
    function toPercent (val) {
      if (isNaN(val) || Number(val) === 0) { return 0 }
      return Number((val).toFixed(0))
    }

    const circleAData = [
      {
        title: '参团率',
        color: '#43ABFF',
        percent: curDataA.offeredRate
      },
      {
        title: '每分钟输出占比',
        color: '#43ABFF',
        percent: curDataA.damageDealRate
      },
      {
        title: '每分钟承受伤害占比',
        color: '#43ABFF',
        percent: curDataA.damageTakenRate
      }
    ]
    const circleBData = [
      {
        title: '参团率',
        color: '#FF8072',
        percent: curDataB.offeredRate
      },
      {
        title: '每分钟输出占比',
        color: '#FF8072',
        percent: curDataB.damageDealRate
      },
      {
        title: '每分钟承受伤害占比',
        color: '#FF8072',
        percent: curDataB.damageTakenRate
      }
    ]

    function circleItem (item) {
      return (
        <div class="item">
          <a-progress
            class="percent"
            width={50}
            strokeWidth={12}
            strokeColor={item.color}
            strokeLinecap="square"
            status="normal"
            percent={toPercent(item.percent)}
            type="circle" />
          <p class="times">{item.title}</p>
        </div>
      )
    }
    const compareChart = (
      <div class="charts">
        <div class="left-chart">
          {circleAData.map((item) => {
            return (
              circleItem(item)
            )
          })}
        </div>
        <div class="radar-chart">
          <div class="radar" ref="radarChart"></div>
        </div>
        <div class="right-chart">
          {circleBData.map((item) => {
            return (
              circleItem(item)
            )
          })}
        </div>
      </div>
    )

    const dom = (
      <div class="player-box">
        {tab}
        {itemCompare}
        {compareChart}
      </div>
    )

    return dom
  }
}
</script>

<style lang="less" scoped>
.tabs {
  width: 500px;
  margin: auto;
}
.compare-box {
  text-align: center;
  padding-top: 25px;
  white-space: nowrap;
  .left-info,
  .right-info {
    display: inline-block;
    vertical-align: top;
    overflow: hidden;
    position: relative;
    width: 300px;
    height: 180px;
    .thumb-img {
      position: absolute;
      top: 0;
      cursor: pointer;
      display: flex;
      img {
        width: 50px;
        height: 50px;
        border: solid 2px #f5f5f5;
        border-radius: 50%;
        margin: 0 4px;
        &.on {
          border-color: @primary-color;
        }
      }
    }
    .avatar {
      position: absolute;
      bottom: 0;
      width: 100%;
    }
    .player-name {
      font-size: 20px;
      color: #333;
      font-weight: 600;
      position: absolute;
      top: 28px;
    }
    .country-logo {
      width: 30px;
      height: 20px;
      position: absolute;
      top: 68px;
      font-size: 14px;
    }
    .player-avatar {
      width: 120px;
      height: 120px;
    }
  }
  .list {
    display: inline-block;
    vertical-align: top;
    margin: 0 40px;
    width: 210px;
    .item {
      font-size: 14px;
      margin-bottom: 20px;
      .num {
        &.left {
          color: #677eea;
          text-align: right;
        }
        &.right {
          color: #f04844;
          text-align: left;
        }
      }
      .key {
        color: #333;
        width: 100px;
        padding: 0 20px;
      }
    }
  }
  .left-info {
    .thumb-img {
      left: 40px;
    }
    .avatar {
      right: 0;
      text-align: right;
    }
    .player-name,
    .country-logo {
      right: 140px;
    }
  }
  .right-info {
    .thumb-img {
      right: 40px;
    }
    .avatar {
      left: 0;
      text-align: left;
    }
    .player-name,
    .country-logo {
      left: 140px;
    }
  }
}
.charts {
  text-align: center;
  margin-top: 40px;
  white-space: nowrap;
  .left-chart,
  .right-chart {
    display: inline-block;
    vertical-align: middle;
    .item {
      display: inline-block;
      text-align: center;
      margin: 0 12px;
      vertical-align: top;
    }
    .hreo-img {
      width: 34px;
      height: 34px;
      margin: auto;
      display: block;
    }
    .times {
      font-size: 12px;
      color: #333;
      padding: 8px 0 20px;
      width: 56px;
      white-space: normal;
    }
    .percent {
      width: 50px;
      height: 50px;
      margin: auto;
    }
  }
  .left-chart /deep/ .ant-progress-text {
    color: #677eea;
  }
  .right-chart /deep/ .ant-progress-text {
    color: #f04844;
  }
  .radar-chart {
    display: inline-block;
    vertical-align: middle;
    margin: 0 30px;
    .radar {
      width: 250px;
      height: 250px;
    }
  }
}
</style>
