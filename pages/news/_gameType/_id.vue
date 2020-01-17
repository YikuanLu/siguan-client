<script>
import Breadcrum from '~/components/common/Breadcrum'
import Title from '~/components/news/details/Title'
// import ShareTabs from '~/components/news/details/ShareTabs'
import SiderBox from '~/components/siderBox'
import { informationApi } from '~/api'
import {
  SiderInformations,
  SiderVideos,
  SiderPictures
} from '~/components/siderBox/components'
import { GAME_TYPE_LIST } from '~/assets/js/types'
export default {
  props: {

  },
  data () {
    return {
      navData: [],
      details: {},
      commentData: [],
      commentParams: {
        pageNo: 1
      },
      gameType: '',
      isLoadMore: false, // 是否处于加载更多状态
      finished: false // 当前是否已加载完状态
    }
  },
  head () {
    const { title, keyword, briefContent } = this.details || {}
    return {
      title: title + ' - 尚牛电竞',
      meta: [
        { hid: 'description', name: 'description', content: briefContent },
        { hid: 'keywords', name: 'keywords', content: keyword }
      ]
    }
  },
  validate ({ params }) {
    // id必须有
    return params.id
  },
  async asyncData ({ $axios, params }) {
    // 获取资讯详情
    const detailParams = {
      params: { id: params.id }
    }

    const details = await $axios.get(informationApi.infoDetails, detailParams)

    return {
      details,
      gameType: params.gameType
    }
  },
  created () {
    this.$bus.on('reloadComment', (val) => {
      this.reGetList()
    })
  },
  beforeDestory () {
    this.$bus.off('reloadComment')
  },
  mounted () {
    this.setBreadCrum()
  },
  methods: {
    switchTab (val) {
      console.log(val)
    },
    setBreadCrum () {
      const { details } = this
      const curType = GAME_TYPE_LIST.filter(
        item => item.itemValue === this.gameType
      )
      this.navData = [
        {
          path: '/',
          name: '首页'
        },
        {
          path: '/news',
          name: '电竞资讯'
        },
        {
          path: `/news/${details.gameType}`,
          name: curType[0].itemText
        },
        {
          path: `/news/${details.gameType}?category=${details.articleCategoryId}`,
          name: details.category_dictText
        },
        {
          path: '#',
          name: `${details.title}`
        }
      ]
    },
    loadMore (val) {
      this.commentParams.pageNo = val
      this.getList()
    },
    getList () {
      if (this.finished) { return }
      this.$axios.get(informationApi.infoCommentList, { params: this.commentParams }).then((res) => {
        this.isLoadMore = false
        if (res.code !== 200 || !res.result.records.length) {
          this.finished = true
        } else {
          this.commentData = this.commentData.concat(res.result.records)
        }
      })
    },
    setLoadMore () {
      this.isLoadMore = true
    },
    reGetList () {
      this.commentParams.pageNo = 1
      this.finished = false
      this.isLoadMore = true
      this.$axios.get(informationApi.infoCommentList, { params: this.commentParams }).then((res) => {
        this.isLoadMore = false
        if (res.code !== 200 || !res.result.records.length) {
          this.finished = true
        } else {
          this.commentData = res.result.records
        }
      })
    }
  },
  render () {
    const {
      navData,
      // switchTab,
      details,
      gameType
      // commentData
    } = this
    const leftContent = (
      <div class="detail-content" domPropsInnerHTML={details.content}></div>
    )
    const leftDom = (
      <div class="left">
        <Title details={details} />
        {leftContent}
      </div>
    )
    const rightDom = (
      <div class="right">
        <SiderBox title="热门资讯" moreLink={`/news/${gameType}`}>
          <SiderInformations />
        </SiderBox>
        <SiderBox title="热门视频" moreLink="/">
          <SiderVideos />
        </SiderBox>
        <SiderBox title="热门图集" moreLink="/">
          <SiderPictures />
        </SiderBox>
      </div>
    )
    const dom = (
      <div class="info-details">
        <div class="wrap-box">
          <Breadcrum nav={navData} />
          {leftDom}
          {rightDom}
        </div>
      </div>
    )
    return dom
  }
}
</script>
<style lang="less" scoped>
.info-details {
  padding: 20px 0 30px;
  overflow: hidden;
  .info-tabs {
    width: 70px;
    position: fixed;
    left: 50%;
    top: 100px;
    transform: translateX(-680px);
    box-shadow: 0 0 2px 2px #ebebeb;
  }
  .left {
    float: left;
    width: 890px;
    margin: 10px 10px 0 0;
  }
  .right {
    float: left;
    width: 300px;
    .sider-box {
      margin-top: 10px;
    }
  }
  .detail-content {
    padding: 40px;
    overflow: hidden;
    background: #fff;
    /deep/ * {
      line-height: 1.8em;
      font-size: 16px;
      margin-bottom: 10px;
    }
    /deep/ img, /deep/ video {
      width: 80%;
      margin: auto;
      display: block;
    }
  }
}
</style>
