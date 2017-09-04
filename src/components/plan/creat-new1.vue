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
            filterable
            allow-create
            placeholder="请选择分组">
            <el-option
              v-for="item in groupArray"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计划每日预算" prop="day" required>
          <el-input v-model.number="ruleForm.day"></el-input>
        </el-form-item>
        <el-form-item label="计划总预算" prop="all" required>
          <el-input v-model.number="ruleForm.all"></el-input>
        </el-form-item>
        <el-form-item label="投放日期" prop="date">
          <el-date-picker
            v-model="ruleForm.date"
            range-separator="~"
            type="daterange"
            placeholder="选择日期范围">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="button-wrap">
          <el-button>返回</el-button>
          <el-button class="next-button" type="primary" @click="nextStep('new1form')">下一步</el-button>
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
        }
      }
      return {
        ruleForm: {
          name: '',
          group: '',
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
          group: [{required: true, message: '请选择投放日期', trigger: 'change'}]

        },
        groupArray: ['分组1', '分组2', '分组3']
      }
    },
    methods: {
      // 下一步
      nextStep (new1form) {
        console.log(new1form)
        this.$refs[new1form].validate((valid) => {
          console.log(valid)
          console.log(this.ruleForm)
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
          bottom: 20px;
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
