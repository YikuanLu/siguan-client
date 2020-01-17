<template>
  <div>
    <div class="wrap-box">
      <breadcrum
        class="breadcrum"
        :nav="navData"></breadcrum>
      <game-types
        class="game-types"
        :showIcon="true"
        :showAll="false"
        @switchTab="switchTab"></game-types>
      <TypeTabs
        :data="types"
        :loading="loading"
        :value="formData.type"
        @switchTab="switchTypeTab"
      ></TypeTabs>
      <VideoList></VideoList>
    </div>
  </div>
</template>

<script>
import Breadcrum from '~/components/common/Breadcrum'
import GameTypes from '~/components/common/GameTypes'
import TypeTabs from '~/components/common/TypeTabs'
import VideoList from '~/components/news/VideoList'

export default {
  name: 'GamePictures',
  components: {
    Breadcrum,
    GameTypes,
    TypeTabs,
    VideoList
  },
  data () {
    return {
      navData: [
        {
          name: '首页',
          path: '/'
        },
        {
          name: '赛事赛程',
          path: '/match'
        },
        {
          name: '电竞资讯',
          path: '/news'
        },
        {
          name: '视频集合',
          path: '#'
        }
      ],
      types: [
        {
          dictId: '',
          itemText: '全部视频',
          itemValue: 'all'
        },
        {
          dictId: '1',
          itemText: '赛事视频',
          itemValue: '1'
        },
        {
          dictId: '2',
          itemText: '游戏视频',
          itemValue: '2'
        },
        {
          dictId: '3',
          itemText: '搞笑视频',
          itemValue: '3'
        },
        {
          dictId: '4',
          itemText: '场边花絮',
          itemValue: '4'
        },
        {
          dictId: '5',
          itemText: '其他',
          itemValue: '5'
        }
      ],
      loading: false,
      formData: {
        pageNo: 1,
        type: 'all'
      }
    }
  },
  head () {
    return {
      title: `电竞资讯-视频集合`,
      meta: [
        { hid: 'description', name: 'description', content: `电竞资讯-视频集合` },
        { hid: 'keywords', name: 'keywords', content: `电竞资讯-视频集合` }
      ]
    }
  },
  created () {

  },
  destroyed () {

  },
  methods: {
    switchTab (val) {
      console.log(`当前tab是${val}`)
    },
    switchTypeTab (val) {
      console.log(`当前tab是${val}`)
      this.formData.type = val
    }
  }
}
</script>
<style lang="less" scoped>
  .breadcrum{
      margin-top: 20px;
    }
  .game-types{
    justify-content: flex-start;
    margin: 10px auto;
      /deep/ .item{
      margin-right: 70px;
    }
  }
</style>
