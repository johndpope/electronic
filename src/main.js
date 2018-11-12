import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueI18n from 'vue-i18n'
import './utils/common.scss';

Vue.config.productionTip = false
Vue.prototype.$axios = axios

Vue.use(VueI18n) ;

const i18n = new VueI18n({
    locale: 'CH',    // 语言标识, 通过切换locale的值来实现语言切换,this.$i18n.locale
    messages: {
        'CH': require('@/utils/ch'),   // 中文语言包
        'EN': require('@/utils/en')    // 英文语言包
    }
})
//
// router.beforeEach((to, from, next) => {
//     if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
//         let session = sessionStorage.getItem('Tk')
//         if (session) {  // 通过vuex state获取当前的token是否存在
//             next();
//         }
//         else {
//             next({
//                 path: '/loginByToken',
//                 // query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
//             })
//             // next(false)
//         }
//     }
//     else {
//         next();
//     }
// })

new Vue({
  router,
  store,
  render: h => h(App),
  i18n
}).$mount('#app')
