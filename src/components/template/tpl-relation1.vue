<template>
  <div class="tpl-relation1">
    <el-collapse accordion @change="collapseChange" :value="collapseVal">
      <el-collapse-item name="relation1">
        <template slot="title">关联信息模板1
          <el-button class="button" size="small" @click.stop="edit" v-show="!isEdit && collapseVal==='relation1'">编辑
          </el-button>
          <el-button class="button" size="small" @click.stop="flashSave" v-show="isEdit && collapseVal==='relation1'">
            保存
          </el-button>
        </template>
        <div class="relation1">
          <div class="ad-style" v-show="!isEdit">
            <video id="rel1video" loop src="../../../static/media/relation1.mp4" alt=""></video>
          </div>
          <div class="ad-edit">
            <!--提示-->
            <div class="tpl-tips">
              <div class="tips-select">
                <template>
                  <el-select class="select-self" v-model="value" size="small" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </div>
              <div class="selectOption" v-if="value === 'prompt2'">
                <div class="circular" :style="{backgroundImage: 'url('+promptImgUrl+')', backgroundSize: '100% 100%'}">
                  <el-upload
                    class="avatar-uploader"
                    :action="upLoadImg"
                    :data="upLoadData"
                    :headers="token"
                    :show-file-list="false"
                    :before-upload="beforeUpload"
                    :on-success="tipsImgupLoadSuccess">
                    <i class="uploader-icon">点击上传</br>图片</i>
                  </el-upload>
                </div>
                <div class="info">
                  <el-input size="small" v-model="promptText" placeholder="请输入内容"></el-input>
                </div>
              </div>
              <div v-else-if="value === 'prompt1'">
                <div
                  class="images"
                  :style="{backgroundImage: 'url('+promptImgUrl+')', backgroundSize: '100% 100%'}">
                  <el-upload
                    class="avatar-uploader"
                    :action="upLoadImg"
                    :data="upLoadData"
                    :headers="token"
                    :show-file-list="false"
                    :before-upload="beforeUpload"
                    :on-success="tipsImgupLoadSuccess">
                    <i class="uploader-icon">上传图片</i>
                  </el-upload>
                </div>
              </div>
            </div>
            <!--<div class="upload-flash">上传图片</div>-->
            <div class="ad-con">
              <div class="ad-top">
                <div class="top-img"
                     :style="{backgroundImage: 'url('+this.conf_info.relation_info.content[0].info_con+')', backgroundSize: '100% 100%'}">
                  <el-upload
                    class="avatar-uploader"
                    :action="upLoadImg"
                    :data="upLoadData"
                    :headers="token"
                    :show-file-list="false"
                    :before-upload="beforeUpload"
                    :on-success="topImgupLoadSuccess">
                    <i class="uploader-icon">上传图片</i>
                  </el-upload>
                </div>
                <el-input v-model="conf_info.relation_info.content[1].info_con" placeholder="主题（10个字）"
                          size="mini"></el-input>
                <el-input v-model="conf_info.relation_info.content[2].info_con" placeholder="备注（10个字）"
                          size="mini"></el-input>
              </div>
              <div class="ad-text">
                <el-input v-model="conf_info.relation_info.content[3].info_con" type="textarea" :rows="2"
                          placeholder="请输入内容"></el-input>
              </div>
              <div class="ad-list">
                <div class="ad-item"
                     :style="{backgroundImage: 'url('+this.conf_info.relation_info.content[4].info_con+')', backgroundSize: '100% 100%'}">
                  <i class="el-icon-setting" @click="editItem(1)"></i>
                </div>
                <div class="ad-item"
                     :style="{backgroundImage: 'url('+this.conf_info.relation_info.content[7].info_con+')', backgroundSize: '100% 100%'}">
                  <i class="el-icon-setting" @click="editItem(2)"></i>
                </div>
                <div class="ad-item"
                     :style="{backgroundImage: 'url('+this.conf_info.relation_info.content[10].info_con+')', backgroundSize: '100% 100%'}">
                  <i class="el-icon-setting" @click="editItem(3)"></i>
                </div>
                <div class="ad-item"
                     :style="{backgroundImage: 'url('+this.conf_info.relation_info.content[13].info_con+')', backgroundSize: '100% 100%'}">
                  <i class="el-icon-setting" @click="editItem(4)"></i>
                </div>
              </div>
            </div>
            <div class="ad-confirm" v-show="isItem">
              <div class="confirm-img"
                   :style="{backgroundImage: 'url('+confirmImgUrl+')', backgroundSize: '100% 100%'}">
                <el-upload
                  class="avatar-uploader"
                  :action="upLoadImg"
                  :data="upLoadData"
                  :headers="token"
                  :show-file-list="false"
                  :before-upload="beforeUpload"
                  :on-success="itemImgupLoadSuccess">
                  <i class="uploader-icon">上传图片</i>
                </el-upload>
              </div>
              <div class="confirm-con">
                <el-input v-model="confirmText1" size="small" placeholder="请输入关联主题（15个字）"></el-input>
                <el-input v-model="confirmText2" size="small" placeholder="请输入跳转地址"></el-input>
                <el-button size="small" @click="itemCancel">取消</el-button>
                <el-button size="small" @click="itemConfirm">确定</el-button>
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
          mediachannel: this.$store.state.materialData.mediachannel,
          act_id: this.$store.state.materialData.act_id
        },
        options: [{
          value: 'prompt1',
          label: '图片提示信息150px*150px'
        }, {
          value: 'prompt2',
          label: '图文提示信息210px*60px'
        }],
        value: 'prompt1', // 提示选中项
        promptText: '', // 提示文本
        // 提示图片url
        promptImgUrl: '',
        isEdit: false,
        isItem: false,
        itemIndex: 1,
        // 弹框数据
        confirmText1: '',
        confirmText2: '',
        confirmImgUrl: '',
        conf_info: {
          prompt_info: {
            type: this.value,
            effect: '',
            content: [
              {
                info_con: '',
                info_exp: ''
              }
            ]
          },
          relation_info: {
            type: 'relation1',
            content: [
              {
                info_con: '',
                info_exp: '主图片（圆形）'
              },
              {
                info_con: '',
                info_exp: '主题'
              },
              {
                info_con: '',
                info_exp: '备注'
              },
              {
                info_con: '',
                info_exp: '内容'
              },
              {
                info_con: '',
                info_exp: '第一个块的图片'
              },
              {
                info_con: '',
                info_exp: '第一个块的关联主题'
              },
              {
                info_con: '',
                info_exp: '第一个块的外跳链接'
              },
              {
                info_con: '',
                info_exp: '第二个块的图片'
              },
              {
                info_con: '',
                info_exp: '第二个块的关联主题'
              },
              {
                info_con: '',
                info_exp: '第二个块的外跳链接'
              },
              {
                info_con: '',
                info_exp: '第三个块的图片'
              },
              {
                info_con: '',
                info_exp: '第三个块的关联主题'
              },
              {
                info_con: '',
                info_exp: '第三个块的外跳链接'
              },
              {
                info_con: '',
                info_exp: '第四个块的图片'
              },
              {
                info_con: '',
                info_exp: '第四个块的关联主题'
              },
              {
                info_con: '',
                info_exp: '第四个块的外跳链接'
              }
            ]
          }
        }
      }
    },
    watch: {
      'collapseVal' (val) {
        if (val === 'relation1') {
          this.video = document.getElementById('rel1video')
          this.video.currentTime = 0
          this.video.play()
        } else {
          this.video = document.getElementById('rel1video')
          let that = this
          setTimeout(function () {
            that.video.pause()
          }, 500)
        }
      },
      'adCon' (val) {
        this.conf_info = val
        // 对提示信息部分的数据做单独处理
        this.promptImgUrl = val.prompt_info.content[0].info_con
        this.promptText = val.prompt_info.content[1] ? val.prompt_info.content[1].info_con : ''
      }
    },
    methods: {
      collapseChange (val) {
        this.isEdit = false
        this.$emit('update:collapseVal', val)
      },
      // 编辑
      edit () {
        this.isEdit = true
      },
      // 保存
      flashSave () {
        // 先判断提示信息类型，创建数据格式
        if (this.value === 'prompt1') {
          this.conf_info.prompt_info.effect = 'effect1'
          this.conf_info.prompt_info.type = 'prompt1'
          this.conf_info.prompt_info.content = [{info_con: this.promptImgUrl, info_exp: '提示信息图片'}]
        } else {
          this.conf_info.prompt_info.effect = 'effect2'
          this.conf_info.prompt_info.type = 'prompt2'
          this.conf_info.prompt_info.content = [{
            info_con: this.promptImgUrl,
            info_exp: '提示信息图片'
          }, {info_con: this.promptText, info_exp: '提示信息文字'}]
        }
        // 调父组件的save方法，并把数据传过去。
        this.$parent.save('relation', this.conf_info)
      },
      // 点击图片上的设置图标
      editItem (index) {
        this.itemIndex = index
        this.confirmImgUrl = this.conf_info.relation_info.content[1 + 3 * this.itemIndex].info_con
        this.confirmText1 = this.conf_info.relation_info.content[2 + 3 * this.itemIndex].info_con
        this.confirmText2 = this.conf_info.relation_info.content[3 + 3 * this.itemIndex].info_con
        this.isItem = true
      },
      // 弹框中的确定按钮
      itemConfirm () {
        this.conf_info.relation_info.content[1 + 3 * this.itemIndex].info_con = this.confirmImgUrl
        this.conf_info.relation_info.content[2 + 3 * this.itemIndex].info_con = this.confirmText1
        this.conf_info.relation_info.content[3 + 3 * this.itemIndex].info_con = this.confirmText2
        this.confirmText1 = ''
        this.confirmText2 = ''
        this.confirmImgUrl = ''
        this.isItem = false
      },
      // 弹框中的取消按钮
      itemCancel () {
        this.isItem = false
      },
      // topImg 上传成功回调
      topImgupLoadSuccess (res) {
        if (res.code === 200) {
          this.$set(this.conf_info.relation_info.content[0], 'info_con', this.imgUrl + res.data)
        }
      },
      itemImgupLoadSuccess (res) {
        if (res.code === 200) {
          // this.$set(this.conf_info.relation_info.content[1 + 3 * this.itemIndex], 'info_con', this.imgUrl + res.data)
          this.confirmImgUrl = this.imgUrl + res.data
          // this.conf_info.relation_info.content[0].info_con = this.imgUrl + res.data
        }
      },
      tipsImgupLoadSuccess (res) {
        if (res.code === 200) {
          // this.$set(this.conf_info.relation_info.content[1 + 3 * this.itemIndex], 'info_con', this.imgUrl + res.data)
          this.promptImgUrl = this.imgUrl + res.data
          // this.conf_info.relation_info.content[0].info_con = this.imgUrl + res.data
        }
      },
      // 上传前的钩子函数
      beforeUpload (file) {
        const isJPG = file.type === 'image/png'
        const isLt2M = file.size / 1024 < 200

        if (!isJPG) {
          this.$message.error('请确认文件格式。')
        }
        if (!isLt2M) {
          this.$message.error('上传的文件大小不能超过 200KB!')
        }
        return isJPG && isLt2M
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .tpl-relation1 {
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
    .relation1 {
      width: 100%;
      height: 550px;
      position: relative;
    // 上传图片中的 i 标签
      .uploader-icon {
        font-style: normal;
      }
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
          width: 100%;
        }
      }
      .ad-edit {
        width: 100%;
        height: 550px;
        position: relative;
        background-image: url("../../../static/img/tplbg.jpg");
        background-repeat: no-repeat;
        background-size: 100%;
        background-position center;
        .tpl-tips {
          position: absolute;
          left: 20px;
          bottom: 20px;
          width: 300px;
          height: 195px;
          background #f0f0f0
          border-radius 3px
          overflow hidden
          .select-self {
            width 100%
          }
          .selectOption {
            margin 40px auto 0
            height 90px
            width 230px
            position relative
          }
          .images {
            margin 30px auto 0
            height 90px
            width 210px
            background #ccc
            border 2px solid #f2f2f2
            text-align: center;
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
            padding-top: 20px
            cursor: pointer;
          }
          .info {
            width: 160px;
            position: absolute;
            left: 70px;
            top: 23px;
            height: 30px;
          }
        }
        .ad-con {
          width: 25%;
          height: calc(100% - 50px);
          margin: 25px 0;
          float: right;
          background: rgba(0, 0, 0, .6);
          color: #fff;
          padding: 30px 20px;
          div {
            float: left;
          }
          .ad-top {
            width: 100%;
            height: 60px;
            .top-img {
              width: 60px;
              height: 60px;
              border-radius: 50%;
              background: #fff;
              color: #868686;
              text-align: center;
              line-height: 60px;
              cursor: pointer;
            }
            .el-input {
              width: 130px;
              margin: 5px 0 0 10px;
            }
          }
          .ad-text {
            width: 100%;
            height: 75px;
            margin-top: 20px;
          }
          .ad-list {
            width: 100%;
            height: 290px;
            .ad-item {
              width: 47%;
              height: 150px;
              background: #fff;
              margin: 0 12px 10px 0;
              position: relative;
              &:nth-of-type(2n) {
                margin-right: 0px;
              }
              .el-icon-setting {
                color: #a1a1a1;
                font-size: 14px;
                position: absolute;
                right: 12px;
                top: 12px;
                cursor: pointer;
              }
            }
          }
        }
        .ad-confirm {
          width: 400px;
          height: 150px;
          position: absolute;
          background: rgba(0, 0, 0, .6);
          top: 130px;
          left: 250px;
          padding: 10px;
          .confirm-img {
            width: 130px;
            height: 130px;
            float: left;
            background: #fff;
            text-align: center;
            line-height: 130px;
            i {
              font-style: normal;
            }
          }
          .confirm-con {
            width: 240px;
            float: left;
            margin-left: 10px;
            div {
              margin-bottom: 10px;
            }
            button {
              margin: 20px 10px 0 0;
              float: right;
            }
          }
        }
      }
    }
  }
</style>
