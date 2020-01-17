<script>
export default {
  name: 'TableBox',
  props: {
    title: {
      type: String,
      default: '--'
    }
  },
  render () {
    const { title } = this
    const vm = this.$slots.default
    return (
      <div class="tableBox">
        <div class="header">
          {title}
        </div>
        <div class="body">
          {vm}
        </div>
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
.tableBox {
  background-color: #fff;
  margin-top: 10px;
  .header {
    padding: 20px;
    color: #212121;
    font-size: 16px;
    font-weight: 600;
  }
}
</style>
