<template>
  <div class="main-box">
    <ThiredLogin/>
    <Banner :imgs="banners"></Banner>
    <div class="content-box">
      <div class="wrap-box clearfix">
        <div class="fl left">
          <sider-box :title="'热门赛事'" hoverTitle="电竞比分网直播赛事" :moreLink="'/match'">
            <SiderGameOngoing :data="hotLeague"></SiderGameOngoing>
          </sider-box>
          <Ad class="ad" :width="200" :height="76" :imgs="imgs"></Ad>
        </div>
        <div class="fl center">
          <div id="scroll-top"></div>
          <a-anchor>
            <game-types :showIcon="true" :showAll="true" @switchTab="switchTab"></game-types>
            <div class="sort-box">
              <day-tabs :gameType="sortData.gameType" :counts="countData" class="fl" @switchTab="switchDateTab"></day-tabs>
              <sort-types class="fr" @switchTab="switchTypeTab"></sort-types>
            </div>
          </a-anchor>
          <a-spin :spinning="isLoading">
            <div v-show="!sortType && matchList && Object.keys(matchList).length">
              <!-- 进行中 -->
              <game-list
                class="game-list"
                :data="matchList"
                :allLeague="allLeague"
                :onData="onGoingList"
                type="onGoing">
              </game-list>
              <!-- 未开始 -->
              <!-- 已结束 -->
              <game-list
                v-for="item in toDayType"
                :key="item"
                class="game-list"
                :data="matchList"
                :type="item">
              </game-list>
            </div>
            <Nodata v-if="!matchList || !Object.keys(matchList).length" style="padding: 30px;background: #fff;"></Nodata>

            <!-- 赛事排序 -->
            <game-list
              v-show="sortType === 'sortByGame'"
              :data="matchList"
              class="game-list"
              type="sortByGame"
            ></game-list>
          </a-spin>
        </div>
        <div class="fl right">
          <Ad class="ad" :width="200" :height="76" :imgs="imgs"></Ad>
          <sider-box class="sider" :title="'热门资讯'" :moreLink="'/news'" hoverTitle="最新电竞比分资讯">
            <SiderInformations :data="hotInfos" :fromIndex="true"></SiderInformations>
          </sider-box>
          <sider-box class="sider" :title="'热门视频'" :moreLink="'/'">
            <SiderVideos :fromIndex="true"></SiderVideos>
          </sider-box>
          <sider-box class="sider" :title="'热门图集'" :moreLink="'/'">
            <SiderPictures :fromIndex="true"></SiderPictures>
          </sider-box>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from '~/components/home/Banner'
import Ad from '~/components/common/Ad'
import GameList from '~/components/gameList'
import SiderBox from '~/components/siderBox'
import GameTypes from '~/components/common/GameTypes'
import SortTypes from '~/components/common/SortTypes'
import DayTabs from '~/components/home/DayTabs'
import ThiredLogin from '~/components/thiredLogin'
import {
  SiderInformations,
  SiderGameOngoing,
  SiderTeamOngoing,
  SiderScoreRank,
  SiderVideos,
  SiderPictures
} from '~/components/siderBox/components'

import { homeApi, informationApi } from '~/api'
import {
  getTodayZero,
  timingFn,
  sortOngingMethod,
  sortOngingLeague
} from '@/assets/js/publicFn'

const startTime = getTodayZero() // 当天0点
const endTime = getTodayZero(1) // 第二天0点
// const timeZone = new Date().getTimezoneOffset() / 60 // 时区

