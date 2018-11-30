<template>
  <div class="creat-episode" @keyup.enter="searchEpisode">
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
    </div>
    <div class="button-wrap">
      <el-button @click="back">返回</el-button>
      <el-button class="next-btn" type="primary" @click="nextStep">下一步</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import mediaChannelIdForplatform from '../../../static/json/mediachannle-platform'
  import steps from './steps-component.vue'
  import header from './header-component.vue'

  const channelMedias = process.env.TEST === 'test' ? mediaChannelIdForplatform.test : mediaChannelIdForplatform.product
  let searchUrl = process.env.TEST === 'test' ? 'https://test-tj.videozhishi.com' : 'https://tj.videozhishi.com'

  export default {
    name: 'creatMediaType',
    data () {
      return {
        searchText: '',
        episodeResult: [],
        selectedEpisode: [],
        mediaChannelId: []
      }
    },
    created () {
      // 判断Vuex中是否有数据
      let planId = this.$store.state.creatData.planId
      let storeEpisode = this.$store.state.creatData.creatEpisode
      // 从vuex中取出平台（移动、pc 、大屏）
      let activeName = this.$store.state.creatData.creatBasice.channel
      if (storeEpisode && activeName) {
        this.selectedEpisode = storeEpisode
        this.mediaChannelId = channelMedias[activeName]
      } else if (planId) {
        this.$http.get('/api2/get_drama_plan', {
          params: {
            plan_id: planId
          }
        }).then(res => {
          if (res.code === 200) {
            this.selectedEpisode = res.data.res1
            this.mediaChannelId = channelMedias[res.data.res2.plan_channel]
          }
        })
      }
    },
    methods: {
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
      async searchEpisode () {
        if (!this.searchText) return
        this.episodeResult = []
        // 搜索识别过的剧集
        let res = await this.$http.get(searchUrl + '/data/search_episode', {
          params: {
            search_text: this.searchText,
            channel_ids: JSON.stringify(this.mediaChannelId)
          }
        })
        // 搜索未识别过的剧集 只在正式服务器上存在。 userType 第二位为1，则要搜索导入的剧集
        let userType = sessionStorage.getItem('user_type')
        let filtedArr = []
        if (userType && userType[1] === '1') {
          let moreRes = await this.$http.get('https://tj.videozhishi.com/data/search_more_episode', {
            params: {
              search_text: this.searchText
            }
          })
          // 过滤以识别接口中存在的数据
          if (moreRes.code === 200) {
            filtedArr = moreRes.data.filter(item => {
              let result = res.data.some(item1 => {
                return item1.name === item.name
              })
              return !result
            })
          }
        }
        this.episodeResult = [...res.data, ...filtedArr]
      },
      // 清空搜索结果
      clearSearchResult () {
        this.episodeResult = []
        this.searchText = ''
      },
      // 下一步
      nextStep () {
        if (this.selectedEpisode.length === 0) {
          this.$router.push('/creatTime')
          return
        }
        this.$http.post('/api2/add_drama_plan', {
          dramas: JSON.stringify(this.selectedEpisode),
          plan_id: this.$store.state.creatData.planId
        }).then(res => {
          if (res.code === 200) {
            this.$store.commit('EPISODE', this.selectedEpisode)
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
