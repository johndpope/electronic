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
    },
    // postMatches (data) {
    //     return handleRequest(util.ajaxForm.post('/sv/match/matches', data))
    // },
    // postRollBallMatches (data) {
    //     return handleRequest(util.ajaxForm.post('/s2/match/matches', data))
    // },
    postInitESportBulletin (data) {
        return handleRequest(util.ajaxForm.post('/initEsportBulletin', data))
    },
    postUserLogin (data) {
        return handleRequest(util.ajaxForm.post('/v2/loginTest', data))
    },
    // postLeagues (data) {
    //     return handleRequest(util.ajaxForm.post('/sv/match/leagues', data))
    // },
    postListGameEndResult (data) {
        return handleRequest(util.ajaxForm.post('/listGameEndResult', data))
    },
    postMultiTicket (data) {
        return handleRequest(util.ajaxForm.post('/sv/line/multiTicket', data))
    },
    postUserListGameWager (data) {
        return handleRequest(util.ajaxForm.post('/userListGameWager', data))
    },
    postMatchInfo (data) {
        return handleRequest(util.ajaxForm.post('/s2/match/info', data))
    },
    postListStatementsResult (data) {
        return handleRequest(util.ajaxForm.post('listStatementsResult', data))
    },
    postUserListGameWagerByDate (data) {
        return handleRequest(util.ajaxForm.post('userListGameWagerByDate', data))
    },
    postUserInfo (data) {
        return handleRequest(util.ajaxForm.post('/v2/user/info', data))
    },
    postLoginUserByToken (data) {
        return handleRequest(util.ajaxForm.get('/v2/loginUserByToken'+data))
    },
    postChangeLanguagen (data) {
        return handleRequest(util.ajaxForm.post('/changeLanguage', data))
    },
    postMixParlayInfo (data) {
        return handleRequest(util.ajaxJson.post('/sv/match/mixParlayInfo', data))
    },
    postBetMixParlay (data) {
        return handleRequest(util.ajaxJson.post('/sv/match/betMixParlay?money='+data.money, JSON.stringify(data.mixParlayInfoList)))
    },
    // postMatchesMixParlay (data) {
    //     return handleRequest(util.ajaxForms.post('/sv/match/matchesMixParlay', data))
    // },
    postMixParlayCount (data) {
        return handleRequest(util.ajaxForm.post('/s2/match/mixParlayCount', data))
    },
    postSign (data) {
        return handleRequest(util.ajaxForm.post('/v2/sign', data))
    },
}
