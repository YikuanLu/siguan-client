import Vue from 'vue'
import Vuex from 'vuex'
const cookieparser = process.server ? require('cookieparser') : undefined
// import ApiUrl from '@/api' // 接口路径

Vue.use(Vuex)

export const state = () => {
  return {
    locales: ['en', 'cn'],
    locale: 'en',
    Token: null,
    loading: false,
    listData: {
      current: 1, // 当前页码
      pageSize: 10, // 展示条数
      total: 0,
      records: []
    },
    matchStatus: [] // 比赛列表的关注 / 提醒状态
  }
}

export const mutations = {
  SET_TOKEN (state, data) {
    state.Token = data
  },
  SET_LIST_DATA (state, data) {
    state.listData = data
  },
  SET_LOADING (state, data) {
    state.loading = data
  },
  // 初始化列表分页数据
  RESET_LISTDATA (state) {
    state.listData = {
      current: 1, // 当前页码
      pageSize: 10, // 展示条数
      total: 0,
      records: []
    }
  },
  // 更新每页条数
  SET_PAGESIZE (state, data) {
    state.listData.pageSize = data
  },
  // 更新当前页码
  SET_CURRENT (state, data) {
    state.listData.current = data
  },
  SET_LANG (state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale
    }
  },
  // 更新比赛关注/提醒状态数据
  SET_MATCH_STATUS (state, data) {
    state.matchStatus = data
  }
}

export const actions = {
  // 服务端的会话状态树，用于与客户端通信，比如获取session或cookie
  async nuxtServerInit ({ commit }, { req, app }) {
    app.store.commit('SET_LOADING', false)
    let Token = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        Token = JSON.parse(parsed.Token)
      } catch (err) {
        // 找不到有效的Cookie
      }
    }
    await commit('SET_TOKEN', Token)
  },
  // 统一请求列表方法
  async getListData ({ commit, state }, { type, url, params }) {
    commit('SET_LOADING', true)
    const pageSize = state.listData.pageSize ? state.listData.pageSize : state.listData.size
    const { current } = { ...state.listData }
    const apiParams = params || {}
    const _params = Object.assign({ current, pageSize }, apiParams)
    let data = {}
    try {
      data = await this.$axios[type](url, { params: _params })
    } catch (err) {
      commit('SET_LOADING', false)
    }
    data.pageSize = data.size
    commit('SET_LIST_DATA', data.result)
    commit('SET_LOADING', false)
  },
  async setMatchStatus ({ commit }, data) {
    const newData = await JSON.parse(JSON.stringify(data))
    commit('SET_MATCH_STATUS', newData)
  }
}
