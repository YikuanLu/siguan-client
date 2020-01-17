<script>
import {
  // headerStyle,
  formmatTimeParams
} from '~/assets/js/config'
import { formatTime } from '~/assets/js/publicFn'

import TeamBattle from '~/components/match/scopedComponents/TeamBattle'
import PubTable from '~/components/common/PubTable'

export default {
  name: 'MatchListTable',
  components: {
    TeamBattle,
    PubTable
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      current: 0,
      columns: [
        {
          title: '时间',
          align: 'center',
          customHeaderCell: (column) => {
            return {
              style: {
                width: '147px'
              }
            }
          },
          width: 147,
          customRender: (text, record) => (
            <span>{formatTime(record.matchTime, formmatTimeParams)}</span>
          )
        },
        {
          title: '赛制',
          align: 'center',
          customHeaderCell: (column) => {
            return {
              style: {
                width: '60px'
              }
            }
          },
          width: 60,
          customRender: (text, record) => <span>BO{record.bo}</span>
        },
        {
          title: '战队vs战队',
          align: 'center',
          dataIndex: 'teamName',
          customRender: (text, record) => <TeamBattle record={record || {}} />
          // customHeaderCell: headerStyle
        }
      ]
    }
  },
  watch: {
    data (val) {
      this.current = 0
    }
  },
  render () {
    const { current, data, columns } = this
    return (
      <div class="tabContent">
        <div class="header">
          <a-tabs
            activeKey={current}
            tabPosition="top"
            animated={false}
            tabBarGutter={20}
            on-change={(val) => {
              this.current = val
            }}
          >
            {data.map((item, index) => {
              return (
                <a-tab-pane tab={item.stageName} key={index}>
                  <div class="body">
                    <PubTable
                      columns={columns}
                      data={item.matches}
                      scroll={{
                        y: 300
                      }}
                    />
                  </div>
                </a-tab-pane>
              )
            })}
          </a-tabs>
        </div>
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
.tabContent {
  padding: 0 10px;
}
</style>
