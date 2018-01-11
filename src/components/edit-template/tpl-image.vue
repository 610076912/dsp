<template>
  <div class="tpl-img">
    <el-collapse accordion @change="collapseChange" :value="collapseVal">
      <el-collapse-item name="image">
        <template slot="title">动态图片模板
          <el-button class="button" size="small" @click.stop="edit" v-show="!isEdit && collapseVal==='image'">编辑
          </el-button>
          <el-button :disabled="!canEdit" class="button" size="small" @click.stop="flashSave" v-show="isEdit && collapseVal==='image'">保存
          </el-button>
        </template>
        <div class="can-edit" v-if="!canEdit"></div>
        <div class="img">
          <div class="ad-style" v-show="!isEdit"><video id="imgvideo" loop src="http://sltimg.adv.ott.cibntv.net/static/video/image.mp4" alt=""></video></div>
          <div class="ad-edit">
            <div class="upload-flash">
              <img v-if="conf_info.image_src" :src="conf_info.image_src" class="avatar">
              <el-upload
                class="avatar-uploader"
                :action="upLoadImg"
                :data="upLoadData"
                :headers="token"
                :show-file-list="false"
                :on-success="upLoadSuccess"
                :on-progress="upLoadProgress"
                :before-upload="beforeUpload">
                <i class="el-icon-plus avatar-uploader-icon">上传图片</i>
              </el-upload>
            </div>
            <div class="ad-con">
              <div class="ad-title"><span>* </span> 图片规范：格式PNG、JPG、GIF，大小2M以内、主体内容明显</div>
              <div class="ad-option ad-size">
                <span>图片大小</span>
                <span @click="changeSize('380,200,i_size1', 1)" :class="{'option-border':isSize===1}">380px * 200px</span>
                <span @click="changeSize('300,300,i_size2', 2)" :class="{'option-border':isSize===2}">300px * 300px</span>
                <span @click="changeSize('500,100,i_size3', 3)" :class="{'option-border':isSize===3}">500px * 100px</span>
              </div>
              <div class="ad-option ad-effect">
                <span>展示效果</span>
                <span @click="changeEffect('effect1', 1)" :class="{'option-border':isEffect===1}">从小到大</span>
                <span @click="changeEffect('effect2', 2)" :class="{'option-border':isEffect===2}">移动飘过</span>
                <span @click="changeEffect('effect3', 3)" :class="{'option-border':isEffect===3}">物体折线</span>
              </div>
              <div class="ad-option ad-position">
                <span>广告位置</span>
                <span @click="changePosition('left', 1)" :class="{'option-border':isPosition===1}">屏幕居左</span>
                <span @click="changePosition('center', 2)" :class="{'option-border':isPosition===2}">屏幕居中</span>
                <span @click="changePosition('right', 3)" :class="{'option-border':isPosition===3}">屏幕居右</span>
              </div>
              <div class="ad-url">
                <el-input v-model="conf_info.out_url" placeholder="请输跳转链接（40字符）" :maxlength="40">
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
        // 上传接口地址
        upLoadImg: this.$parent.upLoadUrl + '/upload/image',
        // 图片服务器基础地址
        imgUrl: 'http://image.bjvca.com:5000',
        // token
        token: {Authorization: sessionStorage.getItem('token')},
        // 上传图片用的数据
        upLoadLoding: '',
        upLoadData: {
          mediachannel: null,
          act_id: null
        },
        isEdit: false,
        // 位置和大小选项样式
        isSize: 1,
        isEffect: 1,
        isPosition: 1,
        conf_info: {
          image_src: '',
          size: '380,200,i_size1',
          position: 'left',
          effect: 'effect1',
          out_url: ''
        },
        bgUrl: '',
        clickUrl: ''
      }
    },
    watch: {
      'collapseVal' (val) {
        if (val === 'image') {
          this.video = document.getElementById('imgvideo')
          this.video.currentTime = 0
          this.video.play()
        } else {
          this.video = document.getElementById('imgvideo')
          let that = this
          setTimeout(function () {
            that.video.pause()
          }, 500)
        }
      },
      'adCon' (val) {
        if (this.collapseVal === 'image' && val) {
          // 不展示视频，直接展示内容
          this.isEdit = true
          // 位置
          if (this.adCon.adCon.position === 'left') this.isPosition = 1
          if (this.adCon.adCon.position === 'center') {
            this.isPosition = 2
            this.conf_info.position = 'center'
          }
          if (this.adCon.adCon.position === 'right') {
            this.isPosition = 3
            this.conf_info.position = 'right'
          }
          // 大小
          if (this.adCon.adCon.size === '380,200,i_size1') this.isSize = 1
          if (this.adCon.adCon.size === '300,300,i_size2') {
            this.isSize = 2
            this.conf_info.size = '300,300,i_size2'
          }
          if (this.adCon.adCon.size === '500,100,i_size3') {
            this.isSize = 3
            this.conf_info.size = '500,100,i_size3'
          }
          // 效果
          if (this.adCon.adCon.effect === 'effect1') this.isEffect = 1
          if (this.adCon.adCon.effect === 'effect2') {
            this.isEffect = 2
            this.conf_info.effect = 'effect2'
          }
          if (this.adCon.adCon.effect === 'effect3') {
            this.isEffect = 3
            this.conf_info.effect = 'effect3'
          }
          this.conf_info.image_src = this.adCon.adCon.image_src
          this.conf_info.out_url = this.adCon.adCon.out_url
          // 曝光url和点击url
          this.bgUrl = this.adCon.bgUrl
          this.clickUrl = this.adCon.clickUrl
        } else {
          this.conf_info = {
            image_src: '',
            size: '380,200,i_size1',
            position: 'left',
            effect: 'effect1',
            out_url: ''
          }
          this.isSize = 1
          this.isPosition = 1
          this.isEffect = 1
          // 曝光url和点击url
          this.bgUrl = ''
          this.clickUrl = ''
        }
      }
    },
    methods: {
      collapseChange (val) {
        this.isEdit = false
        this.$emit('update:collapseVal', val)
      },
      // 编辑
      edit () {
        // 清数据！
        this.conf_info = {
          image_src: '',
          size: '380,200,i_size1',
          position: 'left',
          effect: 'effect1',
          out_url: ''
        }
        this.isSize = 1
        this.isPosition = 1
        this.isEffect = 1
        // 曝光url和点击url
        this.bgUrl = ''
        this.clickUrl = ''
        // 验证是否选中了媒体平台，否则提示。
        if (!this.canSave) {
          this.$message.warning('请先选择一个平台')
          return
        }
        this.isEdit = true
      },
      // 保存
      flashSave () {
        if (!this.canSave) {
          this.$message.error('请选择一个平台')
          return
        }
        // 调父组件的save方法，并把数据传过去。
        this.$parent.save('image', {
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
      // 选择效果
      changeEffect (effect, index) {
        this.conf_info.effect = effect
        this.isEffect = index
      },
      // 上传成功
      upLoadSuccess (res) {
        if (res.code === 200) {
          this.upLoadLoding.close()
          this.conf_info.image_src = this.imgUrl + res.data
        }
      },
      // 上传前的钩子函数
      beforeUpload (file) {
        // 上传前获取上传图片所需要的参数！
        this.upLoadData.act_id = this.$store.state.materialData.act_id
        this.upLoadData.mediachannel = this.$store.state.materialData.mediachannel
        const isPNG = file.type === 'image/png'
        const isJPG = file.type === 'image/jpeg'
        const isGIF = file.type === 'image/gif'
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isJPG && !isGIF && !isPNG) {
          this.$message.error('请确认文件格式。')
        } else if (!isLt2M) {
          this.$message.error('上传的文件大小不能超过 2MB!')
        }
        return (isGIF || isJPG || isPNG) && isLt2M
      },
      // 上传中钩子函数
      upLoadProgress () {
        this.upLoadLoding = this.$loading({
          target: '.upload-flash',
          text: '上传中。。。。'
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .tpl-img {
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
    .img {
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
        img {
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
          font-size: 20px;
          line-height: 350px;
          text-align: center;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
          &:hover .avatar-uploader {
            top: 0;
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
