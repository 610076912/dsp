<template>
    <div class="index">
      <div class="now-location"><b>当前位置：</b>{{location}}</div>
      <div class="index-content">
        <div class="user">
          <div class="user-header"></div>
          <div class="user-info-right">
            <div class="user-info"> 欢迎您，{{name}} <span class="self-space">个人中心</span></div>
            <p>推广余额：<span class="color-red">￥{{sum}}</span></p>
            <div class="link-button">
              <el-button size="small" type="primary">进入推广计划</el-button>
              <el-button size="small">新建活动</el-button>
            </div>
          </div>
        </div>
        <div class="statist">
          <ul class="tab-tag">
            <li v-for="(key,index) in tags" v-bind:class="{ tagActive: (indexs == index) }" @click="toggleTags(index)">{{key}}</li>
          </ul>
          <div class="tag-items">
            <div class="tag-item" v-for="(key,index) in datas" v-if="indexs == index">

            <el-row class="count-data">
              <el-col :span="6"><div class="grid-content r b"><span>0</span><p>今日曝光量</p></div></el-col>
              <el-col :span="6"><div class="grid-content r b"><span>0</span><p>今日点击量</p></div></el-col>
              <el-col :span="6"><div class="grid-content r b"><span>0</span><p>今日平均点击率</p></div></el-col>
              <el-col :span="6"><div class="grid-content b"><span>0</span><p>今日消费</p></div></el-col>
              <el-col :span="6"><div class="grid-content r"><span>0</span><p>正在投放</p></div></el-col>
              <el-col :span="6"><div class="grid-content r"><span>0</span><p>待审核</p></div></el-col>
              <el-col :span="6"><div class="grid-content r"><span>0</span><p>审核拒绝</p></div></el-col>
              <el-col :span="6"><div class="grid-content"><span>0</span><p>今天曝光量</p></div></el-col>
            </el-row>

            </div>
          </div>
        </div>
      </div>
      <!-- mobile -->
      <div class="mobile">
        <div class="mobile-title"><span>移动营销概况</span></div>
        <div class="mobile-number">
          <el-col :span="6"><div class="mobile-n-grid r"><span>0</span><p>曝光量（次）</p></div></el-col>
          <el-col :span="6"><div class="mobile-n-grid r"><span>0</span><p>点击量（次）</p></div></el-col>
          <el-col :span="6"><div class="mobile-n-grid r"><span>0</span><p>平均点击率（%）</p></div></el-col>
          <el-col :span="6"><div class="mobile-n-grid"><span>0</span><p>花费（元）</p></div></el-col>
        </div>
        <div class="mobile-chart">
          <div class="mobile-chart-color">
            <div class="mobile-chart-color-l">
              <span></span>
              <template>
                <el-select v-model="value" placeholder="曝光量">
                  <!-- <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option> -->
                </el-select>
              </template>
            </div>
            <div class="mobile-chart-color-r">
              <span></span>
              <template>
                <el-select v-model="value" placeholder="点击量">
                  <!-- <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option> -->
                </el-select>
              </template>
            </div>
          </div>
          <div class="mobile-chart-box">

          </div>
        </div>
      </div>
      <!-- PC -->
      <div class="mobile">
        <div class="mobile-title"><span>PC营销概况</span></div>
        <div class="mobile-number">
          <el-col :span="6"><div class="mobile-n-grid r"><span>0</span><p>曝光量（次）</p></div></el-col>
          <el-col :span="6"><div class="mobile-n-grid r"><span>0</span><p>点击量（次）</p></div></el-col>
          <el-col :span="6"><div class="mobile-n-grid r"><span>0</span><p>平均点击率（%）</p></div></el-col>
          <el-col :span="6"><div class="mobile-n-grid"><span>0</span><p>花费（元）</p></div></el-col>
        </div>
        <div class="mobile-chart">
          <div class="mobile-chart-color">
            <div class="mobile-chart-color-l">
              <span></span>
              <template>
                <el-select v-model="value" placeholder="曝光量">
                  <!-- <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option> -->
                </el-select>
              </template>
            </div>
            <div class="mobile-chart-color-r">
              <span></span>
              <template>
                <el-select v-model="value" placeholder="点击量">
                  <!-- <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option> -->
                </el-select>
              </template>
            </div>
          </div>
          <div class="mobile-chart-box">

          </div>
        </div>
      </div>
      <!-- OTT -->
      <div class="mobile">
        <div class="mobile-title"><span>OTT营销概况</span></div>
        <div class="mobile-number">
          <el-col :span="6"><div class="mobile-n-grid r"><span>0</span><p>曝光量（次）</p></div></el-col>
          <el-col :span="6"><div class="mobile-n-grid r"><span>0</span><p>点击量（次）</p></div></el-col>
          <el-col :span="6"><div class="mobile-n-grid r"><span>0</span><p>平均点击率（%）</p></div></el-col>
          <el-col :span="6"><div class="mobile-n-grid"><span>0</span><p>花费（元）</p></div></el-col>
        </div>
        <div class="mobile-chart">
          <div class="mobile-chart-color">
            <div class="mobile-chart-color-l">
              <span></span>
              <template>
                <el-select v-model="value" placeholder="曝光量">
                  <!-- <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option> -->
                </el-select>
              </template>
            </div>
            <div class="mobile-chart-color-r">
              <span></span>
              <template>
                <el-select v-model="value" placeholder="点击量">
                  <!-- <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option> -->
                </el-select>
              </template>
            </div>
          </div>
          <div class="mobile-chart-box">

          </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        value: '',
        name: '电风扇',
        msg: 'index',
        location: '首页',
        sum: 500,
        tags: ['移动', 'PC', 'OTT'],
        indexs: 0,
        datas: ['我是移动页面', 'pc页面在此', '发生的离开'],

        chartDate: {
          tooltip: {trigger: 'axis'},
          legend: {
            left: '1vw',
            data: ['访客数']
          },
          toolbox: {
            feature: { saveAsImage: {} }
          },
          grid: {
            left: '1vw',
            right: '15px',
            bottom: '1vw',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: [1, 2, 3, 4, 5]
            }
          ],
          yAxis: [
            {type: 'value'}
          ],
          series: [
            {
              name: '访客数',
              type: 'line',
              smooth: true,
              data: [3, 4, 56, 23, 78]
            }
          ],
          color: [
            '#33A4FE'
          ]
        }
      }
    },
    methods: {
      toggleTags: function (index) {
        this.indexs = index
      }
    },
    mounted: function () {
      const mobileChart = this.$echarts.init(document.getElementsByClassName('mobile-chart-box')[0])
      mobileChart.setOption(this.chartDate, true)

      const pcChart = this.$echarts.init(document.getElementsByClassName('mobile-chart-box')[1])
      pcChart.setOption(this.chartDate, true)

      const ottChart = this.$echarts.init(document.getElementsByClassName('mobile-chart-box')[2])
      ottChart.setOption(this.chartDate, true)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .index{
    .index-content{
      width 100%;
      height 200px;
      border 1px solid #e1e1e1;
      border-radius 3px;
      padding 30px;
      background #fff;
    }
    .user{
      height 100%;
      width 400px;
      float left;
    }
    .user-info-right{
      height 100%;
      width 270px;
      float right;
    }
    .user-header{
      height 100px;
      width 100px;
      background #ddd;
      border-radius: 50px;
      float left;
    }
    .now-location{
      height 60px;
      line-height 60px;
    }
    .user-info{
      height 50px;
      line-height 50px;
      width 100%;
      font-size 14px
    }
    .self-space{
      color #1D8CE0;
      float right;
    }
    .link-button{
      margin-top 20px
    }
    .tab-tag{
      height 100%;
      width 60px;
      float left;
      .tagActive{
        background #1D8CE0;
        color #fff;
      }
    }
    .tab-tag li{
      display block;
      height 46px;
      line-height 46px;
      text-align center;
      cursor pointer;
      background #f9f9f9;
    }
    .tag-items{
      float right;
      height 100%;
      width 638px;
      border-left  1px solid #ccc
    }
    .tag-item{
      height 100%;
      width 100%;
    }

    .statist{
      float right;
      border 1px solid #ccc;
      border-radius 3px;
      height 100%;
      width 700px;
      overflow hidden
    }
    .count-data{
      width 100%;
      height 100%
    }
    .grid-content{
      height 69px;
      text-align center
      padding 12px 0
      span{
        font-size 20px
      }
    }
    .mobile{
      width 100%
      margin 20px 0 20px 0
      background #fff
      border-radius 3px
      border 1px solid #e1e1e1
      overflow hidden
    }
    .mobile-number{
      height 130px
      text-align center
      border-bottom 1px solid #e1e1e1
    }
    .mobile-title{
      height 34px
      line-height 34px
      border-bottom 1px solid #e1e1e1
      background #f4f5f9
    }
    .mobile-title span{
      margin-left 10px
    }

    .mobile-n-grid{
      height 130px
      padding 40px 0;
      span{
        font-size 26px
        font-weight bold
        margin-top 20px
      }
    }


    .mobile-chart{
      padding: 30px
    }
    .mobile-chart-color{
      width 100%
      height 30px;
      span{
        display inline-block
        height 20px
        width 20px
        position relative
        top 5px
      }
      input{
        margin-left 10px
        height 30px
        width 100px
      }
    }
    .mobile-chart-color-l{
      float left
      span{
        background #ff5500
      }
    }
    .mobile-chart-color-r{
      float right
      span {
        background #f7c100
      }
    }
    .mobile-chart-box{
      height 250px
      width 100%
    }

    .b{
      border-bottom 1px solid #e1e1e1
    }
    .r{
      border-right 1px solid #e1e1e1
    }
    .color-red{
      color red
    }
    .olor-blue{
      color #1D8CE0;
    }
  }
</style>
