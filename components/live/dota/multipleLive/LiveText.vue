<script>
/**
* 实时比分-详情-图文直播-文字组件
* 用法
*/
export default {
  name: 'DotaLivesText',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {

    }
  },
  computed: {

  },
  created () {

  },
  methods: {

  },
  render () {
    const { data } = this
    if (!data || !data.length) { return null }
    const list = (
      <ul class="text-list">
        {data.map((item) => {
          return (
            <div>
              <li>
                <span>{item.msg}</span>
              </li>
            </div>
          )
        })}
      </ul>
    )
    const dom = (
      <div class="live-box">
        {list}
      </div>
    )

    return dom
  }
}
</script>

<style lang="less" scoped>
  .live-box{
    margin: 20px;
    .text-list{
      background: #F7FBFF;
      height: 520px;
      overflow-y: auto;
      padding: 30px;
      li{
        font-size: 16px;
        color: #333;
        padding: 5px 0;
        .blue{
          font-size: 14px;
          color: #677EEA;
          font-style: normal;
        }
        .red{
          font-size: 14px;
          color: #F04844;
          font-style: normal;
        }
        .iconfont{
          color: #333;
          font-size: 18px;
          margin: 0 10px;
        }
      }
    }
  }
</style>
