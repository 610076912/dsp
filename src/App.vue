<template>
  <div id="app">
    <div class="header">
      <div class="header-top">
        <div class="center">

        </div>
      </div>
      <div class="header-con">
        <div class="center">
          <ul>
            <li>首页</li>
            <li>推广计划</li>
            <li>数据监测</li>
            <li>财务管理</li>
          </ul>
        </div>
      </div>
      <div class="header-tab">
        <div class="center">

        </div>
      </div>
    </div>
    <div class="main">
      主体
    </div>
    <div class="footer">
      页尾
    </div>
    <!--<router-view></router-view>-->
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100%;
    background: #eeeeee;

    .center {
      width: 1200px;
      height: 100%;
      margin: 0 auto;
    }
  }

  .header{
    width: 100%;
    height: 160px;
  }
  .header-top{
    width: 100%;
    height: 40px;
    background: #454546;
  }
  .header-con{
    width: 100%;
    height: 70px;
    background: #ffffff;
  }
  .header-tab{
    width: 100%;
    height: 50px;
    background: #f9f9f9;
  }
  .header-con ul{
    width: 560px;
    height: 100%;
    float: right;
  }
  .header-con ul li{
    width: 140px;
    height: 100%;
    float: left;
    text-align: center;
    line-height: 70px;
    cursor: pointer;
  }

  .main{
    width: 1200px;
    min-height: calc(100% - 380px);
    margin: 0 auto;
  }


  .footer{
    width: 100%;
    height: 220px;
    background: #454546;
    color: #aaaaaa;
    text-align: center;
    line-height: 220px;
  }

</style>
