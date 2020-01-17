<script>
import PublicHeader from '@/components/user/modules/components/PublicHeader'
import PicList from '@/components/user/modules/components/PicList'
export default {
  name: 'Pictures',
  components: {
    PublicHeader,
    PicList
  },
  props: {

  },
  data () {
    return {}
  },
  methods: {
    toEdit () {
      this.$router.push('/user/pictures/edit')
    }
  },
  render () {
    const { toEdit } = this
    return (
      <div class="pictures">
        <PublicHeader title="我的图集">
          <a-button class="fr" size="small" type="primary" ghost on-click={toEdit}>
            + 新增图集
          </a-button>
        </PublicHeader>
        <PicList type='img' />
      </div>
    )
  }
}
</script>
<style lang="less" scoped>

</style>
