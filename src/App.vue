<template>
  <div id="app">
    <div class="header">
      <div class="header-top">
        <div class="center">
          <div class="header-welcome">欢迎您，<span class="header-ggz">广告主</span><span class="header-name">{{name}} <i class="el-icon-caret-bottom"></i></span><span class="logout">安全退出</span></div>
        </div>
      </div>
      <div class="header-con">
        <div class="center">
          <div class="logo"><router-link to="/">智视广告投放平台</router-link></div>
          <ul>
            <li v-bind:class="{ checked: pathCheck[0] }">
              <router-link @click.native="onActive(0)" to="/">首页</router-link>
            </li>
            <li v-bind:class="{ checked: pathCheck[1] }">
              <router-link @click.native="onActive(1)" to="plan">推广数据</router-link>
            </li>
            <li v-bind:class="{ checked: pathCheck[2] }">
              <router-link @click.native="onActive(2)" to="data">数据监测</router-link>
            </li>
            <li v-bind:class="{ checked: pathCheck[3] }">
              <router-link @click.native="onActive(3)" to="finance">财务管理</router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="header-tab">
        <div class="center">
          <div class="location">{{location}}</div>
        </div>
      </div>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
    <div class="footer">
      <div class="center">
        页面底部
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      name: '王雨晨',
      pathCheck: [true, false, false, false],
      path: '首页'
    }
  },
  methods: {
    onActive: function (pathNum) {
      switch (pathNum) {
        case 0:
          this.path = '首页'
          this.pathCheck = [true, false, false, false]
          break
        case 1:
          this.path = '推广数据'
          this.pathCheck = [false, true, false, false]
          break
        case 2:
          this.path = '数据监测'
          this.pathCheck = [false, false, true, false]
          break
        case 3:
          this.path = '财务管理'
          this.pathCheck = [false, false, false, true]
          break
      }
    }
  }
}

</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    min-height: 100%;
    background: #eeeeee;

    .center {
      width: 1200px;
      height: 100%;
      margin: 0 auto;
    }
  }

  .header {
    width: 100%;
    height: 160px;
  }

  .header-top {
    width: 100%;
    height: 40px;
    background: #454546;
  }
  .header-welcome{
    float: right ;
    padding: 10px 0;
    line-height: 20px;
    color: #fff;
  }
  .header-ggz{
    display: inline-block;
    background: #1D8CE0;
    padding: 0 5px;
    margin: 0 3px;
    border-radius: 3px;
  }
  .header-name{
    margin: 0 5px 0 3px;
    cursor: pointer;
  }
  .logout{
    cursor: pointer;
  }
  .header-con {
    width: 100%;
    height: 70px;
    background: #ffffff;
  }

  .header-tab {
    width: 100%;
    height: 50px;
    background: #f9f9f9;
  }
  .location{
    line-height: 50px;
    font-weight: bold;
    display block;
    height: 48px;
    width 80px;
    text-align: center;
    font-size 14px;
    border-bottom 2px solid #1D8CE0;
  }
  .header-con ul {
    width: 560px;
    height: 100%;
    float: right;
  }

  .header-con ul li {
    width: 140px;
    height: 100%;
    float: left;
    font-size 14px;
    text-align: center;
    line-height: 70px;
    cursor: pointer;
  }
  .header-con ul li.checked a{
    color: #60a7d6
  }
  .logo{
    height: 100%;
    width: 260px;
    float: left
    line-height: 70px
    font-size: 22px
    color: #333333
  }


  .main {
    width: 1200px;
    min-height: calc(100% - 380px);
    margin: 0 auto;
  }

  .footer {
    width: 100%;
    height: 220px;
    background: #454546;
    color: #aaaaaa;
    text-align: center;
    line-height: 220px;
  }

</style>
