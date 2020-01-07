import { login, logout, getInfo, updateAvatar, updateMobile } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  uid: '',
  ucode: '',
  mobile: '',
  post: '',
  section: '',
  companyId: 0, // 身份标识
  company: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INFO: (state, user) => {
    state.name = user.cusName
    state.avatar = process.env.VUE_APP_BASE_API + '/user/img/' + user.cusPic + '?t=' + new Date().getTime()
    state.uid = user.userId
    state.ucode = user.userCode
    state.mobile = user.phone
    state.post = user.postName
    state.section = user.dept.name
    state.companyId = user.company.companyId
    state.company = user.company.companyName
  },
  RESET_INFO: (state) => {
    state.name = ''
    state.avatar = ''
    state.uid = ''
    state.ucode = ''
    state.mobile = ''
    state.post = ''
    state.section = ''
    state.companyId = 0
    state.company = ''
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_MOBILE: (state, mobile) => {
    state.mobile = mobile
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const data = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const data = response.data
        if (!data || data === undefined) {
          reject('验证失败，请重新登录')
        }

        /* const { roles, name, avatar, introduction } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('验证失败，请重新登录')
        } */
        const authorities = data.authorities
        if (!authorities || authorities.length <= 0) {
          reject('获取用户权限失败')
        }
        var roles = []
        var func = data.funcTree
        var cpid = data.cpid
        authorities.forEach(role => {
          roles.push(role.authority)
        })
        commit('SET_ROLES', roles)
        // 设置用户信息
        commit('SET_INFO', data)
        resolve({ roles, func, cpid })
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('RESET_INFO')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      commit('RESET_INFO')
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  },
  updateAvatar({ commit, state }, avatarInfo) { // 修改头像
    return new Promise((resolve, reject) => {
      updateAvatar(avatarInfo.uid, avatarInfo.formData).then(response => {
        if (response.status === 1) {
          reject('上传失败，请稍后重试')
        }
        const avatar = state.avatar.substring(0, state.avatar.indexOf('?')) + '?t=' + new Date().getTime()
        commit('SET_AVATAR', avatar)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateMobile({ commit, state }, mobileInfo) { // 修改手机号
    return new Promise((resolve, reject) => {
      updateMobile(mobileInfo.uid, mobileInfo.mobile).then(response => {
        if (response.status === 1) {
          reject('修改失败，请稍后重试')
        }
        commit('SET_MOBILE', mobileInfo.mobile.phone)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
