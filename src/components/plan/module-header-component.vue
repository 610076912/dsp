<template>
  <div class="module-header-component">
    <span class="module-header-component-title">{{title}}</span>
    <span v-if="del" class="module-header-component-del" @click="clearchose"><i class="el-icon-delete"></i>清空选择</span>
    <span v-if="check" class="module-header-component-all" @click="chackAll"><i class="el-icon-circle-check"></i>所有时间</span>
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
  }
</style>
