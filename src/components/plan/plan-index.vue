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
          @cell-click="mediaStatus"
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
            width="190">
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
          <el-table-column
            :resizable="false"
            label="媒体状态"
            align="center"
            prop="actInfo"
            :formatter="actStatusFormatter"
            width="185">
          </el-table-column>
          <el-table-column label="功能操作" align="center" :resizable="false">
            <template slot-scope="scope">
              <span class="operation" @click="details(scope.row.plan_id)">查看&nbsp;</span>
              <span class="operation" @click="copyPlan(scope.row.plan_id)">复制&nbsp;</span>
              <span class="operation" :class="{disabled: scope.row.status !== 1}"
                    @click="itemDel(scope.row.plan_id, scope.row.status === 1)">删除&nbsp;</span>
              <span class="operation" :class="{disabled: scope.row.status !== 5}"
                    @click="finish(scope.row.plan_id, scope.row.status)">终止&nbsp;</span>
              <span class="operation" @click="excentionStatus(scope.row.plan_id)">金额</span>
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
    <el-button class="creat-new" type="primary" @click="creatNew" :disabled="canCreat.indexOf(activeName) < 0">新建计划
    </el-button>
    <el-dialog title="计划预算调整" :visible.sync="dialogVisible" size="tiny" @open="dialogOpen" class="budgetDialog">
      <div class="dialog-left">
        <span>账户余额:{{$_toFixed(userBalance, 2) / 1000}}</span><br>
        <span>计划预算:{{$_toFixed(planBalance, 2) / 1000}}</span>
        <el-input icon="plus" placeholder="调整计划预算" v-model="plusPlanBalance" @change="clearAnother('minus')"></el-input>
        <el-input icon="minus" placeholder="调整计划预算" v-model="minusPlanBalance"
                  @change="clearAnother('plus')"></el-input>
        <el-button type="primary" @click="changePlanBalance">确定</el-button>
        <el-radio-group v-model="planDayBudgetType" @change="planDayBudgetTypeChange">
          <el-radio :label="0">快速投放</el-radio>
          <el-radio :label="1">每日定额</el-radio>
        </el-radio-group>
        <span>计划每日定额: {{planDayBudget}}</span>
        <el-input placeholder="修改计划每日定额" v-model="editPlanDayBudget" :disabled="!planDayBudgetType"></el-input>
        <el-button type="primary" @click="changePlanDayBudget">确定</el-button>
      </div>
      <div class="dialog-right">
        <span>计划金额调整记录</span>
        <ul>
          <li v-for="item in recordList">
            <span class="info">{{new Date(item.time).Format('yyyy-MM-dd hh:mm:ss')}}</span> 计划预算
            <span class="info">{{item.value}}</span>元
          </li>
        </ul>
      </div>
    </el-dialog>
    <el-dialog class="mediaStatusDialog" :title="mediaChannelDialogName + ' 媒体状态'" :visible.sync="mediaStatusDialog"
               size="tiny">
      <el-table border :data="mediaChannelTableData">
        <el-table-column
          :resizable="false"
          label="媒体平台"
          align="center"
          prop="act_channel_id"
          :formatter="mediaChannelFormatter"
          width="180">
        </el-table-column>
        <el-table-column
          :resizable="false"
          label="开关"
          align="center"
          prop="act_flag"
          width="100">
          <template slot-scope="scope">
            <el-switch
              :disabled="!mediaSwitchDisabled[scope.$index]"
              v-model="mediaSwitchData[scope.$index]"
              on-color="#ff9900"
              @change="mediaSwitchChange(scope)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          :resizable="false"
          label="状态"
          align="center"
          :formatter="mediaStatusFormatter"
          width="130">
        </el-table-column>
        <el-table-column
          :resizable="false"
          label="功能操作"
          align="center">
          <template slot-scope="scope">
            <span>编辑素材&nbsp;</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import setps from './steps-component.vue'
  import mediaChannelData from '../../../static/json/media'

  let testEnv = process.env.TEST === 'test'

  let eggDspUrl = testEnv ? '//47.93.140.7:7001' : '//dspegg.videozhishi.com'

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
        // dialog
        dialogVisible: false,
        // 当前dialog的planid
        dialogPlanId: null,
        // dialog内的数据。获取的账户余额
        userBalance: 0,
        // dialog内的数据。获取的计划余额
        planBalance: 0,
        // dialog内的数据。获取的日预算
        planDayBudget: 0,
        // dialog内的数据。修改记录
        recordList: [],
        // dialog内的数据。 用户填写的加计划余额
        plusPlanBalance: null,
        // dialog内的数据。 用户填写的减计划余额
        minusPlanBalance: null,
        // dialog内的数据。 用户填写的每日定额
        editPlanDayBudget: null,
        // dialog内的数据。 计划投放类型
        planDayBudgetType: 0,
        // 状态数据
        exStatus: [],
        currentPage: 1,
        pageTotal: 0,
        pageSize: 10,
        // 判断移动、PC、大屏哪个可创建
        canCreat: '',
        // 媒体平台dialog
        mediaChannelDialogName: '',
        mediaStatusDialog: false,
        // 平台媒体表格数据
        mediaChannelTableData: [],
        // 平台媒体开关
        mediaSwitchData: [],
        // 平台媒体开关是否可用数据，根据状态判断。
        mediaSwitchDisabled: []
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
        3: [1003, 1018]
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
        //   /api2/get_plan_list
        this.$http.post(eggDspUrl + '/get_plan_list', {
          user_id: sessionStorage.getItem('user_id'),
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
              // 埋点
              this.$_send({
                describe: 'deletePlan',
                planId: planId
              })
              that.seek()
            }
          })
        })
      },
      // 终止
      finish (planId, status) {
        if (status !== 5) return
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
              // 埋点
              this.$_send({
                describe: 'overPlan',
                planId: planId
              })
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
            this.seek()
            // 埋点
            this.$_send({
              describe: 'planOff',
              planId: result.row.plan_id,
              code: res.code,
              msg: res.msg
            })
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
                // 埋点
                this.$_send({
                  describe: 'firstDeduction',
                  code: res.code,
                  msg: res.msg,
                  planId: result.row.plan_id
                })
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
              // 埋点
              this.$_send({
                describe: 'planOn',
                planId: result.row.plan_id,
                code: res.code,
                msg: res.msg
              })
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
      excentionStatus (planId) {
        this.dialogPlanId = planId
        this.dialogVisible = !this.dialogVisible
      },
      // dialog打开
      dialogOpen () {
        this.plusPlanBalance = null
        this.minusPlanBalance = null
        this.editPlanDayBudget = null
        this.planDayBudgetType = 0
        this.$http.get('/api2/account_record', {
          params: {
            plan_id: this.dialogPlanId
          }
        }).then(res => {
          // console.log(res)
          if (res.code === 200) {
            this.recordList = res.data.recordList
            this.userBalance = res.data.userBalance
            this.planDayBudget = res.data.planDayBudget
            this.planBalance = res.data.planBalance
            this.planDayBudgetType = res.data.planBudgetType
          }
        })
      },
      // 清空另一个输入框
      clearAnother (arg) {
        // console.log(arg + 'PlanBalance')
        this[arg + 'PlanBalance'] = ''
      },
      // 调整计划预算
      changePlanBalance () {
        if ((this.plusPlanBalance && this.minusPlanBalance) || (!this.plusPlanBalance && !this.minusPlanBalance)) {
          return this.$message({
            message: '只能选择增加计划余额或减少计划余额',
            type: 'warning'
          })
        } else {
          if (this.plusPlanBalance && !/^[1-9]\d*$/.test(this.plusPlanBalance)) {
            return this.$message({
              message: '请不要输入小数、负数、字母、特殊符号',
              type: 'warning'
            })
          } else if (this.minusPlanBalance && !/^[1-9]\d*$/.test(this.minusPlanBalance)) {
            return this.$message({
              message: '请不要输入小数、负数、字母、特殊符号',
              type: 'warning'
            })
          }
        }
        let balance = this.plusPlanBalance || this.minusPlanBalance * -1
        this.$http.post('/api2/edit_plan_account', {
          plan_id: this.dialogPlanId,
          change_budget: balance
        }).then(res => {
          if (res.code === 200) {
            this.$message('修改成功')
            this.plusPlanBalance = null
            this.minusPlanBalance = null
            this.dialogOpen()
            // 埋点
            this.$_send({
              describe: 'editPlanBudget',
              planId: this.dialogPlanId,
              change_budget: balance
            })
          }
        })
      },
      // 计划投放类型改变
      planDayBudgetTypeChange (arg) {
        if (!arg) {
          this.editPlanDayBudget = null
        }
      },
      // 修改计划每日定额
      changePlanDayBudget () {
        if (!this.editPlanDayBudget && this.planDayBudgetType) {
          return this.$message({
            message: '请输入每日定额',
            type: 'warning'
          })
        } else if (!/^[1-9]\d*$/.test(this.editPlanDayBudget) && this.planDayBudgetType) {
          return this.$message({
            message: '请不要输入小数、负数、字母、特殊符号',
            type: 'warning'
          })
        }
        this.$http.post('/api2/edit_day_account', {
          plan_id: this.dialogPlanId,
          day_account: this.editPlanDayBudget,
          budget_type: this.planDayBudgetType
        }).then(res => {
          if (res.code === 200) {
            this.$message('修改成功')
            this.dialogOpen()
            // 埋点
            this.$_send({
              describe: 'editDayBudget',
              planId: this.dialogPlanId,
              day_account: this.editPlanDayBudget,
              budget_type: this.planDayBudgetType
            })
          }
        })
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
            // 埋点
            this.$_send({
              describe: 'copyPlan',
              new: res.data,
              planId: planId
            })
            this.$alert(`复制成功！复制的计划id为${res.data}`, '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.seek()
              }
            })
          }
        })
      },
      // 媒体状态详情Dialog
      mediaStatus (row, column) {
        if (column.label !== '媒体状态') return
        // 保证每次打开dialog显示的是当前计划的act状态。
        this.mediaSwitchData = []
        this.mediaSwitchDisabled = []
        this.mediaStatusDialog = true
        this.mediaChannelTableData = row.actStatusArr
        this.mediaChannelDialogName = row.plan_name
        this.mediaChannelTableData.forEach(item => {
          this.mediaSwitchData.push(item.act_flag === 1)
          this.mediaSwitchDisabled.push(item.act_ids_status === 1)
        })
      },
      // 媒体开关改变
      mediaSwitchChange (scope) {
        let mediaSwitch = 1
        if (scope.row.act_flag) {
          mediaSwitch = 0
        } else {
          mediaSwitch = 1
        }
        this.$http.post(eggDspUrl + '/act_switch_change', {
          act_id: scope.row.act_id,
          status: mediaSwitch
        }).then(res => {
          this.seek()
          this.mediaStatusDialog = false
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
      // 格式化媒体状态平台名称
      mediaChannelFormatter (mediaChannelId) {
        const mediaData = mediaChannelData
        let res = ''
        mediaData.forEach(item => {
          if (item.media_id * 1 === mediaChannelId.act_channel_id * 1) {
            res = item.media_name
          }
        })
        return res
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
      },
      // 计划列表的媒体状态formatter
      actStatusFormatter (val) {
        if (!val.actStatusArr) return
        let toufang = []
        let jujue = []
        let tongguo = []
        let shenheing = []
        let bianji = []
        let zanting = []
        val.actStatusArr.forEach(item => {
          if (item.act_flag) {
            toufang.push(item)
          } else {
            if (item.is_act_flag) {
              zanting.push(item)
              return
            }
            if (item.act_ids_status === -1) {
              bianji.push(item)
            }
            if (item.act_ids_status === -2) {
              jujue.push(item)
            }
            if (item.act_ids_status === 0) {
              shenheing.push(item)
            }
            if (item.act_ids_status === 1) {
              tongguo.push(item)
            }
            if (item.act_ids_status === 3) {
              zanting.push(item)
            }
          }
        })
        let resSting = `正在投放（${toufang.length}）| 审核拒绝（${jujue.length}） 审核通过（${tongguo.length}）| 审核中（${shenheing.length}） 编辑中（${bianji.length}）| 已暂停（${zanting.length}）`
        return resSting
      },
      // 媒体dialog中的状态formatter
      mediaStatusFormatter (val) {
        if (val.act_flag) {
          return '正在投放'
        } else {
          if (val.is_act_flag) {
            return '暂停投放'
          }
          if (val.act_ids_status === -1) {
            return '正在编辑'
          }
          if (val.act_ids_status === -2) {
            return '审核拒绝'
          }
          if (val.act_ids_status === 0) {
            return '正在审核'
          }
          if (val.act_ids_status === 1) {
            return '审核通过'
          }
          if (val.act_ids_status === 3) {
            return '管理员暂停'
          }
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
        &:nth-of-type(5n) {
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
    .el-dialog__header {
      background-color: #000;
      padding-top: 5px;
      .el-dialog__title {
        color: #fff;
        line-height: 38px;
      }
      .el-dialog__headerbtn {
        padding: 8px;
      }
    }
    .budgetDialog {
      .el-dialog {
        min-width: 550px;
      }
      .el-dialog__body {
        overflow: hidden;
        padding: 0;
        & > div {
          width: 50%;
          float: left;
          padding: 30px;
        }
        .dialog-left {
          border-right: 1px solid #d8d8d8;
          & > span {
            font-size: 14px;
            font-family: '黑体';
            margin-right: 10px;
          }
          .el-radio-group {
            display: block;
            margin-bottom: 10px;
          }
          & > div {
            margin-top: 10px;
          }
          .el-button {
            width: 100%;
            margin-top: 10px;
            margin-bottom: 35px;
          }
        }
        .dialog-right {
          .info {
            color: #169bd5;
          }
        }
      }
    }

    .mediaStatusDialog {
      .el-dialog {
        min-width: 570px;
      }
    }
  }
</style>
