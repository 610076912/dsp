/**
 * 用于打包和启动本地项时
 * TEST值决定了连接哪台服务器地址（因为有跨域的几个请求接口，需要判断选择，如：计划列表页
 * 注意：在正式上线打包时其值为不能为test，开发时为test
 */
module.exports = {
  NODE_ENV: '"production"',
  TEST: '"test"'
}
