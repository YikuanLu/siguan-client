<script>
export default {
  name: 'UploadVideo',
  data () {
    return {
      videoUrl: '',
      loading: false
    }
  },
  methods: {
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        console.log(info.file.originFileObj)
        this.loading = false
        // Get this url from response in real world.
      }
    },
    beforeUpload (file) {
      /* const isJPG = file.type === 'image/jpeg'
      if (!isJPG) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJPG && isLt2M */
    }
  },
  render () {
    const { beforeUpload, handleChange, videoUrl, loading } = this
    return (
      <div class="clearfix">
        <a-upload
          listType="picture-card"
          class="fl"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          beforeUpload={beforeUpload}
          on-change={handleChange}
        >
          {videoUrl ? (
            <video src={videoUrl}></video>
          ) : (
            <div>
              <a-icon type={loading ? 'loading' : 'plus'} />
            </div>
          )}
        </a-upload>
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
</style>
