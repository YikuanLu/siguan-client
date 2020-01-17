
<script>
import SuperSlide from '~/components/common/SuperSlide'
import getDataByGameType from '~/api/getDataByGameType'
import MatchTableList from '~/components/match/scopedComponents/MatchTableList' // 列表类型数据展示组件
import TeamItem from '~/components/match/team/TeamItem'
import MatchItem from '~/components/match/league/MatchItem'
import TeamBattle from '~/components/match/scopedComponents/TeamBattle'

import { headerStyle, formmatTimeParams } from '~/assets/js/config'
import { formatTime } from '~/assets/js/publicFn'
export default {
  name: 'LeagueOw',
  components: {
    SuperSlide,
    MatchTableList,
    TeamItem,
    MatchItem,
    TeamBattle
  },
  data () {
    return {
      apiByGameType: {},
      weekLeagueList: [],
      teamList: [],
      gameType: 'ow',
      leagueId: '',
      colums: [
        {
          title: '时间',
          align: 'center',
          customHeaderCell: headerStyle,
          customRender: (text, record) => (
            <span>{formatTime(record.matchTime, formmatTimeParams)}</span>
          )
        },
        {
          title: '赛制',
          align: 'center',
          customHeaderCell: headerStyle,
          customRender: (text, record) => <span>BO{record.bo}</span>
        },
        {
          title: '战队vs战队',
          align: 'center',
          dataIndex: 'teamName',
          customRender: (text, record) => <TeamBattle record={record || {}} />,
          customHeaderCell: headerStyle,
          width: 400
        }
      ],
      listData: {},
      loading: false
    }
  },
  mounted () {
    this.apiByGameType = getDataByGameType(this.gameType)(this.$axios)
    this.leagueId = this.$route.params.id
    this.getListThisWeekByLeagueId()
    this.getMatchPageListByLeagueId()
    this.getTeamList()
  },
  methods: {
    getListThisWeekByLeagueId () {
      const params = {
        leagueId: this.leagueId
      }
      this.apiByGameType.league.listThisWeekByLeagueId(params).then((res) => {
        this.weekLeagueList = res
      })
    },
    getTeamList () {
      const params = {
        leagueId: this.leagueId
      }
      this.apiByGameType.league.teamList(params).then((res) => {
        this.teamList = res
      })
    },
    getMatchPageListByLeagueId (agument) {
      this.loading = true
      const params = Object.assign(
        {
          leagueId: this.leagueId
        },
        agument
      )
      this.apiByGameType.league
        .matchPageListByLeagueId(params)
        .then((res) => {
          this.listData = res
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  },
  render () {
    const {
      weekLeagueList,
      teamList,
      colums,
      listData,
      loading,
      getMatchPageListByLeagueId
    } = this
    return (
      <div class="leagueOw content">
        <div class="slideList">
          <SuperSlide
            title="本周赛程"
            data={weekLeagueList}
            options={{ vis: 3, scroll: 3 }}
            {...{
              scopedSlots: {
                default: (props) => {
                  return <MatchItem data={props.data} />
                }
              }
            }}
          ></SuperSlide>
        </div>

        <div class="slideList">
          <SuperSlide
            title="参赛战队"
            data={teamList}
            options={{ vis: 7, scroll: 7 }}
            {...{
              scopedSlots: {
                default: (props) => {
                  return <TeamItem data={props.data} gameType={this.gameType} />
                }
              }
            }}
          ></SuperSlide>
        </div>

        <div class="dataListBox">
          <div class="title">赛事进度</div>
          <MatchTableList
            colums={colums}
            on-changePage={(val) => {
              getMatchPageListByLeagueId(val)
            }}
            listData={listData}
            loading={loading}
          />
        </div>
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
@import url('../../../style/style.less');
.slideList {
  padding: 0 10px 26px;
  overflow: hidden;
}
.teamName {
  text-align: left;
  max-width: 150px;
  overflow: hidden; //超出的文本隐藏
  text-overflow: ellipsis; //溢出用省略号显示
  white-space: nowrap; //溢出不换行
  // text-align: left;
}
.noData {
  width: 100%;
  padding: 20px;
}
</style>
