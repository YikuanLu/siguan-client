<script>
/**
* 实时比分-详情-图文直播等tab切换组件
* 用法
**/
export default {
  name: 'LiveTabs',
  props: {
    gameType: {
      type: String,
      default: null
    },
    data: {
      type: Object,
      default: () => {}
    },
    value: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      cur: 1,
      types: [
        {
          id: 1,
          text: '图文直播'
        },
        {
          id: 2,
          text: '全网指数'
        },
        {
          id: 3,
          text: '赛前分析'
        },
        {
          id: 4,
          text: '赛后数据'
        },
        {
          id: 5,
          text: '赛事战报'
        }
      ],
      noLive: ['ow'],
      infoData: this.data
    }
  },
  mounted () {
    this.getCurStatus()
  },
  methods: {
    judgeOwEnd () {
      // 守望先锋只有赛前分析
      if (this.gameType === 'ow' && this.infoData.status === 2) {
        this.types = [
          {
            id: 2,
            text: '全网指数'
          },
          {
            id: 4,
            text: '赛前分析'
          },
          {
            id: 5,
            text: '赛事战报'
          }
        ]
      }
    },
    judgeType () {
      // 守望先锋(ow)没有图文直播
      if (this.noLive.includes(this.gameType)) {
        this.types.shift()
        this.cur = 2
      }
    },
    getCurStatus () {
      const { infoData } = this
      if (infoData.status === 0) {
        // `未开始`
        this.types = [
          {
            id: 2,
            text: '全网指数'
          },
          {
            id: 3,
            text: '赛前分析'
          }
        ]
        this.cur = 2
      }
      if (infoData.status === 1) {
        // `直播中`
        this.types = [
          {
            id: 1,
            text: '图文直播'
          },
          {
            id: 2,
            text: '全网指数'
          },
          {
            id: 3,
            text: '赛前分析'
          }
        ]
        this.judgeType()
      }
      if (infoData.status === 2) {
        // `已结束`
        this.types = [
          {
            id: 2,
            text: '全网指数'
          },
          {
            id: 3,
            text: '赛前分析'
          },
          {
            id: 4,
            text: '赛后数据'
          },
          {
            id: 5,
            text: '赛事战报'
          }
        ]
        this.cur = 2
        this.judgeOwEnd()
      }
    },
    switchTab (val) {
      this.cur = val
      this.$emit('switchTab', val)
    }
  },
  render () {
    this.cur = this.value
    const { types, cur, switchTab } = this

    const dom = (
      <div class="detail-tab">
        {types.map((item) => {
          return (
            <div
              class="item"
              onClick={switchTab.bind(this, item.id)}
              class={{ item: true, 'on': cur === item.id }}
            >{item.text}</div>
          )
        })}
      </div>
    )
    return dom
  }
}
</script>
<style scoped lang="less">
  .detail-tab{
    overflow: hidden;
    background: #fff;
    padding: 19px 20px 15px;
    .item{
      float: left;
      width:80px;
      height:36px;
      line-height: 36px;
      text-align: center;
      border-radius: 4px;
      font-size: 16px;
      color: #212121;
      margin-right: 50px;
      cursor: pointer;
      &.on{
        background: @primary-color;
        color: #fff;
      }
    }
  }
</style>
