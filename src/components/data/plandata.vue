<template>
  <div id="plandata">
    <p class="header">推广数据</p>
    <div class="nav">
      <div class="navname">推广活动数据</div>
    </div>
    <div class="chart">
      <div class="top">
        <div class="name">移动营销概况</div>
        <div class="top-right">
          <!-- 设备选择框 -->
          <div class="device">
            <el-select v-model="device" size="small" placeholder="请选择">
              <el-option
                v-for="item in deviceO"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <!-- 活动选择框 -->
          <div class="activity">
            <el-select v-model="activity" size="small" placeholder="请选择">
              <el-option
                v-for="item in deviceO"
                :key="item.value"
                :label="item.label"
                :value="item.value">
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
          <li><p>0</p><span>曝光量(次)</span></li>
          <li><p>0</p><span>点击量(次)</span></li>
          <li><p>0</p><span>点击率(次)</span></li>
          <li><p>0</p><span>花费(元)</span></li>
        </ul>
      </div>
      <div class="chart-con">
        <!-- select选择期 -->
        <div class="chartSelect">
          <div class="mobile-chart-color-l">
            <span></span>
            <el-select v-model="selectL" size="mini"
              @change="selectChange()"
              placeholder="请选择">
              <el-option
                v-for="item in selectO"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="mobile-chart-color-r">
            <span></span>
            <el-select v-model="selectR" size="mini"
              @change="selectChange()"
              placeholder="请选择">
              <el-option
                v-for="item in selectO"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
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
        <span class="outform">导出报表</span>
      </div>
      <el-table :data="tableData" stripe border style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}">
        <el-table-column prop="actDate" label="时间" ></el-table-column>
        <el-table-column prop="actName" label="活动名称"></el-table-column>
        <el-table-column prop="actShow" label="曝光量" sortable></el-table-column>
        <el-table-column prop="actClick" label="点击量" sortable></el-table-column>
        <el-table-column prop="actClickRate" label="点击率" sortable></el-table-column>
        <el-table-column prop="actPay" label="总花费" sortable></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'plandata',
  data () {
    return {
      deviceO: [{
        value: '1',
        label: 'PC'
      }, {
        value: '2',
        label: 'Mobile'
      }, {
        value: '3',
        label: 'OTT'
      }],
      device: '1',
      activity: '1',
      selectO: [{      // 选择器选项
        value: 'bgcount',
        label: '曝光量'
      }, {
        value: 'click',
        label: '点击量'
      }, {
        value: 'pjclick',
        label: '点击率'
      }, {
        value: 'huafei',
        label: '花费'
      }],
      selectL: 'bgcount',  // 左边选中状态
      selectR: 'click',    // 右边选中状态
      tableData: [{
        actName: '奥迪A8',
        actDate: '2017-9-1',
        actShow: '123',
        actClick: '12',
        actJump: '1',
        actClickRate: '2',
        actPay: '123'
      }]
    }
  },
  methods: {
    search () {
      console.log(this.dateValue)
    },
    selectChange () {
      this.echarts()
    },
    isWho (me) {
      if (me === 'bgcount') {
        return '曝光量'
      } else if (me === 'click') {
        return '点击量'
      } else if (me === 'pjclick') {
        return '点击率'
      } else if (me === 'huafei') {
        return '花费'
      }
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
            data: ['2017-12-18', '2017-12-19', '2017-12-20', '2017-12-21', '2017-12-22', '2017-12-23', '2017-12-24', '2017-12-25'],
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            }
          }
        ],
        yAxis: [  // 设置两个y轴
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
            areaStyle: { normal: {} },  // 填充背景
            yAxisIndex: 0,
            data: [2, 3, 6, 4, 5, 3, 8, 6]
          },
          {
            name: this.isWho(this.selectR),
            type: 'line',
            smooth: true, // 这句就是让曲线变平滑的
            areaStyle: { normal: {} },
            yAxisIndex: 1,
            data: [4, 3, 5, 8, 6, 7, 3, 4]
          }
        ]
      }
      myChart.setOption(echartData)
    }
  },
  mounted: function () {
    this.echarts()
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
    border-bottom 2px solid #4a9cd3
    .navname {
      height 100%;
      width 150px;
      color #fff;
      border-radius: 6px 6px 0 0
      background #4a9cd3
      text-align center
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
        width: 460px;
        height: 100%;
        padding-top: 15px
        float: right;
        .device{
          width: 160px
          float left
          margin-right 15px
        }
        .activity {
          width: 160px
          float left
          margin-right 15px
        }

        .dates {
          height: 30px;
          float: left;
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
