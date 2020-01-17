<script>
/**
* 全网指数-表格组件
**/
import { formatTime } from '@/assets/js/publicFn'
export default {
  name: 'IndexGameList',
  props: {
    gameType: {
      type: String,
      default: 'lol'
    }
  },
  data () {
    return {
      thead: [ '赛事', '时间', '战队', '竞猜项' ],
      demoImg: require('@/static/img/game-types/icon-lol-color.png'),
      sb_bkx: 0,
      is_moving: false,
      betData: [],
      playStatus: {
        0: `未开始`,
        1: `直播中`,
        2: `已结束`
      }
    }
  },
  mounted () {
    this.$bus.on('sortBetData', (val) => {
      if (val === 'sortByGame') {
        this.betData.sort(this.sortById)
      } else {
        this.betData.sort(this.sortByTime)
      }
    })
  },
  created () {
    // 接收指数表格数据
    this.$bus.on('setBetData', (data) => {
      this.betData = data
      // 错误处理，防止页面404
      this.$nextTick(() => {
        try {
          this.$refs['index-table'].style.left = '0px'
        } catch (error) {

        }
      })
    })
  },
  beforeDestory () {
    this.$bus.off('setBetData')
    this.$bus.off('sortBetData')
  },
  methods: {
    mousedown (event) {
      const startx = event.x
      this.sb_bkx = startx - this.$refs['index-table'].offsetLeft
      this.is_moving = true
    },
    mousemove (event) {
      const endx = event.x - this.sb_bkx
      const tableW = this.$refs['index-table'].clientWidth - this.$refs.tableW.clientWidth + 40
      if (this.is_moving && endx < 0 && endx > -tableW) {
        this.$refs['index-table'].style.left = endx + 'px'
      }
    },
    mouseup (e) {
      this.is_moving = false
    },
    getPlatforms () {
      const platArr = []
      // 根据数据获取全网指数的平台列表
      this.betData.map((item) => {
        if (!platArr.includes(item.matchId)) {
          platArr.push(item.matchId)
        }
      })
      return platArr
    },
    getMatchs () {
      const tempArr = []
      const platArr = []
      const dataSortByTypes = {}
      // 根据数据获取全网指数的比赛场次
      this.betData.map((item) => {
        if (!tempArr.includes(item.matchId)) {
          platArr.push({
            source: item.source,
            matchId: item.matchId
          })
        }
      })

      platArr.map((item) => {
        dataSortByTypes[item.source] = this.betData.filter(_ => _.source === item.source)
      })

      Object.keys(dataSortByTypes).map((k) => {
        dataSortByTypes[k] = this.sortArr(dataSortByTypes[k], this.getPlatforms())
      })

      return dataSortByTypes
    },
    sortArr (arr, sort) {
      // 将数组中的数据按一定顺序输出, 并在空白位置插入占位值
      const map = {}
      for (const i in arr) {
        const data = arr[i]
        const list = map[data.matchId]
        if (!list) {
          map[data.matchId] = [data]
        } else {
          list.push(data)
        }
      }

      let result = []
      for (const i in sort) {
        const k = sort[i]
        if (k in map) {
          result = result.concat(map[k])
        } else {
          result = result.concat(null)
        }
      }
      return result
    },
    sortById (a, b) {
      if (a.matchId > b.matchId) {
        return -1
      } else {
        return 1
      }
    },
    sortByTime (a, b) {
      if (a.matchTime > b.matchTime) {
        return -1
      } else {
        return 1
      }
    },
    toMatch (item) {
      const routeData = this.$router.resolve({
        path: `/live/${this.gameType}/${item}?tab=2`
      })
      window.open(routeData.href, '_blank')
    }
  },
  render () {
    if (!this.betData || !this.betData.length) {
      return <Nodata style="padding: 30px;"></Nodata>
    }
    const {
      thead,
      mousedown,
      mousemove,
      mouseup,
      betData,
      getPlatforms,
      getMatchs,
      toMatch
    } = this
    // console.log('betData', betData)
    const platforms = getPlatforms()
    const dataSortByTypes = getMatchs() // 根据比赛id分组的数据

    const fixedTableHead = (
      <thead>
        <tr>
          {thead.map((item) => {
            return <th>{item}</th>
          })}
        </tr>
      </thead>
    )
    const scrollTableHead = (
      <thead>
        <tr>
          {Object.keys(dataSortByTypes).map((item) => {
            return <th>{item}</th>
          })}
        </tr>
      </thead>
    )
    /*
    // 处理让分类型的加减值
    const dealOdds = (name, val) => {
      if (!val) { return }
      // 数据中不带+和减的，手动默认+
      if (!val.includes('+') && !val.includes('-')) {
        val = '+' + val
      }

      if (name.includes(val)) {
        return val
      } else {
        const rate = parseFloat(val)
        if (val.includes('-')) {
          return '+' + -rate
        } else {
          return -rate
        }
      }
    }
    */

    // 设置赔率显示
    const setBetOdds = (data) => {
      return (
        data.optionList.map((inner) => {
          return (
            <p class={{ index: true, green: inner.trend === -1, red: inner.trend === 1 }}>
              <icon-font class="iconfont down" type="iconxia"></icon-font>
              <icon-font class="iconfont up" type="iconshang"></icon-font>
              <div class="num">
                {/* <span class="increase">{dealOdds(inner.name, data.typeDesc)}</span> */}
                <span class="rate">{inner.odds}</span>
              </div>
            </p>
          )
        })
      )
    }

    // 判断单元格是否要显示
    const isVisibleTd = (item) => {
      if (item) {
        return <td>{setBetOdds(item)}</td>
      } else {
        return <td></td>
      }
    }

    // 通过id获取比赛信息
    const getMatchById = (id) => {
      const curMatch = betData.filter(_ => _.matchId === id)
      // console.log(curMatch)
      if (curMatch[0]) {
        return curMatch[0]
      } else {
        return {}
      }
    }
    const fixedTableBody = (
      // 0:未开始 1:进行中 2:已结束
      <tbody>
        {platforms.map((item, index) => {
          return (
            <tr on-click={toMatch.bind(this, item)} title="点击查看比赛">
              <td>
                <a-tooltip title={getMatchById(item).leagueName}>
                  <span class="league-name">{getMatchById(item).leagueName}</span>
                </a-tooltip>
                <span class="bo">B0{getMatchById(item).bo}</span>
              </td>
              <td>
                <p class="time">{formatTime(getMatchById(item).matchTime, 'M-D')}</p>
                <p class="time">{formatTime(getMatchById(item).matchTime, 'h:m')}</p>
              </td>
              <td>
                <a-tooltip title={getMatchById(item).teamAShortName}>
                  <p class="team">
                    <img src={getMatchById(item).teamALogo} alt=""/>
                  </p>
                </a-tooltip>
                <a-tooltip title={getMatchById(item).teamBShortName}>
                  <p class="team">
                    <img src={getMatchById(item).teamBLogo} alt=""/>
                  </p>
                </a-tooltip>
              </td>
              <td class="bets">
                <a-tooltip title={getMatchById(item).optionList[0] && getMatchById(item).optionList[0].name}>
                  <p class="bet-item">{getMatchById(item).optionList[0] && getMatchById(item).optionList[0].name}</p>
                </a-tooltip>
                <a-tooltip title={getMatchById(item).optionList[1] && getMatchById(item).optionList[1].name}>
                  <p class="bet-item">{getMatchById(item).optionList[1] && getMatchById(item).optionList[1].name}</p>
                </a-tooltip>
              </td>
              <td>
                <p class="index">
                  <div class="num">
                    <span class="rate">placeholder</span>
                  </div>
                </p>
                <p class="index">
                  <div class="num">
                    <span class="rate">placeholder</span>
                  </div>
                </p>
              </td>
            </tr>
          )
        })}
      </tbody>
    )
    const scrollTableBody = (
      // 0:未开始 1:进行中 2:已结束
      <tbody>
        {platforms.map((item, index) => {
          return (
            <tr>
              { Object.keys(dataSortByTypes).map((k) => {
                return (
                  isVisibleTd(dataSortByTypes[k][index])
                )
              })}
            </tr>
          )
        })}
      </tbody>
    )
    const fixedTable = (
      <div class={['static-table', 'fixed']}>
        <table class="index-table">
          {fixedTableHead}
          {fixedTableBody}
        </table>
      </div>
    )
    const scrollTable = (
      <div class="static-table scroll" ref="tableW">
        <table title="按住左键拖动" ref="index-table" class="index-table"
          on-mousedown={mousedown}
          on-mousemove={mousemove}
          on-mouseup={mouseup}
          on-mouseleave={mouseup}>
          {scrollTableHead}
          {scrollTableBody}
        </table>
      </div>
    )
    const dom = (
      <client-only>
        <div class="table-box">
          {fixedTable}
          {scrollTable}
        </div>
      </client-only>
    )
    return dom
  }
}
</script>
<style scoped lang="less">
  .table-box{
    position: relative;
    overflow: hidden;
    display: flex;
    &:hover{
      .fixed{
        box-shadow: 1px 2px 6px 2px #EBEBEB;
      }
    }
  }
  .static-table{
    position: relative;
    overflow-x: auto;
    background: #fff;
    cursor: grab;
    &::-webkit-scrollbar {
      width: 0 !important;
      height: 0!important;
    }
    &.fixed{
      width: 383px;
      background: #fff;
      transition: all .3s;
      margin-right: 2px;
      cursor: pointer;
      overflow: hidden;
      .index-table{
        margin: 0;
        position: initial;
        overflow: hidden;
        tbody td{
          &.bets{
            white-space: normal;
          }
        }
        thead th{
          min-width: 70px;
          background: #f5f5f5;
          border: none;
          &:first-child{
            border-left: solid 1px #e8e8e8;
          }
        }
      }
      .bo{
        padding-top: 9px;
        display: block;
      }
    }
    &.scroll{
      flex: 1;
    }
  }
  .index-table{
    background: #fff;
    table-layout: fixed;
    overflow-x: auto;
    display: block;
    position: absolute;
    user-select: none;
    &::-webkit-scrollbar {
      width: 0 !important;
      height: 0!important;
    }
    thead{
      th{
        height: 70px;
        vertical-align: middle;
        padding: 0 10px;
        text-align: center;
        font-size: 16px;
        color: #333;
        border: solid 1px #f5f5f5;
        min-width: 70px;
      }
    }
    tbody{
      tr:hover{
        transition: all 0.3s;
        box-shadow: 0 0 6px 2px #EBEBEB;
      }
      td{
        height: 70px;
        vertical-align: middle;
        padding: 0 10px;
        text-align: center;
        font-size: 14px;
        color: #666;
        border: solid 1px #f5f5f5;
        min-width: 70px;
        white-space: nowrap;
      }
      .league-name{
        display: block;
        width: 60px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .team-name{
        width: 50px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        display: inline-block;
        vertical-align: middle;
      }
      .bet-item{
        width: 140px;
        line-height: 30px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        display: inline-block;
        vertical-align: middle;
      }
      .time{
        padding: 5px 0;
      }
      .team{
        padding: 5px 0;
        white-space: nowrap;
        img{
          width: 35px;
          max-height: 27px;
        }
      }
      .index{
        margin: 8px 0;
        position: relative;

        &.red{
          .iconfont{
            color: #FF5D8B;
            &.up{
              display: block;
            }
          }
          .num{
            color: #FF5D8B;
            border-color: #FF5D8B;
          }
        }
        &.green{
          .iconfont{
            color: #1ABC9C;
            &.down{
              display: block;
            }
          }
          .num{
            color: #1ABC9C;
            border-color: #1ABC9C;
          }
        }
        .iconfont{
          position: absolute;
          font-size: 20px;
          right: -5px;
          top: 5px;
          color: #999;
          display: none;
        }
        .num{
          display: block;
          width:70px;
          height:28px;
          border:1px solid #E0E0E0;
          border-radius:4px;
          text-align: center;
          line-height: 28px;
          color: #999;
          font-size: 14px;
          margin: 0 20px;
          .increase{
            font-size: 10px;
            padding-right: 8px;
          }
          .rate{
            font-weight: 600;
          }
        }
      }
    }
  }
</style>
