<script>
import TableVm from '../collection/TableVm'
import { headerStyle } from '~/assets/js/config'
import GameTypes from '~/components/common/GameTypes'
import DeleteBtn from '@/components/user/modules/components/DeleteBtn'
export default {
  components: {
    TableVm,
    GameTypes
  },
  props: {
    type: {
      type: String,
      default: 'collection'
    },
    gameList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      pageNo: 1, // 当前页码
      pageSize: 10, // 展示条数
      columns: [
        {
          title: '赛事',
          align: 'center',
          dataIndex: 'name',
          customHeaderCell: headerStyle
        },
        {
          title: '时间',
          align: 'center',
          dataIndex: 'time',
          customHeaderCell: headerStyle
        },
        {
          title: '赛制',
          align: 'center',
          dataIndex: 'address',
          customHeaderCell: headerStyle
        },
        {
          title: '战队vs战队',
          align: 'center',
          dataIndex: 'age',
          customHeaderCell: headerStyle
        },
        {
          title: '数据',
          align: 'center',
          dataIndex: 'data',
          customHeaderCell: headerStyle
        },
        {
          title: '清空',
          align: 'center',
          customHeaderCell: headerStyle,
          customRender: (text, record) => (
            <DeleteBtn id="" />
          )
        }
      ]
    }
  },
  methods: {
    switchTab (val) {
    }
  },
  render () {
    const { switchTab, gameList, columns } = this
    return (
      <div class="contentBox">
        <GameTypes
          class="game-types"
          showIcon={true}
          showAll={false}
          on-switchTab={switchTab}
        />
        <div class="tableVm">
          <TableVm data={gameList} columns={columns} total={gameList.lenght} />
        </div>
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
@import url('../../style/public.less');
.contentBox {
  padding: 0 20px;
  .gameList {
    border-bottom: 1px solid #f5f5f5;
    .item {
      margin-right: 68px;
      padding: 20px 0;
      font-size: 16px;
      color: #212121;
      cursor: pointer;
      .icon {
        display: inline-block;
      }
      .text {
        display: inline-block;
        margin-left: 10px;
      }
    }
    .active {
      border-bottom: 4px solid @primary-color;
    }
  }
  .tableVm {
    padding: 20px;
  }
}
</style>
