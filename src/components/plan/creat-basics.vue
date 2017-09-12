<template>
  <div class="creat-new1">
    <setps :active="0"></setps>
    <div class="content">
      <el-form :model="ruleForm" :rules="rules" label-position="left" label-width="150px" class="form" ref="new1form">
        <el-form-item label="计划名称" prop="name" required>
          <el-input v-model.trim="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="选择分组" prop="group">
          <el-select
            v-model="ruleForm.group"
            @change="selectChange"
            placeholder="请选择分组">
            <el-option value="new">新建分组</el-option>
            <el-option
              v-for="item in groupArray"
              :key="item.group_id"
              :label="item.group_name"
              :value="item.group_id">
              <span style="float: left">{{item.group_name}}</span>
              <span @click.stop="delGroup(item.group_id,item.group_name)"
                    style="float: right; color: #8492a6; font-size: 10px"><i
                class="el-icon-close"></i></span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计划每日预算" prop="day" required>
          <el-input v-model.number="ruleForm.day"></el-input>
        </el-form-item>
        <el-form-item label="计划总预算" prop="all" required>
          <el-input v-model.number="ruleForm.all"></el-input>
        </el-form-item>
        <el-form-item label="投放日期" prop="date" class="date-time-range">
          <el-date-picker
            v-model="ruleForm.date"
            range-separator="~"
            type="datetimerange"
            placeholder="选择日期范围">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="button-wrap">
          <el-button @click="back">返回</el-button>
          <el-button class="next-button" type="primary" @click="nextStep">
            下一步
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="border-bottom"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import setps from './steps-component.vue'

  export default {

    data () {
      // 自定义判断总预算
      let checkAll = (rule, value, callback) => {
        // 判断是否为空
        if (!value) {
          return callback(new Error('请填写总预算'))
        }
        // 判断是否为数字
        if (!Number.isInteger(value)) {
          return callback(new Error('请输入数值'))
        } else {
          // 判断总预算要大于每日预算
          if (!this.ruleForm.day) {
            return callback(new Error('请先填写每日预算'))
          } else {
            if (this.ruleForm.day > this.ruleForm.all) {
              return callback(new Error('请填写正确的数值'))
            }
          }
          callback()
        }
      }
      return {
        ruleForm: {
          name: '',
          group: {
            type: Number
          },
          day: '',
          all: '',
          date: []
        },
        // 验证规则
        rules: {
          name: [{required: true, message: '请输入计划名称', trigger: 'blur'}],
          day: [{type: 'number', message: '请输入数字', trigger: 'blur'}],
          all: [{validator: checkAll, trigger: 'blur'}],
          date: [{required: true, type: 'array', message: '请选择投放日期', trigger: 'change'}],
          group: [{required: true, type: 'number', message: '请选择投放日期', trigger: 'change'}]

        },
        groupArray: ['分组1', '分组2', '分组3']
      }
    },
    created () {
      // 获取活动分组
      this.queryGroupData()
      // 拓展时间格式化
      Date.prototype.Format = function (fmt) {
        var o = {
          'M+': this.getMonth() + 1,
          'd+': this.getDate(),
          'h+': this.getHours(),
          'm+': this.getMinutes(),
          's+': this.getSeconds(),
          'q+': Math.floor((this.getMonth() + 3) / 3),
          'S': this.getMilliseconds()
        }
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        for (var k in o) {
          if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
          }
        }
        return fmt
      }
    },
    watch: {},
    methods: {
      // 下一步
      nextStep () {
        let that = this
        this.$refs['new1form'].validate((valid) => {
          console.log(that.ruleForm.date[0].Format('yyyy-MM-dd hh:mm:ss'))
          // 如果验证通过则跳转下一个路由
          if (valid) {
            that.$http.post('/api/api/add_act',
              {
                act_name: that.ruleForm.name,
                act_b_time: that.ruleForm.date[0].Format('yyyy-MM-dd hh:mm:ss'),
                act_e_time: that.ruleForm.date[1].Format('yyyy-MM-dd hh:mm:ss'),
                day_budget: that.ruleForm.day,
                all_budget: that.ruleForm.all,
                channel: 1,
                group_id: that.ruleForm.group
              },
              {headers: {Authorization: sessionStorage.getItem('token')}})
              .then(data => {
                console.log(data)
              })
            that.$router.push('/creatScene')
          }
        })
      },
      back () {
        this.$router.go(-1)
      },
      // 下拉框改变
      selectChange (val) {
        console.log(val)
        console.log(this.ruleForm.group)
        if (val === 'new') {
          this.$prompt('请输入新分组名称', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputValidator (value) {
              const reg = /^[^\S]/g
              if (value === null || reg.test(value)) {
                console.log(value)
                return false
              } else {
                return true
              }
            },
            inputErrorMessage: '请勿使用空格开头'
          }).then(({value}) => {
            this.ruleForm.group = value
            this.addGroup(value)
          })
            .catch(() => {
              this.ruleForm.group = ''
            })
        }
      },
      // 请求分组数据
      queryGroupData () {
        // 获取活动分组
        this.$http.get('/api/api/get_act_group').then(data => {
          console.log(data)
          if (data.code === 200) {
            this.groupArray = data.data
          }
        })
      },
      // 添加分组
      addGroup (groupName) {
        this.$http.post(
          '/api/api/add_act_group',
          {group_name: groupName}
        )
          .then(data => {
            if (data.data.code === 200) {
              this.queryGroupData()
            }
          })
      },
      // 删除分组
      delGroup (id, name) {
        this.$confirm(`您确定要删除${name}分组吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(
            '/api/api/del_act_group',
            {group_id_list: JSON.stringify([id])},
            {headers: {Authorization: sessionStorage.getItem('token')}}
          ).then(data => {
            if (data.data.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              // 重新获取分组数据
              this.queryGroupData()
            }
          })
        })
      }
    },
    components: {
      setps
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .creat-new1 {
    position: relative;
    padding-bottom: 100px;
    .content {
      width: 600px;
      padding: 20px 50px;
      overflow: hidden;
      .form {
        .button-wrap {
          position: absolute;
          bottom: 10px;
          left: -86px;
          width: 100%;
          text-align: center;
          height: auto;
          button {
            width: 160px;
            height: 40px;
          }
          .next-btn {
            margin-left: 25px;
          }
        }
      }
    }
    .border-bottom {
      width: 100%;
      height: 0;
      border-bottom: 1px solid #bfcbd9;
    }
  }
</style>
