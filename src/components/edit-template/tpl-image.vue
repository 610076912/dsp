<template>
  <div class="tpl-img">
    <el-collapse accordion @change="collapseChange" :value="collapseVal">
      <el-collapse-item name="image" disabled>
        <template slot="title">动态图片模板
          <el-button class="button" size="small" @click.stop="edit" v-show="!isEdit && collapseVal==='image'" :disabled="editRule.tpl_type.indexOf('image') < 0">编辑
          </el-button>
          <el-button :disabled="!canEdit" class="button" size="small" @click.stop="flashSave" v-show="isEdit && collapseVal==='image'">保存
          </el-button>
        </template>
        <div class="can-edit" v-if="!canEdit"></div>
        <div class="img">
          <div class="ad-style" v-show="!isEdit"><video id="imgvideo" loop src="http://sltimg.adv.ott.cibntv.net/img/video/image.mp4" alt=""></video></div>
          <div class="ad-edit">
            <div class="upload-flash">
              <img v-show="conf_info.image_src" :src="conf_info.image_src" class="avatar" id="loadImg">
              <el-upload
                class="avatar-uploader"
                ref="upload"
                :action="upLoadImg"
                :data="upLoadData"
                :headers="token"
                :show-file-list="false"
                :auto-upload="false"
                :on-change="upLoadChange"
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
                <span @click="changeSize('380,200,i_size1', 1)" :class="{'option-border':isSize===1, 'not-allowed': !imgChoice('380,200,i_size1')}">380px * 200px</span>
                <span @click="changeSize('300,300,i_size2', 2)" :class="{'option-border':isSize===2, 'not-allowed': !imgChoice('300,300,i_size2')}">300px * 300px</span>
                <span @click="changeSize('500,100,i_size3', 3)" :class="{'option-border':isSize===3, 'not-allowed': !imgChoice('500,100,i_size3')}">500px * 100px</span>
                <span @click="changeSize('400,400,i_size4', 4)" :class="{'option-border':isSize===4, 'not-allowed': !imgChoice('400,400,i_size4')}">400px * 400px</span>
                <span @click="changeSize('600,200,i_size5', 5)" :class="{'option-border':isSize===5, 'not-allowed': !imgChoice('600,200,i_size5')}">600px * 200px</span>
              </div>
              <div class="ad-option ad-effect">
                <span>展示效果</span>
                <span @click="changeEffect('effect1', 1)" :class="{'option-border':isEffect===1, 'not-allowed': !effectChoice('effect1')}">从小到大</span>
                <span @click="changeEffect('effect2', 2)" :class="{'option-border':isEffect===2, 'not-allowed': !effectChoice('effect2')}">移动飘过</span>
                <span @click="changeEffect('effect3', 3)" :class="{'option-border':isEffect===3, 'not-allowed': !effectChoice('effect3')}">物体折线</span>
                <span @click="changeEffect('effect4', 4)" :class="{'option-border':isEffect===4, 'not-allowed': !effectChoice('effect4')}">从上到下</span>
                <span @click="changeEffect('effect5', 5)" :class="{'option-border':isEffect===5, 'not-allowed': !effectChoice('effect5')}">从下到上</span>
              </div>
              <div class="ad-option">
                <span>广告位置</span>
                <span @click="changePosition('left', 1)" :class="{'option-border':isPosition===1, 'not-allowed': !positionChioce('left')}">屏幕居左</span>
                <span @click="changePosition('center', 2)" :class="{'option-border':isPosition===2, 'not-allowed': !positionChioce('center')}">屏幕居中</span>
                <span @click="changePosition('right', 3)" :class="{'option-border':isPosition===3, 'not-allowed': !positionChioce('right')}">屏幕居右</span>
              </div>
              <div class="ad-url">
                <el-input v-model="conf_info.out_url" placeholder="请输跳转链接" :disabled="!editRule.out_url">
                  <template slot="prepend">跳转链接</template>
                </el-input>
              </div>
            </div>
            <div class="links">
              <div class="links-top">
                <span class="title">监测代码列表</span>
                <el-button size="small" @click="addLinks">添加</el-button>
              </div>
              <div class="links-list">
                <div class="bg-url">
                  <el-input placeholder="请输入曝光检测链接" v-model="bgUrl" :disabled="!editRule.bg_url">
                    <template slot="prepend">曝光</template>
                  </el-input>
                </div>
                <div class="click-url">
                  <el-input placeholder="请输入点击检测链接" v-model="clickUrl" :disabled="!editRule.click_url">
                    <template slot="prepend">点击</template>
                  </el-input>
                </div>
                <div class="desc">
                  <el-input placeholder="请输入备注" v-model="bg_url_desc" :disabled="!editRule.bg_url">
                    <template slot="prepend">备注</template>
                  </el-input>
                </div>
              </div>
              <div class="links-list" v-show="show_link1">
                <div class="bg-url">
                  <el-input placeholder="请输入曝光检测链接" v-model="bg1_url" :disabled="!editRule.bg_url">
                    <template slot="prepend">曝光</template>
                  </el-input>
                </div>
                <div class="click-url">
                  <el-input placeholder="请输入点击检测链接" v-model="click1_url" :disabled="!editRule.click_url">
                    <template slot="prepend">点击</template>
                  </el-input>
                </div>
                <div class="desc">
                  <el-input placeholder="请输入备注" v-model="bg1_url_desc" :disabled="!editRule.bg_url">
                    <template slot="prepend">备注</template>
                  </el-input>
                </div>
              </div>
              <div class="links-list" v-show="show_link2">
                <div class="bg-url">
                  <el-input placeholder="请输入曝光检测链接" v-model="bg2_url" :disabled="!editRule.bg_url">
                    <template slot="prepend">曝光</template>
                  </el-input>
                </div>
                <div class="click-url">
                  <el-input placeholder="请输入点击检测链接" v-model="click2_url" :disabled="!editRule.click_url">
                    <template slot="prepend">点击</template>
                  </el-input>
                </div>
                <div class="desc">
                  <el-input placeholder="请输入备注" v-model="bg2_url_desc" :disabled="!editRule.bg_url">
                    <template slot="prepend">备注</template>
                  </el-input>
                </div>
              </div>
              <div class="links-list" v-show="show_link3">
                <div class="bg-url">
                  <el-input placeholder="请输入曝光检测链接" v-model="bg3_url" :disabled="!editRule.bg_url">
                    <template slot="prepend">曝光</template>
                  </el-input>
                </div>
                <div class="click-url">
                  <el-input placeholder="请输入点击检测链接" v-model="click3_url" :disabled="!editRule.click_url">
                    <template slot="prepend">点击</template>
                  </el-input>
                </div>
                <div class="desc">
                  <el-input placeholder="请输入备注" v-model="bg3_url_desc" :disabled="!editRule.bg_url">
                    <template slot="prepend">备注</template>
                  </el-input>
                </div>
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
    },
    editRule: {
      default: function () {
        return {
          planName: '',
          tpl_type: [],
          img_type: [],
          size: [],
          position: [],
          effect: [],
          out_url: false,
          bg_url: false,
          click_url: false
        }
      }
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
      token: { Authorization: sessionStorage.getItem('token') },
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
      clickUrl: '',
      bg_url_desc: '',
      click1_url: '',
      bg1_url: '',
      bg1_url_desc: '',
      click2_url: '',
      bg2_url: '',
      bg2_url_desc: '',
      click3_url: '',
      bg3_url: '',
      bg3_url_desc: '',
      naturalWidth: 0,
      naturalHeight: 0,
      show_link1: false,
      show_link2: false,
      show_link3: false
    }
  },
  computed: {
    // 是否可选图片
    imgChoice (val) {
      return function (val) {
        return (this.editRule.size.indexOf(val) >= 0) || false
      }
    },
    // 是否可选动效
    effectChoice (val) {
      return function (val) {
        return (this.editRule.effect.indexOf(val) >= 0) || false
      }
    },
    // 是否可选当前广告位置
    positionChioce (val) {
      return function (val) {
        return (this.editRule.position.indexOf(val) >= 0) || false
      }
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
      console.log(val)
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
        if (this.adCon.adCon.size === '400,400,i_size4') {
          this.isSize = 4
          this.conf_info.size = '400,400,i_size4'
        }
        if (this.adCon.adCon.size === '600,200,i_size5') {
          this.isSize = 5
          this.conf_info.size = '600,200,i_size5'
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
        if (this.adCon.adCon.effect === 'effect4') {
          this.isEffect = 4
          this.conf_info.effect = 'effect4'
        }
        if (this.adCon.adCon.effect === 'effect5') {
          this.isEffect = 5
          this.conf_info.effect = 'effect5'
        }
        this.conf_info.image_src = this.adCon.adCon.image_src
        this.conf_info.out_url = this.adCon.adCon.out_url
        // 曝光url和点击url
        this.bgUrl = this.adCon.bgUrl
        this.clickUrl = this.adCon.clickUrl
        this.bg_url_desc = this.adCon.bg_url_desc
        this.click1_url = this.adCon.click1_url
        this.bg1_url = this.adCon.bg1_url
        this.bg1_url_desc = this.adCon.bg1_url_desc
        this.click2_url = this.adCon.click2_url
        this.bg2_url = this.adCon.bg2_url
        this.bg2_url_desc = this.adCon.bg2_url_desc
        this.click3_url = this.adCon.click3_url
        this.bg3_url = this.adCon.bg3_url
        this.bg3_url_desc = this.adCon.bg3_url_desc

        this.show_link1 = this.click1_url || this.bg1_url
        this.show_link2 = this.click2_url || this.bg2_url
        this.show_link3 = this.click3_url || this.bg3_url
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
        this.bg_url_desc = ''
        this.click1_url = ''
        this.bg1_url = ''
        this.bg1_url_desc = ''
        this.click2_url = ''
        this.bg2_url = ''
        this.bg2_url_desc = ''
        this.click3_url = ''
        this.bg3_url = ''
        this.bg3_url_desc = ''
      }
    },
    'editRule' (val) {
      console.log('下面是编辑规则：')
      console.log(val)
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
      this.bg_url_desc = ''
      this.click1_url = ''
      this.bg1_url = ''
      this.bg1_url_desc = ''
      this.click2_url = ''
      this.bg2_url = ''
      this.bg2_url_desc = ''
      this.click3_url = ''
      this.bg3_url = ''
      this.bg3_url_desc = ''
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
      // 验证图片尺寸
      const ELoadImg = document.getElementById('loadImg')
      const needSize = this.conf_info.size.split(',')
      if (ELoadImg.naturalWidth !== needSize[0] * 1 || ELoadImg.naturalHeight !== needSize[1] * 1) {
        this.$message.error('图片尺寸与已选尺寸不符!')
        return false
      }
      // 验证跳转链接
      if (!this.conf_info.out_url && this.editRule.out_url) {
        this.$message.error('请输入跳转链接')
        return false
      }
      if (!/^(https|http){1}:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i.test(this.conf_info.out_url) && this.editRule.out_url) {
        this.$message.error('跳转链接url地址不合法')
        return false
      }

      // 调父组件的save方法，并把数据传过去。
      this.$parent.save('image', {
        conf_info: this.conf_info,
        bg_url: this.bgUrl,
        click_url: this.clickUrl,
        bg_url_desc: this.bg_url_desc,
        click1_url: this.click1_url,
        bg1_url: this.bg1_url,
        bg1_url_desc: this.bg1_url_desc,
        click2_url: this.click2_url,
        bg2_url: this.bg2_url,
        bg2_url_desc: this.bg2_url_desc,
        click3_url: this.click3_url,
        bg3_url: this.bg3_url,
        bg3_url_desc: this.bg3_url_desc
      })
    },
    // 选择大小
    changeSize (size, index) {
      if (this.editRule.size.indexOf(size) >= 0) {
        this.conf_info.size = size
        this.isSize = index
      }
    },
    // 选择位置
    changePosition (po, index) {
      if (this.editRule.position.indexOf(po) >= 0) {
        this.conf_info.position = po
        this.isPosition = index
      }
    },
    // 选择效果
    changeEffect (effect, index) {
      if (this.editRule.effect.indexOf(effect) >= 0) {
        this.conf_info.effect = effect
        this.isEffect = index
      }
    },
    // 上传成功
    upLoadSuccess (res) {
      if (res.code === 200) {
        this.upLoadLoding.close()
        this.conf_info.image_src = this.imgUrl + res.data
      }
    },
    /**
     * 选择文件事件
     * 验证图片类型、大小、尺寸
     * file
     * 当图片上传成功后，会同时触发该方法，为防止成功后再次触发，通过file下是否有response对象来判断是否为上传前触发的
     */
    async upLoadChange (file) {
      if (!file.response) {
        const getNaturalSize = files => new Promise((resolve, reject) => {
          const fileReader = new FileReader()
          const locImg = new Image()
          fileReader.onload = evt => {
            locImg.src = evt.target.result
          }
          locImg.onload = () => {
            resolve({ 'naturalWidth': locImg.naturalWidth, 'naturalHeight': locImg.naturalHeight, 'imgSrc': locImg.src })
          }
          fileReader.readAsDataURL(files)
        })
        const naturalSize = await getNaturalSize(file.raw)  // 获取图片原始尺寸

        // 验证图片尺寸
        const needSize = this.conf_info.size.split(',')
        const isCorrectSize = (naturalSize.naturalWidth === needSize[0] * 1 && naturalSize.naturalHeight === needSize[1] * 1)
        if (!isCorrectSize) {
          this.$message.error('图片尺寸不是' + needSize[0] * 1 + 'px*' + needSize[1] * 1 + 'px，请重新上传')
        }

        // 验证图片大小
        const isLt2M = file.raw.size / 1024 / 1024 < 2
        if (!isLt2M) {
          this.$message.error('上传的文件大小不能超过 2MB!')
        }
        const type = this.editRule.img_type.join('|')
        // 验证图片类型
        const isType = new RegExp(`^[image/]+(${type})$`).test(file.raw.type)
        // const isType = (/^[image/]+(jpeg|png|gif)$/).test(file.raw.type)
        if (!isType) {
          this.$message.error('请确认文件格式!')
        }
        if (!isCorrectSize || !isLt2M || !isType) {
          this.$refs.upload.clearFiles()  // 清空文件列表
          return false
        }
        // 提交上传
        this.$refs.upload.submit()
      }
    },
    // 上传前的钩子函数
    beforeUpload (file) {
      // 上传前获取上传图片所需要的参数！
      this.upLoadData.act_id = this.$store.state.materialData.act_id
      this.upLoadData.mediachannel = this.$store.state.materialData.mediachannel
      this.conf_info.image_src = ''
    },
    // 上传中钩子函数
    upLoadProgress () {
      this.upLoadLoding = this.$loading({
        target: '.upload-flash',
        text: '上传中。。。。'
      })
    },
    addLinks () {
      !this.show_link1 ? this.show_link1 = true : !this.show_link2 ? this.show_link2 = true : this.show_link3 = true
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
    position: relative;
  }

  .can-edit {
    position: absolute;
    z-index: 100;
    width: 100%;
    height: 550px;
  }

  .img {
    width: 100%;
    height: 550px;
    padding: 26px 40px;
    position: relative;
    background-image: url('../../../static/img/tplbg.png');
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
        /*margin-top: 42px;*/
        width: 260px;
        height: 260px;
        float: left;
        background: rgba(0, 0, 0, 0.8);
        color: #fff;
        font-size: 20px;
        line-height: 260px;
        text-align: center;
        cursor: pointer;
        position: relative;
        overflow: hidden;

        img {
          max-width: 100%;
          max-height: 100%;
        }

        &:hover .avatar-uploader {
          top: 0;
        }

        .avatar-uploader {
          height: 100%;
          width: 100%;
          position: absolute;
          left: 0;
          top: -260px;
          transition: all 0.5s;

          .el-upload {
            width: 100%;
            height: 100%;

            i {
              font-size: 16px;
            }
          }
        }

        .upload-error {
          width: 100%;
          height: 30px;
          line-height: 30px;
          color: #F56C6C;
          background: rgba(0, 0, 0, 0.5);
          position: absolute;
          bottom: 0;
          left: 0;
        }

        .el-loading-spinner {
          top: 20px;
          margin: 0;
        }
      }

      .ad-con {
        width: 600px;
        height: 260px;
        float: right;
        overflow: hidden;

        .ad-title {
          font-size: 14px;
          margin-bottom: 15px;
          line-height: 58px;

          span {
            color: red;
            font-size: 16px;
            position: relative;
            top: 5px;
          }
        }

        .ad-option {
          display: flex;
          height: 40px;
          font-size: 0;
          margin-bottom: 10px;

          .not-allowed {
            cursor: not-allowed;
          }

          .option-border {
            border-right: 1px solid;
            border-color: #169bd5;
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

        .ad-url {
          margin-bottom: 15px;
          width: 600px;

          .el-input-group__prepend {
            width: 100px;
            text-align: center;
          }
        }
      }
      .links{
        width: 100%;
        float: left;
        margin: 15px 0;

        .links-top .title{
          font-size 18px;
          font-weight bold;
          line-height 40px;
        }
        .links-top .el-button{
          float right;
          margin: 6px 0;
        }
        .links-list{
          height: 50px;
          .bg-url, .click-url{
            width: 334px;
            margin-right: 15px;
            float: left;
          }
          .desc{
            width: 200px;
            float: left;
          }
        }
      }
    }
  }
}
</style>
