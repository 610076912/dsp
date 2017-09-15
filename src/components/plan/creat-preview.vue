<template>
  <div id="creatpreview">
    <steps :active="4"></steps>
    <div class="basic cons">
      <p class="head"><span>基本信息</span><b><router-link to="creatBasics">编辑信息</router-link></b></p>
      <el-row class="row">
        <el-col :span="8"><span>推广计划名称: </span><span>{{ baseInfo.act_name }}</span></el-col>
        <el-col :span="8"><span>投放日期: </span><span>{{ baseInfo.act_b_time }}</span></el-col>
        <el-col :span="8">
          <span>移动到组: </span>
          <span>
           <el-select v-model="baseInfo.group_name" placeholder="请选择" size="small">
             <el-option v-for="item in options" :key="item.group_id" :label="item.group_name" :value="item.group_name"></el-option>
           </el-select>
          </span>
          <i class="el-icon-loading" v-show="loading"></i>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="8"><span>计划每日预算: </span><span>{{ baseInfo.day_budget }}</span></el-col>
        <el-col :span="8"><span>计划总预算: </span><span>{{ baseInfo.all_budget }}</span></el-col>
      </el-row>
    </div>
    <div class="scene cons">
      <p class="head"><span>场景化投放设置</span><b><router-link to="creatScene">编辑信息</router-link></b></p>
      <div class="box">
        <p class="minhead"><span>广告目标</span></p>
        <div class="label">
          <span class="labels">汽车</span>
        </div>
      </div>
      <div class="box">
        <p class="minhead"><span>场景化内容</span></p>
        <div class="label">
          <span class="labels">赛车</span>
        </div>
      </div>
    </div>
    <div class="date cons">
      <p class="head"><span>投放时间</span><b><router-link to="creatTime">编辑信息</router-link></b></p>
      <div class="box">
        <p class="minhead"><span>小时</span></p>
        <div class="label">
          <span class="labels">00:00</span>
        </div>
      </div>
      <div class="box">
        <p class="minhead"><span>星期</span></p>
        <div class="label">
          <span class="labels">周一</span>
        </div>
      </div>
    </div>
    <div class="position cons">
      <p class="head"><span>地理位置定向</span><b><router-link to="creatCity">编辑信息</router-link></b></p>
      <div class="box">
        <p class="minhead"><span>按地区</span></p>
        <div class="label">
          <span class="labels">北京</span>
          <span class="labels">天津</span>
        </div>
      </div>
    </div>
    <div class="media cons">
      <p class="head"><span>媒体定向</span><b><router-link to="creatMedia">编辑信息</router-link></b></p>
      <div class="box">
        <div class="label">
          <span class="labels" v-for="item in meidaInfo">{{ item.media_name }}</span>
        </div>
      </div>
    </div>
    <div class="episode cons">
      <p class="head"><span>剧集定向</span><b><router-link to="creatMediatype">编辑信息</router-link></b></p>
      <div class="box">
        <div class="label">
          <span class="labels">电影</span>
          <span class="labels">电视剧</span>
        </div>
      </div>
    </div>
    <div class="strategy cons">
      <p class="head"><span>投放策略</span><b><router-link to="creatStrategy">编辑信息</router-link></b></p>
      <div class="box">
        <div class="bar">
          <div class="title">投放频次:</div>
          <div class="block">
            <el-radio v-model="radio" label="true"> 不控制频次</el-radio>
            <p><i class="el-icon-information"></i> 针对移动设备部控制投放频次</p>
          </div>
        </div>
        <div class="bar">
          <div class="title">投放速度:</div>
          <div class="block">
            <el-radio v-model="radio" label="true"> 快速投放</el-radio>
            <p><i class="el-icon-information"></i> 在较短的时间内获取最大的曝光量</p>
          </div>
        </div>
        <div class="bar">
          <div class="title">计费类型:</div>
          <div class="block">
            <el-radio v-model="radio" label="true"> 按照曝光计费（CPM）</el-radio>
            <p><i class="el-icon-information"></i> 每千次有效展示的成本</p>
          </div>
        </div>
        <div class="bar">
          <div class="title">推广出价:</div>
          <div class="inp">
            <span>10</span>
            <span>元</span>
          </div>
        </div>
      </div>
    </div>
    <div class="button-wrap">
      <el-button @click="back">返回</el-button>
      <el-button @click="finish" :loading="finishLoading">完成</el-button>
      <el-button type="primary" @click="finishto" :loading="finishtoLoading">完成并上传广告素材</el-button>
    </div>
  </div>
</template>

