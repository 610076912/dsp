<template>
  <div class="finance">
    <div class="now-location"><b>当前位置：</b>财务管理 > {{location[isActive]}}</div>
    <div class="finance-content">
      <div class="finance-content-nav">
        <el-menu mode="vertical" default-active="finaDetail" router>
          <el-menu-item-group title="推广账户">
            <template slot="title"><i class="el-icon-my-denglu"></i>推广账户</template>
            <el-menu-item index="finaDetail" :route="{name: 'finaDetail'}">财务详情</el-menu-item>
            <el-menu-item index="finaHistory" :route="{name: 'finaHistory'}">历史数据</el-menu-item>
          </el-menu-item-group>
        </el-menu>
      </div>
      <div class="finance-content-data">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'finance',
    data () {
      return {
        msg: 'finance',
        isActive: 0,
        location: ['财务概况', '充值记录', '花费记录']
      }
    },
    methods: {
      toogleTag: function (index) {
        this.isActive = index
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .finance {
    .now-location {
      height 60px;
      line-height 60px;
    }
    .finance-content {
      width 100%
      background #ffffff
      border 1px solid #e1e1e1
      border-radius 3px
      overflow hidden
      margin-bottom 50px
    }
    .finance-content-nav {
      height 100%
      width 200px
      float left
      .el-menu {
        background: White;
      }
      .el-menu-item-group__title {
        margin-bottom: 10px;
      }
      .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active {
        background: #4a9cd3;
        color: #e5f0f8;
      }
      .el-menu-item, .el-submenu__title {
        height: 44px;
        line-height: 44px;
      }
    }
    .finance-content-data {
      width 998px;
      float right
      border-left 1px solid #e1e1e1
    }
  }
</style>
