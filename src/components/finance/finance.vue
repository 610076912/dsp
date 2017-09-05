<template>
  <div class="finance">
    <div class="now-location"><b>当前位置：</b>财务管理 > {{location[isActive]}}</div>
    <div class="finance-content">
      <div class="finance-content-nav">
        <ul class="nav-ul">
          <li @click="toogleTag(0)" v-bind:class='{ onactive: (isActive == 0)}'><router-link to="/finance">财务概况</router-link></li>
          <li @click="toogleTag(1)" v-bind:class='{ onactive: (isActive == 1)}'><router-link to="/finaCZJL">充值记录</router-link></li>
          <li @click="toogleTag(2)" v-bind:class='{ onactive: (isActive == 2)}'><router-link to="/finaHistory">花费记录</router-link></li>
        </ul>
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
  .finance{
    .now-location{
      height 60px;
      line-height 60px;
    }
    .finance-content{
      width 100%
      background #ffffff
      border 1px solid #e1e1e1
      border-radius 3px
      overflow hidden
      margin-bottom 50px
    }
    .finance-content-nav{
      height 100%
      width 200px
      padding-top 40px
      float left
      ul{
        height 100%
      }
    }
    .nav-ul li{
      display inline-block
      height 44px
      width 100%
      line-height 44px     
      font-size 14px
      cursor pointer
      a{
        display block
        height 100%
        width 100%
        padding-left 50px
      }
    }
    .onactive{
      background #1d8ce0
      a{
        color #fff
      }   
    }
    
    .finance-content-data{
      width 998px;
      float right
      border-left 1px solid #e1e1e1 
    }
  }
</style>