export default {
  name: 'Index',
  components: {
    Banner,
    Ad,
    GameList,
    SiderBox,
    GameTypes,
    SortTypes,
    DayTabs,
    SiderInformations,
    SiderGameOngoing,
    SiderTeamOngoing,
    SiderScoreRank,
    SiderVideos,
    SiderPictures,
    ThiredLogin
  },
  data () {
    return {
      banners: [],
      imgs: [
        {
          path: require('@/static/img/game-types/demo.png'),
          url: '/news/11'
        },
        {
          path: require('@/static/img/game-types/demo.png'),
          url: '/news/22'
        },
        {
          path: require('@/static/img/game-types/demo.png'),
          url: '/news/33'
        },
        {
          path: require('@/static/img/game-types/demo.png'),
          url: '/news/44'
        }
      ],
      isInit: true, // 判断是否是初次进来首页
      sortType: '',
      matchList: [],
      sortData: {
        gameType: 'all',
        startTime,
        endTime
      },
      isLoading: false,
      countData: [],
      toDayType: ['notStart', 'ended'],
      onGoingList: {},
      allLeague: {},
      hotLeague: {},
      hotInfos: []
    }
  },
  async asyncData ({ $axios, query, store }) {
    const params = {
      gameType: 'all',
      startTime,
      endTime
    }

    const infoParams = {
      pageNum: 1,
      pageSize: 6,
      type: 'article',
      gameType: ''
    }
    // pc端首页bannerID
    const bannerParams = {
      id: '1198855650349789185'
    }
    const [matchList, hotLeague, { rows: hotInfos }, banners] = await Promise.all([
      $axios.get(homeApi.matchList, { params }),
      $axios.get(homeApi.leagueList),
      $axios.get(informationApi.topArticle, { params: infoParams }),
      $axios.post(homeApi.banner, bannerParams)
    ])

    // 在服务端处理完数据再返回，页面源码才能填充进数据
    const sortLeagues = await sortOngingLeague(matchList).dataByLeagueId
    const onGoingList = await sortOngingMethod(sortLeagues, 1)
    const allLeague = await sortOngingLeague(matchList).allLeague

    return {
      allLeague,
      onGoingList,
      matchList,
      hotLeague,
      hotInfos,
      banners
    }
  },
  created () {},
  mounted () {
    this.getCountData()
    // 定时器，实时刷新数据
    timingFn(this, () => {
      this.getMatchData('timing')
      this.getCountData()
    })
  },
  methods: {
    resetStatus () {
      // 重置排序
      this.isLoading = true
    },
    switchTab (val) {
      // 由于第一次是服务端请求的，这边初始化就不请求数据了
      if (this.isInit) {
        this.isInit = false
        return
      }
      this.resetStatus()
      this.sortData.gameType = val
      this.getCountData()
      this.getMatchData()
    },
    switchTypeTab (val) {
      this.sortType === 'sortByGame'
        ? (this.sortType = '')
        : (this.sortType = 'sortByGame')
      this.scrollTop()
    },
    switchDateTab (val) {
      Object.assign(this.sortData, {
        startTime: val,
        endTime: val + 24 * 60 * 60 * 1000
      })
      this.resetStatus()
      this.getCountData()
      this.getMatchData()
    },
    getMatchData (timing) {
      this.$axios
        .get(homeApi.matchList, { params: this.sortData })
        .then(async (res) => {
          this.matchList = res
          this.isLoading = false
          const sortLeagues = await sortOngingLeague(this.matchList).dataByLeagueId
          this.onGoingList = await sortOngingMethod(sortLeagues, 1)
          this.allLeague = await sortOngingLeague(this.matchList).allLeague
          if (!timing) { this.scrollTop() }
        })
    },
    getCountData () {
      this.$axios
        .get(homeApi.dayQuantiy, { params: this.sortData })
        .then((res) => {
          this.countData = res
        })
    },
    scrollTop () {
      if (process.client) {
        document.getElementById('scroll-top').scrollIntoView({ behavior: 'smooth' })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.content-box {
  margin-bottom: 25px;
  clear: both;
  .left {
    width: 200px;
  }
  .center {
    width: 780px;
    margin: 0 10px;
  }
  .right {
    width: 200px;
  }
  .ad {
    margin: 0 0 10px;
    overflow: hidden;
  }
  .sort-box {
    padding: 20px;
    background: #fff;
    overflow: hidden;
  }
  .game-list {
    margin-bottom: 10px;
  }
  .sider{
    margin-bottom: 10px;
  }
}
.main-box{
  padding-top: 20px;
  background: url(../static/img/common/index-bg.jpg) no-repeat center -80px;
}
</style>
