export default {
  name: 'DeleteBtn',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {}
  },
  methods: {
    confirm () {
      this.$emit('confirm', this.id)
    }
  },
  render () {
    const { confirm } = this
    return (
      <a-popconfirm placement="top" okText="确定" cancelText="取消" on-confirm={confirm}>
        <template slot="title">
          <p style={{ lineHeight: '1.4' }}>确认删除？</p>
        </template>
        <IconFont class="icon deleteIcon" type="iconcuowu" />
      </a-popconfirm>
    )
  }
}
