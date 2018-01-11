<template>
  <div class="creat-new3">
    <steps :active="2"></steps>
    <div class="content">
      <creat-header title="时间周期定向" text="按时间"></creat-header>
      <div class="time">
        <div class="time-right">
          <module-header-compoent :canClick="canEdit" :title="`已选 ${timeNum} 个`" :check="false" :del="false" :isAll="timeCheckBox" @checkall="timeCheckAll"></module-header-compoent>
          <div class="time-wrap">
            <time-bar :canClick="canEdit" :pTimeArr="checkedTime" ref="timeBar"></time-bar>
          </div>
          <ul class="time-icon">
            <li v-for="item in timeIcon">
              <img :src="item.img">
              <div>
                <span>{{item.time}}</span>
                <p>目标用户：{{item.text}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <creat-header title="" text="按周期"></creat-header>
      <div class="week">
        <div class="week-right">
          <module-header-compoent :canClick="canEdit" :title="`已选 ${weekNum} 个`" :check="false" :del="false" :isAll="weekCheckBox" @checkall="weekCheckAll"></module-header-compoent>
          <div class="week-wrap">
            <week-bar :canClick="canEdit" :pWeekArr="checkedWeek" ref="weekBar"></week-bar>
          </div>
          <ul class="week-icon">
            <li v-for="item in weekIcon">
              <img :src="item" alt="">
            </li>
          </ul>
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
  import dateIcon from '../../../static/json/date-Icon.json'

  const strTOarr = hourData.timeForStr
  export default {
    name: 'creatTime',
    data () {
      return {
        // 是否可以修改状态
        canEdit: true,
        timeArray: {},
        checkedTime: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        checkedWeek: [0, 0, 0, 0, 0, 0, 0],
        // 是否全选
        timeCheckBox: false,
        weekCheckBox: false,
        // 当前选中了几个
        timeNum: 0,
        weekNum: 0,
        // 平台类型channel_id 移动pc大屏
        channelId: 0,
        timeIcon: [],
        weekIcon: []
      }
    },
    created () {
      // 判断状态
      let status = this.$store.state.creatData.status
      if (status && status.plan_status === 4) {
        let actidStatus = status.act_ids_status.every(item => {
          return item.act_ids_status === -2
        })
        if (actidStatus) {
          this.canEdit = true
        }
      } else if (status && status.plan_status !== 1 && status.plan_status !== 6) {
        this.canEdit = false
      }
      // 获取当前月份，展示节日图标
      const currentM = new Date().getMonth() + 1
      this.weekIcon = dateIcon.week[currentM]

      this.timeArray = hourData.time
      // 如果基础设置中有channelId 则拿出来用
      this.channelId = this.$store.state.creatData.creatBasice.channel
      // 判断vuex中是否有数据
      let creatData = this.$store.state.creatData.creatTime
      // console.log(creatData)
      if (creatData) {
        this.checkedTime = creatData.time
        this.checkedWeek = creatData.week
        this.channelId = creatData.channelId
      } else if (this.$store.state.creatData.planId) {
        this.$http.get('/api2/get_time_plan', {
          params: {
            plan_id: this.$store.state.creatData.planId
          }
        }).then(res => {
          if (res.code === 200) {
            this.checkedTime = this.transformTime(res.data.plan_time)
            this.checkedWeek = this.transformWeek(res.data.plan_week)
            this.channelId = res.data.plan_channel
            // 保存Vuex
            this.$store.commit('TIME', {
              time: this.checkedTime,
              week: this.checkedWeek,
              channelId: this.channelId
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
        // console.log(this.timeCheckBox)
      },
      'checkedWeek' (val) {
        // 选中了几个
        let chosedNum = val.filter(function (item) {
          return item === 1
        })
        this.weekNum = chosedNum.length
        this.weekCheckBox = chosedNum.length === val.length
      },
      'channelId' (val) {
        this.timeIcon = dateIcon.time[val]
      }
    },
    methods: {
      timeCheckAll (data) {
        if (!this.canEdit) return
        data ? this.checkedTime = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] : this.checkedTime = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
      weekCheckAll (data) {
        if (!this.canEdit) return
        data ? this.checkedWeek = [1, 1, 1, 1, 1, 1, 1] : this.checkedWeek = [0, 0, 0, 0, 0, 0, 0]
      },
      // 下一步C
      nextStep () {
        // 点击下一步的时候拿时间和周期数据
        this.checkedTime = this.$refs.timeBar.$data.timeArr
        this.checkedWeek = this.$refs.weekBar.$data.weekArr
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
        })
          .then(res => {
            if (res.code === 200) {
              this.$store.commit('TIME', {
                time: that.checkedTime,
                week: that.checkedWeek,
                channelId: that.channelId
              })
              // 成功后调取媒体接口
              return this.$http.post('/api2/upd_media_plan', {
                plan_id: that.$store.state.creatData.planId
              })
            }
          })
          .then(res => {
            if (res.code === 200) {
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
        height: 370px;
        .time-right, .week-right {
          width: 100%;
          height: 370px;
          float: left;
          border: 1px solid #f9f9f9;
          padding: 14px 30px;
        }
        .time-right {
          .time-wrap {
            width: calc(100% - 350px)
            float left
          }
          .time-icon {
            float left
            margin-top 30px
            margin-left: 40px;
            li {
              width: 310px;
              height: 70px;
              border: 1px solid #f2f2f2;
              border-radius: 5px;
              padding: 5px;
              margin-bottom: 15px;
              div {
                float: right;
                padding: 10px 15px;
                width: calc(100% - 64px);
                height: 100%;
                border-left: 1px solid #f2f2f2;
                text-align: center;
                span {
                  display: inline-block;
                  width: 170px;
                  background: #169bd5;
                  color: #fff;
                  height: 20px;
                  line-height: 20px;
                }
                p {
                  display inline-block
                  width: 170px;
                  text-align left
                  margin-top: 6px;
                }
              }
            }
          }
        }
        .week-right {
          height: 400px;

          .weekbar-component {
            margin-top: 110px;
          }
          .week-wrap {
            width: calc(100% - 350px)
            float left;
          }
          .week-icon {
            float: left;
            margin-top: 40px;
            padding-left: 20px;
            width: 340px;
            li {
              width: 150px;
              height: 100px;
              border: 1px solid #f2f2f2;
              border-radius: 5px;
              padding: 5px 2px;
              float: left;
              margin-bottom: 15px;
              img {
                width: 100%;
                height: 100%;
              }
              &:nth-of-type(2n) {
                margin-left: 20px;
              }
            }
          }
        }
      }
      .week {
        height: 400px;
      }
    }
  }
</style>
