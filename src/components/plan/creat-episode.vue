<template>
  <div class="creat-episode">
    <steps :active="2"></steps>
    <div class="creat-media-content">
      <h3>视频定向</h3>
      <div class="top">
        <span class="model-name">指定投放视频</span>
        <div class="search-wrap">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="search" size="mini" type="primary">搜索</el-button>
          </el-input>
        </div>
        <div class="result-wrap">
          <span class="search-title">全部：（<span></span>）个视频搜索结果</span>
          <span class="clear-search"><i class="el-icon-delete2"></i>清空搜索结果</span>
          <ul class="search-result">

          </ul>
        </div>
      </div>
      <div class="bottom">
        <span class="model-name">选择视频分类</span>
        <div class="media-type-wrap">
          <div>
            频道：
            <el-button size="small">全部</el-button>
            <el-checkbox-group size="small">
              <el-checkbox-button>全部</el-checkbox-button>
            </el-checkbox-group>
          </div>
          <div>
            地区：
            <el-button size="small">全部</el-button>
            <el-checkbox-group size="small">
              <el-checkbox-button>全部</el-checkbox-button>
            </el-checkbox-group>
          </div>
          <div>
            类型：
            <el-button size="small">全部</el-button>
            <el-checkbox-group size="small">
              <el-checkbox-button>全部</el-checkbox-button>
            </el-checkbox-group>
          </div>
          <div>
            年代：
            <el-button size="small">全部</el-button>
            <el-checkbox-group size="small">
              <el-checkbox-button>全部</el-checkbox-button>
            </el-checkbox-group>
          </div>
        </div>
      </div>
    </div>
    <div class="button-wrap">
      <el-button @click="back">返回</el-button>
      <el-button class="next-btn" type="primary" @click="nextStep">下一步</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import MEDIATYPE from '../../../static/json/media-type.json'
  import steps from './steps-component.vue'
  import header from './header-component.vue'

  const mediaType = MEDIATYPE.mediaType
  export default {
    name: 'creatMediaType',
    data () {
      return {}
    },
    created () {
      // 判断Vuex中是否有数据
      // let initData = this.$store.state.creatData.creatMediaType
      // 获取类型
      this.typeData = mediaType
    },
    methods: {
      // 下一步
      nextStep () {
        if (this.chosedType.length === 0) {
          this.$alert('请选择媒体类型', '提示', {
            confirmButtonText: '确定'
          })
          return
        }
        this.$http.post('/api2/add_class_plan', {
          class_plan: this.chosedType.join(''),
          plan_id: this.$store.state.creatData.planId
        }).then(res => {
          if (res.code === 200) {
            this.$store.commit('MEDIATYPE', this.chosedType)
            this.$router.push('/creatTime')
          }
        })
      },
      back () {
        this.$router.go(-1)
      }
    },
    components: {
      steps,
      'creat-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .creat-episode {
    .creat-media-content {
      width: 100%;
      padding: 0 30px;
      border-bottom: 1px solid #e4e4e4;
      h3 {
        width: 100%;
        height: 40px;
        border-bottom: 1px solid #bfcbd9;
        font-size: 16px;
        margin-bottom: 15px;
      }
      .model-name {
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        padding-left: 10px;
        display: block;
        border-left: 3px solid #1d8ce0;
        margin-bottom: 10px;
      }
      .top {
        overflow: hidden;
        width: 100%;
        height: 160px;
        margin-bottom: 40px;
        .search-wrap {
          width: 405px;
          height: 130px;
          border: 1px solid #e4e4e4;
          float: left;
          padding: 40px 30px;
          .el-input-group__append {
            background-color: #169bd5;
            color: #fff;
            span {
              border: none;
            }
          }
        }
        .result-wrap {
          width: 705px;
          height: 130px;
          border: 1px solid #e4e4e4;
          float: right;
          overflow: hidden;
          padding: 10px;
          .search-title {

          }
          .clear-search {
            float: right;
            vertical-align: top;
            cursor: pointer;
            i {
              vertical-align: bottom;
              padding-right: 3px;
            }
          }
        }
      }
      .bottom {
        .media-type-wrap {
          border: 1px solid #e4e4e4;
          padding: 15px;
          div {
            color: #999;
            margin-bottom: 10px;
            .el-button--small {
              border-radius: 15px;
              margin-right: 10px;
              background-color: #e4e4e4;
              &:hover {
                border-color: #c4c4c4;
                color: #000;
              }
              &:active {
                border-color: #c4c4c4;
                color: #000;
              }
              &:focus {
                border-color: #c4c4c4;
                color: #000;
              }
            }
            .el-checkbox-group {
              display: inline-block;
              .el-checkbox-button {
                margin-right: 10px;
                .el-checkbox-button__inner {
                  border-radius: 15px;
                }
              }
            }
          }
        }
      }
    }
  }


</style>
