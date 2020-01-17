<script>
import SuperSlide from '~/components/common/SuperSlide'

import TeamItem from '~/components/match/team/TeamItem'
import MatchItem from '~/components/match/league/MatchItem'
import TabList from '~/components/common/TabList' // Tab切换组件
import MatchTableList from '~/components/match/scopedComponents/MatchTableList' // 列表类型数据展示组件
import StageGroupTable from '~/components/match/scopedComponents/kog/stageGroupTable'
import NoData from '~/components/common/Nodata'
import { OTHER_DATA_TAB_LIST } from '~/assets/js/types'
import { headerStyle } from '~/assets/js/config'
import getDataByGameType from '~/api/getDataByGameType'

import {
  matchTeamUrl,
  matchPlayerUrl
  // matchLeagueUrl
} from '@/assets/js/config'

export default {
  name: 'LeagueKog',
  components: {
    SuperSlide, // 轮播组件
    TeamItem,
    MatchItem,
    TabList,
    MatchTableList,
    StageGroupTable,
    NoData
  },
  data () {
    return {
      // 战队分析表头
      teamAnalysisColums: [
        {
          title: '战队',
          align: 'center',
          dataIndex: 'teamName',
          fixed: true,
          customRender: (text, record) => (
            <TableLink
              url={matchTeamUrl({ id: record.teamId, gameType: this.gameType })}
              logo={record.teamLogo}
              name={record.teamShortName}
            />
          ),
          customHeaderCell: headerStyle,
          width: 150
        },
        {
          title: '胜利次数',
          align: 'center',
          dataIndex: 'winCount',
          customHeaderCell: headerStyle,
          width: 130
        },
        {
          title: '失败次数',
          align: 'center',
          dataIndex: 'lostCount',
          customHeaderCell: headerStyle,
          width: 130
        },
        {
          title: '比赛场数',
          align: 'center',
          dataIndex: 'playCount',
          customHeaderCell: headerStyle,
          width: 130
        },
        {
          title: '场均时长(s)',
          align: 'center',
          dataIndex: 'timeAverage',
          customHeaderCell: headerStyle,
          width: 130
        },
        {
          title: '一血率(%)',
          align: 'center',
          dataIndex: 'firstBloodRate',
          customHeaderCell: headerStyle,
          width: 150
        },
        {
          title: '小龙控制率(%)',
          align: 'center',
          dataIndex: 'smallDragonRate',
          customHeaderCell: headerStyle,
          width: 140
        },
        {
          title: '场均大龙',
          align: 'center',
          dataIndex: 'bigDragonAverage',
          customHeaderCell: headerStyle,
          width: 130
        },
        {
          title: '场均推塔数',
          align: 'center',
          dataIndex: 'towerSuccessAverage',
          customHeaderCell: headerStyle,
          width: 130
        },
        {
          title: '场均丢塔数',
          align: 'center',
          dataIndex: 'towerFailAverage',
          customHeaderCell: headerStyle,
          width: 130
        },
        {
          title: 'KDA',
          align: 'center',
          dataIndex: 'kda',
          customHeaderCell: headerStyle,
          width: 130
        },
        {
          title: '场均击杀',
          align: 'center',
          dataIndex: 'killAverage',
          customHeaderCell: headerStyle,
          width: 130
        },
        {
          title: '场均死亡',
          align: 'center',
          dataIndex: 'deathAverage',
          customHeaderCell: headerStyle,
          width: 130
        },
        {
          title: '场均助攻',
          align: 'center',
          dataIndex: 'assistAverage',
          customHeaderCell: headerStyle,
          width: 130
        },
        {
          title: '每分钟经济',
          align: 'center',
          dataIndex: 'economicMinute',
          customHeaderCell: headerStyle,
          width: 130
        },
        {
          title: '每分钟补刀',
          align: 'center',
          dataIndex: 'hitMinute',
          customHeaderCell: headerStyle,
          width: 130
        },
        {
          title: '场均输出',
          align: 'center',
          dataIndex: 'damageAverage',
          customHeaderCell: headerStyle,
          width: 130
        },
        {
          title: '每分钟输出',
          align: 'center',
          dataIndex: 'damageMinute',
          customHeaderCell: headerStyle,
          width: 130
        }
      ],
      playerAnalysisColums: [
        {
          title: '选手',
          align: 'center',
          fixed: true,
          customRender: (text, record) => (
            <TableLink
              url={matchPlayerUrl({
                id: record.playerId,
                gameType: this.gameType
              })}
              logo={record.playerAvatar}
              name={record.playerNickName}
            />
          ),
          customHeaderCell: headerStyle,
          width: 120
        },
        // {
        //   title: '赛事',
        //   align: 'center',
        //   customRender: (text, record) => (
        //     <TableLink
        //       url={matchLeagueUrl({
        //         id: record.leagueId,
        //         gameType: this.gameType
        //       })}
        //       logo={record.leagueLogo}
        //       name={record.leagueName}
        //     />
        //   ),
        //   customHeaderCell: headerStyle,
        //   width: 130
        // },
        {
          title: '胜利次数',
          align: 'center',
          dataIndex: 'winCount',
          customHeaderCell: headerStyle,
          width: 130
        },
        {
          title: '失败次数',
          align: 'center',
          dataIndex: 'lostCount',
          customHeaderCell: headerStyle,
          width: 130
        },
        {
          title: '出场次数',
          align: 'center',
          dataIndex: 'playCount',
          customHeaderCell: headerStyle,
          width: 130
        },
        {
          title: '获得MVP次数',
          align: 'center',
          dataIndex: 'mvpCount',
          customHeaderCell: headerStyle,
          width: 130
        },
        {
          title: 'KDA',
          align: 'center',
          dataIndex: 'kda',
          customHeaderCell: headerStyle,
          width: 130
        },
        {
          title: '场均杀敌数',
          align: 'center',
          dataIndex: 'killAverage',
          customHeaderCell: headerStyle,
          width: 130
        },
        {
          title: '场均死亡数',
          align: 'center',
          dataIndex: 'deathAverage',
          customHeaderCell: headerStyle,
          width: 130
        },
        {
          title: '场均助攻数',
          align: 'center',
          dataIndex: 'assistAverage',
          customHeaderCell: headerStyle,
          width: 130
        },
        {
          title: '参团率(%)',
          align: 'center',
          dataIndex: 'offeredRate',
          customHeaderCell: headerStyle,
          width: 130
        },
        {
          title: '每分钟经济',
          align: 'center',
          dataIndex: 'economicMinute',
          customHeaderCell: headerStyle,
          width: 130
        },
        {
          title: '每分钟补刀数',
          align: 'center',
          dataIndex: 'hitMinute',
          customHeaderCell: headerStyle,
          width: 130
        },
        {
          title: '每分钟输出占比(%)',
          align: 'center',
          dataIndex: 'damageDealRate',
          customHeaderCell: headerStyle,
          width: 160
        },
        {
          title: '每分钟输出',
          align: 'center',
          dataIndex: 'damageDealMinute',
          customHeaderCell: headerStyle,
          width: 130
        },
        {
          title: '每分钟承受伤害',
          align: 'center',
          dataIndex: 'damageTakenMinute',
          customHeaderCell: headerStyle,
          width: 160
        },
        {
          title: '每分钟承受伤害占比(%)',
          align: 'center',
          dataIndex: 'damageTakenRate',
          customHeaderCell: headerStyle,
          width: 200
        }
      ],
      heroAnalysisColums: [
        {
          title: '英雄',
          align: 'center',
          fixed: true,
          customRender: (text, record) => (
            <div class="teamName tableImgBox" title={record.playerNickName}>
              <img
                class="tableIcon"
                style={{
                  width: '16px'
                }}
                src={record.heroAvatar}
              />
              <span>{record.heroName}</span>
            </div>
          ),
          customHeaderCell: headerStyle,
          width: 150
        },
        {
          title: 'KDA',
          align: 'center',
          dataIndex: 'kda',
          customHeaderCell: headerStyle,
          width: 130
        },
        {
          title: '场均杀敌数',
          align: 'center',
          dataIndex: 'killAverage',
          customHeaderCell: headerStyle,
          width: 130
        },
        {
          title: '场均死亡数',
          align: 'center',
          dataIndex: 'deathAverage',
          customHeaderCell: headerStyle,
          width: 130
        },
        {
          title: '场均助攻数',
          align: 'center',
          dataIndex: 'assistAverage',
          customHeaderCell: headerStyle,
          width: 130
        },
        {
          title: '使用率(%)',
          align: 'center',
          dataIndex: 'pickRate',
          customHeaderCell: headerStyle,
          width: 130
        },
        {
          title: '禁用率(%)',
          align: 'center',
          dataIndex: 'banRate',
          customHeaderCell: headerStyle,
          width: 130
        },
        {
          title: '胜率(%)',
          align: 'center',
          dataIndex: 'winRate',
          customHeaderCell: headerStyle,
          width: 130
        },
        {
          title: '英雄位置',
          align: 'center',
          dataIndex: 'position',
          customHeaderCell: headerStyle,
          width: 130
        }
      ],

      apiByGameType: {}, // 根据不同的GameType获取api方法
      weekLeagueList: [],
      teamList: [],
      gameType: 'kog',
      leagueId: '',

      stageGroupIndex: 0,
      stageGroupList: [],
      currentStageGroup: {},
      stageLoading: false,

      analysisCurIndex: 0,
      analysisData: {},
      analysisLoading: false,
      analysisColums: []
    }
  },
  watch: {
    analysisCurIndex (val) {
      const params = {
        leagueId: this.leagueId,
        pageNum: 1
      }
      this.changeListByAnalysisCurIndex(val, params)
    }
  },
  mounted () {
    this.apiByGameType = getDataByGameType(this.gameType)(this.$axios)
    this.leagueId = this.$route.params.id
    this.listThisWeekByLeagueId()
    this.getTeamList()
    this.getStageGroup()
    const params = {
      leagueId: this.leagueId
    }
    this.leagueTeamStatsPageList(params)
  },
  methods: {
    // 获取本周赛程
    listThisWeekByLeagueId () {
      const params = {
        leagueId: this.leagueId
      }
      this.apiByGameType.league.listThisWeekByLeagueId(params).then((res) => {
        this.weekLeagueList = res
      })
    },
    // 获取参赛战队
    getTeamList () {
      const params = {
        leagueId: this.leagueId
      }
      this.apiByGameType.league.teamList(params).then((res) => {
        this.teamList = res
      })
    },
    // 赛事进度Tab项
    getStageGroup () {
      const params = {
        leagueId: this.leagueId
      }
      this.apiByGameType.league.stageGroup(params).then((res) => {
        for (const item of res) {
          item.name = item.roundName
        }
        this.stageGroupList = res
        if (this.stageGroupList.length > 0) {
          this.getStageGroupDetail({
            leagueId: this.leagueId,
            roundId: res[0].roundId
          })
        }
      })
    },
    getStageGroupDetail (params) {
      this.stageLoading = true
      this.apiByGameType.league.stageGroupDetail(params).then((res) => {
        this.currentStageGroup = res
        this.stageLoading = false
      })
    },
    changeListByAnalysisCurIndex (index, params) {
      switch (index) {
        case 0:
          this.leagueTeamStatsPageList(params)
          break
        case 1:
          this.leaguePlayerStatsPageList(params)
          break
        case 2:
          this.leagueHeroesStatsList(params)
          break
      }
    },
    // 战队分析
    leagueTeamStatsPageList (params) {
      this.analysisLoading = true
      this.analysisColums = this.teamAnalysisColums
      this.apiByGameType.league
        .leagueTeamStatsPageList(params)
        .then((res) => {
          this.analysisData = res
          this.analysisLoading = false
        })
        .catch(() => {
          this.analysisLoading = false
        })
    },
    // 选手分析
    leaguePlayerStatsPageList (params) {
      this.analysisLoading = true
      this.analysisColums = this.playerAnalysisColums
      this.apiByGameType.league
        .leaguePlayerStatsPageList(params)
        .then((res) => {
          this.analysisData = res
          this.analysisLoading = false
        })
        .catch(() => {
          this.analysisLoading = false
        })
    },
    // 英雄分析
    leagueHeroesStatsList (params) {
      this.analysisLoading = true
      this.analysisColums = this.heroAnalysisColums
      this.apiByGameType.league
        .leagueHeroesStatsList(params)
        .then((res) => {
          this.analysisData = res
          this.analysisLoading = false
        })
        .catch(() => {
          this.analysisLoading = false
        })
    },
    // 分析模块分页
    analysisChangePage (val) {
      const params = Object.assign({ leagueId: this.leagueId }, val)
      this.changeListByAnalysisCurIndex(this.analysisCurIndex, params)
    }
  },
  render () {
    const {
      weekLeagueList,
      teamList,
      stageGroupList,
      stageGroupIndex,
      currentStageGroup,
      getStageGroupDetail,
      stageLoading,
      analysisColums, // 分析模块当前表头配置
      analysisCurIndex, // 分析模块当前tab索引
      analysisData, // 分析模块分页请求获取到的数据
      analysisChangePage, // 分析模块分页方法
      analysisLoading // 分析模块列表loading状态
    } = this
    const dataNone = (
      <div class="noData">
        <NoData />
      </div>
    )

    const stageGroupVm = (
      <TabList
        tabTypeList={stageGroupList}
        currentIndex={stageGroupIndex}
        on-change={(val) => {
          this.stageGroupIndex = val
          console.log(stageGroupList[val].name)
          const params = {
            leagueId: this.leagueId,
            roundId: stageGroupList[val].roundId
          }
          getStageGroupDetail(params)
        }}
      >
        <StageGroupTable
          title={
            stageGroupList[stageGroupIndex]
              ? stageGroupList[stageGroupIndex].name
              : ''
          }
          data={currentStageGroup}
          loading={stageLoading}
        />
      </TabList>
    )
    return (
      <div class="leagueKog content">
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
          {stageGroupList.length > 0 ? stageGroupVm : dataNone}
        </div>

        {/* 分析模块 */}
        <div class="dataListBox">
          <div class="title">联赛分析</div>
          <TabList
            tabTypeList={OTHER_DATA_TAB_LIST}
            currentIndex={analysisCurIndex}
            on-change={(val) => {
              this.analysisCurIndex = val
            }}
          >
            <MatchTableList
              colums={analysisColums}
              on-changePage={analysisChangePage}
              listData={analysisData}
              loading={analysisLoading}
              scroll={analysisCurIndex === 2 ? { x: 1200 } : { x: 2400 }}
            />
          </TabList>
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
.teamName {
  text-align: left;
  max-width: 150px;
  overflow: hidden; //超出的文本隐藏
  text-overflow: ellipsis; //溢出用省略号显示
  white-space: nowrap; //溢出不换行
  // text-align: left;
}
.noData {
  width: 100%;
  padding: 20px;
}
</style>
