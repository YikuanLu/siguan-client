<script>
/**
* 实时比分-详情-赛后表格组件
* 用法
*/
export default {
  name: 'CsgoAFGameStatus',
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
      teamAPlayers: teamA,
      teamBPlayers: teamB,
      teamARound,
      teamBRound
    } = data
    // js 解构默认值判断null会错误
    if (!teamA) { teamA = [] }
    if (!teamB) { teamB = [] }
    if (!teamARound) { teamARound = {} }
    if (!teamBRound) { teamBRound = {} }

    // 渲染数据
    function drawData (data = []) {
      if (data && Object.keys(data).length) {
        return (
          <tbody>
            {data.map((item) => {
              return (
                <tr>
                  <td>{item.playerName}</td>
                  <td>{item.killCount}</td>
                  <td>{item.deathCount}</td>
                  <td>{item.assistCount}</td>
                  <td>{item.headshotCount}</td>
                  <td>{item.kast}</td>
                  <td>{item.damageAverage}</td>
                  <td>{item.killCount - item.deathCount}</td>
                  <td>{item.firstKill - item.firstDeath}</td>
                  <td>{item.rating}</td>
                </tr>
              )
            })}
          </tbody>
        )
      } else {
        return (
          <td colspan="10">
            <Nodata style="padding: 30px;"></Nodata>
          </td>
        )
      }
    }
    const tHead = (
      <thead>
        <th>选手</th>
        <th>杀人数</th>
        <th>死亡数</th>
        <th>助攻数</th>
        <th>爆头数</th>
        <th>KAST</th>
        <th>平均回合伤害</th>
        <th>击杀-死亡数</th>
        <th>首击杀-首死亡数</th>
        <th>技术评分</th>
      </thead>
    )
    const blueTable = (
      <client-only>
        <table class="blue-table">
          {tHead}
          {drawData(teamA)}
        </table>
      </client-only>
    )
    const redTable = (
      <client-only>
        <table class="blue-table red">
          {tHead}
          {drawData(teamB)}
        </table>
      </client-only>
    )

    // 判断要显示的图标
    function judgeIcon (type) {
      switch (type) {
        case 't_win':
          return 'iconklt'
        case 'ct_win':
          return 'iconklt'
        case 'bomb_defused':
          return 'iconczd'
        case 'bomb_exploded':
          return 'iconbz'
        case 'stopwatch':
          return 'iconnaozhong'
        default:
          return ''
      }
    }

    // 判断要显示的图标
    function judgeTips (type) {
      switch (type) {
        case 't_win':
          return '全歼全部敌人'
        case 'ct_win':
          return '全歼全部敌人'
        case 'bomb_defused':
          return '炸弹拆除'
        case 'bomb_exploded':
          return '炸弹爆炸'
        case 'stopwatch':
          return '时间耗尽'
        default:
          return ''
      }
    }

    // 渲染数据
    function showData (data = []) {
      return (
        data.map((item) => {
          return (
            item ? (
              <td class="event-icon">
                <a-tooltip title={judgeTips(item)}>
                  <icon-font class="iconfont" type={judgeIcon(item)}></icon-font>
                </a-tooltip>
              </td>
            ) : <td class="event-icon"><icon-font class="iconfont hide" type="iconnaozhong"></icon-font></td>
          )
        })
      )
    }

    const eventTable = (
      <div class="event-box">
        {teamARound && Object.keys(teamARound).length > 0 && teamBRound && Object.keys(teamBRound).length > 0 && (
          <client-only>
            <table>
              <tbody>
                <tr>
                  <td width="10%">
                    <img class="team-logo" src={data.teamALogo} alt=""/>
                  </td>
                  {showData(teamARound.firstHalfRoundArr)}
                  <td class="separator">|</td>
                  {showData(teamARound.secondHalfRoundArr)}
                </tr>
                <tr>
                  <td>
                    <img class="team-logo" src={data.teamBLogo} alt=""/>
                  </td>
                  {showData(teamBRound.firstHalfRoundArr)}
                  <td class="separator">|</td>
                  {showData(teamBRound.secondHalfRoundArr)}
                </tr>
              </tbody>
            </table>
          </client-only>
        )}
      </div>
    )
    const dom = (
      <div class="score-box">
        {blueTable}
        {eventTable}
        {redTable}
      </div>
    )

    return dom
  }
}
</script>

<style lang="less" scoped>
  .score-box{
    width: 850px;
    margin: auto;
    position: relative;
    .blue-table{
      width: 100%;
      margin-top: 10px;
      position: relative;
      z-index: 2;
      &.red{
        thead, .life .life-left{
          background: #F04844;
        }
        td, .iconfont{
          color: #F04844;
        }
      }
      .iconfont{
        color: #677EEA;
        font-size: 20px;
      }
      thead{
        background: #677EEA;
        th{
          font-size: 16px;
          color: #fff;
          text-align: center;
          height: 50px;
          vertical-align: middle;
        }
      }
      tbody{
        tr{
          border-bottom: solid 1px #f5f5f5;
          transition: all .3s;
          &:hover{
            -moz-box-shadow: 0 0 6px 2px #EBEBEB;
            -webkit-box-shadow: 0 0 6px 2px #EBEBEB;
            box-shadow: 0 0 6px 2px #EBEBEB;
          }
          &.dead{
            td{
              color: #CCCCCC;
            }
          }
        }
        td{
          height: 51px;
          vertical-align: middle;
          text-align: center;
          color: #fff;
          font-size: 14px;
          color: #677EEA;
          &:first-child{
            color: #333;
            padding: 0 20px;
          }
        }
        .life{
          width:100px;
          height:20px;
          line-height: 18px;
          margin: auto;
          background: #ccc;
          position: relative;
          text-align: left;
          .life-left{
            height:20px;
            background: #677EEA;
            position: absolute;
            left: 0;
            z-index: 1;
          }
          .num{
            position: relative;
            z-index: 2;
            padding-left: 7px;
            color: #fff;
          }
        }
      }
    }
  }
  .event-box{
    margin: 20px 0;
    table{
      width: 100%;
    }
    tr{
      border: solid 1px #f5f5f5;
      transition: all .3s;
      &:hover{
        -moz-box-shadow: 0 0 6px 2px #EBEBEB;
        -webkit-box-shadow: 0 0 6px 2px #EBEBEB;
        box-shadow: 0 0 6px 2px #EBEBEB;
      }
      &:nth-child(1) {
        .iconfont{
          color: #677EEA;
          font-size: 18px;
        }
      }
      &:nth-child(2) {
        .iconfont{
          color: #F04844;
          font-size: 18px;
        }
      }
    }
    td{
      height: 60px;
      text-align: center;
      vertical-align: middle;
      .team-logo{
        width: 24px;
        height: 24px;
        display: block;
        margin: auto;
      }
      &:first-child{
        padding: 0 16px;
        border-right: solid 1px #f5f5f5;
      }
    }
    .hide{
      color: #fff!important;
    }
    .separator{
      color: #eee;
      padding: 0 4px;
    }
  }
</style>
