<template>
  <div class="plan-index">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="移动推广" name="1"></el-tab-pane>
      <el-tab-pane label="PC推广" name="2"></el-tab-pane>
      <el-tab-pane label="大屏推广" name="3"></el-tab-pane>
      <div class="card-header">
        <!--<button class="batch-del" @click="beachDel">批量删除</button>-->
        <label>
          排序：
          <el-select v-model="seekData.sort" class="sort-select" clearable>
            <el-option key="time" label="计划推广时间" value="1"></el-option>
            <el-option key="group" label="计划ID" value="0"></el-option>
          </el-select>
        </label>
        <div class="serch">
          <el-input
            placeholder="填写计划名称查询"
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
        <!--<label>-->
        <!--状态：-->
        <!--<el-select v-model="seekData.status" class="status-select" clearable>-->
        <!--<el-option key="time" label="计划推广时间" value="time"></el-option>-->
        <!--<el-option key="group" label="分组" value="group"></el-option>-->
        <!--<el-option key="kg" label="开关" value="kg"></el-option>-->
        <!--</el-select>-->
        <!--</label>-->
        <button class="submit" @click="seek">查询</button>
      </div>
      <div class="card-content">
        <el-table
          :data="tableData"
          border
          stripe
          @selection-change="selectionChange"
          style="width: 100%">
          <el-table-column
            :resizable="false"
            label="计划ID"
            prop="plan_id"
            align="center"
            width="60">
          </el-table-column>
          <el-table-column
            :resizable="false"
            label="计划名称"
            :show-overflow-tooltip="true"
            prop="plan_name"
            align="center"
            width="200">
          </el-table-column>
          <el-table-column
            :resizable="false"
            :show-overflow-tooltip="true"
            label="组名"
            prop="group_name"
            align="center"
            width="70">
          </el-table-column>
          <el-table-column
            label="推广时间"
            :resizable="false"
            prop="time"
            :formatter="formatter"
            align="center"
            show-overflow-tooltip
            width="138">
          </el-table-column>
          <el-table-column
            :resizable="false"
            label="总预算"
            prop="plan_all_budget"
            align="center"
            width="75">
          </el-table-column>
          <el-table-column
            :resizable="false"
            label="媒体状态"
            prop="meidanum"
            align="center"
            width="75">
          </el-table-column>
          <el-table-column
            :resizable="false"
            label="广告素材"
            align="center"
            prop="adnum"
            width="75">
          </el-table-column>
          <el-table-column
            :resizable="false"
            label="投放策略"
            align="center"
            prop="billing"
            width="75">
          </el-table-column>
          <el-table-column
            :resizable="false"
            label="开关"
            align="center"
            prop="publish"
            width="100">
            <template slot-scope="scope">
              <el-switch
                :disabled="!switchDisabled[scope.$index]"
                v-model="switchData[scope.$index]"
                on-color="#ff9900"
                @change="switch1(scope)">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            :resizable="false"
            label="计划状态"
            align="center"
            prop="status"
            :formatter="activity"
            width="90">
          </el-table-column>
          <el-table-column label="功能操作" align="center" :resizable="false">
            <template slot-scope="scope">
              <span class="operation" @click="details(scope.row.plan_id)">查看&nbsp;</span>
              <span class="operation" @click="copyPlan(scope.row.plan_id)">复制&nbsp;</span>
              <span class="operation" :class="{disabled: scope.row.status !== 1}"
                    @click="itemDel(scope.row.plan_id, scope.row.status === 1)">删除&nbsp;</span>
              <span class="operation" :class="{disabled: scope.row.status !== 5}"
                    @click="finish(scope.row.plan_id, scope.row.status === 5)">终止&nbsp;</span>
              <!--<span class="operation" @click="excentionStatus">状态</span>-->
              <br>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-tabs>
    <div class="page-wrap">
      <el-pagination
        @size-change="pageSizeChange"
        @current-change="pageCurrentChange"
        layout="sizes, prev, pager, next"
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        :total="pageTotal">
      </el-pagination>
    </div>
    <el-button class="creat-new" type="primary" @click="creatNew" :disabled="canCreat.indexOf(activeName) < 0">新建计划</el-button>
    <el-dialog title="提示" :visible.sync="dialogVisible" size="tiny">
      <el-table :data="exStatus" border="true">
        <el-table-column property="id" label="计划ID" width="60" align="center"></el-table-column>
        <el-table-column property="name" label="计划名称" width="110" align="center"></el-table-column>
        <el-table-column
          label="开关"
          align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.kg"
              on-color="#ff9900">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column property="status" label="素材状态" align="center" width="120"></el-table-column>
        <el-table-column label="功能操作" align="center">
          <template slot-scope="scope">
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
        selectedArr: [],
        // 表格数据
        tableData: null,
        // 开关数据（单独处理）
        switchData: [],
        // 开关是否可点数据，根据状态判断。
        switchDisabled: [],
        dialogVisible: false,
        // 状态数据
        exStatus: [],
        currentPage: 1,
        pageTotal: 0,
        pageSize: 10,
        // 判断移动、PC、大屏哪个可创建
        canCreat: ''
      }
    },
    created () {
      // 获取分组
      this.$http.get('/api2/get_plan_group').then(data => {
        if (data.code === 200) {
          this.group = data.data
        }
      })
      // 获取数据
      this.$nextTick(function () {
        this.getActiveList({})
      })
      // 通过用户的putchannelids判断用户可以在什么媒体端创建广告
      let media = {
        1: [1014, 1015, 1020],
        2: [1002, 1004, 1021],
        3: [1003]
      }
      let putChannelIds = JSON.parse(sessionStorage.getItem('putChannelIds'))
      let flag = false
      if (putChannelIds.length > 0) {
        putChannelIds.forEach(putItem => {
          flag = false
          for (let i in media) {
            if (flag) continue
            media[i].forEach(item => {
              if (putItem * 1 === item) {
                // this.canCreat.push(i)
                this.canCreat += i
                flag = true
              }
            })
          }
        })
      } else {
        this.canCreat = '123'
      }
    },
    methods: {
      // 获取计划列表
      getActiveList (option) {
        if (!arguments[0].name) arguments[0].name = null
        if (!arguments[0].groupId) arguments[0].groupId = null
        if (!arguments[0].status) arguments[0].status = null
        if (!arguments[0].timeStart) arguments[0].timeStart = null
        if (!arguments[0].timeEnd) arguments[0].timeEnd = null
        if (!arguments[0].sort_type) arguments[0].sort_type = null
        if (!arguments[0].channel) arguments[0].channel = 1
        if (!arguments[0].pageId) arguments[0].pageId = 1
        if (!arguments[0].pageCount) arguments[0].pageCount = 10
        // Loading
        let loading = this.$loading({
          target: '.card-content',
          text: '努力加载中'
        })
        this.$http.post('/api2/get_plan_list', {
          sort_type: option.sort_type,
          plan_name: option.name,
          group_id: option.groupId,
          status: option.status,
          time_start: option.timeStart,
          time_end: option.timeEnd,
          channel: option.channel,
          pageId: option.pageId,
          pageCount: option.pageCount
        }).then((res) => {
          loading.close()
          if (res.code === 200) {
            // 新的请求先清空原来的数据
            this.switchData = []
            this.switchDisabled = []
            res.data.forEach((item) => {
              this.switchData.push(item.publish === 1)
              this.switchDisabled.push(item.status === 5 || item.status === 3 || item.status === 7)
            })
            this.tableData = res.data
            this.pageTotal = res.total
          }
          // console.log(res)
        })
      },
      // 删除
      delActive (planId) {
        const that = this
        this.$confirm(`您确定要删除ID为 ${planId} 的计划项吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/api2/del_plan', {
            plan_id: planId
          }).then(function (res) {
            if (res.code === 200) {
              that.seek()
            }
          })
        })
      },
      // 终止
      finish (planId, canFinish) {
        if (!canFinish) return
        const that = this
        this.$confirm(`您确定要终止ID为 ${planId} 的计划项吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/api2/over_plan', {
            plan_id: planId
          }).then(function (res) {
            if (res.code === 200) {
              that.seek()
            }
          })
        })
      },
      // 新建按钮
      creatNew () {
        this.$store.commit('CLEARCREATDATA', null)
        this.$router.push({name: 'creatBasics', params: {propsActiveName: this.activeName}})
      },
      // 选项卡
      handleClick () {
        // console.log(this.activeName)
        this.currentPage = 1
        this.getActiveList({channel: this.activeName})
      },
      // 当手动选择复选框时触发事件
      select (selection, row) {
        // console.log(selection, row)
      },
      // 当选择项发生变化时触发
      selectionChange (selection) {
        let res = []
        if (selection.length !== 0) {
          selection.forEach(function (item) {
            res.push(item.plan_id)
          })
        }
        this.selectedLength = res.length
        this.selectedArr = res
      },
      // 开关状态改变时调用
      switch1 (result) {
        if (!this.switchData[result.$index]) {
          this.$http.post('/api2/canclepublish', {
            plan_id: result.row.plan_id
          }).then(res => {
            if (res.code === 200) {
              this.seek()
            }
          })
        } else {
          // 判断是否为第一次发布，如果是第一次发布则提示扣除计划预算。
          if (result.row.is_publish === 0) {
            this.$confirm('计划开始将会从账户中扣除本计划预算金额！', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$http.post('/api2/publish', {
                plan_id: result.row.plan_id
              }).then(res => {
                if (res.code !== 200) {
                  this.$alert(res.msg, '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                      this.$set(this.switchData, result.$index, false)
                    }
                  })
                } else {
                  this.seek()
                }
              })
            }).catch(() => {
              this.$set(this.switchData, result.$index, false)
            })
          } else {
            this.$http.post('/api2/publish', {
              plan_id: result.row.plan_id
            }).then(res => {
              if (res.code !== 200) {
                this.$alert(res.msg, '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.$set(this.switchData, result.$index, false)
                  }
                })
              } else {
                this.seek()
              }
            })
          }
        }
      },
      // 单项删除
      itemDel (planId, canDel) {
        if (canDel) {
          this.delActive(planId)
        }
      },
      // 查询按钮
      seek () {
        let option = {
          sort_type: this.seekData.sort,
          name: this.seekData.name,
          groupId: this.seekData.group,
          status: this.seekData.status,
          channel: this.activeName,
          // 使用setHours方法，使开始时间往前1毫秒，结束时间往后1毫秒
          // 其实包含当前日期下的00:00点的计划
          timeStart: this.seekData.date[0] ? new Date(this.seekData.date[0].setHours(0, 0, 0, -1)).Format('yyyy-MM-dd hh:mm:ss') : null,
          timeEnd: this.seekData.date[1] ? new Date(this.seekData.date[1].setHours(23, 59, 59, 1000)).Format('yyyy-MM-dd hh:mm:ss') : null,
          pageId: this.currentPage,
          pageCount: this.pageSize
        }
        // console.log(option)
        this.getActiveList(option)
      },
      // 状态按钮弹出推广状态
      excentionStatus () {
        this.dialogVisible = !this.dialogVisible
      },
      // 查看按钮
      details (planId) {
        // 清空store里的老数据并将新id记录下来
        this.$store.commit('CLEARCREATDATA', planId)
        this.$router.push('/creatPreview')
      },
      // 复制
      copyPlan (planId) {
        this.$http.post('/api2/copy_plan', {
          plan_id: planId
        }).then(res => {
          if (res.code === 200) {
            this.$alert(`复制成功！复制的计划id为${res.data}`, '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.seek()
              }
            })
          }
        })
      },
      // 选择每页多少条
      pageSizeChange (size) {
        this.pageSize = size
        this.seek()
      },
      // 翻页
      pageCurrentChange (page) {
        this.currentPage = page
        this.seek()
      },
      // 格式化时间
      formatter (item) {
        return new Date(item.plan_b_time).Format('yyyy-MM-dd') + ' -- ' + new Date(item.plan_e_time).Format('yyyy-MM-dd')
      },
      activity (val) {  // 格式化内容对应文本
        if (val.status === 1) {
          return '正在编辑'
        } else if (val.status === 2) {
          return '正在审核'
        } else if (val.status === 3) {
          return '审核通过'
        } else if (val.status === 4) {
          return '审核未通过'
        } else if (val.status === 5) {
          return '正在投放'
        } else if (val.status === 6) {
          return '投放完成'
        } else if (val.status === 7) {
          return '暂停投放'
        } else if (val.status === 100) {
          return '异常状态'
        }
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
    overflow: hidden;
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
      min-height: 532px;
      background: #fff;
      .el-table .cell, .el-table th > div {
        padding: 0 10px;
      }
      .operation {
        color: #169bd5;
        border-right: 1px solid #000;
        cursor: pointer;
        &:nth-of-type(4n) {
          border: none;
        }
      }
      .disabled {
        color: #8c939d;
        cursor: not-allowed;
      }
    }
    .page-wrap {
      float: right;
      margin: 10px -3px 0 0;
    }
    .creat-new {
      width: 100px;
      height: 35px;
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
