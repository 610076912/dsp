<template>
  <div id="creatmaterial">
    <setps :active="5"></setps>
    <div class="slide">
      <span class="slide-prev btn" @click="prev"><i class="el-icon-arrow-left"></i></span>
      <span class="slide-next btn" @click="next"><i class="el-icon-arrow-right"></i></span>
      <div class="slide-box">
        <ul v-bind:style="{ width: slide.width+'%', left: slide.left+'%' }">
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
          <li>7</li>
          <li>8</li>
          <li>9</li>
        </ul>
      </div>
    </div>
    <div class="material">
      <div class="left">
        <p class="top">一级广告</p>
        <div class="con">
          <el-collapse accordion value="1">
            <el-collapse-item name="1">
              <template class="fontb" slot="title">Flash1 150px*150px规格
                <button @click.stop class="fr" size="small">保存</button>
              </template>
              <div class="ads"></div>
            </el-collapse-item>
            <el-collapse-item name="2">
              <template class="fontb" slot="title">Flash2 150px*150px规格
                <button @click.stop class="fr" size="small">保存</button>
              </template>
              <div class="ads"></div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
      <div class="right">
        <p class="top">二级广告</p>
        <div class="con">
          <el-collapse accordion value="1">
            <el-collapse-item name="1">
              <template class="fontb" slot="title">关联模板1 屏占比3:1 适用于: 商品
                <button @click.stop class="fr" size="small">保存</button>
              </template>
              <div class="ads"></div>
            </el-collapse-item>
            <el-collapse-item name="2">
              <template class="fontb" slot="title">关联模板2 屏占比3:2 适用于: 商品
                <button @click.stop class="fr" size="small">保存</button>
              </template>
              <div class="ads"></div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </div>
    <div class="btns">
      <el-button type="info" @click="back">返回</el-button>
      <el-button type="info" @click="finish">完成</el-button>
    </div>
  </div>
</template>

<script>
  import setps from './steps-component.vue'

  export default {
    name: 'creatmaterial',
    data () {
      return {
        radio: 'true',
        slide: {
          width: '200',
          left: '0'
        }
      }
    },
    methods: {
      prev () {
        const L = this.slide.left
        if (L < 0) this.slide.left = L + 100
      },
      next () {
        const L = this.slide.left
        if (L > (100 - this.slide.width)) this.slide.left = L - 100
      },
      back () {
        this.$router.go(-1)
      },
      finish () {
        console.log('complete')
      }
    },
    components: {
      setps
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  #creatmaterial {
    .fr {
      float: right
      margin: 7px 20px
      cursor: pointer;
      background: #fff;
      border: 1px solid #c4c4c4;
      padding: 0 10px;
      height: 28px;
      font-size: 12px;
      border-radius: 4px;
      outline: none;
      transition: .3s;
      &:hover {
        border-color: #169bd5;
        color: #169bd5;
      }
    }
    .slide {
      width: 1140px
      height: 60px
      margin: 60px auto
      position: relative

      .btn {
        width: 42px
        height: 60px
        position: absolute
        font-size: 58px;
        line-height: 60px;
        color: #e4e4e4;
        margin-left: -12px;
        cursor: pointer;
      }
      .slide-prev {
        left: 0
      }
      .slide-next {
        right: 0
      }
      .slide-box {
        width: 980px
        height: 100%
        margin: 0 auto
        overflow hidden
        position: relative

        ul {
          position: absolute
          transition: left 0.5s;
          -moz-transition: left 0.5s; /* Firefox 4 */
          -webkit-transition: left 0.5s; /* Safari 和 Chrome */
          -o-transition: left 0.5s; /* Opera */

          li {
            width: 180px
            height: 60px
            float: left
            margin-right: 20px
            border: 1px solid #c9c9c9
          }
        }
      }
    }
    .material {
      width: 1140px;
      margin: 0 auto 60px
      overflow: hidden
      min-height: 438px;
      .left {
        width: 554px
        float: left
      }
      .right {
        width: 554px
        float: right
      }

      .top {
        line-height: 38px
        color: #31a5d8
        border-bottom: 2px solid #169bd5
      }
      .con {

        .el-collapse-item__content {
          padding: 0
        }
        .ads {
          height: 310px
          background: #ccc
        }
      }
      .el-collapse-item__header {
        font-weight: bold
      }
    }
    .btns {
      width: 100%
      height: 130px
      text-align: center
      padding-top: 30px
      border-top: 1px solid #f2f2f2
    }
  }
</style>
