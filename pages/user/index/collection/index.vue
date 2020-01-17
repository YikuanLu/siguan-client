<script>
import { mapState, mapActions } from 'vuex'
import TableVm from '@/components/user/modules/collection/TableVm'
import GameList from '@/components/user/modules/components/GameList'
import ArticleList from '@/components/user/modules/collection/ArticleList'
import { COLLECTION_TYPE } from '@/assets/js/types'
import { userApi } from '@/api'
export default {
  name: 'Collection',
  components: {
    TableVm,
    ArticleList,
    GameList
  },
  props: {},
  data () {
    return {
      currentIndex: 0,
      current: 1, // 当前页码
      pageSize: 10, // 展示条数
      size: 10,
      records: [],
      data: {} // 收藏文章列表
    }
  },
  computed: {
    ...mapState(['listData'])
  },
  mounted () {
    // this.changeTab(this.currentIndex)
  },
  methods: {
    ...mapActions(['getListData']),
    changeTab (data) {
      this.records = []
      this.currentIndex = data.index
      if (this.currentIndex === 0) {
        this.getGameList()
      }
      if (this.currentIndex === 1) {
        this.getArticleList()
      }
    },
    // 获取文章列表
    getArticleList () {
      const url = userApi.getCollectionArticleList
      this.getListData({ type: 'get', url })
    },
    // 获取游戏列表
    getGameList () {
      this.records = [{ id: 1 }, { id: 2 }]
    }
  },
  render () {
    const {
      currentIndex,
      changeTab,
      getArticleList,
      records,
      listData
    } = this
    // 头部
    const Header = (
      <ul class="tabList clearfix">
        {COLLECTION_TYPE.map((item, index) => {
          return (
            <li
              class={`item fl ${index === currentIndex ? 'active' : ''}`}
              on-click={() => {
                changeTab({ item, index })
              }}
            >
              {item.name}
            </li>
          )
        })}
      </ul>
    )

    // tab切换显示控制器
    const vmControler = () => {
      if (currentIndex === 0) {
        return <GameList gameList={records} />
      } else {
        return <articleList listData={listData} on-change={getArticleList} />
      }
    }

    return (
      <div class="collection">
        <div class="header">{Header}</div>
        <ListLoading />
        {vmControler()}
      </div>
    )
  }
}
</script>
<style lang="less" scoped>
.collection {
  .header {
    .tabList {
      border-bottom: 1px solid #f5f5f5;
      padding: 12px 20px;
      height: 63px;
      .item {
        position: relative;
        // height: 62px;
        // line-height: 62px;
        padding: 10px 8px;
        cursor: pointer;
        font-size: 16px;
        color: #333333;
        margin-right: 44px;
        border-radius: 4px;
        // &:first-child {
        //   border-left: none;
        // }
      }
      .active {
        background-color: @primary-color;
        color: #fff;
        // color: @primary-color;
        // border-left: 1px solid #f5f5f5;
        // border-right: 1px solid #f5f5f5;
        // &::before {
        //   content: ' ';
        //   width: 100%;
        //   height: 1px;
        //   position: absolute;
        //   background-color: #fff;
        //   left: 0;
        //   bottom: 0;
        //   margin-bottom: -1px;
        // }
      }
    }
  }
  .contentBox {
    padding: 0 20px;
    .gameList {
      border-bottom: 1px solid #f5f5f5;
      .item {
        margin-right: 68px;
        padding: 20px 0;
        font-size: 16px;
        color: #212121;
        cursor: pointer;
        .icon {
          display: inline-block;
        }
        .text {
          display: inline-block;
          margin-left: 10px;
        }
      }
      .active {
        border-bottom: 4px solid @primary-color;
      }
    }
  }
  .tableVm {
    padding: 20px;
  }
  .articleList {
    padding-top: 0;
  }
}

</style>
