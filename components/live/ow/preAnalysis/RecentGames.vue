<script>
/**
* 实时比分-详情-赛前分析-近期战绩组件
* 用法
*/
import { formatTime } from '@/assets/js/publicFn'
import { openMatchTeamUrl } from '@/assets/js/config'
export default {
  name: 'OwRecentGames',
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
    const { data } = this

    // 是否胜利
    const isWin = (val) => {
      if (val === 0) {
        return <span class="result win">胜</span>
      } else {
        return <span class="result">负</span>
      }
    }

    // 循环渲染数据
    const drawData = (data) => {
      return (
        data.map((item) => {
          console.log(item)
          return (
            <tr>
              <td>
                {isWin(item.result)}
              </td>
              <td>
                <span class="score win">{item.score}</span>
              </td>
              <td>
                <img class="team-logo" src={item.teamLogo} alt=""/>
                <span class="team-name team-name-short"
                  title={item.teamName}
                  onClick={ () => {
                    openMatchTeamUrl(this, { gameType: 'ow', id: item.teamId })
                  }}
                >{item.teamName}</span>
              </td>
              <td>
                <span class="time">{formatTime(item.matchTime, 'Y-M-D')}</span>
              </td>
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
            <td colspan="4">
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
              <th>结果</th>
              <th>比分</th>
              <th>对手</th>
              <th>比赛时间</th>
            </thead>
            {isEmpty(data.team_a_matches)}
          </table>
        </client-only>
      </div>
    )

    const redData = (
      <div class="game-data red">
        <client-only>
          <table class="data-table">
            <thead>
              <th>结果</th>
              <th>比分</th>
              <th>对手</th>
              <th>比赛时间</th>
            </thead>
            {isEmpty(data.team_b_matches)}
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
