<script>
import { formatTime } from '@/assets/js/publicFn'
export default {
  name: 'MatchItem',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    toMatch (item) {
      let query = ''
      switch (item.status) {
        case 0:
          query = `?tab=3`
          break
        case 2:
          query = `?tab=4`
          break
        default:
          break
      }
      const routeData = this.$router.resolve({
        path: `/live/${this.$route.params.gameType}/${item.matchId ||
          item.match_id}${query}`
      })
      window.open(routeData.href, '_blank')
    }
  },
  render () {
    //  {0:未开始 1:进行中 2:已结束 3:延时 4:已删除}
    const { data, toMatch } = this

    const gameStatus = {
      0: '未开始',
      1: '进行中',
      2: '已结束',
      3: '延时',
      4: '已删除'
    }
    const week = new Date(data.matchTime || data.matchTime).getDay()
    const weekday = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

    const createItemTeam = (logo, name) => (
      <div class="team">
        <div class="logoBox">
          <img src={logo} />
        </div>
        <p>{name}</p>
      </div>
    )

    const createTBD = (
      <div class="team">
        <div class="logoBox">
          <GameTypeIcon
            type={this.$route.params.gameType}
            style="font-size: 16px;color: #999;"
          />
        </div>
        <p>TBD</p>
      </div>
    )

    // 兼容后端沙雕数据做出的妥协判断
    const teamALogo = data.teamALogo || data.team_a_logo
    const teamBLogo = data.teamBLogo || data.team_b_logo
    const teamAName = data.teamAName || data.team_a_name
    const teamBName = data.teamBName || data.team_b_name

    return (
      <div class="content">
        <div class="mainContent">
          <div class="header clearfix">
            <div class="fl">
              {formatTime(data.matchTime || data.matchTime, 'M-D')}&nbsp;&nbsp;
              {formatTime(data.matchTime || data.matchTime, 'h:m')}&nbsp;&nbsp;
              {weekday[week]}&nbsp;&nbsp;BO{data.bo}
            </div>
            <div class="fr">{gameStatus[data.status]}</div>
          </div>
          <div class="body">
            {teamAName ? createItemTeam(teamALogo, teamAName) : createTBD}
            <div class="mid">
              <img src={require('~/assets/img/vs.png')} alt="vs" />
            </div>
            {teamBName ? createItemTeam(teamBLogo, teamBName) : createTBD}
          </div>
        </div>
        <div class="footer">
          <span
            on-click={() => {
              toMatch(data)
            }}
          >
            {data.status === 0
              ? '赛前分析'
              : data.status === 1
                ? '在线直播'
                : data.status === 2
                  ? '赛后数据'
                  : '--'}
          </span>
        </div>
      </div>
    )
  }
}
// <img src="https://static.wanplus.com/data/event/banner/block/117435.png?v=0&imageView2/1/w/308/h/208" />
</script>

<style lang="less" scoped>
.content {
  width: 270px;
  height: 180px;
  display: inline-block;
  margin: 0 10px;
  border: 1px solid #f5f5f5;
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
  }
  .mainContent {
    padding: 20px;
    .header {
      .fl {
        color: #333333;
        font-size: 14px;
      }
      .fr {
        color: #999999;
        font-size: 14px;
      }
    }
  }
  .body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 20px 10px 0;
    .team {
      display: flex;
      width: 60px;
      flex-wrap: wrap;
      justify-content: center;
      .logoBox {
        text-align: center;
        width: 100%;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          height: 30px;
        }
      }
      p {
        text-align: center;
        width: 50px;
        font-size: 14px;
        color: #333333;
        margin-top: 10px;
        overflow: hidden; //超出的文本隐藏
        text-overflow: ellipsis; //溢出用省略号显示
        white-space: nowrap; //溢出不换行
      }
    }
  }
  .footer {
    border-top: 1px solid #f5f5f5;
    height: 51px;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      padding: 6px 8px;
      border-radius: 4px;
      background-color: #f4f4f4;
      color: #999999;
      font-size: 14px;
      cursor: pointer;
      transition: background 0.2s;
      transition: color 0.2s;
      &:hover {
        background-color: @primary-color;
        color: #fff;
      }
    }
  }
}
</style>
