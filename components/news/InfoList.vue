<script>
/**
* 电竞资讯-列表组件
**/
import { timeFormat } from '~/assets/js/publicFn'
import { informationApi } from '~/api'
export default {
  name: 'InformationList',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    loadMore: {
      type: Boolean,
      default: false
    },
    finished: {
      type: Boolean,
      default: false
    },
    listData: {
      type: Array,
      default: () => {
        return []
      }
    },
    page: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      loadText: '加载更多',
      defaultImg: require('@/assets/img/mr.jpg')
    }
  },
  computed: {
    isLoading () {
      return this.loading
    },
    isLoadMore: {
      get () {
        return this.loadMore
      },
      set (val) {
        this.$emit('setLoadMore', true)
      }
    }
  },
  methods: {
    loadMoreAction () {
      if (this.finished) { return }
      let page = this.page
      page++
      this.isLoadMore = true
      this.$emit('loadMore', page)
    },
    collect (item, index) {
      const params = {
        articleId: item.id
      }
      this.$axios.post(informationApi.collect, params).then((res) => {
        if (res.code === 200) {
          this.$message.success(res.message)
          this.$set(this.listData[index], 'meIsCollect', !item.meIsCollect)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    toDetails (item) {
      const routeData = this.$router.resolve({
        path: `/news/${item.gameType}/${item.id}`
      })
      window.open(routeData.href, '_blank')
    }
  },
  render () {
    const {
      listData,
      isLoading,
      finished,
      loadMoreAction,
      loadText,
      page,
      isLoadMore,
      // collect,
      toDetails
    } = this

    if (isLoading && page === 1) {
      this.$store.commit('SET_LOADING', true)
    } else {
      this.$store.commit('SET_LOADING', false)
    }

    const list = (
      <ul>
        <ListLoading />
        {listData.map((item, index) => {
          return <li>
            <img onClick={toDetails.bind(this, item)} class="poster" src={item.coverPicUrl || this.defaultImg} alt=""/>
            <nuxt-link target="_blank" to={`/news/${item.gameType}/${item.id}`} class="title">{item.title}</nuxt-link>
            <p onClick={toDetails.bind(this, item)} class="description">{item.briefContent}</p>
            <div class="status">
              <GameTypeIcon type={item.gameType} class="type-icon"/>
              <span class="type-text">{item.category_dictText}</span>
              <span class="time" onClick={toDetails.bind(this, item)}>{timeFormat(item.createdTime)}</span>
              <span class="btns">
                {/* <icon-font onClick={toDetails.bind(this, item)} class="iconfont" type="iconpinglun"></icon-font>
                <i class="num">{item.commentCount}</i>
                <icon-font onClick={toDetails.bind(this, item)} class="iconfont" type="iconyanjing"></icon-font>
                <i class="num">{item.clickTimes}</i>
                {/* <icon-font title={item.meIsCollect ? '取消收藏' : '收藏'} onClick={collect.bind(this, item, index)} class={{ iconfont: true, isCollect: item.meIsCollect }} type="iconshoucang"></icon-font> */}
              </span>
            </div>
          </li>
        })}
      </ul>
    )

    const loadMoreBtn = (
      <div class="loading-box">
        <a-button
          class="load-more"
          size="small"
          loading={isLoadMore}
          onClick={loadMoreAction}>
          {finished ? `到底啦` : loadText}
        </a-button>
      </div>
    )
    const dom = (
      <div class="info-list">
        {list}
        {listData && listData.length ? (
          loadMoreBtn
        ) : <Nodata style="padding: 30px;" />}
      </div>
    )
    return dom
  }
}
</script>
<style scoped lang="less">
  .info-list{
    li{
      overflow: hidden;
      border-bottom: solid 1px #f5f5f5;
      padding: 20px;
      .poster{
        width: 160px;
        height: 100px;
        float: left;
        margin-right: 20px;
        cursor: pointer;
      }
      .title{
        font-size: 18px;
        color: #333;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-bottom: 16px;
        display: block;
        &:hover{
          color: @primary-color;
          cursor: pointer;
        }
      }
      .description{
        font-size: 14px;
        color: #333;
        white-space: normal;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        line-height: 16px;
        cursor: pointer;
        height: 33px;
      }
      .status{
        padding-top: 11px;
        color: #999;
        font-size: 14px;
        display: flex;
        align-items: center;
        .type-icon{
          width: 20px;
          height: 20px;
          margin-right: 10px;
          font-size: 20px;
        }
        .type-text{
          color: @primary-color;
          font-size: 14px;
        }
        .time{
          padding-left: 20px;
          cursor: pointer;
        }
      }
      .btns{
        padding-left: 49px;
        font-size: 12px;
        color: #999;
        cursor: pointer;
        .iconfont{
          font-size: 18px;
          color: #C2C2C2;
          vertical-align: middle;
          &.isCollect{
            color: @primary-color;
          }
        }
        .num{
          font-style: normal;
          padding: 0 19px 0 6px;
        }
      }
    }
    .loading-box{
      padding: 16px 18px
    }
    .load-more{
      height:42px;
      background:#F4F4F4;
      font-size: 14px;
      color: #999;
      text-align: center;
      line-height: 42px;
      cursor: pointer;
      display: block;
      width: 100%;
      cursor: pointer;
    }
  }
</style>
