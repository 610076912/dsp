<template>
  <div id="login" @keyup.enter="login">
    <div class="con-wrap">
      <div class="left">
        <img src="../../assets/img/login-leftbg.png" alt="智视场景化投放平台">
        <div class="right">
          <h1>登录</h1>
          <input type="text" class="username" placeholder="请输入用户名" v-model="username">
          <input type="password" class="password" placeholder="请输入密码" v-model="password">
          <button @click="login">登录</button>
        </div>
      </div>
    </div>
    <div class="copy"><a href="http://www.bjvca.com" target="_Blank">北京视连通科技有限公司&nbsp;&nbsp;&nbsp;版权所有&copy;2017&nbsp;&nbsp;&nbsp;京ICP备15041948号</a></div>
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
    .copy {
      width: 100%;
      display inline-block;
      position: absolute;
      bottom: 40px;
      text-align: center;
      a{
        color: #fff;
      }
    }
    .con-wrap {
      width: 612px;
      height: 366px;
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
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .right {
        width: 50%;
        height: 100%;
        background: #f7f7f7;
        position: absolute;
        right: 0;
        top: 0;
        border-radius: 4px;
        h1 {
          font-size: 30px;
          color: #555555;
          position: absolute;
          top: 12%;
          left: calc(50% - 30px);
        }
        .username, .password {
          width: 60%;
          height: 35px;
          border: 1px solid #e1e1e1;
          border-radius: 3px;
          background-color: transparent;
          text-indent: 15px;
          font-size: 14px;
          position: absolute;
          left: 0;
          right: 0;
          top: 8%;
          bottom: 0;
          margin: auto;
          color: #6d6d6d;
          transition: all .5s;
          &:focus {
            border-color: #09c0ab;
            box-shadow: 0px 0px 2px #09c0ab;
          }
        }
        .username {
          margin-top: 120px;
        }
        .password {
          margin-top: 170px;
        }
        button {
          width: 60%;
          height: 35px;
          background-image: url("../../assets/img/logbtnbg.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
          border: none;
          border-radius: 2px;
          position: absolute;
          left: 0;
          right: 0;
          top: 18%;
          bottom: 0;
          margin: auto;
          margin-top: 210px;
          color: #fff;
          cursor: pointer;
          outline: none;
          box-shadow: 0 0 1px 0 rgba(74, 111, 205, .6);
        }
      }
    }
  }
</style>
