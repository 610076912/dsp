<template>
  <div class="creat-new2">
    <setps :active="1"></setps>
    <div class="content">
      <creat-header title="场景化投放设置" text="场景投放"></creat-header>
      <div class="target-wrap">
        <module-header-compoent title="广告目标选择（单选）"></module-header-compoent>
        <div class="checkbox-wrap">
          <el-checkbox-group v-model="checkList" :max="2" @change="checkChange">
            <el-checkbox v-for="item in checkData" :label="item" :key="item"></el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div class="target-con">
        <div class="target-con-top">
          <module-header-compoent title="场景化内容推荐（多选）"></module-header-compoent>
        </div>
        <div class="target-con-bottom">
          <module-header-compoent title="查看全部内容"></module-header-compoent>
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
  import setps from './steps-component.vue'
  import header from './header-component.vue'
  import moduleHeaderCompoent from './module-header-component'

  export default {
    data () {
      return {
        checkData: ['上海', '北京', '广州', '深圳'],
        checkList: []
      }
    },
    methods: {
      checkChange (event) {
        // 使其变为单选
        if (event.length === 2) {
          this.$set(this.checkList, event.splice(0, 1))
        }
        console.log(this.checkList)
      },
      checkall () {
        console.log(111)
      },
      // 下一步
      nextStep () {
        this.$router.push('/creatTime')
      },
      back () {
        this.$router.go(-1)
      }
    },
    components: {
      setps,
      'creat-header': header,
      'module-header-compoent': moduleHeaderCompoent
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .creat-new2 {

    .content {
      width: 100%;
      overflow: hidden;
      padding: 15px 30px;
      padding-bottom: 30px;
      border-bottom: 1px solid #cacaca;
      .target-wrap {
        width: 340px;
        height: 700px;
        background: #f9f9f9;
        padding: 20px 30px;
        float: left;
        .checkbox-wrap {
          width: 100%;
          max-height: 90%;
          overflow-y: auto;
          &::-webkit-scrollbar {
            width: 0;
          }
          .el-checkbox {
            width: 100%;
            height: 40px;
            border: 1px solid #cacaca;
            border-bottom: none;
            margin-left: 0;
            line-height: 40px;
            background: #fff;
            &:nth-last-child(1) {
              border-bottom: 1px solid #cacaca;
            }
            .el-checkbox__input {
              position: relative;
              left: 210px;
            }
          }
        }
      }
      .target-con {
        float: left;
        width: 800px;
        padding: 20px 30px;
        border: 1px solid #f9f9f9;
        border-left: none;
        .target-con-top {
          min-height: 338px;
        }
        .target-con-bottom {
          min-height: 300px;
        }
      }
    }

  }
</style>
