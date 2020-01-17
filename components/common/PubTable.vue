<script>
export default {
  name: 'PubTable',
  props: {
    data: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    scroll: {
      type: Object,
      default: () => {}
    },
    loading: {
      type: Boolean,
      default: false
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    rowKey: {
      type: String,
      default: 'id'
    }
  },
  data () {
    return {}
  },
  methods: {},
  render () {
    const { columns, data, scroll, loading, showHeader, rowKey } = this

    const props = {
      pagination: false,
      columns,
      dataSource: data,
      rowKey,
      scroll,
      loading,
      showHeader
    }

    return (
      <div
        class="box"
        style={
          showHeader
            ? null
            : {
              borderTop: '1px solid #e8e8e8'
            }
        }
      >
        <a-table {...{ props }} />
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
.box /deep/ .ant-table {
  border-left: 1px solid #f5f5f5;
  border-right: 1px solid #f5f5f5;
}
</style>
