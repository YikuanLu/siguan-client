<script>
import MatchTableList from '~/components/match/scopedComponents/MatchTableList' // 列表类型数据展示组件
import TeamBattle from '~/components/match/scopedComponents/TeamBattle'
import StatisticsExhibit from '~/components/match/team/StatisticsExhibit' // 统计数据展示(非列表)

import {
  headerStyle,
  formmatTimeParams,
  liveUrl
} from '~/assets/js/config'
import { formatTime } from '~/assets/js/publicFn'
import getDataByGameType from '~/api/getDataByGameType'
export default {
  name: 'PlayerDota',
  components: {
    MatchTableList,
    TeamBattle,
    StatisticsExhibit
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
          title: '英雄',
          align: 'center',
          customRender: (text, record) => (
            <img style={{ width: '26px' }} src={record.heroAvatar} alt="" />
          ),
          customHeaderCell: headerStyle
        },
        {
          title: '结果',
          align: 'center',
          customRender: (text, record) => {
            text =
              record.winStatus === 1
                ? '赢'
                : record.winStatus === 0
                  ? '输'
                  : record.winStatus === 2
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
          title: '金钱',
          align: 'center',
          dataIndex: 'gold',
          customHeaderCell: headerStyle
        },
        {
          title: '出装',
          align: 'center',
          customRender: (text, record) => {
            const playerItems = record.playerItems ? record.playerItems : []
            return (
              <div>
                {playerItems.map((item) => {
                  return (
                    <img
                      style={{ width: '26px', marginRight: '10px' }}
                      src={item.logo}
                      alt=""
                    />
                  )
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

      apiByGameType: {},
      gameType: 'dota',

      historyList: {},
      historyLoding: false,

      playerCompositeStatsList: {}
    }
  },
  mounted () {
    this.apiByGameType = getDataByGameType(this.gameType)(this.$axios)
    this.playerId = this.$route.params.id
    this.getHistory()
    this.getPlayerCompositeStats()
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
    },
    // 获取 DOTA选手综合资料
    getPlayerCompositeStats () {
      const params = {
        playerId: this.playerId
      }
      this.apiByGameType.player.playerCompositeStats(params).then((res) => {
        this.playerCompositeStatsList = res
      })
    }
  },
  render () {
    const {
      historyColums,
      historyList,
      historyLoding,
      playerCompositeStatsList,
      getHistory
    } = this
    return (
      <div class="playerDota content">
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
          <div class="title">选手近期综合数据</div>
          <StatisticsExhibit data={playerCompositeStatsList} />
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
</style>
