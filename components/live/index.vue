<template>
  <div>
    <div class="content-box">
      <div class="wrap-box">
        <div class="fl left">
          <div id="scroll-top"></div>
          <a-anchor>
            <div class="calender">
              <week :value="selectedDate" class="fl week" @selectDate="selectDate" @selectOtherWeek="selectOtherWeek"></week>
              <game-select class="fl sort" @selectDate="selectCalendar"></game-select>
              <sort-types class="fr sort-types" @switchTab="switchTypeTab"></sort-types>
            </div>
            <div class="sort-box">
              <game-types
                class="fl game-types"
                :gameType="gameType"
                :showIcon="false"
                :showAll="true"
                @switchTab="switchTab"
              ></game-types>
            </div>
          </a-anchor>
          <div class="ad-box">
            <Ad class="ad" :width="440" :imgs="imgs"></Ad>
            <Ad class="ad" :width="440" :imgs="imgs"></Ad>
          </div>
          <a-spin :spinning="isLoading">

            <div v-show="matchData.now[nowDate] && !sortType">
              <!-- 今天进行中 -->
              <!-- 进行中 -->
              <game-list
                class="game-list"
                :data="matchList"
                :allLeague="allLeague"
                :onData="onData"
                type="onGoing">
              </game-list>
              <!-- 今天未开始 -->
              <!-- 今天已结束 -->
              <game-list
                v-for="item in toDayType"
                :key="item"
                class="game-list"
                :data="matchData.now[nowDate]"
                :type="item">
              </game-list>
            </div>
            <Nodata v-show="!matchData.now[nowDate] && !Object.keys(matchData.prev).length && !Object.keys(matchData.next).length" style="padding: 30px;background: #fff;"></Nodata>

            <!-- 今天之前的已结束 -->
            <div v-show="!sortType">
              <game-list
                v-for="date in Object.keys(matchData.prev)"
                :id="`anchor-${date}`"
                :key="date"
                :time="date"
                class="game-list"
                :data="matchData.prev[date]"
                type="endedByTime"
              ></game-list>
            </div>

            <!-- 今天之后的未开始 -->
            <div v-show="!sortType">
              <game-list
                v-for="date in Object.keys(matchData.next)"
                :id="`anchor-${date}`"
                :key="date"
                :time="date"
                class="game-list"
                :data="matchData.next[date]"
                type="notStartByTime"
              ></game-list>
            </div>

            <!-- 赛事排序 -->
            <game-list
              v-show="sortType === 'sortByGame'"
              class="game-list"
              :data="matchList"
              type="sortByGame"></game-list>

          </a-spin>
        </div>
        <div class="fl right">
          <sider-box class="sider" :title="'热门资讯'" :moreLink="'/news'">
            <SiderInformations :data="hotInfos" :gameType="gameType"></SiderInformations>
          </sider-box>
          <sider-box class="sider" :title="'热门视频'" :moreLink="'/'">
            <SiderVideos></SiderVideos>
          </sider-box>
          <sider-box class="sider" :title="'热门图集'" :moreLink="'/'">
            <SiderPictures></SiderPictures>
          </sider-box>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Week from '~/components/common/Week'
import GameList from '~/components/gameList'
import SiderBox from '~/components/siderBox'
import GameTypes from '~/components/common/GameTypes'
import SortTypes from '~/components/common/SortTypes'
import GameSelect from '~/components/common/GameSelect'
import Ad from '~/components/common/Ad'
import {
  SiderInformations,
  SiderVideos,
  SiderPictures
} from '~/components/siderBox/components'
import {
  formatTime,
  getDayZero,
  timingFn,
  getWeekTime
} from '@/assets/js/publicFn'

const startTime = getWeekTime().startT // 这周第一天0点
const endTime = getWeekTime().endT // 下周第一天0点

