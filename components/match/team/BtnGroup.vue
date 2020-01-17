<script>
import { liveUrl } from '@/assets/js/config'
export default {
  name: 'BtnGroup',
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    gameType () {
      return this.$route.params.gameType
    }
  },
  render () {
    const { data } = this
    const showBtn = (status) => {
      switch (status) {
        case 0:
          return (
            <a-button size="small">
              <nuxt-link
                target="_blank"
                to={liveUrl({
                  matchId: data.matchId || data.match_id,
                  tab: 3,
                  gameType: this.gameType
                })}
              >
                赛前分析
              </nuxt-link>
            </a-button>
          )
        case 1:
          return (
            <a-button
              size="small"
              type="primary"
            >
              <nuxt-link
                target="_blank"
                to={liveUrl({
                  matchId: data.matchId || data.match_id,
                  tab: 1,
                  gameType: this.gameType
                })}
              >
              直播中
              </nuxt-link>
            </a-button>
          )
        case 2:
          return (
            <a-button size="small">
              <nuxt-link
                target="_blank"
                to={liveUrl({
                  matchId: data.matchId || data.match_id,
                  tab: 4,
                  gameType: this.gameType
                })}
              >
                {this.gameType === 'ow' ? '赛前分析' : '赛后分析'}
              </nuxt-link>
            </a-button>
          )
        default:
          return null
      }
    }
    return (
      <div class="btnGroup">
        {showBtn(data.status)}
        <a-button size="small" style={{ marginLeft: '10px' }}>
          <nuxt-link
            target="_blank"
            to={liveUrl({
              matchId: data.matchId || data.match_id,
              tab: 2,
              gameType: this.gameType
            })}
          >
            全网指数
          </nuxt-link>
        </a-button>
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
</style>
