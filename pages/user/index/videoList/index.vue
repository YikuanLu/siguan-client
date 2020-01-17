<script>
import PublicHeader from '@/components/user/modules/components/PublicHeader'
import PicList from '@/components/user/modules/components/PicList'
export default {
  name: 'VideoList',
  components: {
    PublicHeader,
    PicList
  },
  props: {},
  data () {
    return {}
  },
  methods: {
    toEdit () {
      this.$router.push('/user/videoList/edit')
    }
  },
  render () {
    const { toEdit } = this
    return (
      <div class="videoList">
        <PublicHeader title="我的视频">
          <a-button class="fr" size="small" type="primary" ghost on-click={toEdit}>
            + 新增视频
          </a-button>
        </PublicHeader>
        <PicList type='video' />
      </div>
    )
  }
}
</script>
<style lang="less" scoped>

</style>
