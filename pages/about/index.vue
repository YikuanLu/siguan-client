<template>
  <div class="about-container">
    <div class="wrap1">
      <div class="banner-text">
        <h2>关于我们</h2>
        <h3>
          尚牛电竞是专注于游戏电竞比赛直播、大数据分析、<br />
          媒体资讯、玩家社群一体的综合电竞服务平台。
        </h3>
      </div>
    </div>
    <div class="wrap2">
      <div class="wrap-box">
        <div class="common-title">
          <h4>公司简介</h4>
          <h5>COMPANY PROFILE</h5>
          <div class="line"></div>
        </div>
        <p class="introduce">
          厦门思冠科技有限公司主办的尚牛电竞（www.shangniu.cn），是一家专业提供电竞赛事<br />
          比分直播、数据分析、游戏资讯、玩家社区的综合型电竞数据平台，涵盖刀塔二、英雄联盟、CS:GO、王者荣耀、守望先锋等热门游戏。
        </p>
        <ul class="game-types">
          <li>
            <img class="show-img" src="@/static/img/about/yx1.png" alt="">
            <img class="hidden-img" src="@/static/img/about/yx1_1.png" alt="">
            <div class="hidden-text">英雄联盟</div>
          </li>
          <li>
            <img class="show-img" src="@/static/img/about/yx2.png" alt="">
            <img class="hidden-img" src="@/static/img/about/yx2_1.png" alt="">
            <div class="hidden-text">DOTA2</div>
          </li>
          <li>
            <img class="show-img" src="@/static/img/about/yx3.png" alt="">
            <img class="hidden-img" src="@/static/img/about/yx3_1.png" alt="">
            <div class="hidden-text">CS:GO</div>
          </li>
          <li>
            <img class="show-img" src="@/static/img/about/yx4.png" alt="">
            <img class="hidden-img" src="@/static/img/about/yx4_1.png" alt="">
            <div class="hidden-text">王者荣耀</div>
          </li>
          <li>
            <img class="show-img" src="@/static/img/about/yx5.png" alt="">
            <img class="hidden-img" src="@/static/img/about/yx5_1.png" alt="">
            <div class="hidden-text">守望先锋</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="wrap3">
      <div class="wrap-box">
        <div class="common-title">
          <h4>我们的优势</h4>
          <h5>OUR ADVANTAGE</h5>
          <div class="line"></div>
        </div>
        <ul class="advance-list">
          <li>
            <img src="@/static/img/about/ys1@2x.png" alt="">
            <p class="tit">快速、稳定的即时比分服务</p>
            <p class="descr">比分将在第一时间呈现，比视频直播会快40-65秒，比同类 网站也会快3-5秒。并且平台拥有完善的数据自查体系，保 证快速的同时兼具稳定。静若处子，动若脱兔也是平台坚持 不懈追求的目标。</p>
          </li>
          <li>
            <img src="@/static/img/about/ys2@2x.png" alt="">
            <p class="tit">专业、全面的数据分析 </p>
            <p class="descr"> 平台独创动态数据分析法，通过对大数据的分析能够对场上形式进行准确判断并且数据化，让玩家对场上形势了然于心。
            </p>
          </li>
          <li>
            <img src="@/static/img/about/ys3@2x.png" alt="">
            <p class="tit">真实的赛事情报</p>
            <p class="descr">平台聘请电竞行业专业人士对各大赛事的重要比赛场次进行全方位的赛前分析，并且第一时间提供影响比赛走势的各种优劣情报。
            </p>
          </li>
          <li>
            <img src="@/static/img/about/ys4@2x.png" alt="">
            <p class="tit">详细的战队、队员、赛事数据资料</p>
            <p class="descr">平台拥有完善的资料库，整理并分析了近3年来国内外各大电竞赛事。采用动态分析法对战队、队员进行了全方位无死角的数据分析，特别在动态英雄组合结合游戏版本的胜率变动及阵容克制等高阶数据方面取得了前所未有的突破。
            </p>
          </li>
        </ul>
      </div>
    </div>
    <div class="wrap4">
      <div class="wrap-box">
        <div class="common-title">
          <h4>企业文化</h4>
          <h5>CORPORATE CULTURE</h5>
          <div class="line"></div>
        </div>
        <ul class="culture-list">
          <li>
            <img src="@/static/img/about/wh1@2x.png" alt="">
            <p class="descr">专注</p>
          </li>
          <li>
            <img src="@/static/img/about/wh2@2x.png" alt="">
            <p class="descr">极致</p>
          </li>
          <li>
            <img src="@/static/img/about/wh3@2x.png" alt="">
            <p class="descr">高效</p>
          </li>
          <li>
            <img src="@/static/img/about/wh4@2x.png" alt="">
            <p class="descr">共赢</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="wrap5">
      <div class="wrap-box">
        <div class="common-title">
          <h4>加入我们</h4>
          <h5>JOIN US</h5>
          <div class="line"></div>
        </div>
        <p class="idea">我们在寻找有想法、肯苦干、臭味相投的年轻的你。</p>
        <a href="https://wpa.qq.com/msgrd?v=3&uin=473508862&site=qq&menu=yes" target="_blank" class="join-btn">马上联系</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutUs',
  components: {},
  head () {
    return {
      title: '关于我们_最快、最准的电竞比分网 - 尚牛电竞'
    }
  },
  data () {
    return {}
  },
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang="less">
  .about-container{
    min-width: 1200px;
    .common-title{
      text-align: center;
      h4{
        font-size:30px;
        color: #333;
        padding: 50px 0 12px;
      }
      h5{
        font-size:20px;
        color: #333;
      }
      .line{
        width:60px;
        height:5px;
        background:rgba(51,153,238,1);
        margin: 20px auto 0;
      }
    }
    .wrap1{
      width: 100%;
      height: 450px;
      background: url(../../static/img/about/banner@2x.png) no-repeat center top #288ce9;
      min-width: 1200px;
      position: relative;
      text-align: center;
      padding-top: 155px;
      .banner-text{
        width:571px;
        height:154px;
        margin: auto;
        h2{
          font-size: 36px;
          color: #fff;
          font-weight: 600;
          position: relative;
          top: -22px;
        }
        h3{
          font-size: 22px;
          color: #fff;
          line-height: 32px;
          padding-top: 10px;
        }
      }
    }
    .wrap2{
      background: #fff;
      text-align: center;
      padding-bottom: 61px;
      .introduce{
        font-size: 16px;
        color: #333;
        line-height: 24px;
        padding: 40px 0;
      }
      .game-types{
        overflow: hidden;
        li{
          float: left;
          height: 154px;
          width: 228px;
          position: relative;
          margin-right: 15px;
          .hidden-text{
            font-size: 20px;
            color: #fff;
            font-weight: 600;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate3d(-50%, -50%, 0);
            opacity: 0;
            transition: all .5s;
          }
          .hidden-img{
            transform: translateY(154px);
            opacity: 0;
            transition: all .3s;
          }
          .show-img{
            transform: translateY(0);
            opacity: 1;
            transition: all .3s;
          }
          &:hover{
            .hidden-text{
              opacity: 1;
            }
            .show-img{
              transform: translateY(-154px);
              opacity: 0;
            }
            .hidden-img{
              transform: translateY(-154px);
              opacity: 1;
            }
          }
          &:last-child{
            margin-right: 0;
          }
          img{
            height: 154px;
            width: 228px;
          }
        }
      }
    }
    .wrap3{
      width: 100%;
      height: 690px;
      background: url(../../static/img/about/ysbg.jpg) no-repeat center top #288ce9;
      min-width: 1200px;
      position: relative;
      .common-title{
        h4, h5{
          color: #fff;
        }
        .line{
          background:#fff;
        }
      }
      .advance-list{
        overflow: hidden;
        padding: 60px 0;
        li{
          width: 580px;
          height: 200px;
          background:rgba(255,255,255,1);
          box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.2);
          border-radius: 4px;
          overflow: hidden;
          float: left;
          margin: 0 40px 40px 0;
          position: relative;
          top: 0;
          transition: all .3s;
          padding: 38px 0;
          &:hover{
            top: -2px;
          }
          &:nth-child(2n-2){
            margin-right: 0;
          }
          img{
            width: 90px;
            height: 90px;
            float: left;
            margin: 17px 20px;
          }
          .tit{
            font-size: 20px;
            color: #3399EE;
            font-weight: 600;
            padding-bottom: 15px;
          }
          .descr{
            font-size: 16px;
            color: #333;
            line-height: 24px;
            width: 420px;
            margin-left: 130px;
          }
        }
      }
    }
    .wrap4{
      background: #fff;
      .culture-list{
        font-size: 0;
        padding: 60px 0;
        li{
          width: 280px;
          height: 280px;
          background:rgba(255,255,255,1);
          box-shadow:0px 2px 12px 0px rgba(0,64,117,0.1);
          border-radius:3px;
          display: inline-block;
          margin-right: 26px;
          text-align: center;
          position: relative;
          top: 0;
          transition: all .3s;
          &:hover{
            top: -2px;
            .descr{
              color: @primary-color;
            }
          }
          &:last-child{
            margin-right: 0;
          }
          img{
            width: 140px;
            height: 123px;
            margin-top: 60px;
          }
          .descr{
            font-size: 20px;
            color: #333;
            font-weight: 600;
            margin-top: 19px;
          }
        }
      }
    }
    .wrap5{
      width: 100%;
      height: 500px;
      background: url(../../static/img/about/gybg.jpg) no-repeat center top #288ce9;
      min-width: 1200px;
      position: relative;
      text-align: center;
      .common-title{
        h4, h5{
          color: #fff;
        }
        .line{
          background:#fff;
        }
      }
      .idea{
        font-size: 16px;
        color: #fff;
        padding: 40px 0 30px;
      }
      .join-btn{
        display: block;
        margin: auto;
        width:120px;
        height:40px;
        line-height: 40px;
        text-align: center;
        background:rgba(255,255,255,1);
        box-shadow:0px 0px 12px 0px rgba(0, 0, 0, 0.1);
        border-radius:4px;
        color: #3399EE;
        font-size: 16px;
        transition: all .3s;
        &:hover{
          color: #fff;
          background: #40a9ff;
        }
      }
    }
  }
</style>
