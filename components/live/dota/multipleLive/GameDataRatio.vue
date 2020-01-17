<script>
/**
* 实时比分-详情-输出占比、承伤占比、经济占比差组件
* 用法
*/
import CommonTab from '~/components/live/CommonTab'
import { DOTA_GAME_RATIO_TAB_LIST } from '~/assets/js/types'
export default {
  name: 'DotaGameDataRatio',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      demoImg: require('@/static/img/game-types/demo.png'),
      tabs: DOTA_GAME_RATIO_TAB_LIST,
      curNames: { // 以字段名来切换数据，默认第一个
        1: 'gold',
        2: 'gold_per_min',
        3: 'xp_per_min'
      },
      curType: 1
    }
  },
  computed: {

  },
  created () {
    this.curType = this.curNames[1]
  },
  mounted () {

  },
  methods: {
    switchTab (val) {
      this.curType = this.curNames[val]
    },
    getMaxVal (data, name) {
      const nameArr = [] // 根据不同字段名获取最大值
      data.map((item, index) => {
        if (item) {
          nameArr.push(item[name])
        }
      })
      const maxVal = Math.max(...nameArr)
      return maxVal
    },
    sortByPosition (a, b) {
      // 按照对战位置排序
      if (a.position > b.position) {
        return 1
      } else {
        return -1
      }
    }
  },
  render () {
    const { switchTab, tabs, curType, getMaxVal, data } = this

    const {
      team_stats: teamStats, // 对局战队数据
      players: playerStats // 选手对局数据
    } = data

    const blueSideId = teamStats[0].team_id // 蓝队
    const redSideId = teamStats[1].team_id // 红队

    let blueArr = playerStats.filter(_ => _.team_id === blueSideId).sort(this.sortByPosition) // 蓝队选手
    let redArr = playerStats.filter(_ => _.team_id === redSideId).sort(this.sortByPosition) // 蓝队选手

    // 不足5个，补足
    function fillArr (arr) {
      const len = arr.length
      if (len < 5) {
        const emptyArr = new Array(5 - len).fill(false)
        return [...arr, ...emptyArr]
      }
      return arr
    }

    blueArr = fillArr(blueArr)
    redArr = fillArr(redArr)
    console.log(blueArr, redArr)

    const title = (
      <CommonTab
        data={tabs}
        on-switchTab={switchTab}
      />
    )

    const chart = (
      <div class="chart">
        <div class="left">
          {blueArr.map((item) => {
            return (
              item ? (
                <div class="item" title={item.hero_name}>
                  <img class="hero-img" src={item.hero_avatar} alt=""/>
                  <p class="num">{item[curType]}</p>
                  <a-progress class="percent"
                    showInfo={false}
                    strokeLinecap='square'
                    strokeColor="#677EEA"
                    strokeWidth={10}
                    percent={item[curType] ? item[curType] / getMaxVal(blueArr, curType) * 100 : 100}
                    status="active"/>
                </div>
              ) : (
                <div class="item" title={item.hero_name}>
                  <img src={require('@/assets/img/mrtp.png')} class="hero-img"></img>
                  <p class="num">0</p>
                  <a-progress class="percent"
                    showInfo={false}
                    strokeLinecap='square'
                    strokeColor="#677EEA"
                    strokeWidth={10}
                    percent={0}
                    status="active"/>
                </div>
              )
            )
          })}
        </div>
        <div class="right">
          {redArr.map((item) => {
            return (
              item ? (
                <div class="item" title={item.hero_name}>
                  <img class="hero-img" src={item.hero_avatar} alt=""/>
                  <p class="num">{item[curType]}</p>
                  <a-progress class="percent"
                    showInfo={false}
                    strokeLinecap='square'
                    strokeColor="#F04844"
                    strokeWidth={10}
                    percent={item[curType] ? item[curType] / getMaxVal(blueArr, curType) * 100 : 100}
                    status="active" />
                </div>
              ) : (
                <div class="item" title={item.hero_name}>
                  <img src={require('@/assets/img/mrtp.png')} class="hero-img"></img>
                  <p class="num">0</p>
                  <a-progress class="percent"
                    showInfo={false}
                    strokeLinecap='square'
                    strokeColor="#F04844"
                    strokeWidth={10}
                    percent={0}
                    status="active"/>
                </div>
              )
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
