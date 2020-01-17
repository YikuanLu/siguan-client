import { homeApi } from '~/api'
import {
  sortMatchByDate,
  sortOngingMethod,
  sortOngingLeague
} from '@/assets/js/publicFn'
import LiveIndex from '~/components/live/index'
export const commonFn = {
  components: {
    LiveIndex
  },
  data () {
    return {
      matchList: [],
      matchData: {
        prev: {}, // 今天之前的数据
        now: {}, // 今天的数据
        next: {} // 今天以后的数据
      },
      onGoingList: {},
      allLeague: {},
      hotInfos: []
    }
  },
  created () {
    const getMatchData = (data) => {
      this.$axios
        .get(homeApi.matchList, { params: data })
        .then(async (res) => {
          this.matchList = res
          this.matchData = await sortMatchByDate(this.matchList)
          const sortLeagues = await sortOngingLeague(this.matchList).dataByLeagueId
          this.onGoingList = await sortOngingMethod(sortLeagues, 1)
          this.allLeague = await sortOngingLeague(this.matchList).allLeague
        })
    }
    this.$bus.on('getMatchData', (data) => {
      getMatchData(data)
    })
    this.$once('hook:beforeDestroy', () => {
      this.$bus.off('getMatchData')
    })
  }
}
