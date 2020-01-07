const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  topMenuIndex: state => state.app.topMenuIndex,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  uid: state => state.user.uid,
  ucode: state => state.user.ucode,
  mobile: state => state.user.mobile,
  post: state => state.user.post,
  section: state => state.user.section,
  companyId: state => state.user.companyId,
  company: state => state.user.company,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs
}
export default getters
