<script>
/**
* 实时比分-详情-图文直播切换组件
* 用法
* @switchTab 点击tab切换的回调
*/
import { secondToHs } from '@/assets/js/publicFn'
export default {
  name: 'LolLiveGameStauts',
  props: {
    battleData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      demoImg: require('@/static/img/game-types/demo.png'),
      vsImg: require('@/static/img/common/vs.png'),
      smallDragonImg: require('@/static/img/common/lol-small-dragon.png'),
      bigDragonImg: require('@/static/img/common/lol-big-dragon.png'),
      towerImg: require('@/static/img/common/lol-tower.png'),
      infoData: this.battleData
    }
  },
  computed: {

  },
  created () {

  },
  methods: {

  },
  render () {
    const {
      infoData,
      vsImg,
      smallDragonImg,
      bigDragonImg,
      towerImg
    } = this
    const teamStats = infoData.team_stats
    const blueSide = teamStats.filter(_ => _.side === 'blue')[0] // 蓝队
    const redSide = teamStats.filter(_ => _.side === 'red')[0] // 红队

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
        {isWin(blueSide.is_win, 'left')}
        <img class="team-logo left" src={blueSide.team_avatar} alt=""/>
        <div class="team-name left">
          <p class="name">{blueSide.team_short_name}</p>
          <p class="money">
            <icon-font class="coin" type="iconjinbi"></icon-font>
            <span class="num">{blueSide.money}</span>
          </p>
        </div>
        <div class="team-score left">
          <p class="score">{blueSide.kill_count}</p>
          <div class="score-status">
            {showIcons(blueSide.is_first_small_dragon, 'iconxiaolong', '首小龙')}
            {showIcons(blueSide.is_first_big_dragon, 'icondalong', '首大龙')}
            {showIcons(blueSide.is_first_tower, 'icontafang', '首塔')}
            {showIcons(blueSide.is_ten_kills, 'iconsha1', '十杀')}
            {showIcons(blueSide.is_five_kills, 'iconsha', '五杀')}
            {showIcons(blueSide.is_first_blood, 'iconyixie', '一血')}
          </div>
        </div>
        <img class="vs-img" src={vsImg} alt=""/>
        <div class="team-score right">
          <p class="score">{redSide.kill_count}</p>
          <div class="score-status">
            {showIcons(redSide.is_first_small_dragon, 'iconxiaolong', '首小龙')}
            {showIcons(redSide.is_first_big_dragon, 'icondalong', '首大龙')}
            {showIcons(redSide.is_first_tower, 'icontafang', '首塔')}
            {showIcons(redSide.is_ten_kills, 'iconsha1', '十杀')}
            {showIcons(redSide.is_five_kills, 'iconsha', '五杀')}
            {showIcons(redSide.is_first_blood, 'iconyixie', '一血')}
          </div>
        </div>
        <div class="team-name right">
          <p class="name">{redSide.team_short_name}</p>
          <p class="money">
            <span class="num">{redSide.money}</span>
            <icon-font class="coin" type="iconjinbi"></icon-font>
          </p>
        </div>
        <img class="team-logo right" src={redSide.team_avatar} alt=""/>
        {isWin(redSide.is_win, 'right')}
      </div>
    )

    const timeStatus = (
      <div class="status-get">
        <div class="left">
          <div class="type-item">
            <img class="type-bg" src={towerImg} alt=""/>
            <span class="num">{blueSide.tower_success_count}</span>
            <p class="text">防御塔</p>
          </div>
          <div class="type-item">
            <img class="type-bg" src={smallDragonImg} alt=""/>
            <span class="num">{blueSide.small_dragon_count}</span>
            <p class="text">小龙数</p>
          </div>
          <div class="type-item">
            <img class="type-bg" src={bigDragonImg} alt=""/>
            <span class="num">{blueSide.big_dragon_count}</span>
            <p class="text">大龙数</p>
          </div>
        </div>
        <div class="center">
          <div class="line top-line"></div>
          <div class="time">{secondToHs(infoData.duration)}</div>
          <div class="line btm-line"></div>
        </div>
        <div class="right">
          <div class="type-item">
            <img class="type-bg" src={towerImg} alt=""/>
            <span class="num">{redSide.tower_success_count}</span>
            <p class="text">防御塔</p>
          </div>
          <div class="type-item">
            <img class="type-bg" src={smallDragonImg} alt=""/>
            <span class="num">{redSide.small_dragon_count}</span>
            <p class="text">小龙数</p>
          </div>
          <div class="type-item">
            <img class="type-bg" src={bigDragonImg} alt=""/>
            <span class="num">{redSide.big_dragon_count}</span>
            <p class="text">大龙数</p>
          </div>
        </div>
      </div>
    )

    // 渲染图片
    const renderImgs = data => data.map(item => <img class="hero" title={item.name} src={item.avatar} alt=""/>)

    const banPick = (
      <div class="ban-pick">
        <div class="row ban">
          <div class="left">
            {renderImgs(blueSide.ban_list)}
          </div>
          <div class="center">
            <div class="ban-text">BAN</div>
          </div>
          <div class="right">
            {renderImgs(redSide.ban_list)}
          </div>
        </div>
        <div class="row">
          <div class="left">
            {renderImgs(blueSide.pick_list)}
          </div>
          <div class="center">
            <div class="ban-text">PICK</div>
          </div>
          <div class="right">
            {renderImgs(redSide.pick_list)}
          </div>
        </div>
      </div>
    )
    const dom = (
      <div class="game-content">
        {score}
        {timeStatus}
        {banPick}
      </div>
    )

    return dom
  }
}
</script>

