// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import router from './router'
import store from './store'
// axios
import es6Promise from 'es6-promise'

es6Promise.polyfill()
import axios from '@/assets/js/axiosplus'
import './assets/css/reset.styl'
import echarts from '../static/js/echarts.min'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.config.performance = true
Vue.prototype.$echarts = echarts
Vue.use(axios)

// 登录页面router钩子函数
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.Auth)) {
    if (!sessionStorage.getItem('token')) {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
