<script>
import { publicApi } from '@/api'
export default {
  name: 'Avart',
  props: {
    avart: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loading: false,
      headPic: ''
    }
  },
  watch: {
    // avart (val) {
    //   console.log(val)
    //   this.headPic = val
    // }
  },
  mounted () {
    this.headPic = this.avart
  },
  methods: {
    beforeUpload (file) {
      const isType =
        file.type.includes('jpg') ||
        file.type.includes('jpeg') ||
        file.type.includes('png')
      if (!isType) {
        this.$message.error('请上传正确头像格式')
      }
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isLt5M) {
        this.$message.error('图片大小错误')
      }
      return isType && isLt5M
    },
    handleChange ({ file }) {
      if (file.status === 'uploading') {
        this.loading = true
        return
      }
      if (file.status === 'error') {
        this.$message.error('系统繁忙')
      }
      if (file.status === 'done') {
        const res = file.response
        if (res.code === 10005) {
          let msg = ''
          res.message === 'SystemError'
            ? msg = '系统繁忙！'
            : msg = res.message
          this.$message.error(msg)
          this.loading = false
          return
        }
        this.headPic = file.response.body.path
        this.loading = false
      }
    }
  },
  render () {
    const { handleChange, loading, headPic, beforeUpload } = this
    // console.log(this.$store.state.Token)
    return (
      <div class="avart clearfix">
        <div class="fl">
          <a-upload
            accept="JPG,PNG,GIF"
            name="file"
            showUploadList={false}
            action={publicApi.upload}
            on-change={handleChange}
            before-upload={beforeUpload}
            headers={
              { token: this.$store.state.Token }
            }
          >
            <a-button>
              <a-icon type={loading ? 'loading' : 'plus'} />
              选择图片
            </a-button>
            <p class="tip">只支持JPG,PNG,GIF,大小不超过5M</p>
          </a-upload>
        </div>
        <div class="fr">
          <div class="showAvart lg">
            <img src={headPic} alt="头像" />
          </div>
          <div class="showAvart sm">
            <img src={headPic} alt="头像" />
          </div>
          <div class="showAvart xs">
            <img src={headPic} alt="头像" />
          </div>
        </div>
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
.avart {
  .fl {
    width: 330px;
    height: 330px;
    background-color: #f5f5f5;
    text-align: center;
    padding-top: 145px;
    .tip {
      font-size: 12px;
      color: #999999;
      margin-top: 10px;
    }
  }
  .fr {
    width: 120px;
    height: 330px;
    background-color: #f5f5f5;
    text-align: center;
    padding: 8px 0;
    // display: flex;
    // flex-wrap: wrap;
    // justify-content: center;

    .showAvart {
      background-color: #fff;
      border-radius: 50%;
      border: 1px solid #999999;
      margin: 30px auto;
      img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
      }
    }
    .lg {
      width: 100px;
      height: 100px;
    }
    .sm {
      width: 50px;
      height: 50px;
    }
    .xs {
      width: 30px;
      height: 30px;
    }
  }
}
</style>
