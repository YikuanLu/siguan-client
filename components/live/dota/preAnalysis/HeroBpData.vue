<script>
/**
* 实时比分-详情-赛前分析-英雄Ban/Pick数据组件
* 用法
*/
export default {
  name: 'DotaHeroBpData',
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
  mounted () {

  },
  methods: {

  },
  render () {
    const {
      team_a_hero_stat: teamA,
      team_b_hero_stat: teamB,
      team_a: teamAInfo,
      team_b: teamBInfo
    } = this.data

    if (!teamA || !teamB) {
      return <Nodata style="padding: 30px;"></Nodata>
    }

    // 转百分比
    function toNumber (val) {
      return Number((val * 100).toFixed(0))
    }

    const blueData = (
      <div class="chart">
        <div class="ban-title">
          <img class="team-logo" src={teamAInfo.logo} alt=""/>
          <span class="ban">BAN</span>
          <img class="team-logo" src={teamBInfo.logo} alt=""/>
        </div>
        <div class="left">
          {teamA.ban ? (
            teamA.ban.slice(0, 5).map((item) => {
              return (
                <div class="item" title={item.hero_name_cn}>
                  <img class="hero-img" src={item.hero_logo} alt=""/>
                  <div class="percent-box">
                    <p class="num">{item.hero_name_cn}</p>
                    <a-progress class="percent"
                      strokeLinecap='square'
                      strokeColor="#677EEA"
                      strokeWidth={10}
                      percent={toNumber(item.banned_win_rate)}
                      status="active"/>
                  </div>
                </div>
              )
            })
          ) : <Nodata style="padding: 30px;height: 280px;"></Nodata>}
        </div>
        <div class="right">
          {teamB.ban ? (
            teamB.ban.slice(0, 5).map((item) => {
              return (
                <div class="item" title={item.hero_name_cn}>
                  <div class="percent-box">
                    <p class="num">{item.hero_name_cn}</p>
                    <a-progress class="percent"
                      strokeLinecap='square'
                      strokeColor="#F04844"
                      strokeWidth={10}
                      percent={toNumber(item.banned_win_rate)}
                      status="active"/>
                  </div>
                  <img class="hero-img" src={item.hero_logo} alt=""/>
                </div>
              )
            })
          ) : <Nodata style="padding: 30px;height: 280px;"></Nodata>}
        </div>
      </div>
    )
    const redData = (
      <div class="chart">
        <div class="ban-title">
          <img class="team-logo" src={teamAInfo.logo} alt=""/>
          <span class="ban pick">PICK</span>
          <img class="team-logo" src={teamBInfo.logo} alt=""/>
        </div>
        <div class="left">
          {teamA.pick ? (
            teamA.pick.map((item) => {
              return (
                <div class="item" title={item.hero_name_cn}>
                  <img class="hero-img" src={item.hero_logo} alt=""/>
                  <div class="percent-box">
                    <p class="num">{item.hero_name_cn}</p>
                    <a-progress class="percent"
                      strokeLinecap='square'
                      strokeColor="#677EEA"
                      strokeWidth={10}
                      percent={toNumber(item.win_rate)}
                      status="active"/>
                  </div>
                </div>
              )
            })
          ) : <Nodata style="padding: 30px;height: 280px;"></Nodata> }
        </div>
        <div class="right">
          {teamB.pick ? (
            teamB.pick.map((item) => {
              return (
                <div class="item" title={item.hero_name_cn}>
                  <div class="percent-box">
                    <p class="num">{item.hero_name_cn}</p>
                    <a-progress class="percent"
                      strokeLinecap='square'
                      strokeColor="#F04844"
                      strokeWidth={10}
                      percent={toNumber(item.win_rate)}
                      status="active" />
                  </div>
                  <img class="hero-img" src={item.hero_logo} alt=""/>
                </div>
              )
            })
          ) : <Nodata style="padding: 30px;height: 280px;"></Nodata> }
        </div>
      </div>
    )
    const dom = (
      <div class="player-box">
        {blueData}
        {redData}
      </div>
    )

    return dom
  }
}
</script>

<style lang="less" scoped>
  .player-box{
    overflow: hidden;
    text-align: center;
    .ban-title{
      display: flex;
      justify-content: space-between;
      padding-bottom: 20px;
      clear: both;
      .team-logo{
        width: 34px;
        max-height: 34px;
      }
      .ban{
        width:52px;
        height:24px;
        background:rgba(187,187,187,1);
        border-radius:24px;
        color: #fff;
        font-size: 14px;
        text-align: center;
        line-height: 24px;
        &.pick{
          background: @primary-color;
          color: #fff;
        }
      }
    }
    .chart{
      overflow: hidden;
      width: 420px;
      padding: 0 30px;
      display: inline-block;
      &:first-child{
        border-right: solid 1px #f5f5f5;
      }
    }
    .left, .right{
      .percent-box{
        display: inline-block;
        vertical-align: middle;
      }
      .item{
        white-space: nowrap;
        margin-bottom: 20px;
        .hero-img{
          width: 34px;
          height: 34px;
          display: inline-block;
          vertical-align: middle;
        }
        .num{
          font-size: 14px;
          color: #333;
          text-align: left;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100px;
        }
        .percent{
          width: 100px;
          margin-top: 10px;
          font-size: 0;
          display: block;
        }
      }
    }
    .left{
      float: left;
      .hero-img{
        float: left;
        margin-right: 10px;
      }
    }
    .right{
      float: right;
      .item{
        .hero-img{
          margin-left: 10px;
        }
        .percent{
          transform: rotate(180deg);
        }
        .num{
          text-align: right;
        }
      }
    }
     /deep/ .ant-progress-inner{
      background: transparent;
      .ant-progress-bg{
        height: 10px;
      }
    }
    /deep/ .ant-progress-text{
      font-size: 12px;
      color: #677EEA;
    }
    /deep/ .right .ant-progress-text{
      font-size: 12px;
      transform: rotate(180deg);
      color: #F04844;
    }
  }
</style>
