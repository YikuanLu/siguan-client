// dota2详情页的组件，太多了，单独提取出来js
import Breadcrum from '~/components/common/Breadcrum'
import Ad from '~/components/common/Ad'

import SiderBox from '~/components/siderBox'
import {
  SiderInformations,
  SiderPictures,
  SiderScoreRank,
  SiderVideos
} from '~/components/siderBox/components'

import Comments from '~/components/news/details/Comments'
import ReportTitle from '~/components/news/details/Title'

import LivePlatformTabs from '~/components/live/PlatformTabs'
import LiveHeader from '~/components/live/Header'
import LiveGoing from '~/components/live/LiveGoing'
import DetailsTab from '~/components/live/DetailsTab'

import LiveRoundTabs from '~/components/live/dota/multipleLive/RoundTab'
import GameStatus from '~/components/live/dota/multipleLive/GameStatus'
import EconomicGap from '~/components/live/dota/multipleLive/EconomicGap'
import GameDataRatio from '~/components/live/dota/multipleLive/GameDataRatio'
import PlayerData from '~/components/live/dota/multipleLive/PlayerData'
import LiveText from '~/components/live/dota/multipleLive/LiveText'

import StaticTable from '~/components/live/modules/networkIndex/StaticTable'
import MatchTeams from '~/components/live/modules/networkIndex/MatchTeams'
import StatsRoundTab from '~/components/live/modules/networkIndex/RoundTab'

import TeamDataCompare from '~/components/live/dota/preAnalysis/TeamDataCompare'
import TeamDataLine from '~/components/live/dota/preAnalysis/TeamDataLine'
import PlayerDataCompare from '~/components/live/dota/preAnalysis/PlayerDataCompare'
import HeroBpData from '~/components/live/dota/preAnalysis/HeroBpData'
import RecentGames from '~/components/live/dota/preAnalysis/RecentGames'
import HistoryGames from '~/components/live/dota/preAnalysis/HistoryGames'

export const importComponents = {
  components: {
    Breadcrum,
    LiveHeader,
    LivePlatformTabs,
    LiveGoing,
    Ad,
    SiderBox,
    Comments,
    DetailsTab,
    LiveRoundTabs,
    GameStatus,
    EconomicGap,
    GameDataRatio,
    PlayerData,
    StaticTable,
    MatchTeams,
    StatsRoundTab,
    TeamDataCompare,
    TeamDataLine,
    ReportTitle,
    PlayerDataCompare,
    HeroBpData,
    RecentGames,
    HistoryGames,
    SiderInformations,
    SiderPictures,
    SiderScoreRank,
    LiveText,
    SiderVideos
  }
}