export default {
  name: 'LiveIndex',
  components: {
    Week,
    GameList,
    SiderBox,
    GameTypes,
    SortTypes,
    GameSelect,
    Ad,
    SiderInformations,
    SiderVideos,
    SiderPictures
  },
  props: {
    gameType: {
      type: String,
      default: ''
    },
    matchArr: {
      type: Array,
      default: () => []
    },
    matchObj: {
      type: Object,
      default: () => {
        return {
          prev: {}, // 今天之前的数据
          now: {}, // 今天的数据
          next: {} // 今天以后的数据
        }
      }
    },
    onData: { // 进行中的比赛数据
      type: Object,
      default: () => {}
    },
    allLeague: { // 当前所有的联赛集合
      type: Object,
      default: () => {}
    },
    hotInfos: { // 热门资讯
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      imgs: [
        {
          path: require('@/static/img/game-types/demo.png'),
          url: '/news/11'
        },
        {
          path: require('@/static/img/game-types/demo.png'),
          url: '/news/22'
        }
      ],
      sortType: '',
      sortData: {
        gameType: this.gametType || 'all',
        startTime,
        endTime
      },
      isLoading: false,
      selectedDate: getDayZero(+new Date()), // 今天0点的时间戳
      nowDate: formatTime(+new Date(), 'Y-M-D'), // 今天的日期
      toDayType: ['notStart', 'ended'],
      curWeekPeriod: []
    }
  },
  computed: {
    matchData: {
      get () {
        return this.matchObj
      },
      set (val) {
        return val
      }
    },
    matchList: {
      get () {
        return this.matchArr
      },
      set (val) {
        return val
      }
    }
  },
  watch: {
    matchData (val) {
      this.$nextTick(() => {
        this.isLoading = false
      })
    }
  },
  created () { },
  mounted () {
    this.curWeekPeriod = [this.sortData.startTime, this.sortData.endTime]
    // 定时器，实时刷新数据
    timingFn(this, () => {
      this.getMatchData('timing')
    }, 20000)
    this.$nextTick(() => {
      this.isLoading = false
    })
  },
  methods: {
    formatTime,
    resetStatus () {
      // 重置排序
      this.isLoading = true
    },
    switchTab (val) {
      if (this.sortData.gameType === val) { return }
      this.sortData.gameType = val
      this.isLoading = true
      if (val === 'all') {
        this.$router.replace(`/live`)
        return
      }
      this.$router.replace(`/live/${val}`)
    },
    selectDate (item) {
      const timeStamp = item.timeStamp
      this.selectedDate = item.timeStamp
      this.reloadMatch(timeStamp)
    },
    switchTypeTab (val) {
      this.sortType === 'sortByGame'
        ? this.sortType = ''
        : this.sortType = 'sortByGame'
      this.scrollTop()
    },
    selectCalendar (item) {
      const timeStamp = getDayZero(item.dateString)
      this.selectedDate = timeStamp
      this.reloadMatch(timeStamp)
    },
    reloadMatch (time) {
      Object.assign(this.sortData, {
        startTime: getWeekTime(time).startT,
        endTime: getWeekTime(time).endT
      })
      this.scrollToDom(time)
    },
    scrollToDom (time) {
      // 如果在当前这周内，就直接滚动到那天，不请求接口
      if (this.curWeekPeriod[0] === this.sortData.startTime &&
        this.curWeekPeriod[1] === this.sortData.endTime) {
        const curDate = formatTime(time, 'Y-M-D')
        const anchorDom = document.getElementById(`anchor-${curDate}`)
        if (anchorDom) {
          const offsetTop = anchorDom.offsetTop
          window.scrollTo(0, offsetTop + 190)
        } else {
          document.getElementById('scroll-top').scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        this.curWeekPeriod = [this.sortData.startTime, this.sortData.endTime]
        this.resetStatus()
        this.getMatchData()
      }
    },
    getMatchData (timing) {
      // 触发周日历组件改变
      this.$bus.emit('getMatchData', this.sortData)
      if (!timing) { this.scrollTop() }
    },
    selectOtherWeek (val) {
      // 切换上一周或下一周
      this.selectedDate += val * 24 * 60 * 60 * 1000
      const dateParam = {
        timeStamp: this.selectedDate
      }
      this.selectDate(dateParam)
    },
    scrollTop () {
      if (process.client) {
        document.getElementById('scroll-top').scrollIntoView({ behavior: 'smooth' })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.content-box {
  margin: 20px auto 25px;
  clear: both;
  overflow: hidden;
  .left {
    width: 890px;
    margin-right: 10px;
  }
  .right {
    width: 300px;
  }
  .calender {
    overflow: hidden;
    background: #fff;
    border-bottom: solid 1px rgb(245, 245, 245);
    .week {
      width: 640px;
      border-right: solid 1px rgb(245, 245, 245);
    }
  }
  .sort-box {
    overflow: hidden;
    background: #fff;
    padding-bottom: 1px;
  }
  .sort-game {
    height: 80px;
    padding: 22px 0;
    margin-right: 10px;
  }
  .sort-types {
    padding: 15px 0;
    margin-right: 20px;
  }
  .sort-tabs {
    height: 80px;
    padding: 22px 0;
  }
  .game-types {
    width: 640px;
  }
  .game-list {
    margin-bottom: 10px;
  }
  .ad-box {
    overflow: hidden;
    margin: 10px 0;
    .ad {
      float: left;
      overflow: hidden;
      &:first-child {
        margin-right: 10px;
      }
      img {
        height: 90px;
      }
    }
  }
  .sider {
    margin-bottom: 10px;
  }
}
</style>
