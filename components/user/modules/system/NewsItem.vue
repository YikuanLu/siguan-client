<script>
import DeleteBtn from '@/components/user/modules/components/DeleteBtn'
export default {
  components: {
    DeleteBtn
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    isShow: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    handelClick (id) {
      this.$emit('toggle', id)
    }
  },
  render () {
    const { data, handelClick, isShow } = this
    const content = (isShow) => {
      if (isShow) {
        return <div class="content">{data.content}</div>
      } else {
        return null
      }
    }
    return (
      <div class="item clearfix">
        <div class="fl">
          <div class="header">
            <IconFont class="titleIcon" style={{ color: data.isRead ? '#CBCBCB' : '#3399EE' }} type="iconyoujian" />
            <span class="title" on-click={() => { handelClick(data.id) }}>
              {data.name}
            </span>
            <span class="time fr">2019-09-03 17:22:14</span>
          </div>
          {content(isShow)}
        </div>
        <DeleteBtn id="" class="icon" />
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
.item {
  position: relative;
  width: 100%;
  position: relative;
  transition: height 0.3s;
  border: 1px solid #f5f5f5;
  border-bottom: none;
  padding: 20px 12px;
  .fl {
    width: 800px;
    .header {
      .titleIcon {
        font-size: 18px;
        vertical-align: middle;
        // color: #CBCBCB;
      }
      .title {
        cursor: pointer;
        display: inline-block;
        margin-left: 10px;
        font-size: 14px;
        color: #212121;
      }
      .time {
        font-size: 12px;
        color: #999999;
      }
    }
    .content {
      padding-left: 28px;
      margin-top: 14px;
      font-size: 14px;
      color: #666666;
      line-height: 1.4;
    }
  }
  .icon {
    position: absolute;
    right: 30px;
    top: 50%;
    margin-top: -9px;
  }
}
</style>
