<template>
  <div class="time-bar-component">
    <div class="left">
      <span>AM</span>
      <div class="left-line" :class="{'time-bar-line':timeArr[0]}"></div>
    </div>
    <div class="time-bar-content">
      <div class="circel" :class="{'time-bar-circel':timeArr[0] || timeArr[1]}">1</div>
      <div class="line" :class="{'time-bar-line':timeArr[1]}"></div>
      <div class="circel" :class="{'time-bar-circel':timeArr[1] || timeArr[2]}">2</div>
      <div class="line" :class="{'time-bar-line':timeArr[2]}"></div>
      <div class="circel" :class="{'time-bar-circel':timeArr[2] || timeArr[3]}">3</div>
      <div class="line" :class="{'time-bar-line':timeArr[3]}"></div>
      <div class="circel" :class="{'time-bar-circel':timeArr[3] || timeArr[4]}">4</div>
      <div class="line" :class="{'time-bar-line':timeArr[4]}"></div>
      <div class="circel" :class="{'time-bar-circel':timeArr[4] || timeArr[5]}">5</div>
      <div class="line" :class="{'time-bar-line':timeArr[5]}"></div>
      <div class="circel" :class="{'time-bar-circel':timeArr[5] || timeArr[6]}">6</div>
      <div class="line" :class="{'time-bar-line':timeArr[6]}"></div>
      <div class="circel" :class="{'time-bar-circel':timeArr[6] || timeArr[7]}">7</div>
      <div class="line" :class="{'time-bar-line':timeArr[7]}"></div>
      <div class="circel" :class="{'time-bar-circel':timeArr[7] || timeArr[8]}">8</div>
      <div class="line" :class="{'time-bar-line':timeArr[8]}"></div>
      <div class="circel" :class="{'time-bar-circel':timeArr[8] || timeArr[9]}">9</div>
      <div class="line" :class="{'time-bar-line':timeArr[9]}"></div>
      <div class="circel" :class="{'time-bar-circel':timeArr[9] || timeArr[10]}">10</div>
      <div class="line" :class="{'time-bar-line':timeArr[10]}"></div>
      <div class="circel" :class="{'time-bar-circel':timeArr[10] || timeArr[11]}">11</div>
      <div class="line" :class="{'time-bar-line':timeArr[11]}"></div>
      <div class="circel" :class="{'time-bar-circel':timeArr[11]}">12</div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  // let data = [0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0]
  export default {
    props: {
      timeArr: {
        type: Array,
        default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    },
    data () {
      return {}
    },
    watch: {
      data: function () {

      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .time-bar-component
    width: 100%
    min-width 720px
    height: 100px
    padding: 35px 0px
    div
      display inline-block
      font-size 14px
      transition all .5s
    .left
      width 6%
      position relative
      top: -6px
      .left-line
        width: 60%
        border-bottom 2px dashed #169bd5
        position absolute
        top 8px
      .time-bar-line
        border-bottom-style solid
    .time-bar-content
      position relative
      width: 93%
      div
        float left
        margin-left: 3px
      .circel
        width 20px
        height: 20px
        -webkit-border-radius: 50%
        -moz-border-radius: 50%
        border-radius: 50%
        border: 1px solid #169bd5
        text-align center
        line-height 20px
      .line
        width: 4.9%
        border-bottom 2px dashed #169bd5
        position relative
        top: 9px
      .time-bar-line
        border-bottom-style solid
      .time-bar-circel
        background #169bd5
        color: #fff
</style>
