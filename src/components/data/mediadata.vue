<template>
  <div id="mediadata">
    <p class="header">媒体分析</p>
    <div class="nav">
      <div class="navname">媒体分析数据</div>
    </div>

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
