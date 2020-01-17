<script>
import { timeFormat } from '~/assets/js/publicFn'
import { informationApi } from '~/api'
export default {
  name: 'InfoCommentItem',
  props: {
    comments: {
      type: Array,
      default: () => {
        return []
      }
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    replyStatus: {
      type: String,
      default: ''
    },
    articleId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      demoImg: require('@/static/img/game-types/demo.png'),
      formData: {
        articleId: this.articleId,
        commentId: '',
        content: ''
      },
      isSubmit: false
    }
  },
  computed: {
    isReplying: {
      set (val) {
        this.$emit('showReply', val)
      },
      get () {
        return this.replyStatus
      }
    },
    replied () {
      const replyItem = this.comments.filter(_ => _.id === this.data.commentId)
      if (replyItem[0]) {
        return replyItem[0]
      } else {
        return '评论已删除'
      }
    }
  },
  methods: {
    commentSubmit () {
      this.isSubmit = true
      this.formData.commentId = this.isReplying
      this.$axios.post(informationApi.infoCommentAdd, this.formData).then((res) => {
        this.isSubmit = false
        if (res.code === 200) {
          this.$message.success(res.message)
          this.$bus.emit('reloadComment', true)
          this.isReplying = ''
        } else {
          this.$message.error(res.message)
        }
      })
    },
    reply (data) {
      this.isReplying === data.id ? this.isReplying = '' : this.isReplying = data.id
    },
    setValue (e) {
      this.formData.content = e.target.value
    }
  },
  render () {
    const { commentSubmit, reply, data, isSubmit, formData, setValue, replied } = this
    function showAvatar () {
      if (data && data.headPic) {
        return <img class="comment-avatar" src={data.headPic} alt=""/>
      } else {
        return <IconFont
          class="comment-avatar"
          type="iconyonghutouxiang"
        />
      }
    }
    const replyBox = (
      <div class="input-box">
        <a-textarea value={formData.content} on-change={setValue} class="textarea" placeholder="请输入评论内容..." autosize={{ minRows: 4, maxRows: 4 }} maxlength="100"/>
        <a-button class="submit-btn" loading={isSubmit} onClick={commentSubmit} type="primary">回复</a-button>
      </div>
    )

    const item = (
      <li class={{ 'comment-item': true }}>
        {showAvatar()}
        <div>
          <span class="username">{data.nickName || `匿名`}</span>
          <span class="time">{ timeFormat(data.createTime) }</span>
        </div>
        <div class="content">{data.content}</div>
        <a-button class="reply is-reply" onClick={reply.bind(this, data)}>回复</a-button>
        { replyBox }
      </li>
    )

    const replyItem = (
      <li class={{ 'comment-item': true }}>
        {showAvatar()}
        <div>
          <span class="username">{replied.nickName || `匿名`}</span>
          <span class="time">{ timeFormat(replied.createTime) }</span>
        </div>
        <div class="content">{replied.content}</div>
        <li class={{ 'comment-item': true }}>
          {showAvatar()}
          <div>
            <span class="username">{data.nickName || `匿名`}</span>
            <span class="time">{ timeFormat(data.createTime) }</span>
          </div>
          <div class="content">{data.content}</div>
        </li>
      </li>
    )

    if (data.commentId) { // 如果是被评论的
      return replyItem
    } else {
      return item
    }
  }
}
</script>
<style lang="less" scoped>
  .comment-item{
    margin-bottom: 30px;
    .input-box{
      display: none;
    }
    &.replying{
      .input-box{
        display: block;
      }
    }
    .comment-avatar{
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
  }
  .username{
    font-size: 16px;
    color: #333;
    padding-right: 11px;
  }
  .time{
    font-size: 12px;
    color: #999;
  }
  .content{
    font-size: 14px;
    color: #333;
    padding: 10px 0;
  }
  .reply{
    font-size: 12px;
    color: @primary-color;
    text-align: center;
    height:20px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(51,153,238,1);
    border-radius:10px;
    &.is-reply{
      color: #fff;
      background: @primary-color;
    }
  }
  .input-box{
    position: relative;
    padding: 10px 0 0 65px;
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
</style>
