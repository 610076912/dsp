<template>
  <div class="creat-header-component">
    <span>{{title}}</span>
    <div class="creat-header-wrap">
      <span>{{text}}</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      text: ''
    },
    data () {
      return {}
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .creat-header-component {
    width: 100%;
    height: 140px;
    background: #fff;
    & > span {
      display: block;
      width: 100%;
      height: 50px;
      border-bottom: 1px solid #bfcbd9;
      font-size: 14px;
      line-height: 40px;
    }
    .creat-header-wrap {
      width: 100%;
      margin-top: 20px;
      height: 50px;
      border-bottom: 1px solid #169bd5;
      span {
        display: block;
        width: 130px;
        height: 50px;
        background: #169bd5;
        color: #fff;
        line-height: 50px;
        text-align: center;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }
    }
  }
</style>
