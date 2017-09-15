<template>
  <div class="plan">
    <div class="plan-nav" @click="conRef">
      <span class="position">当前位置：</span>
      <span>推广计划 > {{navText}}</span>
    </div>
    <div class="plan-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'plan',
    data () {
      return {
        navText: '推广活动',
        exclude: []
      }
    },
    created () {
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
    methods: {
      conRef () {
        console.log(this.$store.state.creatData.creatBasice)
      }
    },
    computed: {
      actId () {
        return this.$store.state.creatData.actId
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .plan {
    width: 100%;
    padding-top: 20px;
    margin-bottom: 60px;
    .plan-content {
      background: #fff;
      margin-top: 15px;
      height: 100%;
      .button-wrap {
        width: 100%;
        height: 150px;
        text-align: center;
        line-height: 150px;
        button {
          width: 160px;
          height: 40px;
        }
        .next-btn {
          margin-left: 25px;
        }
        .el-button--primary {
          background-color: #169bd5;
          border-color: #169bd5;
        }
        .el-button:focus, .el-button:hover {
          color: #169bd5;
          border-color: #169bd5;
        }
        .el-button--primary:focus, .el-button--primary:hover {
          color: #fff;
          background: #16a9e5;
        }
      }
    }
  }
</style>
