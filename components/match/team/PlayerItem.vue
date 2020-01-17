<script>
import { matchPlayerUrl } from '@/assets/js/config'
export default {
  name: 'PlayerItem',
  props: {
    gameType: {
      type: String,
      default: 'lol'
    },
    data: {
      type: Object,
      // required: true,
      default: () => { return {} }
    },
    isShowPosition: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    toPlayer (id) {
      this.$router.push(matchPlayerUrl({ gameType: this.gameType, id }))
    }
  },
  render () {
    const { data, toPlayer, isShowPosition } = this
    if (!data) { return null }
    return (
      <div
        class="playerItem"
        on-click={() => {
          toPlayer(data.playerId)
        }}
      >
        <div class="playerImg">
          <img src={data.avatar} alt={data.nickName || data.name} />
        </div>
        <p class="name">{data.nickName || data.name || data.nickname || '--'}</p>
        <p class="country">{data.country}</p>
        {isShowPosition ? <p class="position">位置：{data.position}</p> : null}
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
.playerItem {
  width: 104px;
  // height: 200px;
  margin: 0 10px;
  padding: 0 8px;
  cursor: pointer;
  .playerImg {
    width: 100%;
    height: 115px;
    background-color: #fff;
    overflow: hidden;
    display: flex;
    align-items: center;
    // border: 1px solid #eee;
    img {
      width: 100%;
    }
  }
  p {
    text-align: center;
  }
  .name {
    display: block;
    min-height: 14px;
    margin: 10px 0;
    font-size: 14px;
    color: #333333;
    overflow: hidden; //超出的文本隐藏
    text-overflow: ellipsis; //溢出用省略号显示
    white-space: nowrap; //溢出不换行
  }
  .country {
    font-size: 14px;
    color: #333333;
    margin-bottom: 10px;
  }
  .position {
    padding: 6px 8px;
    background-color: #f4f4f4;
    color: #999999;
    font-size: 14px;
    border-radius: 4px;
  }
}
</style>
