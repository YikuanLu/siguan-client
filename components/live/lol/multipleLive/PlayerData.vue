<script>
/**
* 实时比分-详情-选手比赛数据组件
* 用法
*/
export default {
  name: 'LolPlayerData',
  props: {
    battleData: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      infoData: {},
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
      blue.map((item, index) => {
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
    const { battleData, allData } = this
    const infoData = battleData
    const {
      team_stats: teamStats, // 对局战队数据
      player_stats: playerStats // 选手对局数据
    } = infoData
    const blueSideId = teamStats.filter(_ => _.side === 'blue')[0].team_id // 蓝队
    const redSideId = teamStats.filter(_ => _.side === 'red')[0].team_id // 红队

    const blueArr = playerStats.filter(_ => _.team_id === blueSideId).sort(this.sortByPosition) // 蓝队选手
    const redArr = playerStats.filter(_ => _.team_id === redSideId).sort(this.sortByPosition) // 蓝队选手
    this.setRowData(blueArr, redArr)

    // 计算百分比长度
    function calcPercent (aVal, bVal, role) {
      const all = aVal + bVal
      const aPercent = (aVal / all * 100 - 1)
      const bPercent = (bVal / all * 100 - 1)
      if (role === 'a') { // 减 1是因为中间需要有空隙
        return aPercent + '%'
      } else {
        return bPercent + '%'
      }
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
            <img class="avatar" title={item.blue.player_nick_name} src={item.blue.player_avatar} alt=""/>
            <p class="name">{item.blue.player_nick_name}</p>
          </div>
          <div class="equipments">
            <span class="hero-level">{item.blue.hero_level}</span>
            <img class="hero" title={item.blue.hero_name} src={item.blue.hero_avatar} alt=""/>
            <div class="summoner-skil">
              {item.blue.skill_list.map((img) => {
                return <img src={img.image} title={img.name} alt=""/>
              })}
            </div>
            <div class="equipment">
              {item.blue.equip_list.map((img) => {
                return <img src={img.image} title={img.name} alt=""/>
              })}
            </div>
          </div>
        </div>
      )
    }

    // 构造数据div
    function centerLineData (title, name, teamA, teamB) {
      if (name === 'no-data' || (!teamA[name] && !teamA[name])) {
        return (
          <div>
            <p class="title">{title}</p>
            <div class="ratio">
              <span class="num">0</span>
              <div class="percent-box">
                <div class="percent left" style={{ width: '49%' }}></div>
                <div class="percent right" style={{ width: '49%' }}></div>
              </div>
              <span class="num">0</span>
            </div>
          </div>
        )
      }
      return (
        <div>
          <p class="title">{title}</p>
          <div class="ratio">
            <span class="num">{teamA[name]}</span>
            <div class="percent-box">
              <div class="percent left" style={{ width: calcPercent(teamA[name], teamB[name], 'a') }}></div>
              <div class="percent right" style={{ width: calcPercent(teamA[name], teamB[name], 'b') }}></div>
            </div>
            <span class="num">{teamB[name]}</span>
          </div>
        </div>
      )
    }

    const centerInfo = (item) => {
      if (!item.red || !item.blue) {
        return (
          <div class="center-info">
            <div class="score">
              <span class="num left">0</span>
              <span class="detail left">0/0/0</span>
              <span class="abbr-en">K/D/A</span>
              <span class="detail right">0/0/0</span>
              <span class="num right">0</span>
            </div>
            {centerLineData('金钱', 'no-data')}
            {centerLineData('补刀', 'no-data')}
            {centerLineData('输出伤害', 'no-data')}
            {centerLineData('承受伤害', 'no-data')}
          </div>
        )
      }
      return (
        <div class="center-info">
          <div class="score">
            <span class="num left">{item.blue.kda.toFixed(2)}</span>
            <span class="detail left">{item.blue.kill_count}/{item.blue.death_count}/{item.blue.assist_count}</span>
            <span class="abbr-en">K/D/A</span>
            <span class="detail right">{item.red.kill_count}/{item.red.death_count}/{item.red.assist_count}</span>
            <span class="num right">{item.red.kda.toFixed(2)}</span>
          </div>
          {centerLineData('金钱', 'money_count', item.blue, item.red)}
          {centerLineData('补刀', 'last_hit_count', item.blue, item.red)}
          {centerLineData('输出伤害', 'damage_count', item.blue, item.red)}
          {centerLineData('承受伤害', 'damage_taken_count', item.blue, item.red)}
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
            <img class="avatar" title={item.red.player_nick_name} src={item.red.player_avatar} alt=""/>
            <p class="name">{item.red.player_nick_name}</p>
          </div>
          <div class="equipments">
            <div class="equipment">
              {item.red.equip_list.map((img) => {
                return <img src={img.image} title={img.name} alt=""/>
              })}
            </div>
            <div class="summoner-skil">
              {item.red.skill_list.map((img) => {
                return <img src={img.image} title={img.name} alt=""/>
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
          width: 110px;
          font-size: 0;
          img{
            width: 22px;
            height: 22px;
            display: inline-block;
            &:nth-child(-n+4){
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
