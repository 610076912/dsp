<template>
  <div class="creat-new2">
    <setps :active="1"></setps>
    <div class="content">
      <creat-header title="场景化投放设置" text="场景投放"></creat-header>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import setps from './steps-component.vue'
  import header from './header-component.vue'

  export default {
    data () {
      return {}
    },
    components: {
      setps,
      'creat-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .creat-new2 {

    .content {
      width: 100%;
      overflow: hidden;
      padding: 10px 20px;
    }
  }
</style>
