import Vue from 'vue'
import Vuex from 'vuex'
import ajaxModel from '../src/utils/ajaxModel'
import { GET_EVENTS, GET_MATCHES } from '../src/utils/types';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      balance: null,
      userTk: sessionStorage.getItem('Tk') ? sessionStorage.getItem('Tk') : '',
      eventType: 1,
      liveText: null,
      matchText: null,
      betItemList: [],
      betLimit: {},
      countDown: 10,
      mixParlayObj: {},
      betObj: {
          status: 1,
          money: null,
          team: null,
          oddsId: null
      },
      betBoxShow: false,
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
   },
   saveToken (state, data) {
       sessionStorage.setItem('Tk', data)
       state.userTk = data
   },
   startCountDown (state) {
       state.countDown = state.countDown -1
   },
   changeCountDown (state, data) {
       state.countDown = data
   },
   changEventType (state, data) {
       state.eventType = data
   },
   changLiveText (state, data) {
       state.liveText = data
   },
   changMatchText (state, data) {
       state.matchText = data
   },
   pushMixBetList (state, data) {
       state.betItemList.push(data)
   },
   deleteMixListItem (state) {
       state.betItemList.pop()
   },
   handleDelItem (state, data) {
       state.mixParlayObj.oddList = state.mixParlayObj.oddList.filter((arr) => arr.gid !== data)
       state.betItemList = state.betItemList.filter((arr) => arr.gid !== data)
   },
   updateLimit (state, data) {
       state.betLimit = data
   },
   updateParlayObj (state, data) {
      state.mixParlayObj = data
   },
   deleteParlayObj (state) {
       state.mixParlayObj = {}
       state.betItemList = []
   },
   setBetObj (state, data) {
      if (data.team && data.oddsId) {
          state.betObj.team = data.team
          state.betObj.oddsId = data.oddsId
      } else {
          state.betObj.money = data.money
      }
   },
   changeBetBoxShow (state) {
       state.betBoxShow = !state.betBoxShow
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
      // 串关查看一串的详情
      async postMixParlayInfoS ({ commit }, data) {
          commit(GET_MATCHES)
          let re = ''
          await ajaxModel.postMixParlayInfo(data).then(res => {
              re = res
          }).catch(err => {
              re = err
          })
          return re
      },
      // 串关投注
      async postBetMixParlayS ({ commit }, data) {
          commit(GET_MATCHES)
          let re = ''
          await ajaxModel.postBetMixParlay(data).then(res => {
              re = res
          }).catch(err => {
              re = err
          })
          return re
      },
      // 查询赛事列表(串关)
      async postMatchesMixParlayS ({ commit }, data) {
          commit(GET_MATCHES)
          let re = ''
          await ajaxModel.postMatchesMixParlay(data).then(res => {
              re = res
          }).catch(err => {
              re = err
          })
          return re
      },
      // 查询串关赛事
      async postMixParlayCountS ({ commit }, data) {
          commit(GET_MATCHES)
          let re = ''
          await ajaxModel.postMixParlayCount(data).then(res => {
              re = res
          }).catch(err => {
              re = err
          })
          return re
      },
  }
})
