<script>
/**
* 实时比分-平台切换组件
* 用法
**/
import { matchApi } from '~/api/index'
export default {
  name: 'LivePlatformTabs',
  props: {
    type: { // 根据不同游戏类型请求不同接口
      type: String,
      default: ''
    }
  },
  data () {
    return {
      cur: '1',
      types: [],
      matchId: this.$route.params.matchId
    }
  },
  created () {
    this.getLiveVideo()
  },
  methods: {
    switchTab (val) {
      this.cur = val
      this.$bus.emit('changePlatform', val)
    },
    hasVideo () {
      // 有直播视频数据
      this.$bus.emit('hasLiveVideo', true)
    },
    getLiveVideo () {
      // 获取LOL直播地址
      const params = {
        matchId: this.matchId
      }
      this.$axios.get(matchApi[this.type].match.liveVideo, { params }).then((res) => {
        this.types = res
        if (res[0]) {
          this.switchTab(res[0].url)
          this.hasVideo()
        }
      })
    }
  },
  render () {
    const { types, cur, switchTab } = this
    if (!types || !types.length) { return null }
    const dom = (
      <div class="plat-tabs">
        {types.map((item) => {
          return (
            <span
              target="_blank"
              class={{ item: true, 'on': item.url === cur }}
              onClick={switchTab.bind(this, item.url)}
            >{item.name}
            </span>
          )
        })}
      </div>
    )
    return dom
  }
}
</script>
<style scoped lang="less">
  .plat-tabs{
    background: #fff;
    overflow: hidden;
    border-top: solid 1px #F5F5F5;
    padding: 15px 0;
    text-align: center;
    overflow-x: auto;
    white-space: nowrap;
    .item{
      display: inline-block;
      width:70px;
      height:36px;
      border:1px solid rgba(224,224,224,1);
      border-radius:3px 3px 3px 3px;
      font-size: 14px;
      color: #999;
      text-align: center;
      line-height: 36px;
      margin: 0 5px;
      cursor: pointer;
      &.on, &:hover{
        border-color: @primary-color;
        color: @primary-color;
      }
    }
  }
</style>
