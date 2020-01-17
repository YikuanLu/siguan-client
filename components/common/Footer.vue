<script>
/**
* 底部组件
* 用法
* import cFooter from '~/components/common/Footer'
* components: { cFooter }
* <c-footer></c-footer>
**/
import { FOOT_NAV, FOOT_FRIEND_LIST } from '@/assets/js/types'
import { publicApi } from '~/api'
export default {
  name: 'Footer',
  props: {
    footer: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      friendLinkList: FOOT_FRIEND_LIST,
      logo: require('@/static/img/common/logo-sm.png'),
      wxCode: require('@/static/img/common/wx-code.png')
    }
  },
  created () {
    // this.getFootData()
  },
  methods: {
    async getFootData () {
      const { result: friendLinkList } = await this.$axios.get(publicApi.friendLinkList)
      this.friendLinkList = friendLinkList
    }
  },
  render () {
    const { friendLinkList, logo, wxCode } = this

    const contactTitle = (
      <p class="title">
        <nuxt-link class="to-about" to="/about" target="_blank">关于我们</nuxt-link>
        <span class="description">尚牛电竞旗下</span>
      </p>
    )
    const contact = (
      <div class="contact">
        <span class="item">
          <img class="icon" src={logo} alt=""/>
          <a rel="nofollow" href="https://weibo.com/shangniu88" target="_blank" class="text">尚牛电竞微博</a>
        </span>
        <span class="item">
          <img class="icon" src={logo} alt=""/>
          <a rel="nofollow" href="https://www.zhihu.com/org/shang-niu-dian-jing-97/activities" target="_blank" class="text">尚牛电竞知乎</a>
        </span>
      </div>
    )
    const footNav = (
      <div class="foot-nav">
        {FOOT_NAV.map((v, i) => {
          return (
            <ul class="col">
              {v.map((item, index) => {
                return (
                  <li>
                    <nuxt-link to={item.path ? item.path : '#'} class="link">{item.name}</nuxt-link>
                  </li>
                )
              })}
            </ul>
          )
        })}
      </div>
    )
    const friendTitle = (
      <p class="title">
        <span>友情链接</span>
        <span class="description">友链申请QQ：473508862</span>
      </p>
    )
    const friendLink = (
      <div class="friend-list">
        {friendLinkList.map((v, i) => {
          return (
            <span class="item">
              <a rel={v.rel ? '' : 'nofollow'} href={v.url} target="_blank" class="text">{v.name}</a>
            </span>
          )
        })}
      </div>
    )
    const footCode = (
      <div class="foot-codes">
        <div class="foot-code">
          <p class="text">尚牛电竞公众号</p>
          <img src={wxCode} alt=""/>
        </div>
        <div class="foot-code">
          <p class="text">尚牛电竞APP</p>
          <img src={wxCode} alt=""/>
        </div>
      </div>
    )
    const footMail = (
      <div class="foot-email">
        <p class="key">合作邮箱：473508862@qq.com</p>
      </div>
    )
    const coorp = (
      // 国内服务器用的文字
      <div class="wrap-box">
        <p class="text">闽ICP备19022212号-1 | Copyright © 2019 Shangniu.All Rights Reserved. | 厦门思冠科技有限公司 </p>
        <p class="text">声明：本网站为非盈利站点，数据仅供电竞爱好者浏览使用，禁止非法滥用。网站登载广告均为客户表达方式和本站无关，内容如有违反国家法律规定的，网站有权随时予以删除</p>
      </div>
      // 香港服务器用的文字
      // <div class="wrap-box HK">
      //   <p class="text">Copyright © 2019 Shangniu.All Rights Reserved.</p>
      //   <p class="text">声明：本网站数据仅供电竞爱好者浏览使用，禁止非法滥用。网站登载广告均为客户表达方式和本站无关，内容如有违反国家法律规定的，网站有权随时予以删除</p>
      // </div>
    )
    // 首页才展示友情链接，奇葩需求
    const showFriendLink = () => {
      if (this.$route.path === '/') {
        return (
          <div class="friend-box">
            {friendTitle}
            {friendLink}
          </div>
        )
      } else {
        return (
          <div></div>
        )
      }
    }
    const dom = (
      <footer class="footer">
        <div class="wrap-box">
          <div class="foot-top">
            <div class="foot-top-left">
              {contactTitle}
              {contact}
              {footNav}
            </div>
            <div class="foot-top-right">
              {footCode}
              {footMail}
            </div>
          </div>
        </div>
        <div class="foot-btm">
          {coorp}
        </div>
        <div class="wrap-box">
          {showFriendLink()}
        </div>
      </footer>
    )
    return dom
  }
}
</script>

