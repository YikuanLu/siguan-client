<script>
import TabList from '~/components/common/TabList' // Tab切换组件
import MatchTableList from '~/components/match/scopedComponents/MatchTableList' // 列表类型数据展示组件
import TeamBattle from '~/components/match/scopedComponents/TeamBattle'
import BtnGroup from '~/components/match/team/BtnGroup'
import { MATCH_TAB_LIST } from '~/assets/js/types'
import {
  headerStyle,
  formmatTimeParams,
  // matchTeamUrl,
  // matchPlayerUrl,
  matchLeagueUrl
} from '~/assets/js/config'
import { formatTime } from '~/assets/js/publicFn'
import getDataByGameType from '~/api/getDataByGameType'
export default {
  name: 'TeamOw',
  components: {
    TabList,
    MatchTableList,
    TeamBattle,
    BtnGroup
  },
  data () {
    return {
      gameType: 'ow',
      teamId: '',
      colums: [
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
          // width: 100,
          customRender: (text, record) => {
            return (
              <TableLink
                url={matchLeagueUrl({
                  id: record.leagueId,
                  gameType: this.gameType
                })}
                // align= 'center'
                logo={record.leagueLogo}
                name={record.leagueName}
              />
            )
          }
        },
        {
          align: 'center',
          width: 60,
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
          width: 190,
          customRender: (text, record) => {
            return <BtnGroup data={record} />
          }
        }
      ],
      current: 0,
      listData: {},
      loading: false
    }
  },
  watch: {
    current (val) {
      const status = MATCH_TAB_LIST[val].type
      this.getMatchPageList({ status })
    }
  },
  mounted () {
    this.apiByGameType = getDataByGameType(this.gameType)(this.$axios)
    this.teamId = this.$route.params.id
    this.getMatchPageList()
  },
  methods: {
    getMatchPageList (agument) {
      this.loading = true
      const obj = {
        teamId: this.teamId
      }
      const params = Object.assign(obj, agument)
      this.apiByGameType.team
        .matchPageList(params)
        .then((res) => {
          this.listData = res
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  },
  render () {
    const { current, listData, colums, loading } = this
    return (
      <div>
        <div class="tabListBox">
          <TabList
            tabTypeList={MATCH_TAB_LIST}
            currentIndex={current}
            on-change={(val) => {
              this.current = val
            }}
          >
            <MatchTableList
              showHeader={false}
              listData={listData}
              colums={colums}
              loading={loading}
              scroll={{ x: 1100 }}
              on-changePage={(val) => {
                const params = Object.assign(
                  {
                    status: MATCH_TAB_LIST[current].type
                  },
                  val
                )
                this.getMatchPageList(params)
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
</style>
