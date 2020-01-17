<script>
/**
* 实时比分-实时聊天组件
* 用法
**/
export default {
  name: 'LiveVideo',
  props: {

  },
  data () {
    return {
      playUrl: ''
    }
  },
  created () {
    // 接收直播平台切换事件
    this.$bus.on('changePlatform', (val) => {
      this.playUrl = val
      console.log('playUrl1', val)
    })
  },
  beforeDestory () {
    this.$bus.off('changePlatform')
  },
  methods: {

  },
  render () {
    const { playUrl } = this

    const dom = (
      <div class="video-box">
        <iframe class="video" width="100%" height="100%" frameborder="0" scrolling="no" src={playUrl}></iframe>
      </div>
    )
    return dom
  }
}
</script>
<style scoped lang="less">
  .video-box{
    width: 100%;
    // width: 890px;
    height: 500px;
    margin-right: 10px;
    float: left;
    background: #fff;
    .video{
      width: 100%;
      height: 500px;
    }
  }
</style>
