<script>
import SuperSlide from '~/components/common/SuperSlide' // 轮播组件
import PlayerItem from '~/components/match/team/PlayerItem' // 单条队员信息展示
import TabList from '~/components/common/TabList' // Tab切换组件
import getDataByGameType from '~/api/getDataByGameType'
import MatchTableList from '~/components/match/scopedComponents/MatchTableList' // 列表类型数据展示组件
import TabSwitch from '~/components/common/TabSwitch' // Tab切换栏

import GameTypeIcon from '~/components/common/GameTypeIcon'
import TeamBattle from '~/components/match/scopedComponents/TeamBattle'
import BtnGroup from '~/components/match/team/BtnGroup'

import CsgoAnalysis from '~/components/match/team/CsgoAnalysis'

import {
  CSGO_PLAYER_LIST_TAB,
  MATCH_TAB_LIST,
  CSGO_ANALYSIS_TAB_LIST
} from '~/assets/js/types'
import {
  headerStyle,
  formmatTimeParams,
  // matchTeamUrl,
  matchPlayerUrl,
  matchLeagueUrl
} from '~/assets/js/config'
import { formatTime } from '~/assets/js/publicFn'

export default {
  name: 'TeamCsgo',
  components: {
    SuperSlide,
    PlayerItem,
    TabList,
    MatchTableList,

    GameTypeIcon,
    TeamBattle,
    BtnGroup,

    CsgoAnalysis
  },
  props: {
    infor: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      gameType: 'csgo',
      teamId: '',
      apiByGameType: {},
      playerList: [],
      playerCurrentIndex: 0,

      matchListColums: [
        {
          align: 'center',
          customHeaderCell: headerStyle,
          width: 20,
          customRender: (text, record) => {
            return (
              <div>
                <GameTypeIcon type={this.gameType} />
              </div>
            )
          }
        },
        {
          align: 'center',
          width: 120,
          customRender: (text, record) => {
            return (
              <div>
                <p>{formatTime(record.matchTime, formmatTimeParams)}</p>
              </div>
            )
          }
        },
        {
          align: 'center',
          width: 300,
          customRender: (text, record) => {
            return (
              <TableLink
                align="center"
                url={matchLeagueUrl({ id: record.leagueId, gameType: this.gameType })}
                logo={record.leagueLogo}
                name={record.leagueName}
              />
            )
          }
        },
        {
          align: 'center',
          customRender: (text, record) => {
            return <div>BO{record.bo}</div>
          }
        },
        {
          align: 'center',
          width: 300,
          customRender: (text, record) => {
            return <TeamBattle record={record || {}} />
          }
        },
        {
          align: 'center',
          width: 250,
          customRender: (text, record) => {
            return <BtnGroup data={record} />
          }
        }
      ],

      analysisPlayerColums: [
        {
          title: '选手',
          align: 'left',
          fixed: true,
          customHeaderCell: headerStyle,
          width: 150,
          customRender: (text, record) => {
            return (
              <TableLink
                url={matchPlayerUrl({
                  id: record.playerId,
                  gameType: this.gameType
                })}
                logo={record.avatar}
                name={record.nickName}
              />
            )
          }
        },
        {
          title: '杀人总数',
          align: 'center',
          dataIndex: 'killCount',
          customHeaderCell: headerStyle
        },
        {
          title: '死亡总数',
          align: 'center',
          dataIndex: 'deathCount',
          customHeaderCell: headerStyle
        },
        {
          title: '轮均杀人数',
          align: 'center',
          dataIndex: 'killAverage',
          customHeaderCell: headerStyle
        },
        {
          title: '轮均助攻数',
          align: 'center',
          dataIndex: 'assistAverage',
          customHeaderCell: headerStyle
        },
        {
          title: '轮均死亡数',
          align: 'center',
          dataIndex: 'deathAverage',
          customHeaderCell: headerStyle
        },
        {
          title: '杀人数/死亡数比率',
          align: 'center',
          dataIndex: 'kdRatio',
          customHeaderCell: headerStyle
        },
        {
          title: '轮均伤害',
          align: 'center',
          dataIndex: 'damageAverage',
          customHeaderCell: headerStyle
        },
        {
          title: '轮均手雷伤害',
          align: 'center',
          dataIndex: 'grenadeDamageAverage',
          customHeaderCell: headerStyle
        },
        {
          title: '轮均被队友救起',
          align: 'center',
          dataIndex: 'savedByTeammateAverage',
          customHeaderCell: headerStyle
        },
        {
          title: '轮均救起队友',
          align: 'center',
          dataIndex: 'savedTeamateAverage',
          customHeaderCell: headerStyle
        },
        {
          title: '评分',
          align: 'center',
          dataIndex: 'rating',
          customHeaderCell: headerStyle
        }
      ],

      matchTabCurrent: 0,
      matchList: {},
      matchListLoading: false,

      analysisTabCurrent: 0,
      maps: [],

      analysisPlayerList: {},
      analysisPlayerLoading: false
    }
  },
  mounted () {
    this.apiByGameType = getDataByGameType(this.gameType)(this.$axios)
    this.teamId = this.$route.params.id
    const key = CSGO_PLAYER_LIST_TAB[this.playerCurrentIndex].key
    this.playerList = this.infor[key]
    this.getTeamAnalysisData()
    this.getMatchPageList()
    this.getPlayerStats()
  },
  methods: {
    changeTab (val) {
      const key = CSGO_PLAYER_LIST_TAB[val].key
      this.playerList = this.infor[key]
      this.playerCurrentIndex = val
    },
    // 赛事列表切换Tab
    switchMatchList (item) {
      const params = {
        status: item.type
      }
      this.getMatchPageList(params)
    },
    // 根据状态分页查询
    async getMatchPageList (agument) {
      this.matchListLoading = true
      const obj = {
        teamId: this.teamId,
        pageNum: 1,
        pageSize: 10,
        status: ''
      }
      const params = Object.assign(obj, agument)
      try {
        const res = await this.apiByGameType.team.matchPageList(params)
        this.matchList = res
        this.matchListLoading = false
      } catch {
        this.matchListLoading = false
      }
    },
    // 地图胜率数组
    getTeamAnalysisData () {
      const params = {
        teamId: this.teamId
      }
      this.apiByGameType.team.maps(params).then((res) => {
        this.maps = res
      })
    },
    // 选手分析
    async getPlayerStats (agument) {
      this.analysisPlayerLoading = true
      const obj = {
        teamId: this.teamId,
        pageNum: 1,
        pageSize: 10
      }
      const params = Object.assign(obj, agument)
      try {
        const res = await this.apiByGameType.team.playerStats(params)
        this.analysisPlayerList = res
        this.analysisPlayerLoading = false
      } catch {
        this.analysisPlayerLoading = false
      }
    }
  },
  render () {
    const {
      playerList,
      changeTab,
      matchListColums,
      matchTabCurrent,
      matchList,
      matchListLoading,
      switchMatchList,
      analysisTabCurrent,

      analysisPlayerColums,
      analysisPlayerList,
      analysisPlayerLoading,
      getPlayerStats
    } = this

    const {
      winCount,
      lostCount,
      drawCount,
      killCount,
      deathCount,
      roundCount
    } = this.infor

    const teamAnalysData = {
      winCount,
      lostCount,
      drawCount,
      killCount,
      deathCount,
      roundCount
    }
    return (
      <div class="teamCsgo content">
        <div class="tabSlideList">
          <SuperSlide
            data={playerList}
            options={{ vis: 7, scroll: 7 }}
            customerStyle={{
              height: '270px'
            }}
            {...{
              scopedSlots: {
                default: (props) => {
                  return (
                    <PlayerItem
                      isShowPosition={false}
                      data={props.data}
                      gameType={this.gameType}
                    />
                  )
                }
              }
            }}
          >
            <TabSwitch
              customerStyle={{
                padding: '0 20px'
              }}
              slot="header"
              data={CSGO_PLAYER_LIST_TAB}
              currentIndex={this.playerCurrentIndex}
              on-change={(val) => {
                changeTab(val.index)
              }}
            />
          </SuperSlide>
        </div>

        {/* 赛事列表(进行中赛事 | 赛事预告 | 历史赛事) */}
        <div class="tabListBox">
          <TabList
            tabTypeList={MATCH_TAB_LIST}
            currentIndex={matchTabCurrent}
            on-change={(val) => {
              switchMatchList(MATCH_TAB_LIST[val])
              this.matchTabCurrent = val
            }}
          >
            <MatchTableList
              showHeader={false}
              listData={matchList}
              colums={matchListColums}
              loading={matchListLoading}
              scroll={{
                x: 1200
              }}
              on-changePage={(val) => {
                const params = Object.assign(
                  {
                    status: MATCH_TAB_LIST[matchTabCurrent].type
                  },
                  val
                )
                this.getMatchPageList(params)
              }}
            />
          </TabList>
        </div>

        {/* 分析列表(战队统分析 | 选手统分析  */}
        <div class="tabListBox">
          <TabList
            tabTypeList={CSGO_ANALYSIS_TAB_LIST}
            currentIndex={analysisTabCurrent}
            on-change={(val) => {
              this.analysisTabCurrent = val
            }}
          >
            <CsgoAnalysis
              baseInfor={teamAnalysData}
              maps={this.maps}
              slot={0}
            />
            <MatchTableList
              slot={1}
              listData={analysisPlayerList}
              colums={analysisPlayerColums}
              loading={analysisPlayerLoading}
              scroll={{
                x: 1300
              }}
              on-changePage={(val) => {
                const params = Object.assign(
                  {
                    teamId: this.teamId
                  },
                  val
                )
                getPlayerStats(params)
              }}
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
  padding: 20px 14px;
  padding-top: 0;
}
.tabSlideList {
  min-height: 270px;
  background-color: #fff;
  margin-top: 10px;
  padding-bottom: 20px;
}
</style>
