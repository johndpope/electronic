import axios from 'axios'
import { createError } from './util'

let util = {}
util.ajaxForm = axios.create({
  baseURL: '/webApi',
  timeout: 30000,
  transformRequest: [function transformRequest (data) {
    let ret = ''
    for (let it in data) {
      let value = encodeURIComponent(data[it])
      if (value === 'null') {
        value = ''
      }
      ret += encodeURIComponent(it) + '=' + value + '&'
    }
    return ret
  }],
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
util.ajaxJson = axios.create({
  baseURL: '/webApi',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// 拦截器
function interceptionFn (el) {
  // http请求拦截器
  el.interceptors.request.use(config => {
    return config
  }, error => {
    return Promise.reject(error.response)
  })

  // http响应拦截器
  el.interceptors.response.use(data => {
    return data
  }, error => {
    return Promise.reject(error.response)
  })
}

interceptionFn(util.ajaxForm)
interceptionFn(util.ajaxJson)

const handleRequest = (request) => {
  return new Promise((resolve, reject) => {
    request.then(resp => {
      const data = resp.data
      if (resp.status === 200) {
        if (data.resultCode) {
          resolve(data.resultMsg)
        } else {
          reject(createError(resp.status, data.resultMsg))
        }
      } else if (resp.status === 401) {
        reject(createError(resp.status, data.resultMsg))
      } else if (resp.status === 404) {
        reject(createError(resp.status, data.resultMsg))
      } else if (resp.status === 405) {
        reject(createError(resp.status, data.resultMsg))
      }
    }).catch(res => {
      // reject(res)
      let errObj = createError(res.status, res.data.resultMsg)
      reject(errObj)
    })
  })
}

export default {
    postBetGame (data) {
        return handleRequest(util.ajaxForm.post('/sv/match/betGame', data))
    },
    postMatchCount (data) {
        return handleRequest(util.ajaxForm.post('/s2/match/matchCount', data))
    }
}
