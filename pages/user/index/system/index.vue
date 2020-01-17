<script>
import PublicHeader from '@/components/user/modules/components/PublicHeader' // 公共头部
import NewsItem from '@/components//user/modules/system/NewsItem'
export default {
  name: 'System',
  components: {
    PublicHeader,
    NewsItem
  },
  data () {
    return {
      list: [
        {
          name: '标题',
          id: '1',
          isRead: true,
          content:
            '欢迎您来到88比分网，主要为您提供各种游戏相关赛事服务，具体有赛事预告、直播、赛后分析、资讯、图集、视频等资讯网站，欢迎您加入我们的大家庭，一起进入属于我们的游戏世界。'
        },
        {
          name: '标题',
          id: '2',
          isRead: false,
          content:
            '欢迎您来到88比分网，主要为您提供各种游戏相关赛事服务，具体有赛事预告、直播、赛后分析、资讯、图集、视频等资讯网站，欢迎您加入我们的大家庭，一起进入属于我们的游戏世界。'
        },
        {
          name: '标题',
          id: '3',
          isRead: false,
          content:
            '欢迎您来到88比分网，主要为您提供各种游戏相关赛事服务，具体有赛事预告、直播、赛后分析、资讯、图集、视频等资讯网站，欢迎您加入我们的大家庭，一起进入属于我们的游戏世界。'
        }
      ],
      activeId: []
    }
  },
  methods: {
    toggle (id) {
      if (this.activeId.includes(id)) {
        this.activeId = []
        return
      }
      if (!this.activeId.includes(id)) {
        this.activeId = []
      }
      this.activeId.push(id)
    }
  },
  render () {
    const { toggle, activeId } = this
    return (
      <div class="system">
        <PublicHeader title="系统消息">
          <a href="javascript:;" class="readed fr">
            全部标记已读
          </a>
        </PublicHeader>
        <ul class="newsList">
          {this.list.map((item, index) => {
            const isShow = activeId.includes(item.id)
            return (
              <li>
                <NewsItem
                  data={item}
                  isShow={isShow}
                  on-toggle={(id) => {
                    toggle(id)
                  }}
                />
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
</script>
<style lang="less" scoped>
.system {
  .readed {
    display: inline-block;
    line-height: 26px;
    font-size: 14px;
  }
  .newsList {
    padding: 20px;
    li {
      &:last-child {
        border-bottom: 1px solid #f5f5f5;
      }
    }
  }
}
</style>
