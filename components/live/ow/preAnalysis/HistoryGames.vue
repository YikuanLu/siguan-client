<script>
/**
* 实时比分-详情-赛前分析-历史对战组件
* 用法
*/
import { openMatchTeamUrl, openMatchLeagueUrl } from '@/assets/js/config'
import { formatTime } from '@/assets/js/publicFn'
export default {
  name: 'OwHistoryGames',
  props: {
    teams: {
      type: Object,
      default: () => {}
    },
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
    const { teams, data } = this
    if (!data) { return <Nodata style="padding: 30px;"></Nodata> }
    const allData = data.recent_matches

    const title = (
      <div class="history-title">
        <div class="team">
          <span class="team-name"
            onClick={ () => {
              openMatchTeamUrl(this, { gameType: 'ow', id: teams.teamAId })
            }}
          >{teams.teamAShortName}</span>
          <img class="team-logo" src={teams.teamALogo} alt=""/>
        </div>
        <span class="win-times blue">{data.recentMatches_a_win}胜</span>
        <span class="vs">vs</span>
        <span class="win-times red">{data.recentMatches_b_win}胜</span>
        <div class="team">
          <img class="team-logo" src={teams.teamBLogo} alt=""/>
          <span class="team-name"
            onClick={ () => {
              openMatchTeamUrl(this, { gameType: 'ow', id: teams.teamBId })
            }}
          >{teams.teamBShortName}</span>
        </div>
      </div>
    )

    const table = (
      <table>
        <tbody>
          {allData.map((item) => {
            return (
              <tr>
                <td width="8%">
                  <GameTypeIcon class="game-icon" type="ow"/>
                </td>
                <td width="20%" align="left" title={item.leagueName}>
                  <span class="game-name"
                    onClick={ () => {
                      openMatchLeagueUrl(this, { gameType: 'ow', id: item.leagueId })
                    }}
                  >{item.leagueName}</span>
                  <span class="game-now">B0{item.bo}</span>
                </td>
                <td>
                  <p class="two-rows">{formatTime(item.matchTime, 'Y-M-D')} </p>
                  <p class="two-rows primary-color">{formatTime(item.matchTime, 'h:m:s')}</p>
                </td>
                <td><span class="team-name-short">{item.teamAShortName}</span></td>
                <td>
                  <img class="gameteam-logo" src={item.teamALogo} alt=""/>
                </td>
                <td class="color-999">
                  <p class="game-score win">{item.teamAScore}</p>
                  <i class="seprator">:</i>
                  <p class="game-score">{item.teamBScore}</p>
                </td>
                <td>
                  <img class="gameteam-logo" src={item.teamBLogo} alt=""/>
                </td>
                <td><span class="team-name-short">{item.teamBShortName}</span></td>
                <td>
                  <a-button class="game-link">
                    <nuxt-link to={`/live/ow/${item.matchId}?tab=4`} target="_blank">数据</nuxt-link>
                  </a-button>
                  <a-button class="game-link">
                    <nuxt-link to={`/live/ow/${item.matchId}?tab=2`} target="_blank">指数</nuxt-link>
                  </a-button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
    const dom = (
      allData && allData.length
        ? (
          <div class="player-box">
            {title}
            {table}
          </div>
        ) : <Nodata style="padding: 30px;"></Nodata>
    )

    return dom
  }
}
</script>

<style lang="less" scoped>
  .player-box{
    border: solid 1px #f5f5f5;
    .history-title{
      text-align: center;
      height: 60px;
      line-height: 60px;
      .team{
        display: inline-block;
        cursor: pointer;
        &:hover{
          .team-name{
            color: @primary-color;
          }
        }
        .team-name{
          font-size: 14px;
          color: #333;
          font-weight: 600;
          padding: 0 10px;
        }
        .team-logo{
          // width: 16px;
          height: 20px;
        }
      }
      .win-times{
        display: inline-block;
        font-weight: 600;
        font-size: 16px;
        &.blue{
          color: #677EEA;
          margin-left: 18px;
        }
        &.red{
          color: #F04844;
          margin-right: 18px;
        }
      }
      .vs{
        display: inline-block;
        font-size: 16px;
        color: #999;
        margin: 0 20px;
      }
    }
    table{
      width: 100%;
      background: #fff;
      tbody tr{
        transition: all .3s;
        border-top: solid 1px #f5f5f5;
        &:hover{
          -moz-box-shadow: 0 0 6px 2px #EBEBEB;
          -webkit-box-shadow: 0 0 6px 2px #EBEBEB;
          box-shadow: 0 0 6px 2px #EBEBEB;
        }
      }
      td{
        padding: 4px 0;
        text-align: center;
        vertical-align: middle;
        font-size: 14px;
        color: #333333;
        height: 60px;
        white-space: nowrap;
        .text{
          padding: 5px 0;
        }
        &.color-999{
          color: #999;
        }
        &[align="left"]{
          text-align: left;
        }
      }
      .two-rows{
        display: inline-block;
        padding: 0 5px;
      }
      .game-icon{
        font-size: 20px;
      }
      .gameteam-logo{
        width: 16px;
        // height: 20px;
        display: block;
        margin: 12px auto;
      }
      .game-score{
        background:rgba(245,245,245,1);
        color: #333;
        border-radius: 4px;
        font-size: 14px;
        text-align: center;
        width: 24px;
        height: 24px;
        line-height: 24px;
        display: block;
        margin: 10px auto;
        display: inline-block;
      }
      .game-name{
        font-size:14px;
        color:rgba(33,33,33,1);
        display: inline-block;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        vertical-align: bottom;
        width: 120px;cursor: pointer;
        &:hover{
          color: @primary-color;
        }
      }
      .game-now{
        vertical-align: middle;
      }
      .game-link{
        margin: 4px;
        padding: 0 8px;
      }
      .seprator{
        padding: 0 4px;
        font-style: normal;
        font-weight: 900;
      }
    }
  }
</style>
