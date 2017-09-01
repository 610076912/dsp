<template>
  <div class="setps">
    <span class="title">新建推广计划</span>
    <div class="left"></div>
    <div class="content">
      <el-steps :space="130" :active="active">
        <el-step title="基本设置" icon="my-yuan"></el-step>
        <el-step title="场景化设置" icon="my-yuan"></el-step>
        <el-step title="定向设置" icon="my-yuan"></el-step>
        <el-step title="投放设置" icon="my-yuan"></el-step>
        <el-step title="活动预览" icon="my-yuan"></el-step>
        <el-step title="广告素材" icon="my-yuan"></el-step>
      </el-steps>
    </div>
    <div class="right"></div>
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
    data () {
      return {}
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  @import url('../../assets/font/iconfont.css')
  .setps {
    width: 100%;
    height: 70px;
    position: relative;
    div {
      display: inline-block;
    }
    .title {
      position: absolute;
      left: 20px;
      top: 15px;
      color: #3e3e3e;
    }
    .left, .right {
      width: 256px;
      height: 50px;
      border-bottom: 2px solid #169bd5;
    }
    .right {
      float: right;
      border-color: #ccc;
    }
    .content {
      position: absolute;
      top: 21px;
      left: 260px;
      .el-step__main {
        position: absolute;
        top: -30px;
        left: -8%;
      }
      .el-step__head {
        font-size: 22px;
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
