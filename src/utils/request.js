import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

service.defaults.withCredentials = true // 让ajax携带cookie
// request interceptor
// service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Galasys-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    var errorMsg = res.msg
    console.log(res)
    var code
    if (errorMsg === '未登陆!') {
      code = 400
    } else if (errorMsg === 'Bad credentials') {
      code = 501
    } else {
      code = res.status || parseInt(res.code)
    }
    // if the custom code is not 20000, it is judged as an error.
    if (code >= 400) {
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (code === 400 || code === 401 || code === 488) {
        // to re-login
        MessageBox.confirm('登录超时，请重新登录', '提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      } else if (code === 501) {
        Message({
          message: '用户名或密码错误',
          type: 'error',
          duration: 3 * 1000
        })
      } else if (code === 10001) {
        Message({
          message: errorMsg,
          type: 'error',
          duration: 3 * 1000
        })
      }
      return Promise.reject(new Error(errorMsg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: '服务器链接失败，请检查网络环境', // error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
