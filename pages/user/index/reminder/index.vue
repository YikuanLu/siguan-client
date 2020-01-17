<script>
import CheckList from '@/components/user/modules/reminder/CheckList'
import GameList from '@/components/user/modules/components/GameList'
import PublicHeader from '@/components/user/modules/components/PublicHeader' // 公共头部
export default {
  name: 'Reminder',
  components: {
    GameList,
    CheckList,
    PublicHeader
  },
  props: {},
  data () {
    return {
      modal: '',
      records: []
    }
  },
  methods: {
    showModal () {
      this.modal = this.$info({
        class: 'my-modal',
        title: '提醒设置',
        content: h => <CheckList on-close={this.close} />,
        iconType: 'none',
        maskClosable: true
      })
    },
    close () {
      this.modal.destroy()
    }
  },
  render () {
    const { showModal, records } = this
    return (
      <div class="reminder">
        <PublicHeader title="赛事提醒">
          <a-button class="fr" type="primary" size="small" ghost on-click={showModal}>
            设置
          </a-button>
        </PublicHeader>
        <GameList gameList={records} />
      </div>
    )
  }
}
</script>
<style lang="less" scoped>
.header {
  padding: 20px;
  border-bottom: 1px solid #f5f5f5;
}
</style>
