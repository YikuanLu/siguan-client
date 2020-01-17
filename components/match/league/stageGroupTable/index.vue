<script>
import TabTable from '~/components/match/league/stageGroupTable/components/TabTable'
import NoData from '~/components/common/Nodata'
export default {
  name: 'StageGroupTable',
  components: {
    TabTable,
    NoData
  },
  props: {
    stageGroup: {
      type: Object,
      required: true
    },
    apiGroup: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      boardList: [],
      matchList: [],
      boardLoading: false,
      matchLoading: false
    }
  },
  watch: {
    stageGroup (val) {
      if (val.board_type_name_list && val.board_type_name_list.length > 0) {
        this.initBoard(val.board_type_name_list[0])
      }
      if (val.match_son_round_list && val.match_son_round_list.length > 0) {
        this.initMatch(val.match_son_round_list[0])
      }
    }
  },
  mounted () {
    if (this.stageGroup.board_type_name_list && this.stageGroup.board_type_name_list.length > 0) {
      this.initBoard(this.stageGroup.board_type_name_list[0])
    }
    if (this.stageGroup.match_son_round_list && this.stageGroup.match_son_round_list.length > 0) {
      this.initMatch(this.stageGroup.match_son_round_list[0])
    }
  },
  methods: {
    initBoard (type) {
      this.boardLoading = true
      const params = {
        leagueId: this.$route.params.id,
        stage: this.stageGroup.stage,
        typeName: type
      }
      return this.apiGroup.leagueBoardList(params).then((res) => {
        this.boardList = res
        this.boardLoading = false
      })
    },
    initMatch (type) {
      this.matchLoading = true
      const params = {
        leagueId: this.$route.params.id,
        roundName: this.stageGroup.stage,
        roundSonName: type
      }
      return this.apiGroup.leagueMatchList(params).then((res) => {
        this.matchList = res
        this.matchLoading = false
      })
    }
  },
  render () {
    const {
      stageGroup,
      boardList,
      matchList,
      initBoard,
      initMatch,
      boardLoading,
      matchLoading
    } = this
    const isShowBoard =
      stageGroup.board_type_name_list &&
      stageGroup.board_type_name_list.length > 0

    const isShowMatch =
      stageGroup.match_son_round_list &&
      stageGroup.match_son_round_list.length > 0

    const boardVm = (
      <div class={`board itemVm ${!isShowMatch ? 'widthFull' : ''}`}>
        <TabTable
          type="board"
          data={stageGroup.board_type_name_list}
          dataSource={boardList}
          loading={boardLoading}
          on-tabChange={(val) => {
            console.log(val)
            initBoard(stageGroup.board_type_name_list[val])
          }}
        />
      </div>
    )

    const matchVm = (
      <div class={`match itemVm ${!isShowBoard ? 'widthFull' : ''}`}>
        <TabTable
          type="match"
          title={stageGroup.name}
          data={stageGroup.match_son_round_list}
          dataSource={matchList}
          loading={matchLoading}
          on-tabChange={(val) => {
            console.log(val)
            initMatch(stageGroup.match_son_round_list[val])
          }}
        />
      </div>
    )

    const dataNone = (
      <div class="noData">
        <NoData />
      </div>
    )

    return (
      <div class="stageGroupTable">
        {isShowBoard ? boardVm : null}
        {isShowMatch ? matchVm : null}
        {!isShowBoard && !isShowMatch ? dataNone : null}
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
.stageGroupTable {
  padding: 0 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  .board {
    width: 40%;
  }
  .match {
    width: 60%;
  }
  .widthFull {
    width: 100% !important;
  }
  .noData {
    width: 100%;
    padding: 20px;
  }
}
</style>
