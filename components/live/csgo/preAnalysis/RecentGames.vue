<script>
/**
* 实时比分-详情-赛前分析-近期赛事组件
* 用法
*/
import { openMatchTeamUrl } from '@/assets/js/config'
import { formatTime } from '@/assets/js/publicFn'
export default {
  name: 'CsgoRecentGames',
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
      past_matches: {
        team_a_past_matches: {
          match_results: teamAData
        },
        team_b_past_matches: {
          match_results: teamBData
        }
      },
      team_a: teamA,
      team_b: teamB
    } = this.data

    const drawData = (data) => {
      return (
        data.map((item) => {
          return (
            <tr>
              <td>
                <span class={['score', { 'win': item.team_score > item.other_team_score }]}>{item.team_score}</span>
                :
                <span class={['score', { 'win': item.team_score < item.other_team_score }]}>{item.other_team_score}</span>
              </td>
              <td>
                <img class="team-logo" src={item.other_team_logo} alt=""/>
                <span class="team-name team-name-short"
                  title={item.other_team_name}
                  onClick={ () => {
                    openMatchTeamUrl(this, { gameType: 'csgo', id: item.other_team_id })
                  }}
                >{item.other_team_name}</span>
              </td>
              <td>
                <span class="result">{item.match_type}</span>
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
        <div class="title-box">
          <div class="left">
            <img class="team-logo" src={teamA.logo} alt=""/>
            <span class="team-name team-name-short"
              onClick={ () => {
                openMatchTeamUrl(this, { gameType: 'csgo', id: teamA.teamId })
              }}
            >{teamA.name}</span>
          </div>
          <div class="right">世界排名：{teamA.worldRank || '-'} &nbsp; 评分：{teamA.rating || '-'}</div>
        </div>
        <client-only>
          <table class="data-table">
            <thead>
              <tr>
                <th>比分</th>
                <th>对手</th>
                <th>局数/地图</th>
                <th>比赛日期</th>
              </tr>
            </thead>
            <tbody>
              {drawData(teamAData)}
            </tbody>
          </table>
        </client-only>
      </div>
    )

    const redData = (
      <div class="game-data red">
        <div class="title-box">
          <div class="left">
            <img class="team-logo" src={teamB.logo} alt=""/>
            <span class="team-name"
              onClick={ () => {
                openMatchTeamUrl(this, { gameType: 'csgo', id: teamB.teamId })
              }}
            >{teamB.name}</span>
          </div>
          <div class="right">世界排名：{teamB.worldRank || '-'} &nbsp; 评分：{teamA.rating || '-'}</div>
        </div>
        <client-only>
          <table class="data-table">
            <thead>
              <tr>
                <th>比分</th>
                <th>对手</th>
                <th>局数/地图</th>
                <th>比赛日期</th>
              </tr>
            </thead>
            <tbody>
              {drawData(teamBData)}
            </tbody>
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
          box-shadow: 0 0 6px 2px #EBEBEB;
        }
      }
      td{
        height: 60px;
        vertical-align: middle;
        text-align: center;
        font-size: 14px;
        color: #333;
        .score{
          color: #999;
          padding: 0 3px;
          font-weight: 600;
          &.win{
            color: #333;
          }
        }
        .team-logo{
          width: 15px;
          height: 20px;
          margin-right: 10px;
        }
        .team-name{
          cursor: pointer;
          &:hover{
            color: @primary-color;
          }
        }
      }
    }
    .title-box{
      overflow: hidden;
      font-size: 16px;
      color: #333;
      padding: 10px 0;
      .left{
        float: left;
        .team-logo{
          width: 40px;
          height: 40px;
          margin-right: 10px;
        }
        .team-name{
          font-weight: 600;
          cursor: pointer;
          &:hover{
            color: @primary-color;
          }
        }
      }
      .right{
        float: right;
        padding: 12px 0;
      }
    }
  }
</style>
