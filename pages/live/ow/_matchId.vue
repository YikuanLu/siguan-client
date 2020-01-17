<template>
  <div>
    <div class="wrap-box">
      <Breadcrum class="breadcrum" :nav="navData"></Breadcrum>
      <LiveHeader :type="'ow'" :data="baseInfo"></LiveHeader>
      <div class="content clearfix">
        <div class="left">
          <client-only>
            <DetailsTab :gameType="'ow'" :data="baseInfo" :value="cur" @switchTab="switchDetailTab"></DetailsTab>
          </client-only>
          <!-- 全网指数 -->
          <div v-show="cur === 2">
            <div v-if="showBet && Object.keys(betData).length" class="round-box">
              <StatsRoundTab :data="betData"></StatsRoundTab>
              <StaticTable :data="betData" :type="'ow'" :baseInfo="baseInfo"></StaticTable>
            </div>
            <ListLoading v-if="!showBet"/>
            <Nodata v-if="showBet && !Object.keys(betData).length" class="no-data"></Nodata>
          </div>
          <!-- 赛前分析 -->
          <div v-show="cur === 3 || cur === 4">
            <div v-if="showProSpect && Object.keys(proSpectData).length" class="round-box">
              <div class="item-box">
                <p class="common-tit">历时对战记录(最近5场表现)</p>
                <HistoryGames :data="proSpectData" :teams="baseInfo"></HistoryGames>
              </div>
              <div class="item-box">
                <p class="common-tit">近期战绩(最近5场表现)</p>
                <RecentGames :data="proSpectData"></RecentGames>
              </div>
            </div>
            <ListLoading v-if="!showProSpect"/>
            <Nodata v-if="showProSpect && !Object.keys(proSpectData).length" class="no-data"></Nodata>
          </div>
          <!-- 赛事战报 -->
          <div v-show="cur === 5">
            <div v-if="showReport && Object.keys(reportData).length" class="info-details">
              <ReportTitle :details="{}"></ReportTitle>
              <div class="detail-content">123</div>
              <Comments class="comment-box"/>
            </div>
            <ListLoading v-if="!showReport"/>
            <Nodata v-if="showReport && !Object.keys(reportData).length" class="no-data"></Nodata>
            <Comments class="comment-box"/>
          </div>
        </div>
        <div class="right">
          <Ad class="ad" :width="300" :height="115" :imgs="imgs"></Ad>
          <sider-box class="sider" :title="'守望先锋视频'" :moreLink="'/'">
            <SiderVideos></SiderVideos>
          </sider-box>
          <sider-box class="sider" :title="'守望先锋图集'" :moreLink="'/'">
            <SiderPictures></SiderPictures>
          </sider-box>
          <sider-box class="sider" :title="'OW最新资讯'" :moreLink="'/news'">
            <SiderInformations></SiderInformations>
          </sider-box>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { importComponents } from '~/components/live/ow/components'
