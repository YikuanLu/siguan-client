<script>
/**
 * 近期赛事组件
 * 用法
 * @data 数组
 * import AllGames from '~/components/match/AllGames'
 * components: { AllGames }
 * <AllGames></AllGames>
 **/
import getDataByGameType from '~/api/getDataByGameType'
export default {
  name: 'AllGames',
  props: {
    gameType: {
      type: String,
      default: 'lol'
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      currentPage: 1,
      total: 0,
      currentLevel: 1,
      levelTypes: [],
      list: [],
      leagueParams: {
        pageSize: 20
      },
      isLoading: false
    }
  },
  methods: {
    onChange (page) {
      this.currentPage = page
      this.leagueParams.pageNum = page
      this.getList()
    },
    switchLevel (type) {
      if (type === this.currentLevel) {
        return
      }
      this.currentLevel = type
    },
    getList () {
      this.isLoading = true
      const apiGroup = getDataByGameType(this.gameType)(this.$axios)
      apiGroup.league.leagueList(this.leagueParams).then((res) => {
        this.$emit('changeList', res)
        this.isLoading = false
      })
    }
  },
  render () {
    Object.assign(this, {
      list: this.data.rows,
      currentPage: this.data.pageNum,
      total: this.data.total
    })
    const {
      list,
      levelTypes,
      currentPage,
      onChange,
      currentLevel,
      switchLevel,
      total,
      leagueParams,
      isLoading
    } = this

    const tab = (
      <div class="tabs">
        {levelTypes.map((item, index) => {
          return (
            <span
              class={{ item: true, active: currentLevel === item.id }}
              onClick={switchLevel.bind(this, item.id)}
            >
              {item.text}
            </span>
          )
        })}
      </div>
    )
    const content = (
      <a-spin spinning={isLoading}>
        <div class="title">全部联赛</div>
        <div class="content">
          {list.map((item, index) => {
            return (
              <div class="slide-item" title={item.name}>
                <nuxt-link
                  target="_blank"
                  to={`/match/${this.gameType}/league/${item.leagueId}`}
                >
                  <img src={item.logo} alt="" />
                  <p class="game-name">{item.name}</p>
                </nuxt-link>
              </div>
            )
          })}
        </div>
      </a-spin>
    )
    const pagination = (
      <a-pagination
        class="pagination"
        current={currentPage}
        onChange={onChange}
        pageSize={leagueParams.pageSize}
        total={total}
      />
    )

    const dom = (
      <div class="all-games">
        {tab}
        {content}
        {pagination}
      </div>
    )
    return dom
  }
}
</script>
<style scoped lang="less">
.title {
  font-size: 16px;
  color: #212121;
  padding: 20px 20px 0 20px;
}
.all-games {
  .tabs {
    border-bottom: solid 1px #f5f5f5;
    white-space: nowrap;
    font-size: 0;
    overflow-x: auto;
    .item {
      height: 50px;
      font-size: 16px;
      color: #333333;
      padding: 16px 35px;
      display: inline-block;
      cursor: pointer;
      background: #fff;
      position: relative;
      border-right: solid 1px #f5f5f5;
      &.active {
        border: solid 1px #c4e4ff;
        color: @primary-color;
        background: rgba(247, 251, 255, 1);
      }
    }
  }
  .content {
    overflow: hidden;
    padding: 20px;
  }
  .slide-item {
    float: left;
    width: 200px;
    height: 160px;
    margin: 0 16px 20px 0;
    border: solid 1px #f5f5f5;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
      .game-name {
        color: @primary-color;
      }
    }
    &:nth-child(4n) {
      margin-right: 0;
    }
    img {
      display: block;
      height: 100px;
      margin: 10px auto;
      max-width: 100%;
    }
    .game-name {
      color: rgba(153, 153, 153, 1);
      font-size: 14px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-top: solid 1px #f5f5f5;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      padding: 0 10px;
    }
  }
  .pagination {
    margin: 38px auto;
    text-align: center;
  }
}
</style>
