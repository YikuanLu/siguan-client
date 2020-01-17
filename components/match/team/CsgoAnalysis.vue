<script>
import StatisticsExhibit from '~/components/match/team/StatisticsExhibit' // 战队统计数据展示(非列表)
export default {
  name: 'CsgoAnalysis',
  components: {
    StatisticsExhibit
  },
  props: {
    baseInfor: {
      type: Object,
      default: () => {
        return {}
      }
    },
    maps: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {}
  },
  render () {
    const { baseInfor, maps } = this
    console.log('maps', maps)
    const mapItem = maps.map((item) => {
      const total = item.draw + item.lost + item.win
      const winRent = Math.round((item.win / total).toFixed(2) * 100)
      return (
        <li class="item">
          <div
            class="mainContent"
            style={{
              backgroundImage: `url(${require(`~/static/img/csgo/${item.mapName}.png`)})`
            }}
          >
            <div class="progressBox">
              <a-progress
                class="percent"
                width={60}
                strokeWidth={24}
                strokeColor="#43ABFF"
                strokeLinecap="square"
                status="normal"
                percent={winRent}
                type="circle"
                format={(percent) => {
                  return <span>{item.win}</span>
                }}
              />
              <p>胜场</p>
            </div>
            <div class="progressBox">
              <a-progress
                class="percent"
                width={60}
                strokeWidth={24}
                strokeColor="#43ABFF"
                strokeLinecap="square"
                status="normal"
                percent={winRent}
                type="circle"
                format={(percent) => {
                  return <span>{winRent}</span>
                }}
              />
              <p>胜率</p>
            </div>
          </div>
          <div class="mapName">{item.mapName}</div>
        </li>
      )
    })

    const mapsView = (
      <div>
        <div class="title">战队地图 场数/胜率</div>
        <ul class="mapList clearfix">{mapItem}</ul>
      </div>
    )

    return (
      <div class="csgoAnalysis">
        <div class="title">战队综合统计</div>
        <StatisticsExhibit data={baseInfor} />
        {maps.length ? mapsView : null}
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
.title {
  padding: 20px;
  font-size: 16px;
  color: #333333;
}
.percent {
  background-color: #fff;
  border-radius: 50%;
}
.mapList {
  padding: 10px;
  .item {
    float: left;
    .mainContent {
      border-radius: 2px;
      width: 197px;
      height: 100px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 10px;
      background-position: 100% 100%;
      background-repeat: no-repeat;
      .progressBox {
        p {
          margin-top: 4px;
          text-align: center;
          font-size: 12px;
          color: #fff;
        }
      }
    }
    .mapName {
      padding: 10px;
      text-align: center;
      font-size: 16px;
      color: #333333;
    }
  }
}
</style>
