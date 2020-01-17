<script>
import SuperSlide from '~/components/common/SuperSlide'
import MatchItem from '~/components/match/league/MatchItem'
import TeamItem from '~/components/match/team/TeamItem'
import TabList from '~/components/common/TabList' // Tab切换组件
import NoData from '~/components/common/Nodata'
import StageGroupNoApi from '~/components/match/league/stageGroupNoApi'

import getDataByGameType from '~/api/getDataByGameType'
export default {
  name: 'LeagueDota',
  components: {
    SuperSlide,
    MatchItem,
    TeamItem,

    TabList,
    StageGroupNoApi,
    NoData
  },
  data () {
    return {
      gameType: 'dota',
      apiByGameType: {}, // 根据不同的GameType获取api方法
      weekLeagueList: [],
      teamList: [],
      stageMatchTeamList: [],
      stageGroupIndex: 0
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
    // 联赛按阶段分组赛事列表与积分排行榜
    getStageMatchTeam () {
      const params = {
        leagueId: this.leagueId
      }
      this.apiByGameType.league.stageMatchTeam(params).then((res) => {
        for (const item of res) {
          item.name = item.subName
        }
        this.stageMatchTeamList = res
      })
    }
  },
  render () {
    const {
      weekLeagueList,
      teamList,
      stageMatchTeamList,
      stageGroupIndex
    } = this

    const dataNone = (
      <div class="noData">
        <NoData />
      </div>
    )

    const stageGroupVm = (
      <TabList
        tabTypeList={stageMatchTeamList}
        currentIndex={stageGroupIndex}
        on-change={(val) => {
          // console.log(stageMatchTeamList[stageGroupIndex])
          this.stageGroupIndex = val
        }}
      >
        <StageGroupNoApi stageGroup={stageMatchTeamList[stageGroupIndex]} />
      </TabList>
    )

    return (
      <div class="leagueDota content">
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
          {stageMatchTeamList.length > 0 ? stageGroupVm : dataNone}
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
.noData {
  width: 100%;
  padding: 20px;
}
</style>
