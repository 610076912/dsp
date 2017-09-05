<template>
  <div class="basic">
    <div class="basic-title"><span>基本数据</span></div>  
    <div class="basic-data">
      <h3>账户概况</h3>
      <div class="basic-money bro">
        <el-col :span="6"><div class="basic-money-gird b-r"><p>可用余额</p><b>￥0.00</b></div></el-col>
        <el-col :span="6"><div class="basic-money-gird b-r"><p>累计充值</p><b>￥0.00</b></div></el-col>
        <el-col :span="6"><div class="basic-money-gird"><p>累计花费</p><b>￥0.00</b></div></el-col>
      </div>
      <div class="money-chart bro">
        <div class="money-chart-title">
          <span>推广账户花费走势</span>
          <div class="money-chart-select">
            <el-select v-model="value" clearable placeholder="近7天" size="small">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <el-button type="primary" size="small">查询</el-button>
        </div>
        <!-- 图表 -->
        <div class="money-chart-content">

        </div>
      </div>
      <!-- 表单 -->
      <div class="form">
        <h3>
          <span class="name">推广数据明细</span>
          <span class="outform">导出报表</span>
        </h3>
        <div class="form-data">
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
    </div>
  </div>
</template>
<script>
  export default {
    name: 'finaCWGK',
    data () {
      return {
        path: '财务概况',
        value: '',
        options: '',
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
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .basic{
    height 100%
    width 100%
    .basic-title{
      height 46px
      border-bottom 1px solid #e1e1e1
      font-size 14px
      color #1d8ce0      
      span{
        display inline-block
        padding: 0 30px
        height 46px
        line-height 50px
        border-bottom 2px solid #1d8ce0 
      }
    }
    .basic-data{
      width 100%
      padding 30px
    }
    .basic-money{
      height 120px
      width 100%
      margin 20px 0
    }
    .basic-money-gird{
      height 120px
      padding 30px 0 
      text-align center
      p{
        font-size 14px
      }
      b{
        color red
        font-size 30px
      }
    }
    .money-chart{
      width 100%
      margin-bottom 20px

      .money-chart-title{
        height 50px
        width 100%
        padding 0 20px
        line-height 50px
        background #f4f5f9
        position relative
      }
      button{
        width 70px
        position absolute 
        right 20px
        top 10px
      }
      .money-chart-select{
        height 30px
        width 80px
        position absolute
        right 110px
        top 0
      }
      .money-chart-content{
        padding 30px 0
        height 300px
      }
    }
    .form-data{
      margin-top: 20px
    }

    .bro{
      border 1px solid #e1e1e1
      border-radius 3px
      overflow hidden
    }
    .b-r{
      border-right 1px solid #e1e1e1 
    }
    h3{
      padding-left 6px
      border-left 3px solid #1d8ce0 
    }
  }

</style>
