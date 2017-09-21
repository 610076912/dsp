<template>
  <div class="ads flash2">
    <div class="ad-style"><img src="/static/img/flash210x60.png" alt=""></div>
    <div class="ad-edit" v-show="isShow.flash2">
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
          <el-input placeholder="请输入内容" v-model="adContent.flash2.url" size="small">
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
        this.adContent.flash2.position = position
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
          this.changePosition(val.flash2.position)
        },
        deep: true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">

</style>
