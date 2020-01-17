<script>
export default {
  name: 'PlayerInfor',
  props: {
    basicInfo: {
      type: Object,
      default: () => {}
    },
    desc: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    showIntroduction () {
      this.visible = true
    },
    handleCancel () {
      this.visible = false
    }
  },
  render () {
    const { basicInfo, showIntroduction, visible, handleCancel, desc } = this

    const descKeysList = Object.keys(desc)

    const isShowBtn = (content) => {
      if (content) {
        return (
          <a-button class="fr" on-click={showIntroduction}>
              查看简介
          </a-button>
        )
      } else {
        return null
      }
    }

    return (
      <div class="InforBanner clearfix">
        <div class="fl matchLogo">
          <img src={basicInfo.avatar} alt={basicInfo.name} />
        </div>
        <div class="matchContent fl">
          <div class="header clearfix">
            <span class="title">{basicInfo.nickName || basicInfo.name || basicInfo.nickname}</span>
            {isShowBtn(basicInfo.introduction)}
          </div>

          <ul class="descList clearfix">
            {descKeysList.map((item) => {
              return (
                <li class="item">
                  <span>{this.$t(`match.playerInfor.${item}`)}：</span>
                  <span>{basicInfo[item] ? basicInfo[item] : '--'}</span>
                </li>
              )
            })}
          </ul>
        </div>

        <a-modal
          visible={visible}
          closable={false}
          footer={null}
          on-cancel={handleCancel}
        >
          <div
            class="introduction"
            domPropsInnerHTML={basicInfo.introduction}
          ></div>
        </a-modal>
      </div>
    )
  }
}
</script>
<style lang="less" scoped>
.InforBanner {
  width: 100%;
  padding: 34px 20px;
  background-color: #fff;
  .matchLogo {
    width: 120px;
    height: 120px;
    margin-right: 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .matchContent {
    width: 710px;
    .header {
      margin-bottom: 20px;
      span {
        display: inline-block;
        line-height: 24px;
      }
      span.title {
        margin-right: 10px;
        font-size: 20px;
        color: #212121;
        font-weight: 500;
        vertical-align: middle;
      }
      span.state {
        padding: 0 8px;
        border-radius: 50px;
        font-size: 12px;
        color: #fff;
      }
      span.red {
        background-color: #f9444b;
      }
      span.green {
        background-color: #40b268;
      }
      span.gray {
        background-color: #95a3b1;
      }
    }
    .time {
      font-size: 14px;
      color: #999999;
      margin-bottom: 20px;
    }
    .descList {
      .item {
        float: left;
        // width: 25%;
        padding-right: 20px;
        margin-bottom: 20px;
        span {
          font-size: 14px;
          color: #666666;
          display: inline-block;
          // max-width: 50%;
          // overflow: hidden;
          // text-overflow: ellipsis;
          // white-space: nowrap;
        }
      }
    }
  }
}

.introduction {
  padding-top: 20px;
  max-height: 400px !important;
  overflow-y: auto;
}
</style>
