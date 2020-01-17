<script>
export default {
  name: 'TableLink',
  props: {
    url: {
      type: String,
      default: '/'
    },
    logo: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    align: {
      type: String,
      default: 'flex-start'
    },
    maxWidth: {
      type: String,
      default: '70'
    }
  },
  render () {
    const { logo, name, align, maxWidth } = this
    return (
      <div class="tableImgBox" style={{ justifyContent: align }} >
        <nuxt-link class="content" to={this.url} target="_blank" title={name}>
          {logo && (
            <span>
              <img
                class="tableIcon"
                style={{
                  width: '16px'
                }}
                src={logo}
              />
            </span>
          )}
          <span class="name" sttle={{ maxWidth }}>
            {name}
          </span>
        </nuxt-link>
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
.tableImgBox {
  text-align: left;
  .content {
    display: flex;
    img {
      min-width: 16px;
    }
    .name {
      transition: color 0.2s;
      display: inline-block;
      color: #212121;
      overflow: hidden; //超出的文本隐藏
      text-overflow: ellipsis; //溢出用省略号显示
      white-space: nowrap; //溢出不换行
    }
  }
  a {
    display: inline-block;
    width: auto;
    &:hover {
      span.name {
        color: @primary-color;
      }
    }
  }
}
</style>
