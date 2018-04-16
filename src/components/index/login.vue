<template>
  <div id="login" @keyup.enter="login">
    <div class="con-wrap">
      <div class="left">
        <img src="../../assets/img/login-leftbg.png" alt="智视场景化投放平台">
        <div class="box">
          <div class="animationBox">
            <div class="animationLogo"></div>
            <ul>
              <li class="round1"><span></span></li>
              <li class="round2"><span></span></li>
              <li class="round3"><span></span></li>
            </ul>
          </div>
        </div>
        <div class="right">
          <h1></h1>
          <input type="text" class="username" placeholder="请输入用户名" v-model="username">
          <i class="el-icon-my-denglu"></i>
          <input type="password" class="password" placeholder="请输入密码" v-model="password">
          <i class="el-icon-my-mima"></i>
          <button @click="login">登录</button>
        </div>
      </div>
    </div>
    <div class="copy"><a href="http://www.bjvca.com" target="_Blank">北京视连通科技有限公司&nbsp;&nbsp;&nbsp;版权所有&copy;2017&nbsp;&nbsp;&nbsp;京ICP备15041948号</a>
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
            if (response.data.user_type[0] === '1' || response.data.user_type[0] === '4') {
              sessionStorage.setItem('token', response.data.token)
              sessionStorage.setItem('user', response.data.user_name)
              sessionStorage.setItem('user_id', response.data.user_id)
              sessionStorage.setItem('user_type', response.data.user_type)
              _this.$parent.getUserName()
              _this.$router.push('/')
            } else {
              _this.$message({
                message: '您没有权限',
                type: 'warning'
              })
            }
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
      a {
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
        position: relative;
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
          width: 100%;
          height: 26px;
          font-size: 28px;
          letter-spacing: 5px;
          color: #555555;
          position: absolute;
          top: 17%;
          text-align center;
          background: url("../../assets/img/vcalogo.png") no-repeat center
          background-size: contain;
          /* width: 100%;
          height: 35px;
          font-size: 28px;
          letter-spacing: 5px;
          color: #555555;
          position: absolute;
          top: 17%;
          text-align center; */
        }
        i {
          font-size 16px;
          color: #565656
          position absolute
          top: 158px;
          left: 70px;
        }
        .el-icon-my-mima {
          top: 208px;
          font-weight 700;
        }
        .username, .password {
          width: 60%;
          height: 35px;
          border: 1px solid #e1e1e1;
          border-radius: 3px;
          background-color: transparent;
          text-indent: 30px;
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
        input:-webkit-input-placeholder { /* WebKit browsers */
          font-size: 12px;
        }
        input:-moz-placeholder { /* Mozilla Firefox 19+ */
          font-size: 12px;
        }
        input:-ms-input-placeholder { /* Internet Explorer 10+ */
          font-size: 12px;
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
    .box {
      width: 135px;
      height: 135px;
      position: absolute;
      left: 88.5px;
      top: 66px;
    }

    .animationBox {
      width: 100%;
      height: 100%;
      position: relative;
      perspective: 4000px;
      -webkit-perspective: 4000px;
      transform-style: preserve-3d;
      transform: rotateY(75deg);
    }

    .animationLogo {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: url('../../assets/img/animationLogo.png') no-repeat center;
      background-size: cover;
      transform: rotateY(-75deg);
    }

    .animationBox ul {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      transform: rotateX(0deg);
      transform-origin: 50% 50%;
      transform-style: preserve-3d;
      animation: rotate3D 20s linear infinite;
    }

    .animationBox ul li {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      border: 2px solid #ffffff;
      border-radius: 50%;
      position: absolute;
      padding: 4px;
    }

    .animationBox ul li span {
      display: inline-block;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: url('../../assets/img/animationRound.png') no-repeat;
      background-size: cover;
      animation: rotate 5s linear infinite;
    }

    .round1 {
      transform: rotateX(0deg);
    }

    .round2 {
      transform: rotateX(120deg);
    }

    .round3 {
      transform: rotateX(240deg);
    }

    @keyframes rotate3D {
      from {
        transform: rotateX(0deg);
      }
      to {
        transform: rotateX(-360deg);
      }
    }
    @keyframes rotate {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
</style>
