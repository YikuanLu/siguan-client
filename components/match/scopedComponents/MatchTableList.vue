<script>
import PubTable from '~/components/common/PubTable'

export default {
  name: 'MatchTableList',
  components: {
    PubTable
  },
  props: {
    colums: {
      type: Array,
      required: true
    },
    scroll: {
      type: Object,
      default: () => {
        return {
          x: 848
        }
      }
    },
    rowKey: {
      type: String,
      default: 'id'
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    listData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      currentIndex: 0,
      defaultPageSize: 10,
      defaultCurrent: 1,
      total: 0
    }
  },
  watch: {
    'listData.pageNum' (val) {
      this.defaultCurrent = val
    },
    'listData.total' (val) {
      this.total = val
    }
  },
  methods: {
    pageChange (val) {
      const parans = {
        pageNum: val,
        pageSize: this.defaultPageSize
      }
      this.$emit('changePage', parans)
    }
  },
  render () {
    const {
      defaultPageSize,
      defaultCurrent,
      total,
      pageChange,
      listData,
      colums,
      scroll,
      loading,
      showHeader,
      rowKey
    } = this

    const props = {
      hideOnSinglePage: true,
      defaultPageSize,
      defaultCurrent,
      total
    }

    return (
      <div class="matchTableList">
        <PubTable
          data={listData.rows ? listData.rows : []}
          columns={colums}
          scroll={scroll}
          loading={loading}
          showHeader={showHeader}
          rowKey={rowKey}
        />
        <a-pagination class="page" {...{ props, on: { change: pageChange } }} />
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
.matchTableList {
  padding: 20px;
  .page {
    margin: 20px 0;
    text-align: center;
  }
}
</style>
