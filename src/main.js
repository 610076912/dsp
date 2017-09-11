// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import router from './router'
// axios
import es6Promise from 'es6-promise'
es6Promise.polyfill()
import axios from 'axios'
import './assets/css/reset.styl'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import ajax from './assets/js/service'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$http = axios
Vue.prototype.$ajax = ajax

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.Auth)) {
    if (!sessionStorage.getItem('token')) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
const vue = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

window.vm = vue
