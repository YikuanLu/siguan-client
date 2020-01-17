<script>
/**
* 资讯详情-标题组件
*/
import { informationApi } from '~/api'
import { formatTime } from '@/assets/js/publicFn'
export default {
  name: 'InfoDetailTitle',
  props: {
    details: {
      type: Object,
      default: () => {

      }
    }
  },
  data () {
    return {

    }
  },
  computed: {

  },
  created () {

  },
  methods: {
    collect (item) {
      const params = {
        articleId: item.id
      }
      this.$axios.post(informationApi.collect, params).then((res) => {
        if (res.code === 200) {
          this.$message.success(res.message)
          this.$set(this.details, 'meIsCollect', !item.meIsCollect)
        } else {
          this.$message.error(res.message)
        }
      })
    }
  },
  render () {
    const {
      details
    } = this
    console.log(details)
    const dom = (
      <div class="title-infos">
        <h2 class="title">{details.title}</h2>
        <div class="infos">
          <span class="time">{formatTime(details.createdTime, 'Y-M-D h:m:s')}</span>
          {/* <icon-font class="iconfont" type="iconyanjing"></icon-font>
          <span class="num">{details.clickTimes}</span>
          <icon-font
            title={details.meIsCollect ? '取消关注' : '关注'}
            class={{ iconfont: true, isCollect: details.meIsCollect }}
            type="iconshoucang"
            onClick={collect.bind(this, details)}
          ></icon-font>
          <span class="origin">文章来源：{details.sourceName || '--'}</span> */}
        </div>
      </div>
    )

    return dom
  }
}
</script>

<style lang="less" scoped>
  .title-infos{
    background: #fff;
    padding: 0 40px;
    .title{
      font-size: 24px;
      color: #333;
      font-weight: 600;
      padding: 30px 0;
    }
    .infos{
      color: #999;
      .time{
        font-size: 14px;
        padding-right: 60px;
      }
      .iconfont{
        font-size: 16px;
        color: #CBCBCB;
        vertical-align: middle;
        &.isCollect{
          color: @primary-color;
        }
      }
      .num{
        font-size: 12px;
        padding-left: 4px;
        padding-right: 19px;
      }
      .origin{
        float: right;
        font-size: 14px;
      }
    }
  }
</style>
