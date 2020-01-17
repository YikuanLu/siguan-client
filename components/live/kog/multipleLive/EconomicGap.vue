<script>
/**
* 实时比分-详情-经济曲线差组件
* 用法
*/
import CommonTab from '~/components/live/CommonTab'
import { GAME_RATIO_TAB_LIST } from '~/assets/js/types'
export default {
  name: 'KogEconomicGap',
  props: {
    battleData: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      tabs: GAME_RATIO_TAB_LIST.slice(2, 3),
      curType: 'money_count'
    }
  },
  computed: {

  },
  created () {

  },
  mounted () {

  },
  methods: {
  },
  render () {
    const {
      tabs,
      battleData: {
        player_stats_a: teamA,
        player_stats_b: teamB
      },
      curType
    } = this

    const title = (
      <CommonTab
        data={tabs}
      />
    )

    if (!teamA || !teamA.length || !teamB || !teamB.length) {
      return (
        <div class="charts">
          {title}
          <Nodata style="padding: 30px;"></Nodata>
        </div>
      )
    }
    function getMaxVal (data, name) {
      const nameArr = [] // 根据不同字段名获取最大值
      data.map((item, index) => {
        nameArr.push(item[name])
      })
      const maxVal = Math.max(...nameArr)
      return maxVal
    }

    const chart = (
      <div class="chart">
        <div class="left">
          {teamA.map((item) => {
            return (
              <div class="item" title={item.hero_name}>
                <img class="hero-img" src={item.hero_avatar} alt=""/>
                <p class="num">{item[curType]}</p>
                <a-progress class="percent"
                  showInfo={false}
                  strokeLinecap='square'
                  strokeColor="#677EEA"
                  strokeWidth={10}
                  percent={item[curType] ? item[curType] / getMaxVal(teamA, curType) * 100 : 100}
                  status="active"/>
              </div>
            )
          })}
        </div>
        <div class="right">
          {teamB.map((item) => {
            return (
              <div class="item" title={item.hero_name}>
                <img class="hero-img" src={item.hero_avatar} alt=""/>
                <p class="num">{item[curType]}</p>
                <a-progress class="percent"
                  showInfo={false}
                  strokeLinecap='square'
                  strokeColor="#F04844"
                  strokeWidth={10}
                  percent={item[curType] ? item[curType] / getMaxVal(teamA, curType) * 100 : 100}
                  status="active" />
              </div>
            )
          })}
        </div>
      </div>
    )
    const dom = (
      <div class="data-ratio">
        {title}
        {chart}
      </div>
    )

    return dom
  }
}
</script>

<style lang="less" scoped>
  .data-ratio{
    width: 415px;
    height: 340px;
    overflow: hidden;
    .chart{
      padding: 20px 20px 0;
      border: solid 1px #f5f5f5;
      overflow: hidden;
    }
    .left, .right{
      .item{
        white-space: nowrap;
        margin-bottom: 20px;
        .hero-img{
          width: 34px;
          height: 34px;
        }
        .num{
          font-size: 14px;
          color: #333;
        }
        .percent{
          width: 140px;
          height: 10px;
          margin-top: 10px;
          font-size: 0;
          display: block;
        }
      }
    }
    .left{
      float: left;
      .hero-img{
        float: left;
        margin-right: 10px;
      }
    }
    .right{
      float: right;
      .hero-img{
        float: right;
        margin-left: 10px;
      }
      .percent{
        transform: rotate(180deg) translateX(43px);
      }
      .num{
        text-align: right;
      }
    }
     /deep/ .ant-progress-inner{
      background: transparent;
      .ant-progress-bg{
        height: 10px;
      }
    }
  }
</style>
