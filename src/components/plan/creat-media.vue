<template>
  <div class="creat-media">
    <steps :active="2"></steps>
    <div class="creat-media-content">
      <creat-header title="媒体定向" text="直投媒体"></creat-header>
      <div class="media-wrap">
        <div class="item-wrap">
          <img src="../../assets/img/aiqiyi.png" alt="">
          <el-checkbox></el-checkbox>
        </div>
        <div class="item-wrap">
          <img src="../../assets/img/aiqiyi.png" alt="">
          <el-checkbox></el-checkbox>
        </div>
        <div class="item-wrap">
          <img src="../../assets/img/aiqiyi.png" alt="">
          <el-checkbox></el-checkbox>
        </div>
        <div class="item-wrap all-checked">
          全选
          <el-checkbox></el-checkbox>
        </div>
      </div>
    </div>
    <div class="button-wrap">
      <el-button @click="back">返回</el-button>
      <el-button class="next-btn" type="primary" @click="nextStep">下一步</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import steps from './steps-component.vue'
  import header from './header-component.vue'

  export default {
    name: 'creatMedia',
    data () {
      return {}
    },
    created () {
      // 通知父组件，使自己重新缓存
    },
    methods: {
      // 下一步
      nextStep () {
        this.$router.push('/creatMediaType')
      },
      back () {
        this.$router.go(-1)
      }
    },
    components: {
      steps,
      'creat-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .creat-media {
    .creat-media-content {
      width: 100%;
      padding: 0 30px;
      border-bottom: 1px solid #e4e4e4;
      .media-wrap {
        width: 100%;
        min-height: 250px;
        position: relative;
        padding: 10px 0;
        overflow: hidden;
        margin-bottom: 70px;
        padding-bottom: 60px;
        .item-wrap {
          width: 23%;
          height: 60px;
          float: left;
          margin-right: 30px;
          border: 1px solid #e4e4e4;
          margin-bottom: 24px;
          img {
            width: 85%;
            height: 100%;
          }
          &:nth-child(4n) {
            margin-right: 0;
          }
        }
        .all-checked {
          width: 100px;
          text-align center;
          line-height 60px;
          label {
            margin-left: 15px;
          }
        }
      }
    }
  }


</style>
