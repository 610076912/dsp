<template>
  <div class="setps">
    <span class="setps-title">新建推广计划</span>
    <div class="setps-left"></div>
    <div class="setps-content">
      <el-steps :space="164" :active="active">
        <el-step class="el-step" title="基本设置" icon="my-yuan"></el-step>
        <el-step class="el-step" title="场景化设置" icon="my-yuan"></el-step>
        <el-step class="el-step" title="定向设置" icon="my-yuan"></el-step>
        <!--<el-step class="el-step" title="投放设置" icon="my-yuan" @click.native="clickTo('/creatStrategy')"></el-step>-->
        <el-step class="el-step" title="广告素材" icon="my-yuan"></el-step>
        <el-step class="el-step" title="活动预览" icon="my-yuan"></el-step>
      </el-steps>
    </div>
    <div class="setps-right"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      active: {
        type: Number,
        default: 0
      }
    },
    methods: {
      clickTo (val) {
        this.$router.push(val)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  @import url('../../assets/font/iconfont.css')
  .setps {
    width: 100%;
    height: 80px;
    position: relative;
    div {
      display: inline-block;
    }
    .setps-title {
      position: absolute;
      left: 20px;
      top: 15px;
      color: #3e3e3e;
    }
    .setps-left, .setps-right {
      width: 256px;
      height: 50px;
      border-bottom: 2px solid #169bd5;
    }
    .setps-right {
      float: right;
      border-color: #ccc;
    }
    .setps-content {
      position: absolute;
      left: 260px;
      & > .el-steps {
        position: absolute;
        top: 34px;
      }
      .el-step__main {
        position: absolute;
        top: -30px;
        left: -8%;
      }
      .el-step__head {
        font-size: 20px;
      }
      .el-step__title {
        font-size: 12px;
      }
      .el-step__title.is-finish {
        color: #169bd5;
      }
      .el-step__head.is-finish {
        color: #169bd5;
        border-color: #169bd5;
      }
    }
  }
</style>
