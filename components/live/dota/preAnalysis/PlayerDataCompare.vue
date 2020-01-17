<script>
/**
* 实时比分-详情-赛前分析-选手数据对比组件
* 用法
*/
import CommonTab from '~/components/live/CommonTab'
import { GAME_POSITION_TAB_LIST } from '~/assets/js/types'
let echarts
if (process.client) {
  echarts = require('echarts')
}
export default {
  name: 'DotaPlayerDataCompare',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      demoImg: require('@/static/img/game-types/demo.png'),
      tabs: GAME_POSITION_TAB_LIST,
      curPosition: 1
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
      const { data, curPosition } = this
      const {
        team_a_player_stat: { players: teamA },
        team_b_player_stat: { players: teamB }
      } = data

      if ((!teamA || !teamA.length) || (!teamB || !teamB.length)) {
        return null
      }

      const curPos = curPosition - 1

      const curDataA = teamA[curPos]
      const curDataB = teamB[curPos]
      const aData = [
        curDataA.farm_score.toFixed(2),
        curDataA.fight_rate_score.toFixed(2),
        curDataA.push_score.toFixed(2),
        curDataA.survival_score.toFixed(2),
        curDataA.damage_score.toFixed(2),
        curDataA.initiate_times.toFixed(2)
      ]
      const bData = [
        curDataB.farm_score.toFixed(2),
        curDataB.fight_rate_score.toFixed(2),
        curDataB.push_score.toFixed(2),
        curDataB.survival_score.toFixed(2),
        curDataB.damage_score.toFixed(2),
        curDataB.initiate_times.toFixed(2)
      ]

      function getMax (a, b) {
        return Math.max(a, b) * 1.1
      }
      // 获取雷达图每个点的最大值
      const max = []
      new Array(6).fill(1).map((item, index) => {
        max[index] = getMax(aData[index], bData[index]) + Math.abs(aData[index] - bData[index])
      })

      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(this.$refs.radarChart)

      const option = {
        tooltip: {},
        radar: {
        // shape: 'circle',
          name: {
            textStyle: {
              color: '#999',
              fontSize: 10
            }
          },
          indicator: [
            { name: '发育得分', max: max[0] },
            { name: '参战得分', max: max[1] },
            { name: '推进得分', max: max[2] },
            { name: '生存得分', max: max[3] },
            { name: '输出得分', max: max[4] },
            { name: '先手次数', max: max[5] }
          ],
          radius: 70
        },
        series: [{
          type: 'radar',
          data: [
            {
              value: aData,
              name: '天辉',
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
              name: '夜魇',
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
      this.curPosition = val
      this.initChart()
    }
  },
  render () {
    const { switchTab, tabs, data, curPosition } = this
    const {
      team_a_player_stat: { players: teamA },
      team_b_player_stat: { players: teamB }
    } = data
    if ((!teamA || !teamA.length) || (!teamB || !teamB.length)) {
      return <Nodata style="padding: 30px;"></Nodata>
    }

    const curPos = curPosition - 1

    const tab = (
      <CommonTab
        class="tabs"
        data={tabs}
        on-switchTab={switchTab}
      />
    )

    // 构造数据
    if (!teamA[curPos] || !teamB[curPos]) {
      return (
        <div class="player-box">
          {tab}
          <Nodata style="padding: 30px;"></Nodata>
        </div>
      )
    }

    // 构造数据
    const centerLineData = [
      {
        title: 'K/D/A',
        aData: teamA[curPos].kda_score.toFixed(2),
        bData: teamB[curPos].kda_score.toFixed(2)
      },
      {
        title: '参战率',
        aData: toPercent(teamA[curPos].in_battle_ratio) + '%',
        bData: toPercent(teamB[curPos].in_battle_ratio) + '%'
      },
      {
        title: '平均助攻',
        aData: teamA[curPos].assists.toFixed(2),
        bData: teamB[curPos].assists.toFixed(2)
      },
      {
        title: '平均击杀',
        aData: teamA[curPos].kills.toFixed(2),
        bData: teamB[curPos].kills.toFixed(2)
      },
      {
        title: '平均阵亡',
        aData: teamA[curPos].deaths.toFixed(2),
        bData: teamB[curPos].deaths.toFixed(2)
      },
      {
        title: '经济伤害转化率',
        aData: toPercent(teamA[curPos].damage_gold_ratio) + '%',
        bData: toPercent(teamB[curPos].damage_gold_ratio) + '%'
      }
    ]

    const itemCompare = (
      <div class="compare-box">
        <div class="left-info">
          <img class="thumb-img" src={teamA[curPos].player_logo} alt="" />
          <div class="avatar">
            <p class="player-name">{teamA[curPos].player_name}</p>
            <img class="player-avatar" src={teamA[curPos].player_logo} alt="" />
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
          <img class="thumb-img" src={teamB[curPos].player_logo} alt="" />
          <div class="avatar">
            <p class="player-name">{teamB[curPos].player_name}</p>
            <img class="player-avatar" src={teamB[curPos].player_logo} alt="" />
          </div>
        </div>
      </div>
    )

    // 转换成百分比
    function toPercent (val) {
      return Number((val * 100).toFixed(0))
    }

    const circleAData = [
      {
        title: '团队经济占比',
        color: '#43ABFF',
        percent: teamA[curPos].gold_in_team_percent
      },
      {
        title: '团战承伤占比',
        color: '#43ABFF',
        percent: teamA[curPos].team_fight_damage_received_percent
      },
      {
        title: '补刀经济占比',
        color: '#43ABFF',
        percent: teamA[curPos].last_hits_gold_percent
      }
    ]
    const circleBData = [
      {
        title: '团队经济占比',
        color: '#FF8072',
        percent: teamB[curPos].gold_in_team_percent
      },
      {
        title: '团战承伤占比',
        color: '#FF8072',
        percent: teamB[curPos].team_fight_damage_received_percent
      },
      {
        title: '补刀经济占比',
        color: '#FF8072',
        percent: teamB[curPos].last_hits_gold_percent
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
  .left-info,
  .right-info {
    display: inline-block;
    vertical-align: top;
    overflow: hidden;
    position: relative;
    width: 300px;
    height: 180px;
    .thumb-img {
      width: 50px;
      height: 50px;
      border: solid 2px #f5f5f5;
      border-radius: 50%;
      position: absolute;
      top: 0;
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
    }
    .player-avatar {
      width: 120px;
      height: 120px;
    }
  }
  .list {
    display: inline-block;
    vertical-align: top;
    margin: 30px 40px 0;
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
      right: 220px;
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
      left: 220px;
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
