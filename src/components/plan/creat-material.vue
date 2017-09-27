<template>
  <div id="creatmaterial">
    <setps :active="4"></setps>
    <div class="slide">
      <span class="slide-prev btn" @click="prev"><i class="el-icon-arrow-left"></i></span>
      <span class="slide-next btn" @click="next"><i class="el-icon-arrow-right"></i></span>
      <div class="slide-box">
        <ul v-bind:style="{ width: slide.width+'%', left: slide.left+'%' }">
          <li v-for="(item, index) in medias" :class="{checked: currentIndex===index}" @click="chooseMedia(item.act_id, item.media_id, index)">
            <img :src="item.media_url" :title="item.media_name">
          </li>
        </ul>
      </div>
    </div>
    <div class="material">
      <div class="left">
        <p class="top">一级广告</p>
        <div class="con">
          <el-collapse accordion :value="currentTpl" @change="tplChange">
            <!--flash模板1-->
            <el-collapse-item name="flash1" v-if="mateTpl.flash1">
              <template class="fontb" slot="title">Flash1 150px*150px规格
                <div class="btns" v-show="chenkedTpl==='flash1'">
                  <button @click.stop="save('flash1')" class="fr" v-show="isShow.flash1" size="small">保存</button>
                  <button @click.stop="edit('flash1')" class="fr" v-show="!isShow.flash1" size="small">编辑</button>
                  <button @click.stop="cancel('flash1')" class="fr" size="small">取消</button>
                </div>
              </template>
              <flash1 :isShow="isShow" :adContent="adContent"></flash1>
            </el-collapse-item>
            <!--flash模板2-->
            <el-collapse-item name="flash2" v-if="mateTpl.flash2">
              <template class="fontb" slot="title">Flash2 210px*60px规格
                <div class="btns" v-show="chenkedTpl==='flash2'">
                  <button @click.stop="save('flash2')" class="fr" v-show="isShow.flash2" size="small">保存</button>
                  <button @click.stop="edit('flash2')" class="fr" v-show="!isShow.flash2" size="small">编辑</button>
                  <button @click.stop="cancel('flash2')" class="fr" size="small">取消</button>
                </div>
              </template>
              <flash2 :isShow="isShow" :adContent="adContent"></flash2>
            </el-collapse-item>
            <!--flash模板3-->
            <el-collapse-item name="flash3" v-if="mateTpl.flash3">
              <template class="fontb" slot="title">Flash3 210px*90px规格
                <div class="btns" v-show="chenkedTpl==='flash3'">
                <button @click.stop="save('flash3')" class="fr" v-show="isShow.flash3" size="small">保存</button>
                <button @click.stop="edit('flash3')" class="fr" v-show="!isShow.flash3" size="small">编辑</button>
                <button @click.stop="cancel('flash3')" class="fr" size="small">取消</button>
              </div>
              </template>
              <flash3 :isShow="isShow" :adContent="adContent"></flash3>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
      <div class="right">
        <p class="top">二级广告</p>
        <div class="con">
          <el-collapse accordion value="1">
            <!--<el-collapse-item name="1">
              <template class="fontb" slot="title">关联模板1 屏占比3:1 适用于: 商品
              <button @click.stop class="fr" size="small">保存</button>
              </template>
              <tpl2></tpl2>
            </el-collapse-item>-->
          </el-collapse>
        </div>
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
  import allMedias from '@/assets/json/media.json'

  // 素材模板
  import flash1 from '../template/flash1.vue'
  import flash2 from '../template/flash2.vue'
  import flash3 from '../template/flash3.vue'

  export default {
    data () {
      return {
        // 计划id
        planId: this.$store.state.creatData.actId,
        // 滑块
        slide: {
          width: 0,
          left: '0'
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
        currentMediaActId: '',
        // 当前已选媒体id
        currentMediaId: '',
        // 素材模板状态
        isShow: {
          flash1: false,
          flash2: false
        },
        // 当前选中素材模板 用以显示当前激活栏按钮
        chenkedTpl: '',
        // 当前已保存素材模板 用以确定默认激活栏和预览按钮
        currentTpl: '',
        // 广告模板数据结构
        adContent: {
          flash1: {
            flash: '',
            position: '',
            url: '',
            size: '150,150'
          },
          flash2: {
            flash: '',
            position: '',
            url: '',
            size: '210,60'
          },
          flash3: {
            flash: '',
            position: '',
            url: '',
            size: '210,90'
          }
        }
      }
    },
    created () {
      if (this.planId) {
        // 获取媒体信息
        this.$http.get('/api2/get_media_plan', {
          params: {
            plan_id: this.planId
          }
        }).then(res => {
          if (res.code === 200) {
            let _this = this
            // 媒体平台数据
            res.data.forEach(function (media) {
              allMedias.forEach(function (item) {
                if (media.act_channel_id === item.media_id) {
                  item.act_id = media.act_id
                  _this.medias.push(item)
                }
              })
            })
            // 计算媒体列表滑动体宽度
            _this.slide.width = Math.ceil(_this.medias.length / 5) * 100
          }
        })
      }
    },
    methods: {
      prev () {
        const L = this.slide.left
        if (L < 0) this.slide.left = L + 100
      },
      next () {
        const L = this.slide.left
        if (L > (100 - this.slide.width)) this.slide.left = L - 100
      },
      back () {
        this.$router.go(-1)
      },
      finish () {
        this.$router.push('/creatPreview')
      },
      // 选择媒体平台 获取广告信息
      chooseMedia (actId, mediaId, index) {
        // 当前已选索引
        this.currentIndex = index
        // 检索当前选中媒体可用模板
        this.currentMediaId = mediaId
        for (let key in this.mateTpl) {
          if (this.medias[index].tpl.some(item => { return item === key })) {
            this.mateTpl[key] = true
          } else {
            this.mateTpl[key] = false
          }
        }
        // 当前选中媒体活动id
        this.currentMediaActId = actId
        // 获取广告信息
        this.$http.post('/api2/get_ad_for_channel', {
          act_id: actId
        }).then(res => {
          if (res.code === 200) {
            this.chenkedTpl = res.data[0].tpl_cat
            this.currentTpl = res.data[0].tpl_cat
            this.adContent[res.data[0].tpl_cat] = JSON.parse(res.data[0].conf_info)
          }
        })
      },
      // 激活模板改变
      tplChange (val) {
        this.chenkedTpl = val
      },
      cancel (adName) {
        // 返回显示模板图片
        this.isShow[adName] = false
      },
      edit (adName) {
        // 编辑模板
        this.isShow[adName] = true
      },
      save (adName) {
        // 模板保存
        // 判断是否为修改广告
        if (this.currentTpl && this.chenkedTpl !== this.currentTpl) {
          this.$confirm('保存新广告会替换之前设置的广告, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // 保存/编辑按钮状态
            this.isShow[adName] = false
            // 当前模板
            this.currentTpl = adName
            // 添加广告
            this.addMaterial('flash', adName)
          })
        } else {
          // 保存/编辑按钮状态
          this.isShow[adName] = false
          // 当前模板
          this.currentTpl = adName
          // 添加广告
          this.addMaterial('flash', adName)
        }
      },
      // 添加广告信息
      addMaterial (appType, adName) {
        // 添加模板
        this.$http.post('/api2/add_ad_material', {
          // 计划id
          plan_id: this.planId,
          // 活动id 计划id和媒体id组成
          act_id: this.currentMediaActId,
          // 媒体id
          act_channel_id: this.currentMediaId,
          // 模板类型
          app_type: appType,
          // 模板id
          tpl_cat: adName,
          // 模板广告内容
          conf_info: JSON.stringify(this.adContent[adName])
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
      flash1: flash1,
      flash2: flash2,
      flash3: flash3
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
      height: 60px
      margin: 60px auto
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
        height: 100%
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

            img{
              height: 100%
              width: auto
              margin: 0 auto
              transition: all 0.3s
              -moz-transition: all 0.3s
              -webkit-transition: all 0.3s
              -o-transition: all 0.3s
            }
          }
          li:hover img{
            transform: scale(1.1)
            -ms-transform: scale(1.1)
            -moz-transform: scale(1.1)
            -webkit-transform: scale(1.1)
            -o-transform: scale(1.1)
          }
          li.checked{
            border: 1px solid #31a5d8
            img{
              transform: scale(1.1)
              -ms-transform: scale(1.1)
              -moz-transform: scale(1.1)
              -webkit-transform: scale(1.1)
              -o-transform: scale(1.1)
            }
          }
        }
      }
    }
    .material {
      width: 1140px;
      margin: 0 auto 60px
      overflow: hidden
      min-height: 438px;
      .left {
        width: 554px
        float: left
      }
      .right {
        width: 554px
        float: right
      }

      .top {
        line-height: 38px
        color: #31a5d8
        border-bottom: 2px solid #169bd5
      }
      .con {

        .el-collapse-item__content {
          padding: 0
        }
        .btns{
          display: inline
        }
        .ads {
          height: 310px
          position: relative

          .ad-style {
            width: 100%
            height: 100%
            position: absolute
            left: 0
            top: 0
            background: #ccc
          }
          .ad-edit {
            width: 100%
            height: 100%
            position: absolute
            left: 0
            top: 0
            padding: 73px 25px 0
            background: #f0f3f8
          }
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
