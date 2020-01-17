<script>
import PublicHeader from '@/components/user/modules/components/PublicHeader'
import DeleteBtn from '@/components/user/modules/components/DeleteBtn'
export default {
  name: 'Article',
  components: {
    PublicHeader,
    DeleteBtn
  },
  props: {},
  data () {
    return {
      list: [{}, {}],
      defaultCurrent: 1,
      total: 30
    }
  },
  methods: {
    onShowSizeChange () {},
    change () {},
    toEdit () {
      this.$router.push('/user/article/edit')
    }
  },
  render () {
    const { list, onShowSizeChange, change, defaultCurrent, toEdit, total } = this
    return (
      <div class="article">
        <PublicHeader title="我的文章">
          <a-button class="fr" size="small" type="primary" ghost on-click={toEdit}>
            + 发文章
          </a-button>
        </PublicHeader>
        <ul class="list">
          {list.map((item, index) => {
            return (
              <li class="item clearfix">
                <div class="pic fl">
                  <img
                    src="https://static.wanplus.com/data/event/banner/block/117435.png?v=0&imageView2/1/w/308/h/208"
                    alt=""
                  />
                </div>
                <div class="content fl">
                  <div class="title">
                    <nuxt-link to={`/user/article/edit/asdvdsfsdf`}>标题标题标题</nuxt-link>
                  </div>
                  <div class="info">
                    <IconFont class="icon deleteIcon" type="iconpinglun" />
                    <span class="count">0</span>
                    <IconFont class="icon deleteIcon" type="iconyanjing" />
                    <span class="view">12</span>
                  </div>
                </div>
                <span class="btnGroup">
                  <IconFont class="icon" type="iconbianji" />
                  <DeleteBtn id="" />
                </span>
              </li>
            )
          })}
        </ul>
        <div class="page">
          <a-pagination showSizeChanger on-showSizeChange={onShowSizeChange} on-change={change} defaultCurrent={defaultCurrent} total={total} />
        </div>
      </div>
    )
  }
}
</script>
<style lang="less" scoped>
@import url('../style/index.less');
.article {
  .item {
    position: relative;
    padding: 20px;
    border-bottom: 1px solid #f5f5f5;
    .pic {
      width: 128px;
      height: 80px;
      margin-right: 20px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .content {
      .title {
        margin: 10px 0 20px;
        font-size: 16px;
        color: #333333;
      }
      .info {
        span {
          display: inline-block;
          font-size: 12px;
          color: #999999;
          line-height: 18px;
        }
        .count {
          margin: 0 20px 0 10px;
        }
        .view {
          margin-left: 4px;
        }
      }
    }
    .btnGroup {
      position: absolute;
      right: 30px;
      top: 50%;
      margin-top: -9px;
      .icon {
        margin-left: 10px;
      }
    }
  }
}
.icon {
  font-size: 18px;
  color: #C2C2C2;
  vertical-align: middle;
}
</style>
