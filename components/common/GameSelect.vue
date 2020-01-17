<script>
/**
* 查看日历、选择赛事组件
* 用法
* @selectDate 选择日期的回调
* @selectGame 选择赛事的回调
* import GameSelect from '~/components/common/GameSelect'
* components: { GameSelect }
* <game-select @selectDate="selectCalendar" @selectGame="selectGame"></game-selec>
**/
import {
  formatTime
} from '@/assets/js/publicFn'
const now = formatTime(+new Date(), 'Y-M-D')
export default {
  name: 'GameSelect',
  props: {

  },
  data () {
    return {
      isShowDate: false,
      isToday: true
    }
  },
  methods: {
    showDate () {
      this.isShowDate = !this.isShowDate
    },
    judgeToday (date) {
      now === date
        ? this.isToday = true
        : this.isToday = false
    },
    selectDate (date, dateString) {
      this.judgeToday(dateString)
      this.showDate()
      const param = {
        date,
        dateString
      }
      this.$emit('selectDate', param)
      // 触发周日历组件改变
      this.$bus.emit('changeWeek', param)
    }
  },
  render () {
    const {
      isShowDate,
      showDate,
      selectDate,
      isToday
    } = this

    const datePicker = (
      <a-date-picker
        format='YYYY-MM-DD'
        onChange={selectDate}
        open={isShowDate}
        showToday={true}
      />
    )
    const tab = (
      <div class="sort-tabs">
        <div class={{ tab: true, active: !isToday }} onClick={ showDate }>
          <icon-font class="iconfont" type="iconrilidefuben"></icon-font>
          <span class="text">查看日历</span>
          { datePicker }
        </div>
      </div>
    )
    return tab
  }
}
</script>
<style scoped lang="less">
  .sort-tabs {
    background: #fff;
    height: 36px;
    overflow: hidden;
    .tab {
      width: 90px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      background: rgba(244,244,244,1);;
      border-radius: 4px;
      font-size: 14px;
      color: #333;
      display: inline-block;
      cursor: pointer;
      position: relative;
      vertical-align: top;
      margin-left: 20px;
      user-select: none;
      &.active{
        background: @primary-color;
        color: #fff;
        .iconfont{
          color: #fff;
        }
      }
      .iconfont{
        color: #CBCBCB;
        font-size: 18px;
        padding-right: 5px;
      }
      &.active {
        background: @primary-color;
        color: #fff;
        .iconfont{
          color: #fff;
        }
      }
    }
  }

  .modal-row{
    padding: 8px;
  }
  .sort-tabs /deep/ .ant-calendar-picker>div:first-child{
    visibility: hidden;
  }
</style>
