<template>
  <div class="rechange-log">
    <div class="rechange-title"><span>{{path}}</span></div>
    <!-- 表单father -->
    <div class="rechange-table">
      <!-- 表单title -->
      <div class="rechange-title-select">
        <span>推广账户花费走势</span>
        <!-- 搜索框 -->
        <div class="search">
          <el-input size="small" v-model="searchText" placeholder="请输入项目ID或名称" icon="close"
                    :on-icon-click="clearSearchText"></el-input>
        </div>
        <!-- 查询按钮 -->
        <el-button type="primary" size="small" @click="search">查询</el-button>
      </div>
      <!-- 表单 -->
      <div class="rechange-data">
        <el-table :data="tableData" border style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
          <el-table-column prop="plan_id" label="ID" align="center" width="70"></el-table-column>
          <el-table-column prop="plan_name" label="推广计划名称" align="center" width="200"></el-table-column>
          <el-table-column prop="plan_b_time" label="推广计划时间" :formatter="dateFormatter" width="200"
                           align="center"></el-table-column>
          <el-table-column prop="plan_all_budget" label="预算（元）" align="center"></el-table-column>
          <el-table-column prop="consume" label="花费金额（元）" align="center"></el-table-column>
          <el-table-column prop="cv" label="点击量" align="center"></el-table-column>
          <el-table-column prop="pv" label="曝光量" align="center"></el-table-column>
          <el-table-column prop="plan_channel" label="端口" :formatter="dkFormatter" align="center"></el-table-column>
        </el-table>
      </div>
      <div class="page-wrap">
        <el-pagination
          layout="total, prev, pager, next"
          @current-change="currentChange"
          :page-size="pageSize"
          :total="pageTotal">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'finaHistory',
    data () {
      return {
        path: '历史数据',
        searchText: '',
        options: '',
        pageTotal: 0,
        pageSize: 20,
        tableData: []
      }
    },
    created () {
      this.getTableData()
    },
    methods: {
      // 获取数据
      getTableData (page = 1, pageCount = this.pageSize) {
        this.$http.get('/api2/history_plans', {
          params: {
            page_id: page,
            page_count: pageCount
          }
        }).then(res => {
          if (res.code === 200) {
            this.tableData = res.data.data
            this.pageTotal = res.data.total
          }
        })
      },
      // 搜索
      search () {
        if (!this.searchText) {
          return
        }
        this.$http.get('/api2/search_history_plans', {
          params: {
            parm: this.searchText
          }
        }).then((res) => {
          this.tableData = res.data.data
          this.pageTotal = res.data.total
        })
      },
      // 清空搜索框文字
      clearSearchText () {
        this.searchText = ''
        this.getTableData()
      },
      // 翻页
      currentChange (currentPage) {
        this.getTableData(currentPage)
      },
      // 格式化时间和端口
      dateFormatter (row) {
        return new Date(row.plan_b_time).Format('yyyy-MM-dd') + ' -- ' + new Date(row.plan_e_time).Format('yyyy-MM-dd')
      },
      dkFormatter (a, b, c) {
        switch (c) {
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
  .rechange-log {
    height 100%
    min-height 493px
    width 100%
    .rechange-title {
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
    .rechange-table {
      padding: 30px
    }
    .rechange-title-select {
      border 1px solid #e1e1e1
      border-bottom none
      border-radius: 3px 3px 0 0
      overflow hidden
      height: 60px;
      width: 100%;
      padding: 0 20px;
      line-height: 60px;
      background: #f4f5f9;
      position: relative;
      .search {
        height: 30px;
        width: 180px;
        position: absolute;
        right: 110px;
        top: 0;
      }
      button {
        width 80px
        position absolute
        right 20px
        top 15px
      }
    }
    .rechange-data {

    }
    .page-wrap {
      float: right;
      margin: 20px 0;
    }
  }
</style>
