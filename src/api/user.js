import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    params: { username: data.username, password: data.password }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/current',
    method: 'get',
    params: { token }
  })
}

export function logout(token) {
  return request({
    url: '/user/logout',
    method: 'post',
    params: { token }
  })
}

export function checkUsername(username) {
  return request({
    url: '/user/checkUserExist',
    method: 'post',
    params: username
  })
}

export function checkMobile(mobile) {
  return request({
    url: '/user/findValidateNum',
    method: 'post',
    params: mobile
  })
}

export function checkMobileCode(mobilecode) {
  return request({
    url: '/user/findValidateNum',
    method: 'post',
    params: mobilecode
  })
}

export function updatePW(password) {
  return request({
    url: '/user/updatePwd',
    method: 'post',
    params: password,
    processData: false,
    contentType: false,
    dataType: 'json',
    async: false
  })
}

export function updateAvatar(uid, formData) {
  return request({
    url: '/user/' + uid + '/image',
    method: 'post',
    data: formData,
    processData: false,
    contentType: false,
    dataType: 'json',
    async: false
  })
}

export function updatePWByOld(uid, PWData) {
  return request({
    url: '/user/' + uid + '/password',
    method: 'put',
    params: PWData
  })
}

export function updateMobile(uid, mobile) {
  return request({
    url: '/user/' + uid + '/phone',
    method: 'put',
    params: mobile
  })
}
