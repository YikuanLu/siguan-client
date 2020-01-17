<script>
/**
* 实时比分-详情-赛前分析-地图胜率组件
* 用法
*/
export default {
  name: 'CsgoTeamDataCompare',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {

    }
  },
  computed: {

  },
  created () {

  },
  mounted () {

  },
  methods: {
    getMap (name = 'Cache') {
      return require(`~/static/img/csgo/${name}.png`)
    }
  },
  render () {
    const {
      data,
      getMap
    } = this
    const {
      map_stats: mapData,
      team_a: teamA,
      team_b: teamB
    } = data

    function calcRate (win, lose, draw) {
      const all = win + lose + draw
      if (all === 0) { return '0%' }
      const rate = (win / all * 100).toFixed(0)
      return rate + '%'
    }
    const mapItem = (item) => {
      return (
        <div class="map-item">
          <img class="map-img" src={getMap(item.map_name)} alt=""/>
          <p class="map-name">{item.map_name}</p>
          <div class="teams">
            <p class="team">
              <span class="team-name" title={teamA.name}>{teamA.name}</span>
              <span class="win-rate">
                {item.team_a_win}/
                {item.team_a_lost}/
                {item.team_a_draw}/
                {calcRate(item.team_a_win, item.team_a_lost, item.team_a_draw)}
              </span>
            </p>
            <p class="team">
              <span class="team-name" title={teamB.name}>{teamB.name}</span>
              <span class="win-rate">
                {item.team_b_win}/
                {item.team_b_lost}/
                {item.team_b_draw}/
                {calcRate(item.team_b_win, item.team_b_lost, item.team_b_draw)}
              </span>
            </p>
          </div>
        </div>
      )
    }

    // 判断是否有数据
    const isEmpty = (data = []) => {
      if (data && data.length) {
        return (
          data.map((item) => {
            return mapItem(item)
          })
        )
      } else {
        return (
          <Nodata style="padding: 30px;"></Nodata>
        )
      }
    }

    const dom = (
      <div class="player-box">
        {isEmpty(mapData)}
      </div>
    )

    return dom
  }
}
</script>

<style lang="less" scoped>
  .player-box{
    overflow: hidden;
    padding: 0 20px;
  }
  .map-item{
    position: relative;
    border: solid 1px #f5f5f5;
    width: 197px;
    overflow: hidden;
    float: left;
    margin: 0 20px 20px 0;
    border-radius: 4px 4px 0 0;
    &:nth-child(4n+4) {
      margin-right: 0;
    }
    .map-img{
      filter: brightness(0.7);
      height: 100px;
      width: 100%;
    }
    .map-name{
      font-size: 20px;
      color: #fff;
      width: 100%;
      height: 40px;
      line-height: 40px;
      background:rgba(51,153,238, 0.5);
      text-align: center;
      position: absolute;
      top: 30px;
    }
    .teams{
      padding: 12px;
    }
    .team{
      font-size: 14px;
      color: #333;
      overflow: hidden;
      padding: 7px 0;
      .team-name{
        font-weight: 600;
        float: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 80px;
        line-height: 18px;
      }
      .win-rate{
        float: right;
        line-height: 18px;
      }
    }
  }
</style>
