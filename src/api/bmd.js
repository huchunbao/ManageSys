import request from '@/utils/request'
export function get(url, data) {
  return request({
    headers: { 'Content-Type': 'application/json,charset=utf-8' },
    responseType: 'arraybuffer',
    url: url,
    method: 'get',
    params: data
  })
}
export function get2(url, data) {
  return request({
    url: url,
    method: 'get',
    params: data
  })
}
export function post(url, data) {
  return request({
    url: url,
    method: 'post',
    data: data
  })
}

export function put(url, data) {
  return request({
    url: url,
    method: 'put',
    data: data
  })
}

export function byDelete(url, data) {
  return request({
    url: url,
    method: 'delete',
    data: data
  })
}
