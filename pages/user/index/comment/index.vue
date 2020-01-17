<script>
import PublicHeader from '@/components/user/modules/components/PublicHeader'
import DeleteBtn from '@/components/user/modules/components/DeleteBtn'
export default {
  name: 'Comment',
  components: {
    PublicHeader,
    DeleteBtn
  },
  data () {
    return {
      list: [{}, {}],
      defaultCurrent: 1,
      total: 30
    }
  },
  methods: {
    onShowSizeChange () {},
    change () {}
  },
  render () {
    const { list, onShowSizeChange, change, defaultCurrent, total } = this
    return (
      <div class="comment">
        <PublicHeader title="我的评论" />
        <ul class="list">
          {list.map((item, index) => {
            return (
              <li class="item">
                <div class="title">评论内容评论内容评论内容评论内容</div>
                <div class="info">
                  <span class="time">24分钟前评论文章：</span>
                  <span class="name">《文章标题标题标题标题》</span>
                </div>
                <DeleteBtn id="" />
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
.comment {
  .list {
    width: 100%;
    .item {
      position: relative;
      width: 100%;
      border-bottom: 1px solid #f5f5f5;
      padding: 20px 30px;
      .title {
        font-size: 14px;
        color: #333333;
      }
      .info {
        margin-top: 10px;
        span {
          font-size: 14px;
        }
        .time {
          color: #999999;
        }
        .name {
          color: #333333;
        }
      }
      .deleteIcon {
        position: absolute;
        right: 30px;
        top: 50%;
        margin-top: -9px;
      }
    }
  }
  .page {
    width: 100%;
    text-align: center;
    margin:20px 0;
  }
}
</style>
