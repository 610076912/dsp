/**
 * Created by liang on 2017/9/8.
 */

import es6Promise from 'es6-promise'
es6Promise.polyfill()
import axios from 'axios'
const token = sessionStorage.getItem('token')
const loccof = window.location.hostname === 'localhost' ? '/api' : ''

let Ajax = function () {
  this.request = function (config) {
    config.headers = {Authorization: 'Bearer ' + token}
    config.timeout = 10000
    return axios(config).catch(error => {
      if (error.response) {
        window.vm.$alert('请求错误：' + error.response.status)
      } else {
        window.vm.$alert('请求错误：' + error.message)
      }
    })
  }
  this.msg = message => {
    window.vm.$alert('请求错误：' + message)
  }
}

Ajax.prototype.get = function (url, data, callback) {
  this.request({method: 'get', url: loccof + url, params: data}).then(res => { res && res.status === 200 ? callback(res.data) : this.msg(res.status) })
}
Ajax.prototype.post = function (url, data, callback) {
  this.request({method: 'post', url: loccof + url, data: data}).then(res => { res && res.status === 200 ? callback(res.data) : this.msg(res.status) })
}
Ajax.prototype.delete = function (url, data, callback) {
  this.request({method: 'delete', url: loccof + url, params: data}).then(res => { res && res.status === 200 ? callback(res.data) : this.msg(res.status) })
}

let ajax = new Ajax()
export default ajax
