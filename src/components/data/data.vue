<template>
  <div id="data">
    <p class="data-path"><b>当前位置：</b>广告数据 > {{ path }}</p>

    <div class="data-con">
      <el-row class="tac">
        <el-col :span="4" class="data-left">
          <el-menu mode="vertical" default-active="data" class="el-menu-vertical-demo" router>
            <el-menu-item-group index="1">
              <template slot="title"><i class="el-icon-menu"></i>广告数据</template>
              <el-menu-item index="data" @click="changePath('推广数据')">推广数据</el-menu-item>
              <!--<el-menu-item index="mediadata" @click="changePath('媒体分析')">媒体分析</el-menu-item>-->
              <!--<el-menu-item index="territory"  @click="changePath('地域分析')">地域分析</el-menu-item>-->
              <!--<el-menu-item index="timebucket"  @click="changePath('时段分析')">时段分析</el-menu-item>-->
            </el-menu-item-group>
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
    name: 'dataindex',
    data () {
      return {
        msg: 'data',
        path: '推广数据'
      }
    },
    methods: {
      changePath (path) {
        this.path = path
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
  #data {
    .data-path {
      display inline-block;
      width: 100%;
      height: 56px;
      line-height: 56px;
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
    .data-left {
      padding-bottom: 20px;
      width: 18%;
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
    .data-right {
      border-left: 1px solid borderColor;
      padding: 30px;
    }
  }
</style>
