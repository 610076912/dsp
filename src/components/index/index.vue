<template>
  <div class="index">
    <div class="now-location"><b>当前位置：</b>{{location}}</div>
    <div class="index-content">
      <div class="user">
        <div class="user-header"></div>
        <div class="user-info-right">
          <div class="user-info"> 欢迎您，{{name}}</div>
          <!--<p>推广余额：<span class="color-red">￥{{sum}}</span>-->
          <!--<el-button class="paycheck" size="mini">充值</el-button>-->
          <!--</p>-->
          <!--<p>预计消费天数：&#45;&#45;</p>-->
          <div class="link-button">
            <el-button size="small" type="primary" @click="toPlan">进入推广计划</el-button>
          </div>
        </div>
      </div>
      <div class="statist">
        <ul class="tab-tag">
          <li v-for="(key, index) in tags" v-bind:class="{ tagActive: (indexs == index) }" @click="toggleTags(index)">
            {{key}}
          </li>
        </ul>
        <div class="tag-items">
          <div class="tag-item">
            <el-row class="count-data">
              <el-col :span="6">
                <div class="grid-content r b"><span>{{totalData.bg_count || 0}}</span>
                  <p>今日曝光量</p></div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content r b"><span>{{totalData.click_count || 0}}</span>
                  <p>今日点击量</p></div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content r b"><span>{{$_toFixed(totalData.click_rate) || 0}}</span>
                  <p>今日平均点击率（‰）</p></div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content b"><span>--</span>
                  <p>今日消费</p></div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content r"><span>{{checkData[indexs + 1][-1] || 0}}</span>
                  <p>正在投放</p></div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content r"><span>{{checkData[indexs + 1][1] || 0}}</span>
                  <p>审核通过</p></div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content r"><span>{{checkData[indexs + 1][0] || 0}}</span>
                  <p>正在审核</p></div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content"><span>{{checkData[indexs + 1][-2] || 0}}</span>
                  <p>审核拒绝</p></div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <!-- mobile -->
    <div class="mobile">
      <div class="mobile-title">
        <span>{{tags[indexs]}}营销概况</span>
        <div class="date-wrap">
          <el-date-picker
            class="date-picker"
            v-model="mobileDate"
            @change="chartDateChange(mobileDate, 'mobile')"
            type="daterange"
            align="right"
            placeholder="选择日期范围"
            :picker-options="pickerOptions">
          </el-date-picker>
        </div>
      </div>
      <div class="mobile-number">
        <el-col :span="6">
          <div class="mobile-n-grid r"><span>{{mobileData.bgTotal}}</span>
            <p>曝光量（次）</p></div>
        </el-col>
        <el-col :span="6">
          <div class="mobile-n-grid r"><span>{{mobileData.clickTotal}}</span>
            <p>点击量（次）</p></div>
        </el-col>
        <el-col :span="6">
          <div class="mobile-n-grid r"><span>{{$_toFixed(mobileData.clickRate)}}</span>
            <p>平均点击率（‰）</p></div>
        </el-col>
        <el-col :span="6">
          <div class="mobile-n-grid"><span>--</span>
            <p>花费（元）</p></div>
        </el-col>
      </div>
      <div class="mobile-chart">
        <div class="mobile-chart-color">
          <div class="mobile-chart-color-l">
            <span></span>
            <el-select v-model="mobileLeftSelect" size="mini"
                       :disabled="true"
                       @change="selectChange(mobileLeftSelect, 'mobileData', '0')"
                       placeholder="请选择">
              <el-option
                v-for="item in selectLOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="mobile-chart-color-r">
            <span></span>
            <template>
              <el-select v-model="mobileRightSelect" placeholder="请选择" size="mini"
                         :disabled="true"
                         @change="selectChange(mobileRightSelect, 'mobileData', '1')">
                <el-option
                  v-for="item in selectROption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </div>

        </div>
        <div class="mobile-chart-box">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  let searchUrl = process.env.TEST === 'test' ? '//test-tj.videozhishi.com' : 'https://tj.videozhishi.com'
  let selectLOption = [{
    value: 'bgCount',
    label: '曝光量'
  }, {
    value: 'spend',
    label: '花费'
  }]

  let selectROption = [{
    value: 'clickCount',
    label: '点击量'
  }, {
    value: 'clickRate',
    label: '点击率（‰）'
  }]
  let chartOption = {
    color: ['#66c4cb', '#b5a4d9'],          // 折线颜色
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'cross'            // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    toolbox: {
      feature: {saveAsImage: {}}
    },
    grid: {
      left: '30px',
      right: '30px',
      bottom: '0px',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: []
    },
    yAxis: [
      {
        type: 'value',
        scale: true,
        position: 'left',
        name: '曝光量'
      },
      {
        type: 'value',
        scale: true,
        position: 'right',
        name: '点击量'
      }
    ],
    series: [
      {
        name: '曝光量',
        type: 'line',
        yAxisIndex: 0,
        smooth: true, // 这句就是让曲线变平滑的
        areaStyle: {normal: {}},  // 填充背景
        data: []
      },
      {
        name: '点击量',
        type: 'line',
        yAxisIndex: 1,
        smooth: true, // 这句就是让曲线变平滑的
        areaStyle: {normal: {}}  // 填充背景
      }
    ]
  }
  export default {
    name: 'index',
    data () {
      return {
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setHours(0, 0, 0, 0)
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 6)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setHours(0, 0, 0, 0)
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 29)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        name: sessionStorage.getItem('user'),
        msg: 'index',
        location: '首页',
        tags: ['移动', 'PC', 'OTT'],
        indexs: 0,
        // 日期选择器 默认最近七天
        mobileDate: [new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).getTime(), new Date(Date.now()).getTime()],
        // 下拉框
        mobileLeftSelect: 'bgCount',
        mobileRightSelect: 'clickCount',
        // 下拉框基础数据
        selectLOption: selectLOption,
        selectROption: selectROption,
        // 图标对象
        mobileChart: null,
        // 请求到的图表数据
        totalData: {},
        mobileData: {},
        // 给每个图表维护一个变动的数据模型，每次更新数据都修改该模型。
        mobileModel: {
          xAxis: {
            data: []
          },
          yAxis: [
            {
              name: '曝光量',
              position: 'left'

            },
            {
              name: '点击量',
              position: 'right'
            }
          ],
          series: [
            {
              yAxisIndex: 0,
              data: []
            },
            {
              yAxisIndex: 1,
              data: []
            }
          ]
        },
        // 审核相关数据
        checkData: {
          1: {
            0: 0,
            1: 0,
            2: 0,
            '-1': 0
          },
          2: {
            0: 0,
            1: 0,
            2: 0,
            '-1': 0
          },
          3: {
            0: 0,
            1: 0,
            2: 0,
            '-1': 0
          }
        }
      }
    },
    created () {
      // 每日总数据
      this.getTotalDate()
      this.getCheckData()
    },
    methods: {
      // 获取审核相关数据
      getCheckData () {
        this.$http.get('/api2/plan_check_info', {
          params: {
            user_id: sessionStorage.getItem('user_id')
          }
        }).then(res => {
          if (res.code === 200) {
            this.checkData = res.data
          }
        })
      },
      // get Total Data
      getTotalDate (channelId) {
        this.$http.get(searchUrl + '/data/total_data', {
          params: {
            user_id: sessionStorage.getItem('user_id'),
            channel_id: channelId
          }
        }).then(res => {
          if (res.code === 200) {
            this.totalData = res.data
          }
        })
      },
      // 获取图标数据接口
      getMChartsData (timeRange, channelType = 1) {
        this.mobileChart.showLoading()
        this.$http.get(searchUrl + '/data/channel_data', {
          params: {
            user_id: sessionStorage.getItem('user_id'),
            channel_id: channelType,
            time_range: JSON.stringify(timeRange)
          }
        }).then(res => {
          if (res.code === 200) {
            let clickRateArr = res.data.clickRateArr.map(item => {
              return this.$_toFixed(item)
            })
            this.mobileData = res.data
            this.mobileData.clickRateArr = clickRateArr
            this.mobileModel.xAxis.data = res.data.datelist
            let y0 = res.data.bgArr
            let y1 = res.data.clickArr
            if (this.mobileLeftSelect === 'spend') {
              y0 = []
            }
            if (this.mobileRightSelect === 'clickRate') {
              y1 = clickRateArr
            }
            this.mobileModel.series[0].data = y0
            this.mobileModel.series[1].data = y1
            this.mobileChart.setOption(this.mobileModel)
            this.mobileChart.hideLoading()
          } else {
            this.mobileChart.hideLoading()
          }
        })
      },
      selectChange (val, dataType, type) {
        const typeName = dataType.replace(/Data/, '')
        switch (val) {
          case 'clickCount':
            this[typeName + 'Model'].yAxis[type]['name'] = '点击量'
            this[typeName + 'Model'].series[type]['name'] = '点击量'
            this[typeName + 'Model'].series[type]['data'] = this[dataType].clickArr

            break
          case 'bgCount':
            this[typeName + 'Model'].yAxis[type]['name'] = '曝光量'
            this[typeName + 'Model'].series[type]['name'] = '曝光量'
            this[typeName + 'Model'].series[type]['data'] = this[dataType].bgArr

            break
          case 'clickRate':
            this[typeName + 'Model'].yAxis[type]['name'] = '点击率（‰）'
            this[typeName + 'Model'].series[type]['name'] = '点击率（‰）'
            this[typeName + 'Model'].series[type]['data'] = this[dataType].clickRateArr

            break
          case 'spend':
            this[typeName + 'Model'].yAxis[type]['name'] = '花费'
            this[typeName + 'Model'].series[type]['name'] = '花费'
            this[typeName + 'Model'].series[type]['data'] = [] // todo 增加花费数据

            break
          default:
            alert('error!')
        }
        this[typeName + 'Chart'].setOption(this[typeName + 'Model'])
      },
      chartDateChange (timeRange, type) {
        const that = this
        let dateArr = timeRange.map((item, index) => {
          if (index === 0) {
            let res = new Date(item).setHours(0, 0, 0, 0)
            that.mobileDate[index] = res
            return res
          } else if (index === 1) {
            let res = new Date(item).setHours(23, 59, 59, 999)
            that.mobileDate[index] = res
            return res
          }
        })
        this.getMChartsData(dateArr, this.indexs + 1)
      },
      toPlan () {
        this.$router.push('plan')
      },
      toggleTags: function (index) {
        this.indexs = index
        this.getTotalDate(index + 1)
        this.getMChartsData(this.mobileDate, index + 1)
      }
    },
    mounted: function () {
      this.mobileChart = this.$echarts.init(document.getElementsByClassName('mobile-chart-box')[0])
      this.mobileChart.setOption(chartOption)
      this.getMChartsData()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .index {
    .index-content {
      width 100%;
      height 200px;
      border 1px solid #e1e1e1;
      border-radius 3px;
      padding 30px;
      background #fff;
    }
    .user {
      height 100%;
      width 400px;
      float left;
    }
    .user-info-right {
      height 100%;
      width 270px;
      float right;
      .paycheck {
        background: #699f5b;
        color: #fff;
        margin-left: 5px;
      }
    }
    .user-header {
      height 100px;
      width 100px;
      background-image: url("../../assets/img/avatar.jpg");
      background-position center
      background-size cover
      border-radius: 50px;
      float left;
    }
    .now-location {
      height 56px;
      line-height 56px;
    }
    .user-info {
      height 50px;
      line-height 50px;
      width 100%;
      font-size 14px
    }
    .self-space {
      color #1D8CE0;
      float right;
    }
    .link-button {
      margin-top 20px
    }
    .tab-tag {
      height 100%;
      width 60px;
      float left;
      .tagActive {
        background #169bd5;
        color #fff;
      }
    }
    .tab-tag li {
      display block;
      height 46px;
      line-height 46px;
      text-align center;
      cursor pointer;
      background #f9f9f9;
    }
    .tag-items {
      float right;
      height 100%;
      width 638px;
      border-left 1px solid #ccc
    }
    .tag-item {
      height 100%;
      width 100%;
    }

    .statist {
      float right;
      border 1px solid #ccc;
      border-radius 10px;
      height 100%;
      width 700px;
      overflow hidden
    }
    .count-data {
      width 100%;
      height 100%
    }
    .grid-content {
      height 69px;
      text-align center
      padding 12px 0
      span {
        font-size 20px
      }
    }
    .mobile {
      width 100%
      margin 20px 0 50px 0
      background #fff
      border-radius 3px
      border 1px solid #e1e1e1
      overflow hidden
    }
    .mobile-number {
      height 130px
      text-align center
      border-bottom 1px solid #e1e1e1
    }
    .mobile-title {
      height 40px
      line-height 40px
      border-bottom 1px solid #e1e1e1
      background #f4f5f9
      .date-wrap {
        float right;
        margin-right: 10px;
        input {
          height: 30px;
        }
      }
    }
    .mobile-title span {
      margin-left 10px
    }

    .mobile-n-grid {
      height 130px
      padding 40px 0;
      span {
        font-size 26px
        font-weight bold
        margin-top 20px
      }
    }

    .mobile-chart {
      padding: 20px 30px
    }
    .mobile-chart-color {
      .mobile-chart-color-l {
        display inline-block
        width 200px
        height 30px;
        span {
          display inline-block
          height 15px
          width 15px
          position relative
          top 2px
          left 8px
          border-radius 50%
          background #66c4cb
        }
        input {
          margin-left 10px
          height 25px
          width 150px
        }
      }
      .mobile-chart-color-r {
        display inline-block
        width 200px
        float right
        height 30px;
        span {
          display inline-block
          height 15px
          width 15px
          position relative
          top 2px
          left 8px
          border-radius 50%
          background #b5a4d9
        }
        input {
          margin-left 10px
          height 25px
          width 150px
        }
      }
      .date-wrap {
        display inline-block
        float right
        input {
          height: 25px;
        }
      }
    }
    .mobile-chart-box {
      height 350px
      width 100%
    }

    .b {
      border-bottom 1px solid #e1e1e1
    }
    .r {
      border-right 1px solid #e1e1e1
    }
    .color-red {
      color red
    }
    .olor-blue {
      color #1D8CE0;
    }
  }
</style>
