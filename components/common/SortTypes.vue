<script>
/**
* 时间、赛事排序组件
* 用法
* @switchTab 切换的回调
* import SortTypes from '~/components/common/SortTypes'
* components: { SortTypes }
* <sort-types @switchTab="switchTypeTab"></sort-types>
**/
export default {
  name: 'SortTypes',
  props: {

  },
  data () {
    return {
      cur: ''
    }
  },
  created () {},
  beforeDestory () {},
  methods: {
    switchTab (type) {
      this.cur === type ? this.cur = '' : this.cur = type
      this.$emit('switchTab', type)
    }
  },
  render () {
    const { cur, switchTab } = this
    const tab = (
      <div class="sort-tabs">
        <span
          class={{ tab: true, active: cur === 'game' }}
          onClick={switchTab.bind(this, 'game')}
        >赛事排序</span>
      </div>
    )
    return tab
  }
}
</script>
<style scoped lang="less">
  .sort-tabs {
    background: #fff;
    .tab {
      width: 90px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      background: #fff;
      border-radius: 4px;
      font-size: 14px;
      color: #333;
      border:1px solid rgba(224,224,224,1);
      display: inline-block;
      cursor: pointer;
      user-select: none;
      &.active {
        border-color: @primary-color;
        background: @primary-color;
        color: #fff;
      }
    }
  }
</style>
