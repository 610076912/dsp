<template>
  <div class="creat-strategy">
    <steps :active="3"></steps>
    <div class="creat-strategy-content">
      <div class="bar">
        <div class="title">投放频次:</div>
        <div class="block">
          <el-radio v-model="times" :label="0" disabled> 不控制频次</el-radio>
          <p><i class="el-icon-information"></i> 针对移动设备部控制投放频次</p>
        </div>
        <div class="block">
          <el-radio v-model="times" :label="1" disabled> 自定义频次</el-radio>
          <p><i class="el-icon-information"></i> 每天每个设备曝光
            <el-input :maxlength="3" :disabled="inputStatus" type="number"></el-input>
            次
          </p>
        </div>
      </div>
      <div class="bar">
        <div class="title">投放速度:</div>
        <div class="block">
          <el-radio v-model="speed" :label="0" disabled> 快速投放</el-radio>
          <p><i class="el-icon-information"></i> 在较短的时间段内换取最大的曝光量</p>
        </div>
        <div class="block">
          <el-radio v-model="speed" :label="1" disabled> 均匀投放</el-radio>
          <p><i class="el-icon-information"></i> 将预算划分到当天的每个小时，均匀投放</p>
        </div>
      </div>
      <div class="bar">
        <div class="title">计费类型:</div>
        <div class="block">
          <el-radio v-model="priceType" :label="0" disabled> 按照曝光计费（CPM）</el-radio>
          <p><i class="el-icon-information"></i> 每千次有效展示的成本</p>
        </div>
        <div class="block">
          <el-radio v-model="priceType" :label="1" disabled> 按点击计费</el-radio>
          <p><i class="el-icon-information"></i> 每次点击的有效成本</p>
        </div>
      </div>
      <div class="price-wrap">
        <div class="title">推广出价:</div>
        <el-input disabled><template slot="append">元</template></el-input>
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

  export default {
    name: 'creatStrategy',
    data () {
      return {
        times: 0,
        speed: 1,
        priceType: 0,
        // 自定义频次输入框状态
        inputStatus: true,
        // 是否为修改状态
        isEdit: false
      }
    },
    created () {
      // 判断vuex数据
      let initData = this.$store.state.creatData.creatStrategy
      if (initData) {
        this.times = initData.times
        this.speed = initData.speed
        this.priceType = initData.priceType
        this.isEdit = true
      } else if (this.$store.state.creatData.planId) {
        this.$http.get('/api2/get_strategy_plan', {
          params: {
            plan_id: this.$store.state.creatData.planId
          }
        }).then(res => {
          // console.log(res)
          if (res.code === 200) {
            this.times = res.data.frequency
            this.speed = res.data.casttype
            this.priceType = res.data.billing
            this.isEdit = true
            // 存vuex
            this.$store.commit('STRATEGY', {
              times: this.times,
              speed: this.speed,
              priceType: this.priceType
            })
          }
        })
      }
    },
    watch: {
      // 自定义频次输入框禁用
      'times' (val) {
        this.inputStatus = (val !== 1)
      }
    },
    methods: {
      // 下一步
      nextStep () {
        let url = '/api2/add_strategy_plan'
        if (this.isEdit) {
          url = '/api2/upd_strategy_plan'
        }
        this.$http.post(url, {
          plan_id: this.$store.state.creatData.planId,
          frequency: this.times,
          casttype: this.speed,
          billing: this.priceType
        }).then(res => {
          if (res.code === 200) {
            this.$store.commit('STRATEGY', {
              times: this.times,
              speed: this.speed,
              priceType: this.priceType
            })
            this.$router.push('/creatMaterial')
          }
        })
      },
      back () {
        this.$router.go(-1)
      }
    },
    components: {
      steps
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .creat-strategy {
    .creat-strategy-content {
      padding: 20px 30px;
      height: 560px;
      border-bottom: 1px solid #e4e4e4;
      .bar {
        width: 100%
        height: 80px
        margin-bottom: 60px
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
          &:nth-child(3n) {
            margin-left: 20px;
          }
          p {
            color: #cccccc

            i {
              padding: 0 10px 0 20px
              color: #ff4e00
            }
          }
          .el-input {
            width: 50px;
            display inline-block;
            .el-input__inner {
              height: 30px;
            }
          }
        }
      }
    }
    .price-wrap {
      .title {
        width: 120px
        height: 100%
        float: left
      }
      .el-input {
        width: 500px;
      }
    }
  }
</style>
