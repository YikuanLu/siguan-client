export default {
  name: 'SiderBox',
  components: {

  },
  props: {
    title: {
      type: String,
      default: '---'
    },
    moreLink: {
      type: String,
      default: '#'
    },
    hoverTitle: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      noJumpLink: [ '#', 'javascript:;', 'javascript:void(0);' ]
    }
  },
  render () {
    const { title, moreLink, noJumpLink, hoverTitle } = this

    // 隐藏模块
    if (title.includes('图集') || title.includes('视频')) {
      return null
    }

    const siderBoxTitle = (
      <div class="sider-title">
        <span class="title">{title}</span>
        {(moreLink && !noJumpLink.includes(moreLink)) && (
          <nuxt-link class="fr more" title={hoverTitle} to={moreLink} rel="nofollow">更多</nuxt-link>
        )}
      </div>
    )

    const siderModule = this.$slots.default

    return (
      <div class="sider-box">
        {siderBoxTitle}
        {siderModule}
      </div>
    )
  }
}
