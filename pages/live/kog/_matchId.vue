<template>
  <div>
    <div class="wrap-box">
      <Breadcrum class="breadcrum" :nav="navData"></Breadcrum>
      <LiveHeader :type="'kog'" :data="baseInfo"></LiveHeader>
      <LivePlatformTabs :type="'kog'"></LivePlatformTabs>
      <LiveGoing :type="'kog'"></LiveGoing>
      <div class="content clearfix">
        <div class="left">
          <client-only>
            <DetailsTab :data="baseInfo" :value="cur" @switchTab="switchDetailTab"></DetailsTab>
          </client-only>
          <!-- 全网指数 -->
          <div v-if="cur === 2">
            <div v-if="showBet && Object.keys(betData).length" class="round-box">
              <StatsRoundTab :data="betData"></StatsRoundTab>
              <StaticTable :data="betData" :type="'kog'" :baseInfo="baseInfo"></StaticTable>
            </div>
            <ListLoading v-if="!showBet"/>
            <Nodata v-if="showBet && !Object.keys(betData).length" class="no-data"></Nodata>
          </div>
          <!-- 赛前分析 -->
          <div v-if="cur === 3">
            <div v-if="showProSpect && Object.keys(proSpectData).length" class="round-box">
              <div class="item-box">
                <p class="common-tit">战队数据对比(最近一个月数据)</p>
                <TeamDataCompare :data="proSpectData"></TeamDataCompare>
                <TeamDataLine :data="proSpectData"></TeamDataLine>
              </div>
              <div class="item-box">
                <p class="common-tit">选手数据对比(最近一个月数据)</p>
                <PlayerDataCompare :data="proSpectData"></PlayerDataCompare>
              </div>
              <div class="item-box">
                <p class="common-tit">近期战绩(最近5场表现)</p>
                <RecentGames :data="proSpectData"></RecentGames>
              </div>
              <div class="item-box">
                <p class="common-tit">历史对战记录(最近5场表现)</p>
                <HistoryGames :data="proSpectData"></HistoryGames>
              </div>
            </div>
            <ListLoading v-if="!showProSpect"/>
            <Nodata v-if="showProSpect && !Object.keys(proSpectData).length" class="no-data"></Nodata>
          </div>
          <!-- 赛后数据 -->
          <div v-if="cur === 4">
            <LiveRoundTabs v-if="isInit" :data="LiveData" :index="curIndex" @switchTab="switchRound"></LiveRoundTabs>
            <div v-if="showLive && Object.keys(LiveData).length" class="round-box">
              <GameStatus :battleData="LiveData[curIndex]"></GameStatus>
              <div class="chart-box">
                <EconomicGap :battleData="LiveData[curIndex]" class="economic-gap"></EconomicGap>
                <GameDataRatio :battleData="LiveData[curIndex]" class="gamedata-ratio"></GameDataRatio>
              </div>
              <PlayerData :battleData="LiveData[curIndex]"></PlayerData>
            </div>
            <ListLoading v-if="!showLive"/>
            <Nodata v-if="showLive && !Object.keys(LiveData).length" class="no-data"></Nodata>
            <Comments class="comment-box"/>
          </div>
          <!-- 赛事战报 -->
          <div v-if="cur === 5">
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
          <sider-box class="sider" :title="'王者战队KDA排行'">
            <SiderScoreRank gameType="kog"></SiderScoreRank>
          </sider-box>
          <sider-box class="sider" :title="'王者荣耀视频'" :moreLink="'/'">
            <SiderVideos></SiderVideos>
          </sider-box>
          <sider-box class="sider" :title="'王者荣耀图集'" :moreLink="'/'">
            <SiderPictures></SiderPictures>
          </sider-box>
          <sider-box class="sider" :title="'王者最新资讯'" :moreLink="'/news'">
            <SiderInformations></SiderInformations>
          </sider-box>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { importComponents } from '~/components/live/kog/components'
import { matchApi } from '~/api/index'
import {
  timingFn
} from '@/assets/js/publicFn'
export default {
  name: 'KogDetails',
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
      cur: 1,
      matchId: this.$route.params.matchId,
      baseInfo: {},
      proSpectData: {},
      showProSpect: false,
      LiveData: [],
      showLive: false,
      betData: [],
      showBet: false,
      reportData: {},
      showReport: false,
      curIndex: 0,
      isInit: false
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
      $axios.get(matchApi.kog.match.basicInfo, { params: baseInfoParams })
    ])

    return {
      baseInfo
    }
  },
  created () {
    this.initBreadCrumb()
    this.judgeStatus()
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
      this.$axios.get(matchApi.kog.match.basicInfo, { params }).then((res) => {
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
    judgeStatus () {
      if (this.baseInfo.status === 1) {
        // 0:未开始 1:进行中 2:已结束
        // 直播中才显示图文直播
        this.switchDetailTab(1)
      } else {
        this.switchDetailTab(2)
      }
    },
    switchDetailTab (val) {
      this.cur = val
      this.$store.commit('SET_LOADING', true)
      if (val === 1) { // 图文直播
        this.getLiveData()
      }
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
    getLiveData () {
      const params = {
        matchId: this.matchId
      }
      this.$axios.get(matchApi.kog.match.liveBattle, { params }).then((res) => {
        this.LiveData = res
        this.curIndex = this.LiveData.length - 1
        // 获取完数据才能实例化组件，否则报错
        this.showLive = true
        this.isInit = true
      })
    },
    getStaticData () {
      // 获取数据
      const params = {
        matchId: this.matchId
      }
      this.$axios.get(matchApi.kog.match.betInfoList, { params }).then((res) => {
        this.betData = res
        // 获取完数据才能实例化组件，否则报错
        this.showBet = true
      })
    },
    getProSpectData () {
      const params = {
        matchId: this.matchId
      }
      this.$axios.get(matchApi.kog.match.proSpect, { params }).then((res) => {
        this.proSpectData = res
        // 获取完数据才能实例化组件，否则报错
        this.showProSpect = true
        this.$store.commit('SET_LOADING', false)
      })
    },
    getAgData () {
      this.getLiveData()
    },
    ReportData () {
      this.showReport = true
    },
    initBreadCrumb () {
      try {
        // 自定义面包屑导航
        const gameType = {
          name: `王者荣耀`,
          path: `/match/kog`
        }
        const league = {
          name: this.baseInfo.leagueName,
          path: `/match/kog/league/${this.baseInfo.leagueId}`
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
      this.$set(this, 'curIndex', val)
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
    .detail-tab{
      margin-bottom: 10px;
    }
    .round-box{
      background: #fff;
      // margin-top: 10px;
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
