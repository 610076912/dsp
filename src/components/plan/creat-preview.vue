<template>
  <div id="creatpreview">
    <steps :active="5"></steps>
    <div class="basic cons">
      <p class="head"><span>基本信息</span><b>
        <router-link to="creatBasics">编辑信息</router-link>
      </b></p>
      <el-row class="row">
        <el-col :span="8"><span>推广计划名称: </span><span>{{ baseInfo.act_name }}</span></el-col>
        <el-col :span="8">
          <span>投放日期: </span><span>{{ new Date(baseInfo.act_b_time).Format('yyyy-MM-dd hh:mm:ss') }}~{{ new Date(baseInfo.act_e_time).Format('yyyy-MM-dd hh:mm:ss') }}</span>
        </el-col>
        <el-col :span="8"><span>分组: </span><span>{{ baseInfo.group_name }}</span></el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="8"><span>计划每日预算: </span><span>{{ baseInfo.day_budget }}元</span></el-col>
        <el-col :span="8"><span>计划总预算: </span><span>{{ baseInfo.all_budget }}元</span></el-col>
      </el-row>
    </div>
    <div class="scene cons">
      <p class="head"><span>场景化投放设置</span><b>
        <router-link to="creatScene">编辑信息</router-link>
      </b></p>
      <div class="pro-box">
        <p class="minhead"><span>广告目标</span></p>
        <div class="label">

        </div>
      </div>
      <div class="pro-box">
        <p class="minhead"><span>场景化内容</span></p>
        <div class="label">
          <span class="labels" v-for="item in sceneInfo">{{ item.class_name }}</span>
        </div>
      </div>
    </div>
    <div class="date cons">
      <p class="head"><span>投放时间</span><b>
        <router-link to="creatTime">编辑信息</router-link>
      </b></p>
      <div class="pro-box">
        <p class="minhead"><span>小时</span></p>
        <div class="label">
          <time-bar :pTimeArr="checkedTime"></time-bar>
        </div>
      </div>
      <div class="pro-box">
        <p class="minhead"><span>星期</span></p>
        <div class="label">
          <week-bar :pWeekArr="checkedWeek"></week-bar>
        </div>
      </div>
    </div>
    <div class="position cons">
      <p class="head"><span>地理位置定向</span><b>
        <router-link to="creatCity">编辑信息</router-link>
      </b></p>
      <div class="pro-box">
        <p class="minhead"><span>按地区</span></p>
        <div class="label">
          <span class="labels" v-for="item in positionInfo">{{ item.name }}</span>
        </div>
      </div>
    </div>
    <div class="media cons">
      <p class="head"><span>媒体定向</span></p>
      <div class="pro-box">
        <div class="label">
          <span class="labels" v-for="item in meidaInfo">{{ item.media_name }}</span>
        </div>
      </div>
    </div>
    <div class="episode cons">
      <p class="head"><span>视频类型</span><b>
        <router-link to="creatMediatype">编辑信息</router-link>
      </b></p>
      <div class="pro-box">
        <div class="label">
          <span class="labels" v-for="item in episodeInfo">{{ item.type }}</span>
        </div>
      </div>
    </div>
    <div class="strategy cons">
      <p class="head"><span>投放策略</span><b>
        <router-link to="creatStrategy">编辑信息</router-link>
      </b></p>
      <div class="pro-box">
        <div class="bar">
          <div class="title">投放频次:</div>
          <div class="block" v-if="!strategy.frequency">
            <el-radio v-model="radio" label="true"> 不控制频次</el-radio>
            <p><i class="el-icon-information"></i> 针对移动设备部控制投放频次</p>
          </div>
          <div class="block" v-if="strategy.frequency">
            <el-radio v-model="radio" label="true"> 自定义频次</el-radio>
            <p><i class="el-icon-information"></i> 每天每个设备曝光？？次</p>
          </div>
        </div>
        <div class="bar">
          <div class="title">投放速度:</div>
          <div class="block" v-if="!strategy.casttype">
            <el-radio v-model="radio" label="true"> 快速投放</el-radio>
            <p><i class="el-icon-information"></i> 在较短的时间内获取最大的曝光量</p>
          </div>
          <div class="block" v-if="strategy.casttype">
            <el-radio v-model="radio" label="true"> 均匀投放</el-radio>
            <p><i class="el-icon-information"></i> 将预算划分到当天的每个小时，均匀投放</p>
          </div>
        </div>
        <div class="bar">
          <div class="title">计费类型:</div>
          <div class="block" v-if="!strategy.billing">
            <el-radio v-model="radio" label="true"> 按照曝光计费（CPM）</el-radio>
            <p><i class="el-icon-information"></i> 每千次有效展示的成本</p>
          </div>
          <div class="block" v-if="strategy.billing">
            <el-radio v-model="radio" label="true"> 按照点击计费</el-radio>
            <p><i class="el-icon-information"></i> 每次点击的有效成本</p>
          </div>
        </div>
        <!--<div class="bar">
          <div class="title">推广出价:</div>
          <div class="inp">
            <span>10</span>
            <span>元</span>
          </div>
        </div>-->
      </div>
    </div>
    <div class="material cons">
      <p class="head"><span>广告素材类型</span><b>
        <router-link to="creatMaterial">编辑信息</router-link>
      </b></p>
      <div class="pro-box">
        <div class="material-item" v-for="(item, index) in platformName">
          <component v-bind:is="materialBg[index]" :confinfo="item.confInfo">
            <!-- 组件在 vm.currentview 变化时改变！ -->
          </component>
        </div>
      </div>
      <!--<div class="pro-box">
        <div class="material-item" v-for="(item, index) in platformName">
          <video loop autoplay :src="materialBg[index]" alt=""></video>
          <div class="mask">
            <span>平&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;台：{{item}}</br></span>
            <span>广告类型：</br></span>
            <span>模板类型：</span>
          </div>
        </div>
      </div>-->
    </div>
    <div class="button-wrap">
      <el-button @click="back">返回</el-button>
      <el-button @click="finish" :loading="finishLoading">完成</el-button>
      <el-button type="primary" @click="finishto" :loading="finishtoLoading">提审</el-button>
    </div>
  </div>
