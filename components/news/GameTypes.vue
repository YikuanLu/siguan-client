<script>
/**
* 全部游戏tab组件
* 用法
* @switchTab 点击tab切换的回调
* import InfoGameTypes from '~/components/news/GameTypes'
* components: { InfoGameTypes }
* <info-game-types @switchTab="switchTab"></info-game-types>
*/
export default {
  name: 'InfoGameTypes',
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      games: [
        {
          dictId: '',
          itemText: '全部游戏',
          itemValue: 'all'
        }
      ],
      cur: 'all'
    }
  },
  created () {
    this.games = this.games.concat(this.data)
    const curType = this.$route.params.gameType || this.games[0].itemValue
    this.switchTab(curType)
  },
  methods: {
    switchTab (i) {
      if (this.loading) { return }
      this.cur = i
    }
  },
  render () {
    const { games, cur, switchTab } = this

    const dom = (
      <div class="game-types-tab">
        {games.map((item) => {
          return <div
            key={item.itemValue}
            class={{ item: true, actived: cur === item.itemValue, [item.itemValue]: true }}
            onClick={switchTab.bind(this, item.itemValue)}>
            <nuxt-link to={`/news/${item.itemValue}`}>
              <icon-font class={['img-icon']} type={`icon${item.itemValue}`}></icon-font>
              <span class="text">{item.itemText}</span>
            </nuxt-link>
          </div>
        })}
      </div>
    )

    return dom
  }
}
</script>

<style lang="less" scoped>
  .game-types-tab{
    background: #fff;
    .item{
      cursor: pointer;
      padding: 20px 0;
      border-bottom: solid 1px rgba(245,245,245,1);
      text-align: center;
      transition: all .3s;
      .img-icon{
        width: 34px;
        height: 34px;
        display: inline-block;
        vertical-align: middle;
        font-size: 34px;
        color: rgb(201,201,201);
      }
      .text{
        font-size: 12px;
        color: #212121;
        display: block;
        padding-top: 11px;
        white-space: nowrap;
      }
      &:hover, &.actived{
        &.lol{
          background: @primary-color;
        }
        &.all{
          background: @primary-color;
        }
        &.csgo{
          background: @primary-color;
        }
        &.dota{
          background: @error-color;
        }
        &.kog{
          background: rgb(240,209,76);
        }
        &.ow{
          background: rgb(244,178,71);
        }
        .img-icon{
          color: #fff;
        }
        .text{
          color: #fff;
        }
      }
    }
  }
</style>
