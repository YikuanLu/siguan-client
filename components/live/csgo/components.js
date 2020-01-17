// 反恐精英详情页的组件，太多了，单独提取出来js
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
import DetailsTab from '~/components/live/DetailsTab'

import LivesScore from '~/components/live/csgo/multipleLive/LivesScore'
import GameStatus from '~/components/live/csgo/multipleLive/GameStatus'
import LiveText from '~/components/live/csgo/multipleLive/LiveText'
import LiveRoundTabs from '~/components/live/csgo/multipleLive/RoundTab'

import StaticTable from '~/components/live/modules/networkIndex/StaticTable'
import MatchTeams from '~/components/live/modules/networkIndex/MatchTeams'
import StatsRoundTab from '~/components/live/modules/networkIndex/RoundTab'

import MapWinRate from '~/components/live/csgo/preAnalysis/MapWinRate'
import PlayerDataCompare from '~/components/live/csgo/preAnalysis/PlayerDataCompare'
import RecentGames from '~/components/live/csgo/preAnalysis/RecentGames'
import HistoryGames from '~/components/live/csgo/preAnalysis/HistoryGames'

import AFGameStatus from '~/components/live/csgo/afterData/GameStatus'

export const importComponents = {
  components: {
    Breadcrum,
    LiveHeader,
    LivePlatformTabs,
    Ad,
    SiderBox,
    Comments,
    DetailsTab,
    StaticTable,
    MatchTeams,
    StatsRoundTab,
    MapWinRate,
    ReportTitle,
    PlayerDataCompare,
    RecentGames,
    HistoryGames,
    LivesScore,
    GameStatus,
    LiveText,
    LiveRoundTabs,
    SiderInformations,
    SiderPictures,
    SiderScoreRank,
    SiderVideos,
    AFGameStatus
  }
}
