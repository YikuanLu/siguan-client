<script>
import { matchTeamUrl } from '@/assets/js/config'
export default {
  name: 'TeamItem',
  props: {
    gameType: {
      type: String,
      default: 'lol'
    },
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    toTeamDetail (id) {
      this.$router.push(matchTeamUrl({ id, gameType: this.gameType }))
    }
  },
  render () {
    const { data } = this
    return (
      <div class="item">
        <nuxt-link
          to={matchTeamUrl({ id: data.teamId, gameType: this.gameType })}
        >
          <div class="logoBox">
            <img src={data.logo} alt="" />
          </div>
          <p class="name">{data.shortName || data.name}</p>
        </nuxt-link>
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
.item {
  padding: 20px;
  width: 104px;
  height: 115px;
  margin: 0 10px;
  cursor: pointer;
  vertical-align: middle;
  border: 2px solid #f5f5f5;
  .logoBox {
    margin: 0 auto;
    width: 36px;
    height: 30px;
    overflow: hidden;
    display: flex;
    align-items: center;
    img {
      width: 100%;
    }
  }
  p.name {
    text-align: center;
    font-size: 14px;
    color: #333333;
    margin-top: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
