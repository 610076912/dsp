<template>
  <div class="weekbar-component">
    <span>周期</span>
    <div class="line"></div>
    <div class="box" :class="{'box-active':weekArr[0]}">周一</div>
    <div class="line"></div>
    <div class="box" :class="{'box-active':weekArr[1]}">周二</div>
    <div class="line"></div>
    <div class="box" :class="{'box-active':weekArr[2]}">周三</div>
    <div class="line"></div>
    <div class="box" :class="{'box-active':weekArr[3]}">周四</div>
    <div class="line"></div>
    <div class="box" :class="{'box-active':weekArr[4]}">周五</div>
    <div class="line"></div>
    <div class="box" :class="{'box-active':weekArr[5]}">周六</div>
    <div class="line"></div>
    <div class="box" :class="{'box-active':weekArr[6]}">周日</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      weekArr: {
        type: Array,
        default: [0, 0, 0, 0, 0, 0]
      }
    },
    data () {
      return {}
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .weekbar-component
    width: 100%
    height: 100px
    padding: 30px 0
    div
      display inline-block
      transition all .5s
    &>span
      font-size 14px
    .line
      width: 5%
      border-bottom 1px solid #169bd5
      position relative
      top: -5px
    .box
      width: 7%
      border: 1px solid #169bd5
      height: 30px
      text-align center
      line-height 30px
      color: #169bd5
      font-size 14px
    .box-active
      background #169bd5
      color: #fff
</style>
