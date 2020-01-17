<script>
/**
* 侧边栏资讯组件
* 用法
* import SiderInformations from '~/components/siderbox/SiderInformations'
* components: { SiderInformations }
* <sider-informations></sider-informations>
*/
import { timeFormat } from '~/assets/js/publicFn'
import { informationApi } from '~/api/index'
export default {
  name: 'SiderInformations',
  components: {},
  props: {
    fromIndex: { // 是否是首页模块，首页模块展示不一样
      type: Boolean,
      default: false
    },
    gameType: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      resData: [],
      defaultImg: require('@/assets/img/mr.jpg')
    }
  },
  created () {
    // 如果不是服务端请求数据，就用客户端请求
    if (!this.data) {
      this.getData()
    } else {
      this.resData = this.data
    }
  },
  methods: {
    getData () {
      const gameType = this.$route.params.gameType || this.gameType || ''
      const params = {
        pageNum: 1,
        pageSize: 6,
        type: 'article',
        gameType
      }
      this.$axios.get(informationApi.topArticle, { params }).then((res) => {
        this.resData = res.rows
      })
    },
    toDetail (item) {
      const routeData = this.$router.resolve({
        path: `/news/${item.gameType}/${item.id}`
      })
      window.open(routeData.href, '_blank')
    },
    toCateList (item) {
      const routeData = this.$router.resolve({
        path: `/news/${item.gameType}?category=${item.articleCategoryId}`
      })
      window.open(routeData.href, '_blank')
    }
  },
  render () {
    const { resData, fromIndex, toDetail, toCateList } = this
    const dom = (
      <div class={{ 'sider-box': true, fromIndex }}>
        {resData.map((item) => {
          return (
            <div class={['sider-item']}>
              <img onClick={toDetail.bind(this, item)} class="fl poster" src={item.coverPicUrl || this.defaultImg} alt=""/>
              <nuxt-link target="_blank" title={item.title} to={`/news/${item.gameType}/${item.id}`} class="title">{item.title}</nuxt-link>
              <div class="infos">
                <span class="time" onClick={toCateList.bind(this, item)}>
                  <GameTypeIcon type={item.gameType} class="type"/>
                  <span class="cate-text">{item.category_dictText}</span>
                </span>
                <span class="view-num">{timeFormat(item.createdTime)}</span>
              </div>
            </div>
          )
        })}
      </div>
    )
    return dom
  }
}
</script>

<style lang="less" scoped>
  .sider-box{
    background: #fff;
    &.fromIndex .sider-item{
      .poster{
        float: none;
        display: block;
        width: 100%;
        height: auto;
      }
      .title{
        margin: 4px auto;
        // -webkit-line-clamp: 1;
        // height: 16px;
      }
      .infos{
        margin-top: 6px;
      }
    }
    .sider-item{
      padding: 12px 14px;
      overflow: hidden;
      border-bottom: solid 1px rgba(236,239,244,1);
      .poster{
        width: 100px;
        height: 60px;
        margin: 0 11px 0 0;
        cursor: pointer;
        border-radius: 4px;
      }
      .title{
        line-height: 16px;
        font-size: 14px;
        color:rgba(51,51,51,1);
        white-space: normal;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        height: 32px;
        margin-bottom: 10px;
        overflow: hidden;
        &:hover{
          color: @primary-color;
        }
      }
      .cate-text{
        &:hover{
          cursor: pointer;
          color: @primary-color;
        }
      }
      .infos{
        position: relative;
        line-height: 0;
        margin-top: 12px;
      }
      .time{
        font-size: 12px;
        color:rgba(153,153,153,1);
        display: flex;
        align-items: center;
        .type{
          width: 16px;
          height: 16px;
          margin-right: 8px;
          font-size: 16px;
        }
      }
      .view-num{
        font-size: 12px;
        color:#999;
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        .iconfont{
          font-size: 20px;
          color: #c2c2c2;
          vertical-align: middle;
        }
      }
    }
  }
</style>
