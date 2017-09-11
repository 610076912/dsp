<template>
  <div id="app">
    <div class="header">
      <div class="header-top">
        <div class="center">
          <div class="header-welcome">欢迎您，<span class="header-ggz">广告主</span><span class="header-name">{{username}} <i
            class="el-icon-caret-bottom"></i></span><span class="logout" @click="signOut">安全退出</span></div>
        </div>
      </div>
      <div class="header-con">
        <div class="center">
          <div class="logo">
            <router-link to="/">智视广告投放平台</router-link>
          </div>
          <ul>
            <li>
              <router-link @click.native="onActive('/')" to="/">首页</router-link>
            </li>
            <li>
              <router-link @click.native="onActive('/plan')" to="plan">推广数据</router-link>
            </li>
            <li>
              <router-link @click.native="onActive('/data')" to="data">数据监测</router-link>
            </li>
            <li>
              <router-link @click.native="onActive('/finance')" to="finance">财务管理</router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="header-tab">
        <div class="center">
          <div class="location">{{ path }}</div>
        </div>
      </div>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
    <div class="footer">
      <div class="center">
        北京视连通科技有限公司  京ICP备15041948号
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
        path: '首页'
      }
    },
    created () {
      this.onActive(this.$router.currentRoute.fullPath)
      this.username = sessionStorage.getItem('user')
      this.$ajax.get('/api/get_act_group', {}, function (result) {
        console.log(result)
      })
    },
    methods: {
      signOut () {
        sessionStorage.removeItem('token')
        this.$router.push('/login')
      },
      onActive: function (pathNum) {
        switch (pathNum) {
          case '/':
            this.path = '首页'
            break
          case '/plan':
            this.path = '推广数据'
            break
          case '/data':
            this.path = '数据监测'
            break
          case '/finance':
            this.path = '财务管理'
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
    position: relative

    .router-link-exact-active {
      color: #60a7d6
    }
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

  .header-welcome {
    float: right;
    padding: 10px 0;
    line-height: 20px;
    color: #fff;
  }

  .header-ggz {
    display: inline-block;
    background: #1D8CE0;
    padding: 0 5px;
    margin: 0 3px;
    border-radius: 3px;
  }

  .header-name {
    margin: 0 5px 0 3px;
    cursor: pointer;
  }

  .logout {
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

  .location {
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
    a {
      display: inline-block;
      height: 100%;
      width: 100%;
    }
  }

  .router-link-exact-active {
    color: #60a7d6
  }

  .logo {
    height: 100%;
    width: 260px;
    float: left
    line-height: 70px
    font-size: 22px
    color: #333333
    padding-left: 50px
    background: url('./assets/img/logo.png') no-repeat center left/auto 70%
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
