<template>
  <div class="sider-box" :class="{ fromIndex }">
    <div class="sider-item">
      <img class="fl poster" src="@/static/img/game-types/demo.png" alt="">
      <nuxt-link :to="`/news/5`" class="title">任天堂switch最新设备宣传PV</nuxt-link>
      <div class="infos">
        <span class="time">
          <img class="type" src="@/static/img/game-types/demo.png" alt="">
          1分钟前
        </span>
        <span class="view-num">
          <icon-font class="iconfont" type="iconyanjing"></icon-font>
          338
        </span>
      </div>
    </div>
    <div class="sider-item">
      <img class="fl poster" src="@/static/img/game-types/demo.png" alt="">
      <nuxt-link :to="`/news/6`" class="title">任天堂switch最新设备宣传PV</nuxt-link>
      <div class="infos">
        <span class="time">
          <img class="type" src="@/static/img/game-types/demo.png" alt="">
          1分钟前
        </span>
        <span class="view-num">
          <icon-font class="iconfont" type="iconyanjing"></icon-font>
          338
        </span>
      </div>
    </div>
  </div>
</template>

<script>
/**
* 侧边栏视频组件
* 用法
* import SiderVideos from '~/components/siderbox/SiderVideos'
* components: { SiderVideos }
* <sider-videos></sider-videos>
*/
export default {
  name: 'SiderVideos',
  components: {},
  props: {
    fromIndex: { // 是否是首页模块，首页模块展示不一样
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  },
  created () {

  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
  .sider-box{
    background: #fff;
    &.fromIndex .sider-item{
      .poster{
        float: none;
        display: block;
        width: 100%;
        height: auto;
      }
      .title{
        margin: 6px auto;
        -webkit-line-clamp: 1;
        height: 16px;
      }
      .infos{
        margin-top: 6px;
      }
    }
    .sider-item{
      padding: 12px 14px;
      overflow: hidden;
      border-bottom: solid 1px rgba(236,239,244,1);
      .poster{
        width: 100px;
        height: 60px;
        margin: 0 11px 0 0;
      }
      .title{
        line-height: 16px;
        font-size: 14px;
        color:rgba(51,51,51,1);
        white-space: normal;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        height: 32px;
        margin-bottom: 10px;
        overflow: hidden;
        &:hover{
          color: @primary-color;
        }
      }
      .infos{
        position: relative;
        line-height: 0;
      }
      .time{
        font-size: 12px;
        color:rgba(153,153,153,1);
        display: flex;
        align-items: center;
        .type{
          width: 16px;
          height: 16px;
          margin-right: 8px;
        }
      }
      .view-num{
        font-size: 12px;
        color:#999;
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        .iconfont{
          font-size: 20px;
          color: #c2c2c2;
          vertical-align: middle;
        }
      }
    }
  }
</style>
