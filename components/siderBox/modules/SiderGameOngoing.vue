<template>
  <div class="sider-box">
    <div v-for="(outer, outerI) in Object.keys(resData)" :key="outerI" class="sider-item">
      <template v-if="resData[outer] && resData[outer].length">
        <nuxt-link :title="titles[outer]" class="game-link" target="_blank" :to="`/match/${outer}`">
          <GameTypeIcon class="game-icon" :type="outer"/>
          <span class="game-name">{{ gameTypes[outer] }}赛事</span>
          <icon-font class="iconfont" type="iconjinru"></icon-font>
        </nuxt-link>
        <ul class="game-list">
          <li v-for="(item, index) in resData[outer]" :key="index" class="item">
            <a-tooltip :title="item.leagueName">
              <nuxt-link target="_blank" :to="`/match/${outer}/league/${item.leagueId}`" class="name">{{ item.leagueName }}</nuxt-link>
            </a-tooltip>
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<script>
/**
* 侧边赛事进行中组件
* 用法
* import SiderGameOngoing from '~/components/siderbox/SiderGameOngoing'
* components: { SiderGameOngoing }
* <sider-game-ongoing></sider-game-ongoing>
*/
import { homeApi } from '~/api/index'
export default {
  name: 'SiderGameOngoing',
  components: {},
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      gameTypes: {
        csgo: 'CS:GO',
        dota: 'DOTA2',
        kog: '王者荣耀',
        lol: '英雄联盟',
        ow: '守望先锋'
      },
      resData: {},
      titles: {
        csgo: 'csgo比分赛事',
        dota: 'dota2比分比赛 ',
        kog: '王者荣耀比分网',
        lol: 'LOL比分赛程',
        ow: 'ow比分赛程'
      }
    }
  },
  created () {
    // 如果不是服务端请求数据，就用客户端请求
    if (!this.data) {
      this.getData()
    } else {
      this.resData = this.data
    }
  },
  methods: {
    getData () {
      this.$axios.get(homeApi.leagueList).then((res) => {
        this.resData = res
      })
    },
    toLeague (item, gameType) {
      const routeData = this.$router.resolve({
        path: `/match/${gameType}/league/${item.leagueId}`
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
          margin-right: 4px;
          font-size: 20px;
          vertical-align: sub;
        }
        .game-name{
          font-size: 16px;
          color:rgba(33,33,33,1);
          &:hover{
            color: @primary-color;
          }
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
          margin-right: 4px;
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
