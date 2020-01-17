<script>
/**
 * 列表刷新图标状态组件
 * 用法
 **/
import { mapState } from 'vuex'
export default {
  name: 'ListLoading',
  props: {
    /* isLoading: {
      type: Boolean,
      default: false
    } */
  },
  data () {
    return {}
  },
  computed: {
    ...mapState(['loading'])
  },
  methods: {},
  render () {
    const { loading } = this
    let loadingBlock
    loading ? loadingBlock = (
      <client-only>
        <div class="loading-status">
          <a-button shape="circle" loading />
        </div>
      </client-only>
    ) : loadingBlock = null
    return loadingBlock
  }
}
</script>
<style scoped lang="less">
.loading-status {
  margin: 10px auto;
  display: block;
  text-align: center;
}
</style>
