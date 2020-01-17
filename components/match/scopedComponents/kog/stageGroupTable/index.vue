<script>
import PubTable from '~/components/common/PubTable'
import NoData from '~/components/common/Nodata'
import TeamBattle from '~/components/match/scopedComponents/TeamBattle'
import {
  // headerStyle,
  formmatTimeParams,
  matchTeamUrl
} from '~/assets/js/config'
import { formatTime } from '~/assets/js/publicFn'
export default {
  name: 'KogStageGroupTable',
  components: {
    PubTable,
    TeamBattle,
    NoData
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '常规赛'
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      detailColums: [
        {
          title: '时间',
          align: 'center',
          customRender: (text, record) => (
            <span>{formatTime(record.matchTime, formmatTimeParams)}</span>
          ),
          customHeaderCell: (column) => {
            return {
              style: {
                width: '147px'
              }
            }
          }
        },
        {
          title: '赛制',
          align: 'center',
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
          customRender: (text, record) => <TeamBattle record={record || {}} />
          // customHeaderCell: headerStyle
          // width: 300
        }
      ],
      totalColums: [
        {
          title: '战队',
          align: 'center',
          dataIndex: 'teamName',
          customRender: (text, record) => (
            <TableLink
              url={matchTeamUrl({
                id: record.teamId,
                gameType: this.$route.params.gameType
              })}
              logo={record.logo}
              name={record.shortName}
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
          align: 'center',
          dataIndex: 'winCount'
          // customHeaderCell: headerStyle
          // width: 130
        },
        {
          title: '负',
          align: 'center',
          dataIndex: 'loseCount'
          // customHeaderCell: headerStyle
          // width: 130
        },
        {
          title: '净胜分',
          align: 'center',
          dataIndex: 'clearWinCount'
          // customHeaderCell: headerStyle
          // width: 130
        }
      ]
    }
  },
  render () {
    // total => 积分榜
    // detail => 详情
    const { title, data, detailColums, totalColums, loading } = this
    console.log(title)
    // console.log('data', data)
    const { total = [], detail = [] } = data

    const isTotal = total.length > 0
    const isDetail = detail.length > 0

    const totalView = (
      <div class={`total itemVm ${!isDetail ? 'widthFull' : ''}`}>
        <div class="header">积分榜</div>
        <PubTable
          columns={totalColums}
          data={total}
          loading={loading}
          scroll={{
            y: 300
          }}
        />
      </div>
    )

    const detailView = (
      <div class={`detail itemVm ${!isDetail ? 'widthFull' : ''}`}>
        <div class="header">{title}</div>
        <PubTable
          columns={detailColums}
          data={detail}
          loading={loading}
          scroll={{
            y: 300
          }}
        />
      </div>
    )

    const dataNone = (
      <div class="noData">
        <NoData />
      </div>
    )

    return (
      <div class="kogStageGroupTable">
        {isTotal ? totalView : null}
        {isDetail ? detailView : null}
        {!isTotal && !isDetail ? dataNone : null}
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
.kogStageGroupTable {
  padding: 0 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  .total {
    width: 40%;
  }
  .detail {
    width: 60%;
  }
  .itemVm {
    padding: 0 10px 20px;
  }
  .widthFull {
    width: 100% !important;
  }
  .noData {
    width: 100%;
    padding: 20px;
  }
  .header {
    // text-align: center;
    padding-left: 14px;
    font-size: 16px;
    border-bottom: 1px solid #e8e8e8;
    line-height: 38px;
    position: relative;
    margin-bottom: 20px;
    &::before {
      content: '';
      position: absolute;
      width: 4px;
      height: 16px;
      background-color: #5cb8fa;
      left: 0;
      top: 50%;
      margin-top: -8px;
    }
  }
}
</style>
