<script>
/**
* 图片集合列表组件
* 用法
*/
export default {
  name: 'PicList',
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      demoImg: require('@/static/img/game-types/demo.png')
    }
  },
  computed: {

  },
  created () {

  },
  methods: {

  },
  render () {
    // const {  } = this

    const dom = (
      <div>
        <div class="pic-box">
          {[1, 2, 3, 4, 5, 6, 7].map((item) => {
            return (
              <div class="pic-item">
                <div class="poster">
                  <img src={this.demoImg} alt=""/>
                  <span class="period">2:17</span>
                  <icon-font class="play-icon" type="iconbofang"></icon-font>
                </div>
                <p class="title">王者荣耀高清壁纸王者荣耀高清壁纸</p>
                <div class="status">
                  <GameTypeIcon type="lol" class="type-icon"/>
                  <span class="type-text">游戏图集</span>
                  <span class="time">24分钟前</span>
                  <span class="btns">
                    <icon-font class="iconfont" type="iconyanjing"></icon-font>
                    <i class="num">999</i>
                  </span>
                </div>
              </div>
            )
          })}
        </div>
        <div class="loading-box">
          <a-button
            class="load-more"
            size="small"
            loading={false}>加载更多</a-button>
        </div>
      </div>
    )

    return dom
  }
}
</script>

<style lang="less" scoped>
  .pic-box{
    background: #fff;
    overflow: hidden;
    padding: 20px;
    border-bottom: solid 1px #F5F5F5;
    .pic-item{
      overflow: hidden;
      width: 270px;
      height: 232px;
      float: left;
      margin: 0 10px 20px;
      background:rgba(245,245,245,1);
      &:hover{
        .poster .play-icon{
          color: @primary-color;
        }
      }
      .poster{
        position: relative;
        height: 162px;
        cursor: pointer;
        img{
          width: 100%;
          height: 162px;
        }
        .period{
          width:40px;
          height:20px;
          line-height: 20px;
          background:rgba(0,0,0, .3);
          color: #fff;
          font-size: 12px;
          text-align: center;
          position: absolute;
          right: 8px;
          bottom: 8px;
        }
        .play-icon{
          color: #CBCBCB;
          font-size: 36px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate3d(-50%, -50%, 0);
          transition: all .3s;
        }
      }
      .num-gray{
        width:40px;
        height:20px;
        line-height: 20px;
        background:rgba(245,245,245,1);
        color: #999999;
        font-size: 12px;
        text-align: center;
        float: right;
        margin-top: 10px;
      }
      .title{
        font-size: 14px;
        color: #212121;
        padding: 15px 11px 11px;
        cursor: pointer;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        &:hover{
          color: @primary-color;
        }
      }
      .status{
        padding: 0 13px;
        color: #999;
        font-size: 14px;
        .type-icon{
          width: 20px;
          height: 20px;
          margin-right: 10px;
          font-size: 20px;
          vertical-align: middle;
        }
        .type-text{
          color: @primary-color;
          font-size: 14px;
        }
        .time{
          padding-left: 15px;
        }
      }
      .btns{
        float: right;
        font-size: 12px;
        color: #999;
        .iconfont{
          font-size: 18px;
          color: #C2C2C2;
          vertical-align: middle;
        }
        .num{
          font-style: normal;
          padding: 0 0 0 6px;
        }
      }
    }
  }
  .loading-box{
    background: #fff;
    padding: 16px 18px;
    margin-bottom: 30px;
  }
  .load-more{
    height:42px;
    background:#F4F4F4;
    font-size: 14px;
    color: #999;
    text-align: center;
    line-height: 42px;
    cursor: pointer;
    display: block;
    width: 100%;
    cursor: pointer;
  }
</style>
