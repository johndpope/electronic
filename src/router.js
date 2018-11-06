import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        default: Home,
      },
      meta: {
        requireAuth: true,
      },
    },
    {
      path:'/loginByToken',
      name: 'loginByToken',
      components: {
        default: () => import('./views/loginByToken.vue'),
      },
      meta: {
          requireAuth: false,
      },
    },
    {
      path: '/betRecord',
      name: 'betRecord',
      components: {
        default: () => import('./views/betRecord.vue'),
      },
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/results',
      name: 'results',
      components: {
        default: () => import('./views/results.vue'),
      },
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/statements',
      name: 'statements',
      components: {
        default: () => import('./views/statements.vue'),
      },
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/announcement',
      name: 'announcement',
      components: {
        default: () => import('./views/announcement.vue'),
      },
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/rulesTerms',
      name: 'rulesTerms',
      components: {
        default: () => import('./views/rulesTerms.vue'),
      },
      meta: {
        requireAuth: true,
      },
    }
  ]
})
