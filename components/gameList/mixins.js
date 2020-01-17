import { extraApi } from '~/api/index'
import { liveUrl, matchLeagueUrl, matchTeamUrl } from '@/assets/js/config'
export const commonFn = {
  mounted () {},
  created () {},
  methods: {
    // 判断是否已关注 / 已提醒
    isIncludes (item) {
      const matchStatus = this.matchStatus
      if (!matchStatus || !matchStatus.length) {
        return false
      }
      const gameType = item.gameType
      const matchId = item.matchId
      const isIncludes = matchStatus.some(item => item.game === gameType && item.matchId === matchId)
      return isIncludes
    },
    // 关注 / 提醒
    collectRemind (item) {
      if (!this.isLogin) {
        this.toLogin()
        return
      }
      const matchStatus = JSON.parse(JSON.stringify(this.matchStatus))
      const gameType = item.gameType
      const matchId = item.matchId

      const params = {
        game: gameType,
        matchId,
        gameType
      }
      this.switchStatus(matchStatus, params)
    },
    switchStatus (matchStatus, params) {
      const msgs = '关注成功！'
      const url = extraApi.switchUserNotify
      // 关注或取消关注, 提醒或取消提醒
      this.$axios.get(url, { params }).then((res) => {
        if (this.isIncludes(params)) { // 如果已经关注或提醒，取消
          const index = matchStatus.findIndex(item => item.game === params.game && item.matchId === params.matchId)
          matchStatus.splice(index, 1)
          this.$message.success(`取消${msgs}`)
        } else {
          matchStatus.push(params)
          this.$message.success(`${msgs}`)
        }
        this.$store.dispatch('setMatchStatus', matchStatus)
        // 触发关注状态改变
        this.$bus.emit('changeCollectStatus', true)
      })
    },
    toLogin () {
      this.$message.warning('请先登录！')
      this.$UserModal().show('login')
    },
    toMatch (item, query = '') {
      const routeData = this.$router.resolve({
        path: liveUrl({
          matchId: item.matchId,
          tab: query,
          gameType: item.gameType
        })
      })
      window.open(routeData.href, '_blank')
    },
    toTeam (item, role) {
      const routeData = this.$router.resolve({
        path: matchTeamUrl({
          id: item[`team${role}Id`],
          gameType: item.gameType
        })
      })
      window.open(routeData.href, '_blank')
    },
    toLeague (item) {
      const routeData = this.$router.resolve({
        path: matchLeagueUrl({
          id: item.leagueId,
          gameType: item.gameType
        })
      })
      window.open(routeData.href, '_blank')
    },
    toStatic (item) {
      const routeData = this.$router.resolve({
        path: `/statistic/${item.gameType}`
      })
      window.open(routeData.href, '_blank')
    },
    teamUrl (item, role) {
      return matchTeamUrl({
        id: item[`team${role}Id`],
        gameType: item.gameType
      })
    }
  },
  computed: {
    isLogin () {
      return !!this.$store.state.Token
    },
    matchStatus () {
      return this.$store.state.matchStatus
    }
  }
}
