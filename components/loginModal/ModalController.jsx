
import { mapActions } from 'vuex'
import Login from './modules/Login'
import Logup from './modules/Logup'
import Reset from './modules/Reset'
import BindUser from './modules/BindUser'
export default {
  name: 'ModalController',
  components: {
    Login,
    Logup,
    Reset,
    BindUser
  },
  props: {
    type: {
      type: String,
      default: 'login'
    }
  },
  mounted () {
    this.setSecret()
  },
  methods: {
    ...mapActions('user', [
      'setSecret'
    ])
  },
  render () {
    const { type } = this
    switch (type) {
      case 'login':
        return <Login />
      case 'logup':
        return <Logup />
      case 'reset':
        return <Reset />
      case 'bind':
        return <BindUser />
      default:
        return null
    }
  }
}
