<template>
  <div class="tpl-relation1">
    <el-collapse accordion @change="collapseChange" :value="collapseVal">
      <el-collapse-item name="relation1">
        <template slot="title">屏占比4:1 / 适用于明星经纪、品牌推荐等信息
          <el-button class="button" size="small" @click.stop="edit" v-show="!isEdit && collapseVal==='relation1'" :disabled="editRule.tpl_type.indexOf('relation1') < 0">编辑
          </el-button>
          <el-button :disabled="!canEdit" class="button" size="small" @click.stop="flashSave"
            v-show="isEdit && collapseVal==='relation1'">保存</el-button>
        </template>
        <div class="can-edit" v-if="!canEdit"></div>
        <div class="relation1">
          <div class="ad-style" v-show="!isEdit">
            <video id="rel1video" loop src="http://sltimg.adv.ott.cibntv.net/img/video/relation1.mp4" alt=""></video>
          </div>
          <div class="ad-edit">
            <div class="links-title">
              <span class="title">监测代码列表</span>
              <el-button size="small" @click="addLinks">添加</el-button>
            </div>
            <div class="url-wrap">
              <el-input placeholder="请输入曝光检测链接" v-model="bgUrl" size="small">
                <template slot="prepend">曝光</template>
              </el-input>
              <el-input placeholder="请输入点击检测链接" v-model="clickUrl" size="small">
                <template slot="prepend">点击</template>
              </el-input>
              <el-input placeholder="请输入备注" v-model="bg_url_desc" size="small">
                <template slot="prepend">备注</template>
              </el-input>
            </div>
            <div class="url-wrap1" v-show="show_link1">
              <el-input placeholder="请输入曝光检测链接" v-model="bg1_url" size="small">
                <template slot="prepend">曝光</template>
              </el-input>
              <el-input placeholder="请输入点击检测链接" v-model="click1_url" size="small">
                <template slot="prepend">点击</template>
              </el-input>
              <el-input placeholder="请输入备注" v-model="bg1_url_desc" size="small">
                <template slot="prepend">备注</template>
              </el-input>
            </div>
            <div class="url-wrap2" v-show="show_link2">
              <el-input placeholder="请输入曝光检测链接" v-model="bg2_url" size="small">
                <template slot="prepend">曝光</template>
              </el-input>
              <el-input placeholder="请输入点击检测链接" v-model="click2_url" size="small">
                <template slot="prepend">点击</template>
              </el-input>
              <el-input placeholder="请输入备注" v-model="bg2_url_desc" size="small">
                <template slot="prepend">备注</template>
              </el-input>
            </div>
            <div class="url-wrap3" v-show="show_link3">
              <el-input placeholder="请输入曝光检测链接" v-model="bg3_url" size="small">
                <template slot="prepend">曝光</template>
              </el-input>
              <el-input placeholder="请输入点击检测链接" v-model="click3_url" size="small">
                <template slot="prepend">点击</template>
              </el-input>
              <el-input placeholder="请输入备注" v-model="bg3_url_desc" size="small">
                <template slot="prepend">备注</template>
              </el-input>
            </div>
            <!--提示-->
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
              <div class="selectOption" v-if="value === 'prompt2'">
                <div class="circular" :style="{backgroundImage: 'url('+promptImgUrl+')', backgroundSize: 'cover'}">
                  <el-upload
                    class="avatar-uploader"
                    ref="uploadPrompt2"
                    :action="upLoadImg"
                    :data="upLoadData"
                    :headers="token"
                    :show-file-list="false"
                    :auto-upload="false"
                    :on-change="prompt2UpLoadChange"
                    :before-upload="beforeUpload"
                    :on-success="tipsImgupLoadSuccess">
                    <i class="uploader-icon">150px*150px</i>
                  </el-upload>
                </div>
                <div class="info">
                  <el-input size="small" v-model="promptText" placeholder="请输入内容(8个字)" :maxlength="8"></el-input>
                </div>
              </div>
              <div v-else-if="value === 'prompt1'">
                <div
                  class="images"
                  :style="{backgroundImage: 'url('+promptImgUrl+')', backgroundSize: 'contain'}">
                  <el-upload
                    class="avatar-uploader"
                    ref="uploadPrompt1"
                    :action="upLoadImg"
                    :data="upLoadData"
                    :headers="token"
                    :show-file-list="false"
                    :auto-upload="false"
                    :on-change="prompt1UpLoadChange"
                    :before-upload="beforeUpload"
                    :on-success="tipsImgupLoadSuccess">
                    <i class="uploader-icon">300px*300px 上传图片</i>
                  </el-upload>
                </div>
              </div>
            </div>
            <!--<div class="upload-flash">上传图片</div>-->
            <div class="ad-con">
              <div class="ad-top">
                <div class="top-img"
                     :style="{backgroundImage: 'url('+this.conf_info.relation_info.content[0].info_con+')', backgroundSize: 'cover'}">
                  <el-upload
                    class="avatar-uploader"
                    ref="uploadTopImg"
                    :action="upLoadImg"
                    :data="upLoadData"
                    :headers="token"
                    :show-file-list="false"
                    :auto-upload="false"
                    :on-change="topImgUpLoadChange"
                    :before-upload="beforeUpload"
                    :on-success="topImgupLoadSuccess">
                    <i class="uploader-icon">&nbsp;&nbsp;120*120</i>
                  </el-upload>
                </div>
                <el-input v-model="conf_info.relation_info.content[1].info_con" placeholder="主题（8个字）"
                          size="mini" :maxlength="8"></el-input>
                <el-input v-model="conf_info.relation_info.content[2].info_con" placeholder="备注（10个字）"
                          size="mini" :maxlength="10"></el-input>
              </div>
              <div class="ad-text">
                <el-input v-model="conf_info.relation_info.content[3].info_con" type="textarea" :rows="2"
                          placeholder="请输入内容(36个字)" :maxlength="36"></el-input>
              </div>
              <div class="ad-list">
                <div class="ad-item"
                     :style="{backgroundImage: 'url('+this.conf_info.relation_info.content[4].info_con+')', backgroundSize: 'cover'}">
                  <i class="el-icon-setting" @click="editItem(1)"></i>
                </div>
                <div class="ad-item"
                     :style="{backgroundImage: 'url('+this.conf_info.relation_info.content[7].info_con+')', backgroundSize: 'cover'}">
                  <i class="el-icon-setting" @click="editItem(2)"></i>
                </div>
                <div class="ad-item"
                     :style="{backgroundImage: 'url('+this.conf_info.relation_info.content[10].info_con+')', backgroundSize: 'cover'}">
                  <i class="el-icon-setting" @click="editItem(3)"></i>
                </div>
                <div class="ad-item"
                     :style="{backgroundImage: 'url('+this.conf_info.relation_info.content[13].info_con+')', backgroundSize: 'cover'}">
                  <i class="el-icon-setting" @click="editItem(4)"></i>
                </div>
              </div>
            </div>
            <div class="ad-confirm" v-show="isItem">
              <div class="confirm-img"
                   :style="{backgroundImage: 'url('+confirmImgUrl+')', backgroundSize: 'contain'}">
                <el-upload
                  class="avatar-uploader"
                  ref="uploadItemImg"
                  :action="upLoadImg"
                  :data="upLoadData"
                  :headers="token"
                  :show-file-list="false"
                  :auto-upload="false"
                  :on-change="itemImgUpLoadChange"
                  :before-upload="beforeUpload"
                  :on-success="itemImgupLoadSuccess">
                  <i class="uploader-icon">180px*250px</i>
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
      options: [{
        value: 'prompt1',
        label: '图片提示信息'
      }, {
        value: 'prompt2',
        label: '图文提示信息'
      }],
      value: 'prompt1', // 提示选中项
      promptText: '', // 提示文本
      // 提示图片url
      promptImgUrl: '',
      promptNaturalWidth: 0,
      promptNaturalHeight: 0,
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
      show_link1: false,
      show_link2: false,
      show_link3: false
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
      if (val && val.adCon.relation_info.type === 'relation1') {
        // 不展示视频，直接展示内容
        this.isEdit = true
        this.conf_info = val.adCon
        // 对提示信息部分的数据做单独处理
        this.promptImgUrl = val.adCon.prompt_info.content[0].info_con
        this.promptText = val.adCon.prompt_info.content[1] ? val.prompt_info.content[1].info_con : ''
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
        // 清空数据，必须是完整的数据结构！
        this.conf_info = {
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
    }
  },
  methods: {
    collapseChange (val) {
      this.isEdit = false
      this.$emit('update:collapseVal', val)
    },
    // 编辑
    edit () {
      this.confirmImgUrl = ''
      this.confirmText1 = ''
      this.confirmText2 = ''
      this.promptImgUrl = ''
      this.promptText = ''
      this.conf_info = {
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
      console.log(this.conf_info)
      for (let i = 0; i < 4; i++) {
        if (!this.conf_info.relation_info.content[6 + 3 * i].info_con) {
          this.$message.error(`请输入跳转链接(${i + 1})`)
          return false
        } else if (!/^(https|http){1}:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i.test(this.conf_info.relation_info.content[6 + 3 * i].info_con)) {
          this.$message.error(`跳转链接不合法(${i + 1})`)
          return false
        }
      }
      this.conf_info.relation_info.content[3 + 3 * this.itemIndex].info_con

      // 先判断提示信息类型，创建数据格式
      if (this.value === 'prompt1') {
        this.conf_info.prompt_info.effect = 'effect1'
        this.conf_info.prompt_info.type = 'prompt1'
        this.conf_info.prompt_info.content = [{ info_con: this.promptImgUrl, info_exp: '提示信息图片' }]
      } else {
        this.conf_info.prompt_info.effect = 'effect2'
        this.conf_info.prompt_info.type = 'prompt2'
        this.conf_info.prompt_info.content = [{
          info_con: this.promptImgUrl,
          info_exp: '提示信息图片'
        }, { info_con: this.promptText, info_exp: '提示信息文字' }]
      }
      // 调父组件的save方法，并把数据传过去。
      this.$parent.save('relation', {
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
    // 提示信息选择器选择事件
    selectChange (val) {
      // 切换提示信息时清楚图片
      this.promptImgUrl = ''
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
          resolve({ 'naturalWidth': locImg.naturalWidth, 'naturalHeight': locImg.naturalHeight, 'imgSrc': locImg.src })
        }
        fileReader.readAsDataURL(files)
      })
      const naturalSize = await getNaturalSize(file)  // 获取图片原始尺寸
      callback(naturalSize)
    },
    // topImg 选择文件事件
    topImgUpLoadChange (file) {
      if (!file.response) {
        this.loadLocImg(file.raw, naturalSize => {
          // 验证图片尺寸
          if (!(naturalSize.naturalWidth === 120 && naturalSize.naturalHeight === 120)) {
            this.$message.error('图片尺寸不是120px*120px，请重新上传')
            this.$refs.uploadTopImg.clearFiles()  // 清空文件列表
            return false
          }
          // 提交上传
          this.$refs.uploadTopImg.submit()
        })
      }
    },
    // topImg 上传成功回调
    topImgupLoadSuccess (res) {
      if (res.code === 200) {
        this.$set(this.conf_info.relation_info.content[0], 'info_con', this.imgUrl + res.data)
      }
    },
    // itemImg 选择文件事件
    itemImgUpLoadChange (file) {
      if (!file.response) {
        this.loadLocImg(file.raw, naturalSize => {
          // 验证图片尺寸
          if (!(naturalSize.naturalWidth === 180 && naturalSize.naturalHeight === 250)) {
            this.$message.error('图片尺寸不是180px*250px，请重新上传')
            this.$refs.uploadItemImg.clearFiles()  // 清空文件列表
            return false
          }
          // 提交上传
          this.$refs.uploadItemImg.submit()
        })
      }
    },
    // itemImg 上传成功回调
    itemImgupLoadSuccess (res) {
      if (res.code === 200) {
        // this.$set(this.conf_info.relation_info.content[1 + 3 * this.itemIndex], 'info_con', this.imgUrl + res.data)
        this.confirmImgUrl = this.imgUrl + res.data
        // this.conf_info.relation_info.content[0].info_con = this.imgUrl + res.data
      }
    },
    // 提示信息1选择文件事件
    prompt1UpLoadChange (file) {
      if (!file.response) {
        this.loadLocImg(file.raw, naturalSize => {
          // 验证图片尺寸
          if (!(naturalSize.naturalWidth === 300 && naturalSize.naturalHeight === 300)) {
            this.$message.error('图片尺寸不是300px*300px，请重新上传')
            this.$refs.uploadPrompt1.clearFiles()  // 清空文件列表
            return false
          }
          // 提交上传
          this.$refs.uploadPrompt1.submit()
        })
      }
    },
    // 提示信息2选择文件事件
    prompt2UpLoadChange (file) {
      if (!file.response) {
        this.loadLocImg(file.raw, naturalSize => {
          // 验证图片尺寸
          if (!(naturalSize.naturalWidth === 150 && naturalSize.naturalHeight === 150)) {
            this.$message.error('图片尺寸不是150px*150px，请重新上传')
            this.$refs.uploadPrompt2.clearFiles()  // 清空文件列表
            return false
          }
          // 提交上传
          this.$refs.uploadPrompt2.submit()
        })
      }
    },
    // 提示信息图片上传成功
    tipsImgupLoadSuccess (res) {
      if (res.code === 200) {
        // this.$set(this.conf_info.relation_info.content[1 + 3 * this.itemIndex], 'info_con', this.imgUrl + res.data)
        this.promptImgUrl = this.imgUrl + res.data
        // this.conf_info.relation_info.content[0].info_con = this.imgUrl + res.data
      }
    },
    // 上传前的钩子函数
    beforeUpload (file) {
      // 上传前获取上传图片所需要的参数！
      this.upLoadData.act_id = this.$store.state.materialData.act_id
      this.upLoadData.mediachannel = this.$store.state.materialData.mediachannel
      const isType = (/^[image/]+(jpg|jpeg|png|gif)$/).test(file.type)
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isType) {
        this.$message.error('请确认文件格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传的文件大小不能超过 2M!')
      }
      return isType && isLt2M
    },
    addLinks () {
      !this.show_link1 ? this.show_link1 = true : !this.show_link2 ? this.show_link2 = true : this.show_link3 = true
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

  .el-collapse-item__content {
    position: relative;
  }

  .can-edit {
    position: absolute;
    z-index: 100;
    width: 100%;
    height: 550px;
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

      video {
        height: 100%;
      }
    }

    .ad-edit {
      width: 100%;
      height: 550px;
      position: relative;
      background-image: url('../../../static/img/tplbg.png');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;

      .links-title{
        width: 300px;
        position: absolute;
        left: 20px;
        top: 220px;
        .title{
          font-size 18px;
          font-weight bold;
          line-height 40px;
        }
        .el-button{
          float right;
          margin: 6px 0;
        }
      }

      .url-wrap {
        width: 300px;
        position: absolute;
        left: 20px;
        top: 260px;

        .el-input {
          margin-top: 3px;
        }
      }
      .url-wrap1 {
        width: 300px;
        position: absolute;
        left: 340px;
        top: 260px;

        .el-input {
          margin-top: 3px;
        }
      }
      .url-wrap2 {
        width: 300px;
        position: absolute;
        left: 20px;
        top: 380px;

        .el-input {
          margin-top: 3px;
        }
      }
      .url-wrap3 {
        width: 300px;
        position: absolute;
        left: 340px;
        top: 380px;

        .el-input {
          margin-top: 3px;
        }
      }

      .tpl-tips {
        position: absolute;
        left: 20px;
        top: 20px;
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
          background-color: #ccc;
          background-repeat: no-repeat;
          background-position: center;
          border: 2px solid #f2f2f2;
          text-align: center;
          line-height: 90px;
        }

        .circular {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background-color: #fff;
          background-position: center;
          background-repeat: no-repeat;
          position: absolute;
          z-index: 1;
          text-align: center;
          line-height: 20px;
          padding-top: 28px;
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
        height: calc(100% - 35px);
        margin: 15px 0;
        float: right;
        background: rgba(0, 0, 0, 0.6);
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
            background-color: #fff;
            background-position: center;
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
            background-color: #fff;
            background-position: center;
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
        background: rgba(0, 0, 0, 0.6);
        top: 130px;
        left: 250px;
        padding: 10px;

        .confirm-img {
          width: 130px;
          height: 130px;
          float: left;
          background-color: #fff;
          background-position: center;
          background-repeat: no-repeat;
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
