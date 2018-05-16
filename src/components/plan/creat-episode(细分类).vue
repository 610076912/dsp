<!--剧集定向，视频细分类完成基本功能，接口还差存储-->
<template>
  <div class="creat-episode">
    <steps :active="2"></steps>
    <div class="creat-media-content">
      <h3>视频定向</h3>
      <div class="top">
        <div class="selected-wrap" v-show="selectedEpisode.length">
          <span class="selected-title">已选视频（<span> {{selectedEpisode.length}} </span>）个</span>
          <span class="clear-selected" @click="clearSelected"><i class="el-icon-delete2"></i>清空已选视频</span>
          <ul>
            <li v-for="item in selectedEpisode">{{item.name}}<i class="el-icon-close"
                                                                @click="delSelected(item.name)"></i></li>
          </ul>
        </div>
        <span class="model-name">指定投放视频</span>
        <div class="search-wrap">
          <el-input v-model="searchText" placeholder="请输入内容">
            <el-button slot="append" icon="search" size="mini" type="primary" @click="searchEpisode">搜索</el-button>
          </el-input>
        </div>
        <div class="result-wrap">
          <span class="search-title">全部：（<span> {{episodeResult.length}} </span>）个视频搜索结果</span>
          <span class="clear-search" @click="clearSearchResult"><i class="el-icon-delete2"></i>清空搜索结果</span>
          <ul class="search-result">
            <li v-for="item in episodeResult" @click="clickSearchResult(item)">{{item.name}}</li>
          </ul>
        </div>
      </div>
      <div class="bottom">
        <span class="model-name">选择视频分类</span>
        <div class="media-type-wrap">
          <div class="pindao-wrap">
            频道：
            <el-badge v-for="item in videoClass.dramas" :label="item.drama_id" :value="badge[item.drama_id]" class="item">
              <el-button size="small" @click="pinDaoClick(item)" :class="{active: currentPinDao === item.drama_id}">
                {{item.drama_name}}
              </el-button>
            </el-badge>
          </div>
          <div class="other-wrap">
            地区：
            <el-button size="small">全部</el-button>
            <el-checkbox-group size="small" v-model="country">
              <el-checkbox-button v-for="item in videoClass.countrys" :label="item.code">{{item.country}}
              </el-checkbox-button>
            </el-checkbox-group>
          </div>
          <div class="other-wrap">
            类型：
            <el-button size="small">全部</el-button>
            <el-checkbox-group size="small" v-model="subVideoClass">
              <el-checkbox-button v-for="item in currentSubVideoClass" :label="item.drama_type_id"
                                  @change="subVideoClassChange">{{item.drama_type_name}}
              </el-checkbox-button>
            </el-checkbox-group>
          </div>
          <div class="other-wrap">
            年代：
            <el-button size="small">全部</el-button>
            <el-checkbox-group size="small" v-model="years">
              <el-checkbox-button v-for="item in videoClass.years" :label="item.name">{{item.name}}</el-checkbox-button>
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
  import steps from './steps-component.vue'
  import header from './header-component.vue'

  export default {
    name: 'creatMediaType',
    data () {
      return {
        searchText: '',
        episodeResult: [],
        selectedEpisode: [],
        // 获取到的地区、类型、年代数据
        videoClass: {},
        currentPinDao: 'a',
        currentSubVideoClass: [],
        // 选中的视频二级分类
        subVideoClass: [],
        country: [],
        years: [],
        // 角标
        badge: {}
      }
    },
    created () {
      // 判断Vuex中是否有数据
      // let planId = this.$store.state.creatData.planId
      this.$http.get('/api2/video_class').then(res => {
        console.log(res)
        this.videoClass = res
        this.currentSubVideoClass = res.dramas[0].drama
        res.dramas.forEach(item => {
          this.badge[item.drama_id] = 0
        })
        console.log(this.badge)
      })
    },
    methods: {
      subVideoClassChange (arg) {
        this.videoClass.dramas.forEach(item => {
          this.badge[item.drama_id] = 0
        })
        for (let i in this.badge) {
          this.subVideoClass.forEach(item => {
            if (item[0] === i) {
              this.badge[i]++
            }
          })
        }
      },
      // 频道按钮点击
      pinDaoClick (arg) {
        console.log(arg)
        this.currentPinDao = arg.drama_id
        this.currentSubVideoClass = arg.drama
      },
      // 点击搜索结果
      clickSearchResult (data) {
        let has = this.selectedEpisode.some(item => {
          return item.name === data.name
        })
        if (has) return
        this.selectedEpisode.push(data)
      },
      // 清空已选
      clearSelected () {
        this.selectedEpisode = []
      },
      // 删除单个已选视频
      delSelected (name) {
        this.selectedEpisode.forEach((item, index) => {
          if (item.name === name) {
            this.selectedEpisode.splice(index, 1)
            return
          }
        })
      },
      // 搜索
      searchEpisode () {
        this.$http.get('http://192.168.1.106:3889/data/search_episode', {
          params: {
            search_text: this.searchText
          }
        }).then(res => {
          console.log(res)
          this.episodeResult = res.data
        })
      },
      // 清空搜索结果
      clearSearchResult () {
        this.episodeResult = []
        this.searchText = ''
      },
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
        margin-bottom: 40px;
        .selected-wrap {
          width: 100%;
          height: 150px;
          padding: 10px;
          border: 1px solid #e4e4e4;
          margin-bottom: 10px
          ul {
            display: flex;
            flex-wrap: wrap;
            overflow-y: auto;
            height: 115px;
            padding: 8px 0;
            li {
              width: auto;
              height: 30px;
              padding: 6px 15px;
              background-color: #169bd5;
              color: #fff;
              margin: 0 10px 10px 0;
              i {
                font-size: 8px;
                position: relative;
                top: -6px;
                right: -10px;
                cursor: pointer;
              }
            }
          }
          .clear-selected {
            float: right;
            vertical-align: top;
            cursor: pointer;
            i {
              vertical-align: bottom;
              padding-right: 3px;
            }
          }
        }
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
          .search-result {
            display: flex
            align-items: flex-start;
            flex-wrap: wrap
            padding: 10px 0;
            overflow-y: auto;
            height: 100px;
            li {
              height: 28px;
              padding: 3px 5px;
              border: 1px solid #e4e4e4;
              margin: 0 8px 5px 0;
              cursor: pointer;
            }
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
          .other-wrap {
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
              max-width: 1000px;
              vertical-align: top;
              display: inline-block;
              .el-checkbox-button {
                margin-right: 10px;
                margin-bottom: 10px;
                .el-checkbox-button__inner {
                  border-radius: 15px;
                  border-left: 1px solid rgb(191, 207, 217);
                }
              }
              .is-checked .el-checkbox-button__inner {
                border-left: 1px solid rgba(0, 0, 0, 0);
              }
            }
          }
          .pindao-wrap {
            margin-bottom: 20px;
            .el-badge {
              margin-right: 18px;
            }
            .active {
              border-color: #169bd5;
              color: #169bd5;
            }
            .el-button {
              border-radius: 15px;
            }
          }
        }
      }
    }
  }


</style>
