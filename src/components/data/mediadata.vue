<template>
  <div id="mediadata">
    <p class="header">媒体分析</p>
    <el-tabs class="tab" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="媒体分析" name="first"></el-tab-pane>
    </el-tabs>

    <div class="form">
      <div class="top">
        <span class="name">数据明细</span>
        <span class="outform">导出报表</span>
      </div>
      <el-table :data="tableData" border style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}">
        <el-table-column prop="medDate" label="时间" sortable></el-table-column>
        <el-table-column prop="medPlatform" label="媒体平台"></el-table-column>
        <el-table-column prop="medShow" label="曝光量" sortable></el-table-column>
        <el-table-column prop="medClick" label="点击量" sortable></el-table-column>
        <el-table-column prop="medJump" label="跳转量" sortable></el-table-column>
        <el-table-column prop="medClickRate" label="点击率" sortable></el-table-column>
        <el-table-column prop="medPay" label="总花费" sortable></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
    export default {
      name: 'mediadata',
      data () {
        return {
          msg: 'mediadata',
          activeName: 'first',
          tableData: [{
            medDate: '2017-9-1',
            medPlatform: '爱奇艺',
            medShow: '123',
            medClick: '12',
            medJump: '1',
            medClickRate: '2',
            medPay: '123'
          }]
        }
      },
      methods: {
        handleClick (tab, event) {
          console.log(tab, event)
          console.log(this)
        }
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  borderColor = #e4e4e4;
  border-radius()
  -webkit-border-radius arguments
  -moz-border-radius arguments
  border-radius arguments
  #mediadata{
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
    .form{
      margin-top: 30px

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
