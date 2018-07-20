<template>
  <div class="basic">
    <div class="basic-title"><span>财务详情</span></div>
    <div class="basic-data">
      <h3>账户余额：{{over}} 元</h3>
      <div class="money-chart bro">
        <div class="money-chart-title">
          <span>推广账户花费走势</span>
          <div class="money-chart-select">
            <el-date-picker
              v-model="date"
              size="small"
              :editable="false"
              type="month"
              placeholder="选择月">
            </el-date-picker>
          </div>
          <el-button type="primary" size="small" @click="request">查询</el-button>
        </div>
        <!-- 图表 -->
        <div class="money-chart-content">

        </div>
      </div>
      <!-- 表单 -->
      <div class="form">
        <h3>
          <span class="name">推广账户花费列表</span>
          <p>总花费：{{totalCost}} 元</p>
        </h3>
        <div class="form-data">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="date" label="时间" sortable :resizable="false" align="center"></el-table-column>
            <el-table-column prop="pv" label="曝光量" sortable :resizable="false" align="center"></el-table-column>
            <el-table-column prop="click" label="点击量" sortable :resizable="false" align="center"></el-table-column>
            <el-table-column prop="cost" label="花费金额（元）" sortable :resizable="false" align="center"></el-table-column>
            <el-table-column prop="balance" label="计划余额（元）" sortable :resizable="false" align="center"></el-table-column>
            <el-table-column prop="actClickRate" label="功能" align="center">
              <template slot-scope="scope">
                <span class="operation" @click="showDetail(scope.row.date)">查看详情</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!--弹出框-->
      <el-dialog :title="dialogDate" :visible.sync="dialogTableVisible">
        <el-table :data="dialogData" border>
          <el-table-column property="planId" label="活动ID" width="150" align="center"></el-table-column>
          <el-table-column property="planName" label="计划名称" width="200" align="center"></el-table-column>
          <el-table-column property="planChannel" label="端口" align="center" :formatter="channelFormatter"></el-table-column>
          <el-table-column property="pv" label="曝光量" align="center"></el-table-column>
          <el-table-column property="click" label="点击量" align="center"></el-table-column>
          <el-table-column property="cost" label="花费（元）" align="center"></el-table-column>
          <el-table-column property="balance" label="计划余额（元）" align="center"></el-table-column>
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import spurious from '../../../static/json/spurious'
  let chartData = {
    tooltip: {trigger: 'axis'},
    color: [
      '#66c4cb'
    ],
    toolbox: {
      feature: {saveAsImage: {}}
    },
    grid: {
      left: '50px',
      right: '50px',
      bottom: '1px',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: []
      }
    ],
    yAxis: [
      {
        type: 'value',
        scale: true,
        name: '花费（元）'
      }
    ],
    series: [
      {
        name: '花费（元）',
        type: 'line',
        smooth: true,
        data: []
      }
    ]
  }
  export default {
    name: 'finaCWGK',
    data () {
      return {
        path: '财务概况',
        myEchart: {},
        date: new Date(),
        // dialog弹框
        dialogTableVisible: false,
        // dialogData
        dialogData: [],
        // dialogDate dialog日期
        dialogDate: '',
        // 账户余额
        over: 0,
        // 总花费
        totalCost: 0,
        // 表格数据
        tableData: [],
        // 更新图表数据
        updateChartData: {
          xAxis: [
            {
              data: []
            }
          ],
          series: [
            {
              data: []
            }
          ]
        }
      }
    },
    mounted () {
      this.myEchart = this.$echarts.init(document.getElementsByClassName('money-chart-content')[0])
      this.myEchart.setOption(chartData)
    },
    created () {
      this.getData(this.getFDayLDay.firstDay, this.getFDayLDay.lastDay)
    },
    computed: {
      /*
      * 根据this.date计算这个月的第一天和最后一天
      * */
      'getFDayLDay' () {
        let monthNum = this.date.getMonth()
        let yearNum = this.date.getFullYear()
        // 第一天
        let firstDay = new Date(new Date(new Date(new Date().setFullYear(yearNum)).setMonth(monthNum)).setDate(1))
        // 最后一天
        let lastDay = new Date(new Date(new Date(new Date().setFullYear(yearNum)).setMonth(monthNum + 1)).setDate(0))
        return {firstDay, lastDay}
      }
    },
    methods: {
      // 查看某天详情
      showDetail (daytime) {
        this.dialogTableVisible = true
        this.dialogData = []
        this.getDialogData(daytime)
      },
      // 查询按钮
      request () {
        this.getData(this.getFDayLDay.firstDay, this.getFDayLDay.lastDay)
      },
      // 获取弹出框dialog数据
      getDialogData (daytime) {
        this.$http.get('/api2/cost_trend_info', {
          params: {
            time: daytime
          }
        }).then(res => {
          if (res.code === 200) {
            this.dialogDate = res.data.daytime[0]
            res.data.plan_id.forEach((item, index) => {
              let obj = {}
              obj.planId = item
              obj.planName = res.data.plan_name[index]
              obj.pv = res.data.pv[index]
              obj.planChannel = res.data.plan_channel[index]
              obj.cost = this.$_toFixed(res.data.cost[index], 3) / 1000
              obj.click = res.data.click[index]
              obj.balance = this.$_toFixed(res.data.balance[index], 3) / 1000
              this.dialogData.push(obj)
            })
          }
        })
      },
      // 获取图表和表格数据数据
      getData (sTime, eTime) {
        this.$http.get('/api2/cost_trend', {
          params: {
            start_time: sTime,
            end_time: eTime
          }
        }).then((res) => {
          if (res.code === 200) {
            // 数据造假
            if (sessionStorage.getItem('user_id') === 'H1lzVeGM7SyllfExfzX') {
              res.data = spurious.cw
              console.log(res.data)
            }
            this.over = res.data.over
            if (res.data.all_costs !== 0) {
              // 对拿到的数据做小数位处理，保留三位小数
              res.data.all_costs = this.$_toFixed(res.data.all_costs, 2) / 1000
              const that = this
              res.data.cost.forEach((item, i) => {
                res.data.cost[i] = that.$_toFixed(item, 2) / 1000
                res.data.balance[i] = that.$_toFixed(res.data.balance[i], 2) / 1000
              })
              this.totalCost = res.data.all_costs
              // 给图表加载数据
              this.updateChartData.xAxis[0].data = res.data.daytime
              this.updateChartData.series[0].data = res.data.cost
              this.myEchart.setOption(this.updateChartData)
              // 给表格加载数据
              this.tableData = []
              res.data.daytime.forEach((item, index) => {
                let obj = {}
                obj.date = item
                obj.balance = res.data.balance[index]
                obj.click = res.data.click[index]
                obj.cost = res.data.cost[index]
                obj.pv = res.data.pv[index]
                this.tableData.push(obj)
              })
            }
          } else if (res.data.all_costs === 0) {
            this.tableData = []
            this.myEchart.setOption(chartData)
            this.totalCost = 0
          }
        })
      },
      // 格式化端口
      channelFormatter (row, col, cellVal) {
        switch (cellVal) {
          case 1:
            return '移动'
          case 2:
            return 'PC'
          case 3:
            return '大屏'
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .basic {
    height 100%
    width 100%
    .basic-title {
      margin: 30px 30px 0px;
      height 46px
      border-bottom 1px solid #1d8ce0
      font-size 14px
      span {
        display inline-block
        font-size: 16px;
        height 46px
        line-height 50px
      }
    }
    .basic-data {
      width 100%
      padding 30px
      h3 {
        padding-left 6px
        border-left 3px solid #1d8ce0
        margin-bottom: 20px;
        p {
          float: right;
        }
      }
      .money-chart {
        width 100%
        margin-bottom 20px
        .money-chart-title {
          height 50px
          width 100%
          padding 0 20px
          line-height 50px
          background #f4f5f9
          position relative
        }
        button {
          width 70px
          position absolute
          right 20px
          top 10px
        }
        .money-chart-select {
          height 100%
          width 193px
          position absolute
          right 110px
          top 0
        }
        .money-chart-content {
          padding 30px 0
          height 300px
        }
      }
      .form-data {
        margin-top: 20px
        .operation {
          color: #169bd5;
          cursor: pointer;
        }
      }
    }
    .bro {
      border 1px solid #e1e1e1
      border-radius 3px
      overflow hidden
    }
    .b-r {
      border-right 1px solid #e1e1e1
    }
  }

</style>
