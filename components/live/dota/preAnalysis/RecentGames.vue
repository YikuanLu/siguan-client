<script>
/**
* 实时比分-详情-赛前分析-近期赛事组件
* 用法
*/
import { openMatchTeamUrl } from '@/assets/js/config'
import { formatTime } from '@/assets/js/publicFn'
export default {
  name: 'DotaRecentGames',
  props: {
    data: {
      type: Object,
      default: () => {}
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

  },
  methods: {

  },
  render () {
    const {
      team_a_recent_matches: aData,
      team_b_recent_matches: bData
    } = this.data

    // 是否胜利
    const isWin = (valA, valB) => {
      if (valA === valB) {
        return <span class="result">平</span>
      }
      if (valA > valB) {
        return <span class="result win">胜</span>
      } else {
        return <span class="result">负</span>
      }
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
            <td colspan="4">
              <Nodata style="padding: 30px;"></Nodata>
            </td>
          </tbody>
        )
      }
    }

    // 循环渲染数据
    const drawData = (data) => {
      return (
        data.map((item) => {
          return (
            <tr>
              <td>
                {isWin(item.team_a_score, item.team_b_score)}
              </td>
              <td>
                <span class="score win">{item.team_a_score}</span>
                :
                <span class="score">{item.team_b_score}</span>
              </td>
              <td>
                <img class="team-logo" src={item.team_b_logo} alt=""/>
                <span class="team-name team-name-short"
                  title={item.team_b_name}
                  onClick={ () => {
                    openMatchTeamUrl(this, { gameType: 'dota', id: item.team_b_id })
                  }}
                >{item.team_b_name}</span>
              </td>
              <td>
                <span class="time">{formatTime(item.match_time, 'Y-M-D')}</span>
              </td>
            </tr>
          )
        })
      )
    }

    const blueData = (
      <div class="game-data blue">
        <client-only>
          <table class="data-table">
            <thead>
              <th>结果</th>
              <th>比分</th>
              <th>对手</th>
              <th>比赛时间</th>
            </thead>
            {isEmpty(aData)}
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
                <th>结果</th>
                <th>比分</th>
                <th>对手</th>
                <th>比赛时间</th>
              </tr>
            </thead>
            {isEmpty(bData)}
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
    white-space: nowrap;
    .game-data{
      display: inline-block;
      vertical-align: top;
      margin: 0 10px;
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
      width: 415px;
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
          -moz-box-shadow: 0 0 6px 2px #EBEBEB;
          -webkit-box-shadow: 0 0 6px 2px #EBEBEB;
          box-shadow: 0 0 6px 2px #EBEBEB;
        }
      }
      td{
        height: 60px;
        vertical-align: middle;
        text-align: center;
        .result{
          font-size: 16px;
          font-weight: 900;
          color: #999;
          &.win{
            color: @primary-color;
          }
        }
        .score{
          font-size: 14px;
          color: #999;
          padding: 0 3px;
          &.win{
            color: #333;
          }
        }
        .team-logo{
          height: 20px;
          margin-right: 10px;
        }
        .team-name{
          font-size: 14px;
          color: #333;
          cursor: pointer;
          &:hover{
            color: @primary-color;
          }
        }
        .time{
          font-size: 14px;
          color: #333;
        }
      }
    }
  }
</style>
