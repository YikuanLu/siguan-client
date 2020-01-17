<script>
/**
* 实时比分-详情-图文直播表格组件
* 用法
*/
export default {
  name: 'CsgoLivesScore',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      demoImg: require('@/static/img/game-types/demo.png')
    }
  },
  computed: {

  },
  created () {

  },
  methods: {

  },
  render () {
    const { data } = this
    let {
      teamARound: teamA,
      teamBRound: teamB
    } = data
    // js 解构默认值判断null会错误
    if (!teamA) { teamA = {} }
    if (!teamB) { teamB = {} }
    // 是否胜利
    const isWin = (val, type) => {
      if (val) {
        return <icon-font class={['winner', type]} type="iconhuangguan"></icon-font>
      } else {
        return null
      }
    }
    // 根据状态显示游戏图标
    const showIcons = (val, type, title) => {
      if (val) {
        return (
          <a-tooltip title={title}>
            <icon-font class="status" type={type}></icon-font>
          </a-tooltip>
        )
      }
    }
    const score = (
      <div class="top-score">
        {isWin(teamA.totalScore > teamB.totalScore, 'left')}
        {data.teamALogo && <img class="team-logo left" src={data.teamALogo} alt=""/>}
        <div class="team-name left">
          <p class="name">{data.teamAName}</p>
        </div>
        <div class="team-score left">
          <p class="score">{teamA.totalScore}</p>
          <div class="score-status">
            {showIcons(teamA.isFirstKill, 'iconfirst_round', '首回合胜利')}
            {showIcons(teamA.isFirstWin5Score, 'iconfive_round', '先胜5回合')}
            {showIcons(teamA.isFirstWin16Score, 'iconlast_round', '16回合胜利')}
          </div>
        </div>
        <div class="map-info" style={{ 'background-image': `url(${require(`~/static/img/csgo/${data.mapName || 'Cache'}.png`)})` }}>
          <p class="map-name">{data.mapName}</p>
          <p class="round-time">第{data.currentRound}回合</p>
        </div>
        <div class="team-score right">
          <p class="score">{teamB.totalScore}</p>
          <div class="score-status">
            {showIcons(teamB.isFirstKill, 'iconfirst_round', '首回合胜利')}
            {showIcons(teamB.isFirstWin5Score, 'iconfive_round', '先胜5回合')}
            {showIcons(teamB.isFirstWin16Score, 'iconlast_round', '16回合胜利')}
          </div>
        </div>
        <div class="team-name right">
          <p class="name">{data.teamBName}</p>
        </div>
        {data.teamBLogo && <img class="team-logo right" src={data.teamBLogo} alt=""/>}
        {isWin(teamA.totalScore < teamB.totalScore, 'right')}
      </div>
    )
    // 是否显示字段
    const isShowTd = (val) => {
      // 因为0也要显示
      if (typeof val === 'number') {
        return (
          <td>
            <span class="score">{val}</span>
          </td>
        )
      }
    }

    // 是否显示表头
    const isShowTh = (val, text) => {
      // 因为0也要显示
      if (typeof val === 'number') {
        return (
          <th>{text}</th>
        )
      }
    }

    // 计算是否有加时赛。 大于30回合的，用总得分-15，就是加时回合数
    const calcOT = (val) => {
      if (data.currentRound > 30) {
        return val - 15
      } else {
        return '-'
      }
    }

    const scoreTable = (
      <div class="score-box">
        <client-only>
          <table>
            <thead>
              <th>战队</th>
              <th>上半场</th>
              <th>下半场</th>
              <th>加时赛</th>
              {/* 赛后才有的 */}
              {isShowTh(teamA.killCount, '击杀')}
              {isShowTh(teamA.deathCount, '死亡')}
              {isShowTh(teamA.assistCount, '助攻数')}
              {isShowTh(teamA.clutchesWinCount, '残局获胜数')}
              {isShowTh(teamA.rating, '评分')}
            </thead>
            <tbody>
              <tr>
                <td>
                  {data.teamALogo && <img class="team-logo" src={data.teamALogo} alt=""/>}
                  <span class="team-name">{data.teamAName}</span>
                </td>
                <td>
                  <span class="score">{teamA.firstHalfScore} {teamA.firstHalfType}</span>
                </td>
                <td>
                  <span class="score">{teamA.secondHalfScore} {teamA.secondHalfType}</span>
                </td>
                <td>
                  <span class="score">{calcOT(teamA.totalScore)}</span>
                </td>
                {/* 赛后才有的 */}
                {isShowTd(teamA.killCount)}
                {isShowTd(teamA.deathCount)}
                {isShowTd(teamA.assistCount)}
                {isShowTd(teamA.clutchesWinCount)}
                {isShowTd(teamA.rating)}
              </tr>
              <tr>
                <td>
                  {data.teamBLogo && <img class="team-logo" src={data.teamBLogo} alt=""/>}
                  <span class="team-name">{data.teamBName}</span>
                </td>
                <td>
                  <span class="score">{teamB.firstHalfScore} {teamB.firstHalfType}</span>
                </td>
                <td>
                  <span class="score">{teamB.secondHalfScore} {teamB.secondHalfType}</span>
                </td>
                <td>
                  <span class="score">{calcOT(teamB.totalScore)}</span>
                </td>
                {/* 赛后才有的 */}
                {isShowTd(teamB.killCount)}
                {isShowTd(teamB.deathCount)}
                {isShowTd(teamB.assistCount)}
                {isShowTd(teamB.clutchesWinCount)}
                {isShowTd(teamB.rating)}
              </tr>
            </tbody>
          </table>
        </client-only>
      </div>
    )

    const dom = (
      <div class="live-box">
        {score}
        {scoreTable}
      </div>
    )

    return dom
  }
}
</script>

