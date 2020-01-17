<script>
/**
* 资讯详情-分享tab组件
*/
import { SHARE_CONFIGS } from '@/assets/js/types'
export default {
  name: 'ShareTabs',
  props: {

  },
  data () {
    return {
      cur: 'comment',
      shareConfigs: []
    }
  },
  computed: {

  },
  created () {

  },
  methods: {
    switchTab (i) {
      this.cur = i
      this.$emit('switchTab', i)
    }
  },
  render () {
    const { cur, switchTab } = this

    const dom = (
      <div class="game-types-tab">
        {SHARE_CONFIGS.map((item) => {
          return <div
            key={item.type}
            class={{ item: true, actived: cur === item.type }}
            onClick={switchTab.bind(this, item.type)}>
            <icon-font class={['img-icon']} type={item.icon}></icon-font>
            <span class="text">{item.name}</span>
          </div>
        })}
      </div>
    )

    return dom
  }
}
</script>

<style lang="less" scoped>
  .game-types-tab{
    background: #fff;
    .item{
      cursor: pointer;
      padding: 20px 0;
      border-bottom: solid 1px rgba(245,245,245,1);
      text-align: center;
      .img-icon{
        width: 34px;
        height: 34px;
        display: inline-block;
        vertical-align: middle;
        font-size: 34px;
        color: rgb(201,201,201);
      }
      .text{
        font-size: 12px;
        color: #212121;
        display: block;
        padding-top: 11px;
        white-space: nowrap;
      }
      &.actived{
        background: @primary-color;
        .img-icon{
          color: #fff;
        }
        .text{
          color: #fff;
        }
      }
    }
  }
</style>
