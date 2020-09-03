import * as types from '../mutations_types'

const state = {
  title: '',
  sidebar: {
    opened: JSON.parse(!localStorage.getItem('sidebarStatus')) || true,
    withoutAnimation: false,
  },
  device: 'desktop',
  layout: localStorage.getItem('layout') || 'vertical',
}

const getters = {
  title: (state) => state.title,
  sidebar: (state) => state.sidebar,
  device: (state) => state.device,
  layout: (state) => state.layout,
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setPageTitle({ commit }, title) {
    commit('SET_PAGE_TITLE', title)
  },
}

const mutations = {
  [types.TOGGLE_SIDEBAR](state) {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      localStorage.setItem('sidebarStatus', JSON.stringify(true))
    } else {
      localStorage.setItem('sidebarStatus', JSON.stringify(false))
    }
  },
  [types.CLOSE_SIDEBAR](state, withoutAnimation) {
    localStorage.setItem('sidebarStatus', JSON.stringify(false))
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  [types.TOGGLE_DEVICE](state, device) {
    state.device = device
  },
  [types.SET_PAGE_TITLE](state, title) {
    state.title = title
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
