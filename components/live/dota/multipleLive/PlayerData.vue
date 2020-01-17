<script>
/**
* 实时比分-详情-选手比赛数据组件
* 用法
*/
export default {
  name: 'DotaPlayerData',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      demoImg: require('@/static/img/game-types/demo.png'),
      allData: {}
    }
  },
  computed: {

  },
  created () {

  },
  mounted () {

  },
  methods: {
    setRowData (blue, red) {
      new Array(5).fill(1).map((item, index) => {
        this.allData[index] = {
          'blue': blue[index],
          'red': red[index]
        }
      })
    },
    sortByPosition (a, b) {
      // 按照对战位置排序
      if (a.player_position > b.player_position) {
        return -1
      } else {
        return 1
      }
    }
  },
  render () {
    const { data, allData } = this

    const {
      team_stats: teamStats, // 对局战队数据
      players: playerStats // 选手对局数据
    } = data

    const blueSideId = teamStats[0].team_id // 蓝队
    const redSideId = teamStats[1].team_id // 红队

    const blueArr = playerStats.filter(_ => _.team_id === blueSideId).sort(this.sortByPosition) // 蓝队选手
    const redArr = playerStats.filter(_ => _.team_id === redSideId).sort(this.sortByPosition) // 蓝队选手
    this.setRowData(blueArr, redArr)

    // 计算百分比长度
    function calcPercent (aVal = 0, bVal = 0, role) {
      const all = aVal + bVal
      const aPercent = (aVal / all * 100 - 1)
      const bPercent = (bVal / all * 100 - 1)
      if (role === 'a') { // 减 1是因为中间需要有空隙
        return aPercent + '%'
      } else {
        return bPercent + '%'
      }
    }

    // 计算kda
    function calcKDA (k = 0, d = 0, a = 0) {
      // KDA = （杀人数+助攻数）/死亡数； (若死亡数为0则默认 为1)
      if (d === 0) {
        d = 1
      }
      return ((k + a) / d).toFixed(2)
    }

    // 不满9个装备的，补助9个
    function fillEquipment (data) {
      const len = data.length
      const res = data
      for (let i = 0; i < 9 - len; i++) {
        res.push({
          logo: '',
          name_cn: '空',
          name: '空'
        })
      }
      return res
    }

    const leftInfo = (item) => {
      if (!item.blue) {
        return (
          <div class="left-info">
            <Nodata style="padding: 30px;"></Nodata>
          </div>
        )
      }
      return (
        <div class="left-info">
          <div class="player-name">
            <img class="avatar" title={item.blue.name} src={item.blue.avatar} alt=""/>
            <p class="name">{item.blue.name}</p>
          </div>
          <div class="equipments">
            <span class="hero-level">{item.blue.hero_level}</span>
            <img class="hero" title={item.blue.hero_name} src={item.blue.hero_avatar} alt=""/>
            <div class="equipment">
              {fillEquipment(item.blue.items).map((img) => {
                return <img src={img.logo} title={img.name_cn} alt=""/>
              })}
            </div>
          </div>
        </div>
      )
    }

    // 构造数据div
    function centerLineData (title, name, teamA, teamB) {
      return (
        <div>
          <p class="title">{title}</p>
          <div class="ratio">
            <span class="num">{teamA[name] || 0}</span>
            <div class="percent-box">
              <div class="percent left" style={{ width: calcPercent(teamA[name], teamB[name], 'a') }}></div>
              <div class="percent right" style={{ width: calcPercent(teamA[name], teamB[name], 'b') }}></div>
            </div>
            <span class="num">{teamB[name] || 0}</span>
          </div>
        </div>
      )
    }

    const centerInfo = (item) => {
      const teamRed = item.red ? item.red : {}
      const teamBlue = item.blue ? item.blue : {}
      return (
        <div class="center-info">
          <div class="score">
            <span class="num left">{calcKDA(teamBlue.kill_count, teamBlue.death_count, teamBlue.assist_count)}</span>
            <span class="detail left">{teamBlue.kill_count || 0}/{teamBlue.death_count || 0}/{teamBlue.assist_count || 0}</span>
            <span class="abbr-en">K/D/A</span>
            <span class="detail right">{teamRed.kill_count || 0}/{teamRed.death_count || 0}/{teamRed.assist_count || 0}</span>
            <span class="num right">{calcKDA(teamRed.kill_count, teamRed.death_count, teamRed.assist_count)}</span>
          </div>
          {centerLineData('每分钟金钱', 'gold_per_min', teamBlue, teamRed)}
          {centerLineData('每分钟经验', 'xp_per_min', teamBlue, teamRed)}
          {centerLineData('金钱', 'gold', teamBlue, teamRed)}
          {centerLineData('补刀数', 'last_hit_count', teamBlue, teamRed)}
          {centerLineData('反补数', 'deny_count', teamBlue, teamRed)}
        </div>
      )
    }

    const rightInfo = (item) => {
      if (!item.red) {
        return (
          <div class="right-info">
            <Nodata style="padding: 30px;"></Nodata>
          </div>
        )
      }
      return (
        <div class="right-info">
          <div class="player-name">
            <img class="avatar" title={item.red.name} src={item.red.avatar} alt=""/>
            <p class="name">{item.red.name}</p>
          </div>
          <div class="equipments">
            <div class="equipment">
              {fillEquipment(item.red.items).map((img) => {
                return <img src={img.logo} title={img.name_cn} alt=""/>
              })}
            </div>
            <img class="hero" title={item.red.hero_name} src={item.red.hero_avatar} alt=""/>
            <span class="hero-level">{item.red.hero_level}</span>
          </div>
        </div>
      )
    }
    const dom = (
      <div class="player-box">
        {Object.values(allData).map((item) => {
          return (
            <div class="player-data">
              {leftInfo(item)}
              {centerInfo(item)}
              {rightInfo(item)}
            </div>
          )
        })}
      </div>
    )

    return dom
  }
}
</script>

