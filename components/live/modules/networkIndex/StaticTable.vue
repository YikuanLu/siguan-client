<script>
/**
* 实时比分-详情-全网指数组件
* 用法
**/
export default {
  name: 'StaticTable',
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    baseInfo: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      betData: [],
      sb_bkx: 0,
      is_moving: false
    }
  },
  created () {
    // 接收局数tab切换事件
    this.$bus.on('changeRound', (val) => {
      this.betData = val
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
    this.$bus.off('changeRound')
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
      try {
        const platArr = []
        // 根据数据获取全网指数的平台列表
        this.betData.map((item) => {
          if (!platArr.includes(item.source)) {
            platArr.push(item.source)
          }
        })
        return platArr
      } catch (error) {
        return []
      }
    },
    getBetTypes () {
      try {
        const tempArr = []
        const platArr = []
        const dataSortByTypes = {}
        // 根据数据获取全网指数的赔率类型
        this.betData.map((item) => {
          if (!tempArr.includes(item.betType)) {
            platArr.push({
              title: item.title,
              betType: item.betType
            })
          }
        })

        platArr.map((item) => {
          dataSortByTypes[item.title] = this.betData.filter(_ => _.title === item.title)
        })

        Object.keys(dataSortByTypes).map((k) => {
          dataSortByTypes[k] = this.sort(dataSortByTypes[k], this.getPlatforms())
        })
        console.log(dataSortByTypes)
        return dataSortByTypes
      } catch (error) {
        return {}
      }
    },
    sort (arr, sort) {
      // 将数组中的数据按一定顺序输出, 并在空白位置插入占位值
      const map = {}
      for (const i in arr) {
        const data = arr[i]
        const list = map[data.source]
        if (!list) {
          map[data.source] = [data]
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
    }
  },
  render () {
    const {
      betData,
      baseInfo,
      mousedown,
      mousemove,
      mouseup,
      getPlatforms,
      getBetTypes
    } = this

    const dataSortByTypes = getBetTypes() // 根据赔率类型分组的数据
    // 设置头部的赔率类型
    const setBetTypes = () => {
      return (
        Object.keys(dataSortByTypes).map(k => <th>{k}</th>)
      )
    }
    // 设置要显示的字段
    function showName (name) {
      const showName = baseInfo[name] ? baseInfo[name] : 'TBD'
      return showName
    }

    // 设置头部的竞猜项
    const setOptions = () => {
      return (
        Object.keys(dataSortByTypes).map((k) => {
          const validData = dataSortByTypes[k].filter(_ => !!_)
          if (validData[0]) {
            return (
              <th>
                <a-tooltip title={validData[0].optionList[0] && validData[0].optionList[0].name}>
                  <span class="bet-item">{validData[0].optionList[0] && validData[0].optionList[0].name}</span>
                </a-tooltip>
                <a-tooltip title={validData[0].optionList[1] && validData[0].optionList[1].name}>
                  <span class="bet-item">{validData[0].optionList[1] && validData[0].optionList[1].name}</span>
                </a-tooltip>
              </th>
            )
          } else {
            return (
              <th>
                <a-tooltip title={showName('teamAName')}>
                  <span class="team">{showName('teamAName')}</span>
                </a-tooltip>
                <a-tooltip title={showName('teamBName')}>
                  <span class="team">{showName('teamBName')}</span>
                </a-tooltip>
              </th>
            )
          }
        })
      )
    }
    const fixedTableHead = (
      <thead>
        <tr>
          <th>竞猜项</th>
          {setBetTypes()}
        </tr>
        <tr>
          <th>平台</th>
          {setOptions()}
        </tr>
      </thead>
    )
    const scrollTableHead = (
      <thead>
        <tr>
          {setBetTypes()}
        </tr>
        <tr>
          {setOptions()}
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
    const setBetOdds = (item) => {
      const options = item.optionList ? item.optionList : item.options
      return (
        options.map((inner) => {
          return (
            <div class="index" class={{ index: true, green: inner.trend === -1, red: inner.trend === 1 }}>
              <icon-font class="iconfont down" type="iconxia"></icon-font>
              <icon-font class="iconfont up" type="iconshang"></icon-font>
              <div class="num">
                {/* <span class="increase">{dealOdds(inner.name, item.typeDesc)}</span> */}
                <span class="rate">{inner.odds}</span>
              </div>
            </div>
          )
        })
      )
    }

    // 判断单元格是否要显示
    const isVisibleTd = (outer, item) => {
      if (item) {
        return <td>{setBetOdds(item)}</td>
      } else {
        return <td></td>
      }
    }

    // 设置显示的单元格
    const setVisibleTd = (outer, index) => {
      return (
        Object.keys(dataSortByTypes).map((k) => {
          return (
            isVisibleTd(outer, dataSortByTypes[k][index])
          )
        })
      )
    }

    // 渲染固定表格数据
    const renderFixedData = () => {
      return (
        getPlatforms().map((outer, index) => {
          return (
            <tr>
              <td>{outer}</td>
            </tr>
          )
        })
      )
    }
    // 渲染滑动表格数据
    const renderScrollData = () => {
      return (
        getPlatforms().map((outer, index) => {
          return (
            <tr>
              {setVisibleTd(outer, index)}
            </tr>
          )
        })
      )
    }

    const fixedtableBody = (
      <tbody>
        {renderFixedData()}
      </tbody>
    )
    const scrollTableBody = (
      <tbody>
        {renderScrollData()}
      </tbody>
    )
    const fixedTable = (
      betData && betData.length
        ? (
          <div class={['static-table', 'fixed']}>
            <table title="按住左键拖动" ref="index-table" class="index-table"
              on-mousedown={mousedown}
              on-mousemove={mousemove}
              on-mouseup={mouseup}
              on-mouseleave={mouseup}>
              {fixedTableHead}
              {fixedtableBody}
            </table>
          </div>
        )
        : null
    )

    const scrollTable = (
      <div class="static-table scroll" ref="tableW">
        {betData && betData.length
          ? (
            <table title="按住左键拖动" ref="index-table" class="index-table"
              on-mousedown={mousedown}
              on-mousemove={mousemove}
              on-mouseup={mouseup}
              on-mouseleave={mouseup}>
              {scrollTableHead}
              {scrollTableBody}
            </table>
          )
          : <Nodata style="padding: 30px;"></Nodata>}
      </div>
    )

    const dom = (
      <div class="table-box">
        <client-only>
          {fixedTable}
          {scrollTable}
        </client-only>
      </div>
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
    cursor: grab;
    &::-webkit-scrollbar {
      width: 0 !important;
      height: 0!important;
    }
    &.fixed{
      width: 161px;
      padding: 0 20px;
      background: #fff;
      transition: all .3s;
      cursor: pointer;
      margin-right: 2px;
      overflow: hidden;
      .index-table{
        margin: 0;
        position: initial;
        overflow: hidden;
      }
    }
    &.scroll{
      flex: 1;
    }
  }
  .index-table{
    background: #fff;
    table-layout: fixed;
    display: block;
    position: absolute;
    user-select: none;
    thead{
      th{
        height: 40px;
        vertical-align: middle;
        padding: 0 10px;
        text-align: center;
        font-size: 16px;
        color: #333;
        border: solid 1px #f5f5f5;
        min-width: 140px;
        white-space: nowrap;
      }
      .team{
        font-size: 14px;
        color: #333;
        padding: 0 27px;
        white-space: nowrap;
      }
      .bet-item{
        font-size: 14px;
        color: #333;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 90px;
        display: inline-block;
        line-height: 36px;
        padding: 0 5px;
      }
    }
    tbody{
      tr:hover{
        transition: all 0.3s;
        box-shadow: 0 0 6px 2px #EBEBEB;
      }
      td{
        height: 60px;
        vertical-align: middle;
        padding: 8px 30px;
        text-align: center;
        font-size: 14px;
        color: #666;
        border: solid 1px #f5f5f5;
        min-width: 140px;
        white-space: nowrap;
      }
      .time{
        padding: 5px 0;
      }
      .index{
        position: relative;
        display: inline-block;
        &:first-child{
          .iconfont{
            left: -20px;
          }
        }
        &.red{
          .iconfont{
            color: #FF5D8B;
            display: block;
            &.down{
              display: none;
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
            display: block;
            &.up{
              display: none;
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
          right: -20px;
          top: 5px;
          color: #999;
          width: 20px;
          display: none;
          &.left{
            left: -20px;
          }
        }
        .num{
          display: block;
          width:70px;
          height:28px;
          border:1px solid #999;
          border-radius:4px;
          text-align: center;
          line-height: 28px;
          color: #999;
          font-size: 14px;
          margin: 0 3px;
          display: inline-block;
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
