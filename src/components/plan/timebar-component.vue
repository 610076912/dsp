<template>
  <div class="time-bar-component">
    <div class="left">
      <span>上午</span>
      <!--<div class="left-line" :class="{'time-bar-line':timeArr[0]}"></div>-->
    </div>
    <div class="time-bar-content">
      <div class="circel">0</div>
      <div class="line" :class="{'time-bar-line':timeArr[0]}" @click="clickTime(0)">
        <span v-show="timeArr[0]"></span>
      </div>
      <div class="circel">1</div>
      <div class="line" :class="{'time-bar-line':timeArr[1]}" @click="clickTime(1)">
        <span v-show="timeArr[1]"></span>
      </div>
      <div class="circel">2</div>
      <div class="line" :class="{'time-bar-line':timeArr[2]}" @click="clickTime(2)">
        <span v-show="timeArr[2]"></span>
      </div>
      <div class="circel">3</div>
      <div class="line" :class="{'time-bar-line':timeArr[3]}" @click="clickTime(3)">
        <span v-show="timeArr[3]"></span>
      </div>
      <div class="circel">4</div>
      <div class="line" :class="{'time-bar-line':timeArr[4]}" @click="clickTime(4)">
        <span v-show="timeArr[4]"></span>
      </div>
      <div class="circel">5</div>
      <div class="line" :class="{'time-bar-line':timeArr[5]}" @click="clickTime(5)">
        <span v-show="timeArr[5]"></span>
      </div>
      <div class="circel">6</div>
      <div class="line" :class="{'time-bar-line':timeArr[6]}" @click="clickTime(6)">
        <span v-show="timeArr[6]"></span>
      </div>
      <div class="circel">7</div>
      <div class="line" :class="{'time-bar-line':timeArr[7]}" @click="clickTime(7)">
        <span v-show="timeArr[7]"></span>
      </div>
      <div class="circel">8</div>
      <div class="line" :class="{'time-bar-line':timeArr[8]}" @click="clickTime(8)">
        <span v-show="timeArr[8]"></span>
      </div>
      <div class="circel">9</div>
      <div class="line" :class="{'time-bar-line':timeArr[9]}" @click="clickTime(9)">
        <span v-show="timeArr[9]"></span>
      </div>
      <div class="circel">10</div>
      <div class="line" :class="{'time-bar-line':timeArr[10]}" @click="clickTime(10)">
        <span v-show="timeArr[10]"></span>
      </div>
      <div class="circel">11</div>
      <div class="line" :class="{'time-bar-line':timeArr[11]}" @click="clickTime(11)">
        <span v-show="timeArr[11]"></span>
      </div>
      <div class="circel">12</div>
    </div>
    <div class="left">
      <span>下午</span>
      <!--<div class="left-line" :class="{'time-bar-line':timeArr[12]}"></div>-->
    </div>
    <div class="time-bar-content">
      <div class="circel">0</div>
      <div class="line" :class="{'time-bar-line':timeArr[12]}" @click="clickTime(12)">
        <span v-show="timeArr[12]"></span>
      </div>
      <div class="circel">1</div>
      <div class="line" :class="{'time-bar-line':timeArr[13]}" @click="clickTime(13)">
        <span v-show="timeArr[13]"></span>
      </div>
      <div class="circel">2</div>
      <div class="line" :class="{'time-bar-line':timeArr[14]}" @click="clickTime(14)">
        <span v-show="timeArr[14]"></span>
      </div>
      <div class="circel">3</div>
      <div class="line" :class="{'time-bar-line':timeArr[15]}" @click="clickTime(15)">
        <span v-show="timeArr[15]"></span>
      </div>
      <div class="circel">4</div>
      <div class="line" :class="{'time-bar-line':timeArr[16]}" @click="clickTime(16)">
        <span v-show="timeArr[16]"></span>
      </div>
      <div class="circel">5</div>
      <div class="line" :class="{'time-bar-line':timeArr[17]}" @click="clickTime(17)">
        <span v-show="timeArr[17]"></span>
      </div>
      <div class="circel">6</div>
      <div class="line" :class="{'time-bar-line':timeArr[18]}" @click="clickTime(18)">
        <span v-show="timeArr[18]"></span>
      </div>
      <div class="circel">7</div>
      <div class="line" :class="{'time-bar-line':timeArr[19]}" @click="clickTime(19)">
        <span v-show="timeArr[19]"></span>
      </div>
      <div class="circel">8</div>
      <div class="line" :class="{'time-bar-line':timeArr[20]}" @click="clickTime(20)">
        <span v-show="timeArr[20]"></span>
      </div>
      <div class="circel">9</div>
      <div class="line" :class="{'time-bar-line':timeArr[21]}" @click="clickTime(21)">
        <span v-show="timeArr[21]"></span>
      </div>
      <div class="circel">10</div>
      <div class="line" :class="{'time-bar-line':timeArr[22]}" @click="clickTime(22)">
        <span v-show="timeArr[22]"></span>
      </div>
      <div class="circel">11</div>
      <div class="line" :class="{'time-bar-line':timeArr[23]}" @click="clickTime(23)">
        <span v-show="timeArr[23]"></span>
      </div>
      <div class="circel">12</div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  // let data = [0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0]
  export default {
    props: {
      pTimeArr: {
        type: Array,
        default () {
          return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
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
      'pTimeArr': function (val) {
        this.timeArr = val
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
      margin-top: 80px
      text-align center
      .left-line
        width: 60%
        border-bottom 1px dashed #169bd5
        position absolute
        top 14px
        left 28px
      .time-bar-line
        border-bottom-style solid
    .time-bar-content
      position relative
      width: 93%
      div
        float left
      .circel
        width 22px
        height: 22px
        border-radius: 50%
        border: 1px solid #c9c9c9
        text-align center
        line-height 20px
        background #f2f2f2
      .line
        width: 5%
        height: 8px;
        border 1px dashed #c9c9c9
        position relative
        top: 7px
        border-left: 0
        border-right 0
        padding-left: 1.5px
        cursor pointer
        span
          display: inline-block
          width: 90%
          height: 2px
          background #169bd5
          position: absolute
          top: 2px
      .time-bar-line
        border-style solid
        background #f2f2f2
      .disabled
        cursor not-allowed
</style>
