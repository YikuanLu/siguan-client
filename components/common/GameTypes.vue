<script>
/**
 * 全部游戏tab组件
 * 用法
 * @showAll 是否展示全部游戏tab
 * @showIcon 是否显示游戏图标
 * @switchTab 点击tab切换的回调
 * import GameTypes from '~/components/common/GameTypes'
 * components: { GameTypes }
 * <game-types :showAll="true" @switchTab="switchTab"></game-types>
 */
// import { publicApi } from '~/api'
import { GAME_TYPE_LIST } from '~/assets/js/types'
export default {
  name: 'GameTypes',
  props: {
    showAll: {
      type: Boolean,
      default: true
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    gameType: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      cur: 'lol',
      games: [
        {
          dictId: '',
          itemText: '全部游戏',
          itemValue: 'all'
        }
      ]
    }
  },
  computed: {},
  created () {
    this.getTypes()
  },
  mounted () {
    // this.switchTab(this.cur)
  },
  methods: {
    switchTab (i) {
      this.cur = i
      this.$emit('switchTab', i)
    },
    getTypes () {
      // 获取游戏类型
      /* const gameTypeParams = {
        dictCode: 'game_type'
      }
      this.$axios.post(publicApi.dictTypes, gameTypeParams).then((res) => {
        if (this.showAll) { // 如果不显示全部游戏
          this.games = this.games.concat(res.result)
        } else {
          this.games = res.result
        }
        this.switchTab(this.games[0].itemValue)
      }) */
      if (this.showAll) { // 如果不显示全部游戏
        this.games = this.games.concat(GAME_TYPE_LIST)
      } else {
        this.games = GAME_TYPE_LIST
      }
      const curType = this.$route.query.type || this.$route.params.gameType || this.gameType || this.games[0].itemValue
      this.switchTab(curType)
    }
  },
  render () {
    const { cur, games, switchTab, showIcon } = this

    const dom = (
      <div class="game-types-tab">
        {games.map((item) => {
          return (
            <div
              key={item.itemValue}
              class={{ actived: cur === item.itemValue, item: true }}
              onClick={switchTab.bind(this, item.itemValue)}
            >
              {showIcon && (
                <icon-font
                  class={['img-icon', item.itemValue]}
                  type={`icon${item.itemValue}`}
                ></icon-font>
              )}
              <span class="text">{this.$t(`match.gamesName.${item.itemValue}`)}</span>
            </div>
          )
        })}
      </div>
    )
    return dom
  }
}
</script>

<style lang="less" scoped>
.game-types-tab {
  padding: 0 20px;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: flexbox;
  display: flex;
  justify-content: space-between;
  background: #fff;
  border-bottom: solid 1px rgba(245, 245, 245, 1);
  .item {
    cursor: pointer;
    padding: 20px 0;
    .img-icon {
      width: 26px;
      height: 26px;
      display: inline-block;
      vertical-align: middle;
      margin-right: 8px;
      display: inline-block;
      font-size: 28px;
      color: rgb(201, 201, 201);
    }
    .text {
      font-size: 16px;
      color: #212121;
      display: inline-block;
      vertical-align: middle;
    }
    &.actived {
      border-bottom: solid 4px @primary-color;
      .img-icon {
        &.lol {
          color: @primary-color;
        }
        &.all {
          color: @primary-color;
        }
        &.csgo {
          color: @primary-color;
        }
        &.dota {
          color: @error-color;
        }
        &.kog {
          color: rgb(240, 209, 76);
        }
        &.ow {
          color: rgb(244, 178, 71);
        }
      }
      .text {
        color: @primary-color;
      }
    }
  }
}
</style>
