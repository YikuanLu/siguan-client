<template>
  <div class="sider-box" :class="{ fromIndex }">
    <div class="sider-item">
      <div class="poster">
        <nuxt-link :to="`/news/1`">
          <img src="@/static/img/game-types/demo.png" alt="">
          <span class="name">王者荣耀高清壁纸</span>
          <span class="num">6图</span>
        </nuxt-link>
      </div>
    </div>
    <div class="sider-item">
      <nuxt-link class="title" :to="`/news/2`">王者荣耀高清壁纸</nuxt-link>
      <span class="num-gray">6图</span>
    </div>
    <div class="sider-item">
      <nuxt-link class="title" :to="`/news/3`">王者荣耀高清壁纸王者荣耀高清壁 王者荣耀高清壁纸</nuxt-link>
      <span class="num-gray">6图</span>
    </div>
  </div>
</template>

<script>
/**
* 侧边栏图集组件
* 用法
* import SiderPictures from '~/components/siderbox/SiderPictures'
* components: { SiderPictures }
* <sider-pictures></sider-pictures>
*/
export default {
  name: 'SiderPictures',
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
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title{
        width: 120px;
        white-space: normal;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .num-gray{
        margin-top: 0
      }
    }
    .sider-item{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 14px;
      overflow: hidden;
      border-bottom: solid 1px rgba(236,239,244,1);
      .poster{
        position: relative;
        img{
          width: 100%;
        }
        .name{
          font-size: 14px;
          color: #FEFEFE;
          position: absolute;
          top: 12px;
          left: 10px;
          text-shadow: 1px 0px 6px #333;
        }
        .num{
          width:40px;
          height:20px;
          line-height: 20px;
          background:rgba(51,153,238,1);
          color: #fff;
          font-size: 12px;
          text-align: center;
          position: absolute;
          right: 8px;
          bottom: 8px;
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
      }
      .title{
        width:209px;
        font-size:14px;
        color:rgba(33,33,33,1);
        float: left;
        line-height: 18px;
        &:hover{
          color: @primary-color;
        }
      }
    }
  }
</style>