<script>
  import steps from './steps-component.vue'
  import medias from '@/assets/json/media.json'

  export default {
    name: 'creatPreview',
    data () {
      return {
        loading: true,
        options: [],
        oldValue: '',
        baseInfo: {
          act_name: '',
          act_b_time: '',
          group_name: '',
          day_budget: '',
          all_budget: ''
        },
        sceneInfo: {},
        timeInfo: {
          time: 'afsdfasdf',
          week: 1212126
        },
        positionInfo: {
          region_all: []
        },
        meidaInfo: [],
        episodeInfo: {
          class_plan: ''
        },
        strategy: {
          frequency: 12,
          casttype: 0,
          billing: 1
        },
        radio: 'true',
        finishLoading: false,
        finishtoLoading: false
      }
    },
    created () {
      // 分组信息
      this.$http.get('/api/get_act_group').then(res => {
        if (res.code === 200) {
          this.options = res.data
          this.loading = false
        }
      })
      // 预览信息
      this.$http.post('/api/act_conf_preview', {
        act_id: 10
      }).then(res => {
        if (res.code === 200) {
          const result = res.data
          const _this = this
          if (result.baseInfo_1) {
            // 基本信息
            _this.baseInfo.act_name = result.baseInfo_1.act_name
            _this.baseInfo.act_b_time = result.baseInfo_1.act_b_time
            _this.baseInfo.group_name = result.baseInfo_1.group_name
            _this.oldValue = result.baseInfo_1.group_name
            _this.baseInfo.day_budget = result.baseInfo_1.day_budget
            _this.baseInfo.all_budget = result.baseInfo_1.all_budget
          }
          if (result.sceneInfo_2) {
            // 场景化投放设置
          }
          if (result.timeInfo_3) {
            // 投放时间
            _this.timeInfo.time = result.timeInfo_3.time
            _this.timeInfo.week = result.timeInfo_3.week
          }
          if (result.regionInfo_4) {
            // 地理位置定向
            _this.positionInfo.region_all = result.regionInfo_4.region_all
          }
          if (result.meidaInfo_5) {
            // 媒体定向
            for (let i in medias) {
              if (new RegExp(medias[i].media_id).test(result.meidaInfo_5.media_plan)) {
                _this.meidaInfo.push(medias[i])
              }
            }
          }
          if (result.classInfo_6) {
            // 剧集定向
            _this.episodeInfo.class_plan = result.classInfo_6.class_plan
          }
          if (result.strategyInfo_7) {
            // 投放策略
            _this.strategyInfo.frequency = result.strategyInfo_7.frequency
            _this.strategyInfo.casttype = result.strategyInfo_7.casttype
            _this.strategyInfo.billing = result.strategyInfo_7.billing
          }
        }
      })
    },
    methods: {
      back () {
        this.$router.go(-1)
      },
      finish () {
        this.finishLoading = true
        this.updataGroup(res => {
          this.finishLoading = false
          if (res !== false && res.code === 200) {
            this.oldValue = this.baseInfo.group_name
          }
        })
      },
      finishto () {
        this.finishtoLoading = true
        this.updataGroup(res => {
          this.finishtoLoading = false
          if (res === false) {
            this.$router.push('/creatMaterial')
          } else if (res.code === 200) {
            this.$router.push('/creatMaterial')
          }
        })
      },
      updataGroup (callback) {
        if (this.baseInfo.group_name !== this.oldValue) {
          const thisGroupId = this.options.filter(item => { return item.group_name === this.baseInfo.group_name })[0].group_id
          // 修改基本组信息
          this.$http.post('/api/upd_act', {
            act_id: 10,
            group_id: thisGroupId
          }).then(res => {
            callback(res)
          })
        } else {
          callback(false)
        }
      }
    },
    components: {
      steps
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  #creatpreview {
    .cons {
      width: 1170px
      margin-left: 30px
      padding-top: 20px
    }
    .head {
      width: 1140px
      height: 38px
      border-bottom: 1px solid #e4e4e4
      margin-bottom: 20px

      span {
        display: inline-block
        border-bottom: 2px solid #169bd5
        font-size: 14px
        line-height: 36px
        float: left
      }
      b {
        float: right
        padding-top: 14px
        font-weight: normal

        a {
          color: #169bd5
        }
      }
    }
    .row {
      width: 100%
      line-height: 30px
    }
    .box {
      width: 100%
      line-height: 30px
      margin-bottom: 20px

      .minhead {
        line-height: 36px

        span {
          display: inline-block
          border-bottom: 2px solid #169bd5
        }
      }
      .label {
        width: 100%
        font-size: 0

        .labels {
          display: inline-block
          width: 86px
          height: 44px
          text-align: center
          line-height: 44px
          background: #fcfcfc
          margin: 10px 10px 0 0
          font-size: 12px
        }
      }
      .bar {
        width: 100%
        height: 80px
        margin-bottom: 60px
        &:nth-last-of-type(1) {
          margin-bottom: 0;
        }
        .title {
          width: 120px
          height: 100%
          float: left
        }
        .block {
          width: 340px
          height: 100%
          border: 1px solid #f2f2f2
          float: left
          padding: 10px 0 0 20px

          p {
            color: #cccccc

            i {
              padding: 0 10px 0 20px
              color: #ff4e00
            }
          }
        }
        .inp {

        }
      }
    }
    .button-wrap {
      border-top: 1px solid #e4e4e4;
    }
  }
</style>