<style lang="less" scoped>
.footer{
  min-width: 1200px;
  background: #fff;
  .wrap-box{
    position: relative;
    width: 1200px;
    margin: auto;
  }
  .foot-top{
    padding: 30px 0;
  }
  .friend-box{
    padding: 20px 0;
    .title{
      padding: 0;
    }
  }
  .title{
    color: #555;
    font-size: 16px;
    padding-bottom:20px;
    .to-about{
      color: #333;
      &:hover{
        color: @primary-color;
      }
    }
    .description{
      font-size: 14px;
      padding-left: 11px;
    }
  }
  .foot-top-left{
    .contact{
      .item{
        padding-right: 19px;
        position: relative;
        &:hover{
          .wx-code{
            display: block;
          }
        }
      }
      .icon{
        width: 21px;
        height: 18px;
      }
      .text{
        font-size: 14px;
        color: #999;
        &:hover{
          color: @primary-color;
        }
      }
      .wx-code{
        position: absolute;
        width: 140px;
        height: 140px;
        top: -140px;
        left: 50%;
        margin-left: -70px;
        z-index: 2;
        box-shadow: 0 0 6px 2px #EBEBEB;
        padding: 10px;
        background: #fff;
        display: none;
      }
    }
    .foot-nav{
      margin-top: 30px;
      .col{
        display: inline-block;
        margin-right: 70px;
      }
      li{
        font-size: 14px;
        display: block;
        margin-bottom: 14px;
        .link{
          color: #999;
        }
        &:hover{
          .link{
            color: @primary-color;
          }
        }
        &:first-child{
          .link{
            color: #555;
            font-size: 16px;
            cursor: auto;
          }
        }
      }

    }
  }
  .foot-top-right{
    position: absolute;
    right: 0;
    top: 31px;
    border-left: solid 1px rgba(245,245,245,1);
    padding-left: 31px;
    .foot-code{
      display: inline-block;
      margin-right: 70px;
      .text{
        font-size: 16px;
        color: #555;
        padding-top: 8px;
      }
      img{
        width: 101px;
        height: 101px;
        display: block;
        margin: 25px auto 35px;
      }
    }
    .foot-email{
      width: 392px;
      background:rgba(245,245,245,1);
      padding: 0 20px;
      line-height: 1;
      .key{
        font-size: 16px;
        color:rgba(85,85,85,1);
        padding: 11px 0;
      }
      .value{
        font-size: 14px;
        color:rgba(153,153,153,1)
      }
    }
  }
  .foot-btm{
    border-top: 1px solid rgba(245,245,245,1);
    border-bottom: 1px solid rgba(245,245,245,1);
    min-width: 1200px;
    margin: auto;
    padding: 20px 0;
    .text{
      line-height: 24px;
      text-align: center;
      font-size:12px;
      color:rgba(153,153,153,1);
    }
  }
}
.friend-list{
  margin: 6px auto;
  .item{
    padding-right: 19px;
    position: relative;
    width: 10%;
    display: inline-block;
  }
  .text{
    font-size: 14px;
    color: #999;
    &:hover{
      color: @primary-color;
    }
  }
}
</style>
