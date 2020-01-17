<script>
import { playerInforBuild } from '../../scoped/playerInforBuild'
import Breadcrum from '~/components/common/Breadcrum' // 面包屑

import SiderBox from '~/components/siderBox' // 右侧边栏
import {
  SiderInformations,
  SiderPictures,
  SiderVideos
} from '~/components/siderBox/components'
import PlayerLol from '~/components/match/player/modules/lol'
import PlayerDota from '~/components/match/player/modules/dota'
import PlayerCsgo from '~/components/match/player/modules/csgo'
import PlayerKog from '~/components/match/player/modules/kog'
import getDataByGameType from '~/api/getDataByGameType'
import PlayerInfor from '~/components/match/player/PlayerInfor'
import { CHINESE_GAME_TYPE_LIST, GAMENAME_EN, GAMENAME_CN } from '~/assets/js/types'
const modulesComponents = {
  PlayerLol,
  PlayerDota,
  PlayerCsgo,
  PlayerKog
}

export default {
  name: 'Player',
  components: {
    ...modulesComponents,
    Breadcrum,
    PlayerInfor,
    SiderBox,
    SiderInformations,
    SiderPictures,
    SiderVideos
  },
  data () {
    return {
      navData: [],
      basicInfo: {},
      gameType: '',
      desc: {}
    }
  },
  head () {
    const { basicInfo, gameType } = this
    const leagueName =
      basicInfo.nickName || basicInfo.name || basicInfo.nickname
    const gameObj = CHINESE_GAME_TYPE_LIST.filter(item => item.itemValue === gameType)
    return {
      title: `${leagueName}_${gameObj[0].itemText}战队_${gameType.toUpperCase()}比分战绩_历史比赛数据_英雄池 - 尚牛电竞`,
      meta: [
        { hid: 'description', name: 'description', content: '' }
      ]
    }
  },
  async asyncData ({ $axios, params, route }) {
    const gameType = params.gameType ? params.gameType : 'lol'
    const apiGroup = getDataByGameType(gameType)($axios)
    const parameter = { playerId: route.params.id }
    const basicInfo = await apiGroup.player.basicInfo(parameter)
    const desc = playerInforBuild(basicInfo, gameType)

    return {
      basicInfo,
      gameType,
      desc
    }
  },
  created () {
    this.navData = [
      {
        name: '首页',
        path: '/'
      },
      {
        name: this.$t(`match.gamesName.${this.gameType}`),
        path: `/match/${this.gameType}`
      },
      {
        name: this.basicInfo.teamShortName || this.basicInfo.teamName,
        path: `/match/${this.gameType}/team/${this.basicInfo.teamId}`
      },
      {
        name:
          this.basicInfo.nickName ||
          this.basicInfo.name ||
          this.basicInfo.nickname,
        path: '#'
      }
    ]
  },
  mounted () {
    console.log(this.basicInfo)
  },
  render () {
    const { navData, basicInfo, gameType, desc } = this

    // 显示的游戏名
    const gameNameEN = GAMENAME_EN[gameType]
    const gameNameCN = GAMENAME_CN[gameType]

    const contentController = (type) => {
      switch (type) {
        case 'lol':
          return <PlayerLol />
        case 'dota':
          return <PlayerDota />
        case 'csgo':
          return (
            <PlayerCsgo
              playerStats={basicInfo.playerStats ? basicInfo.playerStats : {}}
            />
          )
        case 'kog':
          return <PlayerKog />
        default:
          return <PlayerLol />
      }
    }

    return (
      <div class="Player matchContainer">
        <div class="wrap-box">
          <div class="breadcrum">
            <Breadcrum nav={navData} />
          </div>
          <div class="content clearfix">
            <div class="fl">
              <PlayerInfor basicInfo={basicInfo} desc={desc} />
              {contentController(gameType)}
            </div>

            <div class="fr">
              <SiderBox title={`${gameNameEN}最新资讯`} moreLink={`/news/${gameType}`}>
                <SiderInformations />
              </SiderBox>
              <SiderBox style={{ marginBottom: '10px' }} title={`${gameNameCN}视频`}>
                <SiderVideos />
              </SiderBox>
              <SiderBox title={`${gameNameCN}图集`}>
                <SiderPictures />
              </SiderBox>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
@import url('../../style.less');
</style>
