<template>
  <div class="sider-box">
    <div v-for="(outer, outerI) in Object.keys(resData)" :key="outerI" class="sider-item">
      <template v-if="resData[outer] && resData[outer].length">
        <nuxt-link class="game-link" :to="`/match/${outer}`">
          <GameTypeIcon class="game-icon" :type="outer"/>
          <span class="game-name">{{ gameTypes[outer] }}战队</span>
          <icon-font class="iconfont" type="iconjinru"></icon-font>
        </nuxt-link>
        <ul class="game-list">
          <li v-for="(item, index) in resData[outer]" :key="index" class="item" @click="toTeam(item, outer)">
            <a-tooltip :title="item.teamName">
              <img class="logo" :src="item.teamLogo" alt="">
              <span class="name">{{ item.teamName }}</span>
            </a-tooltip>
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<script>
/**
* 侧边栏战队进行中组件
* 用法
* import SiderTeamOngoing from '~/components/siderbox/SiderTeamOngoing'
* components: { SiderTeamOngoing }
* <sider-team-ongoing></sider-team-ongoing>
*/
import { homeApi } from '~/api/index'
export default {
  name: 'SiderTeamOngoing',
  components: {},
  props: {},
  data () {
    return {
      gameTypes: {
        csgo: 'CS:GO',
        dota: 'DOTA2',
        kog: '王者荣耀',
        lol: '英雄联盟',
        ow: '守望先锋'
      },
      resData: {}
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get(homeApi.teamList).then((res) => {
        this.resData = res
      })
    },
    toTeam (item, gameType) {
      const routeData = this.$router.resolve({
        path: `/match/${gameType}/team/${item.teamId}`
      })
      window.open(routeData.href, '_blank')
    }
  }
}
</script>

<style lang="less" scoped>
  .sider-box{
    background: #fff;
    .sider-item{
      overflow: hidden;
      border-bottom: solid 1px rgba(236,239,244,1);
      .game-link{
        display: block;
        height: 60px;
        line-height: 60px;
        border-bottom: solid 1px rgba(236,239,244,1);
        padding: 0 18px 0 14px;
        position: relative;
        .game-icon{
          width: 26px;
          height: 26px;
          font-size: 26px;
          vertical-align: middle;
          margin-right: 4px;
        }
        .game-name{
          font-size: 16px;
          color:rgba(33,33,33,1);
        }
        .iconfont{
          font-size: 16px;
          color: #DCDCDC;
          position: absolute;
          right: 18px;
          top: 24px;
        }
      }
      .game-list{
        .item{
          padding: 14px 0 15px 24px;
          cursor: pointer;
        }
        .logo{
          width: 20px;
          max-height: 20px;
          margin-right: 6px;
        }
        .name{
          font-size: 14px;
          color: #333;
          width: 130px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: inline-block;
          vertical-align: middle;
          transition: all .3s;
          &:hover{
            color: @primary-color;
          }
        }
      }
    }
  }
</style>
