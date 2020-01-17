<script>
import NoData from '~/components/common/Nodata'
export default {
  name: 'StatisticsExhibit',
  components: {
    NoData
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  methods: {},
  render () {
    const { data } = this
    const keysList = Object.keys(data)

    const noRender = [
      'id',
      'version',
      'syncTime',
      'teamId',
      'playerId',
      'playerAvatar',
      'playerNickName',
      'playerRealName',
      'createTime',
      'updatedTime',
      'createdTime'
    ]
    const listVm = keysList.map((item) => {
      if (noRender.includes(item)) {
        return
      }
      return (
        <div class="item fl">
          <p class="key">{this.$t(`match.StatisticsExhibit.${item}`)}</p>
          <p class="val">{data[item] ? data[item].toFixed(2) : '0'}</p>
        </div>
      )
    })

    const dataNone = (
      <div class="noData">
        <NoData />
      </div>
    )

    return (
      <div class="StatisticsExhibit clearfix">
        {keysList.length > 0 ? listVm : dataNone}
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
.StatisticsExhibit {
  width: 100%;
  padding: 30px;
  .item {
    width: 16.6%;
    height: 60px;
    text-align: center;
    margin-bottom: 40px;
    p {
      font-size: 14px;
    }
    p.key {
      color: #999999;
      margin-bottom: 20px;
      overflow: hidden; //超出的文本隐藏
      text-overflow: ellipsis; //溢出用省略号显示
      white-space: nowrap; //溢出不换行
    }
    p.val {
      color: #333333;
      overflow: hidden; //超出的文本隐藏
      text-overflow: ellipsis; //溢出用省略号显示
      white-space: nowrap; //溢出不换行
    }
  }
}
.noData {
  width: 100%;
  padding: 20px;
}
</style>
