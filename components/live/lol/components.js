// 英雄联盟详情页的组件，太多了，单独提取出来js
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

import LiveRoundTabs from '~/components/live/lol/multipleLive/RoundTab'
import GameStatus from '~/components/live/lol/multipleLive/GameStatus'
import EconomicGap from '~/components/live/lol/multipleLive/EconomicGap'
import GameDataRatio from '~/components/live/lol/multipleLive/GameDataRatio'
import PlayerData from '~/components/live/lol/multipleLive/PlayerData'

import StaticTable from '~/components/live/modules/networkIndex/StaticTable'
import MatchTeams from '~/components/live/modules/networkIndex/MatchTeams'
import StatsRoundTab from '~/components/live/modules/networkIndex/RoundTab'

import TeamDataCompare from '~/components/live/lol/preAnalysis/TeamDataCompare'
import TeamDataLine from '~/components/live/lol/preAnalysis/TeamDataLine'
import PlayerDataCompare from '~/components/live/lol/preAnalysis/PlayerDataCompare'
import RecentGames from '~/components/live/lol/preAnalysis/RecentGames'
import HistoryGames from '~/components/live/lol/preAnalysis/HistoryGames'

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
    RecentGames,
    HistoryGames,
    SiderInformations,
    SiderPictures,
    SiderScoreRank,
    SiderVideos
  }
}
