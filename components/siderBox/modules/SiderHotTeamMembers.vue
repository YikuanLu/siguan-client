<template>
  <div class="sider-box">
    <nuxt-link
      v-for="(item, index) in hotData"
      :key="index"
      :to="`/match/${gameType}/player/${item.playerId}`"
      :title="item.nickName"
      class="sider-item"
    >
      <img class="avatar" :src="item.avatar" alt />
      <p class="name" v-text="item.nickName || item.name || item.nickname || '--'"></p>
      <p
        class="role"
      >{{ item.teamShortName|| item.teamName || '--' }} {{ rolePosition(item.position) }}</p>
    </nuxt-link>
  </div>
</template>
<script>
/**
 * 侧边热门队员组件
 * 用法
 * import SiderHotTeamMembers from '~/components/siderbox/SiderHotTeamMembers'
 * components: { SiderHotTeamMembers }
 * <sider-hot-team-members></sider-hot-team-members>
 */
export default {
  name: 'SiderHotTeamMembers',
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
  computed: {
    rolePosition () {
      return (val) => {
        if (!val) {
          return null
        }
        // dota是几号位显示的
        const valToNumber = +val
        if (isNaN(valToNumber)) {
          return `/ ${val}`
        } else {
          return `/ ${valToNumber}号位`
        }
      }
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.sider-box {
  background: #fff;
  padding: 15px 0;
  .sider-item {
    overflow: hidden;
    border: solid 1px #f5f5f5;
    width: 270px;
    height: 80px;
    margin: 0 auto 10px;
    display: block;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      border-color: @primary-color;
      .name {
        color: @primary-color;
      }
    }
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      float: left;
      margin: 15px 14px 15px 20px;
    }
    .name {
      font-size: 16px;
      color: #333;
      padding: 20px 0 10px;
      transition: all 0.3s;
    }
    .role {
      font-size: 14px;
      color: #333;
    }
  }
}
</style>
