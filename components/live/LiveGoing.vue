<script>
/**
* 实时比分-直播组件
* 用法
**/
import LiveVideo from '~/components/live/modules/liveGoing/Video'
// import ChatRoom from '~/components/live/modules/liveGoing/ChatRoom'
export default {
  name: 'LiveHeader',
  props: {

  },
  data () {
    return {
      hasData: false
    }
  },
  created () {
    // 接收直播平台切换事件
    this.$bus.on('hasLiveVideo', (val) => {
      this.hasData = true
    })
  },
  methods: {

  },
  beforeDestory () {
    this.$bus.off('hasLiveVideo')
  },
  render () {
    const dom = (
      <div class={{ 'live-going': true, hide: !this.hasData }}>
        <LiveVideo/>
      </div>
    )
    return dom
  }
}
</script>
<style scoped lang="less">
  .live-going{
    margin-top: 10px;
    overflow: hidden;
    &.hide{
      display: none;
    }
  }
</style>
