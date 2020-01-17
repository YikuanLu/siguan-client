<template>
  <div class="sider-box">
    <nuxt-link v-for="(item, index) in hotData" :key="index" :to="`/match/${gameType}/team/${item.teamId}`" :title="item.shortName || item.name || item.teamName" class="sider-item">
      <div class="logo">
        <img :src="item.logo || item.teamLogo" alt="">
      </div>
      <p class="name" v-text="item.shortName || item.name || item.teamName"></p>
    </nuxt-link>
  </div>
</template>

<script>
/**
* 侧边热门战队组件
* 用法
* import SiderHotTeams from '~/components/siderbox/SiderHotTeams'
* components: { SiderHotTeams }
* <sider-hot-teams></sider-hot-teams>
*/
export default {
  name: 'SiderHotTeams',
  components: {},
  props: {
    data: {
      type: Array,
      default: () => []
    },
    gameType: {
      type: String,
      default: 'lol'
    }
  },
  data () {
    return {
      hotData: this.data
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
  .sider-box{
    background: #fff;
    overflow: hidden;
    padding: 20px 15px;
    .sider-item{
      overflow: hidden;
      text-align: center;
      float: left;
      margin: 0 15px 20px;
      cursor: pointer;
      &:hover{
        .logo{
          border-color: @primary-color;
        }
        .name{
          color: @primary-color;
        }
      }
      .logo{
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 50px;
        border-radius: 50%;
        border:2px solid rgba(224, 224, 224, 1);
        transition: all .3s;
        overflow: hidden;
        img{
          height: 40px;
          max-width: 100%;
          display: inline-block;
          margin: auto;
        }
      }
      .name{
        font-size: 14px;
        color: #333;
        padding-top: 9px;
        transition: all .3s;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 60px;
      }
    }
  }
</style>
