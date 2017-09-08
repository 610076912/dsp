<template>
  <div id="login">
    <div class="head">
      <h1>智视DSP广告平台</h1>
    </div>
    <div class="con">
      <div class="main">
        <div class="left"></div>
        <div class="right">
          <div class="loginCon">
            <p class="title">用户登录</p>
            <input class="user" type="text" placeholder="用户名" v-model="username">
            <input class="pw" type="password" placeholder="密码" v-model="password">
            <button class="btn" @click="login">{{ info }}</button>
          </div>
        </div>
      </div>
    </div>
    <div class="foot">©2017北京视联通科技有限公司 京ICP备15041948号</div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        username: '',
        password: '',
        info: '登陆'
      }
    },
    methods: {
      login () {
        this.info = '正在登录...'
        const _this = this
        this.$http.post('/api/users/login', {
          user_name: this.username,
          password: this.password
        }).then(function (response) {
          sessionStorage.setItem('token', response.data.data.token)
          sessionStorage.setItem('user', response.data.data.user_name)
          _this.$router.push('/')
        })
        .catch(function (error) {
          console.log(error)
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  #login{
    width: 100%
    height: 100%
    position: absolute
    left: 0
    top: 0
    background: #ffffff

    .head{
      width: 100%
      height: 80px

      h1{
        width: 1200px
        height: 100%
        line-height: 80px
        margin: 0 auto
        font-size: 30px
        color: #4a89db
        padding-left: 52px
        background: url('../../assets/img/logo.png') no-repeat center left/auto 70%
      }
    }
    .con{
      width: 100%
      height: calc(100% - 175px)
      background: #0290c6

      .main{
        width: 1200px
        height: 100%
        margin: 0 auto

        .left{
          width: 50%
          height: 100%
          float: left
        }
        .right{
          width: 50%
          height: 100%
          float: right
        }
        .loginCon{
          width: 340px
          height: 100%
          color: #ffffff

          .title{
            height: 18px
            line-height: 18px
            margin: 110px 0 50px 0
            font-size: 18px
          }
          .user,.pw,.btn{
            width: 100%
            height: 34px
            margin-bottom: 10px
            border: none
            outline: none
            -webkit-border-radius: 3px
            -moz-border-radius: 3px
            border-radius: 3px
          }
          .user,.pw{
            padding: 0 14px
            font-size: 14px
            color: #ffffff
            background: rgba(255,255,255,0.5)
          }
          .btn{
            background: rgba(0,0,0,0.5)
            color: #ffffff
            letter-spacing: 6px
            font-size: 14px
          }
          .btn:hover{
            background: rgba(10,10,10,0.5)
            color: #dddddd
          }
          input::-webkit-input-placeholder{
            color: #ffffff
            font-size: 14px
          }
          input:-moz-placeholder {
            color: #ffffff
            font-size: 14px
          }
          input::-moz-placeholder {
            color: #ffffff
            font-size: 14px
          }
          input:-ms-input-placeholder {
            color: #ffffff
            font-size: 14px
          }
        }
      }
    }
    .foot{
      width: 100%
      height: 95px
      border-top: 1px solid #dedede
      text-align: center
      line-height: 95px
      font-size: 18px
    }
  }
</style>
