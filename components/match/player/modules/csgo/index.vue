<script>
import MatchTableList from '~/components/match/scopedComponents/MatchTableList' // 列表类型数据展示组件
import TeamBattle from '~/components/match/scopedComponents/TeamBattle'
import StatisticsExhibit from '~/components/match/team/StatisticsExhibit' // 统计数据展示(非列表)

import { headerStyle, liveUrl, formmatTimeParams } from '~/assets/js/config'
import { formatTime } from '~/assets/js/publicFn'
import getDataByGameType from '~/api/getDataByGameType'

export default {
  name: 'PlayerCsgo',
  components: {
    MatchTableList,
    TeamBattle,
    StatisticsExhibit
  },
  props: {
    playerStats: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      historyColums: [
        {
          title: '时间',
          align: 'center',
          customRender: (text, record) => {
            return <div>{formatTime(record.matchTime, formmatTimeParams)}</div>
          },
          customHeaderCell: headerStyle
        },
        {
          title: '战队vs战队',
          align: 'center',
          width: 300,
          customRender: (text, record) => {
            return <TeamBattle isShowScore={false} record={record || {}} />
          },
          customHeaderCell: headerStyle
        },
        {
          title: '地图',
          align: 'center',
          customRender: (text, record) => (
            <img
              style={{
                width: '60px'
              }}
              src={require(`@/static/img/csgo/${record.mapName}.png`)}
              alt=""
            />
          ),
          customHeaderCell: headerStyle
        },
        {
          title: '胜负',
          align: 'center',
          customRender: (text, record) => {
            text =
              record.winStatus === 1
                ? '赢'
                : record.winStatus === 0
                  ? '平'
                  : record.winStatus === -1
                    ? '输'
                    : '--'
            return (
              <div class={`isWin ${record.winStatus === 0 ? 'win' : ''}`}>
                <span>{text}</span>
              </div>
            )
          },
          customHeaderCell: headerStyle
        },
        {
          title: '击杀',
          align: 'center',
          dataIndex: 'killCount',
          customHeaderCell: headerStyle
        },
        {
          title: '死亡',
          align: 'center',
          dataIndex: 'deathCount',
          customHeaderCell: headerStyle
        },
        {
          title: '助攻',
          align: 'center',
          dataIndex: 'assistCount',
          customHeaderCell: headerStyle
        },
        {
          title: '爆头数',
          align: 'center',
          dataIndex: 'headshotCount',
          customHeaderCell: headerStyle
        },
        {
          title: '首杀',
          align: 'center',
          dataIndex: 'firstKill',
          customHeaderCell: headerStyle
        },
        {
          title: 'KAST',
          align: 'center',
          dataIndex: 'kast',
          customHeaderCell: headerStyle
        },
        {
          title: '技术得分',
          align: 'center',
          dataIndex: 'rating',
          customHeaderCell: headerStyle
        },
        {
          title: '操作',
          align: 'center',
          customRender: (text, record) => {
            return (
              <a-button
                on-click={() => {
                  this.$router.push(liveUrl({
                    matchId: record.matchId || record.match_id,
                    tab: 4,
                    gameType: 'csgo'
                  }))
                }}
              >
                赛后分析
              </a-button>
            )
          },
          customHeaderCell: headerStyle
        }
      ],

      apiByGameType: {},
      gameType: 'csgo',

      historyList: {},
      historyLoding: false
    }
  },
  mounted () {
    this.apiByGameType = getDataByGameType(this.gameType)(this.$axios)
    this.playerId = this.$route.params.id
    this.getHistory()
  },
  methods: {
    // 获取历史数据
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
    }
  },
  render () {
    const {
      historyColums,
      historyList,
      historyLoding,
      getHistory,
      playerStats
    } = this
    return (
      <div class="playerCsgo content">
        <div class="dataListBox">
          <div class="title">历史比赛数据</div>
          <MatchTableList
            colums={historyColums}
            on-changePage={(val) => {
              getHistory(val)
            }}
            listData={historyList}
            loading={historyLoding}
            scroll={{ x: 1800 }}
          />
        </div>

        {/* <StatisticsExhibit /> */
          Object.keys(playerStats).length === 0 ? null : (
            <div class="slideList">
              <div class="title">选手综合统计</div>
              <StatisticsExhibit data={playerStats} />
            </div>
          )}
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
</style>
