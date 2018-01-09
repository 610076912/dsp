<template>
  <div class="weekbar-component">
    <span>周期</span>
    <div class="line"></div>
    <div class="box" :class="{'box-active':weekArr[0], 'disabled': !canClick}" @click="clickWeek(0)">周一</div>
    <div class="line"></div>
    <div class="box" :class="{'box-active':weekArr[1], 'disabled': !canClick}" @click="clickWeek(1)">周二</div>
    <div class="line"></div>
    <div class="box" :class="{'box-active':weekArr[2], 'disabled': !canClick}" @click="clickWeek(2)">周三</div>
    <div class="line"></div>
    <div class="box" :class="{'box-active':weekArr[3], 'disabled': !canClick}" @click="clickWeek(3)">周四</div>
    <div class="line"></div>
    <div class="box" :class="{'box-active':weekArr[4], 'disabled': !canClick}" @click="clickWeek(4)">周五</div>
    <div class="line"></div>
    <div class="box" :class="{'box-active':weekArr[5], 'disabled': !canClick}" @click="clickWeek(5)">周六</div>
    <div class="line"></div>
    <div class="box" :class="{'box-active':weekArr[6], 'disabled': !canClick}" @click="clickWeek(6)">周日</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      pWeekArr: {
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
        weekArr: this.pWeekArr
      }
    },
    watch: {
      'pWeekArr': function (val) {
        this.weekArr = val
      }
    },
    methods: {
      clickWeek (data) {
        if (!this.canClick) return
        this.$set(this.weekArr, data, this.weekArr[data] === 1 ? 0 : 1)
      }
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
      width: 4%
      border-bottom 1px solid #169bd5
      position relative
      top: -5px
    .box
      width: 8.8%
      border: 1px solid #169bd5
      height: 25px
      text-align center
      line-height 25px
      color: #169bd5
      font-size 14px
      cursor pointer
    .box-active
      background #169bd5
      color: #fff
    .disabled
      cursor not-allowed
</style>
