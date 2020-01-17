<script>
import TabTable from '~/components/match/league/stageGroupTable/components/TabTable'
import Nodata from '~/components/common/Nodata'

import MatchListTable from '~/components/match/league/stageGroupNoApi/MatchListTable'
import TeamsListTable from '~/components/match/league/stageGroupNoApi/TeamsListTable'

export default {
  name: 'StageGroupNoApi',
  components: {
    TabTable,
    Nodata,
    MatchListTable,
    TeamsListTable
  },
  props: {
    stageGroup: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      matchList: [],
      teamsList: []
    }
  },
  watch: {
    stageGroup (val) {
      this.matchList = val.matches
      this.teamsList = val.teams
    }
  },
  mounted () {
    this.matchList = this.stageGroup.matches
    this.teamsList = this.stageGroup.teams
  },
  render () {
    const { stageGroup, matchList, TeamsList } = this
    const isMatches = stageGroup.matches && stageGroup.matches.length > 0

    // const isTeams = stageGroup.teams && stageGroup.teams.length > 0
    const isTeams = false

    const matchesVm = <MatchListTable data={matchList} />

    const teamsVm = <TeamsListTable data={TeamsList} />

    const dataNone = (
      <div class="noData">
        <Nodata />
      </div>
    )

    return (
      <div class="stageGroupNoApi">
        {isMatches ? matchesVm : null}
        {isTeams ? teamsVm : null}
        {!isMatches && !isTeams ? dataNone : null}
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
.stageGroupNoApi {
  padding: 0 10px;
  padding-bottom: 20px;
  width: 100%;
  // display: flex;
  // justify-content: space-between;
  .widthFull {
    width: 100% !important;
  }
  .noData {
    width: 100%;
    padding: 20px;
  }
}
</style>
