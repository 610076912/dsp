<template>
  <div class="tpl-relation">
    <el-collapse accordion @change="collapseChange" :value="collapseVal">
      <el-collapse-item name="relation2">
        <template slot="title">屏占比4:1 / 适用于电商、票务等信息
          <el-button class="button" size="small" @click.stop="edit" v-show="!isEdit && collapseVal==='relation2'">编辑
          </el-button>
          <el-button :disabled="!canEdit" class="button" size="small" @click.stop="flashSave" v-show="isEdit && collapseVal==='relation2'">
            保存
          </el-button>
        </template>
        <div class="can-edit" v-if="!canEdit"></div>
        <div class="relation">
          <div class="ad-style" v-show="!isEdit">
            <video id="rel2video" loop src="http://sltimg.adv.ott.cibntv.net/static/video/relation2.mp4" alt=""></video>
          </div>
          <div class="ad-edit">
            <div class="url-wrap">
              <el-input placeholder="请输入曝光检测链接" v-model="bgUrl" size="small">
                <template slot="prepend">曝光检测链接</template>
              </el-input>
              <el-input placeholder="请输入点击检测链接" v-model="clickUrl" size="small">
                <template slot="prepend">点击检测链接</template>
              </el-input>
            </div>
            <!-- 提示模版 -->
            <div class="tpl-tips">
              <div class="tips-select">
                <template>
                  <el-select class="select-self" @change="selectChange" v-model="value" size="small" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </div>
              <div v-if="value === 'prompt1'">
                <div class="images">
                  <el-upload
                    class="avatar-uploader"
                    ref="uploadPrompt1"
                    :action="upLoadImg"
                    :data="upLoadData"
                    :headers="token"
                    :show-file-list="false"
                    :auto-upload="false"
                    :on-change="prompt1UpLoadChange"
                    :on-success="tipsImgSuccess"
                    :before-upload="beforeAvatarUpload">
                    <div class="imagesbj"
                         :style="{backgroundImage: 'url('+conf_info.prompt_info.content[0].info_con+')', backgroundSize: 'contain'}">
                      <p v-if="!conf_info.prompt_info.content[0].info_con">300px*300px 上传图片</p>
                    </div>
                  </el-upload>
                </div>
              </div>
              <div class="selectOption" v-else-if="value === 'prompt2'">
                <el-upload
                  class="circular"
                  ref="uploadPrompt2"
                  :action="upLoadImg"
                  :data="upLoadData"
                  :headers="token"
                  :show-file-list="false"
                  :auto-upload="false"
                  :on-change="prompt2UpLoadChange"
                  :on-success="tipsImgTextSuccess"
                  :before-upload="beforeAvatarUpload">
                  <div class="avatar"
                       :style="{backgroundImage: 'url('+conf_info.prompt_info.content[0].info_con+')', backgroundSize: 'cover'}">
                    <p v-if="!conf_info.prompt_info.content[0].info_con">150px*150px</p>
                  </div>
                </el-upload>
                <div class="info">
                  <el-input size="small" v-model="promptText" placeholder="请输入内容（8个字）" :maxlength="8"></el-input>
                </div>
              </div>
            </div>

            <!-- 右边展示模版 -->
            <div class="tpl-con">
              <div class="pic"
                   :style="{backgroundImage: 'url('+conf_info.relation_info.content[0].info_con+')', backgroundSize: 'cover'}">
                <el-upload
                  class="avatar-uploader circular"
                  ref="uploadTplImg"
                  :action="upLoadImg"
                  :data="upLoadData"
                  :headers="token"
                  :show-file-list="false"
                  :auto-upload="false"
                  :on-change="tplImgUpLoadChange"
                  :on-success="tplImgSuccess"
                  :before-upload="beforeAvatarUpload">
                  <p v-if="!conf_info.relation_info.content[0].info_con">480px*540px 上传图片</p>
                </el-upload>
              </div>
              <el-input
                class="title"
                resize="none"
                type="textarea"
                :max="2"
                :maxlength="30"
                placeholder="请输入内容（30个字）"
                v-model="conf_info.relation_info.content[1].info_con">
              </el-input>
              <div class="priceRow">
                <span>价格：￥</span>
                <el-input class="price" type="number" size="small" v-model="conf_info.relation_info.content[2].info_con"
                          placeholder="请输入内容（10个字符）" :maxlength="10"></el-input>
              </div>
              <div class="stockRow">
                <span>库存：</span>
                <el-input class="num" type="number" size="small" v-model="conf_info.relation_info.content[3].info_con"
                          placeholder="请输入内容（10个字符）" :maxlength="10"></el-input>
              </div>
              <div class="tpl-bottom">
                <span>扫码加入购物车</span>
                <div class="QRcode"
                     :style="{backgroundImage: 'url('+conf_info.relation_info.content[4].info_con+')', backgroundSize: 'cover'}">
                  <el-upload
                    class="avatar-uploader"
                    ref="uploadQRcodeImg"
                    :action="upLoadImg"
                    :data="upLoadData"
                    :headers="token"
                    :show-file-list="false"
                    :auto-upload="false"
                    :on-change="QRcodeImgUpLoadChange"
                    :on-success="QRcodeImgSuccess"
                    :before-upload="beforeAvatarUpload">
                    <p v-if="!conf_info.relation_info.content[4].info_con">150px*150px</p>
                  </el-upload>
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
      }
    },
    data () {
      return {
        // video 对象
        video: '',
        // 上传接口地址
        upLoadImg: this.$parent.upLoadUrl + '/upload/image',
        imgUrl: 'http://image.bjvca.com:5000',                    // 图片服务器路径
        token: {Authorization: sessionStorage.getItem('token')},  // 上传图片用的数据
        upLoadData: {
          mediachannel: null,
          act_id: null
        },
        imageUrl: '',
        isEdit: false,
        btnIsShow: true,
        options: [{
          value: 'prompt1',
          label: '图片提示信息'
        }, {
          value: 'prompt2',
          label: '图文提示信息'
        }],
        value: 'prompt1',      // 提示选中项
        promptText: '', // 提示文本
        promptNaturalWidth: 0,
        promptNaturalHeight: 0,
        price: '',      // 价格
        stock: '',      // 库存
        textarea: '',   // 文本域
        conf_info: {
          prompt_info: {  // 提示信息
            type: 'prompt1',   // prompt1
            effect: 'effect1',  // 展示效果 图片：effect1，图文：effect2
            content: [{
              info_con: '',
              info_exp: '提示图片'
            }]
          },
          relation_info: {
            type: 'relation2',   // relation1
            content: [
              {
                info_con: '',
                info_exp: '主图片'
              },
              {
                info_con: '',
                info_exp: '文本域'
              },
              {
                info_con: '',
                info_exp: '价格'
              },
              {
                info_con: '',
                info_exp: '库存'
              },
              {
                info_con: '',
                info_exp: '二维码'
              }]
          }
        },
        bgUrl: '',
        clickUrl: ''
      }
    },
    watch: {
      'collapseVal' (val) {
        if (val === 'relation2') {
          this.video = document.getElementById('rel2video')
          this.video.currentTime = 0
          this.video.play()
        } else {
          this.video = document.getElementById('rel2video')
          let that = this
          setTimeout(function () {
            that.video.pause()
          }, 500)
        }
      },
      'adCon' (val) {
        if (val && val.adCon.relation_info.type === 'relation2') {
          // 不展示视频，直接展示内容
          this.isEdit = true
          this.conf_info = val.adCon
          // 曝光url和点击url
          this.bgUrl = this.adCon.bgUrl
          this.clickUrl = this.adCon.clickUrl
        } else {
          this.conf_info = {
            prompt_info: {  // 提示信息
              type: 'prompt1',   // prompt1
              effect: 'effect1',  // 展示效果 图片：effect1，图文：effect2
              content: [{
                info_con: '',
                info_exp: '提示图片'
              }]
            },
            relation_info: {
              type: 'relation2',   // relation1
              content: [
                {
                  info_con: '',
                  info_exp: '主图片'
                },
                {
                  info_con: '',
                  info_exp: '文本域'
                },
                {
                  info_con: '',
                  info_exp: '价格'
                },
                {
                  info_con: '',
                  info_exp: '库存'
                },
                {
                  info_con: '',
                  info_exp: '二维码'
                }]
            }
          }
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
        // 清数据
        this.conf_info = {
          prompt_info: {  // 提示信息
            type: 'prompt1',   // prompt1
            effect: 'effect1',  // 展示效果 图片：effect1，图文：effect2
            content: [{
              info_con: '',
              info_exp: '提示图片'
            }]
          },
          relation_info: {
            type: 'relation2',   // relation1
            content: [
              {
                info_con: '',
                info_exp: '主图片'
              },
              {
                info_con: '',
                info_exp: '文本域'
              },
              {
                info_con: '',
                info_exp: '价格'
              },
              {
                info_con: '',
                info_exp: '库存'
              },
              {
                info_con: '',
                info_exp: '二维码'
              }]
          }
        }
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
        if (this.value === 'prompt1') {
          this.conf_info.prompt_info = {  // 提示信息
            type: 'prompt1',
            effect: 'effect1',
            content: [{
              info_con: this.conf_info.prompt_info.content[0].info_con,
              info_exp: '提示图片'
            }]
          }
        } else if (this.value === 'prompt2') {
          this.conf_info.prompt_info = {  // 提示信息
            type: 'prompt2',
            effect: 'effect2',
            content: [
              {
                info_con: this.conf_info.prompt_info.content[0].info_con,
                info_exp: '提示图片'
              },
              {
                info_con: this.promptText,
                info_exp: '提示文字'
              }
            ]
          }
        }
        // 调父组件的save方法，并把数据传过去。
        this.$parent.save('relation', {
          conf_info: this.conf_info,
          bg_url: this.bgUrl,
          click_url: this.clickUrl
        })
      },
      // 提示信息选择器选择事件
      selectChange (val) {
        // 切换提示信息时清楚图片
        this.conf_info.prompt_info.content[0].info_con = ''
      },
      // 加载本地图片获取尺寸
      async loadLocImg (file, callback) {
        const getNaturalSize = files => new Promise((resolve, reject) => {
          const fileReader = new FileReader()
          const locImg = new Image()
          fileReader.onload = evt => {
            locImg.src = evt.target.result
          }
          locImg.onload = () => {
            resolve({'naturalWidth': locImg.naturalWidth, 'naturalHeight': locImg.naturalHeight, 'imgSrc': locImg.src})
          }
          fileReader.readAsDataURL(files)
        })
        const naturalSize = await getNaturalSize(file)  // 获取图片原始尺寸
        callback(naturalSize)
      },
      // 提示信息1选择文件事件
      prompt1UpLoadChange (file) {
        if (!file.response) {
          this.loadLocImg(file.raw, naturalSize => {
            // 验证图片尺寸
            if (naturalSize.naturalWidth !== 300 && naturalSize.naturalHeight !== 300) {
              this.$message.error('图片尺寸不是300px*300px，请重新上传')
              this.$refs.uploadPrompt1.clearFiles()  // 清空文件列表
              return false
            }
            // 提交上传
            this.$refs.uploadPrompt1.submit()
          })
        }
      },
      // 提示图片
      tipsImgSuccess (res, file) {
        // this.promptImgUrl = this.imgUrl + res.data
        this.conf_info.prompt_info.content[0].info_con = this.imgUrl + res.data
        // console.log(this.conf_info.prompt_info)
      },
      // 提示信息2选择文件事件
      prompt2UpLoadChange (file) {
        if (!file.response) {
          this.loadLocImg(file.raw, naturalSize => {
            // 验证图片尺寸
            if (naturalSize.naturalWidth !== 150 && naturalSize.naturalHeight !== 150) {
              this.$message.error('图片尺寸不是150px*150px，请重新上传')
              this.$refs.uploadPrompt2.clearFiles()  // 清空文件列表
              return false
            }
            // 提交上传
            this.$refs.uploadPrompt2.submit()
          })
        }
      },
      // 提示图文图片上传成功
      tipsImgTextSuccess (res, file) {
        // this.promptImgTextUrl = this.imgUrl + res.data
        this.conf_info.prompt_info.content[0].info_con = this.imgUrl + res.data
        // console.log(this.conf_info.prompt_info)
      },
      // 模板右侧图片选择
      tplImgUpLoadChange (file) {
        if (!file.response) {
          this.loadLocImg(file.raw, naturalSize => {
            // 验证图片尺寸
            if (naturalSize.naturalWidth !== 480 && naturalSize.naturalHeight !== 540) {
              this.$message.error('图片尺寸不是540px*480px，请重新上传')
              this.$refs.uploadTplImg.clearFiles()  // 清空文件列表
              return false
            }
            // 提交上传
            this.$refs.uploadTplImg.submit()
          })
        }
      },
      // 模板右侧图片上传成功
      tplImgSuccess (res, file) {
        // this.tplImgUrl = this.imgUrl + res.data
        this.conf_info.relation_info.content[0].info_con = this.imgUrl + res.data
        // console.log(this.conf_info.relation_info)
      },
      // 二维码图片选择
      QRcodeImgUpLoadChange (file) {
        if (!file.response) {
          this.loadLocImg(file.raw, naturalSize => {
            // 验证图片尺寸
            if (naturalSize.naturalWidth !== 150 && naturalSize.naturalHeight !== 150) {
              this.$message.error('图片尺寸不是150px*150px，请重新上传')
              this.$refs.uploadQRcodeImg.clearFiles()  // 清空文件列表
              return false
            }
            // 提交上传
            this.$refs.uploadQRcodeImg.submit()
          })
        }
      },
      // 二维码图片上传成功
      QRcodeImgSuccess (res, file) {
        // this.QRcodeImgUrl = this.imgUrl + res.data
        this.conf_info.relation_info.content[4].info_con = this.imgUrl + res.data
        // console.log(this.conf_info.relation_info)
      },
      // 图片上传前钩子
      beforeAvatarUpload (file) {
        // 上传前获取上传图片所需要的参数！
        this.upLoadData.act_id = this.$store.state.materialData.act_id
        this.upLoadData.mediachannel = this.$store.state.materialData.mediachannel
        const isType = (/^[image/]+(jpg|jpeg|png|gif)$/).test(file.type)
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isType) {
          this.$message.error('请确认文件格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isType && isLt2M
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .tpl-relation {
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
    .avatar-uploader {
      height 100%
      width: 100%
      overflow hidden
      div {
        height 100%
        width: 100%
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
    .relation {
      width: 100%;
      height: 555px;
      position: relative;

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
        background-image: url("../../../static/img/tplbg.png");
        background-size: cover;
        background-repeat: no-repeat;
        background-position center;
        .url-wrap{
          width: 300px;
          position: absolute;
          left: 20px;
          bottom: 220px;
          .el-input{
            margin-top: 3px;
          }
        }
        .tpl-tips {
          position: absolute;
          left: 20px;
          bottom: 20px;
          width: 300px;
          height: 195px;
          background: #f0f0f0;
          border-radius: 3px;
          overflow: hidden;

          .select-self {
            width: 100%;
          }

          .selectOption {
            margin: 40px auto 0;
            height: 90px;
            width: 230px;
            position: relative;
          }

          .imagesbj {
            margin: 30px auto 0;
            height: 90px;
            width: 210px;
            background-color #ccc
            background-repeat no-repeat
            background-position center
            border: 2px solid #f2f2f2;
            line-height: 90px;
          }

          .circular {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background-color: #fff;
            position: absolute;
            z-index: 1;
            text-align: center;
            line-height: 20px;
            cursor: pointer;
            overflow: hidden;
            .avatar {
              line-height: 80px;
            }
            div, img {
              height: 100%;
              width: 100%;
              background-position: center;
              background-repeat: no-repeat;
            }
          }

          .info {
            width: 160px;
            position: absolute;
            left: 70px;
            top: 23px;
            height: 30px;
          }
        }

        .tpl-con {
          width: 25%;
          height: 100%;
          float: right;
          color: #fff;
          padding: 10px;
          background: rgba(0, 0, 0, 0.4);

          .pic {
            width: 100%;
            height: 280px;
            background: #fff;
            color: #2e2e2e;
            text-align: center;
            line-height: 280px;
            cursor: pointer;
          }

          .title {
            width: 100%;
            margin-top: 10px;
            line-height: 30px;
            color: #fff;
            background: rgba(225, 225, 225, 0.3);
          }

          .priceRow {
            margin: 10px 0;

            span {
              font-size: 14px;
              width: 60px;
              display: inline-block;
            }

            .price {
              width: 110px;
            }
          }

          .stockRow {
            span {
              font-size: 14px;
              width: 60px;
              display: inline-block;
            }

            .num {
              width: 110px;
            }
          }

          .tpl-bottom {
            margin-top: 10px;
            width: 100%;

            span {
              display: inline-block;
              padding: 4px 6px;
              background: #f7ba2a;
              text-align: center;
            }
          }
          .QRcode {
            width: 100px;
            height: 100px;
            color: #000;
            background: #fff
            text-align: center;
            line-height: 100px;
            float: right;
            cursor: pointer;
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
              position: relative;
              top: 5px;
            }
          }

          .ad-option {
            width: 401px;
            height: 40px;
            font-size: 0;
            border-right: 1px solid #e4e4e4;
            margin-bottom: 10px;

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
            margin-top: 15px;
            width: 400px;

            .el-input-group__prepend {
              width: 100px;
              padding: 0 26px;
            }
          }
        }
      }
    }
  }
</style>
