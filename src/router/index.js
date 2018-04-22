import Vue from 'vue'
import VueRouter from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/list/all'
  },

  {
    path: '/list/:listingName',
    props: true,
    component: () => import('pages/index')
  },

  {
    path: '/info',
    component: () => import('pages/info')
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]

Vue.use(VueRouter)

const Router = new VueRouter({
  /*
   * NOTE! Change Vue Router mode from quasar.conf.js -> build -> vueRouterMode
   *
   * If you decide to go with "history" mode, please also set "build.publicPath"
   * to something other than an empty string.
   * Example: '/' instead of ''
   */

  // Leave as is and change from quasar.conf.js instead!
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
  scrollBehavior: () => ({ y: 0 }),
  routes
})

export default Router
