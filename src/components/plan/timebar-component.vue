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
    <div class="left">
      <span>PM</span>
      <div class="left-line" :class="{'time-bar-line':timeArr[12]}"></div>
    </div>
    <div class="time-bar-content">
      <div class="circel" :class="{'time-bar-circel':timeArr[12] || timeArr[13]}">1</div>
      <div class="line" :class="{'time-bar-line':timeArr[13]}"></div>
      <div class="circel" :class="{'time-bar-circel':timeArr[13] || timeArr[14]}">2</div>
      <div class="line" :class="{'time-bar-line':timeArr[14]}"></div>
      <div class="circel" :class="{'time-bar-circel':timeArr[14] || timeArr[15]}">3</div>
      <div class="line" :class="{'time-bar-line':timeArr[15]}"></div>
      <div class="circel" :class="{'time-bar-circel':timeArr[15] || timeArr[16]}">4</div>
      <div class="line" :class="{'time-bar-line':timeArr[16]}"></div>
      <div class="circel" :class="{'time-bar-circel':timeArr[16] || timeArr[17]}">5</div>
      <div class="line" :class="{'time-bar-line':timeArr[17]}"></div>
      <div class="circel" :class="{'time-bar-circel':timeArr[17] || timeArr[18]}">6</div>
      <div class="line" :class="{'time-bar-line':timeArr[18]}"></div>
      <div class="circel" :class="{'time-bar-circel':timeArr[18] || timeArr[19]}">7</div>
      <div class="line" :class="{'time-bar-line':timeArr[19]}"></div>
      <div class="circel" :class="{'time-bar-circel':timeArr[19] || timeArr[20]}">8</div>
      <div class="line" :class="{'time-bar-line':timeArr[20]}"></div>
      <div class="circel" :class="{'time-bar-circel':timeArr[20] || timeArr[21]}">9</div>
      <div class="line" :class="{'time-bar-line':timeArr[21]}"></div>
      <div class="circel" :class="{'time-bar-circel':timeArr[21] || timeArr[22]}">10</div>
      <div class="line" :class="{'time-bar-line':timeArr[22]}"></div>
      <div class="circel" :class="{'time-bar-circel':timeArr[22] || timeArr[23]}">11</div>
      <div class="line" :class="{'time-bar-line':timeArr[23]}"></div>
      <div class="circel" :class="{'time-bar-circel':timeArr[23]}">12</div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  // let data = [0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0]
  export default {
    props: {
      timeArr: {
        type: Array,
        default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
    height: 330px
    padding: 35px 0px
    div
      display inline-block
      font-size 14px
      transition all .5s
    .left
      width 6%
      position relative
      top: -6px
      margin-top:80px
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
