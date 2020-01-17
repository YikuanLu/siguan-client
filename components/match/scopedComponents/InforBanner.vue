<script>
import { formatTime } from '~/assets/js/publicFn'
export default {
  name: 'InforBanner',
  props: {
    type: {
      type: String,
      default: 'league'
    },
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
    const {
      basicInfo,
      desc,
      type,
      showIntroduction,
      visible,
      handleCancel
    } = this

    // 显示状态
    const stateText = (state) => {
      if (type === 'league') {
        return state === 0
          ? '未开始'
          : state === 1
            ? '进行中'
            : state === 2
              ? '已结束'
              : '--'
      }
      return null
    }

    // 状态className
    const stateClassName =
      basicInfo.status === 0
        ? 'green'
        : basicInfo.status === 1
          ? 'red'
          : basicInfo.status === 2
            ? 'gray'
            : ''

    // 显示时间
    const timeBox = (
      <div class="time">
        <span>比赛时间：</span>
        {formatTime(basicInfo.startTime, 'Y/M/D')} 至 &nbsp;&nbsp;
        {formatTime(basicInfo.endTime, 'Y/M/D')}
      </div>
    )

    const dotaaTeamTimeBox = (
      <div class="time">
        <span>建立时间：</span>
        {basicInfo.buildTime
          ? formatTime(basicInfo.buildTime, 'Y/M/D')
          : '未知'}
        &nbsp;&nbsp; - &nbsp;&nbsp;
        {basicInfo.overTime ? formatTime(basicInfo.overTime, 'Y/M/D') : '至今'}
      </div>
    )

    const descKeysList = Object.keys(desc)
    return (
      <div class="InforBanner clearfix">
        <div class="fl matchLogo">
          <img src={basicInfo.logo} alt={basicInfo.name} />
        </div>
        <div class="matchContent fl">
          <div class="header clearfix">
            <span class="title">{basicInfo.name}</span>
            {/* 类名状态：state 0未开始:green |1进行中:red |  2已结束:gray */}
            <span class={`state ${stateClassName}`}>
              {stateText(basicInfo.status)}
            </span>
            {basicInfo.introduction ? (
              <a-button class="fr" on-click={showIntroduction}>
                查看简介
              </a-button>
            ) : null}
          </div>
          {type === 'league' ? timeBox : null}
          {// 展示dota战队成立和结束时间
            this.$route.params.gameType === 'dota' && type === 'team'
              ? dotaaTeamTimeBox
              : null}
          <ul class="descList clearfix">
            {descKeysList.map((item) => {
              return (
                <li class="item">
                  <span>{this.$t(`match.infor.${item}`)}：</span>
                  <span>{desc[item] ? desc[item] : '--'}</span>
                </li>
              )
            })}
          </ul>
        </div>

        <a-modal
          visible={visible}
          closable={true}
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
    overflow: hidden;
    position: relative;
    img {
      width: 100%;
      position: absolute;
      // height: 100%;
      top: 50%;
      transform: translateY(-50%);
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
  // padding-top: 20px;
  min-height: 300px;
  max-height: 400px !important;
  overflow-y: auto;
}
</style>
