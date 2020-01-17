<script>
/**
 * slots @params default存在的话就只显示 default
 * slots @params 具名插槽，命名按照index展示[0,1,2,3...]
 */
import TabSwitch from '~/components/common/TabSwitch' // Tab切换栏
export default {
  name: 'TabList',
  components: {
    TabSwitch
  },
  props: {
    tabTypeList: {
      type: Array,
      required: true
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      // currentIndex: 0
    }
  },
  methods: {
    change (val) {
      // this.currentIndex = val.index
      this.$emit('change', val.index)
    }
  },
  render () {
    const { currentIndex, tabTypeList, change } = this
    const vm = this.$slots.default
      ? this.$slots.default
      : this.$slots[currentIndex]
    return (
      <div class="tabList">
        <TabSwitch
          class="header"
          currentIndex={currentIndex}
          on-change={val => change(val)}
          data={tabTypeList}
        />
        <div class="contentBody">{vm}</div>
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
.header {
  border-bottom: 1px solid #f5f5f5;
}
</style>
