import GameListOngoing from './modules/GameListOngoing'
import GameListNotStart from './modules/GameListNotStart'
import GameListEnded from './modules/GameListEnded'
import GameListSortByGame from './modules/GameListSortByGame'

export default {
  name: 'GameListIndex',
  components: {
    GameListOngoing,
    GameListNotStart,
    GameListEnded,
    GameListSortByGame
  },
  props: {
    type: {
      type: String,
      default: 'onGoing'
    },
    time: {
      type: String,
      default: '---'
    },
    data: { // 原始数据
      type: Array,
      default: () => []
    },
    onData: { // 进行中的比赛数据
      type: Object,
      default: () => {}
    },
    allLeague: { // 当前所有的联赛集合
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      typeStatus: {
        notStart: '0',
        onGoing: '1',
        ended: '2'
      }
    }
  },
  render () {
    const { type, time, data, typeStatus, allLeague, onData } = this

    // 当天的未开始、进行中、已结束，如无数据隐藏整块
    if (typeStatus[type] &&
      (!data || !data.filter(_ => _.status === Number(typeStatus[type])).length)) {
      return null
    }
    // 获取周几
    function getDay (time) {
      const week = new Date(time).getDay()
      const weekday = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      return weekday[week]
    }

    const onGoingTitle = (
      <div class="game-sort-title ongoing">
        <icon-font type="iconjinhangzhong" class="title-iconfont"></icon-font>
        <span class="text">正在进行的比赛</span>
      </div>
    )
    const notStartTitle = (
      <div class="game-sort-title notstart">
        <icon-font type="iconshalou" class="title-iconfont"></icon-font>
        <span class="text">未开始的比赛</span>
      </div>
    )
    const endedTitle = (
      <div class="game-sort-title ended">
        <icon-font type="iconjieshudefuben" class="title-iconfont"></icon-font>
        <span class="text">已结束的比赛</span>
      </div>
    )
    const timeTitle = (
      <div class="game-sort-title ended">
        <icon-font type="iconrili" class="title-iconfont"></icon-font>
        <span class="text">{time} &nbsp; {getDay(time)}</span>
      </div>
    )

    switch (type) {
      case 'onGoing':
        return <div class="game-list index-list">{onGoingTitle}<GameListOngoing allLeague={allLeague} data={onData} /></div>
      case 'notStart':
        return <div class="game-list index-list">{notStartTitle}<GameListNotStart data={data} /></div>
      case 'ended':
        return <div class="game-list index-list">{endedTitle}<GameListEnded data={data}/></div>
      case 'endedByTime':
        return <div class="game-list index-list">{timeTitle}<GameListEnded data={data} /></div>
      case 'notStartByTime':
        return <div class="game-list index-list">{timeTitle}<GameListNotStart data={data}/></div>
      case 'sortByGame':
        return <div class="game-list index-list"><GameListSortByGame data={data}/></div>
      default:
        return null
    }
  }
}
