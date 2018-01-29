<template>
  <div id="creatmaterial">
    <setps :active="4"></setps>
    <div class="slide">
      <span class="slide-prev btn" @click="prev"><i class="el-icon-arrow-left"></i></span>
      <span class="slide-next btn" @click="next"><i class="el-icon-arrow-right"></i></span>
      <div class="slide-box">
        <ul v-bind:style="{ width: slide.width+'%', left: slide.left+'%' }">
          <li v-for="(item, index) in medias" :class="{checked: currentIndex===index, canclick: !item.canClick}"
              @click="chooseMedia(item.act_id, item.media_id, index, item.status, item.statusDesc, item.canClick)">
            <img :src="item.media_url" :title="item.media_name">
          </li>
        </ul>
      </div>
      <div class="reason-wrap" v-show="platformStatus.show" :class="{'is-refuse': platformStatus.isRefuse}">
        <div class="status">审核状态：{{platformStatus.statusDesc}}</div>
        <div class="admin-reason" v-if="platformStatus.admin_reason">其他拒绝原因：<span>{{platformStatus.admin_reason}}</span>
        </div>
        <div class="image-reason" v-if="platformStatus.image_reason">图片拒绝原因：
          <span>
            <p>质量：不允许展示质量很差的图片。须图片清晰可辨，内容易于理解，文字清楚易读。</p>
            <p>欺骗性手段：不允许使用模拟动画功能，如模拟下拉菜单、搜索框或模拟对话框或错误消息。</p>
            <p>图片规格和像素：图片广告有具体的高度与宽度副符合系统要求，并且需填满所选区域。像素比例适中，不过大。否则，图片广告经系统处理后会变形、模糊无法正常显示。</p>
            <p>图片广告内容：内容必须是健康的，不得包含任何成人内容、色情内容或不适当的语言。</p>
          </span>
        </div>
        <div class="url-reason" v-if="platformStatus.url_reason">落地页拒绝原因：
          <span>
            <p>素材上不能出现敏感字样，如军用，美军，特警，毒品，黄赌毒，等。</p>
            <p>素材上不能出现夸大产品功效、作用的用词，如最好，全球首款，最佳，最大、世界第一、世界首款，月减20不反弹、投资2万一夜暴富，等。</p>
            <p>网页中“疗程、治愈率”医疗行业词汇，“最安全、最有效”等关键词，不能出现。</p>
            <p>广告信息须真实有效，不得有误导消费者的嫌疑，且必须保证广告信息与落地页信息保持一致；</p>
          </span>
        </div>
      </div>
    </div>
    <div class="material">
      <p class="top">广告模板</p>
      <div class="con">
        <!--<flash :collapseVal.sync="collVal" :adCon="adCon.flash" :canSave="canSave" :canEdit="canEdit"></flash>-->
        <tpl-image :collapseVal.sync="collVal" :adCon="adCon.image" :canSave="canSave" :canEdit="canEdit"></tpl-image>
        <tpl-relation1 :collapseVal.sync="collVal" :adCon="adCon.relation1" :canSave="canSave"
                       :canEdit="canEdit"></tpl-relation1>
        <tpl-relation2 :collapseVal.sync="collVal" :adCon="adCon.relation2" :canSave="canSave"
                       :canEdit="canEdit"></tpl-relation2>
      </div>
    </div>
    <div class="button-wrap">
      <el-button @click="back">返回</el-button>
      <el-button type="primary" @click="finish">完成</el-button>
    </div>
  </div>
</template>

