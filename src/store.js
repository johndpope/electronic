import Vue from 'vue'
import Vuex from 'vuex'
import ajaxModel from '../src/utils/ajaxModel'
import { GET_EVENTS, GET_MATCHES } from '../src/utils/types';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {
   [GET_EVENTS] (stat) {
     return stat
   },
  [GET_MATCHES] (stat) {
     return stat
  }
  },
  actions: {
      // 下注
      async postBetGameS ({ commit }, data) {
          commit('startWaiting')
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
              throw err
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
              throw err
          })
          return re
      }
  }
})
