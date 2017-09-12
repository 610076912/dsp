<template>
  <div id="creatpreview">
    <steps :active="4"></steps>
    <div class="basic cons">
      <p class="head"><span>基本信息</span><b>编辑信息</b></p>
      <el-row class="row">
        <el-col :span="8"><span>推广计划名称: </span><span></span></el-col>
        <el-col :span="8"><span>投放日期: </span><span></span></el-col>
        <el-col :span="8"><span>移动到组: </span><span></span></el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="8"><span>计划每日预算: </span><span></span></el-col>
        <el-col :span="8"><span>计划总预算: </span><span></span></el-col>
      </el-row>
    </div>
    <div class="scene cons">
      <p class="head"><span>场景化投放设置</span><b>编辑信息</b></p>
    </div>
    <div class="target cons">
      <p class="head"><span>场景化投放设置</span><b>编辑信息</b></p>
      <div class="box">
        <p class="minhead"><span>广告目标</span></p>
        <div class="label">
          <span class="labels">汽车</span>
        </div>
      </div>
      <div class="box">
        <p class="minhead"><span>场景化内容</span></p>
        <div class="label">
          <span class="labels">赛车</span>
        </div>
      </div>
    </div>
    <div class="date cons">
      <p class="head"><span>投放时间</span><b>编辑信息</b></p>
      <div class="box">
        <p class="minhead"><span>小时</span></p>
        <div class="label">
          <span class="labels">00:00</span>
        </div>
      </div>
      <div class="box">
        <p class="minhead"><span>星期</span></p>
        <div class="label">
          <span class="labels">周一</span>
        </div>
      </div>
    </div>
    <div class="position cons">
      <p class="head"><span>地理位置定向</span><b>编辑信息</b></p>
      <div class="box">
        <p class="minhead"><span>按地区</span></p>
        <div class="label">
          <span class="labels">北京</span>
          <span class="labels">天津</span>
        </div>
      </div>
    </div>
    <div class="media cons">
      <p class="head"><span>媒体定向</span><b>编辑信息</b></p>
      <div class="box">
        <div class="label">
          <span class="labels">百度</span>
          <span class="labels">爱奇艺</span>
        </div>
      </div>
    </div>
    <div class="episode cons">
      <p class="head"><span>剧集定向</span><b>编辑信息</b></p>
      <div class="box">
        <div class="label">
          <span class="labels">电影</span>
          <span class="labels">电视剧</span>
        </div>
      </div>
    </div>
    <div class="strategy cons">
      <p class="head"><span>投放策略</span><b>编辑信息</b></p>
      <div class="box">
        <div class="bar">
          <div class="title">投放频次:</div>
          <div class="block">
            <el-radio v-model="radio" label="true"> 不控制频次</el-radio>
            <p><i class="el-icon-information"></i> 针对移动设备部控制投放频次</p>
          </div>
        </div>
        <div class="bar">
          <div class="title">投放速度:</div>
          <div class="block">
            <el-radio v-model="radio" label="true"> 快速投放</el-radio>
            <p><i class="el-icon-information"></i> 在较短的时间内获取最大的曝光量</p>
          </div>
        </div>
        <div class="bar">
          <div class="title">计费类型:</div>
          <div class="block">
            <el-radio v-model="radio" label="true"> 按照曝光计费（CPM）</el-radio>
            <p><i class="el-icon-information"></i> 每千次有效展示的成本</p>
          </div>
        </div>
        <div class="bar">
          <div class="title">推广出价:</div>
          <div class="inp">
            <span>10</span>
            <span>元</span>
          </div>
        </div>
      </div>
    </div>
    <div class="button-wrap">
      <el-button @click="back">返回</el-button>
      <el-button @click="finish">完成</el-button>
      <el-button type="primary" @click="finishto">完成并上传广告素材</el-button>
    </div>
  </div>
</template>

<script>
  import steps from './steps-component.vue'

  export default {
    name: 'creatPreview',
    data () {
      return {
        radio: 'true'
      }
    },
    created () {
      // 通知父组件，使自己重新缓存
    },
    methods: {
      back () {
        this.$router.go(-1)
      },
      finish () {
        console.log('complete')
      },
      finishto () {
        console.log('finishto')
        this.$router.push('/creatMaterial')
      }
    },
    components: {
      steps
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  #creatpreview {
    .cons {
      width: 1170px
      margin-left: 30px
      padding-top: 20px
    }
    .head {
      width: 1140px
      height: 38px
      border-bottom: 1px solid #e4e4e4
      margin-bottom: 20px

      span {
        display: inline-block
        border-bottom: 2px solid #169bd5
        font-size: 14px
        line-height: 36px
        float: left
      }
      b {
        float: right
        padding-top: 14px
        font-weight: normal
        color: #169bd5
      }
    }
    .row {
      width: 100%
      line-height: 30px
    }
    .box {
      width: 100%
      line-height: 30px
      margin-bottom: 20px

      .minhead {
        line-height: 36px

        span {
          display: inline-block
          border-bottom: 2px solid #169bd5
        }
      }
      .label {
        width: 100%
        font-size: 0

        .labels {
          display: inline-block
          width: 86px
          height: 44px
          text-align: center
          line-height: 44px
          background: #fcfcfc
          margin: 10px 10px 0 0
          font-size: 12px
        }
      }
      .bar {
        width: 100%
        height: 80px
        margin-bottom: 60px
        &:nth-last-of-type(1) {
          margin-bottom: 0;
        }
        .title {
          width: 120px
          height: 100%
          float: left
        }
        .block {
          width: 340px
          height: 100%
          border: 1px solid #f2f2f2
          float: left
          padding: 10px 0 0 20px

          p {
            color: #cccccc

            i {
              padding: 0 10px 0 20px
              color: #ff4e00
            }
          }
        }
        .inp {

        }
      }
    }
    .button-wrap {
      border-top: 1px solid #e4e4e4;
    }
  }
</style>
