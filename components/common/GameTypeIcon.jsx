/**
 * 游戏类型
 */
export default {
  name: 'GameTypeIcon',
  props: {
    type: {
      type: String,
      required: true
    },
    extStyle: {
      type: Object,
      default: () => { return {} }
    }
  },
  render () {
    const { extStyle, type } = this
    let _style = ''
    if (extStyle !== '') {
      _style = extStyle
    }
    return <IconFont style={{ _style }} class={['type-icon', type]} type={`icon${type}`} />
  }
}
