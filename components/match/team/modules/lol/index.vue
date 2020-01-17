<script>
import SuperSlide from '~/components/common/SuperSlide' // 轮播组件
import PlayerItem from '~/components/match/team/PlayerItem' // 单条队员信息展示
import TabList from '~/components/common/TabList' // Tab切换组件
import MatchTableList from '~/components/match/scopedComponents/MatchTableList' // 列表类型数据展示组件
import StatisticsExhibit from '~/components/match/team/StatisticsExhibit' // 战队统计数据展示(非列表)
import getDataByGameType from '~/api/getDataByGameType'
import GameTypeIcon from '~/components/common/GameTypeIcon'
import TeamBattle from '~/components/match/scopedComponents/TeamBattle'
import BtnGroup from '~/components/match/team/BtnGroup'
import { headerStyle, formmatTimeParams } from '~/assets/js/config'
import {
  MATCH_TAB_LIST,
  STATICTICS_TAB_LIST,
  DETAIL_MATCH_DATA_TAB_LIST
} from '~/assets/js/types'
import { formatTime } from '~/assets/js/publicFn'

import {
  // matchTeamUrl
  matchPlayerUrl,
  matchLeagueUrl
} from '@/assets/js/config'
export default {
  name: 'TeamLol',
  components: {
    SuperSlide,
    PlayerItem,
    TabList,
    MatchTableList,
    StatisticsExhibit,
    GameTypeIcon,
    TeamBattle,
    BtnGroup
  },
  data () {
    return {
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
          width: 220,
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
                url={matchLeagueUrl({
                  id: record.leagueId,
                  gameType: this.gameType
                })}
                logo={record.leagueLogo}
                name={record.leagueName}
              />
            )
          }
        },
        {
          align: 'center',
          width: 140,
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
      playerCompositeStatsPageListColums: [
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
                logo={record.playerAvatar}
                name={record.playerNickName}
              />
            )
          }
        },
        {
          title: 'KDA',
          align: 'center',
          dataIndex: 'kda',
          customHeaderCell: headerStyle
        },
        {
          title: '场均杀人数',
          align: 'center',
          dataIndex: 'killCount',
          customHeaderCell: headerStyle
        },
        {
          title: '场均死亡数',
          align: 'center',
          dataIndex: 'deathCount',
          customHeaderCell: headerStyle
        },
        {
          title: '场均助攻数',
          align: 'center',
          dataIndex: 'assistCount',
          customHeaderCell: headerStyle
        },
        {
          title: '总杀人数',
          align: 'center',
          dataIndex: 'killTotal',
          customHeaderCell: headerStyle
        },
        {
          title: '总死亡数',
          align: 'center',
          dataIndex: 'deathTotal',
          customHeaderCell: headerStyle
        },
        {
          title: '总助攻数',
          align: 'center',
          dataIndex: 'assistTotal',
          customHeaderCell: headerStyle
        },
        {
          title: '伤害转化率(%)',
          align: 'center',
          dataIndex: 'damageConversionRate',
          customHeaderCell: headerStyle
        },
        {
          title: '伤害总数',
          align: 'center',
          dataIndex: 'damageTotal',
          customHeaderCell: headerStyle
        },
        {
          title: '场均伤害',
          align: 'center',
          dataIndex: 'damageAverage',
          customHeaderCell: headerStyle
        },
        {
          title: '分均伤害',
          align: 'center',
          dataIndex: 'damageMinute',
          customHeaderCell: headerStyle
        },
        {
          title: '承伤总数',
          align: 'center',
          dataIndex: 'damageTakenTotal',
          customHeaderCell: headerStyle
        },
        {
          title: '场均承伤',
          align: 'center',
          dataIndex: 'damageTakenAverage',
          customHeaderCell: headerStyle
        },
        {
          title: '分均承伤',
          align: 'center',
          dataIndex: 'damageTakenMinute',
          customHeaderCell: headerStyle
        },
        {
          title: '场均补刀',
          align: 'center',
          dataIndex: 'hitCount',
          customHeaderCell: headerStyle
        },
        {
          title: '分均补刀',
          align: 'center',
          dataIndex: 'hitMinute',
          customHeaderCell: headerStyle
        },
        {
          title: '经济总数',
          align: 'center',
          dataIndex: 'moneyTotal',
          customHeaderCell: headerStyle
        },
        {
          title: '场均经济',
          align: 'center',
          dataIndex: 'moneyAverage',
          customHeaderCell: headerStyle
        },
        {
          title: '分均经济',
          align: 'center',
          dataIndex: 'moneyMinute',
          customHeaderCell: headerStyle
        },
        {
          title: '插眼总数',
          align: 'center',
          dataIndex: 'wardsPlacedTotal',
          customHeaderCell: headerStyle
        },
        {
          title: '场均插眼',
          align: 'center',
          dataIndex: 'wardsPlacedCount',
          customHeaderCell: headerStyle
        },
        {
          title: '分均插眼',
          align: 'center',
          dataIndex: 'wardsPlacedMinute',
          customHeaderCell: headerStyle
        },
        {
          title: '排眼总数',
          align: 'center',
          dataIndex: 'wardsKilledTotal',
          customHeaderCell: headerStyle
        },
        {
          title: '场均排眼',
          align: 'center',
          dataIndex: 'wardsKilledCount',
          customHeaderCell: headerStyle
        },
        {
          title: '分均排眼',
          align: 'center',
          dataIndex: 'wardsKilledMinute',
          customHeaderCell: headerStyle
        },
        {
          title: '参团率(%)',
          align: 'center',
          dataIndex: 'offeredRate',
          customHeaderCell: headerStyle
        },
        {
          title: '胜场数',
          align: 'center',
          dataIndex: 'winCount',
          customHeaderCell: headerStyle
        },
        {
          title: '失败数',
          align: 'center',
          dataIndex: 'loseCount',
          customHeaderCell: headerStyle
        },
        {
          title: '胜率(%)',
          align: 'center',
          dataIndex: 'winRate',
          customHeaderCell: headerStyle
        }
      ],
      playerHeroStatsPageListColums: [
        {
          title: '英雄',
          align: 'left',
          fixed: true,
          customHeaderCell: headerStyle,
          width: 180,
          customRender: (text, record) => {
            return (
              <div class="tableImgBox">
                <img src={record.heroAvatar} class="tableIcon" alt="" />
                <span>{record.heroName}</span>
              </div>
            )
          }
        },
        {
          title: 'KDA',
          align: 'center',
          dataIndex: 'kda',
          customHeaderCell: headerStyle
        },
        {
          title: '场均杀敌数',
          align: 'center',
          dataIndex: 'killAverage',
          customHeaderCell: headerStyle
        },
        {
          title: '场均死亡数',
          align: 'center',
          dataIndex: 'deathAverage',
          customHeaderCell: headerStyle
        },
        {
          title: '场均助攻数',
          align: 'center',
          dataIndex: 'assistAverage',
          customHeaderCell: headerStyle
        },
        {
          title: '场均得分',
          align: 'center',
          dataIndex: 'score',
          customHeaderCell: headerStyle
        },
        {
          title: '胜利次数',
          align: 'center',
          dataIndex: 'winCount',
          customHeaderCell: headerStyle
        },
        {
          title: '游戏次数',
          align: 'center',
          dataIndex: 'playCount',
          customHeaderCell: headerStyle
        },
        {
          title: '胜率(%)',
          align: 'center',
          dataIndex: 'winRate',
          customHeaderCell: headerStyle
        }
      ],
      teamLeagueStatsPageListColums: [
        {
          title: '赛事',
          align: 'left',
          fixed: true,
          customHeaderCell: headerStyle,
          width: 180,
          customRender: (text, record) => {
            return (
              <TableLink
                url={matchLeagueUrl({
                  id: record.leagueId,
                  gameType: this.gameType
                })}
                logo={record.leagueLogo}
                name={record.leagueShortName}
              />
            )
          }
        },
        {
          title: '胜利次数',
          align: 'center',
          dataIndex: 'winCount',
          customHeaderCell: headerStyle
        },
        {
          title: '失败次数',
          align: 'center',
          dataIndex: 'lostCount',
          customHeaderCell: headerStyle
        },
        {
          title: '比赛场数',
          align: 'center',
          dataIndex: 'playCount',
          customHeaderCell: headerStyle
        },
        {
          title: '场均时长(s)',
          align: 'center',
          dataIndex: 'timeAverage',
          customHeaderCell: headerStyle
        },
        {
          title: '一血率(%)',
          align: 'center',
          dataIndex: 'firstBloodRate',
          customHeaderCell: headerStyle
        },
        {
          title: '小龙控制率(%)',
          align: 'center',
          dataIndex: 'smallDragonRate',
          customHeaderCell: headerStyle
        },
        {
          title: '场均大龙',
          align: 'center',
          dataIndex: 'bigDragonAverage',
          customHeaderCell: headerStyle
        },
        {
          title: '场均推塔数',
          align: 'center',
          dataIndex: 'towerSuccessAverage',
          customHeaderCell: headerStyle
        },
        {
          title: '场均丢塔数',
          align: 'center',
          dataIndex: 'towerFailAverage',
          customHeaderCell: headerStyle
        },
        {
          title: 'KDA',
          align: 'center',
          dataIndex: 'kda',
          customHeaderCell: headerStyle
        },
        {
          title: '场均击杀',
          align: 'center',
          dataIndex: 'killAverage',
          customHeaderCell: headerStyle
        },
        {
          title: '场均死亡',
          align: 'center',
          dataIndex: 'deathAverage',
          customHeaderCell: headerStyle
        },
        {
          title: '场均助攻',
          align: 'center',
          dataIndex: 'assistAverage',
          customHeaderCell: headerStyle
        },
        {
          title: '每分钟经济',
          align: 'center',
          dataIndex: 'economicMinute',
          customHeaderCell: headerStyle
        },
        {
          title: '每分钟补刀',
          align: 'center',
          dataIndex: 'hitMinute',
          customHeaderCell: headerStyle
        },
        {
          title: '场均输出',
          align: 'center',
          dataIndex: 'damageAverage',
          customHeaderCell: headerStyle
        },
        {
          title: '每分钟输出',
          align: 'center',
          dataIndex: 'damageMinute',
          customHeaderCell: headerStyle
        }
      ],
      playerLeagueStatsPageListColums: [
        {
          title: '选手',
          align: 'left',
          fixed: true,
          customHeaderCell: headerStyle,
          width: 140,
          customRender: (text, record) => {
            return (
              <TableLink
                url={matchPlayerUrl({
                  id: record.playerId,
                  gameType: this.gameType
                })}
                logo={record.playerAvatar}
                name={record.playerNickName}
              />
            )
          }
        },
        {
          title: '赛事',
          customHeaderCell: headerStyle,
          align: 'center',
          width: 180,
          customRender: (text, record) => {
            return (
              <TableLink
                url={matchLeagueUrl({
                  id: record.leagueId,
                  gameType: this.gameType
                })}
                logo={record.leagueLogo}
                name={record.leagueName}
              />
            )
          }
        },
        {
          title: '胜利次数',
          align: 'center',
          dataIndex: 'winCount',
          customHeaderCell: headerStyle
        },
        {
          title: '失败次数',
          align: 'center',
          dataIndex: 'lostCount',
          customHeaderCell: headerStyle
        },
        {
          title: '出场次数',
          align: 'center',
          dataIndex: 'playCount',
          customHeaderCell: headerStyle
        },
        {
          title: '获得MVP次数',
          align: 'center',
          dataIndex: 'mvpCount',
          customHeaderCell: headerStyle
        },
        {
          title: 'KDA',
          align: 'center',
          dataIndex: 'kda',
          customHeaderCell: headerStyle
        },
        {
          title: '场均杀敌数',
          align: 'center',
          dataIndex: 'killAverage',
          customHeaderCell: headerStyle
        },
        {
          title: '场均死亡数',
          align: 'center',
          dataIndex: 'deathAverage',
          customHeaderCell: headerStyle
        },
        {
          title: '场均助攻数',
          align: 'center',
          dataIndex: 'assistAverage',
          customHeaderCell: headerStyle
        },
        {
          title: '参团率(%)',
          align: 'center',
          dataIndex: 'offeredRate',
          customHeaderCell: headerStyle
        },
        {
          title: '每分钟经济',
          align: 'center',
          dataIndex: 'economicMinute',
          customHeaderCell: headerStyle
        },
        {
          title: '每分钟补刀数',
          align: 'center',
          dataIndex: 'hitMinute',
          customHeaderCell: headerStyle
        },
        {
          title: '每分钟插眼数',
          align: 'center',
          dataIndex: 'wardsPlacedMinute',
          customHeaderCell: headerStyle
        },
        {
          title: '每分钟排眼数',
          align: 'center',
          dataIndex: 'wardsKilledMinute',
          customHeaderCell: headerStyle
        },
        {
          title: '每分钟输出占比(%)',
          align: 'center',
          dataIndex: 'damageDealRate',
          customHeaderCell: headerStyle
        },
        {
          title: '每分钟输出',
          align: 'center',
          dataIndex: 'damageDealMinute',
          customHeaderCell: headerStyle
        },
        {
          title: '每分钟承受伤害',
          align: 'center',
          dataIndex: 'damageTakenMinute',
          customHeaderCell: headerStyle
        },
        {
          title: '每分钟承受伤害占比(%)',
          align: 'center',
          dataIndex: 'damageTakenRate',
          customHeaderCell: headerStyle
        }
      ],
      gameType: 'lol',
      teamId: '',
      apiByGameType: {},
      firstTabCurrent: 0,
      secondTabCurrent: 0,
      thirdTabCurrent: 0,
      playerList: [],

      // 赛事列表
      matchList: {},
      matchListLoading: false,

      // 统计列表
      teamCompositeStatsMap: {},

      // 选手综合统计数据
      playerCompositeStatsPageList: {},
      playerCompositeStatsPageListLoading: false,

      // 英雄综合统计
      playerHeroStatsPageList: {},
      playerHeroStatsPageListLoading: false,

      // 赛事数据
      leagueStatsPageListColums: [],
      leagueStatsPageList: {},
      leagueStatsPageListLoading: false
    }
  },
  watch: {
    secondTabCurrent (val) {
      this.switchStatisticsList(val)
    },
    thirdTabCurrent (val) {
      this.switchLeagueTab(val)
    }
  },
  mounted () {
    this.apiByGameType = getDataByGameType(this.gameType)(this.$axios)
    this.teamId = this.$route.params.id
    this.getPlayerList()
    this.getMatchPageList()
    this.getTeamCompositeStats()
    this.getTeamLeagueStatsPageList()
  },
  methods: {
    // 获取选手列表
    getPlayerList () {
      const params = {
        teamId: this.teamId
      }
      this.apiByGameType.team.playerList(params).then((res) => {
        this.playerList = res
      })
    },
    // 赛事列表切换Tab
    switchMatchList (item) {
      const params = {
        status: item.type
      }
      this.getMatchPageList(params)
    },
    // 统计数据Tab切换
    switchStatisticsList (index) {
      switch (index) {
        case 0:
          this.getTeamCompositeStats()
          break
        case 1:
          this.getPlayerCompositeStatsPageList()
          break
        case 2:
          this.getPlayerHeroStatsPageList()
          break
      }
    },
    // 获取赛事列表 0:未开始，1：进行中，2：已结束
    getMatchPageList (agument) {
      this.matchListLoading = true
      const obj = {
        teamId: this.teamId,
        pageNum: 1,
        pageSize: 10
      }
      const params = Object.assign(obj, agument)
      this.apiByGameType.team
        .matchPageList(params)
        .then((res) => {
          this.matchList = res
          this.matchListLoading = false
        })
        .catch(() => {
          this.matchListLoading = false
        })
    },
    // 战队综合数据
    getTeamCompositeStats () {
      const params = {
        teamId: this.teamId
      }
      this.apiByGameType.team.teamCompositeStats(params).then((res) => {
        this.teamCompositeStatsMap = res
      })
    },
    // 选手综合数据
    getPlayerCompositeStatsPageList (agument) {
      this.playerCompositeStatsPageListLoading = true
      const obj = {
        teamId: this.teamId,
        pageNum: 1,
        pageSize: 10
      }
      const params = Object.assign(obj, agument)
      this.apiByGameType.team
        .playerCompositeStatsPageList(params)
        .then((res) => {
          this.playerCompositeStatsPageList = res
          this.playerCompositeStatsPageListLoading = false
        })
        .catch(() => {
          this.playerCompositeStatsPageListLoading = false
        })
    },
    // 英雄综合统计
    getPlayerHeroStatsPageList (agument) {
      this.playerHeroStatsPageListLoading = true
      const obj = {
        teamId: this.teamId,
        pageNum: 1,
        pageSize: 10
      }
      const params = Object.assign(obj, agument)
      this.apiByGameType.team
        .playerHeroStatsPageList(params)
        .then((res) => {
          for (const [index, item] of res.rows.entries()) {
            item.id = index
          }
          this.playerHeroStatsPageList = res
          this.playerHeroStatsPageListLoading = false
        })
        .catch(() => {
          this.playerHeroStatsPageListLoading = false
        })
    },
    // 赛事数据Tab切换
    switchLeagueTab (index) {
      switch (index) {
        case 0:
          this.getTeamLeagueStatsPageList()
          break
        case 1:
          this.getPlayerLeagueStatsPageList()
      }
    },
    // 战队赛事数据
    getTeamLeagueStatsPageList (agument) {
      this.leagueStatsPageListColums = this.teamLeagueStatsPageListColums
      this.leagueStatsPageListLoading = true
      const obj = {
        teamId: this.teamId,
        pageNum: 1,
        pageSize: 10
      }
      const params = Object.assign(obj, agument)
      this.apiByGameType.team
        .teamLeagueStatsPageList(params)
        .then((res) => {
          this.leagueStatsPageList = res
          this.leagueStatsPageListLoading = false
        })
        .catch(() => {
          this.leagueStatsPageListLoading = false
        })
    },
    // 选手赛事数据
    getPlayerLeagueStatsPageList (agument) {
      this.leagueStatsPageListColums = this.playerLeagueStatsPageListColums
      this.leagueStatsPageListLoading = true
      const obj = {
        teamId: this.teamId,
        pageNum: 1,
        pageSize: 10
      }
      const params = Object.assign(obj, agument)
      this.apiByGameType.team
        .playerLeagueStatsPageList(params)
        .then((res) => {
          this.leagueStatsPageList = res
          this.leagueStatsPageListLoading = false
        })
        .catch(() => {
          this.leagueStatsPageListLoading = false
        })
    }
  },
  render () {
    const {
      firstTabCurrent,
      secondTabCurrent,
      thirdTabCurrent,
      switchMatchList,

      matchListColums,
      matchList,
      matchListLoading,
      getMatchPageList,
      teamCompositeStatsMap,

      playerCompositeStatsPageListColums,
      playerCompositeStatsPageList,
      playerCompositeStatsPageListLoading,
      getPlayerCompositeStatsPageList,

      playerHeroStatsPageListColums,
      playerHeroStatsPageList,
      playerHeroStatsPageListLoading,
      getPlayerHeroStatsPageList,

      leagueStatsPageListColums,
      leagueStatsPageList,
      leagueStatsPageListLoading,

      getTeamLeagueStatsPageList,
      getPlayerLeagueStatsPageList
    } = this

    return (
      <div class="teamLol content">
        <div class="slideList">
          <SuperSlide
            title="队员介绍"
            data={this.playerList}
            options={{ vis: 7, scroll: 7 }}
            {...{
              scopedSlots: {
                default: (props) => {
                  return (
                    <PlayerItem data={props.data} gameType={this.gameType} />
                  )
                }
              }
            }}
          ></SuperSlide>
        </div>

        {/* 赛事列表(进行中赛事 | 赛事预告 | 历史赛事) */}
        <div class="tabListBox">
          <TabList
            tabTypeList={MATCH_TAB_LIST}
            currentIndex={firstTabCurrent}
            on-change={(val) => {
              switchMatchList(MATCH_TAB_LIST[val])
              this.firstTabCurrent = val
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
                const params = Object.assign({ teamId: this.teamId }, val)
                getMatchPageList(params)
              }}
            />
          </TabList>
        </div>

        {/* 统计列表(战队综合统计 | 选手综合统计 | 英雄综合统计) */}
        <div class="tabListBox">
          <TabList
            tabTypeList={STATICTICS_TAB_LIST}
            currentIndex={secondTabCurrent}
            on-change={(val) => {
              this.secondTabCurrent = val
            }}
          >
            <StatisticsExhibit slot={0} data={teamCompositeStatsMap} />
            <MatchTableList
              slot={1}
              listData={playerCompositeStatsPageList}
              colums={playerCompositeStatsPageListColums}
              loading={playerCompositeStatsPageListLoading}
              scroll={{
                x: 3000
              }}
              on-changePage={(val) => {
                const params = Object.assign({ teamId: this.teamId }, val)
                getPlayerCompositeStatsPageList(params)
              }}
            />
            <MatchTableList
              slot={2}
              listData={playerHeroStatsPageList}
              colums={playerHeroStatsPageListColums}
              loading={playerHeroStatsPageListLoading}
              scroll={{
                x: 1200
              }}
              on-changePage={(val) => {
                const params = Object.assign({ teamId: this.teamId }, val)
                getPlayerHeroStatsPageList(params)
              }}
            />
          </TabList>
        </div>

        <div class="tabListBox">
          <TabList
            tabTypeList={DETAIL_MATCH_DATA_TAB_LIST}
            currentIndex={thirdTabCurrent}
            on-change={(val) => {
              this.thirdTabCurrent = val
            }}
          >
            <MatchTableList
              listData={leagueStatsPageList}
              colums={leagueStatsPageListColums}
              loading={leagueStatsPageListLoading}
              on-changePage={(val) => {
                if (thirdTabCurrent === 0) {
                  getTeamLeagueStatsPageList(val)
                }
                if (thirdTabCurrent === 1) {
                  getPlayerLeagueStatsPageList(val)
                }
              }}
              scroll={{
                x: 2400
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
@import url('../../../style/tableColums.less');
.slideList {
  padding: 20px 14px;
}
</style>
