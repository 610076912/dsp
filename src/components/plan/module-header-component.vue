<template>
  <div class="module-header-component">
    <span class="module-header-component-title">{{title}}</span>
    <el-checkbox :disabled="!canClick" class="check-box" v-if="checkBox" @change="checkBoxChange" v-model="checkBoxModel">全选</el-checkbox>
    <span v-if="del" class="module-header-component-del" @click="clearchose"><i class="el-icon-delete"></i>清空选择</span>
    <span v-if="check" class="module-header-component-all" @click="chackAll"><i
      class="el-icon-circle-check"></i>所有时间</span>
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
        default: true
      },
      isAll: {
        type: Boolean,
        default: false
      },
      canClick: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        checkBoxModel: false
      }
    },
    watch: {
      'isAll' (val) {
        if (val) {
          this.checkBoxModel = true
        } else {
          this.checkBoxModel = false
        }
      }
    },
    methods: {
      checkBoxChange () {
        this.$emit('checkall', this.checkBoxModel)
      },
      chackAll () {
        if (this.check) {
          this.$emit('checkall', this.checkStatus)
        }
      },
      clearchose () {
        if (this.del) {
          this.$emit('clearchose')
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
    .module-header-component-all {
      display: inline-block;
      float: right;
      margin-right: 15px;
      cursor: pointer;
    }
    .module-header-component-del {
      float: right;
      cursor: pointer;
    }
    .check-box {
      float: right;
    }
  }
</style>
