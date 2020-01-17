<template>
  <div>
    <div
      v-for="outer in Object.keys(allLeague)"
      :key="outer"
      class="game-list index-list"
    >
      <table v-if="onGingList[outer] && onGingList[outer].length" class="ongoing">
        <thead>
          <tr>
            <th width="26%" colspan="3" :title="allLeague[outer].leagueName">
              <GameTypeIcon class="game-icon" :type="allLeague[outer].gameType" />
              <nuxt-link
                class="game-name"
                :title="`${allLeague[outer].leagueName} 即时比分直播`"
                :to="matchLeagueUrl({
                  id: allLeague[outer].leagueId,
                  gameType: allLeague[outer].gameType
                })"
                target="_blank">{{ allLeague[outer].leagueName }}</nuxt-link>
              <!-- <span class="game-name" @click.stop="toLeague(allLeague[outer])">{{ allLeague[outer].leagueName }}</span> -->
              <span class="game-now">B0{{ allLeague[outer].bo }}</span>
            </th>
            <th width="6%">比分</th>
            <th width="6%">指数</th>
            <template v-if="tHead[allLeague[outer].gameType].length === 1">
              <th v-for="t in tHead[allLeague[outer].gameType]" :key="t" colspan="5">{{ t }}</th>
            </template>
            <template v-else>
              <th v-for="t in tHead[allLeague[outer].gameType]" :key="t" width="6%">{{ t }}</th>
            </template>
            <th width="15%">&nbsp;</th>
            <th width="10%">操作</th>
            <th width="6%"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in onGingList[outer]" :key="index" @click.stop="toMatch(item)">
            <td class="ta-l pl20">
              <p class="text">第{{ item.sort }}局</p>
              <p class="text">{{ secondToHs(item.duration) }}</p>
            </td>
            <td class="ta-r">
              <!-- <nuxt-link :to="teamUrl(item, 'A')" target="_blank"> -->
              <p class="two-rows team-name" :title="item.teamAShortName">{{ item.teamAShortName }}</p>
              <!-- </nuxt-link> -->
              <!-- <nuxt-link :to="teamUrl(item, 'B')" target="_blank"> -->
              <p class="two-rows team-name" :title="item.teamBShortName">{{ item.teamBShortName }}</p>
              <!-- </nuxt-link> -->
            </td>
            <td>
              <img class="gameteam-logo" width="16" :src="item.teamALogo" :alt="item.teamAShortName" />
              <img class="gameteam-logo" width="16" :src="item.teamBLogo" :alt="item.teamBShortName" />
            </td>
            <td>
              <p class="game-score">{{ item.teamAScore }}</p>
              <p class="game-score">{{ item.teamBScore }}</p>
            </td>
            <td>
              <p class="two-rows">{{ item.teamAOdds || 1 }}</p>
              <p class="two-rows">{{ item.teamBOdds || 1 }}</p>
            </td>
            <template
              v-if="domToData(item, allLeague[outer].gameType) && Object.keys(domToData(item, allLeague[outer].gameType)).length"
            >
              <td>
                <p
                  v-for="(inner, innerI) in domToData(item, allLeague[outer].gameType).col1"
                  :key="innerI"
                  class="two-rows"
                >{{ inner }}</p>
              </td>
              <td>
                <p
                  v-for="(inner, innerI) in domToData(item, allLeague[outer].gameType).col2"
                  :key="innerI"
                  class="two-rows"
                >{{ inner }}</p>
              </td>
              <td>
                <p
                  v-for="(inner, innerI) in domToData(item, allLeague[outer].gameType).col3"
                  :key="innerI"
                  class="two-rows"
                >{{ inner }}</p>
              </td>
              <td>
                <p
                  v-for="(inner, innerI) in domToData(item, allLeague[outer].gameType).col4"
                  :key="innerI"
                  class="two-rows"
                >{{ inner }}</p>
              </td>
              <td>
                <p
                  v-for="(inner, innerI) in domToData(item, allLeague[outer].gameType).col5"
                  :key="innerI"
                  class="two-rows"
                >{{ inner }}</p>
              </td>
              <td>
                <p class="two-rows">
                  <a-tooltip
                    v-for="(inner, innerI) in domToData(item, allLeague[outer].gameType).col6"
                    :key="innerI"
                    :title="inner.title"
                  >
                    <icon-font v-if="inner.name" class="game-stats" :type="inner.icon"></icon-font>
                  </a-tooltip>
                </p>
                <p class="two-rows">
                  <a-tooltip
                    v-for="(inner, innerI) in domToData(item, allLeague[outer].gameType).col7"
                    :key="innerI"
                    :title="inner.title"
                  >
                    <icon-font v-if="inner.name" class="game-stats" :type="inner.icon"></icon-font>
                  </a-tooltip>
                </p>
              </td>
            </template>
            <template v-else>
              <td colspan="6">&nbsp;</td>
            </template>
            <td>
              <a-button class="game-link" @click.stop="toMatch(item, '1')">直播</a-button>
              <a-button class="game-link" @click.stop="toMatch(item, '2')">指数</a-button>
            </td>
            <td>&nbsp;</td>
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
* import GameListOngoing from '~/components/game/GameListOngoing'
* components: { GameListOngoing }
* <game-list-ongoing></game-list-ongoing>
*/
import { matchLeagueUrl } from '@/assets/js/config'
import { secondToHs } from '@/assets/js/publicFn'
import { commonFn } from '@/components/gameList/mixins'
export default {
  name: 'GameListOngoing',
  mixins: [commonFn],
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    allLeague: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      tHead: {
        lol: ['击杀', '推塔', '小龙', '大龙', '经济'],
        dota: ['击杀', '助攻', '死亡', '经济差', '经验差'],
        csgo: ['全局', '上半场', '下半场', '加时', '地图'],
        kog: ['击杀', '推塔', '暴君', '主宰', '经济'],
        ow: ['&nbsp;']
      }
    }
  },
  computed: {
    onGingList () {
      return this.data
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    matchLeagueUrl,
    secondToHs,
    domToData (data, gameType) {
      // 计算格式化后的值
      function calcK (val) {
        if (isNaN(val)) { return 0 }
        const numK = (val / 1000).toFixed(1) + 'K'
        if (val > 0) {
          return '+' + numK
        }
        return numK
      }
      // 用数据控制视图吧，不然太臃肿
      if (gameType === 'lol') {
        const item = data.lolMatchBattleTeamStatsList
        if (!item || !item[0] || !item[1]) { return [] }
        return {
          col1: [item[0].kill_count, item[1].kill_count],
          col2: [item[0].towerSuccessCount, item[1].towerSuccessCount],
          col3: [item[0].smallDragonCount, item[1].smallDragonCount],
          col4: [item[0].bigDragonCount, item[1].bigDragonCount],
          col5: [calcK(item[0].money), calcK(item[1].money)],
          col6: [
            {
              name: item[0].isFirstSmallDragon,
              icon: 'iconxiaolong',
              title: '首小龙'
            }, {
              name: item[0].isFirstSmallDragon,
              icon: 'icondalong',
              title: '首大龙'
            },
            {
              name: item[0].首塔,
              icon: 'icontafang',
              title: '首塔'
            },
            {
              name: item[0].isTenKills,
              icon: 'iconsha1',
              title: '十杀'
            },
            {
              name: item[0].isFiveKills,
              icon: 'iconsha',
              title: '五杀'
            },
            {
              name: item[0].isFirstBlood,
              icon: 'iconyixie',
              title: '一血'
            }
          ],
          col7: [
            {
              name: item[1].isFirstSmallDragon,
              icon: 'iconxiaolong',
              title: '首小龙'
            }, {
              name: item[1].isFirstSmallDragon,
              icon: 'icondalong',
              title: '首大龙'
            },
            {
              name: item[1].首塔,
              icon: 'icontafang',
              title: '首塔'
            },
            {
              name: item[1].isTenKills,
              icon: 'iconsha1',
              title: '十杀'
            },
            {
              name: item[1].isFiveKills,
              icon: 'iconsha',
              title: '五杀'
            },
            {
              name: item[1].isFirstBlood,
              icon: 'iconyixie',
              title: '一血'
            }
          ]
        }
      }

      if (gameType === 'dota') {
        const item = data.dotaTeamStats && data.dotaTeamStats.team_stats
        if (!item || !item[0] || !item[1]) { return [] }
        return {
          col1: [item[0].kill_count, item[1].kill_count],
          col2: [item[0].assist_count, item[1].assist_count],
          col3: [item[0].death_count, item[1].death_count],
          col4: [calcK(data.dotaTeamStats.current_economic_diff), ''],
          col5: [calcK(data.dotaTeamStats.current_xp_diff), ''],
          col6: [
            {
              name: item[0].is_first_tower,
              icon: 'icontafang',
              title: '首塔'
            },
            {
              name: item[0].is_ten_kills,
              icon: 'iconsha1',
              title: '十杀'
            },
            {
              name: item[0].is_first_blood,
              icon: 'iconyixie',
              title: '一血'
            }
          ],
          col7: [
            {
              name: item[1].is_first_tower,
              icon: 'icontafang',
              title: '首塔'
            },
            {
              name: item[1].is_ten_kills,
              icon: 'iconsha1',
              title: '十杀'
            },
            {
              name: item[1].is_first_blood,
              icon: 'iconyixie',
              title: '一血'
            }
          ]
        }
      }

      if (gameType === 'csgo') {
        const item = data.csgoTeamStats
        if (!item || !item[0] || !item[1]) { return [] }
        // 计算加时局数
        const allScore = item[0].totalScore + item[1].totalScore
        const teamAScore = allScore > 30 ? item[0].totalScore - 15 : '-'
        const teamBScore = allScore > 30 ? item[1].totalScore - 15 : '-'
        return {
          col1: [item[0].totalScore, item[1].totalScore],
          col2: [item[0].firstHalfScore, item[1].firstHalfScore],
          col3: [item[0].secondHalfScore, item[1].secondHalfScore],
          col4: [teamAScore, teamBScore],
          col5: [data.csgoMapName],
          col6: [
            {
              name: item[0].isFirstWin5Score,
              icon: 'iconfive_round',
              title: '先胜5回合'
            },
            {
              name: item[0].isFirstWin16Score,
              icon: 'iconlast_round',
              title: '16回合胜利'
            },
            {
              name: item[0].isFirstKill,
              icon: 'iconfirst_round',
              title: '首回合胜利'
            }
          ],
          col7: [
            {
              name: item[1].isFirstWin5Score,
              icon: 'iconfive_round',
              title: '先胜5回合'
            },
            {
              name: item[1].isFirstWin16Score,
              icon: 'iconlast_round',
              title: '16回合胜利'
            },
            {
              name: item[1].isFirstKill,
              icon: 'iconfirst_round',
              title: '首回合胜利'
            }
          ]
        }
      }

      if (gameType === 'kog') {
        return {
          col1: ['-', '-'],
          col2: ['-', '-'],
          col3: ['-', '-'],
          col4: ['-', '-'],
          col5: ['-', '-']
        }
      }

      if (gameType === 'ow') {
        return []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.game-list.index-list {
  table {
    .ta-l{
      text-align: left!important;
    }
    .ta-r{
      text-align: right!important;
    }
    .pl20{
      padding-left: 20px!important;
    }
    .gameteam-logo {
      display: block;
      &:first-child {
        margin-bottom: 8px;
      }
    }
    &.ongoing {
      margin-bottom: 2px;
    }
    .two-rows {
      padding: 12px 0;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      min-height: 38px;
      &.team-name {
        width: 80px;
        display: block;
      }
    }
    .game-link {
      display: block;
      margin: 4px auto;
      padding: 0 8px;
    }
  }
}
</style>
