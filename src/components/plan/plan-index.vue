<template>
  <div class="plan-index">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="移动推广" name="1"></el-tab-pane>
      <el-tab-pane label="PC推广" name="2"></el-tab-pane>
      <el-tab-pane label="大屏推广" name="3"></el-tab-pane>
      <div class="card-header">
        <button class="batch-del" @click="beachDel">批量删除</button>
        <label>
          排序：
          <el-select v-model="seekData.sort" class="sort-select" clearable>
            <el-option key="time" label="活动推广时间" value="1"></el-option>
            <el-option key="group" label="活动ID" value="0"></el-option>
          </el-select>
        </label>
        <div class="serch">
          <el-input
            placeholder="填写活动名称查询"
            icon="search"
            v-model="seekData.name">
          </el-input>
        </div>
        <div class="date-wrap">
          <el-date-picker
            type="daterange"
            v-model="seekData.date"
            placeholder="选择日期范围">
          </el-date-picker>
        </div>
        <label>
          组名：
          <el-select v-model="seekData.group" class="group-select" clearable>
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
          <el-select v-model="seekData.status" class="status-select" clearable>
            <el-option key="time" label="活动推广时间" value="time"></el-option>
            <el-option key="group" label="分组" value="group"></el-option>
            <el-option key="kg" label="开关" value="kg"></el-option>
          </el-select>
        </label>
        <button class="submit" @click="seek">查询</button>
      </div>
      <div class="card-content">
        <el-table
          :data="tableData"
          ref="indexTable"
          border
          stripe
          @select="select"
          @selection-change="selectionChange"
          style="width: 100%">
          <el-table-column
            type="selection"
            align="center"
            width="40">
          </el-table-column>
          <el-table-column
            label="活动ID"
            prop="act_id"
            align="center"
            width="60">
          </el-table-column>
          <el-table-column
            label="活动名称"
            prop="act_name"
            align="center"
            width="140">
          </el-table-column>
          <el-table-column
            label="组名"
            prop="group_name"
            align="center"
            width="60">
          </el-table-column>
          <el-table-column
            label="推广时间"
            prop="time"
            :formatter="formatter"
            align="center"
            width="140">
          </el-table-column>
          <el-table-column
            label="日预算"
            prop="day_budget"
            align="center"
            width="75">
          </el-table-column>
          <el-table-column
            label="总预算"
            prop="all_budget"
            align="center"
            width="75">
          </el-table-column>
          <el-table-column
            label="媒体状态"
            prop="meidanum"
            align="center"
            width="75">
          </el-table-column>
          <el-table-column
            label="广告素材"
            align="center"
            prop="adnum"
            width="75">
          </el-table-column>
          <el-table-column
            label="投放策略"
            align="center"
            prop="billing"
            width="75">
          </el-table-column>
          <el-table-column
            label="开关"
            align="center"
            width="100">
            <template scope="scope">
              <el-switch
                v-model="scope.row.publish"
                on-color="#ff9900"
                @change="switch1(scope)">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            label="活动状态"
            align="center"
            prop="status"
            width="90">
          </el-table-column>
          <el-table-column label="功能操作" align="left">
            <template scope="scope">
              <span class="operation">查看&nbsp;</span>
              <span class="operation">复制&nbsp;</span>
              <span class="operation" @click="excentionStatus">状态</span>
              <br>
              <span class="operation">报表&nbsp;</span>
              <span class="operation" @click="itemDel(scope.row.act_id)">删除&nbsp;</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-tabs>
    <button class="creat-new" @click="creatNew">新建活动</button>
    <el-dialog title="提示" :visible.sync="dialogVisible" size="tiny">
      <el-table :data="exStatus" border="true">
        <el-table-column property="id" label="活动ID" width="60" align="center"></el-table-column>
        <el-table-column property="name" label="活动名称" width="110" align="center"></el-table-column>
        <el-table-column
          label="开关"
          align="center">
          <template scope="scope">
            <el-switch
              v-model="scope.row.kg"
              on-color="#ff9900">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column property="status" label="素材状态" align="center" width="120"></el-table-column>
        <el-table-column label="功能操作" align="center">
          <template scope="scope">
            <span>编辑素材</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import setps from './steps-component.vue'

  export default {
    name: 'plan',
    data () {
      return {
        activeName: '1',
        sort: '',
        serchText: '',
        group: [],
        seekData: {
          sort: '',
          name: '',
          date: [],
          group: '',
          status: ''
        },
        // 选中个数，判断是否可以点击批量删除
        selectedLength: 0,
        // 表格数据
        tableData: [],
        dialogVisible: false,
        // 状态数据
        exStatus: [
          {
            id: 123,
            name: '土豆',
            kg: false,
            status: 2
          },
          {
            id: 124,
            name: '土豆',
            kg: false,
            status: 2
          },
          {
            id: 121,
            name: '土豆',
            kg: false,
            status: 2
          },
          {
            id: 122,
            name: '土豆',
            kg: false,
            status: 2
          }
        ]
      }
    },
    created () {
      // 获取分组
      this.$http.get('/api2/get_plan_group').then(data => {
        console.log(data)
        if (data.code === 200) {
          this.group = data.data
        }
      })
      // 获取数据
      this.$nextTick(function () {
        this.getActiveList({})
      })
    },
    watch: {
      // 排序
      'sort' () {
        console.log(this.sort)
      }
    },
    methods: {
      // 获取活动列表
      getActiveList (option) {
        const that = this
        if (!arguments[0].name) arguments[0].name = null
        if (!arguments[0].groupId) arguments[0].groupId = null
        if (!arguments[0].status) arguments[0].status = null
        if (!arguments[0].timeStart) arguments[0].timeStart = null
        if (!arguments[0].timeEnd) arguments[0].timeEnd = null
        if (!arguments[0].sort_type) arguments[0].sort_type = null
        if (!arguments[0].channel) arguments[0].channel = 1
        // Loading
        let loading = this.$loading({
          target: '.card-content',
          text: '努力加载中'
        })
        this.$http.post('/api2/get_act', {
          sort_type: option.sort_type,
          act_name: option.name,
          group_id: option.groupId,
          status: option.status,
          time_start: option.timeStart,
          time_end: option.timeEnd,
          channel: option.channel
        }).then(function (res) {
          loading.close()
          if (res.code === 200) {
            that.tableData = res.data
          }
          console.log(res)
        })
      },
      // 删除
      delActive (actId) {
        const that = this
        this.$http.post('/api/del_act', {
          act_id_list: JSON.stringify(actId)
        }).then(function (res) {
          if (res.code === 200) {
            that.seek()
          }
        })
      },
      // 新建按钮
      creatNew () {
        this.$store.state.creatData.creatBasice = null
        this.$router.push('/creatBasics')
      },
      // 选项卡
      handleClick () {
        console.log(this.activeName)
        this.getActiveList({channel: this.activeName})
      },
      // 当手动选择复选框时触发事件
      select (selection, row) {
        // console.log(selection, row)
      },
      // 当选择项发生变化时触发
      selectionChange (selection) {
        console.log(selection)
        let res = []
        if (selection.length !== 0) {
          selection.forEach(function (item) {
            res.push(item.act_id)
          })
        }
        this.selectedLength = res
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
        this.delActive(this.selectedLength)
      },
      // 单项删除
      itemDel (actId) {
        this.delActive([actId])
      },
      // 查询按钮
      seek () {
        let option = {
          sort_type: this.seekData.sort,
          name: this.seekData.name,
          groupId: this.seekData.group,
          status: this.seekData.status,
          timeStart: this.seekData.date[0] ? new Date(this.seekData.date[0]).Format('yyyy-MM-dd hh:mm:ss') : null,
          timeEnd: this.seekData.date[1] ? new Date(this.seekData.date[1]).Format('yyyy-MM-dd hh:mm:ss') : null
        }
        console.log(option)
        this.getActiveList(option)
      },
      // 状态按钮弹出推广状态
      excentionStatus () {
        this.dialogVisible = !this.dialogVisible
      },
      // 格式化时间
      formatter (item, b, c) {
        return new Date(item.act_b_time).Format('yyyy-MM-dd hh:mm:ss') + ' ' + new Date(item.act_e_time).Format('yyyy-MM-dd hh:mm:ss')
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
      }
      .operation {
        color: #169bd5;
        border-right: 1px solid #000;
        cursor: pointer;
        &:nth-of-type(3n) {
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
