<template>
  <div class="tpl-flash1">
    <el-collapse accordion @change="collapseChange" :value="collapseVal">
      <el-collapse-item name="flash">
        <template slot="title">Flash模板
          <el-button class="button" size="small" @click.native.stop="edit" v-show="!isEdit && collapseVal==='flash'">
            编辑
          </el-button>
          <el-button class="button" size="small" @click.stop="flashSave" v-show="isEdit && collapseVal==='flash'">保存
          </el-button>
        </template>
        <div class="flash1">
          <div class="ad-style" v-show="!isEdit"><img src="../../../static/img/flash150x150.png" alt=""></div>
          <div class="ad-edit">
            <div class="upload-flash">上传flash
              <!--<el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon">上传flash</i>
              </el-upload>-->
            </div>
            <div class="ad-con">
              <div class="ad-title"><span>* </span> Flash规范：格式fla、目标Flash Player17、脚本ActionScript3.0、大小200K</div>
              <div class="ad-option ad-size">
                <span>展示大小</span>
                <span @click="changeSize('150,150', 1)" :class="{'option-border':isSize===1}">150px * 150px</span>
                <span @click="changeSize('210,90', 2)" :class="{'option-border':isSize===2}">210px * 90px</span>
              </div>
              <div class="ad-option ad-position">
                <span>广告位置</span>
                <span @click="changePosition('left', 1)" :class="{'option-border':isPosition===1}">屏幕居左</span>
                <span @click="changePosition('center', 2)" :class="{'option-border':isPosition===2}">屏幕居中</span>
                <span @click="changePosition('right', 3)" :class="{'option-border':isPosition===3}">屏幕居右</span>
              </div>
              <div class="ad-url">
                <el-input placeholder="请输入内容" v-model="conf_info.out_url">
                  <template slot="prepend">跳转链接</template>
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
      }
    },
    data () {
      return {
        // 是否为编辑状态
        isEdit: false,
        // 位置和大小选项样式
        isSize: 1,
        isPosition: 1,
        conf_info: {
          flash_src: '',
          size: '150,150',
          position: 'left',
          out_url: ''
        }
      }
    },
    conputed: {},
    watch: {
      'collapseVal' (val) {
        console.log(this.adCon)
        if (val === 'flash') {
          this.isEdit = true
          if (this.adCon.position === 'left') this.isPosition = 1
          if (this.adCon.position === 'center') {
            this.isPosition = 2
            this.conf_info.position = 'center'
          }
          if (this.adCon.position === 'right') {
            this.isPosition = 3
            this.conf_info.position = 'right'
          }
          if (this.adCon.size === '150,150') this.isPosition = 1
          if (this.adCon.size === '210,90') {
            this.isPosition = 2
            this.conf_info.size = '210,90'
          }
          this.conf_info.flash_src = this.adCon.flash_src
          this.conf_info.out_url = this.adCon.out_url
        }
      }
    },
    methods: {
      // 使总体保持手风琴效果
      collapseChange (val) {
        this.isEdit = false
        this.$emit('collapseChange', val)
      },
      // 编辑
      edit () {
        this.isEdit = true
      },
      // 保存
      flashSave () {
        // 调父组件的save方法，并把数据传过去。
        this.$parent.save('flash', this.conf_info)
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
    .flash1 {
      width: 100%;
      height: 550px;
      padding: 80px;
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
