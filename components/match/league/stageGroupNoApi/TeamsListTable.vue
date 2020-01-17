<script>
export default {
  name: 'TeamsListTable',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  watch: {

  },
  mounted () {
    // console.log(this.data)
  },
  render () {
    return (
      <div>
        TeamsListTable
      </div>
    )
  }
}
</script>

<style lang="less" scoped>

</style>
