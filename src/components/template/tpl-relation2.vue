<template>
  <div class="tpl-relation">
    <el-collapse accordion @change="collapseChange" :value="collapseVal">
      <el-collapse-item name="relation2">
        <template slot="title">关联信息模板2
          <el-button class="button" size="small" @click.stop="edit" v-show="!isEdit && collapseVal==='relation2'">编辑
          </el-button>
          <el-button class="button" size="small" @click.stop="flashSave" v-show="isEdit">保存</el-button>
        </template>
        <div class="relation">
          <div class="ad-style" v-show="!isEdit"><video id="rel2video" loop src="../../../static/media/relation2.mp4" alt=""></video></div>
          <div class="ad-edit">
            <!-- 提示模版 -->
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
              <div v-if="value === 'prompt1'">
                <div class="images">
                  <el-upload
                    class="avatar-uploader"
                    :action="upLoadImg"
                    :data="upLoadData"
                    :headers="token"
                    :on-success="tipsImgSuccess"
                    :before-upload="beforeAvatarUpload">
                    <div class="imagesbj":style="{backgroundImage: 'url('+conf_info.prompt_info.content[0].info_con+')', backgroundSize: '100% 100%'}">
                      <p v-if="!conf_info.prompt_info.content[0].info_con">上传图片</p>
                    </div>
                  </el-upload>
                </div>
              </div>
              <div class="selectOption" v-else-if="value === 'prompt2'">
                <el-upload
                  class="avatar-uploader circular"
                  :action="upLoadImg"
                  :data="upLoadData"
                  :headers="token"
                  :on-success="tipsImgTextSuccess"
                  :before-upload="beforeAvatarUpload">
                  <div class="avatar" :style="{backgroundImage: 'url('+conf_info.prompt_info.content[0].info_con+')', backgroundSize: '100% 100%'}">
                    <p v-if="!conf_info.prompt_info.content[0].info_con" >上传图片</p>
                  </div>
                </el-upload>
                <div class="info">
                  <el-input size="small" v-model="promptText" placeholder="请输入内容"></el-input>
                </div>
              </div>
            </div>

            <!-- 右边展示模版 -->
            <div class="tpl-con">
              <div class="pic" :style="{backgroundImage: 'url('+conf_info.relation_info.content[0].info_con+')', backgroundSize: '100% 100%'}">
                <el-upload
                  class="avatar-uploader circular"
                  :action="upLoadImg"
                  :data="upLoadData"
                  :headers="token"
                  :show-file-list="false"
                  :on-success="tplImgSuccess"
                  :before-upload="beforeAvatarUpload">
                  <p v-if="!conf_info.relation_info.content[0].info_con" >上传图片</p>
                </el-upload>
              </div>
              <el-input
                class="title"
                resize="none"
                type="textarea"
                :max="2"
                placeholder="请输入内容"
                v-model="conf_info.relation_info.content[1].info_con">
              </el-input>
              <div class="priceRow">
                <span>价格：￥</span>
                <el-input class="price" type="number" size="small" v-model="conf_info.relation_info.content[2].info_con" placeholder="请输入内容"></el-input>
              </div>
              <div class="stockRow">
                <span>库存：</span>
                <el-input class="num" type="number" size="small" v-model="conf_info.relation_info.content[3].info_con" placeholder="请输入内容"></el-input>
              </div>
              <div class="tpl-bottom">
                <span>扫码加入购物车</span>
                <div class="QRcode" :style="{backgroundImage: 'url('+conf_info.relation_info.content[4].info_con+')', backgroundSize: '100% 100%'}">
                  <el-upload
                    class="avatar-uploader"
                    :action="upLoadImg"
                    :data="upLoadData"
                    :headers="token"
                    :show-file-list="false"
                    :on-success="QRcodeImgSuccess"
                    :before-upload="beforeAvatarUpload">
                    <p v-if="!conf_info.relation_info.content[4].info_con">二维码</p>
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
          mediachannel: this.$store.state.materialData.mediachannel,
          act_id: this.$store.state.materialData.act_id
        },
        imageUrl: '',
        isEdit: false,
        btnIsShow: true,
        options: [{
          value: 'prompt1',
          label: '图片提示信息150px*150px'
        }, {
          value: 'prompt2',
          label: '图文提示信息210px*60px'
        }],
        value: 'prompt1',      // 提示选中项
        promptText: '', // 提示文本
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
        }
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
        this.conf_info = val
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
            content: [{
              info_con: this.conf_info.prompt_info.content[0].info_con,
              info_exp: '提示图片'
            },
            {
              info_con: this.promptText,
              info_exp: '提示文字'
            }]
          }
        }
        // 调父组件的save方法，并把数据传过去。
        this.$parent.save('relation', this.conf_info)
      },
      tipsImgSuccess (res, file) {      // 提示图片
        // this.promptImgUrl = this.imgUrl + res.data
        this.conf_info.prompt_info.content[0].info_con = this.imgUrl + res.data
        // console.log(this.conf_info.prompt_info)
      },
      tipsImgTextSuccess (res, file) {  // 提示图文图片
        // this.promptImgTextUrl = this.imgUrl + res.data
        this.conf_info.prompt_info.content[0].info_con = this.imgUrl + res.data
        // console.log(this.conf_info.prompt_info)
      },
      tplImgSuccess (res, file) {
        // this.tplImgUrl = this.imgUrl + res.data
        this.conf_info.relation_info.content[0].info_con = this.imgUrl + res.data
        // console.log(this.conf_info.relation_info)
      },
      QRcodeImgSuccess (res, file) {
        // this.QRcodeImgUrl = this.imgUrl + res.data
        this.conf_info.relation_info.content[4].info_con = this.imgUrl + res.data
        // console.log(this.conf_info.relation_info)
      },
      beforeAvatarUpload (file) {
        const isPNG = file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isPNG) {
          this.$message.error('上传头像图片只能是 png 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isPNG && isLt2M
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
    .avatar-uploader{
      height 100%
      width: 100%
      overflow hidden
      div{
        height 100%
        width: 100%
      }
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

        img {
          width: 100%;
        }
      }

      .ad-edit {
        width: 100%;
        height: 100%;
        background: url('../../../static/img/tplbg.jpg') no-repeat;
        background-size: cover;

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

          .images {
            margin: 30px auto 0;
            height: 90px;
            width: 210px;
            background: #ccc;
            border: 2px solid #f2f2f2;
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

            div, img {
              height: 100%;
              width: 100%;
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
