<script>
/**
* 实时比分-详情-赛前分析-选手数据对比组件
* 用法
*/
export default {
  name: 'CsgoPlayerDataCompare',
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

  },
  render () {
    const {
      lineup
    } = this.data
    if (!lineup) {
      return <Nodata style="padding: 30px;"></Nodata>
    }
    const {
      team_players: {
        team_a_player_stats: teamA,
        team_b_player_stats: teamB
      }
    } = lineup

    function drawData (data) {
      return (
        data.map((item) => {
          return (
            <tr>
              <td>{item.nickname}</td>
              <td>{item.dpr.toFixed(2)}</td>
              <td>{item.kast.toFixed(2)}</td>
              <td>{item.impact.toFixed(2)}</td>
              <td>{item.adr.toFixed(2)}</td>
              <td>{item.kpr.toFixed(2)}</td>
            </tr>
          )
        })
      )
    }

    // 判断是否有数据
    const isEmpty = (data) => {
      if (data && data.length) {
        return (
          <tbody>
            {drawData(data)}
          </tbody>
        )
      } else {
        return (
          <tbody>
            <td colspan="6">
              <Nodata style="padding: 30px;"></Nodata>
            </td>
          </tbody>
        )
      }
    }

    const blueData = (
      <div class="game-data blue">
        <client-only>
          <table class="data-table">
            <thead>
              <th>选手</th>
              <th>每回合击杀</th>
              <th>每回合死亡</th>
              <th>KAST</th>
              <th>每回合平均伤害</th>
              <th>技术评分</th>
            </thead>
            {isEmpty(teamA)}
          </table>
        </client-only>
      </div>
    )

    const redData = (
      <div class="game-data red">
        <client-only>
          <table class="data-table">
            <thead>
              <tr>
                <th>选手</th>
                <th>每回合击杀</th>
                <th>每回合死亡</th>
                <th>KAST</th>
                <th>每回合平均伤害</th>
                <th>技术评分</th>
              </tr>
            </thead>
            {isEmpty(teamB)}
          </table>
        </client-only>
      </div>
    )
    const dom = (
      <div class="player-box">
        {blueData}
        {redData}
      </div>
    )

    return dom
  }
}
</script>

<style lang="less" scoped>
  .player-box{
    padding: 0 10px;
    .game-data{
      width: 100%;
      margin: 0 10px;
      margin-bottom: 20px;
      &.blue{
        table th{
          background: #677EEA;
        }
      }
      &.red{
        table th{
          background: #F04844;
        }
      }
    }
    .data-table{
      width: 100%;
      border: solid 1px #f5f5f5;
      th{
        height: 50px;
        vertical-align: middle;
        color: #fff;
        font-size: 16px;
        text-align: center;
      }
      tr{
        border-bottom: solid 1px #f5f5f5;
        transition: all .3s;
        &:hover{
          box-shadow: 0 0 6px 2px #EBEBEB;
        }
      }
      td{
        height: 60px;
        vertical-align: middle;
        text-align: center;
        color: #333;
        font-size: 14px;
      }
    }
  }
</style>
