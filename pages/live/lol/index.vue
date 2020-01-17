<template>
  <LiveIndex
    :allLeague="allLeague"
    :onData="onGoingList"
    :matchObj="matchData"
    :matchArr="matchList"
    :hotInfos="hotInfos"
    gameType="lol"
  ></LiveIndex>
</template>

<script>
import { homeApi, informationApi } from '~/api'
import {
  getWeekTime,
  sortMatchByDate,
  sortOngingMethod,
  sortOngingLeague
} from '@/assets/js/publicFn'
import { commonFn } from '@/components/live/mixins'

const startTime = getWeekTime().startT // 这周第一天0点
const endTime = getWeekTime().endT // 下周第一天0点

export default {
  name: 'LolLiveScoreIndex',
  mixins: [commonFn],
  head () {
    return {
      title: `LOL比分直播|LOL数据分析|LOL实时比分数据查询 - 尚牛电竞`,
      meta: [
        { hid: 'description', name: 'description', content: '' }
      ]
    }
  },
  async asyncData ({ $axios, query }) {
    const params = {
      gameType: 'lol',
      startTime,
      endTime
    }
    const infoParams = {
      pageNum: 1,
      pageSize: 6,
      type: 'article',
      gameType: 'lol'
    }
    const [matchList, { rows: hotInfos }] = await Promise.all([
      $axios.get(homeApi.matchList, { params }),
      $axios.get(informationApi.topArticle, { params: infoParams })
    ])
    // 在服务端处理完数据再返回，页面源码才能填充进数据
    const matchData = await sortMatchByDate(matchList)

    const sortLeagues = await sortOngingLeague(matchList).dataByLeagueId
    const onGoingList = await sortOngingMethod(sortLeagues, 1)
    const allLeague = await sortOngingLeague(matchList).allLeague

    return {
      matchList,
      matchData,
      onGoingList,
      allLeague,
      hotInfos
    }
  },
  created () { },
  mounted () {},
  methods: {}
}
</script>

<style lang="less" scoped>

</style>
