<script>
import { mapState } from 'vuex'
import InfoCommentItem from './CommentItem'
import { informationApi } from '~/api'
export default {
  name: 'InfoComments',
  props: {
    comments: {
      type: Array,
      default: () => {
        return []
      }
    },
    loadMore: {
      type: Boolean,
      default: false
    },
    page: {
      type: Number,
      default: 1
    },
    finished: {
      type: Boolean,
      default: false
    },
    articleId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      demoImg: require('@/static/img/game-types/demo.png'),
      loadText: '查看更多评论',
      replyStatus: null,
      formData: {
        articleId: this.articleId,
        commentId: '',
        content: ''
      }
    }
  },
  computed: {
    ...mapState('user', {
      userInfo: state => state.userInfo
    }),
    isLogin () {
      return !!this.$store.state.Token
    },
    isLoadMore: {
      get () {
        return this.loadMore
      },
      set (val) {
        this.$emit('setLoadMore', val)
      }
    }
  },
  methods: {
    toLogin () {
      this.$UserModal().show('login')
    },
    commentSubmit () {
      if (!this.formData.content) { return }
      this.isSubmit = true
      this.$axios.post(informationApi.infoCommentAdd, this.formData).then((res) => {
        this.isSubmit = false
        if (res.code === 200) {
          this.$message.success(res.message)
          this.$bus.emit('reloadComment', true)
          this.formData.content = ''
        } else {
          this.$message.error(res.message)
        }
      })
    },
    loadMoreAction () {
      if (this.finished) { return }
      let page = this.page
      page++
      this.isLoadMore = true
      this.$emit('loadMore', page)
    },
    showReplyInput (val) {
      this.replyStatus = val
    },
    setValue (e) {
      this.formData.content = e.target.value
    }
  },
  render () {
    const {
      isLogin,
      userInfo,
      toLogin,
      commentSubmit,
      comments,
      loadMoreAction,
      isLoadMore,
      finished,
      loadText,
      replyStatus,
      showReplyInput,
      isSubmit,
      articleId,
      formData,
      setValue
    } = this

    function showAvatar () {
      if (userInfo && userInfo.headPic) {
        return <img class="comment-avatar" src={userInfo.headPic} alt=""/>
      } else {
        return <IconFont
          class="comment-avatar"
          type="iconyonghutouxiang"
        />
      }
    }
    function showBtn () {
      if (isLogin) {
        return <a-button class="submit-btn" loading={isSubmit} onClick={commentSubmit} type="primary">发表评论</a-button>
      } else {
        return <a-button class="submit-btn" onClick={toLogin} type="primary">登录</a-button>
      }
    }
    const commentInput = (
      <div class="comment-area">
        <p class="comment-title">{comments.length}条评论</p>
        <div class="input-box">
          <client-only>{showAvatar()}</client-only>
          <a-textarea value={formData.content} on-change={setValue} class="textarea" placeholder="请输入评论内容..." autosize={{ minRows: 4, maxRows: 4 }} maxlength="100" />
          <client-only>{showBtn()}</client-only>
        </div>
      </div>
    )

    const commentList = (
      <div class="comment-list">
        <p class="comment-title">最新评论</p>
        <ul>
          {
            comments.map((item) => {
              return (
                <InfoCommentItem
                  comments={comments}
                  articleId={articleId}
                  replyStatus={replyStatus}
                  on-showReply={showReplyInput}
                  class={{ replying: replyStatus === item.id }}
                  data={ item }
                />
              )
            })
          }
        </ul>
      </div>
    )
    function isFinished () {
      if (finished) {
        return `到底啦`
      } else {
        return loadText
      }
    }
    const loadMoreBtn = (
      <div class="loading-box">
        <a-button
          class="load-more"
          loading={isLoadMore}
          onClick={loadMoreAction}
          size="small">{isFinished()}</a-button>
      </div>
    )
    const dom = (
      <div>
        { commentInput }
        { commentList }
        { loadMoreBtn }
      </div>
    )
    return dom
  }
}
</script>
<style lang="less" scoped>
  .comment{
    &-title{
      font-size: 16px;
      color: #666666;
      padding-bottom: 19px;
    }
    &-avatar{
      width: 54px;
      height: 54px;
      border-radius: 50%;
      vertical-align: top;
      color: #dddddd;
      font-size: 54px;
      float: left;
      margin-right: 12px;
      margin-bottom: 20px;
    }
    &-area {
      background: #fff;
      padding: 30px 20px 20px;
      margin-top: 10px;
      border-bottom: solid 1px #f5f5f5;
      .input-box{
        position: relative;
      }
      .textarea{
        width: 784px;
        height: 100px;
        border: solid 1px #F5F5F5;
        font-size: 16px;
      }
      .submit-btn{
        position: absolute!important;
        right: 10px;
        bottom: 10px;
      }
    }
    &-list{
      overflow: hidden;
      border-bottom: solid 1px #f5f5f5;
      background: #fff;
      padding: 20px 20px 0 20px;
    }
  }
  .loading-box{
    padding: 16px 18px;
    background: #fff;
  }
  .load-more{
    height:42px;
    background:#F4F4F4;
    font-size: 14px;
    color: #999;
    text-align: center;
    line-height: 42px;
    cursor: pointer;
    display: block;
    width: 100%;
    cursor: pointer;
  }
</style>
