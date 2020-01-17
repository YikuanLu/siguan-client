import { publicApi, userApi } from '@/api'

// 获取加密key
async function getSecret (url, context) {
  if (!process.client) {
    return
  }
  const data = await context.$axios.post(url)
  return data
}

// 获取用户信息
async function getUserInfo (url, context) {
  if (!process.client) {
    return
  }
  const data = await context.$axios.get(url)
  return data
}

const user = {
  namespaced: true,
  state: () => {
    return {
      formClear: 0, // 表单状态
      secret: {}, // 密码加密key
      userInfo: null, // 用户信息
      headPic: '',
      nickName: ''
    }
  },
  getters: {},
  mutations: {
    SET_FORM_CLEAR: (state, type) => {
      state.formClear = type
    },
    SET_SECRET: (state, type) => {
      state.secret = type
    },
    SET_USERINFO: (state, type) => {
      state.userInfo = type
    },
    SET_HEADPIC: (state, type) => {
      state.headPic = type
    },
    SET_NICKNAME: (state, type) => {
      state.nickName = type
    }
  },
  actions: {
    async setSecret ({ commit }) {
      if (!process.client) {
        return
      }
      const url = publicApi.getEncryptedString
      const data = await getSecret(url, this)
      commit('SET_SECRET', data)
    },
    async setUserInfo ({ commit }) {
      if (!process.client) {
        return
      }
      const url = userApi.getUser
      const data = await getUserInfo(url, this)
      commit('SET_USERINFO', data)
    }
  }
}

export default user
