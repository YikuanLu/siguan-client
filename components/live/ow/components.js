// 守望先锋详情页的组件，太多了，单独提取出来js
import Breadcrum from '~/components/common/Breadcrum'
import Ad from '~/components/common/Ad'

import SiderBox from '~/components/siderBox'
import {
  SiderInformations,
  SiderPictures,
  SiderVideos
} from '~/components/siderBox/components'

import Comments from '~/components/news/details/Comments'
import ReportTitle from '~/components/news/details/Title'

import LivePlatformTabs from '~/components/live/PlatformTabs'
import LiveHeader from '~/components/live/Header'
import LiveGoing from '~/components/live/LiveGoing'
import DetailsTab from '~/components/live/DetailsTab'

import LiveRoundTabs from '~/components/live/ow/multipleLive/RoundTab'
import GameStatus from '~/components/live/ow/multipleLive/GameStatus'

import StaticTable from '~/components/live/modules/networkIndex/StaticTable'
import MatchTeams from '~/components/live/modules/networkIndex/MatchTeams'
import StatsRoundTab from '~/components/live/modules/networkIndex/RoundTab'

import HistoryGames from '~/components/live/ow/preAnalysis/HistoryGames'
import RecentGames from '~/components/live/ow/preAnalysis/RecentGames'

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
    StaticTable,
    MatchTeams,
    StatsRoundTab,
    ReportTitle,
    HistoryGames,
    RecentGames,
    SiderInformations,
    SiderPictures,
    SiderVideos
  }
}
