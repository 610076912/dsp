<template>
  <div id="plandata">
    <div class="nav">
      <div class="navname">推广数据</div>
    </div>
    <div class="chart">
      <div class="top">
        <div class="name">营销概况</div>
        <div class="top-right">
          <!-- 设备选择框 -->
          <div class="device">
            <el-select v-model="device" @change="deviceChange()" size="small" placeholder="请选择设备类型">
              <el-option
                v-for="item in deviceO"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <!-- 计划选择框 -->
          <div class="activity">
            <el-select v-model="activity" @change="activityChange()" size="small" placeholder="请选择计划名">
              <el-option
                v-for="item in activityO"
                :key="item.plan_id"
                :label="item.plan_name"
                :value="item.plan_id">
              </el-option>
            </el-select>
          </div>
          <!-- 媒体选择框 -->
          <div class="activity">
            <el-select v-model="media" size="small" placeholder="请选择媒体">
              <el-option value="all" label="全部媒体"></el-option>
              <el-option
                v-for="item in mediaO"
                :key="item.mediaId"
                :label="item.mediaName"
                :value="item.mediaId">
              </el-option>
            </el-select>
          </div>
          <!-- 查询按钮 -->
          <div class="btn">
            <el-button type="primary" @click="search">查询</el-button>
          </div>
        </div>
      </div>
      <div class="data-num">
        <ul>
          <li><p>{{ details.bgCount || 0 }}</p><span>曝光量(次)</span></li>
          <li><p>{{ details.clickCount || 0 }}</p><span>点击量(次)</span></li>
          <li><p>{{ $_toFixed(details.clickRate) || 0}}</p><span>点击率(‰)</span></li>
          <li><p>{{$_toFixed(totalCost, 2) / 1000 || 0}}</p><span>花费(元)</span></li>
        </ul>
      </div>
      <div class="chart-con">
        <div class="chartSelect">
          <div class="mobile-chart-color-l">
            <span></span>
            <el-select v-model="selectL" size="mini"
                       :disabled="true"
                       @change="selectChange()">
              <el-option label="曝光量" value="bgArr"></el-option>
              <el-option label="点击量" value="clickArr"></el-option>
            </el-select>
          </div>
          <div class="mobile-chart-color-r">
            <span></span>
            <el-select v-model="selectR" size="mini"
                       :disabled="true"
                       @change="selectChange()">
              <el-option label="点击量" value="clickArr"></el-option>
              <el-option label="点击率" value="clickRateArr"></el-option>
              <el-option label="花费" value="" disabled=""></el-option>
            </el-select>
          </div>
        </div>
        <!-- echarts图表 -->
        <div class="line-chart"></div>
      </div>
    </div>
    <div class="form">
      <div class="top">
        <span class="name">推广数据明细</span>
        <!-- <span class="outform">导出报表</span> -->
      </div>
      <el-table :data="tableData" stripe border v-loading="tableLoading" style="width: 100%"
                :default-sort="{prop: 'date', order: 'descending'}">
        <el-table-column prop="time" label="时间" sortable></el-table-column>
        <el-table-column prop="actName" label="计划名称"></el-table-column>
        <el-table-column prop="bg" label="曝光量" sortable></el-table-column>
        <el-table-column prop="click" label="点击量" sortable></el-table-column>
        <el-table-column prop="clickRate" label="点击率(‰)" sortable></el-table-column>
        <el-table-column prop="cost" label="总花费（元）" sortable></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import spurious from '../../../static/json/spurious2'
  import spurious1 from '../../../static/json/spurious3'
  import mediaJsonP from '../../../static/json/media.json'

  let searchUrl = process.env.TEST === 'test' ? 'https://test-tj.videozhishi.com' : 'https://tj.videozhishi.com'

  // import mediaJsonT from '../../../static/json/test-media.json'

  // let testEnv = process.env.TEST === 'test'
  let media = mediaJsonP
  // if (testEnv) {
  //   media = mediaJsonT
  // }
  export default {
    name: 'plandata',
    data () {
      return {
        tableLoading: false,
        deviceO: [{     // 设备类型选择器
          value: '1',
          label: '移动推广'
        }, {
          value: '2',
          label: 'PC推广'
        }, {
          value: '3',
          label: '大屏推广'
        }],
        planLists: [],  // 所有的平台数据数组
        details: [],    // 数据详情数组
        device: '1',
        activityO: [],
        activity: '',
        mediaO: [],
        media: '',
        selectO: [{      // 选择器选项
          value: 'bgcount',
          label: '曝光量'
        }, {
          value: 'click',
          label: '点击量'
        }, {
          value: 'pjclick',
          label: '点击率（‰）'
        }, {
          value: 'huafei',
          label: '花费'
        }],
        selectL: 'bgArr',  // 左边选中状态
        selectR: 'clickArr',    // 右边选中状态
        tableData: [],
        // 总花费
        totalCost: 0
      }
    },
    methods: {
      // 获取花费相关数据
      getCostData (sTime, eTime, actIdArr) {
        this.$http.get('/api2/act_ids_cost', {
          params: {
            start_time: sTime,
            end_time: eTime,
            act_ids: actIdArr
          }
        }).then(res => {
          const that = this
          if (res.code === 200) {
            this.totalCost = 0
            if (sessionStorage.getItem('user_id') === this.$MockUserid) {
              if (JSON.parse(actIdArr)[0] === '1674_1015') {
                res.data = spurious.data[1].cost
              }
              if (JSON.parse(actIdArr)[0] === '1673_1021') {
                res.data = spurious.data[2].cost
              }
            }
            if (sessionStorage.getItem('user_id') === this.$MockUserid1) {
              if (JSON.parse(actIdArr)[0] === '1675_1015') {
                res.data = spurious1.data[1].cost
              }
              if (JSON.parse(actIdArr)[0] === '1676_1021') {
                res.data = spurious1.data[2].cost
              }
            }
            for (let i in res.data) {
              this.totalCost += res.data[i]
              this.tableData.forEach((item) => {
                if (item.time === i) {
                  item.cost = that.$_toFixed(res.data[i], 2) / 1000
                }
              })
            }
          }
        })
      },
      deviceChange () {         // 设备选择项改变
        this.activityO = this.planLists[this.device]
        this.activity = ''
        this.mediaO = this.translateMedia([])
      },
      activityChange () {       // 计划名选择项改变
        this.media = 'all'
        this.activityO.forEach((item, index) => {
          if (this.activityO[index].plan_id === this.activity) {
            this.mediaO = this.translateMedia(this.activityO[index].act_ids)
          }
        })
      },
      translateMedia (arg) {
        var chucunArry = []
        // 循环媒体平台id， 循环字典表找对应；注意循环媒体id时没有属性所以不能用item
        arg.forEach((item, index) => {
          media.forEach((item1, index1) => {
            if (parseInt(arg[index].split('_')[1]) === item1.media_id) {
              chucunArry.push({
                mediaId: arg[index],
                mediaName: media[index1].media_name
              })
            }
          })
        })
        return chucunArry
      },
      search () {         // 查询按钮
        if (this.activity === '') {
          this.$message.warning('请先选择一个计划')
          return
        }
        var data = []
        if (this.media === 'all') {
          for (var i = 0; i < this.mediaO.length; i++) {
            data.push(this.mediaO[i].mediaId)
          }
        } else {
          data.push(this.media)
        }
        this.getData(data)
      },
      selectChange () {
        this.echarts()
      },
      isWho (me) {
        if (me === 'bgArr') {
          return '曝光量'
        } else if (me === 'clickArr') {
          return '点击量'
        } else if (me === 'clickRateArr') {
          return '点击率（‰）'
        } else if (me === 'hf') {
          return '花费'
        }
      },
      getActid () {     // 获取选择项，计划媒体id
        this.$http.get(searchUrl + '/data/get_plan_list', {
          params: {
            user_id: sessionStorage.getItem('user_id')
          }
        }).then(res => {
          if (res.code === 200) {
            this.planLists = res.data
            if (this.planLists['1'].length > 0) {
              this.activityO = this.planLists['1']
            } else {
              return false
            }
            this.activity = this.activityO[0].plan_id
            this.mediaO = this.translateMedia(this.activityO[0].act_ids)
            var data = []
            for (var i = 0; i < this.mediaO.length; i++) {
              data.push(this.mediaO[i].mediaId)
            }
            this.getData(data)
          }
        })
      },
      getData (arg) {    // 获取数据详细信息
        this.tableLoading = true
        var bTime, eTime, planName
        for (var i = 0; i < this.activityO.length; i++) {
          if (this.activityO[i].plan_id === this.activity) {
            bTime = this.activityO[i].plan_b_time
            eTime = this.activityO[i].plan_e_time
            // 如果项目结束时间超过当前时间则为当前时间，否则就用项目结束时间。
            if ((new Date(eTime)).getTime() > (new Date()).getTime()) {
              eTime = new Date()
            }
            planName = this.activityO[i].plan_name
          }
        }
        // console.log('bTime' + bTime, 'eTime' + eTime)
        this.$http.get(searchUrl + '/data/get_promotion_data', {
          params: {
            actid_list: JSON.stringify(arg),
            plan_b_time: bTime,
            plan_e_time: eTime
          }
        }).then(res => {
          if (res.code === 200) {
            // 造假数据
            // console.log(res.data)
            if (sessionStorage.getItem('user_id') === this.$MockUserid) {
              if (arg[0] === '1674_1015') {
                res.data = JSON.parse(JSON.stringify(spurious.jc[1]))
              }
              if (arg[0] === '1673_1021') {
                res.data = JSON.parse(JSON.stringify(spurious.jc[2]))
              }
            }
            if (sessionStorage.getItem('user_id') === this.$MockUserid1) {
              if (arg[0] === '1675_1015') {
                res.data = JSON.parse(JSON.stringify(spurious1.jc[1]))
              }
              if (arg[0] === '1676_1021') {
                res.data = JSON.parse(JSON.stringify(spurious1.jc[2]))
              }
            }
            // 处理数据中的小数点位数
            res.data.clickRateArr.forEach((item, index) => {
              res.data.clickRateArr[index] = this.$_toFixed(item)
            })
            this.details = res.data
            this.tableData = []
            res.data.dateArr.forEach((item, index) => {
              this.tableData.unshift({
                time: item,
                actName: planName,
                bg: res.data.bgArr[index],
                click: res.data.clickArr[index],
                clickRate: res.data.clickRateArr[index],
                cost: 0
              })
            })
            this.getCostData(bTime, eTime, JSON.stringify(arg))
            this.tableLoading = false
            this.echarts()
          }
        })
      },
      echarts () {
        var myChart = this.$echarts.init(document.getElementsByClassName('line-chart')[0])
        let echartData = {
          color: ['#66c4cb', '#b5a4d9'],          // 折线颜色
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'cross'           // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {                     // 图表位置
            left: '4%',
            right: '4%',
            bottom: '1%',
            containLabel: true
          },
          calculable: true,
          xAxis: [  // 设置x轴
            {
              type: 'category',
              boundaryGap: false,
              data: this.details.dateArr,
              splitLine: {
                lineStyle: {
                  type: 'dashed'
                }
              }
            }
          ],
          yAxis: [    // 设置两个y轴
            {
              type: 'value',
              name: this.isWho(this.selectL),
              position: 'left',
              splitLine: {
                lineStyle: {
                  type: 'dashed'
                }
              }
            },
            {
              type: 'value',
              name: this.isWho(this.selectR),
              position: 'right',
              splitLine: {
                lineStyle: {
                  type: 'dashed'
                }
              }
            }
          ],
          series: [     // 展示数据
            {
              name: this.isWho(this.selectL),
              type: 'line',
              smooth: true, // 这句就是让曲线变平滑的
              areaStyle: {normal: {}},  // 填充背景
              yAxisIndex: 0,
              data: this.details[this.selectL]
            },
            {
              name: this.isWho(this.selectR),
              type: 'line',
              smooth: true, // 这句就是让曲线变平滑的
              areaStyle: {normal: {}},
              yAxisIndex: 1,
              data: this.details[this.selectR]
            }
          ]
        }
        myChart.setOption(echartData)
      }
    },
    created () {
      this.getActid()
      // await this.getData((this.activityO[0].act_ids[0]).split('_')[1])
    },
    mounted () {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  borderColor = #e4e4e4;
  border-radius();

  -webkit-border-radius arguments, -moz-border-radius arguments, border-radius arguments, #plandata {
    .header {
      height: 60px;
      line-height: 60px;
      font-size: 16px;
      padding: 0 28px;
    }

    .nav {
      height: 44px;
      line-height: 46px
      border-bottom 1px solid #4a9cd3
      .navname {
        height 100%;
        font-size: 16px
      }
    }

    .chart {
      width: 100%;
      height: 550px;
      border: 1px solid borderColor;
      border-radius(4px);
      margin-top: 30px;

      .top {
        width: 100%;
        height: 60px;
        background: #f4f5f9;

        .name {
          height: 100%;
          line-height: 60px;
          padding: 0 14px;
          float: left;
          font-size: 14px;
        }

        .top-right {
          width: 600px;
          height: 100%;
          padding-top: 15px
          float: right;
          .device, .activity, .dates {
            width: 150px
            float left
            margin-right 15px
          }

          .btn {
            width: 80px;
            height: 30px;
            float: left;

            .el-button--primary {
              width: 100%;
              height: 100%;
              line-height: 0.5;
            }
          }
        }
      }

      .data-num {
        width: 100%;
        height: 124px;
        border-top: 1px solid borderColor;
        border-bottom: 1px solid borderColor;

        ul {
          width: 100%;
          height: 100%;

          li {
            width: calc((100% / 4));
            height: 100%;
            float: left;
            border-right: 1px solid borderColor;
            text-align: center;

            p {
              display: inline-block;
              width: 100%;
              font-size: 26px;
              margin-top: 40px;
            }

            span {
              display: inline-block;
              width: 100%;
            }
          }

          li:last-of-type {
            border: none;
          }
        }
      }

      .chart-con {
        width: 100%;

        .chartSelect {
          padding: 20px 20px 40px 20px;

          .mobile-chart-color-l {
            float: left;
            display: inline-block;
            width: 200px;
            height: 30px;

            span {
              display: inline-block;
              height: 15px;
              width: 15px;
              position: relative;
              top: 2px;
              left: 8px;
              border-radius: 50%;
              background: #66c4cb;
              margin-right: 10px;
            }

            input {
              height: 25px;
              width: 150px;
            }
          }

          .mobile-chart-color-r {
            display: inline-block;
            float: right;
            width: 200px;
            height: 30px;

            span {
              display: inline-block;
              height: 15px;
              width: 15px;
              position: relative;
              top: 2px;
              left: 8px;
              border-radius: 50%;
              background: #b5a4d9;
              margin-right: 10px;
            }

            input {
              height: 25px;
              width: 150px;
            }
          }
        }
      }

      .line-chart {
        width: 100%;
        height: 270px;
      }
    }

    .form {
      margin-top: 50px;

      .top {
        height: 26px;
        line-height: 26px;

        .name {
          float: left;
          font-size: 14px;
        }

        .outform {
          float: right;
        }
      }
    }
  }
</style>
