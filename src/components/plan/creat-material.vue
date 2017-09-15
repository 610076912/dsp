<template>
  <div id="creatmaterial">
    <setps :active="5"></setps>
    <div class="slide">
      <span class="slide-prev btn" @click="prev"><i class="el-icon-arrow-left"></i></span>
      <span class="slide-next btn" @click="next"><i class="el-icon-arrow-right"></i></span>
      <div class="slide-box">
        <ul v-bind:style="{ width: slide.width+'%', left: slide.left+'%' }">
          <li v-for="item in medias" @click="chooseMedia(item.media_id)">{{ item.media_name }}</li>
        </ul>
      </div>
    </div>
    <div class="material">
      <div class="left">
        <p class="top">一级广告</p>
        <div class="con">
          <el-collapse accordion value="flash1">
            <el-collapse-item name="flash1">
              <template class="fontb" slot="title">Flash1 150px*150px规格
                <button @click.stop="save('flash1')" class="fr" v-show="isShow.flash1" size="small">保存</button>
                <button @click.stop="edit('flash1')" class="fr" v-show="!isShow.flash1" size="small">编辑</button>
                <button @click.stop class="fr" size="small">预览</button>
              </template>
              <div class="ads">
                <div class="ad-style"></div>
                <div class="ad-edit" v-show="isShow.flash1">
                  <div class="flash"></div>
                  <div class="ad-con">
                    <div class="ad-title">*Flash规范：格式fla、目标Flash Player17、脚本ActionScript3.0、大小200K</div>
                    <div class="ad-position">
                      <span>广告位置</span>
                      <span :class="{ checked: flash1Checked[0] }" @click="choosePosition('left')">屏幕居左</span>
                      <span :class="{ checked: flash1Checked[1] }" @click="choosePosition('center')">屏幕居中</span>
                      <span :class="{ checked: flash1Checked[2] }" @click="choosePosition('right')">屏幕居右</span>
                    </div>
                    <div class="ad-url">
                      <el-input placeholder="请输入内容" v-model="adContent.flash1.url" size="small">
                        <template slot="prepend">跳转链接</template>
                      </el-input>
                    </div>
                  </div>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
      <div class="right">
        <p class="top">二级广告</p>
        <div class="con">
          <!--<el-collapse accordion value="1">
            <el-collapse-item name="1">
              <template class="fontb" slot="title">关联模板1 屏占比3:1 适用于: 商品
                <button @click.stop class="fr" size="small">保存</button>
              </template>
              <div class="ads"></div>
            </el-collapse-item>
            <el-collapse-item name="2">
              <template class="fontb" slot="title">关联模板2 屏占比3:2 适用于: 商品
                <button @click.stop class="fr" size="small">保存</button>
              </template>
              <div class="ads"></div>
            </el-collapse-item>
          </el-collapse>-->
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
  import medias from '@/assets/json/media.json'

  export default {
    data () {
      return {
        radio: 'true',
        slide: {
          width: Math.ceil(medias.length / 5) * 100,
          left: '0'
        },
        medias: medias,
        currentMedia: '',
        isShow: {
          flash1: false
        },
        adContent: {
          flash1: {
            flash: '',
            position: '',
            url: ''
          }
        },
        flash1Checked: [false, false, false]
      }
    },
    created () {},
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
        console.log('complete')
      },
      chooseMedia (mediaId) {
        this.currentMedia = mediaId
        // 获取模板信息
        this.$http.post('/api/get_ad_for_channel', {
          act_id: 10,
          media_channel: mediaId
        }).then(res => {
          console.log(res)
        })
      },
      addMaterial (appType, tplCat, adType) {
        // 添加模板
        this.$http.post('/api/add_ad_material', {
          act_id: 10,
          media_channel: this.currentMedia,
          app_type: appType,
          tpl_cat: tplCat,
          conf_info: JSON.stringify(this.adContent[adType])
        }).then(res => {
          console.log(res)
        })
      },
      edit (adName) {
        // 编辑模板
        this.isShow[adName] = true
      },
      save (adName) {
        // 保存模板
        this.isShow[adName] = false
        this.addMaterial('flash', 1, adName)
      },
      choosePosition (position) {
        this.adContent.flash1.position = position
        switch (position) {
          case 'left':
            this.flash1Checked = [true, false, false]
            break
          case 'center':
            this.flash1Checked = [false, true, false]
            break
          case 'right':
            this.flash1Checked = [false, false, true]
            break
        }
      }
    },
    components: {
      setps
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

          .flash{
            width: 148px
            height: 148px
            border: 1px solid #e4e4e4
            float: left
            background: #ffffff
          }
          .ad-con{
            width: 327px
            height: 150px
            float: left
            margin-left: 25px

            .ad-title{
              width: 100%
              height: 70px
            }
            .ad-position,.ad-url{
              width: 100%
              height: 30px
              margin-top: 10px
            }
            .ad-position{
              border: 1px solid #e4e4e4
              span{
                display: inline-block
                width: 81px
                height: 100%
                border-left: 1px solid #e4e4e4
                text-align: center
                line-height: 28px
                background: #f9fafc
                float: left
              }
              span:first-of-type{
                cursor: inherit
                border: none
                background: #ffffff
              }
              span.checked{
                border: 1px solid #169bd5
              }
            }
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