</template>

<script>
  import steps from './steps-component.vue'
  import timeBar from './timebar-component.vue'
  import weekBar from './weekbar-component.vue'

  import medias from '../../../static/json/media.json'
  import mediaType from '../../../static/json/media-type.json'
  import region from '../../../static/json/region.json'
  import tplJson from '../../../static/json/tpl.json'
  import timeData from '../../../static/json/timeData.json'
  // 引入展示模板
  import rich1 from '../template/rich1.vue'
  import rich2 from '../template/rich2.vue'
  import flash from '../template/tpl-flash.vue'
  import img from '../template/tpl-img.vue'

  // 剧集数据
  const episode = mediaType.mediaType
  const strTOarr = timeData.timeForStr
  export default {
    name: 'creatPreview',
    data () {
      return {
        // 计划id
        planId: this.$store.state.creatData.planId,
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
        sceneInfo: [],
        timeInfo: {
          time: '',
          week: 0
        },
        checkedTime: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        checkedWeek: [0, 0, 0, 0, 0, 0, 0],
        positionInfo: [],
        meidaInfo: [],
        episodeInfo: [],
        strategy: {},
        radio: 'true',
        finishLoading: false,
        finishtoLoading: false,
        materialInfo: []
      }
    },
    created () {
      // 预览信息
      this.$http.post('/api2/plan_conf_preview', {
        plan_id: this.$store.state.creatData.planId
      }).then(res => {
        if (res.code === 200) {
          const result = res.data
          const _this = this
          if (result.baseInfo_1) {
            // 基本信息
            _this.baseInfo.act_name = result.baseInfo_1.plan_name
            _this.baseInfo.act_e_time = result.baseInfo_1.plan_e_time
            _this.baseInfo.act_b_time = result.baseInfo_1.plan_b_time
            _this.baseInfo.group_name = result.baseInfo_1.group_name
            _this.oldValue = result.baseInfo_1.group_name
            _this.baseInfo.day_budget = result.baseInfo_1.plan_day_budget
            _this.baseInfo.all_budget = result.baseInfo_1.plan_all_budget
          }
          if (result.sceneInfo_2) {
            // 场景化投放设置
            this.sceneInfo = result.sceneInfo_2
          }
          if (result.timeInfo_3) {
            // 投放时间
            _this.checkedTime = _this.transformTime(result.timeInfo_3.plan_time)
            _this.checkedWeek = _this.transformWeek(result.timeInfo_3.plan_week)
          }
          if (result.regionInfo_4) {
            // 地理位置定向
            for (let index in region) {
              for (let i in result.regionInfo_4) {
                if (result.regionInfo_4[i].region_id.toString().substr(0, 2) === region[index].id) {
                  _this.positionInfo.push(region[index])
                  break
                }
              }
            }
          }
          if (result.meidaInfo_5) {
            // 媒体定向
            for (let index in medias) {
              for (let i in result.meidaInfo_5) {
                if (result.meidaInfo_5[i].act_channel_id === medias[index].media_id) {
                  _this.meidaInfo.push(medias[index])
                  break
                }
              }
            }
          }
          if (result.classInfo_6) {
            // 剧集定向
            for (let index in episode) {
              for (let i in result.classInfo_6.class_plan) {
                if (result.classInfo_6.class_plan[i] === episode[index].type_id) {
                  _this.episodeInfo.push(episode[index])
                  break
                }
              }
            }
          }
          if (result.strategyInfo_7) {
            // 投放策略
            _this.strategy = result.strategyInfo_7
          }
          if (result.adConfInfo_8) {
            // 广告信息
            _this.materialInfo = result.adConfInfo_8
          }
        }
      })
    },
    methods: {
      back () {
        this.$router.go(-1)
      },
      finish () {
        this.$router.push('/plan')
      },
      finishto () {
        this.finishtoLoading = true
        // 审核
        this.$http.post('/api2/send_audit', {
          plan_id: this.$store.state.creatData.planId
        }).then(res => {
          this.finishtoLoading = false
          if (res.code === 200) {
            this.$alert('提审成功', '成功', {
              confirmButtonText: '确定',
              callback: () => {
                this.$router.push('/plan')
              }
            })
            // 调取消发布接口
            this.$http.post('/api2/canclepublish', {
              plan_id: this.$store.state.creatData.planId
            })
          }
        })
      },
      // 小时转换
      transformTime (arr) {
        let res = ''
        if (typeof arr === 'string') {
          res = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          arr.split('').forEach(function (item) {
            res[strTOarr[item]] = 1
          })
        } else if (typeof arr === 'object') {
          arr.forEach(function (item, index) {
            if (item) {
              for (let i in strTOarr) {
                if (strTOarr[i] === index) {
                  res += i
                }
              }
            }
          })
        }
        return res
      },
      // 周期转换
      transformWeek (arg) {
        let res = ''
        if (typeof arg === 'string') {
          res = [0, 0, 0, 0, 0, 0, 0]
          for (let i = 0; i < arg.split('').length; i++) {
            if (arg.split('')[i] === 0) {
              res.splice(6, 1, 1)
            }
            res.splice(arg.split('')[i] * 1 - 1, 1, 1)
          }
        } else if (typeof arg === 'object') {
          arg.forEach(function (item, index) {
            if (item) {
              if (index === 6) index = -1
              res += index + 1
            }
          })
        }
        return res
      }
    },
    computed: {
      'platformName': {
        get: function () {
          let that = this
          let res = []
          this.materialInfo.forEach(function (item) {
            for (let i = 0; i < that.meidaInfo.length; i++) {
              if (item.act_channel_id === that.meidaInfo[i].media_id) {
                res.push({mediaId: that.meidaInfo[i].media_name, confInfo: JSON.parse(item.conf_info)})
              }
            }
          })
          return res
        }
      },
      'materialBg': {
        get: function () {
          let res = []
          this.materialInfo.forEach(function (item) {
            // 从外层数据只能拿到 relation 但不知道relation1还是relation2
            if (item.tpl_cat !== 'relation') {
              res.push(tplJson[item.tpl_cat])
            } else {
              let relType = JSON.parse(item.conf_info).relation_info.type
              res.push(tplJson[relType])
            }
          })
          return res
        }
      }
    },
    components: {
      steps,
      'time-bar': timeBar,
      'week-bar': weekBar,
      tplFlash: flash,
      tplImg: img,
      tplRich1: rich1,
      tplRich2: rich2
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
    .pro-box {
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
          width: 120px
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
    .material {
      .pro-box {
        overflow: hidden;
        .material-item {
          width: 550px;
          height: 360px;
          float: left;
          margin-bottom: 40px;
          position: relative;
          overflow: hidden;
          video {
            width: 100%;
          }
          &:nth-of-type(2n-1) {
            margin-right: 35px;
          }
          .mask {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, .7);
            transform: scale(0);
            transition: all .5s;
            padding: 100px 130px;
            span {
              color: #fff;
              font-size: 14px;
            }
          }
          img {
            width: 100%;
            height: 100%;
          }
          &:hover .mask {
            transform: scale(1, 1)
          }
        }
      }
    }
    .button-wrap {
      border-top: 1px solid #e4e4e4;
    }
  }
</style>
