<template>
  <div class="creat-new3">
    <steps :active="2"></steps>
    <div class="content">
      <creat-header title="时间周期定向" text="按时间"></creat-header>
      <div class="time">
        <div class="time-left">
          <module-header-compoent
            title="时间"
            :check="true"
            :checkBox="timeCheckBox"
            @checkall="timeCheckAll"></module-header-compoent>
          <div class="checkbox-wrap">
            <el-checkbox
              v-for="(i, index) in timeArray.hour"
              :true-label="1"
              :false-label="0"
              :key="i"
              v-model="checkedTime[index]">
              {{i}}
            </el-checkbox>
          </div>
        </div>
        <div class="time-right">
          <module-header-compoent :title="`已选 ${timeNum} 个`" :del="true" @clearchose="timeCheckAll(false)"></module-header-compoent>
          <time-bar :timeArr="checkedTime"></time-bar>
        </div>
      </div>
      <creat-header title="" text="按周期"></creat-header>
      <div class="week">
        <div class="week-left">
          <module-header-compoent
            title="周期"
            :check="true"
            :checkBox="weekCheckBox"
            @checkall="weekCheckAll"></module-header-compoent>
          <div class="checkbox-wrap">
            <el-checkbox
              v-for="(item, index) in timeArray.week"
              :true-label="1"
              :false-label="0"
              :key="item"
              v-model="checkedWeek[index]">
              {{item}}
            </el-checkbox>
          </div>
        </div>
        <div class="week-right">
          <module-header-compoent :title="`已选 ${weekNum} 个`" :del="true" @clearchose="weekCheckAll(false)"></module-header-compoent>
          <week-bar :weekArr="checkedWeek"></week-bar>
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
  import moduleHeaderCompoent from './module-header-component'
  import timeBar from './timebar-component.vue'
  import weekBar from './weekbar-component.vue'
  import hourData from '../../../static/json/timeData.json'

  const strTOarr = hourData.timeForStr
  export default {
    name: 'creatTime',
    data () {
      return {
        timeArray: {},
        checkedTime: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        checkedWeek: [0, 0, 0, 0, 0, 0, 0],
        // 是否全选
        timeCheckBox: false,
        weekCheckBox: false,
        // 当前选中了几个
        timeNum: 0,
        weekNum: 0
      }
    },
    created () {
      this.timeArray = hourData.time
      // 判断vuex中是否有数据
      let creatData = this.$store.state.creatData.creatTime
      // console.log(creatData)
      if (creatData) {
        console.log(creatData.time, creatData.week)
        this.checkedTime = creatData.time
        this.checkedWeek = creatData.week
      } else if (this.$store.state.creatData.planId) {
        this.$http.get('/api2/get_time_plan', {
          params: {
            plan_id: this.$store.state.creatData.planId
          }
        }).then(res => {
          console.log(res)
          if (res.code === 200) {
            this.checkedTime = this.transformTime(res.data.plan_time)
            this.checkedWeek = this.transformWeek(res.data.plan_week)
            // 保存Vuex
            this.$store.commit('TIME', {
              time: this.checkedTime,
              week: this.checkedWeek
            })
          }
        })
      }
    },
    watch: {
      'checkedTime' (val) {
        // 选中了几个
        let chosedNum = val.filter(function (item) {
          return item === 1
        })
        this.timeNum = chosedNum.length
        this.timeCheckBox = chosedNum.length === val.length
      },
      'checkedWeek' (val) {
        // 选中了几个
        let chosedNum = val.filter(function (item) {
          return item === 1
        })
        this.weekNum = chosedNum.length
        this.weekCheckBox = chosedNum.length === val.length
      }
    },
    methods: {
      timeCheckAll (data) {
        console.log(data)
        data ? this.checkedTime = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] : this.checkedTime = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
      weekCheckAll (data) {
        console.log(data)
        data ? this.checkedWeek = [1, 1, 1, 1, 1, 1, 1] : this.checkedWeek = [0, 0, 0, 0, 0, 0, 0]
        console.log(this.checkedWeek)
      },
      // 下一步C
      nextStep () {
        let isTime = this.checkedTime.every(function (item) {
          return item === 0
        })
        let isWeek = this.checkedWeek.every(function (item) {
          return item === 0
        })
        if (isTime || isWeek) {
          this.$alert('请选择时间周期', '提示', {
            confirmButtonText: '确定'
          })
          return
        }
        this.addTime()
      },
      back () {
        this.$router.go(-1)
      },
      // http添加时间周期设置
      addTime () {
        const that = this
        this.$http.post('/api2/add_time_plan', {
          plan_id: this.$store.state.creatData.planId,
          time_plan: this.transformTime(this.checkedTime),
          week_plan: this.transformWeek(this.checkedWeek)
        }).then(res => {
          console.log(res)
          if (res.code === 200) {
            this.$store.commit('TIME', {
              time: that.checkedTime,
              week: that.checkedWeek
            })
            console.log(this.$store.state.creatTime)
            this.$router.push('/creatCity')
          }
        })
      },
      // 小时转换
      transformTime (arr) {
        let res = ''
        if (typeof arr === 'string') {
          res = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          arr.split('').forEach(function (item) {
            res[strTOarr[item]] = 1
          })
        } else if (typeof arr === 'object') {
          arr.forEach(function (item, index) {
            if (item) {
              for (let i in strTOarr) {
                if (strTOarr[i] === index) {
                  res += i
                }
              }
            }
          })
        }
        console.log(res)
        return res
      },
      // 周期转换
      transformWeek (arg) {
        let res = ''
        if (typeof arg === 'string') {
          res = [0, 0, 0, 0, 0, 0, 0]
          for (let i = 0; i < arg.split('').length; i++) {
            if (arg.split('')[i] === 0) {
              res.splice(6, 1, 1)
            }
            res.splice(arg.split('')[i] * 1 - 1, 1, 1)
          }
        } else if (typeof arg === 'object') {
          arg.forEach(function (item, index) {
            if (item) {
              if (index === 6) index = -1
              res += index + 1
            }
          })
        }
        console.log(res)
        return res
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
      padding-bottom: 60px;
      border-bottom: 1px solid #cacaca;
      .time, .week {
        width: 100%;
        height: 670px;
        .time-left, .week-left {
          width: 340px;
          background: #f9f9f9;
          padding: 15px 35px 30px;
          float left;
          height: 662px;
          .checkbox-wrap {
            width: 100%;
            max-height: 90%;
            overflow-y: auto;
            &::-webkit-scrollbar {
              width: 0;
            }
            .el-checkbox {
              width: 100%;
              height: 47px;
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
                left: 240px;
              }
            }
          }
        }
        .time-right, .week-right {
          width: calc(100% - 340px)
          height: 662px;
          float: left;
          border: 1px solid #f9f9f9;
          padding: 14px 30px;
        }
        .week-right, .week-left {
          height: 427px;
          .weekbar-component {
            margin-top: 110px;
          }
        }
      }
      .week {
        height: 400px;
      }
    }
  }
</style>
