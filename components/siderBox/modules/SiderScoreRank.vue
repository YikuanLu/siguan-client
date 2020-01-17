<template>
  <div class="sider-box">
    <table class="rank-list">
      <tbody>
        <tr v-for="(item, index) in resData" :key="index" @click="toTeam(item.teamId)">
          <td class="rank">{{ index+1 }}</td>
          <td class="team" :title="item.teamShortName || item.teamName || item.name">
            <img :src="item.teamLogo || item.logo" class="logo" alt="">
            <span class="name" v-text="item.teamShortName || item.teamName || item.name"></span>
          </td>
          <td class="score" v-text="item.score || item.rating || item.kda.toFixed(1)"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
/**
* 侧边积分排行榜组件
* 用法
* import SiderScoreRank from '~/components/siderbox/SiderScoreRank'
* components: { SiderScoreRank }
* <sider-score-rank></sider-score-rank>
*/
import { matchApi } from '~/api/index'
export default {
  name: 'SiderScoreRank',
  components: {},
  props: {
    gameType: { // 类型
      type: String,
      default: 'lol'
    },
    leagueId: { // 联赛id
      type: [String, Number],
      default: ''
    }
  },
  data () {
    return {
      resData: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      const gameType = this.$route.params.gameType || this.gameType
      const gameNums = {
        lol: 9,
        dota: 8,
        csgo: 8,
        kog: 9
      }
      const params = {
        size: gameNums[gameType]
      }
      this.$axios.get(matchApi[gameType].league.hotTeam, { params }).then((res) => {
        this.resData = res
      })
    },
    toTeam (id) {
      const routeData = this.$router.resolve({
        path: `/match/${this.gameType}/team/${id}`
      })
      window.open(routeData.href, '_blank')
    }
  }
}
</script>

<style lang="less" scoped>
  .sider-box{
    background: #fff;
    position: relative;
    .sider-item{
      overflow: hidden;
      .game-link{
        display: block;
        height: 60px;
        line-height: 60px;
        border-bottom: solid 1px rgba(236,239,244,1);
        padding: 0 18px 0 14px;
        position: relative;
        cursor: pointer;
        .game-icon{
          width: 26px;
          height: 26px;
          font-size: 26px;
          vertical-align: middle;
          margin-right: 9px;
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
    }
  }
  .sub-menu-title{
    padding: 10px;
    display: inline-block;
    .icon{
      width: 26px;
      height: 26px;
      font-size: 26px;
      vertical-align: middle;
      margin-right: 6px;
    }
    .name{
      font-size: 16px;
      color: #333;
    }
  }
  .sub-menu-item{
    .logo{
      width: 20px;
      font-size: 20px;
      vertical-align: middle;
      margin-right: 8px;
    }
    .icon{
      width: 20px;
      height: 20px;
      font-size: 20px;
      vertical-align: middle;
    }
    .name{
      font-size: 16px;
      color: #333;
      vertical-align: middle;
    }
  }
  .sider-item /deep/ .ant-dropdown-menu-submenu-title .ant-dropdown-menu-submenu-arrow{
    top: 50%;
    transform: translateY(-50%);
  }

  .rank-list{
    width: 100%;
    tr{
      height: 60px;
      border-bottom: solid 1px rgba(236,239,244,1);
      cursor: pointer;
      td{
        vertical-align: middle;
      }
      &:nth-child(1){
        .rank{
          color: #FFBA00;
        }
      }
      &:nth-child(2){
        .rank{
          color: #BBBBBB;
        }
      }
      &:nth-child(3){
        .rank{
          color: #D08D69;
        }
      }
    }
    .rank{
      font-size:14px;
      text-align: left;
      font-family:Hiragino Sans GB;
      padding-left: 15px;
      width: 18%;
      font-weight: 900;
      color: #0F387C;
    }
    .team{
      text-align: left;
      .logo{
        width: 20px;
        font-size: 20px;
        vertical-align: middle;
        margin-right: 8px;
      }
      .name{
        font-size: 14px;
        color: #333;
        vertical-align: middle;
        max-width: 120px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;
      }
    }
    .score{
      font-size: 12px;
      color: #C11A33;
      text-align: right;
      font-family:Hiragino Sans GB;
      padding-right: 15px;
      width: 18%;
      font-weight: 900;
    }
  }
</style>