<script>
  import setps from './steps-component.vue'
  import mediaJsonP from '../../../static/json/media.json'
  import mediaJsonT from '../../../static/json/test-media.json'

  let testEnv = process.env.TEST === 'test'
  let allMedias = mediaJsonP
  if (testEnv) {
    allMedias = mediaJsonT
  }

  // 素材模板
  import flash from '../edit-template/tpl-flash.vue'
  import image from '../edit-template/tpl-image.vue'
  import relation2 from '../edit-template/tpl-relation2.vue'
  import relation1 from '../edit-template/tpl-relation1.vue'

  export default {
    data () {
      return {
        // 如果为生产环境则去掉'/api'
        upLoadUrl: process.env.NODE_ENV === 'production' ? '' : 'api/',
        // 模板类型
        collVal: '',
        // 计划id
        planId: this.$store.state.creatData.planId,
        // 滑块
        slide: {
          width: 0,
          left: 0
        },
        // 媒体平台模板配对
        mateTpl: {
          flash1: false,
          flash2: false,
          flash3: false
        },
        // 媒体平台列表
        medias: [],
        // 当前已选索引
        currentIndex: '',
        // 当前已选媒体活动id
        currentMediaplanId: '',
        // 当前已选媒体id
        currentMediaId: '',
        // 当前选中的媒体平台状态
        currentPlatformStatus: {},
        // 素材模板状态
        isShow: {
          flash1: false,
          flash2: false
        },
        // 当前选中素材模板 用以显示当前激活栏按钮
        chenkedTpl: '',
        // 当前已保存素材模板 用以确定默认激活栏和预览按钮
        currentTpl: '',
        adCon: {
          flash: null,
          image: null,
          relation1: null,
          relation2: null
        },
        canEdit: false
      }
    },
    created () {
      if (this.planId) {
        // 从vuex获取状态
        let status = this.$store.state.creatData.status
        // if (status && status.status === 4) {
        //   let actidStatus = status.act_ids_status.every(item => {
        //     return item.act_ids_status === -2
        //   })
        //   if (actidStatus) {
        //     this.priceInputStatus = false
        //   }
        // } else if (status && status.status !== 1) {
        //   this.priceInputStatus = true
        // }
        // 获取媒体信息
        this.$http.get('/api2/get_media_plan', {
          params: {
            plan_id: this.planId
          }
        }).then(res => {
          if (res.code === 200) {
            let that = this
            // 媒体平台数据
            allMedias.forEach(function (item) {
              item.canClick = false
              // 没有状态信息的话，状态码为-100，状态描述为''.可修改
              item.status = -100
              item.statusDesc = '正在编辑'
              res.data.forEach(media => {
                if (media.act_channel_id === item.media_id) {
                  item.act_id = media.act_id
                  item.canClick = true
                }
              })
              if (item.canClick === true) {
                that.medias.unshift(item)
              } else {
                that.medias.push(item)
              }
            })
            if (status && status.plan_status === 4) {
              status.act_ids_status.forEach(item => {
                this.medias.forEach(m => {
                  if (m.act_id === item.act_id) {
                    m.status = item.act_ids_status
                    switch (item.act_ids_status) {
                      case -1:
                        m.statusDesc = '编辑中'
                        break
                      case 0:
                        m.statusDesc = '审核中'
                        break
                      case 1:
                        m.statusDesc = '审核通过'
                        break
                      case -2:
                        m.statusDesc = '审核拒绝'
                        break
                      case 100:
                        m.statusDesc = '异常状态'
                        break
                      default:
                        m.statusDesc = '获取状态失败'
                    }
                  }
                })
              })
            } else if (status && status.plan_status !== 1) {
              this.medias.forEach(m => {
                m.status = -200 // 状态码-200，不可修改
                m.statusDesc = '正在审核'
              })
            }
            // 计算媒体列表滑动体宽度
            this.slide.width = Math.ceil(this.medias.length / 5) * 100
          }
        })
      }
    },
    computed: {
      // 判断是否选中了媒体，如果没选中则模板不能展开或者不能保存
      'canSave' () {
        return this.currentMediaId && this.currentMediaplanId
      },
      // 计算当前选中媒体平台的审核状态用来展示，为以后增加需求而增加了一步computed
      'platformStatus' () {
        let res = {
          show: false,
          isRefuse: false,
          statusDesc: '',
          adminReason: '',
          urlReason: '',
          imageReason: ''
        }
        let status = this.currentPlatformStatus
        if (status.status) {
          if (status.status === -2) {
            res.isRefuse = true
          }
          res.show = true
          res.statusDesc = status.statusDesc
          res.admin_reason = status.admin_reason
          res.url_reason = status.url_reason === 1
          res.image_reason = status.image_reason === 1
          return res
        }
        console.log('----', res)
        return res
      }
    },
    watch: {
      // 使用了.sync 修饰符双向绑定了props，允许子组件改变collVal，来达到手风琴的效果。
      'collVal' (val) {
        this.chenkedTpl = val
        this.collVal = val
      }
    },
    methods: {
      prev () {
        let L = this.slide.left
        if (L < 0) this.slide.left = L + 100
      },
      next () {
        let L = this.slide.left
        if (L > (100 - this.slide.width)) this.slide.left = L - 100
      },
      back () {
        this.$router.go(-1)
      },
      finish () {
        this.$router.push('/creatPreview')
      },
      // 选择媒体平台 获取广告信息
      chooseMedia (actId, mediaId, index, status, statusDesc, canClick) {
        if (!canClick) return
        // 根据状态判断是否可修改
        if (status === -100 || status === -2) {
          this.canEdit = true
        } else {
          this.canEdit = false
        }
        // console.log(this.medias)
        // 当前已选索引
        this.currentIndex = index
        // 检索当前选中媒体可用模板
        this.currentMediaId = mediaId
        this.$store.commit('MEDIACHANNEL', mediaId)
        this.$store.commit('ACTID', actId)
        /* for (let key in this.mateTpl) {
          if (this.medias[index].tpl.some(item => { return item === key })) {
            this.mateTpl[key] = true
          } else {
            this.mateTpl[key] = false
          }
        } */
        // 当前选中媒体活动id
        this.currentMediaplanId = actId
        // 获取广告信息
        this.$http.post('/api2/get_ad_for_channel', {
          act_id: actId
        }).then(res => {
          // console.log(res)
          if (res.code === 200 && res.data.length !== 0) {
            // 该平台审核状态
            // this.currentPlatformStatus = {
            //   status: status,
            //   statusDesc: statusDesc,
            //   admin_reason: res.data[0].admin_admin_reason || res.data[0].media_admin_reason,
            //   url_reason: res.data[0].admin_url_reason || res.data[0].media_url_reason,
            //   image_reason: res.data[0].admin_image_reason || res.data[0].media_image_reason
            // }
            this.$set(this.currentPlatformStatus, 'status', status)
            this.$set(this.currentPlatformStatus, 'statusDesc', statusDesc)
            this.$set(this.currentPlatformStatus, 'admin_reason', res.data[0].admin_admin_reason || res.data[0].media_admin_reason)
            this.$set(this.currentPlatformStatus, 'url_reason', res.data[0].admin_url_reason || res.data[0].media_url_reason)
            this.$set(this.currentPlatformStatus, 'image_reason', res.data[0].admin_image_reason || res.data[0].media_image_reason)
            console.log(this.currentPlatformStatus)
            this.chenkedTpl = res.data[0].tpl_cat
            this.currentTpl = res.data[0].tpl_cat
            // 判断到底是什么模板，如果是关联信息模板的话，需要解析conf_info才能判断
            if (res.data[0].tpl_cat !== 'relation') {
              this.collVal = res.data[0].tpl_cat
              // 传入广告编辑模板的数据为adCon(广告内容)、gbUrl(曝光链接)、clickUrl(点击url)
              this.adCon[res.data[0].tpl_cat] = {
                adCon: JSON.parse(res.data[0].conf_info),
                bgUrl: res.data[0].bg_url,
                clickUrl: res.data[0].click_url
              }
            } else {
              this.collVal = JSON.parse(res.data[0].conf_info).relation_info.type
              this.adCon[this.collVal] = {
                adCon: JSON.parse(res.data[0].conf_info),
                bgUrl: res.data[0].bg_url,
                clickUrl: res.data[0].click_url
              }
            }
          } else {
            // 如果没有请求到广告信息，则使子组件都合上
            this.collVal = ''
            this.adCon = {
              flash: null,
              image: null,
              relation1: null,
              relation2: null
            }
          }
        })
      },
      save (appType, confInfo) {
        // 模板保存
        // 判断是否为修改广告
//        if (this.currentTpl && this.chenkedTpl !== this.currentTpl) {
//          this.$confirm('保存新广告会替换之前设置的广告, 是否继续?', '提示', {
//            confirmButtonText: '确定',
//            cancelButtonText: '取消',
//            type: 'warning'
//          }).then(() => {
//            this.addMaterial(appType, confInfo)
//          })
//        } else {
//          this.addMaterial(appType, confInfo)
//        }
        this.addMaterial(appType, confInfo)
      },
      // 添加广告信息
      addMaterial (appType, confInfo) {
        // 添加模板
        this.$http.post('/api2/add_ad_material', {
          // 计划id
          plan_id: this.planId,
          // 活动id 计划id和媒体id组成
          act_id: this.currentMediaplanId,
          // 媒体id
          act_channel_id: this.currentMediaId,
          // 模板类型
          app_type: appType,
          // 模板id
          tpl_cat: appType,
          // 曝光url
          bg_url: confInfo.bg_url,
          // 点击url
          click_url: confInfo.click_url,
          // 模板广告内容
          conf_info: JSON.stringify(confInfo.conf_info)
        }).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '保存成功!'
            })
          }
        })
      }
    },
    components: {
      setps: setps,
      'tpl-relation2': relation2,
      'tpl-relation1': relation1,
      flash,
      'tpl-image': image
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  #creatmaterial {
    .fr {
      float: right
      margin: 7px 20px 0 0
      cursor: pointer;
      background: #fff;
      border: 1px solid #c4c4c4;
      padding: 0 10px;
      height: 28px;
      font-size: 12px;
      border-radius: 4px;
      outline: none;
      transition: .3s;
      &:hover {
        border-color: #169bd5;
        color: #169bd5;
      }
    }
    .slide {
      width: 1140px
      margin: 60px auto 40px;
      position: relative
      .btn {
        width: 42px
        height: 60px
        position: absolute
        font-size: 58px;
        line-height: 60px;
        color: #e4e4e4;
        margin-left: -12px;
        cursor: pointer;
      }
      .slide-prev {
        left: 0
      }
      .slide-next {
        right: 0
      }
      .slide-box {
        width: 980px
        height: 60px
        margin: 0 auto
        overflow hidden
        position: relative
        ul {
          position: absolute
          transition: left 0.5s;
          -moz-transition: left 0.5s; /* Firefox 4 */
          -webkit-transition: left 0.5s; /* Safari 和 Chrome */
          -o-transition: left 0.5s; /* Opera */
          li {
            width: 180px
            height: 60px
            float: left
            margin-right: 20px
            border: 1px solid #c9c9c9
            text-align: center
            overflow: hidden
            position relative
            &:nth-of-type(5n) {
              margin-right: 0;
            }
            img {
              position absolute
              left: 0
              right: 0
              top: 0
              bottom: 0
              height: 100%
              width: auto
              margin: auto
              transition: all 0.3s
              -moz-transition: all 0.3s
              -webkit-transition: all 0.3s
              -o-transition: all 0.3s
            }
            span {
              display inline-block
              position absolute
              left: 0
              right: 0
              top: 0
              bottom: 0
              margin auto
              line-height 58px
              width: 0%;
              height: 0%
              color: #fff
              background rgba(0, 0, 0, .5)
              transition: all 0.3s
            }
          }
          li:hover span {
            width: 100%
            height: 100%
          }
          li:hover img {
            transform: scale(1.1)
            -ms-transform: scale(1.1)
            -moz-transform: scale(1.1)
            -webkit-transform: scale(1.1)
            -o-transform: scale(1.1)
          }
          li.checked {
            border: 1px solid #31a5d8
            img {
              transform: scale(1.1)
              -ms-transform: scale(1.1)
              -moz-transform: scale(1.1)
              -webkit-transform: scale(1.1)
              -o-transform: scale(1.1)
            }
          }
          li.canclick {
            cursor: not-allowed;
          }
        }
      }
      .reason-wrap {
        width: 980px;
        min-height: 120px;
        border: 1px solid #bababa;
        margin: 30px 0 0 80px;
        overflow: hidden;
        padding: 5px;
        transition: all .5s;
        .status {
          width: 100%;
          height: 100%;
          line-height: 120px;
          text-align: center;
        }
      }
      .is-refuse {
        .status {
          width: auto;
          height: auto;
          line-height: inherit;
          text-align: left;
        }
        div {
          line-height: 30px;
          span {
            display: inline-block;
            /* margin-left: 30px; */
            background: #cacaca;
            padding: 5px 20px;
            width: 100%;
          }
        }
      }
    }
    .material {
      width: 980px;
      margin: 0 auto 60px
      overflow: hidden
      min-height: 485px;
      .top {
        line-height: 38px
        color: #31a5d8
        border-bottom: 2px solid #169bd5
      }
      .con {

        .el-collapse-item__content {
          padding: 0
        }
        .btns {
          display: inline
        }
        .ads {
          height: 310px
          position: relative
        }
      }
      .el-collapse-item__header {
        font-weight: bold
      }
    }
    .button-wrap {
      border-top: 1px solid #e4e4e4;
    }
  }
</style>
