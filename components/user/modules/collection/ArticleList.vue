<script>
import { infoIconStyle } from '../scrop'
import DeleteBtn from '@/components/user/modules/components/DeleteBtn'
import { timeFormat } from '@/assets/js/publicFn'
import bPage from '@/components/user/modules/components/bPage.vue'
// import { userApi } from '@/api'
export default {
  name: 'ArticleList',
  components: {
    bPage
  },
  props: {
    listData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  methods: {
    remove (id) {
      console.log(id)
      /* const url = userApi.collect
      const params = {
        articleId: id
      }
      this.$axios.post(url, params).then() */
    }
  },
  render () {
    const { listData, remove } = this
    const itemVm = (data) => {
      return (
        <li class="item clearfix">
          <nuxt-link to="/">
            <img class="pic" src={data.coverPicUrl} alt="" />
          </nuxt-link>
          <div class="content fl">
            <div class="title">
              <nuxt-link to={`/news/details/${data.id}`}>
                {data.title}
              </nuxt-link>
            </div>
            <div class="info">
              <span>
                <GameTypeIcon type={data.gameType} />
              </span>
              <span class="type">
                <nuxt-link to={`/news?${data.category}`}>
                  {data.category_dictText}
                </nuxt-link>
              </span>
              <span class="time">{timeFormat(data.createTime)}</span>
              <span>
                <IconFont style={infoIconStyle} type="iconpinglun" />
              </span>
              <span class="comment">{data.commentCount}</span>
              <span>
                <IconFont style={infoIconStyle} type="iconyanjing" />
              </span>
              <span class="views">{data.clickTimes}</span>
            </div>
          </div>
          <div class="fr delete" title="删除" >
            <DeleteBtn on-confirm={(id) => { remove(id) }} id={data.id} />
          </div>
        </li>
      )
    }
    return (
      <div class="articleList">
        <ul>
          {listData.records.map((item) => {
            return itemVm(item)
          })}
        </ul>
        <bPage on-change={() => { this.$emit('change') }} />
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
@import url('../../style/public.less');
.articleList {
  .item {
    width: 100%;
    border-bottom: 1px solid #f5f5f5;
    padding: 20px 20px;
    .pic {
      float: left;
      width: 128px;
      height: 80px;
      margin-right: 20px;
    }
    .title {
      margin-bottom: 20px;
      margin-top: 10px;
      a {
        font-size: 16px;
        color: #333333;
      }
    }
    .delete {
      margin-top: 30px;
    }
    .info {
      span {
        display: inline-block !important;
        font-size: 14px;
        color: #999999;
      }
      span.type {
        font-size: 14px;
        margin-left: 10px;
        margin-right: 10px;
      }
      span.time {
        margin-right: 50px;
        font-size: 14px;
      }
      span.comment {
        margin-left: 10px;
        margin-right: 20px;
        font-size: 12px;
      }
      span.views {
        margin-left: 10px;
        margin-right: 20px;
        font-size: 12px;
      }
    }
  }
  .page {
    width: 100%;
    text-align: center;
    margin: 20px 0;
  }
}
</style>