<style lang="less" scoped>
  .player-box{
    padding-bottom: 30px;
    border-bottom: solid 1px #f5f5f5;
  }
  .player-data{
    padding: 30px 20px 0;
    position: relative;
    min-height: 340px;
    .left-info, .right-info{
      position: absolute;
      top: 30px;
      .player-name{
        overflow: hidden;
        margin-bottom: 30px;
        .avatar{
          width: 90px;
          height: 90px;
        }
        .name{
          font-size: 16px;
          color: #333;
          font-weight: 600;
          word-break: break-all;
          position: relative;
          top: 40px;
        }
      }
      .equipments{
        overflow: hidden;
        .hero{
          width: 48px;
          height: 48px;
        }
        .hero-level{
          border-bottom: 1px solid #999;
          background: #fff;
          position: absolute;
          text-align: center;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          line-height: 18px;
          bottom: -8px;
          font-size: 12px;
          color: #333;
          font-weight: 600;
        }
        .summoner-skil{
          float: left;
          margin: 0 4px;
          img{
            width: 22px;
            height: 22px;
            display: block;
            border-radius: 50%;
            &:first-child{
              margin-bottom: 4px;
            }
          }
        }
        .equipment{
          float: left;
          width: 160px;
          font-size: 0;
          img{
            width: 22px;
            height: 22px;
            display: inline-block;
            &:nth-child(-n+6){
              margin-bottom: 4px;
            }
          }
        }
      }
    }
    .left-info{
      left: 20px;
      .player-name{
        .avatar{
          float: left;
          margin-right: 11px;
        }
        .name{
          text-align: left;
        }
      }
      .equipments{
        .hero{
          float: left;
          margin-right: 4px;
        }
        .hero-level{
          left: 15px;
        }
        .equipment{
          text-align: left;
          img{
            margin-right: 4px;
          }
        }
      }
    }
    .center-info{
      position: absolute;
      left: 50%;
      top: 30px;
      transform: translateX(-50%);
      .score{
        padding-bottom: 16px;
        text-align: center;
        .num{
          font-size: 16px;
          font-weight: 600;
          &.left{
            color: @primary-color;
          }
          &.right{
            color: #F04844;
          }
        }
        .detail{
          font-size: 14px;
          margin: 0 30px;
          &.left{
            color: #677EEA;
          }
          &.right{
            color: #F04844;
          }
        }
        .abbr-en{
          font-size: 16px;
          color: #333;
          font-weight: 600;
        }
      }
      .title{
        font-size: 14px;
        text-align: center;
        color: #333;
        padding: 16px 0 12px;
      }
      .ratio{
        overflow: hidden;
        .num{
          font-size: 12px;
          color: #333;
          float: left;
          width: 50px;
          white-space: nowrap;
          &:nth-child(1){
            text-align: right;
          }
        }
        .percent-box{
          overflow: hidden;
          float: left;
          height: 6px;
          width: 324px;
          margin: 4px 10px 0;
        }
        .percent{
          height: 6px;
          float: left;
          &.left{
            background: #677EEA;
            margin-right: 1%;
          }
          &.right{
            background: #F04844;
          }
        }
      }
    }
    .right-info{
      right: 20px;
      .player-name{
        .avatar{
          float: right;
          margin-left: 11px;
        }
        .name{
          text-align: right;
        }
      }
      .equipments{
        .hero{
          float: left;
          margin-left: 4px;
        }
        .hero-level{
          right: 15px;
        }
        .equipment{
          text-align: right;
          img{
            margin-left: 4px;
          }
        }
      }
    }
  }
</style>
