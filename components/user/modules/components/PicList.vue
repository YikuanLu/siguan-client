<script>
import DeleteBtn from '@/components/user/modules/components/DeleteBtn'
export default {
  name: 'PicList',
  props: {
    type: {
      type: String,
      default: 'img'
    }
  },
  data () {
    return {
      list: [
        { name: '王者荣耀高清壁纸王者荣耀' },
        { name: '王者荣耀高清壁纸王者荣耀2' },
        { name: '王者荣耀高清壁纸王者荣耀3' },
        { name: '王者荣耀高清壁纸王者荣耀4' }
      ]
    }
  },
  render () {
    const { list, type } = this
    return (
      <div class="picList clearfix">
        <div class="list">
          {list.map((item, index) => {
            return (
              <div class="item fl">
                <img
                  src="https://static.wanplus.com/data/event/banner/block/117435.png?v=0&imageView2/1/w/308/h/208"
                  alt=""
                />
                <div class="mask">
                  <div class="header">
                    <span>审核不通过</span>
                    <DeleteBtn id="" class="icon" />
                  </div>
                  <div class="body">
                    {/* 类型为图片展示右下角图片数量 */}
                    {type === 'img' ? <span class="count">6图</span> : null}
                  </div>
                </div>
                <div class="title">{item.name}</div>
                <div class="btnGroup">
                  <div
                    class="itemBtn fl"
                    style={{ borderRight: '1px solid #fff' }}
                  >
                    编辑
                  </div>
                  <div class="itemBtn fr">预览</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
.picList {
  padding: 15px 15px;
  .list {
    .item {
      position: relative;
      width: 270px;
      margin: 15px;
      img {
        width: 100%;
        height: 100%;
        height: 162px;
      }
      .mask {
        position: absolute;
        width: 100%;
        // height: 100%;
        z-index: 2;
        left: 0;
        top: 0;
        .header {
          position: relative;
          width: 100%;
          height: 40px;
          background-color: rgba(0, 0, 0, 0.3);
          text-align: center;
          color: #fff;
          line-height: 40px;
          font-size: 14px;
          .icon {
            position: absolute;
            right: 10px;
            top: 50%;
            margin-top: -9px;
          }
        }
        .body {
          position: relative;
          width: 100%;
          height: 122px;
          .count {
            position: absolute;
            background-color: @primary-color;
            z-index: 3;
            color: #fff;
            right: 10px;
            bottom: 10px;
            font-size: 12px;
            padding: 4px 12px;
          }
        }
      }
      .title {
        font-size: 14px;
        color: #212121;
        font-weight: 500;
        background-color: #f5f5f5;
        border-bottom: 1px solid #fff;
        text-align: center;
        padding: 12px 0;
      }
      .btnGroup {
        .itemBtn {
          cursor: pointer;
          background-color: #f5f5f5;
          width: 50%;
          text-align: center;
          font-size: 14px;
          color: #999999;
          padding: 12px 0;
          transition: background 0.3s;
          &:hover {
            background-color: #f7fbff;
          }
        }
      }
    }
  }
}
</style>