<style lang="less" scoped>
  .game-content{
    overflow: hidden;
    .top-score{
      position: relative;
      text-align: center;
      padding-top: 19px;
      height: 80px;
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
          width: 188px;
        }
        .money{
          color: #FFBA00;
        }
        .coin{
          font-size: 14px;
          padding: 0 5px;
        }
        .num{
          font-size: 14px;
          font-weight: 600;
        }
      }
      .team-score{
        text-align: center;
        position: absolute;
        &.left{
          right: 530px;
          text-align: right;
        }
        &.right{
          left: 530px;
          text-align: left;
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
      .vs-img{
        width: 34px;
        height: 34px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .status-get{
      text-align: center;
      padding: 25px 0;
      .left, .right{
        display: inline-block;
        .type-item{
          position: relative;
          display: inline-block;
          margin: 0 22px;
          .type-bg{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            filter: brightness(0.6);
          }
          .num{
            position: absolute;
            font-size: 14px;
            color: #fff;
            font-weight: 600;
            top: 35%;
            left: 50%;
            transform: translate3d(-50%, -50%, 0);
          }
          .text{
            font-size: 12px;
            color: #999;
            padding-top: 9px;
          }
        }
      }
      .center{
        display: inline-block;
        vertical-align: top;
        margin: 0 28px;
        position: relative;
        .time{
          font-size: 14px;
          color: #333;
          width: 50px;
          height: 50px;
          border: solid 1px #C4E4FF;
          border-radius: 50%;
          text-align: center;
          line-height: 50px;
        }
        .line{
          width: 1px;
          background: #C4E4FF;
          position: absolute;
          left: 50%;
          &.top-line{
            height: 34px;
            top: -40px;
          }
          &.btm-line{
            height: 20px;
            bottom: -25px;
          }
        }
      }
    }
    .ban-pick{
      text-align: center;
      background: #F7FBFF;
      .left, .right{
        display: inline-block;
        position: absolute;
        .hero{
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: inline-block;
          margin: 0 7px;
        }
      }
      .left{
        right: 510px;
      }
      .right{
        left: 510px;
      }
      .center{
        display: inline-block;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 18px;
        .ban-text{
          width:52px;
          height:24px;
          border-radius:24px;
          font-size: 14px;
          color: #fff;
          text-align: center;
          line-height: 24px;
          margin: 0 40px;
          background: @primary-color;
        }
      }
      .row{
        padding: 13px 0;
        position: relative;
        height: 60px;
      }
      .ban{
        .left .hero, .right .hero{
          filter: grayscale(1);
        }
        .center .ban-text{
          background: #bbb;
        }
      }
    }
  }
</style>
