<template>
  <div id="plandata">
    <p class="header">推广数据</p>
    <el-tabs class="tab" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="推广活动数据" name="first"></el-tab-pane>
    </el-tabs>
    <div class="chart">
      <div class="top">
        <div class="name">移动营销概况</div>
        <div class="top-right">
          <div class="activity">
            <el-select v-model="activityValue" placeholder="请选择" size="small">
              <el-option v-for="item in activityOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
          <div class="date">
            <el-select v-model="dateValue" placeholder="请选择" size="small">
              <el-option v-for="item in dateOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
          <div class="btn">
            <el-button type="primary">查询</el-button>
          </div>
        </div>
      </div>
      <div class="data-num">
        <ul>
          <li><p>0</p><span>曝光量(次)</span></li>
          <li><p>0</p><span>点击量(次)</span></li>
          <li><p>0</p><span>跳转量(次)</span></li>
          <li><p>0</p><span>点击率(次)</span></li>
          <li><p>0</p><span>花费(元)</span></li>
        </ul>
      </div>
      <div class="chart-con">

        <div class="line-chart"></div>
      </div>
    </div>
    <div class="form">
      <div class="top">
        <span class="name">推广数据明细</span>
        <span class="outform">导出报表</span>
      </div>
      <el-table :data="tableData" border style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}">
        <el-table-column prop="actName" label="活动名称"></el-table-column>
        <el-table-column prop="actDate" label="时间" sortable></el-table-column>
        <el-table-column prop="actShow" label="曝光量" sortable></el-table-column>
        <el-table-column prop="actClick" label="点击量" sortable></el-table-column>
        <el-table-column prop="actJump" label="跳转量" sortable></el-table-column>
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
        msg: 'plandata',
        activeName: 'first',
        activityOptions: [{
          value: '选项1',
          label: '选项1'
        }, {
          value: '选项2',
          label: '选项2'
        }],
        activityValue: '--全部活动--',
        dateOptions: [{
          value: '选项1',
          label: '选项1'
        }, {
          value: '选项2',
          label: '选项2'
        }],
        dateValue: '近7天',

        tableData: [{
          actName: '奥迪A8',
          actDate: '2017-9-1',
          actShow: '123',
          actClick: '12',
          actJump: '1',
          actClickRate: '2',
          actPay: '123'
        }],

        chartDate: {
          tooltip: {trigger: 'axis'},
          legend: {
            left: '1vw',
            data: ['访客数']
          },
          toolbox: {
            feature: { saveAsImage: {} }
          },
          grid: {
            left: '1vw',
            right: '15px',
            bottom: '1vw',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: [1, 2, 3, 4, 5]
            }
          ],
          yAxis: [
            {type: 'value'}
          ],
          series: [
            {
              name: '访客数',
              type: 'line',
              smooth: true,
              data: [3, 4, 56, 23, 78]
            }
          ],
          color: [
            '#33A4FE'
          ]
        }
      }
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event)
      },
      chartShow () {
        console.log(this)
      }
    },
    mounted: function () {
      const myChart = this.$echarts.init(document.getElementsByClassName('line-chart')[0])
      myChart.setOption(this.chartDate, true)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  borderColor = #e4e4e4;
  border-radius()
  -webkit-border-radius arguments
  -moz-border-radius arguments
  border-radius arguments
  #plandata{
    .header{
      height: 60px
      line-height: 60px
      font-size: 16px
      padding: 0 28px
    }
    .tab{
      background: #f9f9f9;
    }
    .el-tabs__header{
      padding: 0 28px
      margin: 0
      border-bottom: 2px solid #4a9cd3;
    }
    .el-tabs__item.is-active{
      background: #4a9cd3
      color: #e5f0f8
    }
    .chart{
      width: 100%
      height: 550px
      border: 1px solid borderColor
      border-radius(4px)
      margin-top: 30px

      .top{
        width: 100%
        height: 60px
        background: #f4f5f9

        .name{
          height: 100%
          line-height: 60px
          padding: 0 14px
          float: left
          font-size: 14px
        }
        .top-right{
          width: 390px
          height: 100%
          float: right;

          .activity{
            width: 160px
            height: 30px;
            margin: 15px 15px 0 0
            float: left
          }
          .date{
            width: 100px
            height: 30px;
            margin: 15px 15px 0 0
            float: left
          }
          .btn{
            width: 80px
            height: 30px
            float: left
            margin-top: 15px

            .el-button--primary{
              width: 100%;
              height: 100%;
              line-height: 0.5;
            }
          }
        }
      }

      .data-num{
        width: 100%
        height: 124px
        border-top: 1px solid borderColor
        border-bottom: 1px solid borderColor

        ul{
          width: 100%
          height: 100%

          li{
            width: 176px
            height: 100%
            float: left
            border-right: 1px solid borderColor
            text-align center

            p{
              display: inline-block
              width: 100%
              font-size: 26px
              margin-top: 40px
            }
            span{
              display: inline-block
              width: 100%
            }
          }
          li:last-of-type{
            border: none
          }
        }
      }

      .chart-con{
        width: 100%
        height: 100%
      }
      .line-chart{
        width: 840px
        height: 220px
        margin: 100px auto;
      }
    }

    .form{
      margin-top: 50px

      .top{
        height: 26px
        line-height: 26px

        .name{
          float: left
          font-size: 14px
        }
        .outform{
          float: right
        }
      }
    }
  }
</style>
