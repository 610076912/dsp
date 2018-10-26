
/**
 * 使用说明
 * config：
 * url 配置埋点接口 测试环境 http://test.videozhishi.com:3800/log/operationRecord 线上环境 http://api.videozhishi.com/log/operationRecord
 * listenClass 配置多个需要监听的dom class
 * listenAttr 配置多个该监听dom的自定义属性 属性值必须为字符串
 *
 * defaultInfo：
 * 在埋点登入/登出时，需要设置特定describe 实现uuid的自动更新
 * 登入/登出 signIn/signOut
 *
 */

import UUID from 'uuid-js'
export default {
  config: {
    url: process.env.TEST === 'test' ? 'http://test.videozhishi.com:3800/log/operationRecord' : 'http://api.videozhishi.com/log/operationRecord',
    listenClass: ['bp'],
    listenAttr: ['describe']
  },
  defaultInfo: {
    log_type: 'opt',
    describe: '',
    user_id: sessionStorage.getItem('user_id'),
    user_type: sessionStorage.getItem('user_type'),
    opt_time: 0,
    detail_info: '',
    once_id: localStorage.getItem('uuid'),
    user_cookie: '',
    platform: 'dsp'
  },
  install (Vue, options) {
    this.init(Vue, options)
    Vue.prototype.$_send = (parameter) => {
      this.send(parameter)
    }
  },
  init (Vue, options) {
    Object.assign(this.config, options)
    this.globalListener()
    if (!this.defaultInfo.once_id) {
      this.defaultInfo.once_id = UUID.create().toString()
      localStorage.setItem('uuid', this.defaultInfo.once_id)
    }
  },
  globalListener () {
    document.addEventListener('click', (event) => {
      try {
        // 遍历冒泡过程
        if (!event.path) {
          event.path = []
          let currentNode = event.target
          while (currentNode !== document) {
            event.path.push(currentNode)
            currentNode = currentNode.parentNode
          }
        }
        for (let j in event.path) {
          const node = event.path[j]
          const classNames = node.className ? node.className.split(' ') : ''
          for (let i in classNames) {
            if (this.config.listenClass.some((item) => { return item === classNames[i] })) {
              const attrData = this.attr(node)
              this.send(attrData)
            }
          }
        }
      } catch (e) {}
    }, false)
  },
  send (data) {
    try {
      try {
        if (!this.defaultInfo.user_id || !this.defaultInfo.user_type) {
          this.defaultInfo.user_id = sessionStorage.getItem('user_id')
          this.defaultInfo.user_type = sessionStorage.getItem('user_type')
        }
      } catch (e) {}

      if (data.describe === 'signIn') this.updataUUID()

      this.defaultInfo.opt_time = new Date()
      let sendData = JSON.parse(JSON.stringify(this.defaultInfo))
      Object.assign(sendData, data)

      const sendImg = new Image()
      sendImg.src = this.config.url + '?' + this.urlParm(sendData)
      // console.log('埋点已发送', sendData)
      if (data.describe === 'signOut') this.removeUUID()
    } catch (err) {}
  },
  attr (el) {
    let valObj = {}
    for (let i in this.config.listenAttr) {
      valObj[this.config.listenAttr[i]] = el.getAttribute(this.config.listenAttr[i])
    }
    return valObj
  },
  updataUUID () {
    this.defaultInfo.once_id = UUID.create().toString()
    localStorage.setItem('uuid', this.defaultInfo.once_id)
  },
  removeUUID () {
    this.defaultInfo.once_id = ''
    localStorage.removeItem('uuid')
  },
  urlParm (data) {
    if (typeof data !== 'object') return
    let parm = ''
    for (let item in data) {
      parm += item + '=' + data[item] + '&'
    }
    parm = parm.replace(/&$/, '')
    return parm
  }
}
