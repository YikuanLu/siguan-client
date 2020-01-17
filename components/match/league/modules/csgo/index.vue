<script>
import SuperSlide from '~/components/common/SuperSlide'
import TabList from '~/components/common/TabList' // Tab切换组件
import MatchItem from '~/components/match/league/MatchItem'
import TeamItem from '~/components/match/team/TeamItem'
import NoData from '~/components/common/Nodata'
import PubTable from '~/components/common/PubTable'
import TeamBattle from '~/components/match/scopedComponents/TeamBattle'
import getDataByGameType from '~/api/getDataByGameType'
import { headerStyle, formmatTimeParams } from '~/assets/js/config'
import { formatTime } from '~/assets/js/publicFn'
export default {
  name: 'LeagueCsgo',
  components: {
    SuperSlide,
    TabList,
    MatchItem,
    TeamItem,
    NoData,
    PubTable,
    TeamBattle
  },
  data () {
    return {
      gameType: 'csgo',
      apiByGameType: {}, // 根据不同的GameType获取api方法
      weekLeagueList: [],
      teamList: [],

      columns: [
        {
          title: '时间',
          align: 'center',
          customHeaderCell: headerStyle,
          customRender: (text, record) => (
            <span>{formatTime(record.matchTime, formmatTimeParams)}</span>
          ),
          width: 300
        },
        {
          title: '赛制',
          align: 'center',
          customHeaderCell: headerStyle,
          customRender: (text, record) => <span>BO{record.bo}</span>,
          width: 300
        },
        {
          title: '战队vs战队',
          align: 'center',
          dataIndex: 'teamName',
          customRender: (text, record) => <TeamBattle record={record || {}} />,
          customHeaderCell: headerStyle,
          width: 300
        }
      ],
      matches: [],
      stageGroupIndex: 0,
      stageMatchTeamList: []
    }
  },
  mounted () {
    this.apiByGameType = getDataByGameType(this.gameType)(this.$axios)
    this.leagueId = this.$route.params.id
    this.getListThisWeekByLeagueId()
    this.getTeamList()
    this.getStageMatchTeam()
  },
  methods: {
    // 获取本周赛程
    getListThisWeekByLeagueId () {
      const params = {
        leagueId: this.leagueId
      }
      this.apiByGameType.league.listThisWeekByLeagueId(params).then((res) => {
        this.weekLeagueList = res
      })
    },
    // 获取本周赛程
    getTeamList () {
      const params = {
        leagueId: this.leagueId
      }
      this.apiByGameType.league.teamList(params).then((res) => {
        this.teamList = res
      })
    },
    /*
    // 联赛按阶段分组赛事列表与积分排行榜
    getStageMatchTeam () {
      const params = {
        leagueId: this.leagueId
      }
      this.apiByGameType.league.stageMatchTeam(params).then((res) => {
        for (const item of res) {
          item.name = item.stage
        }
        this.stageMatchTeamList = res
        this.matches = this.stageMatchTeamList[this.stageGroupIndex].matches
      })
    } */
    getStageMatchTeam () {
      this.apiByGameType.league
        .matchList({ leagueId: this.leagueId })
        .then((res) => {
          console.log(res)
          this.stageMatchTeamList = res
        })
    }
  },
  render () {
    const {
      weekLeagueList,
      teamList,
      stageMatchTeamList,
      columns
    } = this

    return (
      <div class="leagueCsgo content">
        <div class="slideList">
          <SuperSlide
            title="本周赛程"
            data={weekLeagueList}
            options={{ vis: 3, scroll: 3 }}
            {...{
              scopedSlots: {
                default: (props) => {
                  return <MatchItem data={props.data} />
                }
              }
            }}
          ></SuperSlide>
        </div>

        <div class="slideList">
          <SuperSlide
            title="参赛战队"
            data={teamList}
            options={{ vis: 7, scroll: 7 }}
            {...{
              scopedSlots: {
                default: (props) => {
                  return <TeamItem data={props.data} gameType={this.gameType} />
                }
              }
            }}
          ></SuperSlide>
        </div>

        <div class="dataListBox">
          <div class="title">赛事进度</div>
          <div class="body">
            <PubTable
              columns={columns}
              data={stageMatchTeamList}
              scroll={{
                y: 500
              }}
            />
          </div>
        </div>
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
@import url('../../../style/style.less');
.slideList {
  padding: 0 10px 26px;
  overflow: hidden;
}
.dataListBox {
  .body {
    padding: 0 20px 20px 20px;
  }
}
.noData {
  width: 100%;
  padding: 20px;
}
</style>
