<script>
import SuperSlide from '~/components/common/SuperSlide' // 轮播组件
import PlayerItem from '~/components/match/team/PlayerItem' // 单条队员信息展示

import TabList from '~/components/common/TabList' // Tab切换组件
import MatchTableList from '~/components/match/scopedComponents/MatchTableList' // 列表类型数据展示组件
import StatisticsExhibit from '~/components/match/team/StatisticsExhibit' // 战队统计数据展示(非列表)

import GameTypeIcon from '~/components/common/GameTypeIcon'
import TeamBattle from '~/components/match/scopedComponents/TeamBattle'
import BtnGroup from '~/components/match/team/BtnGroup'

import getDataByGameType from '~/api/getDataByGameType'
import {
  headerStyle,
  formmatTimeParams,
  matchPlayerUrl,
  matchLeagueUrl
} from '~/assets/js/config'
import { formatTime } from '~/assets/js/publicFn'
import { MATCH_TAB_LIST, STATICTICS_TAB_LIST } from '~/assets/js/types'

export default {
  name: 'TeamDota',
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
  props: {
    infor: {
      type: Object,
      default: () => {
        return {}
      }
    }
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
                logo={record.avatar}
                name={record.name}
              />
            )
          }
        },
        {
          title: '平均助攻 ',
          align: 'center',
          dataIndex: 'assists',
          customHeaderCell: headerStyle
        },
        {
          title: '平均阵亡 ',
          align: 'center',
          dataIndex: 'deaths',
          customHeaderCell: headerStyle
        },
        {
          title: 'gpm ',
          align: 'center',
          dataIndex: 'gpm',
          customHeaderCell: headerStyle
        },
        {
          title: '正补',
          align: 'center',
          dataIndex: 'lastHits',
          customHeaderCell: headerStyle
        },
        {
          title: '反补',
          align: 'center',
          dataIndex: 'denies',
          customHeaderCell: headerStyle
        },
        {
          title: '团队经济占比(%)',
          align: 'center',
          dataIndex: 'goldInTeamPercent',
          customHeaderCell: headerStyle
        },
        {
          title: '经济伤害转化率(%)',
          align: 'center',
          dataIndex: 'damageGoldRation',
          customHeaderCell: headerStyle
        },
        {
          title: '补刀经济占比(%)',
          align: 'center',
          dataIndex: 'lastHitsGoldPercent',
          customHeaderCell: headerStyle
        },
        {
          title: '发育得分',
          align: 'center',
          dataIndex: 'farmScore',
          customHeaderCell: headerStyle
        },
        {
          title: '参战得分',
          align: 'center',
          dataIndex: 'fightRateScore',
          customHeaderCell: headerStyle
        },
        {
          title: '推进得分',
          align: 'center',
          dataIndex: 'pushScore',
          customHeaderCell: headerStyle
        },
        {
          title: '生存得分',
          align: 'center',
          dataIndex: 'survivalScore',
          customHeaderCell: headerStyle
        },
        {
          title: '输出得分',
          align: 'center',
          dataIndex: 'damageScore',
          customHeaderCell: headerStyle
        },
        {
          title: 'KDA',
          align: 'center',
          dataIndex: 'kdaScore',
          customHeaderCell: headerStyle
        },
        {
          title: '参战率(%)',
          align: 'center',
          dataIndex: 'inBattleRatio',
          customHeaderCell: headerStyle
        },
        {
          title: '先手次数',
          align: 'center',
          dataIndex: 'initiateTimes',
          customHeaderCell: headerStyle
        },
        {
          title: '团战承伤占比(%)',
          align: 'center',
          dataIndex: 'teamFightDamageReceivedPercent',
          customHeaderCell: headerStyle
        },
        {
          title: '对线期对英雄伤害',
          align: 'center',
          dataIndex: 'laningHeroDamage',
          customHeaderCell: headerStyle
        },
        {
          title: '屯野数',
          align: 'center',
          dataIndex: 'stackCampCount',
          customHeaderCell: headerStyle
        },
        {
          title: 'gank成功(%)',
          align: 'center',
          dataIndex: 'gankSuccessRate',
          customHeaderCell: headerStyle
        },
        {
          title: '打信息死亡次数',
          align: 'center',
          dataIndex: 'signalAlertDeaths',
          customHeaderCell: headerStyle
        },
        {
          title: '辅助道具花费金钱 ',
          align: 'center',
          dataIndex: 'supportGold',
          customHeaderCell: headerStyle
        },
        {
          title: '排眼数 ',
          align: 'center',
          dataIndex: 'wardDestroyTimes',
          customHeaderCell: headerStyle
        }
      ],
      playerHeroStatsPageListColums: [
        {
          title: '英雄',
          align: 'left',
          fixed: true,
          customHeaderCell: headerStyle,
          width: 150,
          customRender: (text, record) => {
            return (
              <div class="tableImgBox">
                <img src={record.logo} class="tableIcon" alt="" />
                <span>{record.name}</span>
              </div>
            )
          }
        },
        {
          title: '英雄胜率(%)',
          align: 'center',
          dataIndex: 'winRate',
          customHeaderCell: headerStyle
        },
        {
          title: '被选次数 ',
          align: 'center',
          dataIndex: 'pick',
          customHeaderCell: headerStyle
        },
        {
          title: '被选次数 ',
          align: 'center',
          dataIndex: 'ban',
          customHeaderCell: headerStyle
        },
        {
          title: 'KDA ',
          align: 'center',
          dataIndex: 'kda',
          customHeaderCell: headerStyle
        }
      ],

      gameType: 'dota',
      teamId: '',
      apiByGameType: {},
      desc: {},

      playerList: [],

      matchTabCurrent: 0,
      matchList: {},
      matchListLoading: false,

      analysisTabCurrent: 0,

      playerCompositeStatsPageList: {},
      playerCompositeStatsPageListLoading: false,

      playerHeroStatsPageList: {},
      playerHeroStatsPageListLoading: false
    }
  },
  watch: {
    analysisTabCurrent (val) {
      this.switchStatisticsList(val)
    }
  },
  mounted () {
    this.apiByGameType = getDataByGameType(this.gameType)(this.$axios)
    this.teamId = this.$route.params.id
    this.getPlayerList()
    this.getMatchPageList()
    console.log(this.infor)
    this.desc = Object.assign(this.infor, this.infor.team)
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
    // 联赛 根据状态分页查询
    getMatchPageList (agument) {
      this.matchListLoading = true
      const obj = {
        teamId: this.teamId,
        pageNum: 1,
        pageSize: 10,
        status: ''
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

    // 统计数据Tab切换
    switchStatisticsList (index) {
      switch (index) {
        case 0:
          // this.getTeamCompositeStats()
          break
        case 1:
          this.getPlayerCompositeStatsPageList()
          break
        case 2:
          this.getPlayerHeroStatsPageList()
          break
      }
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
    // 英雄综合数据
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
          this.playerHeroStatsPageList = res
          this.playerHeroStatsPageListLoading = false
        })
        .catch(() => {
          this.playerHeroStatsPageListLoading = false
        })
    }
  },
  render () {
    const {
      playerList,
      matchTabCurrent,
      matchList,
      matchListColums,
      matchListLoading,
      switchMatchList,

      analysisTabCurrent,
      desc,

      playerCompositeStatsPageListColums,
      playerCompositeStatsPageList,
      playerCompositeStatsPageListLoading,
      getPlayerCompositeStatsPageList,

      playerHeroStatsPageListColums,
      playerHeroStatsPageList,
      playerHeroStatsPageListLoading,
      getPlayerHeroStatsPageList
    } = this

    const {
      runWin,
      winRate,
      goldPerMin,
      xpPerMin,
      observerWard,
      sentryWard,
      smoke,
      kda
    } = desc

    const teamCompositeStatsMap = {
      runWin,
      winRate,
      goldPerMin,
      xpPerMin,
      observerWard,
      sentryWard,
      smoke,
      kda
    }

    return (
      <div class="teamDota content">
        <div class="slideList">
          <SuperSlide
            title="队员介绍"
            data={playerList}
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
                x: 1100
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

        {/* 统计列表(战队综合统计 | 选手综合统计 | 英雄综合统计) */}
        <div class="tabListBox">
          <TabList
            tabTypeList={STATICTICS_TAB_LIST}
            currentIndex={analysisTabCurrent}
            on-change={(val) => {
              this.analysisTabCurrent = val
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
              on-changePage={(val) => {
                const params = Object.assign({ teamId: this.teamId }, val)
                getPlayerHeroStatsPageList(params)
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
</style>
