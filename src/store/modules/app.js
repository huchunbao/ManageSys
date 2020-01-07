import Cookies from 'js-cookie'

const state = {
  sidebar: {
    opened: false,
    withoutAnimation: false
  },
  device: 'desktop',
  size: Cookies.get('size') || 'medium ',
  topMenuIndex: '1'
}

const mutations = {
  OPEN_SIDEBAR: state => {
    state.sidebar.opened = true
    state.sidebar.withoutAnimation = true
    // if (state.sidebar.opened) {
    //   Cookies.set('sidebarStatus', 1)
    // } else {
    //   Cookies.set('sidebarStatus', 0)
    // }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    // Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_SIZE: (state, size) => {
    state.size = size
    Cookies.set('size', size)
  },
  SET_TOPMENUINDEX: (state, index) => {
    state.topMenuIndex = index
  }
}

const actions = {
  openSideBar({ commit }) {
    commit('OPEN_SIDEBAR')
  },
  toHome({ commit }) {
    commit('TO_HOME')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setSize({ commit }, size) {
    commit('SET_SIZE', size)
  },
  setTopMenuIndex({ commit }, index) {
    commit('SET_TOPMENUINDEX', index)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
