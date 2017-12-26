<template>
  <div class="timeBucket">
    <p class="header">时段分析</p>
    <div class="nav">
      <div class="navname">时段分析数据</div>
    </div>

    <div class="content">

    </div>
  </div>
</template>
<script>
export default {
  name: '时段分析',
  data () {
    return {
      msg: 'Time Bucket',
      activeName: 'first'
    }
  },
  methods: {
    handleClick () {

    }
  }
}
</script>
<style lang="stylus">
.timeBucket {
  .header {
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    padding: 0 28px;
  }

  .tab {
    background: #f9f9f9;
  }

  .nav {
    height: 44px;
    line-height: 46px
    border-bottom 2px solid #4a9cd3
    .navname {
      height 100%;
      width 150px;
      color #fff;
      border-radius: 6px 6px 0 0
      background #4a9cd3
      text-align center
      font-size: 16px
    }
  }

  .content {

  }
}
</style>
