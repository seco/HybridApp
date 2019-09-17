import Vue from 'vue'
import Router from 'vue-router'
import noFound from './../pages/404.vue'
import index from './../pages/index.vue'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/404',
      name: '404',
      component: noFound
    }
  ]
})


export default router
