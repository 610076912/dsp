<template>
  <div id="login" @keyup.enter="login">
    <div class="con-wrap">
      <div class="left">
        <img src="../../assets/img/login-leftbg.png" alt="智视场景化投放平台">
      </div>
      <div class="right">
        <h1>智视</h1>
        <h2>Welcome!</h2>
        <input type="text" class="username" placeholder="请输入用户名" v-model="username">
        <input type="password" class="password" placeholder="请输入密码" v-model="password">
        <button @click="login">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      login () {
        const _this = this
        this.$http.post('/users/login', {
          user_name: this.username,
          password: this.password
        }).then(function (response) {
          if (response.code === 200) {
            console.log(response)
            sessionStorage.setItem('token', response.data.token)
            sessionStorage.setItem('user', response.data.user_name)
            _this.$router.push('/')
          }
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  #login {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-image: url("../../assets/img/loginbg.jpg");
    background-position: center;
    background-size: cover;
    background-color: #ffffff;
    .con-wrap {
      width: 55%;
      height: 60%;
      min-height: 460px;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      user-select: none;
      & > div {
        float: left;
      }
      .left {
        width: 56%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .right {
        width: 44%;
        height: 100%;
        background: #f7f7f7;
        position: relative;
        h1 {
          font-size: 30px;
          color: #8c98cc;
          position: absolute;
          top: 20%;
          left: calc(50% - 30px);
        }
        h2 {
          font-size: 26px;
          color: #dfdfdf;
          position: absolute;
          top: 20%;
          margin-top: 50px;
          left: calc(50% - 58px);
        }
        .username, .password {
          width: 57%;
          height: 40px;
          border-bottom: 1px solid #e0e0e0;
          background-color: transparent;
          text-align: center;
          font-size: 14px;
          position: absolute;
          left: 0;
          right: 0;
          top: 18%;
          bottom: 0;
          margin: auto;
          color: #6d6d6d;
        }
        .username {
          margin-top: 150px;
        }
        .password {
          margin-top: 200px;
        }
        button {
          width: 55%;
          height: 40px;
          background: #8899c7;
          border: none;
          border-radius: 15px;
          position: absolute;
          left: 0;
          right: 0;
          top: 18%;
          bottom: 0;
          margin: auto;
          margin-top: 300px;
          color: #fff;
          cursor: pointer;
          outline: none;
          box-shadow: 0 0 10px 0 #666666;
        }
      }
    }
  }
</style>