<style lang="less" scoped>
  .top-score{
    position: relative;
    text-align: center;
    padding-top: 20px;
    height: 150px;
    .winner{
      font-size: 30px;
      color: #FFBA00;
      position: absolute;
      z-index: 2;
      &.left{
        top: 0px;
        left: 35px;
        transform: rotate(-45deg);
      }
      &.right{
        top: 5px;
        right: 30px;
        transform: rotate(45deg);
      }
    }
    .team-role{
      width:26px;
      height:60px;
      font-size: 14px;
      color: #fff;
      font-weight: 600;
      line-height: 20px;
      padding-top: 6px;
      position: absolute;
      &.blue{
        background: #677EEA;
        left: 0;
      }
      &.red{
        background: #F04844;
        right: 0;
      }
    }
    .team-logo{
      width: 60px;
      height: 60px;
      position: absolute;
      &.left{
        left: 50px;
      }
      &.right{
        right: 50px;
      }
    }
    .team-name{
      position: absolute;
      top: 35px;
      &.left{
        text-align: left;
        left: 120px;
      }
      &.right{
        text-align: right;
        right: 120px;
      }
      .name{
        font-size: 20px;
        color: #333;
        font-weight: 600;
        line-height: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 170px;
      }
    }
    .team-score{
      text-align: center;
      position: absolute;
      padding-top: 10px;
      &.left{
        right: 550px;
        text-align: right;
        .score{
          color: #677EEA;
        }
      }
      &.right{
        left: 550px;
        text-align: left;
        .score{
          color: #F04844;
        }
      }
      .score{
        font-size: 34px;
        color: #999;
        font-weight: 600;
      }
      .score-status{
        font-size: 16px;
        color: #c3c3c4;
        display: inline-block;
        .status{
          display: inline-block;
          margin: 0 3px;
        }
      }
    }
    .map-info{
      width:150px;
      height:76px;
      background-repeat: no-repeat;
      background-size: contain;
      border-radius: 4px;
      text-align: center;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      filter: brightness(0.8);
      .map-name{
        color: #fff;
        font-size: 20px;
        width: 100%;
        height:30px;
        line-height: 30px;
        background:rgba(51,153,238, .5);
        margin: 23px auto;
      }
      .round-time{
        color: #333;
        font-size: 14px;
        padding-top: 10px;
      }
    }
  }
  .score-box{
    padding: 0 20px 20px;
    table{
      width: 100%;
      tr{
        transition: all .3s;
        &:hover{
          -moz-box-shadow: 0 0 6px 2px #EBEBEB;
          -webkit-box-shadow: 0 0 6px 2px #EBEBEB;
          box-shadow: 0 0 6px 2px #EBEBEB;
        }
      }
      th{
        font-size: 16px;
        color: #333;
        text-align: center;
        height: 50px;
        vertical-align: middle;
        border: solid 1px #f5f5f5;
      }
      td{
        height: 60px;
        vertical-align: middle;
        text-align: center;
        color: #999;
        font-size: 16px;
        border: solid 1px #f5f5f5;
        .team-logo{
          width: 24px;
          height: 24px;
          margin-right: 10px;
        }
        .team-name{
          color: #333;
        }
      }
    }
  }
</style>
