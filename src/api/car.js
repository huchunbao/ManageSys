import request from '@/utils/request'

export function getList(url, data) {
  return request({
    headers: {
      'Content-Type': 'application/json'
    },
    transformRequest: [function(data) {
      data = JSON.stringify(data)
      return data
    }],
    url: url,
    method: 'post',
    data: data
  })
}

export function getListByGet(url, data) {
  return request({
    headers: {
      'Content-Type': 'application/json'
    },
    transformRequest: [function(data) {
      data = JSON.stringify(data)
      return data
    }],
    url: url,
    method: 'get',
    data: data
  })
}

export function excelList(url, data) {
  return request({
    headers: {
      'Content-Type': 'application/vnd.ms-excel'
    },
    transformRequest: [function(data) {
      data = JSON.stringify(data)
      return data
    }],
    responseType: 'blob',
    url: url,
    method: 'post',
    data: data
  })
}
