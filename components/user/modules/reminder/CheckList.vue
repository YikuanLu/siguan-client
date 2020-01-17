<script>
export default {
  name: 'CheckList',
  data () {
    return {
      plainOptions: [
        {
          label: '短信提醒',
          value: '1'
        },
        {
          label: '邮箱提醒',
          value: '2'
        },
        {
          label: '消息提醒',
          value: '3'
        },
        {
          label: '微信推送',
          value: '4'
        }
      ],
      checkedList: [],
      indeterminate: true
      // plainOptions
    }
  },
  methods: {
    handleClose () {
      this.$emit('close')
    },
    onChange (checkedList) {
      console.log(checkedList)
    }
  },
  render () {
    const { onChange, plainOptions, checkedList, handleClose } = this
    return (
      <div>
        <a-checkbox-group
          class="checkoutBox"
          defaultValue={checkedList}
          on-change={onChange}
        >
          {plainOptions.map((item) => {
            return (
              <div class="item">
                <a-checkbox defaultChecked={true} value={item.value}>
                  {item.label}
                </a-checkbox>
              </div>
            )
          })}
        </a-checkbox-group>
        <div class="btnBox">
          <a-button type="primary" onClick={handleClose}>
            提交
          </a-button>
        </div>
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
.checkoutBox {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  .item {
    width: 50%;
    margin: 10px 0;
  }
}
.checkoutBox /deep/ .ant-checkbox-group {
  width: 100%;
}
.btnBox {
  width: 100%;
  padding-left: 104px;
  padding-top: 20px;
}
</style>
