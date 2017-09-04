<template>
  <div class="plan">
    <div class="plan-nav">
      <span class="position">当前位置：</span>
      <span>推广计划 > {{navText}}</span>
    </div>
    <div class="plan-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'plan',
    data () {
      return {
        navText: '推广活动'
      }
    },
    metched: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .plan {
    width: 100%;
    padding-top: 20px;
    margin-bottom: 60px;
    .plan-content {
      background: #fff;
      margin-top: 15px;
      height: 100%;
    }
  }
</style>
