<script>
/**
* 实时比分-详情-图文直播-文字组件
* 用法
*/
export default {
  name: 'CsgoLivesText',
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
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
    if (!data || !data.length) { return null }

    function showView (item) {
      const type = item.type
      let content = null
      switch (type) {
        case 'MatchStarted': // 比赛开始
          content = (
            <li>
              <span>{item.map_name}-比赛开始</span>
            </li>
          )
          break
        case 'PlayerJoin': // 选手进入地图
          content = (
            <li>
              <span>{item.player_nick} 进入地图</span>
            </li>
          )
          break
        case 'PlayerQuit': // 选手退出地图
          content = (
            <li>
              <span class={[{
                blue: item.player_side === 'CT',
                red: item.player_side === 'TERRORIST'
              }]}>{item.player_nick} 退出地图</span>
            </li>
          )
          break
        case 'RoundStart': // 回合开始
          content = (
            <li>
              <span>回合开始</span>
            </li>
          )
          break
        case 'RoundEnd': // 回合结束
          content = (
            <li>
              <span>回合结束 <i class="blue">{item.winner_side}</i> 胜利</span>
              <span>（<i class="blue">{item.counter_terrorist_score}</i> - <i class="red">{item.terrorist_score}</i>）</span>
              <span> - 时间耗尽</span>
            </li>
          )
          break
        case 'Kill': // 击杀事件
          content = (
            <li>
              <span class={[{
                blue: item.killer_side === 'CT',
                red: item.killer_side === 'TERRORIST'
              }]}>{item.killer_nick}</span>
              <icon-font class="iconfont" type="iconqiangzhi"></icon-font>
              <span class={[{
                blue: item.victim_side === 'CT',
                red: item.victim_side === 'TERRORIST'
              }]}>{item.victim_nick}</span>
            </li>
          )
          break
        case 'Assist': // 助攻事件
          content = (
            <li>
              <span class={[{
                blue: item.assister_side === 'CT',
                red: item.assister_side === 'TERRORIST'
              }]}>{item.assister_nick}</span>
              <icon-font class="iconfont" type="iconqiangzhi"></icon-font>
              <span class={[{
                blue: item.victim_side === 'CT',
                red: item.victim_side === 'TERRORIST'
              }]}>{item.victim_nick}</span>
            </li>
          )
          break
        case 'Suicide': // 自杀事件
          content = (
            <li>
              <span class={[{
                blue: item.side === 'CT',
                red: item.side === 'TERRORIST'
              }]}>{item.player_nick}</span>
              <span>自杀</span>
            </li>
          )
          break
        case 'Restart': // 比赛重开
          content = (
            <li>
              <span>游戏重开</span>
            </li>
          )
          break
        case 'BombPlanted': // 放置炸弹
          content = (
            <li>
              <span >{item.player_nick}</span>
              <span> 放置炸弹</span>
              <span>（<i class="blue">{item.counter_terrorist_player_num}</i> on <i class="red">{item.terrorist_player_num}</i>）</span>
            </li>
          )
          break
        case 'BoomDefused': // 拆除炸弹除炸弹
          content = (
            <li>
              <span class="blue">{item.player_nick}</span>
              <span> 拆除炸弹</span>
            </li>
          )
          break
        default:
          break
      }
      return content
    }

    const list = (
      <ul class="text-list">
        {data.map((item) => {
          return (
            <div>
              {showView(item)}
            </div>
          )
        })}
      </ul>
    )
    const dom = (
      <div class="live-box">
        {list}
      </div>
    )

    return dom
  }
}
</script>

<style lang="less" scoped>
  .live-box{
    margin: 20px;
    .text-list{
      background: #F7FBFF;
      height: 520px;
      overflow-y: auto;
      padding: 30px;
      li{
        font-size: 16px;
        color: #333;
        padding: 5px 0;
        .blue{
          font-size: 14px;
          color: #677EEA;
          font-style: normal;
        }
        .red{
          font-size: 14px;
          color: #F04844;
          font-style: normal;
        }
        .iconfont{
          color: #333;
          font-size: 18px;
          margin: 0 10px;
        }
      }
    }
  }
</style>