import { matchApi } from '~/api/index'
import {
  timingFn
} from '@/assets/js/publicFn'
export default {
  name: 'OwDetails',
  mixins: [importComponents],
  head () {
    const { baseInfo } = this
    const { leagueName, teamAShortName, teamBShortName } = baseInfo
    return {
      title: `${leagueName} ${teamAShortName}:${teamBShortName}|实时比分直播|比赛结果|历史比分数据分析 - 尚牛电竞`,
      meta: [
        { hid: 'description', name: 'description', content: '' }
      ]
    }
  },
  data () {
    return {
      navData: [
        {
          name: '首页',
          path: '/'
        },
        {
          name: '实时比分',
          path: '/live'
        }
      ],
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
      cur: 2,
      matchId: this.$route.params.matchId,
      curBattleId: '',
      baseInfo: {},
      betData: [],
      showBet: false,
      proSpectData: {},
      showProSpect: false,
      reportData: {},
      showReport: false
    }
  },
  validate ({ params }) {
    // 校验参数不通过，跳转404
    if (!params.matchId || params.matchId === 'undefined') {
      return false
    }
    return true
  },
  async asyncData ({ $axios, params }) {
    const baseInfoParams = {
      matchId: params.matchId
    }
    const [
      baseInfo
    ] = await Promise.all([
      $axios.get(matchApi.ow.match.basicInfo, { params: baseInfoParams })
    ])

    return {
      baseInfo
    }
  },
  created () {
    this.initBreadCrumb()
    this.switchDetailTab(2)
  },
  mounted () {
    console.log(this.baseInfo)
    this.$nextTick(() => {
      this.initTabOrder()
      this.timingData()
    })
  },
  methods: {
    timingData () {
      // 直播中
      if (this.baseInfo.status === 1) {
        // 定时器，实时刷新数据
        timingFn(this, () => {
          this.getBasicInfo()
        })
      }
    },
    getBasicInfo () {
      const params = {
        matchId: this.matchId
      }
      this.$axios.get(matchApi.ow.match.basicInfo, { params }).then((res) => {
        this.baseInfo = res
      })
    },
    initTabOrder () {
      // 如果地址栏有tab参数，需要跳转对应的tab栏目
      const params = this.$route.query
      if (params.tab) {
        this.cur = +params.tab
        this.switchDetailTab(this.cur)
      }
    },
    switchDetailTab (val) {
      this.cur = val
      this.$store.commit('SET_LOADING', true)
      if (val === 2) { // 全网指数
        this.getStaticData()
      }
      if (val === 3) { // 赛前分析
        this.getProSpectData()
      }
      if (val === 4) { // 赛后数据
        this.getAgData()
      }
      if (val === 5) { // 赛事战报
        this.ReportData()
      }
    },
    getStaticData () {
      // 获取数据
      const params = {
        matchId: this.matchId
      }
      this.$axios.get(matchApi.ow.match.betInfoList, { params }).then((res) => {
        this.betData = res
        // 获取完数据才能实例化组件，否则报错
        this.showBet = true
      })
    },
    getProSpectData () {
      const params = {
        matchId: this.matchId
      }
      this.$axios.get(matchApi.ow.match.prospect, { params }).then((res) => {
        this.proSpectData = res
        // 获取完数据才能实例化组件，否则报错
        this.showProSpect = true
        this.$store.commit('SET_LOADING', false)
      })
    },
    getAgData () {
      this.getProSpectData()
    },
    ReportData () {
      this.showReport = true
    },
    initBreadCrumb () {
      try {
        // 自定义面包屑导航
        const gameType = {
          name: `守望先锋`,
          path: `/match/ow`
        }
        const league = {
          name: this.baseInfo.leagueName,
          path: `/match/ow/league/${this.baseInfo.leagueId}`
        }
        const vsTeam = {
          name: `${this.baseInfo.teamAName || 'TBD'} vs ${this.baseInfo.teamBName || 'TBD'}`,
          path: this.$route.fullPath
        }
        this.navData.push(...[gameType, league, vsTeam])
      } catch (error) {

      }
    },
    switchRound (val) {
      // 切换局数
      this.curBattleId = val
      this.showLive = false
      this.$store.commit('SET_LOADING', true)
      this.getLiveData()
    }
  }
}
</script>

<style lang="less" scoped>
  .breadcrum{
    margin-top: 20px;
  }
  .content{
    margin-top: 10px;
    .left{
      width: 890px;
      float: left;
    }
    .right{
      width: 300px;
      float: right;
    }
    .ad, .sider{
      margin-bottom: 10px;
    }
    .round-box{
      background: #fff;
      margin-top: 10px;
      margin-bottom: 30px;
    }
    .chart-box{
      padding: 30px 20px;
      border-top: 1px solid #f5f5f5;
      border-bottom: 1px solid #f5f5f5;
      overflow: hidden;
      .economic-gap{
        float: left;
      }
      .gamedata-ratio{
        float: right;
      }
    }
    .comment-box{
      margin-bottom: 30px;
    }
    .common-tit{
      font-size: 16px;
      color: #999;
      border-top: solid 1px #f5f5f5;
      padding: 20px 0 29px 20px;
    }
    .item-box{
      padding-bottom: 30px;
    }
    .info-details{
      padding: 20px 0 30px;
      overflow: hidden;
      }
    .detail-content{
      padding: 40px;
      overflow: hidden;
      background: #fff;
    }
    .no-data{
      padding: 30px;
      background: #fff;
      margin-top: 10px;
    }
  }
</style>
