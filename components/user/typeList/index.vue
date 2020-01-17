<script>
import { CUSTOMER_TYPE } from '@/assets/js/types'
export default {
  props: {
    curIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {}
  },
  computed: {
    path () {
      return this.$route.path
    }
  },
  mounted () {
    if (this.$route.name === 'user') {
      this.$router.push(`/user/${CUSTOMER_TYPE[0].link}`)
    }
  },
  methods: {
    changeType (current) {
      const url = `/user/${current.data.link}`
      this.$router.push(url)
    }
  },
  render () {
    const { changeType, path } = this
    const iconStyle = {
      fontSize: '20px',
      color: '#CBCBCB'
    }
    const curStyle = {
      fontSize: '20px',
      color: '#3399EE'
    }

    const list = CUSTOMER_TYPE.map((item, index) => {
      const current = {
        data: item,
        index
      }
      return (
        <li class={`item ${path.includes(item.link) ? 'active' : ''}`} onClick={() => changeType(current)}>
          <span class="icon">
            <IconFont style={path.includes(item.link) ? curStyle : iconStyle} type={item.icon} />
          </span>
          <span class="text">{item.name}</span>
        </li>
      )
    })

    return <ul class="typeList">{list}</ul>
  }
}
</script>
<style lang="less" scoped>
.typeList {
  width: 100%;
  .item {
    position: relative;
    width: 100%;
    text-align: center;
    cursor: pointer;
    padding: 20px 0;
    border-bottom: 1px solid #f5f5f5;
    &:last-child {
      border: none;
    }
    .text {
      display: inline-block;
      color: #212121;
      margin-left: 12px;
      font-size: 16px;
      line-height: 20px;
    }
  }
  .active {
    .text {
      color: @primary-color;
    }
    &::before {
      content: ' ';
      position: absolute;
      width: 4px;
      height: 100%;
      background-color: @primary-color;
      left: 0;
      top: 0;
    }
  }
}

</style>
