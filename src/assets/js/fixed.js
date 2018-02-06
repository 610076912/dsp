function _toFixed (num, jw) {
  // 默认保留6位小数
  let ws = jw || 5
  try {
    if (typeof num !== 'number') {
      throw new Error('数字类型错误')
    }
    if (typeof ws !== 'number') {
      throw new Error('保留小数位类型错误')
    } else {
      if (ws > 12 || ws < 0) {
        throw new Error('保留小数位类型错误')
      }
    }
  } catch (err) {
    return err
  }
  return (num.toFixed(ws) * 1000).toFixed(ws) * 1
}

export default {
  install: function (Vue, Option) {
    Object.defineProperty(Vue.prototype, '$_toFixed', {value: _toFixed})
  }
}
