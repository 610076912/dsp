<template>
  <div class="tpl-flash1">
    <el-collapse accordion @change="collapseChange" :value="collapseVal">
      <el-collapse-item name="flash">
        <template slot="title">Flash模板
          <el-button class="button" size="small" @click.native.stop="edit" v-show="!isEdit && collapseVal==='flash'">
            编辑
          </el-button>
          <el-button :disabled="!canEdit" class="button" size="small" @click.stop="flashSave"
                     v-show="isEdit && collapseVal==='flash'">保存
          </el-button>
        </template>
        <div class="can-edit" v-if="!canEdit"></div>
        <div class="flash1">
          <div class="ad-style" v-show="!isEdit">
            <video id="flashvideo" loop src="http://sltimg.adv.ott.cibntv.net/static/video/flash.mp4"></video>
          </div>
          <div class="ad-edit">
            <div class="upload-flash">
              <div class="flash-player1" v-if="conf_info.flash_src">
                <object id="swf" classid="clsid27CDB6E-AE6D-11cf-96B8-444553540000"
                        codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0"
                        align="center">
                  <param name="movie" value="<%= item.flash_path %>">
                  <param name="quality" value="high">
                  <param name="wmode" value="transparent">
                  <param name="Scale" value="showall">
                  <embed :src="conf_info.flash_src" name="swf" align="center"
                         quality="high"
                         pluginspage="http://www.macromedia.com/go/getflashplayer"
                         type="application/x-shockwave-flash" swliveconnect="true" play="true"></embed>
                </object>
              </div>
              <el-upload
                class="avatar-uploader"
                :action="upLoadFlash"
                :data="upLoadData"
                :headers="token"
                :show-file-list="false"
                :on-success="upLoadSuccess"
                :on-progress="upLoadProgress"
                :before-upload="beforeUpload">
                <!--<img v-if="flashUrl" :src="flashUrl" class="avatar">-->
                <i class="el-icon-plus avatar-uploader-icon">上传flash</i>
              </el-upload>
            </div>
            <div class="ad-con">
              <div class="ad-title"><span>* </span> Flash规范：格式fla、目标Flash Player17、脚本ActionScript3.0、大小200K</div>
              <div class="ad-option ad-size">
                <span>展示大小</span>
                <span @click="changeSize('150,150,f_size1', 1)"
                      :class="{'option-border':isSize===1}">150px * 150px</span>
                <span @click="changeSize('210,90,f_size2', 2)" :class="{'option-border':isSize===2}">210px * 90px</span>
              </div>
              <div class="ad-option ad-position">
                <span>广告位置</span>
                <span @click="changePosition('left', 1)" :class="{'option-border':isPosition===1}">屏幕居左</span>
                <span @click="changePosition('center', 2)" :class="{'option-border':isPosition===2}">屏幕居中</span>
                <span @click="changePosition('right', 3)" :class="{'option-border':isPosition===3}">屏幕居右</span>
              </div>
              <div class="ad-url">
                <el-input placeholder="请输入跳转链接（40字符）" v-model="conf_info.out_url" :maxlength="40">
                  <template slot="prepend">跳转链接</template>
                </el-input>
              </div>
              <div class="bg-url">
                <el-input placeholder="请输入曝光检测链接" v-model="bgUrl">
                  <template slot="prepend">曝光检测链接</template>
                </el-input>
              </div>
              <div class="click-url">
                <el-input placeholder="请输入点击检测链接" v-model="clickUrl">
                  <template slot="prepend">点击检测链接</template>
                </el-input>
              </div>
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script type="text/ecmascript-6">
  // cesh2
  export default {
    props: {
      collapseVal: '',
      adCon: {
        type: Object
      },
      canSave: {
        default: false
      },
      canEdit: {
        default: true
      }
    },
    data () {
      return {
        // video 对象
        video: '',
        // token
        token: {Authorization: sessionStorage.getItem('token')},
        // 上传接口地址
        upLoadFlash: this.$parent.upLoadUrl + '/upload/flash',
        // 图片服务器基础地址
        imgUrl: 'http://image.bjvca.com:5000',
        upLoadLoding: '',
        // 上传图片用的数据
        upLoadData: {
          mediachannel: null,
          act_id: null
        },
        // 是否为编辑状态
        isEdit: false,
        // 位置和大小选项样式
        isSize: 1,
        isPosition: 1,
        conf_info: {
          flash_src: '',
          size: '150,150,f_size1',
          position: 'left',
          out_url: ''
        },
        bgUrl: '',
        clickUrl: ''
      }
    },
    watch: {
      'collapseVal' (val) {
        if (val === 'flash') {
          this.video = document.getElementById('flashvideo')
          this.video.currentTime = 0
          this.video.play()
        } else {
          this.video = document.getElementById('flashvideo')
          let that = this
          setTimeout(function () {
            that.video.pause()
          }, 500)
        }
      },
      'adCon' (val) {
        // console.log(this.canEdit)
        if (val && val.adCon && this.collapseVal === 'flash') {
          this.isEdit = true
          if (this.adCon.adCon.position === 'left') this.isPosition = 1
          if (this.adCon.adCon.position === 'center') {
            this.isPosition = 2
            this.conf_info.position = 'center'
          }
          if (this.adCon.adCon.position === 'right') {
            this.isPosition = 3
            this.conf_info.position = 'right'
          }
          if (this.adCon.adCon.size === '150,150,f_size1') this.isSize = 1
          if (this.adCon.adCon.size === '210,90,f_size2') {
            this.isSize = 2
            this.conf_info.size = '210,90,f_size2'
          }
          this.conf_info.flash_src = this.adCon.adCon.flash_src
          this.conf_info.out_url = this.adCon.adCon.out_url
          // 曝光url和点击url
          this.bgUrl = this.adCon.bgUrl
          this.clickUrl = this.adCon.clickUrl
        } else {
          this.conf_info = {
            flash_src: '',
            size: '150,150,f_size1',
            position: 'left',
            out_url: ''
          }
          this.isSize = 1
          this.isPosition = 1
          // 曝光url和点击url
          this.bgUrl = ''
          this.clickUrl = ''
        }
      }
    },
    methods: {
      // 使总体保持手风琴效果
      collapseChange (val) {
        this.isEdit = false
        this.$emit('update:collapseVal', val)
      },
      // 编辑
      edit () {
        // 清数据
        this.conf_info = {
          flash_src: '',
          size: '150,150,f_size1',
          position: 'left',
          out_url: ''
        }
        this.isSize = 1
        this.isPosition = 1
        // 曝光url和点击url
        this.bgUrl = ''
        this.clickUrl = ''
        // 提示
        if (!this.canSave) {
          this.$message.warning('请先选择一个平台')
          return
        }
        this.isEdit = true
      },
      // 保存
      flashSave () {
        if (!this.canSave) {
          this.$message.warning('请选择一个平台')
          return
        }
        // 调父组件的save方法，并把数据传过去。
        this.$parent.save('flash', {
          conf_info: this.conf_info,
          bg_url: this.bgUrl,
          click_url: this.clickUrl
        })
      },
      // 选择大小
      changeSize (size, index) {
        this.conf_info.size = size
        this.isSize = index
      },
      // 选择位置
      changePosition (po, index) {
        this.conf_info.position = po
        this.isPosition = index
      },
      // 上传成功
      upLoadSuccess (res, file) {
        if (res.code === 200) {
          this.conf_info.flash_src = this.imgUrl + res.data
        }
      },
      // 上传前的钩子函数
      beforeUpload (file) {
        // 上传前获取上传图片所需要的参数！
        this.upLoadData.act_id = this.$store.state.materialData.act_id
        this.upLoadData.mediachannel = this.$store.state.materialData.mediachannel
        const isJPG = file.type === 'application/x-shockwave-flash'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('请确认文件格式。')
        }
        if (!isLt2M) {
          this.$message.error('上传的文件大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      },
      // 上传中钩子函数
      upLoadProgress () {
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .tpl-flash1 {
    .el-collapse-item__header {
      height: 60px;
      line-height: 60px;
      .button {
        float: right;
        margin: 15px 30px;
        border-radius: 15px;
        width: 60px;
      }
    }
    .el-collapse-item__content {
      position relative
    }
    .can-edit {
      position absolute
      z-index 100
      width: 100%
      height: 550px
    }
    .flash1 {
      width: 100%;
      height: 550px;
      padding: 80px;
      position: relative;
      background-image: url("../../../static/img/tplbg.png");
      background-position: center;
      background-size: cover;
      .ad-style {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        width: 100%;
        top: 0;
        z-index: 1;
        height: 100%;
        video {
          height: 100%;
        }
      }
      .ad-edit {
        width: 100%;
        height: 100%;
        .upload-flash {
          width: 350px;
          height: 350px;
          float: left;
          background: rgba(0, 0, 0, .8)
          color: #fff;
          line-height: 350px;
          text-align: center;
          cursor: pointer;
          overflow: hidden;
          position: relative
          &:hover .avatar-uploader {
            top: 0;
          }
          embed {
            height: 350px;
            width: 100%;
          }
          .avatar-uploader {
            height: 100%;
            width: 100%;
            position: absolute;
            left: 0;
            top: -350px;
            transition: all .5s;
            .el-upload {
              width: 100%;
              height: 100%;
              i {
                font-size: 16px;
              }
            }
          }
        }
        .ad-con {
          width: 468px;
          height: 100%;
          float: right;
          padding-left: 50px;
          .ad-title {
            font-size: 14px;
            margin-bottom: 15px;
            span {
              color: red;
              font-size: 16px;
              position relative;
              top: 5px;
            }
          }
          .ad-option {
            width: 401px;
            height: 40px;
            font-size: 0;
            border-right: 1px solid #e4e4e4;
            margin-bottom: 10px;
            .option-border {
              border-right: 1px solid;
              border-color: #169bd5
            }
            span {
              display: inline-block;
              width: 100px;
              height: 40px;
              border: 1px solid #e4e4e4;
              border-right: none;
              background: #fff;
              font-size: 12px;
              text-align: center;
              line-height: 40px;
              cursor: pointer;
            }
            span:first-of-type {
              cursor: default;
            }
          }
          .ad-size {
            width: 301px;
          }
          .ad-url, .bg-url, .click-url {
            margin-top: 15px;
            width: 400px;
            .el-input-group__prepend {
              width: 100px;
              text-align: center;
            }
          }
        }
      }
    }
  }
</style>
