<script>
export default {
  name: 'TableVm',
  props: {
    data: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {}
  },
  methods: {
    onShowSizeChange (current, size) {
      console.log(current)
      console.log(size)
    }
  },
  render () {
    const { columns, data, onShowSizeChange, total } = this
    const paginationConfig = {
      showSizeChanger: true,
      onShowSizeChange,
      defaultCurrent: 1,
      hideOnSinglePage: true,
      total,
      style: {
        display: 'flex',
        justifyContent: 'center',
        float: 'none'
      }
    }
    return (
      <div class="box">
        <a-table
          pagination={paginationConfig}
          columns={columns}
          dataSource={data}
          rowKey="id"
        />
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
