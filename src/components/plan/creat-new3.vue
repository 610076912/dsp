<template>
  <div class="creat-new3">
    <steps :active="2"></steps>
    <div class="content">
      <creat-header title="时间周期定向" text="按时间"></creat-header>
      <div class="time">
        <div class="time-left">
          <module-header-compoent title="时间" :check="true" :checkBox="timeCheckBox"
                                  @checkall="timeCheckAll"></module-header-compoent>
          <div class="checkbox-wrap">
            <el-checkbox
              v-for="(i, index) in timeArray.hour"
              :true-label="1"
              :false-label="0"
              :key="i"
              v-model="checkedTime[index]"
              @change="timeChange">
              {{i}}
            </el-checkbox>
          </div>
        </div>
        <div class="time-right">
          <module-header-compoent title="已选（4）个" :del="true"></module-header-compoent>
          <time-bar :timeArr="checkedTime"></time-bar>
        </div>
      </div>
      <creat-header title="" text="按周期"></creat-header>
      <div class="week">
        <div class="week-left">
          <module-header-compoent title="周期" :check="true" @checkall="weekCheckAll"></module-header-compoent>
          <div class="checkbox-wrap">
            <el-checkbox
              v-for="(item, index) in timeArray.week"
              :true-label="1"
              :false-label="0"
              :key="item"
              v-model="checkedWeek[index]"
              @change="weekChange">
              {{item}}
            </el-checkbox>
          </div>
        </div>
        <div class="week-right">
          <module-header-compoent title="已选（4）个" :del="true"></module-header-compoent>
          <week-bar :weekArr="checkedWeek"></week-bar>
        </div>
      </div>
    </div>
    <div class="button-wrap">
      <el-button>返回</el-button>
      <el-button class="next-btn" type="primary">下一步</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import steps from './steps-component.vue'
  import header from './header-component.vue'
  import moduleHeaderCompoent from './module-header-component'
  import timeBar from './timebar-component.vue'
  import weekBar from './weekbar-component.vue'
  import hourData from '@/../static/timeData.json'

  export default {
    data () {
      return {
        timeArray: {},
        checkedTime: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        checkedWeek: [0, 0, 0, 0, 0, 0, 0],
        timeCheckBox: false
      }
    },
    created () {
      console.log(hourData)
      this.timeArray = hourData.time
      // this.checkedTime = hourData.time.hour
      console.log(this.timeArray)
    },
    watch: {
      'checkedTime' (val) {
//        let isall = val.every((item) => {
//          return item !== 0
//        })
        this.timeCheckBox = true
      }
    },
    methods: {
      timeCheckAll (data) {
        console.log(data)
        data ? this.checkedTime = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] : this.checkedTime = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
      weekCheckAll (data) {
        console.log(data)
        data ? this.checkedWeek = [1, 1, 1, 1, 1, 1, 1] : this.checkedWeek = [0, 0, 0, 0, 0, 0, 0]
        console.log(this.checkedWeek)
      },
      timeChange (event) {
        console.log(event)
        console.log(this.checkedTime)
      },
      weekChange () {
        console.log(this.checkedWeek)
      }
    },
    components: {
      steps,
      'creat-header': header,
      'module-header-compoent': moduleHeaderCompoent,
      'time-bar': timeBar,
      'week-bar': weekBar
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .creat-new3 {
    .content {
      width: 100%;
      overflow: hidden;
      padding: 15px 30px;
      padding-bottom: 30px;
      border-bottom: 1px solid #cacaca;
      .time, .week {
        width: 100%;
        height: 600px;
        .time-left, .week-left {
          width: 300px;
          background: #f9f9f9;
          padding: 15px 30px;
          float left;
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
        .time-right, .week-right {
          width: calc(100% - 300px)
          height: 563px;
          float: left;
          border: 1px solid #f9f9f9;
          padding: 14px 30px;
        }
        .week-right {
          height: 363px;
        }
      }
      .week {
        height: 400px;
      }
    }
    .button-wrap {
      width: 100%;
      height: 80px;
      text-align: center;
      line-height: 80px;
      .next-btn {
        margin-left: 80px;
      }
    }
  }
</style>
