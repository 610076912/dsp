<template>
  <div id="data">
    <p class="data-path">当前位置：</p>

    <div class="data-con">
      <el-row class="tac">
        <el-col :span="5" class="data-left">
          <el-menu mode="vertical" default-active="data" class="el-menu-vertical-demo" router>
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-minus"></i>移动广告数据</template>
              <el-menu-item index="data">推广数据</el-menu-item>
              <el-menu-item index="mediadata">媒体分析</el-menu-item>
              <el-menu-item index="3">地域分析</el-menu-item>
              <el-menu-item index="4">时段分析</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-minus"></i>PC广告数据</template>
              <el-menu-item index="5">推广数据</el-menu-item>
              <el-menu-item index="6">媒体分析</el-menu-item>
              <el-menu-item index="7">地域分析</el-menu-item>
              <el-menu-item index="8">时段分析</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-minus"></i>大屏广告数据</template>
              <el-menu-item index="9">推广数据</el-menu-item>
              <el-menu-item index="10">媒体分析</el-menu-item>
              <el-menu-item index="11">地域分析</el-menu-item>
              <el-menu-item index="12">时段分析</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
        <el-col :span="19" class="data-right">
          <router-view></router-view>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'data',
    data () {
      return {
        msg: 'data'
      }
    },
    methods: {
      menuRouter (key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  borderColor = #e4e4e4;
  border-radius()
    -webkit-border-radius arguments
    -moz-border-radius arguments
    border-radius arguments
  #data{
    .data-path{
      display inline-block;
      width: 100%;
      height: 44px;
      line-height: 44px;
      margin-top: 26px;
    }
    .data-con {
      width: 100%;
      height: auto;
      background: #ffffff;
      border: 1px solid borderColor;
      border-radius(4px);
      overflow hidden;
      margin-bottom: 68px
    }
    .data-left{
      padding: 15px 0;

      .el-menu{
        background: White;
      }
      .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active{
        background: #4a9cd3;
        color: #e5f0f8;
      }
      .el-menu-item, .el-submenu__title{
        height: 44px;
      }
    }
    .data-right{
      border-left: 1px solid borderColor;
      padding: 30px;
    }
  }
</style>
