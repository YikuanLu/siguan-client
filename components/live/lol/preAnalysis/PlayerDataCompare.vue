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
  name: 'LolPlayerDataCompare',
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      demoImg: require('@/static/img/game-types/demo.png'),
      tabs: GAME_ROLE_TAB_LIST,
      infoData: this.data.prospect_data,
      curRole: 'top',
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
      // this.initChart()
    })
  },
  methods: {
    initChart () {
      const { infoData, curRole, aIndex, bIndex } = this

      const curDataA = infoData[`team_a_${curRole}`][aIndex]
      const curDataB = infoData[`team_b_${curRole}`][bIndex]

      if (!curDataA || !curDataB) {
        return null
      }

      const aData = [
        curDataA.minute_economic,
        curDataA.kill_average,
        curDataA.minute_damage_dealt,
        curDataA.assist_average,
        curDataA.average_minions_killed
      ]
      const bData = [
        curDataB.minute_economic,
        curDataB.kill_average,
        curDataB.minute_damage_dealt,
        curDataB.assist_average,
        curDataB.average_minions_killed
      ]

      function getMax (a, b) {
        return Math.max(a, b)
      }
      // 获取雷达图每个点的最大值
      const max = []
      new Array(5).fill(1).map((item, index) => {
        max[index] = getMax(aData[index], bData[index]) + Math.abs(aData[index] - bData[index]) / 2
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
              fontSize: 14
            }
          },
          indicator: [
            { name: '经济', max: max[0] },
            { name: '击杀', max: max[1] },
            { name: '输出', max: max[2] },
            { name: '助攻', max: max[3] },
            { name: '补刀', max: max[4] }
          ],
          radius: 80
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
      Object.assign(this, {
        aIndex: 0,
        bIndex: 0
      })
      switch (val) {
        case 1:
          this.curRole = 'top'
          break
        case 2:
          this.curRole = 'jungle'
          break
        case 3:
          this.curRole = 'ap'
          break
        case 4:
          this.curRole = 'adc'
          break
        case 5:
          this.curRole = 'support'
          break
        default:
          this.curRole = 'top'
          break
      }
      // this.initChart()
    },
    switchPlayer (item, index, type) {
      this[`${type}Index`] = index
      // this.initChart()
    }
  },
  render () {
    const { switchTab, tabs, curRole, infoData, aIndex, bIndex, switchPlayer } = this

    const tab = (
      <CommonTab
        class="tabs"
        data={tabs}
        on-switchTab={switchTab}
      />
    )
    const curDataA = infoData[`team_a_${curRole}`][aIndex]
    const curDataB = infoData[`team_b_${curRole}`][bIndex]

    // 构造数据
    if (!curDataA || !curDataB) {
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
        title: '出场次数',
        aData: curDataA.present_matches,
        bData: curDataB.present_matches
      },
      {
        title: 'K/D/A',
        aData: curDataA.KDA.toFixed(2),
        bData: curDataB.KDA.toFixed(2)
      },
      {
        title: '胜率',
        aData: curDataA.victory_rate.toFixed(0) + '%',
        bData: curDataB.victory_rate.toFixed(0) + '%'
      },
      {
        title: '每分钟经济',
        aData: curDataA.minute_economic.toFixed(2),
        bData: curDataB.minute_economic.toFixed(2)
      },
      {
        title: '每分钟输出',
        aData: curDataA.minute_damage_dealt.toFixed(2),
        bData: curDataB.minute_damage_dealt.toFixed(2)
      },
      {
        title: '经济伤害转化率',
        aData: curDataA.damage_deal_percent.toFixed(0) + '%',
        bData: curDataB.damage_deal_percent.toFixed(0) + '%'
      }
    ]

    const itemCompare = (
      <div class="compare-box">
        <div class="left-info">
          <div class="thumb-img">
            {infoData[`team_a_${curRole}`].map((item, index) => {
              return <img src={item.player_avatar} class={{ on: aIndex === index }} onClick={switchPlayer.bind(this, item, index, 'a')} alt=""/>
            })}
          </div>
          <div class="avatar">
            <p class="player-name">{curDataA.nickname}</p>
            <span class="country-logo">{curDataA.player_country}</span>
            <img class="player-avatar" src={curDataA.player_avatar} alt=""/>
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
            {infoData[`team_b_${curRole}`].map((item, index) => {
              return <img src={item.player_avatar} class={{ on: bIndex === index }} onClick={switchPlayer.bind(this, item, index, 'b')} alt=""/>
            })}
          </div>
          <div class="avatar">
            <p class="player-name">{curDataB.nickname}</p>
            <span class="country-logo">{curDataB.player_country}</span>
            <img class="player-avatar" src={curDataB.player_avatar} alt=""/>
          </div>
        </div>
      </div>
    )

    const dom = (
      <div class="player-box">
        {tab}
        {itemCompare}
      </div>
    )

    return dom
  }
}
</script>

