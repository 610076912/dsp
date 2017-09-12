<template>
  <div class="plan-index">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="移动推广" name="first"></el-tab-pane>
      <el-tab-pane label="PC推广" name="second"></el-tab-pane>
      <el-tab-pane label="大屏推广" name="third"></el-tab-pane>
      <div class="card-header">
        <button class="batch-del" @click="beachDel">批量删除</button>
        <label>
          排序：
          <el-select v-model="sort" class="sort-select">
            <el-option key="time" label="活动推广时间" value="time"></el-option>
            <el-option key="group" label="分组" value="group"></el-option>
            <el-option key="kg" label="开关" value="kg"></el-option>
          </el-select>
        </label>
        <div class="serch">
          <el-input
            placeholder="填写活动名称查询"
            icon="search"
            v-model="serchText">
          </el-input>
        </div>
        <div class="date-wrap">
          <el-date-picker
            type="daterange"
            placeholder="选择日期范围">
          </el-date-picker>
        </div>
        <label>
          组名：
          <el-select v-model="seekData.group" class="group-select">
            <el-option
              v-for="g in group"
              :key="g.group_id"
              :label="g.group_name"
              :value="g.group_id">
            </el-option>
          </el-select>
        </label>
        <label>
          状态：
          <el-select v-model="sort" class="status-select">
            <el-option key="time" label="活动推广时间" value="time"></el-option>
            <el-option key="group" label="分组" value="group"></el-option>
            <el-option key="kg" label="开关" value="kg"></el-option>
          </el-select>
        </label>
        <button class="submit" @click="aaa">查询</button>
      </div>
      <div class="card-content">
        <el-table
          :data="tableData"
          border
          stripe
          @select="select"
          @selection-change="selectionChange"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="40">
          </el-table-column>
          <el-table-column
            label="活动ID"
            width="60">

          </el-table-column>
          <el-table-column
            label="活动名称"
            width="120">
          </el-table-column>
          <el-table-column
            label="组名"
            width="70">
          </el-table-column>
          <el-table-column
            label="推广时间"
            width="160">
          </el-table-column>
          <el-table-column
            label="日预算"
            width="60">
          </el-table-column>
          <el-table-column
            label="总预算"
            width="60">
          </el-table-column>
          <el-table-column
            label="媒体状态"
            width="100">
          </el-table-column>
          <el-table-column
            label="广告素材"
            width="100">
          </el-table-column>
          <el-table-column
            label="投放策略"
            width="70">
          </el-table-column>
          <el-table-column
            label="开关"
            width="100">
            <template scope="scope">
              <el-switch
                v-model="scope.row.kg"
                on-color="#ff9900"
                @change="switch1(scope)">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            label="活动状态"
            width="70">
          </el-table-column>
          <el-table-column label="功能操作">
            <template scope="scope">
              <span class="operation">查看&nbsp;</span>
              <span class="operation">复制</span>
              <br>
              <span class="operation">报表&nbsp;</span>
              <span class="operation">删除</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-tabs>
    <button class="creat-new" @click="creatNew">新建活动</button>
  </div>
</template>

<script type="text/ecmascript-6">
  import setps from './steps-component.vue'

  export default {
    name: 'plan',
    data () {
      return {
        activeName: 'first',
        sort: '',
        serchText: '',
        group: [],
        seekData: {
          group_id: ''
        },
        // 选中个数，判断是否可以点击批量删除
        selectedLength: 0,
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          kg: false
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          kg: true
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          kg: false
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          kg: true
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          kg: false
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          kg: true
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          kg: false
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          kg: true
        }]
      }
    },
    created () {
      const that = this
      // 获取分组
      this.$http.get('/api/get_act_group').then(data => {
        console.log(data)
        if (data.code === 200) {
          that.group = data.data
        }
      })
    },
    watch: {
      // 排序
      'sort' () {
        console.log(this.sort)
      }
    },
    methods: {
      // 新建按钮
      creatNew () {
        this.$emit('creatNew')
        this.$router.push('/creatBasics')
      },
      aaa () {
        this.$router.push('/creatBasics')
      },
      // 选项卡
      handleClick () {
        console.log(this.activeName)
      },
      // 当手动选择复选框时触发事件
      select (selection, row) {
        console.log(selection, row)
      },
      // 当选择项发生变化时触发
      selectionChange (selection) {
        console.log(selection)
        this.selectedLength = selection.length
      },
      // 开关状态改变时调用
      switch1 (result) {
        console.log(result)
        alert('第' + (result.$index + 1) + '行的开关状态为' + result.row.kg)
      },
      // 批量删除按钮方法
      beachDel () {
        console.log(this.selectedLength)
        if (!this.selectedLength) {
          alert('请选择要删除的项')
          return
        }
        alert('删除成功')
      }
    },
    components: {
      setps
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .plan-index {
    position: relative;
    padding: 30px;
    min-height: calc(100vh - 440px);
    .card-header {
      margin-bottom: 10px;
      input {
        height: 30px;
      }
      div {
        display: inline-block;
      }
      .batch-del, .submit {
        width: 80px;
        height: 30px;
        background: f4f4f4;
        border: none;
        outline: none;
        cursor: pointer;
        border-radius: 3px;
        margin-right: 10px;
      }
      .sort-select {
        width: 130px;
        margin-right: 55px;
      }
      .serch {
        width: 180px;
        margin-right: 15px;
      }
      .group-select, .status-select {
        margin-right: 10px;
        width: 90px;
      }
      .submit {
        background: #169bd5;
        color: #fff;
        float: right;
      }
    }
    .card-content {
      background: #169bd5;
      width: 100%;
      .el-table .cell, .el-table th > div {
        padding: 0 10px;
        text-align: center;
      }
      .operation {
        color: #169bd5;
        border-right: 1px solid #000;
        cursor: pointer;
        &:nth-of-type(2n) {
          border: none;
        }
      }
    }
    .creat-new {
      width: 100px;
      height: 35px;
      color: #fff;
      background: #169bd5;
      border: none;
      outline: none;
      border-radius: 3px;
      position: absolute;
      top: 32px;
      right: 35px;
      cursor: pointer;
      a {
        display: inline-block;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
