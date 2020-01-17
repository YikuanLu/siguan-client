<template>
  <div class="article">
    <div class="wrap-box">
      <div id="scroll-top"></div>
      <a-anchor>
        <GameTypes
          class="game-types"
          :data="gameTypes"
          :loading="loading"
          @switchTab="switchInfoTab"
        ></GameTypes>
        <type-tabs
          :value="infoParams.type"
          :data="articleType"
          :loading="loading"
          @switchTab="switchInfoTypeTab"
        ></type-tabs>
      </a-anchor>
      <div class="left">
        <type-tabs
          :value="infoParams.articleCategoryId"
          :data="curArtCates"
          :loading="loading"
          @switchTab="switchInfoCateTab"
        ></type-tabs>
        <info-list
          :loading="loading"
          :loadMore="isLoadMore"
          :finished="finished"
          :listData="infoListData"
          :page="infoParams.pageNum"
          @setLoadMore="isLoadMore=true"
          @loadMore="loadMore"></info-list>
      </div>
      <div class="right">
        <Ad class="ad" :width="300" :imgs="imgs"></Ad>
        <sider-box class="sider" :title="'热门视频'" :moreLink="'/'">
          <SiderVideos></SiderVideos>
        </sider-box>
        <sider-box class="sider" :title="'热门图集'" :moreLink="'/'">
          <SiderPictures></SiderPictures>
        </sider-box>
        <sider-box class="sider" :title="'热门资讯'" >
          <SiderInformations></SiderInformations>
        </sider-box>
      </div>
    </div>
  </div>
</template>

<script>
import GameTypes from '~/components/common/GameTypes'
import TypeTabs from '~/components/common/TypeTabs'
import Ad from '~/components/common/Ad'
import SiderBox from '~/components/siderBox'
import InfoList from '~/components/news/InfoList'
import { GAME_TYPE_LIST } from '~/assets/js/types'
import { informationApi } from '~/api'
import {
  SiderInformations,
  SiderVideos,
  SiderPictures
} from '~/components/siderBox/components'
export default {
  name: 'GameInformation',
  components: {
    GameTypes,
    TypeTabs,
    Ad,
    SiderBox,
    InfoList,
    SiderInformations,
    SiderVideos,
    SiderPictures
  },
  head () {
    let gameType = this.gameType
    if (gameType === 'dota') { gameType = 'dota2' }
    const titText = gameType ? gameType.toUpperCase() : '电竞'
    return {
      title: `${titText}资讯_电竞比分网_LOL比赛直播|DOTA2分析|CSGO比分数据查询-尚牛电竞`
    }
  },
  data () {
    return {
      imgs: [
        {
          path: require('@/static/img/game-types/demo.png'),
          url: '/news/11'
        },
        {
          path: require('@/static/img/game-types/demo.png'),
          url: '/news/22'
        }
      ],
      gameType: '',
      gameTypes: GAME_TYPE_LIST, // 游戏类型

      articleCategory: [], // 文章分类
      curArtCates: [], // 当前文章选项

      articleType: [], // 资讯的3大分类

      infoParams: { // 文章资讯筛选参数
        pageNum: 1,
        gameType: '',
        type: 'article',
        articleCategoryId: ''
      },
      infoListData: [], // 文章列表数据
      loading: false, // 是否处于加载状态
      isLoadMore: false, // 是否处于加载更多状态
      finished: false, // 当前是否已加载完状态
      isInit: true
    }
  },
  async asyncData ({ $axios, params, redirect }) {
    if (params.gameType === 'all') {
      redirect('/news')
      return
    }
    // 获取资讯列表
    const infoParams = {
      pageNum: 1,
      gameType: params.gameType,
      type: 'article',
      articleCategoryId: ''
    }

    const { rows } = await $axios.get(informationApi.infoList, { params: infoParams })

    return {
      infoListData: rows,
      gameType: params.gameType || ''
    }
  },
  created () {
    this.articleType = [
      {
        name: '资讯',
        id: 'article'
      },
      {
        name: '图集',
        id: 'picture'
      },
      {
        name: '视频',
        id: 'video'
      }
    ]
    Object.assign(this.infoParams, {
      gameType: this.gameType
    })

    this.getArtCates()
  },
  mounted () {
    this.$nextTick(() => {
      this.initTab()
    })
  },
  methods: {
    initTab () {
      const query = this.$route.query
      if (query.category) {
        this.isInit = false
        this.infoParams.articleCategoryId = query.category
      }
    },
    resetData () {
      this.loading = true
      this.isLoadMore = false
      this.finished = false
      this.infoParams.pageNum = 1
      this.infoListData = []
    },
    getList () {
      if (this.finished) { return }
      this.$axios.get(informationApi.infoList, { params: this.infoParams }).then((res) => {
        this.isLoadMore = false
        this.loading = false
        if (!res.rows || !res.rows.length) {
          this.finished = true
        } else {
          this.infoListData = [...this.infoListData, ...res.rows]
        }
      })
    },
    getArtCates () {
      this.$axios.get(informationApi.infoCates).then((res) => {
        this.articleCategory = res
        this.switchInfoTypeTab(this.infoParams.type)
      })
    },
    loadMore (val) {
      this.infoParams.pageNum = val
      this.getList()
    },
    switchInfoTab (val) {
      if (this.gameType === val || (val === 'all' && this.infoParams.gameType === '')) { return }
      this.resetData()

      this.infoParams.gameType = val
      this.$router.replace(`/news/${val}`)
    },
    switchInfoTypeTab (val) {
      this.infoParams.type = val
      this.infoParams.articleCategoryId = ''
      const curTypes = this.articleCategory[val]
      this.curArtCates = [...[{
        id: '',
        name: '全部'
      }], ...curTypes]
      if (!this.isInit) {
        this.resetData()
        this.getList()
      }
      this.isInit = false
      this.scrollTop()
    },
    switchInfoCateTab (val) {
      this.resetData()
      this.infoParams.articleCategoryId = val
      this.getList()
    },
    scrollTop () {
      this.$nextTick(() => {
        if (process.client) {
          document.getElementById('scroll-top').scrollIntoView({ behavior: 'smooth' })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .article{
    overflow: hidden;
    margin: 20px auto 30px;
    min-height: 700px;
  }
  .info-tabs{
    width: 70px;

  }
  .left{
    float: left;
    width: 890px;
    margin-right: 10px;
    background: #fff;
  }
  .right{
    float: right;
    width: 300px;
  }
  .ad{
    margin-bottom: 10px;
    height: 170px;
    overflow: hidden;
  }
  .sider{
    margin-bottom: 10px;
  }
  .game-types.game-types-tab {
    justify-content: flex-start;
    margin: 0 auto;
    /deep/ .item {
      margin-right: 70px;
    }
  }
</style>