<style lang="less" scoped>
  .tabs{
    width: 500px;
    margin: auto;
  }
  .compare-box{
    text-align: center;
    padding-top: 25px;
    white-space: nowrap;
    .left-info, .right-info{
      display: inline-block;
      vertical-align: top;
      overflow: hidden;
      position: relative;
      width: 300px;
      height: 180px;
      .thumb-img{
        position: absolute;
        top: 0;
        cursor: pointer;
        display: flex;
        img{
          width: 50px;
          height: 50px;
          border: solid 2px #f5f5f5;
          border-radius: 50%;
          margin: 0 4px;
          &.on{
            border-color: @primary-color;
          }
        }
      }
      .avatar{
        position: absolute;
        bottom: 0;
        width: 100%;
      }
      .player-name{
        font-size: 20px;
        color: #333;
        font-weight: 600;
        position: absolute;
        top: 28px;
      }
      .country-logo{
        width: 30px;
        height: 20px;
        position: absolute;
        top: 68px;
        font-size: 14px;
      }
      .player-avatar{
        width: 120px;
        height: 120px;
      }
    }
    .list{
      display: inline-block;
      vertical-align: top;
      margin: 0 40px;
      width: 210px;
      .item{
        font-size: 14px;
        margin-bottom: 20px;
        .num{
          &.left{
            color: #677EEA;
            text-align: right;
          }
          &.right{
            color: #F04844;
            text-align: left;
          }
        }
        .key{
          color: #333;
          width: 100px;
          padding: 0 20px;
        }
      }
    }
    .left-info{
      .thumb-img{
        left: 40px;
      }
      .avatar{
        right: 0;
        text-align: right;
      }
      .player-name, .country-logo{
        right: 140px;
      }
    }
    .right-info{
      .thumb-img{
        right: 40px;
      }
      .avatar{
        left: 0;
        text-align: left;
      }
      .player-name, .country-logo{
        left: 140px;
      }
    }
  }
  .charts{
    text-align: center;
    margin-top: 40px;
    .left-chart, .right-chart{
      display: inline-block;
      vertical-align: middle;
      .item{
        display: inline-block;
        text-align: center;
        margin: 0 10px;
      }
      .hreo-img{
        width: 34px;
        height: 34px;
        margin: auto;
        display: block;
      }
      .times{
        font-size: 14px;
        color: #333;
        padding: 8px 0 20px;
      }
      .percent{
        width: 60px;
        height: 60px;
        margin: auto;
      }
    }
    .left-chart /deep/ .ant-progress-text{
      color: #677EEA;
    }
    .right-chart /deep/ .ant-progress-text{
      color: #F04844;
    }
    .radar-chart{
      display: inline-block;
      vertical-align: middle;
      margin: 0 40px;
      .radar{
        width: 250px;
        height: 250px;
      }
    }
  }
</style>
