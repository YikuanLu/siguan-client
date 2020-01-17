<script>
/**
* 面包屑导航组件
* 用法
* @nav  传入数组格式如下参考data里的demo
* import Breadcrum from '~/components/common/Breadcrum'
* components: { breadcrum }
* <breadcrum :nav="navData"></breadcrum>
*/
export default {
  name: 'Breadcrum',
  props: {
    nav: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {

    }
  },
  created () {

  },
  methods: {

  },
  render () {
    const { nav } = this
    if (!nav || !nav.length) {
      return null
    }
    const dom = (
      <div class="breadcrum-nav">
        {
          nav.map((v, i) => {
            if (!v.name) { return }
            return <nuxt-link key={v.name} to={v.path} class="item">
              {i > 0 && (
                <icon-font class="bread-iconfont" type="iconjinru"></icon-font>
              )}
              { v.name }
            </nuxt-link>
          })
        }
      </div>
    )
    return dom
  }
}
</script>

<style lang="less" scoped>
  .breadcrum-nav{
    height:50px;
    line-height: 50px;
    background:rgba(255,255,255,1);
    padding-left: 20px;
    .item{
      font-size:14px;
      color:rgba(153,153,153,1);
      .bread-iconfont{
        font-size: 12px;
        padding: 0 6px;
      }
      &:not(:last-child):hover{
        color: @primary-color;
      }
      &:last-child{
        color: #333;
        cursor: auto;
      }
    }
  }
</style>
