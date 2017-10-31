<template>
  <div class="ads flash1">
    <div class="ad-style"><img src="../../../static/img/flash150x150.png" alt=""></div>
    <div class="ad-edit" v-show="isShow.flash1">
      <div class="flash"></div>
      <div class="ad-con">
        <div class="ad-title">*Flash规范：格式fla、目标Flash Player17、脚本ActionScript3.0、大小200K</div>
        <div class="ad-position">
          <span>广告位置</span>
          <span :class="{ checked: flashPosition[0] }" @click="changePosition('left')">屏幕居左</span>
          <span :class="{ checked: flashPosition[1] }" @click="changePosition('center')">屏幕居中</span>
          <span :class="{ checked: flashPosition[2] }" @click="changePosition('right')">屏幕居右</span>
        </div>
        <div class="ad-url">
          <el-input placeholder="请输入内容" v-model="adContent.flash1.url" size="small">
            <template slot="prepend">跳转链接</template>
          </el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        flashPosition: [false, false, false]
      }
    },
    props: ['isShow', 'adContent'],
    methods: {
      changePosition (position) {
        this.adContent.flash1.position = position
        switch (position) {
          case 'left':
            this.flashPosition = [true, false, false]
            break
          case 'center':
            this.flashPosition = [false, true, false]
            break
          case 'right':
            this.flashPosition = [false, false, true]
            break
        }
      }
    },
    watch: {
      // 监听模板数据变化
      adContent: {
        handler: function (val) {
          this.changePosition(val.flash1.position)
        },
        deep: true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .ads{
    .flash{
      width: 148px
      height: 148px
      border: 1px solid #e4e4e4
      float: left
      background: #ffffff
    }
    .ad-con{
      width: 327px
      height: 150px
      float: left
      margin-left: 25px

      .ad-title{
        width: 100%
        height: 70px
      }
      .ad-position,.ad-url{
        width: 100%
        height: 30px
        margin-top: 10px
      }
      .ad-position{
        border: 1px solid #e4e4e4
        span{
          display: inline-block
          width: 81px
          height: 100%
          border-left: 1px solid #e4e4e4
          text-align: center
          line-height: 28px
          background: #f9fafc
          float: left
        }
        span:first-of-type{
          cursor: inherit
          border: none
          background: #ffffff
        }
        span.checked{
          border: 1px solid #169bd5
        }
      }
    }
  }
</style>
