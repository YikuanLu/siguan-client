<script>
import PublicHeader from '@/components/user/modules/components/PublicHeader'
import EditPage from '@/components/user/modules/components/EditPage'
export default {
  name: 'PicturesEdit',
  components: {
    PublicHeader,
    EditPage
  },
  data () {
    return {}
  },
  render () {
    return (
      <div class="edit">
        <PublicHeader title="我的图集"></PublicHeader>
        <div class="body">
          <EditPage type="pictures" />
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
