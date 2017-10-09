import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import qs from 'qs'
import Router from '../../router/index'

const Axios = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
})

Axios.interceptors.request.use(function (config) {
  // 判断如果是post，delete请求则需要序列化参数
  if (
    config.method === 'post' ||
    config.method === 'delete'
  ) {
    // 序列化
    config.data = qs.stringify(config.data)
  }
  // 判断是否登录，排除登录接口
  if (sessionStorage.getItem('token')) {
    config.headers.Authorization = sessionStorage.getItem('token')
  } else if (config.url !== '/api/users/login') {
    MessageBox.alert('您的登录已过期，请重新登录。', '登录提示', {
      confirmButtonText: '确定',
      callback: action => {
        Router.push('/login')
      }
    })
    return Promise.reject('请登录后操作')
  }
  return config
}, function (error) {
  Message({
    showClose: true,
    message: error,
    type: 'error'
  })
  return Promise.reject(error.data.error.message)
})
// 响应拦截
Axios.interceptors.response.use(function (res) {
  // 状态码不等于200则弹窗提示
  if (res.data.code !== 200 && res.data.code !== 300) {
    Message({
      showClose: true,
      message: res.data.msg,
      type: 'error'
    })
  }
  return res.data
})

export default {
  install: function (Vue, Option) {
    Object.defineProperty(Vue.prototype, '$http', {value: Axios})
  }
}
