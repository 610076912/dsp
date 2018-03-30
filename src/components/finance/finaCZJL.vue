<template>
  <div class="rechange-log">
    <div class="rechange-title"><span>{{path}}</span></div>
    <!-- 表单father -->
    <div class="rechange-table">
      <!-- 表单title -->
      <div class="rechange-title-select">
        <span>推广账户花费走势</span>
        <!-- 下拉选择框 -->
        <div class="select">
          <el-select v-model="value" clearable placeholder="近7天" size="small">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <!-- 查询按钮 -->
        <el-button type="primary" size="small">查询</el-button>
      </div>
      <!-- 表单 -->
      <div class="rechange-data">
        <el-table :data="tableData" border style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}">
          <el-table-column prop="actName" label="活动名称"></el-table-column>
          <el-table-column prop="actDate" label="时间" sortable></el-table-column>
          <el-table-column prop="actShow" label="曝光量" sortable></el-table-column>
          <el-table-column prop="actClick" label="点击量" sortable></el-table-column>
          <el-table-column prop="actJump" label="跳转量" sortable></el-table-column>
          <el-table-column prop="actClickRate" label="点击率" sortable></el-table-column>
          <el-table-column prop="actPay" label="总花费（元）" sortable></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'finaCZJL',
    data () {
      return {
        path: '充值记录',
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
  .rechange-log{
    height 100%
    width 100%
    .rechange-title{
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
    .rechange-table{
      padding: 30px
    }
    .rechange-title-select{
      border 1px solid #e1e1e1
      border-bottom none
      border-radius: 3px 3px 0 0
      overflow hidden
      height: 50px;
      width: 100%;
      padding: 0 20px;
      line-height: 50px;
      background: #f4f5f9;
      position: relative;
      .select{
        height: 30px;
        width: 80px;
        position: absolute;
        right: 110px;
        top: 0;
      }
      button{
        width 80px
        position absolute
        right 20px
        top 11px
      }
    }
    .rechange-data{

    }
  }
</style>
