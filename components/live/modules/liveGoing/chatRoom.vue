<script>
/**
* 实时比分-实时聊天组件
* 用法
**/
export default {
  name: 'LiveChat',
  props: {

  },
  data () {
    return {
      demoImg: require('@/static/img/game-types/demo.png')
    }
  },
  methods: {

  },
  render () {
    const title = (
      <div class="title">
        <span class="text">聊天室</span>
        <span class="num">
          <icon-font class="iconfont" type="iconrenqun"></icon-font>
          463
        </span>
      </div>
    )
    const msgBox = (
      <div class="msg-box">
        <ul>
          {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item) => {
            return (
              <li class="item">
                <icon-font class="iconfont" type="icondiannao"></icon-font>
                <icon-font class="iconfont" type="iconshouji1"></icon-font>
                <span class="username">asd23323：</span>
                <span class="msg">爱仕达多多付付过或军</span>
              </li>
            )
          })}
        </ul>
      </div>
    )
    const inputBox = (
      <div class="input-box">
        <a-textarea placeholder="请输入消息" class="msg-input" maxlength="20"/>
        <a-button class="send-btn" type="primary">发送</a-button>
      </div>
    )
    const dom = (
      <div class="chatroom">
        {title}
        {msgBox}
        {inputBox}
      </div>
    )
    return dom
  }
}
</script>
<style scoped lang="less">
  .chatroom{
    float: left;
    width: 300px;
    height: 500px;
    background: #fff;
    .title{
      padding: 18px 10px 18px 24px;
      overflow: hidden;
      border-bottom: solid 1px #F5F5F5;
      .text{
        font-size: 16px;
        color: #333;
        position: relative;
        &:before{
          content: '';
          position: absolute;
          width:4px;
          height:20px;
          background: @primary-color;
          left: -14px;
          top: 1px;
        }
      }
      .num{
        float: right;
        font-size: 14px;
        color: #999;
      }
      .iconfont{
        font-size: 26px;
        color: #CBCBCB;
        vertical-align: middle;
      }
    }
    .msg-box{
      padding: 10px;
      height: 337px;
      overflow-y: auto;
      border-bottom: solid 1px #F5F5F5;
      .item{
        margin-bottom: 15px;
      }
      .iconfont{
        font-size: 18px;
        color: #CBCBCB;
        vertical-align: middle;
      }
      .username{
        font-size: 14px;
        color: @primary-color;
        padding-left: 6px;
      }
      .msg{
        font-size: 14px;
        color: #333;
      }
    }
    .input-box{
      position: relative;
      padding: 10px;
      .msg-input{
        resize: none;
        width:280px;
        height:80px;
        display: block;
        margin: auto;
        border:1px solid rgba(245,245,245,1);
      }
      .send-btn{
        font-size: 14px;
        position: absolute;
        bottom: 20px;
        right: 20px;
      }
    }
  }
</style>
