import Vue from 'vue'
import Vuex from 'vuex'
import ajaxModel from '../src/utils/ajaxModel'
import { GET_EVENTS } from '../src/utils/types';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {
   [GET_EVENTS] (stat) {
     return stat
   }
  },
  actions: {
      // 下注
      async postBetGameS ({ commit }, data) {
          commit('startWaiting')
          let re = ''
          await ajaxModel.postBetGame(data).then(res => {
              commit('endWaiting')
              re = res
          }).catch(err => {
              commit('endWaiting')
              throw err
          })
          return re
      },
      // 查询赛事
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
  }
})
