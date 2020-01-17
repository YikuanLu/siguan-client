<script>
import PubTable from '~/components/common/PubTable'
import TeamBattle from '~/components/match/scopedComponents/TeamBattle'
import {
  // headerStyle,
  formmatTimeParams,
  matchTeamUrl
} from '~/assets/js/config'
import { formatTime } from '~/assets/js/publicFn'
export default {
  name: 'TabTable',
  props: {
    type: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      default: () => []
    },
    dataSource: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: '积分榜'
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      boardColumns: [
        {
          title: '战队',
          align: 'left',
          dataIndex: 'teamName',
          customRender: (text, record) => (
            <TableLink
              url={matchTeamUrl({
                id: record.teamId,
                gameType: this.$route.params.gameType
              })}
              logo={record.teamLogo}
              name={record.teamShortName}
            />
          ),
          customHeaderCell: (column) => {
            return {
              style: {
                width: '135px'
              }
            }
          }
        },
        {
          title: '胜',
          align: 'left',
          dataIndex: 'winCount'
          // customHeaderCell: headerStyle
        },
        {
          title: '负',
          align: 'left',
          dataIndex: 'lostCount'
          // customHeaderCell: headerStyle
        },
        {
          title: '净胜分',
          align: 'left',
          dataIndex: 'score'
          // customHeaderCell: headerStyle
        }
      ],
      matchColumns: [
        {
          title: '时间',
          align: 'center',
          // customHeaderCell: headerStyle,
          customRender: (text, record) => (
            <span>{formatTime(record.matchTime, formmatTimeParams)}</span>
          ),
          customHeaderCell: (column) => {
            return {
              style: {
                width: '147px'
              }
            }
          },
          width: 147
        },
        {
          title: '赛制',
          align: 'left',
          // customHeaderCell: headerStyle,
          customRender: (text, record) => <span>BO{record.bo}</span>,
          customHeaderCell: (column) => {
            return {
              style: {
                width: '60px'
              }
            }
          },
          width: 60
        },
        {
          title: '战队vs战队',
          align: 'center',
          dataIndex: 'teamName',
          customRender: (text, record) => (
            <div style={{ width: '100%' }}>
              <TeamBattle record={record || {}} />
            </div>
          )
        }
      ],
      columns: [],
      current: 0
    }
  },
  watch: {
    data (val) {
      this.current = 0
    }
  },
  methods: {
    tabChange (val) {
      this.$emit('tabChange', val)
      this.current = val
    }
  },
  render () {
    const {
      data,
      title,
      current,
      type,
      boardColumns,
      matchColumns,
      dataSource,
      tabChange,
      loading
    } = this
    const columns = type === 'board' ? boardColumns : matchColumns
    return (
      <div class="tabContent">
        <div class="header">{title}</div>
        <a-tabs
          activeKey={current}
          tabPosition="top"
          animated={false}
          tabBarGutter={20}
          on-change={(val) => {
            tabChange(val)
          }}
        >
          {data.map((item, index) => {
            return (
              <a-tab-pane tab={item || '比赛'} key={index}>
                <div class="body">
                  <PubTable
                    columns={columns}
                    loading={loading}
                    data={dataSource}
                    scroll={{
                      // x: 200,
                      y: 300
                    }}
                  />
                </div>
              </a-tab-pane>
            )
          })}
        </a-tabs>
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
@import url('../style.less');
</style>
