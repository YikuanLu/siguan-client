<script>
/**
* 通用类别tab组件
* 用法
* @switchTab 点击tab切换的回调
*/
export default {
  name: 'TypeTabs',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number],
      default: '0'
    }
  },
  data () {
    return {

    }
  },
  computed: {
    cur: {
      set (val) {
        this.$emit('switchTab', val)
      },
      get () {
        return this.value
      }
    },
    types () {
      return this.data
    }
  },
  created () {

  },
  methods: {
    switchTab (i) {
      if (this.loading) { return }
      this.cur = i
    }
  },
  render () {
    const { types, cur, switchTab } = this
    const dom = (
      <div class="game-types-tab">
        {types.map((item) => {
          return <div
            key={item.id}
            class={{ item: true, actived: cur === item.id }}
            onClick={switchTab.bind(this, item.id)}>
            <span class="text">{item.name}</span>
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
    padding: 0 20px;
    background: #fff;
    border-bottom: solid 1px rgba(245,245,245,1);
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    &::-webkit-scrollbar-thumb {
      background: transparent;
    }
    &:hover{
      &::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.2);
      }
    }
    .item{
      cursor: pointer;
      padding: 20px 0;
      position: relative;
      display: inline-block;
      margin-right: 30px;
      &.is-hot{
        margin-right: 47px;
      }
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
