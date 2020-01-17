<template>
  <div>
    <div class="content-box">
      <div class="wrap-box">
        <div id="scroll-top"></div>
        <a-anchor>
          <div class="calender">
            <week :value="selectedDate" class="fl week" @selectDate="selectDate" @selectOtherWeek="selectOtherWeek"></week>
            <game-select class="fl sort-game" @selectDate="selectCalendar"></game-select>
            <sort-types class="fr sort-types" @switchTab="switchTypeTab"></sort-types>
          </div>
          <div class="sort-box">
            <game-types class="fl game-types" :showIcon="true" :showAll="false" @switchTab="switchGameTab"></game-types>
          </div>
        </a-anchor>
        <round-tabs v-show="betInfos && betInfos.length" class="round-tab" :types="curTypes"></round-tabs>
        <a-spin :spinning="isLoading">
          <game-list :gameType="sortData.gameType" class="index-game-list"></game-list>
        </a-spin>

        <!-- 为了seo爬虫写的 -->
        <div v-if="betInfos && betInfos.length" class="no-show-link">
          <div class="game-list index-list no-show-link">
            <table>
              <tbody>
                <tr v-for="(item, index) in betInfos" :key="index" class="fake-item">
                  <td width="8%"><img class="game-icon" :src="item.leagueLogo" alt=""></td>
                  <td width="20%" align="left"><nuxt-link :to="`/match/${gameType}/${item.matchId}`">{{ item.leagueName }}</nuxt-link></td>
                  <td>{{ item.source }}</td>
                  <td>{{ item.title }}</td>
                  <td><nuxt-link :to="`/match/${gameType}/team/${item.teamAId}`">{{ item.teamAName }}</nuxt-link></td>
                  <td><img class="game-icon" :src="item.teamALogo" alt=""></td>
                  <td><p v-for="(inner, ii) in item.optionList" :key="ii">{{ inner.name }}-{{ inner.odds }}</p></td>
                  <td><img class="game-icon" :src="item.teamBLogo" alt=""></td>
                  <td><nuxt-link :to="`/match/${gameType}/team/${item.teamBId}`">{{ item.teamBName }}</nuxt-link></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- 为了seo爬虫写的 END -->
      </div>
    </div>
  </div>
</template>

<script>
import Week from '~/components/common/Week'
import GameTypes from '~/components/common/GameTypes'
import SortTypes from '~/components/common/SortTypes'
import GameSelect from '~/components/common/GameSelect'
import RoundTabs from '~/components/statistic/RoundTabs'
import GameList from '~/components/statistic/GameList'
import { statisApi } from '~/api/index'
import { STATICS_TYPES } from '~/assets/js/types'
import {
  getTodayZero,
  getDayZero,
  timingFn
} from '@/assets/js/publicFn'
const startTime = getTodayZero() // 当天0点
const endTime = getTodayZero(1) // 第二天0点

