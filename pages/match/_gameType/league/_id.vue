<script>
import { buildData } from '../../scoped'
import getDataByGameType from '~/api/getDataByGameType'
import Breadcrum from '~/components/common/Breadcrum'
import InforBanner from '~/components/match/scopedComponents/InforBanner'
import SiderBox from '~/components/siderBox'
import MatchItem from '~/components/match/league/MatchItem'

import LeagueLol from '~/components/match/league/modules/lol'
import LeagueOw from '~/components/match/league/modules/ow'
import LeagueDota from '~/components/match/league/modules/dota'
import LeagueCsgo from '~/components/match/league/modules/csgo'
import LeagueKog from '~/components/match/league/modules/kog'
import {
  SiderScoreRank,
  SiderInformations,
  SiderVideos,
  SiderPictures
} from '~/components/siderBox/components'
import { CHINESE_GAME_TYPE_LIST, GAMENAME_EN, GAMENAME_CN } from '~/assets/js/types'
// 公共组件
const publicComponents = {
  Breadcrum, // 面包屑
  InforBanner, // 联赛信息
  SiderBox, // 右侧边栏
  MatchItem, // 本周赛程 Item
  SiderScoreRank,
  SiderInformations,
  SiderVideos,
  SiderPictures
}
// 模块组件
const modulesComponents = {
  LeagueLol,
  LeagueOw,
  LeagueDota,
  LeagueCsgo,
  LeagueKog
}

export default {
  name: 'MatchType',
  components: {
    ...modulesComponents,
    ...publicComponents
  },
  data () {
    return {
      basicInfo: {},
      weekLeagueList: [],
      desc: {},
      result: [],
      gameType: '',
      navData: []
    }
  },
  head () {
    const { basicInfo, gameType } = this
    const leagueName = basicInfo.name
    const gameObj = CHINESE_GAME_TYPE_LIST.filter(item => item.itemValue === gameType)
    return {
      title: `${leagueName}_${gameObj[0].itemText}联赛|实时${gameType.toUpperCase()}比分|赛果回顾|历史比分数据分析 - 尚牛电竞`,
      meta: [
        { hid: 'description', name: 'description', content: '' }
      ]
    }
  },
  async asyncData ({ $axios, params, route }) {
    const gameType = params.gameType ? params.gameType : 'lol'
    const apiGroup = getDataByGameType(gameType)($axios)
    const parameter = { leagueId: route.params.id }
    const basicInfo = await apiGroup.league.basicInfo(parameter)
    const desc = buildData(basicInfo, gameType, 'league')
    return { basicInfo, gameType, desc }
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
        name: this.basicInfo.name,
        path: '#'
      }
    ]
  },
  mounted () {
    console.log(this.basicInfo)
  },
  render () {
    const { navData, gameType, basicInfo, desc } = this

    const contentController = (type) => {
      console.log('gameType:', type)
      switch (type) {
        case 'lol':
          return <LeagueLol />
        case 'ow':
          return <LeagueOw />
        case 'dota':
          return <LeagueDota />
        case 'csgo':
          return <LeagueCsgo />
        case 'kog':
          return <LeagueKog />
        default:
          return <LeagueLol />
      }
    }

    // 显示的游戏名
    const gameNameEN = GAMENAME_EN[gameType]
    const gameNameCN = GAMENAME_CN[gameType]

    // ow不显示排行
    const showSider = () => {
      if (gameType !== 'ow') {
        return (
          <sider-box
            style={{ marginBottom: '10px' }}
            title={`${gameNameEN}${gameType === 'csgo' ? '职业战队实时排行' : '战队KDA排行'}`}
          >
            <SiderScoreRank
              gameType={gameType}
              leagueId={this.$route.params.id}
            />
          </sider-box>
        )
      }
    }
    return (
      <div class="matchType matchContainer">
        <div class="wrap-box">
          {/* 面包屑 */}
          <div class="breadcrum">
            <Breadcrum nav={navData} />
          </div>
          <div class="content clearfix">
            <div class="fl">
              {/* 头部展示联赛信息 */}
              <InforBanner basicInfo={basicInfo} desc={desc} />

              {contentController(gameType)}
            </div>

            {/* 右侧边栏组件 */}
            <div class="fr">
              {showSider()}
              <sider-box title={`${gameNameEN}最新资讯`} moreLink={`/news/${gameType}`}>
                <SiderInformations />
              </sider-box>
              <sider-box
                style={{ marginTop: '10px' }}
                title={`${gameNameCN}视频`}
                moreLink="'/'"
              >
                <SiderVideos></SiderVideos>
              </sider-box>
              <sider-box
                style={{ marginTop: '10px' }}
                title={`${gameNameCN}图集`}
                moreLink="'/'"
              >
                <SiderPictures></SiderPictures>
              </sider-box>
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
