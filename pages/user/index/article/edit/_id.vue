<script>
import EditPage from '@/components/user/modules/components/EditPage'
import PublicHeader from '@/components/user/modules/components/PublicHeader'
export default {
  name: 'ArticleEdit',
  components: {
    PublicHeader,
    EditPage
  },
  data () {
    return {}
  },
  methods: {},
  render () {
    return (
      <div class="edit">
        <PublicHeader title="我的文章"></PublicHeader>
        <div class="body">
          <EditPage />
        </div>
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
.body {
  padding: 28px;
}
</style>
