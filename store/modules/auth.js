import AuthService from '@/services/AuthService'
import jwtDecode from 'jwt-decode'
import * as types from '../mutations_types'

const state = {
  token: localStorage.getItem('token-id') || '',
  profile: localStorage.getItem('user-profile') || null,
  provinces: [],
}

const getters = {
  getProfile: (state) => {
    if (state.profile !== null) {
      return JSON.parse(state.profile)
    }
    return {}
  },
  role: () => {
    return window.$nuxt.$getPermission()
  },
}

const actions = {
  async login({ commit }, user) {
    const response = await AuthService.login(user)
    if (response) {
      commit(types.GET_USERPROFILE, jwtDecode(response.headers.authorization))
      commit(types.LOGIN_SUCCESS, response.headers.authorization)
      return Promise.resolve()
    }
    commit(types.LOGOUT)
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject('Tên đăng nhập hoặc mật khẩu không đúng')
  },
  logout({ commit }, data) {
    commit(types.LOGOUT)
  },
  async getProvinceAction({ state, commit }) {
    if (state.provinces.length > 0) {
      return Promise.resolve(state.provinces)
    }
    const response = await AuthService.getProvince()
    commit(types.SET_PROVINCES, response.data)
    return Promise.resolve(response.data)
  },
  getDistrictAction({ commit }, province) {
    return province ? AuthService.getDistrictByProvince(province) : []
  },
}

const mutations = {
  [types.LOGIN_SUCCESS](state, data) {
    state.token = data
    localStorage.setItem('token-id', data)
  },
  [types.LOGOUT](state) {
    state.token = ''
    state.profile = null
    localStorage.removeItem('token-id')
    localStorage.removeItem('user-profile')
  },
  [types.GET_USERPROFILE](state, data) {
    state.profile = JSON.stringify(data)
    localStorage.setItem('user-profile', state.profile)
  },
  [types.SET_PROVINCES](state, data) {
    state.provinces = data
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
