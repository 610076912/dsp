<template>
  <div class="creat-new1">
    <setps :active="0"></setps>
    <div class="content">
      <el-form :model="ruleForm" :rules="rules" label-position="left" label-width="150px" class="form" ref="new1form">
        <el-form-item label="计划名称" prop="name" required>
          <el-input v-model.trim="ruleForm.name" :maxlength="20"></el-input>
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
              <span @click.stop="delGroup(item.group_id,item.group_name)" style="float: right; color: #8492a6; font-size: 10px">
                <i class="el-icon-close"></i></span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预算类型" required>
          <el-radio-group v-model="ruleForm.budgetType">
            <el-radio :label="0">日预算</el-radio>
            <el-radio :label="1">总预算</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="budgetText" prop="all" required>
          <el-input v-model="ruleForm.all"></el-input>元
        </el-form-item>
        <el-form-item label="投放日期" prop="date" class="date-time-range">
          <el-date-picker
            v-model="ruleForm.date"
            minTime="17:31"
            range-separator="至"
            type="datetimerange"
            :picker-options="pickerOptions"
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
      <ul class="meidas-show-wrap">
        <li v-for="item in showMediaArr" :style="{backgroundImage:'url('+item.media_url+')'}"></li>
      </ul>
    </div>
    <div class="border-bottom"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import setps from './steps-component.vue'
  import mediaJson from '../../../static/json/media.json'
  // 移动，pc，大屏端对应的媒体
  const channelMedias = {
    1: [1001, 1005, 1013, 1014, 1015],
    2: [1001, 1002, 1004, 1015],
    3: [1016, 1017, 1018, 1015, 1012, 1003]
  }
  export default {
    name: 'creatBasics',
    props: {
      propsActiveName: {
        default: 1
      }
    },
    data () {
      // 自定义判断总预算
      let checkAll = (rule, value, callback) => {
        // 判断是否为空
        if (!value) {
          return callback(new Error('请填写总预算'))
        }
        // 判断是否为数字
        if (!/^\d+$/.test(value)) {
          return callback(new Error('请输入数值'))
        }
        callback()
      }
      return {
        activeName: this.propsActiveName,
        // 禁止选择当前时间以前的
        pickerOptions: {
          disabledDate (time) {
            return time.getTime() < (Date.now() - 24 * 60 * 60 * 1000)
          }
        },
        ruleForm: {
          name: '',
          group: '',
          budgetType: 0,
          all: '',
          date: [new Date(), new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)],
          channel: null
        },
        // 验证规则
        rules: {
          name: [{required: true, message: '请输入计划名称(20字符内)', trigger: 'blur', max: 10}],
          all: [{validator: checkAll, trigger: 'blur'}],
          date: [
            {
              required: true,
              type: 'array',
              // 深度验证
              fields: {
                0: {type: 'date', message: '请选择投放日期', required: true},
                1: {type: 'date', message: '请选择投放日期', required: true}
              },
              message: '请选择投放日期',
              trigger: 'blur'
            }
          ],
          group: [{required: true, type: 'number', message: '请选择一个分组', trigger: 'change'}]
        },
        groupArray: ['分组1', '分组2', '分组3'],
        // 判断是否调修改接口
        isEdit: false,
        // 展示media图标数据
        showMediaArr: []
      }
    },
    computed: {
      budgetText () {
        return this.ruleForm.budgetType === 0 ? '日预算' : '总预算'
      }
    },
    created () {
      // 判断store里是否有数据
      let creatData = this.$store.state.creatData.creatBasice
      if (creatData.name) {
        // 读取vux里的数据
        this.ruleForm.name = creatData.name
        this.ruleForm.group = creatData.group
        this.ruleForm.budgetType = creatData.budgetType
        this.ruleForm.all = creatData.all
        this.ruleForm.date = creatData.date
        this.activeName = creatData.channel
        this.isEdit = true
        // 必须是获得了activeName这个值以后才能去生成图标所以要放到这里和ajax请求的回调中
        this.showMedia()
      } else if (this.$store.state.creatData.planId) {
        // 请求服务器数据
        this.$http.get('/api2/get_plan', {
          params: {
            plan_id: this.$store.state.creatData.planId
          }
        }).then(res => {
          if (res.code === 200) {
            const data = res.data
            this.ruleForm.name = data.plan_name
            this.ruleForm.group = data.group_id
            this.ruleForm.budgetType = data.plan_budget_type
            this.ruleForm.all = data.plan_budget_type === 1 ? data.plan_all_budget : data.plan_day_budget
            this.activeName = data.plan_channel
            this.$set(this.ruleForm.date, 0, new Date(data.plan_b_time))
            this.$set(this.ruleForm.date, 1, new Date(data.plan_e_time))
            this.isEdit = true
            this.$store.commit('BASICE', this.ruleForm)
            // 必须是获得了activeName这个值以后才能去生成图标所以要放到ajax请求的回调中
            this.showMedia()
          }
        })
      } else {
        this.showMedia()
      }
      // 获取活动分组
      this.queryGroupData()
    },
    methods: {
      // 通过平台类型展示媒体类型
      showMedia () {
        const that = this
        channelMedias[this.activeName].forEach((citem) => {
          mediaJson.forEach((mitem, index) => {
            if (mitem.media_id === citem) {
              that.showMediaArr.push(mediaJson[index])
            }
          })
        })
      },
      // 下一步
      nextStep () {
        let that = this
        this.$refs['new1form'].validate((valid) => {
          // 如果验证通过则跳转下一个路由
          let url, data, mUrl // 基本设置接口url，基本设置数据，媒体接口url
          if (valid && !that.isEdit) {
            // 添加
            url = '/api2/add_plan'
            mUrl = '/api2/add_media_plan'
            data = {
              plan_name: that.ruleForm.name,
              plan_b_time: that.ruleForm.date[0].Format('yyyy-MM-dd hh:mm:ss'),
              plan_e_time: that.ruleForm.date[1].Format('yyyy-MM-dd hh:mm:ss'),
              plan_budget_type: that.ruleForm.budgetType,
              plan_budget: that.ruleForm.all,
              plan_channel: that.activeName,
              group_id: that.ruleForm.group
            }
          }
          if (valid && that.isEdit) {
            // 修改
            url = '/api2/upd_plan'
            mUrl = '/api2/upd_media_plan'
            data = {
              plan_id: that.$store.state.creatData.planId,
              plan_name: that.ruleForm.name,
              plan_b_time: that.ruleForm.date[0].Format('yyyy-MM-dd hh:mm:ss'),
              plan_e_time: that.ruleForm.date[1].Format('yyyy-MM-dd hh:mm:ss'),
              plan_budget_type: that.ruleForm.budgetType,
              plan_budget: that.ruleForm.all,
              plan_channel: that.activeName,
              group_id: that.ruleForm.group
            }
          }
          that.$http.post(url, data)
            .then(res => {
              // console.log(res)
              if (res.code === 200) {
                // 保存活动Id
                this.$store.commit('PLANID', res.data)
                // 保存活动数据
                that.ruleForm.channel = that.activeName
                this.$store.commit('BASICE', that.ruleForm)
                // 成功后调取媒体接口
                return this.$http.post(mUrl, {
                  plan_id: that.$store.state.creatData.planId,
                  channel_id_list: JSON.stringify(channelMedias[this.activeName])
                })
              }
            })
            .then(res => {
              if (res.code === 200) {
                this.$router.push('/creatScene')
              }
            })
        })
      },
      back () {
        this.$router.go(-1)
      },
      // 下拉框改变
      selectChange (val) {
        if (val === 'new') {
          this.$prompt('请输入新分组名称', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputValidator (value) {
              const reg = /^[^\S]/g
              if (value === null || reg.test(value) || value.length > 5) {
                return false
              } else {
                return true
              }
            },
            inputErrorMessage: '请勿使用空格开头并不能大于5个字符'
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
        this.$http.get('/api2/get_plan_group').then(data => {
          if (data.code === 200) {
            this.groupArray = data.data
          }
        })
      },
      // 添加分组
      addGroup (groupName) {
        this.$http.post(
          '/api2/add_plan_group',
          {group_name: groupName}
        )
          .then(data => {
            if (data.code === 200) {
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
            '/api2/del_plan_group',
            {group_id_list: JSON.stringify([id])},
          ).then(data => {
            if (data.code === 200) {
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
      width: 100%;
      padding: 20px 50px;
      overflow: hidden;
      .form {
        width: 500px;
        float: left;
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
      .meidas-show-wrap {
        width: 550px;
        height: 300px;
        float: right;
        overflow-y: auto;
        li {
          width: 170px;
          height: 60px;
          float: left;
          margin: 0 20px 20px 0;
          background-size: 100%;
          background-position: center;
          border: 1px solid #eee;
          &:nth-of-type(3n) {
            margin-right: 0;
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
