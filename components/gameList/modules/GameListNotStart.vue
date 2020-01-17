<template>
  <div class="game-list index-list">
    <table v-if="Object.keys(matchList).length">
      <tbody>
        <tr v-for="(item, index) in matchList" :key="index">
          <td width="8%">
            <GameTypeIcon class="game-icon" :type="item.gameType" />
          </td>
          <td width="20%" align="left" :title="item.leagueName">
            <span class="game-name" @click.stop="toLeague(item)">{{ item.leagueName }}</span>
            <span class="game-now">B0{{ item.bo }}</span>
          </td>
          <td @click="toMatch(item)">
            <p class="two-rows">{{ formatTime(item.matchTime, 'M-D') }}</p>
            <p class="two-rows primary-color">{{ formatTime(item.matchTime, 'h:m') }}</p>
          </td>
          <td v-if="item.teamAShortName" :title="item.teamAShortName">
            <nuxt-link :to="teamUrl(item, 'A')" target="_blank">
              <span class="team-name ta-r">{{ item.teamAShortName }}</span>
              <img class="gameteam-logo" width="16" :src="item.teamALogo" :alt="item.teamAShortName" />
            </nuxt-link>
          </td>
          <td v-else :title="'待定'" @click="toMatch(item)">
            <span class="team-name ta-r">TBD</span>
            <GameTypeIcon class="gameteam-logo" :type="item.gameType" style="font-size: 20px;color: #999;"/>
          </td>
          <td @click="toMatch(item, '2')">
            <p v-if="!item.teamAOdds && !item.teamBOdds" class="index" style="border: none;">
              <img width="22" src="~/assets/img/vs.png" alt="vs" />
            </p>
            <p v-else class="index">{{ item.teamAOdds }}-{{ item.teamBOdds }}</p>
          </td>
          <td v-if="item.teamBShortName" :title="item.teamBShortName">
            <nuxt-link :to="teamUrl(item, 'B')" target="_blank">
              <img class="gameteam-logo" width="16" :src="item.teamBLogo" :alt="item.teamBShortName" />
              <span class="team-name ta-l">{{ item.teamBShortName }}</span>
            </nuxt-link>
          </td>
          <td v-else :title="'待定'" @click="toMatch(item)">
            <GameTypeIcon class="gameteam-logo" :type="item.gameType" style="font-size: 20px;color: #999;"/>
            <span class="team-name ta-l">TBD</span>
          </td>
          <td>
            <a-button class="game-link">
              <nuxt-link
                :title="`${item.leagueName} ${item.teamAShortName}:${item.teamBShortName} ${item.gameType}比分预测分析`"
                :to="liveUrl({
                  matchId: item.matchId,
                  tab: 3,
                  gameType: item.gameType
                })"
                target="_blank">分析</nuxt-link>
            </a-button>
            <a-button class="game-link" @click.stop="toMatch(item, '2')">指数</a-button>
          </td>
          <td width="5%">
            <icon-font
              class="game-btn"
              :class="{active: isIncludes(item)}"
              type="icontixing"
              :title="isIncludes(item) ? '取消关注' : '关注'"
              @click.stop="collectRemind(item)"
            ></icon-font>
          </td>
        </tr>
      </tbody>
    </table>
    <Nodata v-else style="padding: 10px;background: #fff;"></Nodata>
  </div>
</template>

<script>
/**
* 比赛列表组件
* 用法
* import GameListNotstart from '~/components/game/GameListNotstart'
* components: { GameListNotstart }
* <game-list-notstart></game-list-notstart>
*/
import { liveUrl } from '@/assets/js/config'
import { formatTime } from '@/assets/js/publicFn'
import { commonFn } from '@/components/gameList/mixins'
export default {
  name: 'GameListNotstart',
  mixins: [commonFn],
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {

    }
  },
  computed: {
    matchList () {
      return this.data.filter(_ => _.status === 0)
    }
  },
  created () {

  },
  methods: {
    liveUrl,
    formatTime
  }
}
</script>

<style lang="less" scoped>
.game-list.index-list {
  table {
    .game-link {
      margin: 4px;
      padding: 0 8px;
    }
  }
}
</style>
