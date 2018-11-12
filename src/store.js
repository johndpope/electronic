import Vue from 'vue'
import Vuex from 'vuex'
import ajaxModel from '../src/utils/ajaxModel'
import { GET_EVENTS, GET_MATCHES } from '../src/utils/types';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      balance: null
  },
  mutations: {
   [GET_EVENTS] (stat) {
     return stat
   },
  [GET_MATCHES] (stat) {
     return stat
  },
   refreshMoney (state, data) {
      state.balance = data
   }
  },
  actions: {
      // 下注
      async postBetGameS ({ commit }, data) {
          commit(GET_MATCHES)
          let re = ''
          await ajaxModel.postBetGame(data).then(res => {
              re = res
          }).catch(err => {
              throw err
          })
          return re
      },
      // 查询赛事数量
      async postMatchCountS ({ commit }, data) {
          commit(GET_EVENTS)
          let re = ''
          await ajaxModel.postMatchCount(data).then(res => {
              re = res
          }).catch(err => {
              re = err
          })
          return re
      },
      // 查询查询赛事列表
      async postMatchesS ({ commit }, data) {
          commit(GET_MATCHES)
          let re = ''
          await ajaxModel.postMatches(data).then(res => {
              re = res
          }).catch(err => {
              re = err
          })
          return re
      },
      // 查询公告
      async postInitESportBulletinS ({ commit }, data) {
          commit(GET_MATCHES)
          let re = ''
          await ajaxModel.postInitESportBulletin(data).then(res => {
              re = res
          }).catch(err => {
              re = err
          })
          return re
      },
      // 查询登录
      async postUserLoginS ({ commit }, data) {
          commit(GET_MATCHES)
          let re = ''
          await ajaxModel.postUserLogin(data).then(res => {
              re = res
          }).catch(err => {
              re = err
          })
          return re
      },
      // 查询联赛
      async postLeaguesS ({ commit }, data) {
          commit(GET_MATCHES)
          let re = ''
          await ajaxModel.postLeagues(data).then(res => {
              re = res
          }).catch(err => {
              re = err
          })
          return re
      },
      // 查询赛果
      async postListGameEndResultS ({ commit }, data) {
          commit(GET_MATCHES)
          let re = ''
          await ajaxModel.postListGameEndResult(data).then(res => {
              re = res
          }).catch(err => {
              re = err
          })
          return re
      },
      // 查询盘口投注信息
      async postMultiTicketS ({ commit }, data) {
          commit(GET_MATCHES)
          let re = ''
          await ajaxModel.postMultiTicket(data).then(res => {
              re = res
          }).catch(err => {
              re = err
          })
          return re
      },
      // 查询用户投注信息
      async postUserListGameWagerS ({ commit }, data) {
          commit(GET_MATCHES)
          let re = ''
          await ajaxModel.postUserListGameWager(data).then(res => {
              re = res
          }).catch(err => {
              re = err
          })
          return re
      },
      // 查询滚球赛事
      async postRollBallMatchesS ({ commit }, data) {
          commit(GET_MATCHES)
          let re = ''
          await ajaxModel.postRollBallMatches(data).then(res => {
              re = res
          }).catch(err => {
              re = err
          })
          return re
      },
      // 查询滚球赛事
      async postMatchInfoS ({ commit }, data) {
          commit(GET_MATCHES)
          let re = ''
          await ajaxModel.postMatchInfo(data).then(res => {
              re = res
          }).catch(err => {
              re = err
          })
          return re
      },
      // 查询帐变记录
      async postListStatementsResultS ({ commit }, data) {
          commit(GET_MATCHES)
          let re = ''
          await ajaxModel.postListStatementsResult(data).then(res => {
              re = res
          }).catch(err => {
              re = err
          })
          return re
      },
      // 查询用户投注详情
      async postUserListGameWagerByDateS ({ commit }, data) {
          commit(GET_MATCHES)
          let re = ''
          await ajaxModel.postUserListGameWagerByDate(data).then(res => {
              re = res
          }).catch(err => {
              re = err
          })
          return re
      },
      // 查询资金
      async postUserInfoS ({ commit }, data) {
          commit(GET_MATCHES)
          let re = ''
          await ajaxModel.postUserInfo(data).then(res => {
              re = res
          }).catch(err => {
              re = err
          })
          return re
      },
      // 用户登录
      async postLoginUserByTokenS ({ commit }, data) {
          commit(GET_MATCHES)
          let re = ''
          await ajaxModel.postLoginUserByToken(data).then(res => {
              re = res
          }).catch(err => {
              re = err
          })
          return re
      },
      // 切换语言
      async postChangeLanguagenS ({ commit }, data) {
          commit(GET_MATCHES)
          let re = ''
          await ajaxModel.postChangeLanguagen(data).then(res => {
              re = res
          }).catch(err => {
              re = err
          })
          return re
      },
  }
})
