<template>
  <div class="tpl-img">
    <el-collapse accordion @change="collapseChange" :value="collapseVal">
      <el-collapse-item name="image">
        <template slot="title">动态图片模板
          <el-button class="button" size="small" @click.stop="edit" v-show="!isEdit && collapseVal==='image'">编辑
          </el-button>
          <el-button class="button" size="small" @click.stop="flashSave" v-show="isEdit">保存</el-button>
        </template>
        <div class="img">
          <div class="ad-style" v-show="!isEdit"><img src="../../../static/img/flash150x150.png" alt=""></div>
          <div class="ad-edit">
            <div class="upload-flash">上传图片</div>
            <div class="ad-con">
              <div class="ad-title"><span>* </span> 图片规范：格式PNG、大小200K、主体内容明显</div>
              <div class="ad-option ad-size">
                <span>图片大小</span>
                <span>150px * 150px</span>
                <span>210px * 90px</span>
                <span>210px * 60px</span>
              </div>
              <div class="ad-option ad-effect">
                <span>展示效果</span>
                <span>从小到大</span>
                <span>移动飘过</span>
                <span>物体折线</span>
              </div>
              <div class="ad-option ad-position">
                <span>广告位置</span>
                <span>屏幕居左</span>
                <span>屏幕居中</span>
                <span>屏幕居右</span>
              </div>
              <div class="ad-url">
                <el-input placeholder="请输入内容">
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
      collapseVal: ''
    },
    data () {
      return {
        isEdit: false
      }
    },
    methods: {
      collapseChange (val) {
        console.log(val)
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
        this.$parent.save('image', this.conf_info)
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
    .img {
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
