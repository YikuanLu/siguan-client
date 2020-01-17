<script>
export default {
  name: 'UploadPic',
  data () {
    return {
      fileList: [],
      previewVisible: false,
      previewImage: ''
    }
  },
  methods: {
    handleCancel () {
      this.previewVisible = false
    },
    handlePreview (file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleChange ({ fileList }) {
      this.fileList = fileList
    }
  },
  render () {
    const { fileList, handlePreview, handleChange, handleCancel, previewVisible, previewImage } = this
    return (
      <div class="clearfix">
        <a-upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          on-preview={handlePreview}
          on-change={handleChange}
        >
          {
            fileList.length < 6 ? <a-icon type="plus" /> : null
          }
        </a-upload>
        <a-modal visible={previewVisible} footer={null} on-cancel={handleCancel}>
          <img alt="example" style="width: 100%" src={previewImage} />
        </a-modal>
      </div>
    )
  }
}

</script>

<style>

</style>
