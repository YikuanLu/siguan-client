<script>
/**
 * 个人中心页面  布局
 * 个人中心列表数据放在store里面，通过commit触发变更
 * RESET_LISTDATA 重置分页和列表数据
 * @function SET_PAGESIZE 更新 @pagesize 每页展示条数
 * @function SET_CURRENT 更新 @current 当前页码
 *
 */
import { mapState } from 'vuex'
import { UserInfor, TypeList } from '@/components/user/'
export default {
  components: {
    UserInfor,
    TypeList
  },
  data () {
    return {
      headPic: '',
      nickName: '',
      currentType: 'collection',
      typeCurIndex: 0
    }
  },
  head () {
    return {
      title: `个人中心`
    }
  },
  computed: {
    ...mapState('user', {
      userInfo: state => state.userInfo
    })
  },
  watch: {
    'userInfo.headPic' (val) {
      console.log(val)
      this.headPic = val
    },
    'userInfo.nickName' (val) {
      console.log(val)
      this.nickName = val
    }
  },
  mounted () {
    this.nickName = this.userInfo && this.userInfo.nickName ? this.userInfo.nickName : ''
    this.headPic = this.userInfo && this.userInfo.headPic ? this.userInfo.headPic : ''
    this.$store.commit('RESET_LISTDATA')
  },
  beforeDestroy () {
    this.$store.commit('RESET_LISTDATA')
  },
  methods: {
    change (val) {
      this.typeCurIndex = val.index
      this.currentType = val.data.type
    }
  },
  render () {
    const { headPic, nickName, change } = this
    return (
      <div class="customer">
        <UserInfor headPic={headPic} nickName={nickName} />
        <div class="body wrap-box clearfix">
          <div class="fl type">
            <TypeList
              curIndex={this.typeCurIndex}
              on-changeType={(val) => {
                change(val)
              }}
            />
          </div>
          <div class="content fl">
            <NuxtChild />
          </div>
        </div>
      </div>
    )
  }
}
</script>
<style lang="less" scoped>
.customer {
  .body {
    min-height: 500px;
    margin: 20px auto;
    .type {
      width: 250px;
      margin-right: 10px;
      background-color: #ffffff;
    }
    .content {
      width: 940px;
      min-height: 500px;
      background-color: #fff;
    }
  }
}
</style>
