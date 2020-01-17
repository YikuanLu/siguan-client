<script>
export default {
  name: 'InfoConfigList',
  props: {
    configData: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      default: '头部'
    }
  },
  methods: {
    handelBtn (type) {
      this.$emit('handleBtn', type)
    }
  },
  render () {
    const { title, configData, handelBtn } = this
    const keysList = Object.keys(configData)
    return (
      <div class="infoBox">
        <div class="title">{title}</div>
        <ul class="infoList">
          {keysList.map((item, index) => {
            const vm = configData[item].editBox
            return (
              <li class="item">
                <div class="showInfo clearfix">
                  <div class="fl">
                    <span class="label">{configData[item].label}:</span>
                    <span class="val">{configData[item].value}</span>
                  </div>
                  <a-button
                    ghost
                    type="primary"
                    class="fr"
                    size="small"
                    on-click={() => {
                      handelBtn(item)
                    }}
                  >
                    {configData[item].btnText}
                  </a-button>
                </div>
                <div
                  class="editBox"
                  style={{
                    display: configData[item].showEdit ? 'block' : 'none'
                  }}
                >
                  {vm}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
.infoBox {
  padding: 30px;
  border-bottom: 1px solid #f5f5f5;
  .title {
    color: #333333;
    font-size: 14px;
    margin-bottom: 40px;
  }
  ul.infoList {
    width: 490px;
    margin: 0 auto;
    li.item {
      margin-bottom: 24px;
      line-height: 26px;
      .fl {
        span {
          display: inline-block;
          line-height: 26px;
          font-size: 14px;
          letter-spacing: 2px;
        }
        .label {
          width: 80px;
          text-align: left;
          color: #999999;
        }
        .val {
          color: #333333;
        }
      }
      .editBox {
        width: 360px;
        margin-top: 10px;
      }
    }
  }
}
</style>
