<template>
  <div class="finance">
    <div class="now-location"><b>当前位置：</b>财务管理 > {{isActive}}</div>
    <div class="finance-content">
      <div class="finance-content-nav">
        <el-menu mode="vertical" :default-active="currentIndex" router>
          <el-menu-item-group title="财务管理">
            <template slot="title"><i class="el-icon-my-denglu"></i>财务管理</template>
            <el-menu-item index="finance" @click="toogleTag('财务详情')">财务详情</el-menu-item>
            <el-menu-item index="finaHistory" @click="toogleTag('历史数据')">历史数据</el-menu-item>
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
        currentIndex: 'finance',
        isActive: '财务详情'
      }
    },
    created () {
      // 当在历史数据栏刷新的时候保证选中状态还为历史数据栏
      if (this.$router.currentRoute.fullPath === '/finaHistory') {
        this.currentIndex = 'finaHistory'
        this.isActive = '历史数据'
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
      width 18%
      float left
      .el-menu {
        background: White;
      }
      .el-menu-item-group__title {
        margin-bottom: 10px;
        font-size: 16px;
        color: #000;
        i {
          margin-right: 8px;
        }
      }
      .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active {
        background: #4a9cd3;
        color: #e5f0f8;
      }
      .el-menu-item, .el-submenu__title {
        height: 44px;
        line-height: 44px;
        text-indent: 20px;
      }
    }
    .finance-content-data {
      width 82%;
      float right
      border-left 1px solid #e1e1e1
    }
  }
</style>
