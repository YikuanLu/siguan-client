<template>
  <div>
    <div class="content-box">
      <div class="wrap-box">
        <breadcrum class="breadcrum" :nav="navData"></breadcrum>
        <a-anchor>
          <game-types class="game-types" :showIcon="true" :showAll="false" @switchTab="switchTab"></game-types>
        </a-anchor>
        <a-spin :spinning="isReload">
          <div id="scroll-top"></div>
          <recent-game :gameType="gameType" :data="recentList"></recent-game>
          <div class="float-box">
            <div class="left">
              <all-games :gameType="gameType" :data="leagueList" @changeList="changeList"></all-games>
            </div>
            <div class="right">
              <sider-box v-if="hotTeams.length" class="sider" :title="`${gameName[gameType]}职业战队`">
                <SiderHotTeams :gameType="gameType" :data="hotTeams"></SiderHotTeams>
              </sider-box>
              <Ad class="ad" :width="300" :height="115" :imgs="imgs"></Ad>
              <sider-box v-if="hotPlayers.length" class="sider" :title="`${gameName[gameType]}选手热度排行`">
                <SiderHotTeamMembers :gameType="gameType" :data="hotPlayers"></SiderHotTeamMembers>
              </sider-box>
            </div>
          </div>
        </a-spin>
      </div>
    </div>
  </div>
</template>

<script>
import getDataByGameType from '~/api/getDataByGameType'
import Breadcrum from '~/components/common/Breadcrum'
import GameTypes from '~/components/common/GameTypes'
import RecentGame from '~/components/match/scopedComponents/RecentGame'
import AllGames from '~/components/match/scopedComponents/AllGames'
import SiderBox from '~/components/siderBox'
import Ad from '~/components/common/Ad'
import { matchApi } from '~/api/index'
import { GAME_TYPE_LIST, CHINESE_GAME_TYPE_LIST, GAMENAME_EN } from '~/assets/js/types'
import {
  SiderHotTeams,
  SiderHotTeamMembers
} from '~/components/siderBox/components'
export default {
  name: 'GameSchedule',
  components: {
    Breadcrum,
    RecentGame,
    AllGames,
    SiderBox,
    GameTypes,
    Ad,
    SiderHotTeams,
    SiderHotTeamMembers
  },
  head () {
    const gameType = this.gameType
    const gameObj = CHINESE_GAME_TYPE_LIST.filter(item => item.itemValue === gameType)
    return {
      title: `${gameObj[0].itemText}职业联赛|实时电竞比分直播|历史数据分析|比赛视频回放 - 尚牛电竞`,
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
          name: '英雄联盟',
          path: '/match?type=lol'
        },
        {
          name: '赛事赛程',
          path: this.$route.fullPath
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
      sortType: '',
      recentList: [],
      leagueList: {},
      gameType: 'lol',
      isReload: false,
      hotTeams: [],
      hotPlayers: [],
      gameName: GAMENAME_EN
    }
  },
  async asyncData ({ $axios, params, redirect }) {
    // 防止初次进来重复请求
    if (!params.gameType) {
      redirect(`/match/lol`)
      return
    }
    const gameType = params.gameType ? params.gameType : 'lol'
    const apiGroup = getDataByGameType(gameType)($axios)
    const leagueParams = {
      pageNum: 1,
      pageSize: 20
    }
    const [recentList, leagueList] = await Promise.all([
      apiGroup.league.recentList(),
      apiGroup.league.leagueList(leagueParams)
    ])
    return {
      recentList,
      leagueList,
      gameType
    }
  },
  mounted () {
    this.judgeGameType()
    this.$nextTick(() => {
      this.setNavData()
      this.isReload = false
    })
  },
  methods: {
    switchTab (val) {
      if (this.gameType === val) { return }
      this.isReload = true
      this.gameType = val
      this.$router.replace(`/match/${val}`)
    },
    setNavData () {
      // 设置面包屑
      try {
        const curType = GAME_TYPE_LIST.filter(
          item => item.itemValue === this.gameType
        )
        this.$set(this.navData, 1, {
          name: curType[0].itemText,
          path: `/match/${this.gameType}`
        })
      } catch (error) {
        console.log(error)
      }
    },
    judgeGameType () {
      // 判断游戏类型，是否请求数据
      this.clearSiderData()
      if (this.gameType === 'ow') {
        this.getHotTeams()
        return
      }
      this.getHotTeams()
      this.getHotPlayers()
    },
    clearSiderData () {
      // 清空数据
      this.hotTeams = []
      this.hotPlayers = []
    },
    getHotTeams () {
      const params = {
        size: this.gameType === 'csgo' ? 8 : 9
      }
      // 获取数据
      this.$axios.get(matchApi[this.gameType].league.hotTeam, { params }).then((res) => {
        this.hotTeams = res
      })
    },
    getHotPlayers () {
      const params = {
        size: 5
      }
      // 获取数据
      this.$axios.get(matchApi[this.gameType].league.hotPlayer, { params }).then((res) => {
        this.hotPlayers = res
      })
    },
    changeList (val) {
      // 改变分页数据
      this.$set(this, 'leagueList', val)
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
.content-box {
  .breadcrum {
    margin-top: 20px;
    margin-bottom: 10px;
  }
  .game-types {
    justify-content: flex-start;
    margin: 0 auto;
    /deep/ .item {
      margin-right: 70px;
    }
  }
  .float-box {
    overflow: hidden;
    margin-bottom: 40px;
    .left {
      float: left;
      width: 890px;
      margin-right: 10px;
      background: #fff;
    }
    .right {
      float: right;
      width: 300px;
    }
  }
  .sider-box{
    margin-bottom: 10px;
  }
  .ad {
    margin: 10px 0;
  }
  /deep/ .ant-affix{
    z-index: 13;
  }
  /deep/ .ant-anchor-wrapper {
    box-shadow: 0 0 4px 2px #ebebeb;
  }
}
</style>
