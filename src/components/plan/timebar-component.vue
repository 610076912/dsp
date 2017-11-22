<template>
  <div class="time-bar-component">
    <div class="left">
      <span>AM</span>
      <div class="left-line" :class="{'time-bar-line':timeArr[0]}"></div>
    </div>
    <div class="time-bar-content">
      <div class="circel" :class="{'time-bar-circel':timeArr[0] || timeArr[1]}" @click="clickTime(0)">1</div>
      <div class="line" :class="{'time-bar-line':timeArr[1]}"></div>
      <div class="circel" :class="{'time-bar-circel':timeArr[1] || timeArr[2]}" @click="clickTime(1)">2</div>
      <div class="line" :class="{'time-bar-line':timeArr[2]}"></div>
      <div class="circel" :class="{'time-bar-circel':timeArr[2] || timeArr[3]}" @click="clickTime(2)">3</div>
      <div class="line" :class="{'time-bar-line':timeArr[3]}"></div>
      <div class="circel" :class="{'time-bar-circel':timeArr[3] || timeArr[4]}" @click="clickTime(3)">4</div>
      <div class="line" :class="{'time-bar-line':timeArr[4]}"></div>
      <div class="circel" :class="{'time-bar-circel':timeArr[4] || timeArr[5]}" @click="clickTime(4)">5</div>
      <div class="line" :class="{'time-bar-line':timeArr[5]}"></div>
      <div class="circel" :class="{'time-bar-circel':timeArr[5] || timeArr[6]}" @click="clickTime(5)">6</div>
      <div class="line" :class="{'time-bar-line':timeArr[6]}"></div>
      <div class="circel" :class="{'time-bar-circel':timeArr[6] || timeArr[7]}" @click="clickTime(6)">7</div>
      <div class="line" :class="{'time-bar-line':timeArr[7]}"></div>
      <div class="circel" :class="{'time-bar-circel':timeArr[7] || timeArr[8]}" @click="clickTime(7)">8</div>
      <div class="line" :class="{'time-bar-line':timeArr[8]}"></div>
      <div class="circel" :class="{'time-bar-circel':timeArr[8] || timeArr[9]}" @click="clickTime(8)">9</div>
      <div class="line" :class="{'time-bar-line':timeArr[9]}"></div>
      <div class="circel" :class="{'time-bar-circel':timeArr[9] || timeArr[10]}" @click="clickTime(9)">10</div>
      <div class="line" :class="{'time-bar-line':timeArr[10]}"></div>
      <div class="circel" :class="{'time-bar-circel':timeArr[10] || timeArr[11]}" @click="clickTime(10)">11</div>
      <div class="line" :class="{'time-bar-line':timeArr[11]}"></div>
      <div class="circel" :class="{'time-bar-circel':timeArr[11]}" @click="clickTime(11)">12</div>
    </div>
    <div class="left">
      <span>PM</span>
      <div class="left-line" :class="{'time-bar-line':timeArr[12]}"></div>
    </div>
    <div class="time-bar-content">
      <div class="circel" :class="{'time-bar-circel':timeArr[12] || timeArr[13]}" @click="clickTime(12)">1</div>
      <div class="line" :class="{'time-bar-line':timeArr[13]}"></div>
      <div class="circel" :class="{'time-bar-circel':timeArr[13] || timeArr[14]}" @click="clickTime(13)">2</div>
      <div class="line" :class="{'time-bar-line':timeArr[14]}"></div>
      <div class="circel" :class="{'time-bar-circel':timeArr[14] || timeArr[15]}" @click="clickTime(14)">3</div>
      <div class="line" :class="{'time-bar-line':timeArr[15]}"></div>
      <div class="circel" :class="{'time-bar-circel':timeArr[15] || timeArr[16]}" @click="clickTime(15)">4</div>
      <div class="line" :class="{'time-bar-line':timeArr[16]}"></div>
      <div class="circel" :class="{'time-bar-circel':timeArr[16] || timeArr[17]}" @click="clickTime(16)">5</div>
      <div class="line" :class="{'time-bar-line':timeArr[17]}"></div>
      <div class="circel" :class="{'time-bar-circel':timeArr[17] || timeArr[18]}" @click="clickTime(17)">6</div>
      <div class="line" :class="{'time-bar-line':timeArr[18]}"></div>
      <div class="circel" :class="{'time-bar-circel':timeArr[18] || timeArr[19]}" @click="clickTime(18)">7</div>
      <div class="line" :class="{'time-bar-line':timeArr[19]}"></div>
      <div class="circel" :class="{'time-bar-circel':timeArr[19] || timeArr[20]}" @click="clickTime(19)">8</div>
      <div class="line" :class="{'time-bar-line':timeArr[20]}"></div>
      <div class="circel" :class="{'time-bar-circel':timeArr[20] || timeArr[21]}" @click="clickTime(20)">9</div>
      <div class="line" :class="{'time-bar-line':timeArr[21]}"></div>
      <div class="circel" :class="{'time-bar-circel':timeArr[21] || timeArr[22]}" @click="clickTime(21)">10</div>
      <div class="line" :class="{'time-bar-line':timeArr[22]}"></div>
      <div class="circel" :class="{'time-bar-circel':timeArr[22] || timeArr[23]}" @click="clickTime(22)">11</div>
      <div class="line" :class="{'time-bar-line':timeArr[23]}"></div>
      <div class="circel" :class="{'time-bar-circel':timeArr[23]}" @click="clickTime(23)">12</div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  // let data = [0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0]
  export default {
    props: {
      pTimeArr: {
        type: Array,
        default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
      canClick: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        timeArr: this.pTimeArr
      }
    },
    watch: {
      data: function () {
      }
    },
    methods: {
      clickTime (data) {
        if (!this.canClick) return
        this.$set(this.timeArr, data, this.timeArr[data] === 1 ? 0 : 1)
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
        cursor pointer
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
