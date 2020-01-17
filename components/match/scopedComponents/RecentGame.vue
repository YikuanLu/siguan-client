<script>
/**
 * 近期赛事组件
 * 用法
 * @data 数组
 * import RecentGame from '~/components/match/RecentGame'
 * components: { RecentGame }
 * <RecentGame></RecentGame>
 **/
export default {
  name: 'RecentGame',
  props: {
    gameType: {
      type: String,
      default: 'lol'
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {}
  },
  methods: {},
  render () {
    const { data } = this
    let slideArray = []
    if (data.length) {
      const slideTimes = Math.ceil(data.length / 5)
      slideArray = new Array(slideTimes).join(',').split(',')
    } else {
      return null
    }
    const content = slideArray.map((v, i) => {
      const curArr = data.slice(5 * i, 5 * i + 5).length
        ? data.slice(5 * i, 5 * i + 5)
        : data.slice(5 * i)
      return (
        <div class="slide-box">
          {curArr.map((item, j) => {
            return (
              <div class="slide-item" title={item.name}>
                <nuxt-link target="_blank" to={`/match/${this.gameType}/league/${item.leagueId}`}>
                  <img src={item.logo} alt={item.name} />
                  <p class="game-name">{item.name}</p>
                </nuxt-link>
              </div>
            )
          })}
        </div>
      )
    })

    const dom = (
      <div class="recent-games">
        <p class="title">近期联赛</p>
        <a-carousel arrows dots={false} infinite={false}>
          <icon-font
            type="iconxiayige-copy"
            slot="prevArrow"
            class="custom-slick-arrow prev"
          ></icon-font>
          <icon-font
            type="iconxiayige"
            slot="nextArrow"
            class="custom-slick-arrow next"
          ></icon-font>
          {content}
        </a-carousel>
      </div>
    )
    return dom
  }
}
</script>
<style scoped lang="less">
.recent-games {
  background: #fff;
  overflow: hidden;
  margin-bottom: 10px;
  height: 220px;
  .title {
    font-size: 16px;
    color: #212121;
    padding: 20px 20px 0 20px;
  }
  .slide-box {
    background: #fff;
    padding: 20px 0 24px;
    .slide-item {
      float: left;
      width: 200px;
      box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
      padding-top: 11px;
      margin: 0 10px;
      &:hover{
        .game-name{
          color: @primary-color;
        }
      }
      img {
        height: 78px;
        margin: 0 auto 11px;
      }
      .game-name {
        color: rgba(153, 153, 153, 1);
        font-size: 14px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-top: solid 1px #f5f5f5;
      }
    }
  }
}

.ant-carousel /deep/ .slick-list {
  margin: 0 50px;
  height: 164px;
  overflow: hidden;
}
.ant-carousel /deep/ .custom-slick-arrow {
  font-size: 24px;
  color: #c2c2c2;
  z-index: 10;
  &.prev {
    left: 20px;
  }
  &.next {
    right: 20px;
  }
}
.ant-carousel /deep/ .custom-slick-arrow:before {
  display: none;
}
.ant-carousel /deep/ .custom-slick-arrow:hover {
  color: @primary-color;
}

.ant-carousel /deep/ .slick-slide h3 {
  color: #fff;
}
</style>
