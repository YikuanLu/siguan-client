<script>
/**
* 实时比分-详情-全网指数组件
* 用法
**/
import { matchTeamUrl } from '@/assets/js/config'
export default {
  name: 'MatchTeams',
  props: {
    teams: {
      type: Object,
      default: () => {}
    },
    type: {
      type: String,
      default: 'lol'
    }
  },
  data () {
    return {
      vsImg: require('@/static/img/common/vs.png'),
      infoData: this.teams,
      roles: {
        lol: ['', ''],
        dota: ['', ''],
        ow: ['', ''],
        csgo: ['', ''],
        kog: ['', '']
      }
    }
  },
  methods: {

  },
  render () {
    const { infoData, type } = this

    // 选择要显示的字段(后端的锅)
    function setView (name, parent, childName1, childName2) {
      if (infoData[parent]) {
        return infoData[parent][childName1] || infoData[parent][childName2]
      } else {
        return infoData[name]
      }
    }
    const team = (
      <div class="top-score">
        <div class="team-name left">
          <nuxt-link class="name"
            target="_blank"
            to={matchTeamUrl({ gameType: type, id: setView('team_a_id', 'team_a', 'teamId', 'team_id') })}>
            {setView('team_a_name', 'team_a', 'short_name', 'shortName')}
          </nuxt-link>
        </div>
        <img class="team-logo left" src={setView('team_a_logo', 'team_a', 'logo')} alt=""/>
        <img class="vs-img" src={this.vsImg} alt=""/>
        <img class="team-logo right" src={setView('team_b_logo', 'team_b', 'logo')} alt=""/>
        <div class="team-name right">
          <nuxt-link class="name"
            target="_blank"
            to={matchTeamUrl({ gameType: type, id: setView('team_b_id', 'team_b', 'teamId', 'team_id') })}>
            {setView('team_b_name', 'team_b', 'short_name', 'shortName')}
          </nuxt-link>
        </div>
      </div>
    )
    const dom = (
      <div class="match-table">
        {team}
      </div>
    )
    return dom
  }
}
</script>
<style scoped lang="less">
  .top-score{
    position: relative;
    text-align: center;
    padding: 30px 0 0;
    height: 120px;
    background: #fff;
    .team-role{
      width:26px;
      height:60px;
      font-size: 14px;
      color: #fff;
      font-weight: 600;
      line-height: 24px;
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
      max-width: 100%;
      height: 60px;
      position: absolute;
      &.left{
        left: 294px;
      }
      &.right{
        right: 294px;
      }
    }
    .team-name{
      position: absolute;
      top: 45px;
      cursor: pointer;
      &:hover{
        .name{
          color: @primary-color;
        }
      }
      &.left{
        text-align: left;
        right: 68%;
      }
      &.right{
        text-align: right;
        left: 68%;
      }
      .name{
        font-size: 20px;
        color: #333;
        font-weight: 600;
        line-height: 30px;
      }
    }
    .vs-img{
      width: 34px;
      height: 34px;
      position: absolute;
      top: 45px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
</style>
