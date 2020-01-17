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
            <span class="game-now" @click="toMatch(item)">B0{{ item.bo }}</span>
          </td>
          <td @click="toMatch(item)">
            <p class="two-rows">{{ formatTime(item.matchTime, 'M-D') }}</p>
            <p class="two-rows primary-color">{{ formatTime(item.matchTime, 'h:m') }}</p>
          </td>
          <td :title="item.teamAShortName">
            <nuxt-link :to="teamUrl(item, 'A')" target="_blank">
              <span class="team-name ta-r">{{ item.teamAShortName }}</span>
              <img class="gameteam-logo" width="16" :src="item.teamALogo" :alt="item.teamAShortName" />
            </nuxt-link>
          </td>
          <td width="14%" class="color-999" @click.stop="toMatch(item, '4')">
            <p class="game-score win">{{ item.teamAScore }}</p>
            <i class="seprator">:</i>
            <p class="game-score">{{ item.teamBScore }}</p>
          </td>
          <td :title="item.teamBShortName">
            <nuxt-link :to="teamUrl(item, 'B')" target="_blank">
              <img class="gameteam-logo" width="16" :src="item.teamBLogo" :alt="item.teamBShortName" />
              <span class="team-name ta-l">{{ item.teamBShortName }}</span>
            </nuxt-link>
          </td>
          <td>
            <a-button class="game-link">
              <nuxt-link
                :title="`${item.leagueName} ${item.teamAShortName}:${item.teamBShortName} 电竞比分数据统计`"
                :to="liveUrl({
                  matchId: item.matchId,
                  tab: 4,
                  gameType: item.gameType
                })"
                target="_blank">数据</nuxt-link>
            </a-button>
            </a-button>
            <a-button class="game-link" @click.stop="toMatch(item, '2')">指数</a-button>
          </td>
          <td width="5%">&nbsp;</td>
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
* import GameListEnded from '~/components/game/GameListEnded'
* components: { GameListEnded }
* <game-list-ended></game-list-ended>
*/
import { liveUrl } from '@/assets/js/config'
import { commonFn } from '@/components/gameList/mixins'
import { formatTime } from '@/assets/js/publicFn'
export default {
  name: 'GameListEnded',
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
      return this.data.filter(_ => _.status === 2)
    }
  },
  mounted () {

  },
  methods: {
    formatTime,
    liveUrl
  }
}
</script>

<style lang="less" scoped>
.game-list.index-list {
  table {
    .game-score {
      display: inline-block;
    }
  }
}
</style>
