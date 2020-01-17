<script>
export default {
  name: 'PublicHeader',
  props: {
    title: {
      type: String,
      default: '头部'
    }
  },
  data () {
    return {}
  },
  render () {
    const { title, $slots } = this
    const Vm = $slots.default
    return (
      <div class="publicHeader clearfix">
        <span class="title">{title}</span>
        {Vm}
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
.publicHeader {
  font-size: 16px;
  padding: 18px 28px;
  color: @primary-color;
  border-bottom: 1px solid #f5f5f5;
  span.title {
    font-size: 16px;
    color: #333333;
    display: inline-block;
    line-height: 26px;
    font-weight: 500;
  }
}
</style>
