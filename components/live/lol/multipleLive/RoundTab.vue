<script>
/**
* 实时比分-详情-局数tab切换组件
* 用法
* @switchTab 点击tab切换的回调
*/
export default {
  name: 'LiveRoundTabs',
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    index: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      cur: this.index,
      types: this.data
    }
  },
  computed: {

  },
  created () {

  },
  methods: {
    switchTab (val) {
      this.cur = val
      this.$emit('switchTab', val)
    }
  },
  render () {
    const { types, cur, switchTab } = this

    const dom = (
      <div class="game-types-tab">
        {types.map((item, index) => {
          return (
            <div
              key={item.battle_id}
              class={{ item: true, actived: cur === item.battle_id }}
              onClick={switchTab.bind(this, item.battle_id)}>
              <span class="text">{`第${index + 1}局`} </span>
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
  .game-types-tab{
    padding: 0 20px;
    background: #fff;
    border-bottom: solid 1px rgba(245,245,245,1);
    white-space: nowrap;
    overflow-x: auto;
    .item{
      cursor: pointer;
      padding: 13px 0;
      position: relative;
      display: inline-block;
      margin-right: 60px;
      .text{
        font-size: 14px;
        color: #212121;
        display: inline-block;
        vertical-align: middle;
      }
      .iconfont{
        color: @error-color;
        font-size: 30px;
        position: absolute;
      }
      &.actived{
        border-bottom: solid 4px @primary-color;
        .text{
          color: @primary-color;
        }
      }
    }
  }
</style>
