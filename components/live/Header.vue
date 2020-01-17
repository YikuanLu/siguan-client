<script>
/**
* 实时比分-头部比分组件
* 用法
**/
import { formatTime, secondToHs } from '@/assets/js/publicFn'
import { commonFn } from '@/components/gameList/mixins'
import { extraApi } from '~/api/index'
export default {
  name: 'LiveHeader',
  mixins: [commonFn],
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    type: {
      type: String,
      default: 'lol'
    }
  },
  data () {
    return {
      infoData: this.data,
      gameType: this.type,
      noDuration: ['ow', 'csgo'],
      playStatus: {
        0: `未开始`,
        1: `直播中`,
        2: `已结束`
      },
      supportRate: [],
      supportRole: {
        0: false,
        1: false
      },
      isNotify: false
    }
  },
  computed: {
    isLogin () {
      return !!this.$store.state.Token
    }
  },
  created () {
    this.getSupport()

    if (this.isLogin) {
      this.getNotify()
    }
    // 接收关注状态改变
    this.$bus.on('changeCollectStatus', (val) => {
      this.getNotify()
    })
  },
  beforeDestory () {
    this.$bus.off('changeCollectStatus')
  },
  methods: {
    matchToLeage () {
      const routeData = this.$router.resolve({
        path: `/match/${this.type}/league/${this.infoData.leagueId}`
      })
      window.open(routeData.href, '_blank')
    },
    matchToTeam (id) {
      if (!id) { return }
      const routeData = this.$router.resolve({
        path: `/match/${this.type}/team/${id}`
      })
      window.open(routeData.href, '_blank')
    },
    support (index) {
      if (!this.isLogin) {
        this.toLogin()
        return
      }
      const params = {
        game: this.gameType,
        matchId: this.$route.params.matchId,
        index
      }
      this.$axios
        .get(extraApi.addGameSupport, { params })
        .then((res) => {
          this.$set(this.supportRole, index, true)
          this.getSupport()
          this.$message.success(`支持成功！`)
        }).catch(({ data }) => {
          this.$message.destroy()
          const tips = {
            AlreadySupport: '已支持！'
          }
          const msg = data && data.message
          this.$message.error(tips[msg] || msg)
        })
    },
    getSupport () {
      const params = {
        game: this.gameType,
        matchId: this.$route.params.matchId
      }
      this.$axios
        .get(extraApi.getGameSupportQty, { params })
        .then((res) => {
          this.supportRate = res
        })
    },
    getNotify () {
      const params = {
        game: this.gameType,
        matchId: this.$route.params.matchId
      }
      this.$axios
        .get(extraApi.getUserNotifyForMatch, { params })
        .then((res) => {
          // 由于路由拦截，后端返回false会变成 {}，所以需要这判断
          res === true ? this.isNotify = true : this.isNotify = false
        })
    }
  },
  render () {
    const { infoData, gameType, noDuration, playStatus, matchToLeage, matchToTeam, collectRemind, support, supportRole, supportRate, isNotify } = this

    // 后端格式不统一，跪了
    const matchTime = infoData.matchTime || '--' // 比赛开始时间的字段名不一样，做一下判断

    // 获取当前进行中比赛的局数, 如果有进行中的，取进行中，没有的话取最后一局
    function getCurBattle () {
      const battleList = infoData.battle_list
      try { // try防止莫名字段报错
        // lol 0:进行中 1:已结束
        // 其他 0:未开始 1:进行中 2:已结束
        if (gameType === 'lol') {
          const curRound = battleList.filter(_ => _.status === 0)
          if (curRound[0]) {
            return curRound[0]
          }
        } else {
          const curRound = battleList.filter(_ => _.status === 1)
          if (curRound[0]) {
            return curRound[0]
          }
        }
        const len = battleList.length
        const curRound = battleList[ len - 1 ]
        return curRound
      } catch (error) {
        return {}
      }
    }
    // 获取当前比赛状态
    function getCurStatus (status) {
      return playStatus[status]
    }
    // 判断是否有比赛持续时间
    function hasDuration () {
      try { // try防止莫名字段报错
        if (!noDuration.includes(gameType)) { // 有比赛持续时长的
          if (infoData.status === 1) { // 直播中，显示比赛持续时长
            return <p class="time">{secondToHs(getCurBattle().duration)}</p>
          } else { // 非直播中，显示比赛开始时间
            return <p class="time">{formatTime(matchTime, 'h:m')}</p>
          }
        } else { // 没有比赛持续时长的，显示比赛开始时间
          return <p class="time">{formatTime(matchTime, 'h:m')}</p>
        }
      } catch (error) {
        return <p class="time">--</p>
      }
    }

    // 选择要显示的字段
    function setView (name, shortName) {
      const showName = infoData[shortName] || infoData[name] || 'TBD'
      return showName
    }

    const gameName = (
      <div class="name">
        <GameTypeIcon type={gameType} class="type-icon"/>
        <span class="text" onClick={matchToLeage}>{setView('leagueName')} &nbsp; BO{infoData.bo}</span>
      </div>
    )
    const gameScore = (
      <div class="score">
        <span onClick={matchToTeam.bind(this, infoData.teamAId)} class="team-name">{setView('teamAName', 'teamAShortName')}</span>
        <img onClick={matchToTeam.bind(this, infoData.teamAId)} src={setView('teamALogo')} class="team-logo" alt=""/>
        <span class="team-score">{infoData.teamAScore}</span>
        <div class="time-status">
          <p class="date">{formatTime(matchTime, 'M月D日')}</p>
          {hasDuration()}
          <p class="status">{getCurStatus(infoData.status)}</p>
        </div>
        <span class="team-score">{infoData.teamBScore}</span>
        <img onClick={matchToTeam.bind(this, infoData.teamBId)} src={setView('teamBLogo')} class="team-logo" alt=""/>
        <span onClick={matchToTeam.bind(this, infoData.teamBId)} class="team-name">{setView('teamBName', 'teamBShortName')}</span>
      </div>
    )
    // 计算支持率
    function calcSupport (a, b, role) {
      const all = a + b
      if ((a + b === 0) || (!a && !b)) { return '50%' }
      const aRate = ((a / all) * 100).toFixed(0)
      if (role === 0) {
        return `${aRate}%`
      } else {
        return `${100 - aRate}%`
      }
    }

    // 比赛结束就不显示支持率
    const gameRate = (
      infoData.status !== 2
        ? (
          <div class="rate">
            <span class={['left-percent', { 'support': supportRole[0] }]}>
              {calcSupport(supportRate[0], supportRate[1], 0)}
            </span>
            <icon-font
              type="icondianzan"
              class={['iconfont', 'left', { 'support': supportRole[0] }]}
              onClick={support.bind(this, 0)}
            ></icon-font>
            <div class="rate-bar">
              <div class="process" style={{ width: calcSupport(supportRate[0], supportRate[1], 0) }}></div>
            </div>
            <icon-font
              class={['iconfont', 'right', { 'support': supportRole[1] }]}
              type="icondianzan"
              onClick={support.bind(this, 1)}
            ></icon-font>
            <span class={['right-percent', { 'support': supportRole[1] }]}>
              {calcSupport(supportRate[0], supportRate[1], 1)}
            </span>
          </div>
        ) : null
    )
    // 判断是否关注、提醒的参数
    const btnData = {
      matchId: this.$route.params.matchId,
      gameType
    }
    // 比赛进行中和结束就不显示提醒
    const gameBtn = (
      <div class="game-btns">
        <div
          class={[ 'item', { active: isNotify } ]}
          onClick={collectRemind.bind(this, btnData)}>
          <icon-font
            class="game-btn"
            type="icontixing"
          ></icon-font>
          <span class="btn-text">{ isNotify ? '取消关注' : '关注' }</span>
        </div>
      </div>
    )
    const dom = (
      <div class="game-top">
        {gameName}
        {gameScore}
        {gameRate}
        {gameBtn}
      </div>
    )
    return dom
  }
}
</script>
<style scoped lang="less">
  .game-top{
    background: #fff;
    margin: 10px 0 0;
    padding: 40px 0 30px;
    text-align: center;
    position: relative;
    .name{
      .type-icon{
        font-size: 26px;
      }
      .text{
        font-size: 20px;
        color: #212121;
        padding-left: 9px;
        font-weight: 600;
        cursor: pointer;
        &:hover{
          color: @primary-color;
        }
      }
    }
    .score{
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 11px 0 15px;
      .team-name{
        font-size: 20px;
        color: #333;
        font-weight: 600;
        cursor: pointer;
        &:hover{
          color: @primary-color;
        }
      }
      .team-logo{
        max-width:130px;
        height: 100px;
        margin: 0 20px;
        cursor: pointer;
      }
      .team-score{
        width:70px;
        height:70px;
        line-height: 70px;
        text-align: center;
        background:rgba(51,153,238,1);
        border-radius:10px;
        font-size: 30px;
        color: #fff;
        font-weight: 600;
        margin: 0 20px;
      }
      .time-status{
        color: #333;
        margin: 0 30px;
        .date{
          font-size: 14px;
        }
        .time{
          font-size: 30px;
          font-weight: 600;
          line-height: 38px;
        }
        .status{
          font-size: 16px;
        }
      }
    }
    .rate{
      display: flex;
      justify-content: center;
      align-items: flex-end;
      .left-percent{
        font-size: 12px;
        color: #CBCBCB;
        &.support{
          color: #677EEA
        }
      }
      .iconfont{
        font-size: 20px;
        margin: 0 9px;
        color: #CBCBCB;
        cursor: pointer;
        &.left{
          &.support, &:hover{
            color: #677EEA
          }
        }
        &.right{
          &.support, &:hover{
            color: #F9444A;
          }
        }
      }
      .rate-bar{
        width: 480px;
        height: 8px;
        border-radius:4px;
        overflow: hidden;
        position: relative;
        background: #FFB3B6;
        margin: 0 11px;
        .process{
          height: 8px;
          border-radius:4px;
          position: absolute;
          left: 0;
          background: #ACB9F3;
          transition: all .3s;
        }
      }
      .right-percent{
        font-size: 12px;
        color: #cbcbcb;
        &.support{
          color: #F9444A;
        }
      }
    }
    .game-btns{
      position: absolute;
      top: 10px;
      right: 20px;
      .item{
        display: inline-block;
        padding-left: 20px;
        cursor: pointer;
        &:hover, &.active{
          .btn-text, .game-btn{
            color: @primary-color;
          }
        }
      }
      .game-btn{
        font-size: 24px;
        color: #cbcbcb;
        padding: 0 4px;
        vertical-align: middle;
      }
      .btn-text{
        color: #999;
        font-size: 18px;
        vertical-align: middle;
      }
    }
  }
</style>
