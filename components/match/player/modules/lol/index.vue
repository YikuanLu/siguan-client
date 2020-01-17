<script>
import getDataByGameType from '~/api/getDataByGameType'
import TableBox from '~/components/match/player/TableBox'
import MatchTableList from '~/components/match/scopedComponents/MatchTableList' // 列表类型数据展示组件
import StatisticsExhibit from '~/components/match/team/StatisticsExhibit' // 统计数据展示(非列表)
import TeamBattle from '~/components/match/scopedComponents/TeamBattle'
import TabList from '~/components/common/TabList' // Tab切换组件
import {
  headerStyle,
  formmatTimeParams,
  liveUrl,
  matchLeagueUrl
} from '~/assets/js/config'
import { formatTime } from '~/assets/js/publicFn'
import { LOL_PLAYER_TAB_LIST } from '~/assets/js/types'
export default {
  name: 'PlayerLol',
  components: {
    TableBox,
    MatchTableList,
    StatisticsExhibit,
    TeamBattle,
    TabList
  },
  props: {},
  data () {
    return {
      apiByGameType: {},
      gameType: 'lol',
      historyColums: [
        {
          title: '时间',
          align: 'center',
          customRender: (text, record) => {
            return (
              <div>{formatTime(record.matchTime, formmatTimeParams)}</div>
            )
          },
          customHeaderCell: headerStyle
        },
        {
          title: '战队vs战队',
          align: 'center',
          width: 300,
          customRender: (text, record) => {
            return <TeamBattle record={record || {}} />
          },
          customHeaderCell: headerStyle
        },
        {
          title: '英雄',
          align: 'center',
          customRender: (text, record) => (
            <img class="tableIcon" src={record.heroAvatar} alt="" />
          ),
          customHeaderCell: headerStyle
        },
        {
          title: '结果',
          align: 'center',
          customRender: (text, record) => {
            text = record.isWin === 0 ? '赢' : record.isWin === 1 ? '输' : '--'
            return (
              <div class={`isWin ${record.isWin === 0 ? 'win' : ''}`}>
                <span>{text}</span>
              </div>
            )
          },
          customHeaderCell: headerStyle
        },
        {
          title: 'KDA',
          align: 'center',
          dataIndex: 'kda',
          customHeaderCell: headerStyle
        },
        {
          title: '金钱',
          align: 'center',
          dataIndex: 'moneyCount',
          customHeaderCell: headerStyle
        },
        {
          title: '出装',
          align: 'center',
          customRender: (text, record) => {
            return (
              <div>
                {record.equipImageList.map((item) => {
                  return <img class="tableIcon" src={item} alt="" />
                })}
              </div>
            )
          },
          customHeaderCell: headerStyle
        },
        {
          title: '操作',
          align: 'center',
          customRender: (text, record) => {
            text = record.isWin === 0 ? '赢' : record.isWin === 1 ? '输' : '--'
            return (
              <a-button
                on-click={() => {
                  this.$router.push(
                    liveUrl({
                      matchId: record.matchId || record.match_id,
                      tab: 4,
                      gameType: this.gameType
                    })
                  )
                }}
              >
                赛后分析
              </a-button>
            )
          },
          customHeaderCell: headerStyle
        }
      ],
      historyLoding: false,
      matchColums: [
        {
          title: '赛事',
          align: 'left',
          fixed: true,
          customHeaderCell: headerStyle,
          width: 180,
          customRender: (text, record) => {
            return (
              // <div>
              //   <img src={record.leagueLogo} class="tableIcon" alt="" />
              //   <span>{record.leagueShortName}</span>
              // </div>
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

      heroListColums: [
        {
          title: '英雄',
          align: 'left',
          fixed: true,
          customHeaderCell: headerStyle,
          width: 160,
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
          title: '场均杀人数',
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

      matchList: {},
      matchListLoading: false,
      dataListCurIndex: 0,

      historyList: {},
      heroLoading: false,
      playerCompositeStatsList: {},

      playerHeroStatsPageList: {}
    }
  },
  watch: {
    dataListCurIndex (val) {
      switch (val) {
        case 0:
          this.getLeaguePlayerStatsList()
          break
        case 1:
          this.getPlayerCompositeStats()
          break
        case 2:
          this.getPlayerHeroStatsPageList()
          break
      }
    }
  },
  mounted () {
    this.apiByGameType = getDataByGameType(this.gameType)(this.$axios)
    this.playerId = this.$route.params.id
    this.getHistory()
    this.getLeaguePlayerStatsList()
  },
  methods: {
    getHistory (agument) {
      this.historyLoding = true
      const params = Object.assign(
        {
          playerId: this.playerId
        },
        agument
      )
      this.apiByGameType.player
        .battleHis(params)
        .then((res) => {
          this.historyList = res
          this.historyLoding = false
        })
        .catch(() => {
          this.historyLoding = false
        })
    },
    // 获取 选手联赛数据
    getLeaguePlayerStatsList (agument) {
      this.matchListLoading = true
      const params = Object.assign(
        {
          playerId: this.playerId
        },
        agument
      )
      this.apiByGameType.player
        .leaguePlayerStatsList(params)
        .then((res) => {
          this.matchList = res
          this.matchListLoading = false
        })
        .catch(() => {
          this.matchListLoading = false
        })
    },
    // 获取 LOL选手综合资料
    getPlayerCompositeStats () {
      const params = {
        playerId: this.playerId
      }
      this.apiByGameType.player.playerCompositeStats(params).then((res) => {
        this.playerCompositeStatsList = res
      })
    },
    // 选手英雄数据
    getPlayerHeroStatsPageList (agument) {
      this.heroLoading = true
      const params = Object.assign(
        {
          playerId: this.playerId
        },
        agument
      )
      this.apiByGameType.player
        .playerHeroStatsPageList(params)
        .then((res) => {
          console.log(res)
          this.playerHeroStatsPageList = res
          this.heroLoading = false
        })
        .catch(() => {
          this.heroLoading = false
        })
    }
  },
  render () {
    const {
      historyColums,
      historyList,
      historyLoding,
      getHistory,
      dataListCurIndex,
      matchColums,
      matchList,
      getLeaguePlayerStatsList,
      playerCompositeStatsList,
      heroListColums,
      playerHeroStatsPageList,
      getPlayerHeroStatsPageList,
      matchListLoading,
      heroLoading
    } = this
    return (
      <div class="playerLol content">
        <div class="dataListBox">
          <div class="title">历史比赛数据</div>
          <MatchTableList
            colums={historyColums}
            on-changePage={(val) => {
              getHistory(val)
            }}
            listData={historyList}
            loading={historyLoding}
            scroll={{ x: 1400 }}
          />
        </div>

        <div class="dataListBox">
          <TabList
            tabTypeList={LOL_PLAYER_TAB_LIST}
            currentIndex={dataListCurIndex}
            on-change={(val) => {
              this.dataListCurIndex = val
            }}
          >
            <MatchTableList
              colums={matchColums}
              listData={matchList}
              loading={matchListLoading}
              slot={0}
              scroll={{ x: 2000 }}
              on-changePage={(val) => {
                getLeaguePlayerStatsList(val)
              }}
            />
            <StatisticsExhibit slot={1} data={playerCompositeStatsList} />
            <MatchTableList
              colums={heroListColums}
              listData={playerHeroStatsPageList}
              slot={2}
              scroll={{ x: 1200 }}
              loading={heroLoading}
              on-changePage={(val) => {
                getPlayerHeroStatsPageList(val)
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
}
.isWin {
  span {
    display: inline-block;
    width: 24px;
    height: 24px;
    border-radius: 4px;
    background-color: #f4f4f4;
    color: #333333;
    line-height: 24px;
    text-align: center;
  }
}
.win {
  // background-color: #3399ee;
  color: #fff;
}
</style>
