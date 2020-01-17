<script>
import { buildData } from '../../scoped'
import {
  SiderInformations,
  SiderVideos,
  SiderPictures
} from '~/components/siderBox/components'
import getDataByGameType from '~/api/getDataByGameType'
import Breadcrum from '~/components/common/Breadcrum' // 面包屑
import InforBanner from '~/components/match/scopedComponents/InforBanner' // 战队信息
import SiderBox from '~/components/siderBox' // 右侧边栏
import TeamOw from '~/components/match/team/modules/ow'

import TeamLol from '~/components/match/team/modules/lol'
import TeamDota from '~/components/match/team/modules/dota'
import TeamCsgo from '~/components/match/team/modules/csgo'
import TeamKog from '~/components/match/team/modules/kog'
import { GAMENAME_EN, GAMENAME_CN } from '~/assets/js/types'

const modulesComponents = {
  TeamLol,
  TeamOw,
  TeamDota,
  TeamCsgo,
  TeamKog
}

export default {
  name: 'Team',
  components: {
    ...modulesComponents,
    SiderVideos,
    SiderPictures,
    Breadcrum,
    SiderInformations
  },
  data () {
    return {
      navData: [],
      basicInfo: {},
      desc: {},
      gameType: ''
    }
  },
  head () {
    const { basicInfo, gameType } = this
    const leagueName = basicInfo.name
    return {
      title: `${leagueName}_${gameType.toUpperCase()}战队介绍_电竞比分数据统计_历史比分数据 - 尚牛电竞`,
      meta: [
        { hid: 'description', name: 'description', content: '' }
      ]
    }
  },
  async asyncData ({ $axios, params, route }) {
    const gameType = params.gameType ? params.gameType : 'lol'
    const apiGroup = getDataByGameType(gameType)($axios)
    const parameter = { teamId: route.params.id }
    let basicInfo = await apiGroup.team.basicInfo(parameter)
    if (basicInfo.team) {
      basicInfo = Object.assign(basicInfo, basicInfo.team)
    }
    return {
      basicInfo,
      gameType
    }
  },
  mounted () {
    console.log(this.basicInfo)
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
    this.desc = buildData(this.basicInfo, this.gameType, 'team')
  },
  render () {
    const { navData, gameType, basicInfo, desc } = this

    // 显示的游戏名
    const gameNameEN = GAMENAME_EN[gameType]
    const gameNameCN = GAMENAME_CN[gameType]

    const contentController = (type) => {
      switch (type) {
        case 'lol':
          return <TeamLol />
        case 'ow':
          return <TeamOw />
        case 'dota':
          return <TeamDota infor={this.basicInfo} />
        case 'csgo':
          return <TeamCsgo infor={this.basicInfo} />
        case 'kog':
          return <TeamKog />
      }
    }

    return (
      <div class="team matchContainer">
        <div class="wrap-box">
          <div class="breadcrum">
            <Breadcrum nav={navData} />
          </div>
          <div class="content clearfix">
            <div class="fl">
              <InforBanner type="team" basicInfo={basicInfo} desc={desc} />

              {contentController(gameType)}
            </div>

            <div class="fr">
              <SiderBox title={`${gameNameEN}最新资讯`} moreLink={`/news/${gameType}`}>
                <SiderInformations />
              </SiderBox>
              <SiderBox
                style={{ marginTop: '10px' }}
                title={`${gameNameCN}视频`}
                moreLink="'/'"
              >
                <SiderVideos></SiderVideos>
              </SiderBox>
              <SiderBox
                style={{ marginTop: '10px' }}
                title={`${gameNameCN}图集`}
                moreLink="'/'"
              >
                <SiderPictures></SiderPictures>
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
