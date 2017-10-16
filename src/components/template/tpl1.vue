<template>
  <div class="tpl1">
    <div class="mask" v-show="cIsEdit"></div>
    <div class="content" ref="content">
      <div class="tpl-index">
        <div class="con">
          <div class="circular">
            点击上传</br>图片
          </div>
          <div class="info">
            <input type="text">
          </div>
        </div>
      </div>
      <div class="tpl-main">
        <div class="con">
          <div class="pic">点击上传图片</div>
          <textarea class="title"></textarea>
          <span>￥</span><input class="price" type="text"></br>
          <span>库存</span><input class="num" type="text">
          <div class="tpl1-bottom">
            <span>扫码加入购物车</span>
            <div>二维码</div>
          </div>
        </div>
      </div>
    </div>
    <div class="tpl1-left" @click="toIndex" v-show="!btnIsShow">
      <i class="el-icon-arrow-left"></i>
    </div>
    <div class="tpl1-right" @click="toMain" v-show="btnIsShow">
      <i class="el-icon-arrow-right"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      isEdit: {
        default: true
      }
    },
    data () {
      return {
        // 左右滑动按钮
        btnIsShow: true
      }
    },
    computed: {
      // 判断传进来的数据是否为该模板的名字
      'cIsEdit' () {
        return this.isEdit !== 'tpl1'
      }
    },
    methods: {
      toIndex () {
        this.$refs.content.style.left = '0'
        this.btnIsShow = true
      },
      toMain () {
        this.$refs.content.style.left = '-552px'
        this.btnIsShow = false
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .tpl1 {
    height: 310px;
    width: 100%;
    position: relative;
    overflow: hidden;
    .mask {
      width: 100%;
      height: 100%;
      background-image: url("../../../static/img/tplbg.jpg");
      background-repeat: no-repeat;
      background-size: 100%;
      background-position center;
      position absolute;
      z-index 10;
    }
    .tpl1-left, .tpl1-right {
      position: absolute;
      top: 50%;
      width: 50px;
      height: 50px;
      line-height 50px;
      text-align: center;
      cursor: pointer;
      i {
        font-size: 18px;
        color: #fff;
      }
    }
    .tpl1-left {
      left: 0px;
    }
    .tpl1-right {
      right: 0px;
    }
    .content {
      width: 200%;
      height: 100%;
      overflow: hidden;
      position: relative;
      transition: all .5s;
      left: 0;
      /*-提示信息部分-*/
      .tpl-main {
        position: relative;
        width: 50%;
        height: 100%;
        background-image: url("../../../static/img/tplbg.jpg");
        background-repeat: no-repeat;
        background-size: 100%;
        background-position center;
        float left;
        .con {
          width: 25%;
          height: 100%;
          float: right;
          color: #fff;
          padding: 3px;
          background: rgba(20, 20, 20, .6)
          .pic {
            width: 100%;
            height: 150px;
            background: #fff;
            color: #2e2e2e;
            text-align: center;
            line-height: 140px;
            cursor: pointer;
          }
          .title {
            width: 100%;
            margin-top: 5px;
            color: #fff;
            background: rgba(225, 225, 225, .3);
          }
          .price, .num {
            width: 30px;
          }
          .price {
            margin-left: 15px;
          }
          .num {
            margin-left: 3px;
          }
          .tpl1-bottom {
            width: 100%;
            span {
              display: inline-block;
              width: 95px;
              height: 20px;
              background: #f7ba2a;
              text-align: center;
            }
            div {
              width: 50px;
              height: 50px;
              background: #fff;
              color: #000;
              text-align: center;
              line-height: 50px;
              float: right;
            }
          }
        }
      }
      .tpl-index {
        position: relative;
        width: 50%;
        height: 100%;
        background-image: url("../../../static/img/tplbg.jpg");
        background-repeat: no-repeat;
        background-size: 100%;
        background-position center;
        float left;
        .con {
          position: absolute;
          left: 40px;
          bottom: 20px;
          width: 230px;
          height: 80px;
          .circular {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background-color: #fff;
            position: absolute;
            z-index: 1;
            text-align: center;
            line-height: 20px;
            padding-top: 20px
            cursor: pointer;
          }
          .info {
            width: 150px;
            position: absolute;
            left: 70px;
            top: 23px;
            height: 30px;
            background: #d16d6d;
            border-radius: 5px;
            input {
              width: 130px;
              margin-left: 8px;
              margin-top: 5px;
              height: 19px;
              text-indent: 10px;
              background: #666666;
            }
          }
        }
      }
    }
  }
</style>