const sortData = { // 默认筛选参数
  gameType: 'lol',
  startTime,
  endTime
}
export default {
  name: 'WholeNetworkIndex',
  components: {
    Week,
    GameTypes,
    SortTypes,
    GameSelect,
    RoundTabs,
    GameList
  },
  head () {
    let gameType = this.gameType
    if (gameType === 'dota') { gameType = 'dota2' }
    return {
      title: `${gameType.toUpperCase()}指数_电竞比分网_LOL比赛直播|DOTA2分析|CSGO比分数据查询-尚牛电竞`,
      meta: [
        { hid: 'description', name: 'description', content: '' }
      ]
    }
  },
  data () {
    return {
      gameType: 'lol',
      sortType: '',
      betInfos: [],
      sortData, // 传给接口筛选的参数
      typeData: STATICS_TYPES, // 自己构造的游戏类数据
      curTypes: [], // 当前游戏下的分类数据
      isLoading: false,
      selectedDate: getDayZero(+new Date()) // 今天0点的时间戳
    }
  },
  async asyncData ({ $axios, params, redirect }) {
    // 防止初次进来重复请求
    if (!params.gameType) {
      redirect(`/statistic/lol`)
    }
    Object.assign(sortData, {
      gameType: params.gameType,
      startTime,
      endTime
    })

    const betInfos = await $axios.get(statisApi.betInfoList, { params: sortData })

    return {
      betInfos,
      gameType: params.gameType || ''
    }
  },
  created () {
    this.isLoading = true
    this.curTypes = this.typeData[this.sortData.gameType]
    // this.getData()
  },
  mounted () {
    this.$nextTick(() => {
      this.isLoading = false
      // 重置局数tab为第一个
      this.$bus.emit('resetRoundTab', this.betInfos)
      // 定时器，实时刷新数据
      timingFn(this, () => {
        this.getData('timing')
      }, 20000)
    })
  },
  methods: {
    selectDate (item) {
      // 选择周日期
      this.isLoading = true
      this.selectedDate = item.timeStamp
      Object.assign(this.sortData, {
        gameType: this.gameType,
        startTime: +getDayZero(item.timeStamp),
        endTime: +getDayZero(item.timeStamp) + 24 * 60 * 60 * 1000
      })
      this.getData()
    },
    switchGameTab (val) {
      if (this.gameType === val) { return }
      this.isLoading = true
      // 切换游戏类型
      Object.assign(this.sortData, {
        gameType: val,
        startTime,
        endTime
      })
      this.$router.replace(`/statistic/${val}`)
    },
    switchTypeTab (val) {
      if (!this.betInfos || !this.betInfos.length) { return }
      // 切换赛事排序
      this.sortType === 'sortByGame'
        ? this.sortType = ''
        : this.sortType = 'sortByGame'
      this.scrollTop()
      // 赛事排序, 传递到指数列表
      this.$bus.emit('sortBetData', this.sortType)
    },
    selectCalendar (item) {
      // 选择日历
      this.isLoading = true
      this.sortData.startTime = getDayZero(item.dateString)
      this.sortData.endTime = this.sortData.startTime + 24 * 60 * 60 * 1000
      this.selectedDate = this.sortData.startTime
      this.getData()
    },
    getData (timing) {
      if (!timing) { this.sortType = '' }
      this.$axios.get(statisApi.betInfoList, { params: this.sortData }).then((res) => {
        this.betInfos = res
        this.isLoading = false
        if (!timing) {
          this.scrollTop()
          // 重置局数tab为第一个
          this.$bus.emit('resetRoundTab', this.betInfos)
        }
      }).catch((e) => {
        this.isLoading = false
      })
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
      this.$nextTick(() => {
        if (process.client) {
          document.getElementById('scroll-top').scrollIntoView({ behavior: 'smooth' })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .content-box{
    margin: 20px auto 25px;
    clear: both;
    overflow: hidden;
    .left{
      width: 890px;
      margin-right: 10px;
    }
    .right{
      width: 300px;
    }
    .calender{
      overflow: hidden;
      background: #fff;
      border-bottom: solid 1px rgb(245,245,245);
      .week{
        width: 960px;
        border-right: solid 1px rgb(245,245,245);
      }
    }
    .sort-box{
      overflow: hidden;
      background: #fff;
      padding-bottom: 1px;
    }
    .sort-game{
      height: 80px;
      padding: 22px 0;
      margin-right: 10px;
    }
    .sort-types{
      padding: 22px 0;
      margin-right: 10px;
    }
    .game-types{
      width: 1070px;
      justify-content: flex-start;
       /deep/ .item{
        margin-right: 70px;
      }
    }
    .sider{
      margin-bottom: 10px;
    }
    .index-game-list{
      margin: 0 auto 30px;
      background: #fff;
    }
    .round-tab{
      margin-top: 10px;
    }
  }
</style>
