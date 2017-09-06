<template>
  <div class="module-header-component">
    <span class="module-header-component-title">{{title}}</span>
    <el-checkbox v-if="check" v-model="checkStatus" @change="change" class="module-header-component-check">全选
    </el-checkbox>
    <span v-if="del" class="module-header-component-del"><i class="el-icon-delete"></i>清空选择</span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      check: {
        type: Boolean,
        default: false
      },
      del: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: '标题'
      },
      checkBox: {
        default: false
      }
    },
    data () {
      return {
        checkStatus: false
      }
    },
    watch: {
      'checkBox' (val) {
        if (val) {
          this.checkStatus = true
        } else {
          this.checkStatus = false
        }
      }
    },
    methods: {
      change () {
        if (this.check) {
          this.$emit('checkall', this.checkStatus)
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .module-header-component {
    width: 100%;
    border-bottom: 2px solid #169bd5;
    margin-bottom: 10px;
    line-height: 40px;
    .module-header-component-title {
      font-size: 14px;
      line-height: 40px;
    }
    .module-header-component-check {
      display: inline-block;
      float: right;
    }
    .module-header-component-del {
      float: right;
      cursor: pointer;
      color: #169bd5;
    }
  }
</style>
