<script>
/**
* 实时比分-详情-图文直播切换组件
* 用法
* @switchTab 点击tab切换的回调
*/
export default {
  name: 'LiveGameStauts',
  props: {

  },
  data () {
    return {
      demoImg: require('@/static/img/game-types/demo.png'),
      vsImg: require('@/static/img/common/vs.png')
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
    const score = (
      <div class="top-score">
        <icon-font class="winner left" type="iconhuangguan"></icon-font>
        <img class="team-logo left" src={this.demoImg} alt=""/>
        <div class="team-name left">
          <p class="name">KS</p>
        </div>
        <div class="team-score left">
          <p class="score">1</p>
        </div>
        <img class="vs-img" src={this.vsImg} alt=""/>
        <div class="team-score right">
          <p class="score">4</p>
        </div>
        <div class="team-name right">
          <p class="name">AD</p>
        </div>
        <img class="team-logo right" src={this.demoImg} alt=""/>
        <icon-font class="winner right" type="iconhuangguan"></icon-font>
      </div>
    )

    const dom = (
      <div class="game-content">
        {score}
      </div>
    )

    return dom
  }
}
</script>

<style lang="less" scoped>
  .game-content{
    overflow: hidden;
    .top-score{
      position: relative;
      text-align: center;
      padding: 19px 0;
      height: 100px;
      .winner{
        font-size: 30px;
        color: #FFBA00;
        position: absolute;
        z-index: 2;
        &.left{
          top: 0px;
          left: 35px;
          transform: rotate(-45deg);
        }
        &.right{
          top: 5px;
          right: 30px;
          transform: rotate(45deg);
        }
      }
      .team-role{
        width:26px;
        height:60px;
        font-size: 14px;
        color: #fff;
        font-weight: 600;
        line-height: 20px;
        padding-top: 6px;
        position: absolute;
        &.blue{
          background: #677EEA;
          left: 0;
        }
        &.red{
          background: #F04844;
          right: 0;
        }
      }
      .team-logo{
        width: 60px;
        height: 60px;
        position: absolute;
        &.left{
          left: 50px;
        }
        &.right{
          right: 50px;
        }
      }
      .team-name{
        position: absolute;
        top: 30px;
        &.left{
          text-align: left;
          left: 120px;
        }
        &.right{
          text-align: right;
          right: 120px;
        }
        .name{
          font-size: 20px;
          color: #333;
          font-weight: 600;
          line-height: 30px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 188px;
        }
      }
      .team-score{
        text-align: center;
        position: absolute;
        top: 30px;
        &.left{
          left: 320px;
        }
        &.right{
          right: 320px;
        }
        .score{
          font-size: 34px;
          color: #999;
          font-weight: 600;
        }
      }
      .vs-img{
        width: 34px;
        height: 34px;
        position: absolute;
        top: 30px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
</style>
