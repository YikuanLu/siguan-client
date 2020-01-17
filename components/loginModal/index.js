import Controller from './ModalController.jsx'

/**
 * 登录注册弹窗组件入口
 * @params {string} 'login'登录 | 'logup'注册 | 'reset'忘记密码 | 'bind'绑定账号
 * @function show(params) 开启
 * @function hide() 关闭
 */
const UserModal = {}

function newiInstance (Vue, options, context) {
  let modalElement
  if (process.client) {
    modalElement = document.querySelector('.user-modal')
    console.log(modalElement)
    if (!modalElement) {
      modalElement = document.createElement('div')
      modalElement.setAttribute('type', 'user-modal')
      modalElement.setAttribute('class', 'userModal')
      document.body.appendChild(modalElement)
    }
  }
  const cdProps = Object.assign({ visible: false, type: '' }, options)
  // 这边的Vue实例为新建实例，属性要手动绑定
  const instance = new Vue({
    data () {
      return {
        ...cdProps
      }
    },
    router: context.$router,
    store: context.$store,
    $axios: context.$axios,
    methods: {
      handleClose () {
        const formState = context.$store.state.user.formClear === 1 ? 0 : 1
        context.$store.commit('user/SET_FORM_CLEAR', formState)
        update({ visible: false })
      }
    },
    render () {
      const { visible, type, handleClose } = this
      return (<a-modal
        onCancel={handleClose}
        visible={visible}
        footer={null}
        width={500}
      >
        <Controller type={type} />
      </a-modal>)
    }
  }).$mount(modalElement)

  const update = function (config) {
    const { visible, type } = { ...cdProps, ...config }
    // if (visible) {
    instance.$set(instance, 'visible', visible)
    // }
    if (type) {
      instance.$set(instance, 'type', type)
    }
  }

  return {
    instance,
    update
  }
}

const api = {
  show (options, app) {
    this.context = app
    this.instance.update({ type: options, visible: true })
  },
  hide () {
    this.instance.update({ visible: false })
  }
}

const install = (Vue, options) => {
  if (api.instance) {
    return
  }
  Vue.prototype.$UserModal = function () {
    if (!api.instance) {
      api.instance = newiInstance(Vue, options, this)
    }
    return api
  }
}
UserModal.install = install

export default UserModal
