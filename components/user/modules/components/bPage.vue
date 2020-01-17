<script>
import { mapState } from 'vuex'
export default {
  name: 'Bpage',
  data () {
    return {}
  },
  computed: {
    ...mapState(['listData'])
  },
  methods: {
    onShowSizeChange (current, size) {
      this.$store.commit('SET_PAGESIZE', size)
      this.$emit('change')
    },
    change (current) {
      this.$store.commit('SET_CURRENT', current)
      this.$emit('change')
    }
  },
  render () {
    const { listData, onShowSizeChange, change } = this
    return (
      <div class="page">
        <a-pagination
          hideOnSinglePage
          showSizeChanger
          defaultPageSize={listData.pageSize}
          on-showSizeChange={onShowSizeChange}
          on-change={change}
          defaultCurrent={listData.current}
          total={listData.total}
        />
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
.page {
  width: 100%;
  text-align: center;
  margin: 20px 0;
}
</style>
