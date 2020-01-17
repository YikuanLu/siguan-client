<script>
import { mapState, mapActions } from 'vuex'
import PublicHeader from '~/components/user/modules/components/PublicHeader'
import InfoConfigList from '~/components/user/modules/information/InfoConfigList'

import NickName from '~/components/user/modules/information/NickName'
import Mobile from '~/components/user/modules/information/mobile'
import Password from '~/components/user/modules/information/Password'
import BindEmail from '~/components/user/modules/information/BindEmail'

import { userApi } from '~/api'
import { replacePhone } from '~/assets/js/publicFn'
import { encryption } from '@/assets/js/secret'
export default {
  name: 'Information',
  components: {
    // 基础组件
    PublicHeader,
    InfoConfigList,
    // 基础信息组件
    NickName,
    Mobile,
    Password,
    // 绑定邮箱
    BindEmail
  },
  data () {
    return {
      baseInfo: {
        nickName: {
          label: '昵称',
          value: '--',
          showEdit: false,
          btnText: '修改',
          editBox: (
            <NickName
              {...{
                ref: 'nickName'
              }}
            />
          )
        },
        mobile: {
          label: '注册手机',
          value: '--',
          showEdit: false,
          btnText: '修改',
          editBox: (
            <Mobile
              {...{
                ref: 'mobile'
              }}
            />
          )
        },
        password: {
          label: '密码',
          value: '***********',
          showEdit: false,
          btnText: '修改',
          editBox: (
            <Password
              {...{
                ref: 'password'
              }}
            />
          )
        }
      },
      thirdParty: [
        {
          type: 'wechat',
          label: '微信账户',
          value: '张三',
          showEdit: false,
          btnText: '绑定'
        },
        {
          type: 'xinlang',
          label: '新浪账户',
          value: '张三',
          showEdit: false,
          btnText: '绑定'
        },
        {
          type: 'qq',
          label: 'QQ账户',
          value: '张三',
          showEdit: false,
          btnText: '绑定'
        },
        {
          type: 'email',
          label: '邮箱',
          value: '张三',
          showEdit: false,
          btnText: '绑定',
          editBox: (
            <BindEmail
              {...{
                ref: 'email'
              }}
            />
          )
        }
      ]
    }
  },
  computed: {
    ...mapState('user', {
      userInfo: state => state.userInfo,
      secret: state => state.secret
    })
  },
  watch: {
    'userInfo.nickName' (val) {
      this.baseInfo.nickName.value = val
    },
    'userInfo.phone' (val) {
      this.baseInfo.mobile.value = val
    }
  },
  mounted () {
    this.baseInfo.nickName.value = this.userInfo.nickName
    this.baseInfo.mobile.value = replacePhone(this.userInfo.phone)
  },
  methods: {
    ...mapActions('user', ['setUserInfo']),
    async baseInfoHandleBtn (type) {
      const showEdit = this.baseInfo[type].showEdit

      if (!showEdit && type !== 'mobile') {
        this.baseInfo[type].btnText = '保存'
        this.baseInfo[type].showEdit = true
        return
      }
      if (!showEdit && type === 'mobile') {
        this.baseInfo[type].btnText = '下一步'
        this.baseInfo[type].showEdit = true
        return
      }
      const data = await this.$refs[type].getData()
      switch (type) {
        case 'nickName':
          this.handleChangeNickName(data)
          break
        case 'mobile':
          this.handleResetPhone(data)
          break
        case 'password':
          this.handleChangePwd(data)
          break
        default:
          break
      }
    },
    // 修改用户名
    handleChangeNickName (data) {
      if (data.type === 'finish') {
        const url = userApi.changeNickName
        this.$axios.post(url, data.values).then((res) => {
          this.$message.success('修改成功')
          this.setUserInfo()
          this.baseInfo.nickName.showEdit = false
          this.baseInfo.nickName.btnText = '修改'
        })
      }
    },
    // 修改绑定手机
    handleResetPhone (data) {
      console.log(data)
      if (data.type === 'next') {
        this.baseInfo.mobile.btnText = '保存'
      }
      if (data.type === 'finsh') {
        this.baseInfo.mobile.btnText = '修改'
        this.baseInfo.mobile.showEdit = false
        this.setUserInfo()
      }
    },
    // 修改密码
    handleChangePwd (data) {
      console.log(data)
      const params = {
        password: encryption(
          data.password,
          this.secret.key,
          this.secret.iv
        ),
        newPwd: encryption(
          data.newPassword,
          this.secret.key,
          this.secret.iv
        )
      }
      const url = userApi.changePwd
      this.$axios.post(url, params).then((res) => {
        this.$message.success('修改成功')
        this.baseInfo.password.btnText = '修改'
        this.baseInfo.password.showEdit = false
      })
    },
    thirdPartyHandleBtn (index) {
      this.thirdParty[index].showEdit = true
    }
  },
  render () {
    const {
      baseInfo,
      baseInfoHandleBtn
      // thirdParty,
      // thirdPartyHandleBtn
    } = this
    return (
      <div class="information">
        <PublicHeader title="个人资料" />
        {/* 个人基础信息 */}
        <InfoConfigList
          title="个人基础信息"
          configData={baseInfo}
          on-handleBtn={(type) => {
            baseInfoHandleBtn(type)
          }}
        />
        {/* 三方账户关联 */}
        {/**
            <InfoConfigList
          title="三方账户关联"
          configData={thirdParty}
          on-handleBtn={(index) => {
            thirdPartyHandleBtn(index)
          }}
        />
           */}
      </div>
    )
  }
}
</script>
<style lang="less" scoped>
</style>
