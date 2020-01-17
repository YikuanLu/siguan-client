<script>
import RichEditor from '@/components/common/RichEditor' // 富文本编辑器
import UploadPic from '@/components/user/modules/pictures/UploadPic' // 上传图集
import UploadVideo from '@/components/user/modules/videoList/UploadVideo' // 上传视频
function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  name: 'EditPage',
  components: {
    RichEditor,
    UploadPic,
    UploadVideo
  },
  props: {
    type: {
      type: String,
      default: 'article'
    }
  },
  data () {
    return {
      value: '',
      form: this.$form.createForm(this),
      loading: false,
      imageUrl: ''
    }
  },
  methods: {
    textChange (val) {
      this.value = val
    },
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl
          this.loading = false
        })
      }
    },
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      if (!isJPG) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJPG && isLt2M
    },
    submit () {
      const val = this.form.getFieldsValue()
      console.log(val)
    }
  },
  render () {
    const {
      value,
      textChange,
      loading,
      imageUrl,
      beforeUpload,
      handleChange,
      type,
      submit
    } = this
    const { getFieldDecorator } = this.form

    const checkType = () => {
      switch (type) {
        case 'article':
          return (
            <a-form-item
              label="内容："
              // validate-status="error"
              // help="Should be combination of numbers & alphabets"
              labelCol={{ span: 2 }}
              wrapperCol={{ span: 22 }}
            >
              {getFieldDecorator('title')(
                <RichEditor val={value} on-input={val => textChange(val)} />
              )}
            </a-form-item>
          )
        case 'pictures':
          return (
            <a-form-item
              label="上传图集："
              labelCol={{ span: 2 }}
              wrapperCol={{ span: 22 }}
            >
              <UploadPic />
            </a-form-item>
          )
        case 'videoList':
          return (
            <a-form-item
              label="上传视频："
              labelCol={{ span: 2 }}
              wrapperCol={{ span: 22 }}
            >
              <UploadVideo />
            </a-form-item>
          )
        default:
          return null
      }
    }

    return (
      <a-form>
        <a-form-item
          label="标题："
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 22 }}
        >
          {getFieldDecorator('title')(<a-input placeholder="输入您的标题" />)}
        </a-form-item>

        <a-form-item
          label="概要："
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 22 }}
        >
          {getFieldDecorator('desc')(<a-input placeholder="输入您的概要" />)}
        </a-form-item>

        <a-form-item
          label="关键字："
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 22 }}
        >
          {getFieldDecorator('key')(<a-input placeholder="输入您的关键字" />)}
        </a-form-item>

        <div class="selectGroup clearfix">
          <a-form-item
            class="selectBox"
            label="类型："
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
          >
            {getFieldDecorator('type')(
              <a-select>
                <a-select-option value="1">Option 1</a-select-option>
                <a-select-option value="2">Option 2</a-select-option>
                <a-select-option value="3">Option 3</a-select-option>
              </a-select>
            )}
          </a-form-item>

          <a-form-item
            class="selectBox"
            label="游戏："
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
          >
            <a-select default-value="1">
              <a-select-option value="1">Option 1</a-select-option>
              <a-select-option value="2">Option 2</a-select-option>
              <a-select-option value="3">Option 3</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item
            class="selectBox"
            label="赛事名称："
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
          >
            <a-select default-value="1">
              <a-select-option value="1">Option 1</a-select-option>
              <a-select-option value="2">Option 2</a-select-option>
              <a-select-option value="3">Option 3</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item
            class="selectBox"
            label="对战时间："
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
          >
            <a-select default-value="1">
              <a-select-option value="1">Option 1</a-select-option>
              <a-select-option value="2">Option 2</a-select-option>
              <a-select-option value="3">Option 3</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item
            class="selectBox"
            label="对战战队："
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
          >
            <a-select default-value="1">
              <a-select-option value="1">Option 1</a-select-option>
              <a-select-option value="2">Option 2</a-select-option>
              <a-select-option value="3">Option 3</a-select-option>
            </a-select>
          </a-form-item>
        </div>

        <a-form-item label="封面图：" labelCol={{ span: 2 }} class="clearfix">
          <a-upload
            listType="picture-card"
            class="fl"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            on-change={handleChange}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" />
            ) : (
              <div>
                <a-icon type={loading ? 'loading' : 'plus'} />
              </div>
            )}
          </a-upload>
          <span class="fl" class="uploadTip">
            只支持JPG、PNG、GIF，大小不超过5M
          </span>
        </a-form-item>

        {checkType()}

        <a-form-item label="文章来源：" labelCol={{ span: 2 }}>
          <a-radio-group>
            <a-radio value="1">原创</a-radio>
            <a-radio value="4">
              <a-input placeholder="请输入来源" />
            </a-radio>
          </a-radio-group>
        </a-form-item>

        <a-form-item
          label="验证码："
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 8 }}
        >
          {getFieldDecorator('title')(<a-input placeholder="输入验证码" />)}
        </a-form-item>

        <div class="btnGroup">
          <a-button
            size="large"
            style={{ width: '300px', marginRight: '10px' }}
            type="primary"
            on-click={submit}
          >
            发表
          </a-button>
          <a-button size="large">预览</a-button>
        </div>
      </a-form>
    )
  }
}
</script>
<style lang="less" scoped>
.selectBox {
  width: 20%;
  padding-left: 1px;
  float: left;
}
.uploadTip {
  display: block;
  font-size: 12px;
  color: #999999;
  margin-top: 90px;
}
.btnGroup {
  padding-left: 74px;
}
img {
  max-width: 100%;
}
</style>
