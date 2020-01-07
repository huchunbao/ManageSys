import { constantRoutes } from '@/router'
import Layout from '@/layout'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

/**
 *
 * @param  {Array} userRouter 后台返回的用户权限json
 * @param  {Array} role  角色
 * @return {Object} btn 按钮权限 routes 过滤后的路由r
 */
export function recursionRouter(userRouter, role, cpid) {
  var realRoutes = []
  var buttons = []
  var addAuthPage = false
  for (var u = 0; u < userRouter.length; u++) {
    var menuIndex = '0'
    var menu = userRouter[u]
    switch (menu.name) {
      case '首页':
        menuIndex = '1'
        break
      case '数据中心':
        menuIndex = '2'
        break
      case '系统管理':
        menuIndex = '3'
        break
      case '系统设置':
        menuIndex = '4'
        break
      default:
        break
    }
    if (menu.children) {
      for (var m = 0; m < menu.children.length; m++) {
        var second = menu.children[m]
        if (second.uncheckedIcon === 'structure') {
          if (!addAuthPage) {
            const authUrl = (cpid === 12 ? 'galasys' : 'index')
            var authMenu = {
              path: '/structure',
              component: Layout,
              MenuIndex: menuIndex,
              meta: { roles: role, icon: second.uncheckedIcon },
              children: [{
                path: 'index',
                component: () => import(`@/views/structure/${authUrl}`),
                name: 'structure',
                meta: { title: '组织架构', noCache: true, meta: { roles: role, index: menuIndex }}
              }]
            }
            addAuthPage = true
            realRoutes.push(authMenu)
          }
        } else {
          var secondMenu = {
            path: '',
            component: Layout,
            MenuIndex: menuIndex,
            meta: { roles: role, icon: second.uncheckedIcon },
            children: []
          }
          if (second.children !== null && second.children[0].funcType !== 3) {
            second.children.forEach((item) => {
              var child = item.funcElementIdentifier.split('/')
              const pathUrl = item.funcElementIdentifier
              secondMenu.children.push({
                path: child[1],
                component: () => import(`@/views/${pathUrl}`), // 参数要使用常量，不然会被覆盖！！！！！！！！！！！！！
                name: child[0] + child[1],
                meta: { title: item.name, noCache: true, meta: { roles: role, index: menuIndex }}
              })

              if (item.children !== null) {
                item.children.forEach((btn) => {
                  buttons.push(btn.name)
                })
              }
            })
            if (second.name === '人脸识别') {
              secondMenu.children.push({
                path: 'zjry',
                component: () => import('@/views/face/zjry'),
                hidden: true,
                meta: { title: '白名单管理 / 增加人员', activeMenu: '/zjry', affix: true, meta: { roles: role, index: menuIndex }}
              })
              secondMenu.children.push({
                path: 'hadd',
                component: () => import('@/views/face/hadd'),
                hidden: true,
                meta: { title: '黑名单管理 / 增加人员', activeMenu: '/face', affix: true, meta: { roles: role, index: menuIndex }}
              })
            }
            secondMenu.meta.title = second.name
            secondMenu.redirect = '/' + second.children[0].funcElementIdentifier
            secondMenu.path = '/' + second.children[0].funcElementIdentifier.split('/')[0]
          } else {
            var path = second.funcElementIdentifier.split('/')
            const url = second.funcElementIdentifier
            secondMenu.children = [{
              path: path[1],
              component: () => import(`@/views/${url}`), // 参数要使用常量，不然会被覆盖！！！！！！！！！！！！！
              name: path[0],
              meta: { title: second.name, noCache: true, meta: { roles: role, index: menuIndex }}
            }]
            secondMenu.path = '/' + path[0]

            if (second.children !== null) {
              second.children.forEach((btn) => {
                buttons.push(btn.name)
              })
            }
          }
          realRoutes.push(secondMenu)
        }
      }
    }
  }

  return { btn: buttons, routes: realRoutes }
}

const state = {
  routes: [],
  addRoutes: [],
  buttons: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_BUTTONS: (state, buttons) => {
    state.buttons = buttons
  }
}

const actions = {
  generateRoutes({ commit }, { roles, func, cpid }) {
    return new Promise(resolve => {
      let accessedRoutes = []
      if (func.length > 0) {
        const all = recursionRouter(func[0].children, roles, cpid)
        accessedRoutes = all.routes
        commit('SET_BUTTONS', all.btn)
      }
      accessedRoutes.push({ // 数据中心默认页
        path: '/baogao',
        component: Layout,
        hidden: true,
        MenuIndex: '2',
        meta: { roles: roles },
        children: [
          {
            path: 'index',
            component: () => import('@/views/baogao/index'),
            name: 'baogao',
            meta: { title: '', noCache: true, meta: { roles: roles, index: '2' }}
          }
        ]
      })
      accessedRoutes.push({ path: '*', redirect: '/404', hidden: true })
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
