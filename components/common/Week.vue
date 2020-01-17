<script>
/**
* 周日历组件
* 用法
* @selectDate 返回当前选择的日期对象，格式参照formatDate
* import Week from '~/components/common/Week'
* components: { week }
* <week @selectDate="selectDate"></week>
*/
import { getTodayZero, getDayZero } from '@/assets/js/publicFn'
// 当前时区
// const timeZone = new Date().getTimezoneOffset() / 60
export default {
  name: 'Week',
  props: {
    value: {
      type: [Number, String],
      default: getDayZero(+new Date())
    }
  },
  data () {
    return {
      currentFirstDate: '',
      todayDate: '',
      weekDayArr: [],
      selected: this.value,
      isClickWeek: false // 是否点击上一周或下一周了
    }
  },
  created () {
    this.setNowDate()
    this.selected = this.todayDate.timeStamp
    // 接收周日历组件改变
    this.$bus.on('changeWeek', (item) => {
      this.isClickWeek = true
      const timeStamp = getDayZero(item.date)
      this.weekDayArr = []
      this.setDates(new Date(timeStamp))
    })
  },
  beforeDestory () {
    this.$bus.off('changeWeek')
  },
  methods: {
    setNowDate () {
      this.todayDate = this.formatDate(new Date())
      this.setDates(new Date())
    },
    getNowDate () {
      const now = new Date()
      const year = now.getFullYear()
      const month = this.isGt10(now.getMonth() + 1)
      const day = this.isGt10(now.getDate())
      return year + month + day
    },
    isGt10 (v) {
      return v < 10 ? `0${v}` : v
    },
    // 日期格式处理
    formatDate (date) {
      const year = date.getFullYear()
      const month = this.isGt10(date.getMonth() + 1)
      const day = this.isGt10(date.getDate())
      const week =
        // eslint-disable-next-line standard/computed-property-even-spacing
        ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()]
      const ymd = `${year}-${month}-${day}`
      return {
        date: `${month}-${day}`,
        day: week,
        fullDate: ymd,
        timeStamp: getDayZero(+new Date(ymd))
      }
    },

    //
    addDate (date, n) {
      date.setDate(date.getDate() + n)
      return date
    },
    //
    setDates (date) {
      const week = date.getDay() - 1
      week === -1
        ? (date = this.addDate(date, -6))
        : (date = this.addDate(date, week * -1))
      this.currentFirstDate = new Date(date)
      for (let i = 0; i < 7; i++) {
        const dateItem = this.formatDate(
          i === 0 ? this.addDate(date, 0) : this.addDate(date, 1)
        )
        this.weekDayArr.push({
          date: dateItem.date,
          day: dateItem.day,
          fullDate: dateItem.fullDate,
          timeStamp: dateItem.timeStamp
        })
      }
      this.setWeekIntoArr()
    },
    setWeekIntoArr () {
      const weekArr = {}
      this.weekDayArr.map((item) => {
        weekArr[item.fullDate] = []
      })
      this.weekDayArr.map((item) => {
        item.weekArr = weekArr
      })
    },
    // 点击了上下一周
    weekClick (val) {
      this.isClickWeek = true
      this.weekDayArr = []
      this.setDates(this.addDate(this.currentFirstDate, val))
      this.$emit('selectOtherWeek', val)
    },
    // 上一周
    lastClick () {
      this.weekClick(-7)
    },
    // 下一周
    nextClick () {
      this.weekClick(7)
    },
    // 回到今天
    nowClick () {
      this.weekDayArr = []
      this.setNowDate()
    },
    //  选择日期
    selectDate (item) {
      this.isClickWeek = false
      this.selected = item.timeStamp
      this.$emit('selectDate', item)
    }
  },
  render () {
    if (this.isClickWeek) { // 如果点击了或者通过外部来改变上下周，默认选中的值用外部传入
      this.selected = this.value
    }

    const { weekDayArr, selectDate, selected, lastClick, nextClick } = this
    const week = (
      <div class="week-header">
        {weekDayArr.map((item, index) => {
          return (
            <div
              key={index}
              class={{ 'week-day': true, now: item.timeStamp === selected }}
              onClick={selectDate.bind(this, item)}
            >
              <span class="day">{ getTodayZero() === item.timeStamp ? '今天' : item.day }</span>
              <span class="date">{ item.date }</span>
            </div>
          )
        })}
      </div>
    )
    const dom = (
      <div class="week-box">
        <icon-font class="week-iconfont prev" type="iconxiayige-copy" onClick={lastClick}></icon-font>
        <icon-font class="week-iconfont next" type="iconxiayige" onClick={nextClick}></icon-font>
        {week}
      </div>
    )
    return dom
  }
}
</script>

<style lang="less" scoped>
  .week-box{
    background: #fff;
    position: relative;
    user-select: none;
    .week-iconfont{
      color: #C2C2C2;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      font-size: 30px;
      &:hover{
        color: @primary-color;
      }
      &.prev{
        left: 30px;
      }
      &.next{
        right: 30px;
      }
    }
    .week-header{
      display: -moz-box;
      display: -ms-flexbox;
      display: -webkit-box;
      display: -webkit-flex;
      display: flexbox;
      display: flex;
      justify-content: space-between;
      margin: 0 70px;
      .week-day{
        width:70px;
        height:50px;
        text-align: center;
        border-radius:4px;
        margin: 15px auto;
        color: #212121;
        line-height: 30px;
        cursor: pointer;
        &.now{
          color: #fff;
          background: @primary-color;
        }
        .day{
          font-size: 16px;
        }
        .date{
          font-size: 14px;
          display: block;
        }
      }
    }
  }
</style>
