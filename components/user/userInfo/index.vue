<script>
import { mapActions } from 'vuex'
import Avart from '@/components/user/userInfo/Avart'
import { userApi } from '~/api/index'
export default {
  name: 'UserInfo',
  components: {
    Avart
  },
  props: {
    headPic: {
      type: String,
      default: null
    },
    nickName: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    ...mapActions('user', ['setUserInfo']),
    showModal () {
      this.visible = true
    },
    onCancel () {
      this.visible = false
    },
    onOk () {
      const url = userApi.changeHeadPic
      const headPic = this.$refs.avart.headPic
      this.$axios.post(url, { headPic }).then((res) => {
        console.log(res)
        this.setUserInfo()
        this.$message.success('修改成功')
      })
      this.visible = false
    }
  },
  render () {
    const { headPic, nickName, showModal, visible, onCancel, onOk } = this
    let element = ''
    if (headPic) {
      element = <img src={headPic} on-click={showModal} alt="" />
    } else {
      element = (
        <IconFont
          on-click={showModal}
          style={{
            color: '#dddddd',
            fontSize: '120px',
            backgroundColor: '#fff',
            borderRadius: '50%',
            cursor: 'pointer'
          }}
          type="iconyonghutouxiang"
        />
      )
    }

    return (
      <div class="userIfo">
        <div class="avart">{element}</div>
        <div class="nickName">{nickName}</div>
        <a-modal
          visible={visible}
          on-cancel={onCancel}
          on-ok={onOk}
          destroyOnClose={true}
          width={508}
        >
          <div
            class="header"
            style={{
              fontSize: '18px',
              fontWeight: '500',
              color: '#333333',
              marginBottom: '20px'
            }}
          >
            头像设置
          </div>
          <Avart {...{ ref: 'avart' }} avart={headPic} />
        </a-modal>
      </div>
    )
  }
}
</script>
<style lang="less" scoped>
.userIfo {
  width: 100%;
  height: 350px;
  background-image: url('../../../static/img/common/bg.jpg');
  background-size: 100% 100%;
  .avart,
  .nickName {
    width: 100%;
    text-align: center;
  }
  .avart {
    width: 100%;
    padding: 90px 0 30px;
    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      cursor: pointer;
    }
  }
  .nickName {
    text-align: center;
    font-size: 22px;
    color: #fff;
  }
  .header {
    font-size: 18px;
    font-weight: 500;
    color: #333333;
  }
}
</style>
