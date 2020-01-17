<template>
  <div>
    <div
      v-for="outer in Object.keys(allLeague)"
      :key="outer"
      class="game-list index-list"
    >
      <!-- 未开始 -->
      <table v-if="notStartList[outer] && notStartList[outer].length">
        <thead>
          <tr>
            <th colspan="10" :title="allLeague[outer].leagueName">
              <img class="game-icon" :src="allLeague[outer].leagueLogo" alt />
              <span class="game-name" @click.stop="toLeague(allLeague[outer])">{{ allLeague[outer].leagueName }}</span>
              <span class="game-now">B0{{ allLeague[outer].bo }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in notStartList[outer]" :key="index" @click="toMatch(item)">
            <td width="8%">
              <GameTypeIcon class="game-icon" :type="item.gameType" />
            </td>
            <td width="10%">
              <p class="two-rows">{{ formatTime(item.matchTime, 'M-D') }}</p>
              <p class="two-rows primary-color">{{ formatTime(item.matchTime, 'h:m') }}</p>
            </td>
            <td width="16%" align="left">未开始</td>
            <td v-if="item.teamAShortName" :title="item.teamAShortName" @click.stop="toTeam(item, 'A')">
              <span class="team-name ta-r">{{ item.teamAShortName }}</span>
              <img class="gameteam-logo" width="16" :src="item.teamALogo" :alt="item.teamAShortName" />
            </td>
            <td v-else :title="'待定'">
              <span class="team-name ta-r">TBD</span>
              <GameTypeIcon class="gameteam-logo" :type="item.gameType" style="font-size: 20px;color: #999;"/>
            </td>
            <td width="14%" @click.stop="toMatch(item, '2')">
              <p v-if="!item.teamAOdds && !item.teamBOdds" class="index" style="border: none;">
                <img width="22" src="~/assets/img/vs.png" alt="vs" />
              </p>
              <p v-else class="index">{{ item.teamAOdds }}-{{ item.teamBOdds }}</p>
            </td>
            <td v-if="item.teamBShortName" :title="item.teamBShortName" @click.stop="toTeam(item, 'B')">
              <img class="gameteam-logo" width="16" :src="item.teamBLogo" :alt="item.teamBShortName" />
              <span class="team-name ta-l">{{ item.teamBShortName }}</span>
            </td>
            <td v-else :title="'待定'">
              <GameTypeIcon class="gameteam-logo" :type="item.gameType" style="font-size: 20px;color: #999;"/>
              <span class="team-name ta-l">TBD</span>
            </td>
            <td>
              <a-button class="game-link" @click.stop="toMatch(item, '3')">分析</a-button>
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
      <!-- 进行中 -->
      <table v-if="onGingList[outer] && onGingList[outer].length" class="ongoing">
        <thead>
          <tr>
            <th colspan="10" :title="allLeague[outer].leagueName">
              <img class="game-icon" :src="allLeague[outer].leagueLogo" alt />
              <span class="game-name" @click.stop="toLeague(allLeague[outer])">{{ allLeague[outer].leagueName }}</span>
              <span class="game-now">B0{{ allLeague[outer].bo }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in onGingList[outer]" :key="index" @click="toMatch(item)">
            <td width="8%">
              <GameTypeIcon class="game-icon" :type="item.gameType" />
            </td>
            <td width="10%">
              <p class="two-rows">{{ formatTime(item.matchTime, 'M-D') }}</p>
              <p class="two-rows primary-color">{{ formatTime(item.matchTime, 'h:m') }}</p>
            </td>
            <td width="16%" align="left">
              <p class="two-rows">第{{ item.sort }}局</p>
              <p class="two-rows primary-color">{{ secondToHs(item.duration) }}</p>
            </td>
            <td :title="item.teamAShortName" @click.stop="toTeam(item, 'A')">
              <span class="team-name ta-r">{{ item.teamAShortName }}</span>
              <img class="gameteam-logo" width="16" :src="item.teamALogo" :alt="item.teamAShortName" />
            </td>
            <td class="color-999" width="14%" @click.stop="toMatch(item)">
              <p class="game-score">{{ item.teamAScore }}</p>
              <i class="seprator">:</i>
              <p class="game-score">{{ item.teamBScore }}</p>
            </td>
            <td :title="item.teamBShortName" @click.stop="toTeam(item, 'B')">
              <img class="gameteam-logo" width="16" :src="item.teamBLogo" :alt="item.teamBShortName" />
              <span class="team-name ta-l">{{ item.teamBShortName }}</span>
            </td>
            <td>
              <a-button class="game-link" @click.stop="toMatch(item)">直播</a-button>
              <a-button class="game-link" @click.stop="toMatch(item, '2')">指数</a-button>
            </td>
            <td width="5%">&nbsp;</td>
          </tr>
        </tbody>
      </table>
      <!-- 已结束 -->
      <table v-if="endedList[outer] && endedList[outer].length">
        <thead>
          <tr>
            <th colspan="10" :title="allLeague[outer].leagueName">
              <img class="game-icon" :src="allLeague[outer].leagueLogo" alt />
              <span class="game-name" @click.stop="toLeague(allLeague[outer])">{{ allLeague[outer].leagueName }}</span>
              <span class="game-now">B0{{ allLeague[outer].bo }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in endedList[outer]" :key="index" @click="toMatch(item)">
            <td width="8%">
              <GameTypeIcon class="game-icon" :type="item.gameType" />
            </td>
            <td width="10%">
              <p class="two-rows">{{ formatTime(item.matchTime, 'M-D') }}</p>
              <p class="two-rows primary-color">{{ formatTime(item.matchTime, 'h:m') }}</p>
            </td>
            <td width="16%" align="left">已结束</td>
            <td :title="item.teamAShortName" @click.stop="toTeam(item, 'A')">
              <span class="team-name ta-r">{{ item.teamAShortName }}</span>
              <img class="gameteam-logo" width="16" :src="item.teamALogo" :alt="item.teamAShortName" />
            </td>
            <td width="14%" class="color-999" @click.stop="toMatch(item, '4')">
              <p class="game-score win">{{ item.teamAScore }}</p>
              <i class="seprator">:</i>
              <p class="game-score">{{ item.teamBScore }}</p>
            </td>
            <td :title="item.teamBShortName" @click.stop="toTeam(item, 'B')">
              <img class="gameteam-logo" width="16" :src="item.teamBLogo" :alt="item.teamBShortName" />
              <span class="team-name ta-l">{{ item.teamBShortName }}</span>
            </td>
            <td>
              <a-button class="game-link" @click.stop="toMatch(item, '4')">数据</a-button>
              <a-button class="game-link" @click.stop="toMatch(item, '2')">指数</a-button>
            </td>
            <td width="5%">&nbsp;</td>
          </tr>
        </tbody>
      </table>
    </div>
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
import { formatTime, secondToHs } from '@/assets/js/publicFn'
import { commonFn } from '@/components/gameList/mixins'
export default {
  name: 'GameListSortByGame',
  mixins: [commonFn],
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      allLeague: {},
      playStatus: {
        0: `未开始`,
        1: `直播中`,
        2: `已结束`
      },
      notStartList: {},
      onGingList: {},
      endedList: {}
    }
  },
  computed: {

  },
  watch: {
    data (val) {
      this.initData()
    }
  },
  created () {

  },
  mounted () {
    this.initData()
  },
  methods: {
    async initData () {
      const sortLeague = await this.sortLeague(this.data)
      this.notStartList = this.sortMethod(sortLeague, 0) // --未开始
      this.onGingList = this.sortMethod(sortLeague, 1) // --进行中
      this.endedList = this.sortMethod(sortLeague, 2) // --已结束
    },
    formatTime,
    secondToHs,
    sortMethod (data, status) {
      // 先根据赛事ID排序，再根据比赛状态排序--未开始
      const newOrderData = {}
      Object.keys(data).map((k) => {
        if (data[k] && data[k].length) {
          newOrderData[k] = data[k].filter(_ => _.status === status)
        }
      })
      return newOrderData
    },
    sortLeague (data) {
      const dataByLeagueId = {}
      this.allLeague = {}
      data.map((item) => {
        const curLId = item.leagueId
        if (!dataByLeagueId[curLId]) {
          dataByLeagueId[curLId] = [item]
          this.allLeague[curLId] = item
        } else {
          dataByLeagueId[curLId].push(item)
        }
      })
      return dataByLeagueId
    }
  }
}
</script>

<style lang="less" scoped>
.game-list.index-list {
  th {
    border-bottom: solid 1px rgb(245, 245, 245);
  }
  table {
    margin-bottom: 10px;
    .game-score {
      display: inline-block;
    }
    .game-name {
      width: auto;
      line-height: 20px;
    }
  }
}
</style>
