<template>
  <div class="creat-mediatype">
    <steps :active="2"></steps>
    <div class="creat-media-content">
      <creat-header title="媒体定向" text="视频类型"></creat-header>
      <div class="media-wrap">
        <el-checkbox v-model="isCheckedAll" @change="checkedAll">全选</el-checkbox>
        <div class="new-item-wrap">
          <div class="all-video-num">
            已选分类视频总量：<b>{{ videoNum }}</b>
          </div>
          <div class="wrap-content">
            <div class="items"
                 v-for="(item,index) in typeData"
                 :class="{active: liClass[index]}"
                 @click="clickItem(index, item.type_id)">
              {{item.type}}
            </div>
          </div>
        </div>
        <el-table
          v-loading="loading"
          :data="tableData"
          border style="width: 100%">
          <el-table-column
            type="index"
            label="序"
            width="70"
            align="center">
          </el-table-column>
          <el-table-column
            prop="video_name"
            label="已选分类典型视频"
            width="588"
            align="center">
          </el-table-column>
          <el-table-column
            prop="video_class"
            label="视频分类"
            width="240"
            align="center">
          </el-table-column>
          <el-table-column
            prop="video_type"
            label="视频类型"
            width="240"
            align="center">
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            layout="total, prev, pager, next"
            @current-change="currentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            :total="pageTotal">
          </el-pagination>
        </div>

        <!--<div class="item-wrap" v-for="(item,index) in typeData" :class="{active: liClass[index]}"
             @click="clickItem(index, item.type_id)">
          <i :class="item.type_class"></i>
          {{item.type}}
        </div>-->
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
      return {
        chosedType: [],
        isCheckedAll: false,
        typeData: null,
        liClass: [false, false, false, false, false, false, false, false, false, false, false, false, false],
        videoNum: 0,
        loading: true,
        tableData: [],
        allDate: {},
        currentPage: 0,
        pageSize: 15,
        pageTotal: 0,
        mediaTypeVideoTop: []
      }
    },
    created () {
      // 获取视频TOP
      this.$http.get('/api2/get_video_top').then(res => {
        if (res.code === 200) {
          this.mediaTypeVideoTop = res.data
          this.mediaTypeVideoTop.forEach(item => {
            for (let i in mediaType) {
              if (item.video_type === mediaType[i].type) {
                item.video_type_id = mediaType[i].type_id
                break
              }
            }
          })
          this.reloadClassArr(this.chosedType)
        }
        this.loading = false
      })

      // 判断Vuex中是否有数据
      let initData = this.$store.state.creatData.creatMediaType
      if (initData) {
        this.chosedType = initData
      } else if (this.$store.state.creatData.planId) {
        this.$http.get('/api2/get_class_plan', {
          params: {
            plan_id: this.$store.state.creatData.planId
          }
        }).then(res => {
          if (res.code === 200) {
            this.chosedType = res.data.class_plan.split('')
            this.$store.commit('MEDIATYPE', this.chosedType)
          }
        })
      }
      // 获取类型
      this.typeData = mediaType
    },
    watch: {
      chosedType: {
        handler: 'reloadClassArr',
        deep: true
      }
    },
    methods: {
      // 根据获取的chosedType来改变class数组
      reloadClassArr (chosedType) {
        const that = this
        that.videoNum = 0
        let allVideo = []
        this.liClass = [false, false, false, false, false, false, false, false, false, false, false, false, false]
        chosedType.forEach(function (item) {
          that.typeData.forEach(function (aItem, index) {
            if (item === aItem.type_id) {
              that.$set(that.liClass, index, true)
              // 计算视频数量
              that.videoNum += parseInt(aItem.video_num * 1.1)
            }
          })
          that.mediaTypeVideoTop.forEach(current => {
            if (item === current.video_type_id) {
              allVideo.push(current)
            }
          })
        })
        that.arrGroup(allVideo)
      },
      arrGroup (allVideo) {
        this.currentPage = 1
        this.pageTotal = allVideo.length
        let Page = 0
        if (allVideo.length > 0) {
          allVideo.forEach((item, index) => {
            if ((index % 15) === 0) {
              Page++
              this.allDate['page' + Page] = []
              this.allDate['page' + Page].push(item)
            } else {
              this.allDate['page' + Page].push(item)
            }
          })
          this.tableData = this.allDate.page1
        } else {
          this.tableData = []
        }
      },
      currentChange (val) {
        this.tableData = this.allDate['page' + val]
      },
      // 点击标签
      clickItem (index, typeId) {
        this.$set(this.liClass, index, !this.liClass[index])
        let indexof = this.chosedType.indexOf(typeId)
        if (this.liClass[index] && indexof === -1) {
          this.chosedType.push(typeId)
        } else {
          if (indexof !== -1) {
            this.chosedType.splice(indexof, 1)
          }
        }
      },
      // 全选
      checkedAll () {
        if (this.isCheckedAll) {
          let res = []
          this.typeData.forEach(function (item) {
            res.push(item.type_id)
          })
          this.chosedType = res
        } else {
          this.chosedType = []
        }
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
            this.$router.push('/creatEpisode')
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
  .creat-mediatype {
    .creat-media-content {
      width: 100%;
      padding: 0 30px;
      border-bottom: 1px solid #e4e4e4;
      .media-wrap {
        width: 100%;
        min-height: 280px;
        position: relative;
        padding: 10px 0;
        .el-checkbox {
          position: absolute;
          top: -55px;
          right: 50px;
        }
        .active {
          border-color: #169bd5 !important;
          color: #fff !important;
          background-color: #169bd5 !important;
        }
        .item-wrap {
          width: 14%;
          height: 50px;
          float: left;
          background: #f2f2f2;
          color: #515151;
          margin-right: 35px;
          border: 1px solid #797979;
          border-radius: 3px;
          margin-bottom: 24px;
          padding-left: 20px;
          line-height 50px;
          position: relative;
          text-indent: 10px;
          font-size: 18px;
          cursor: pointer;
          transition: all .5s;
          i {
            font-size: 24px;
          }
          &:nth-of-type(6n) {
            margin-right: 0;
          }
        }
        .new-item-wrap {
          width 100%;
          height 100px;
          .all-video-num {
            width: 300px;
            height: 60px;
            float: left;
            border: 1px solid #169bd5;
            border-radius: 2px;
            line-height: 56px;
            text-align: center;
            b {
              font-size: 22px;
              color: #169bd5;
              position: relative;
              top: 3px;
            }
          }
          .wrap-content {
            width: 840px;
            height: 100%;
            float: right;
            padding-left: 24px;
            .items {
              width: 92px;
              height: 25px;
              border: 1px solid #ddd;
              border-radius: 2px;
              text-align: center;
              line-height: 23px;
              color: #444;
              margin: 0 0 10px 10px;
              float: left;
              cursor: pointer;
            }
          }
        }
        .pagination {
          wdith: 100%;
          text-align: center;
          margin: 30px 0;
        }
      }
    }
  }


</style>
