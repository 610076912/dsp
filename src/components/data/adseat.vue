<template>
  <div id="adseat">
    <div class="nav">
      <div class="navname">正在投放广告列表</div>
    </div>
    <div class="form">
      <el-table :data="planListData" stripe border v-loading="tableLoading" style="width: 100%">
        <el-table-column prop="time" label="计划推广时间" align="center" :formatter="timeFormatter"></el-table-column>
        <el-table-column prop="plan_id" label="计划ID" align="center"></el-table-column>
        <el-table-column prop="plan_name" label="计划名称" align="center"></el-table-column>
        <el-table-column prop="plan_channel" label="端口" align="center" :formatter="channelFormatter"></el-table-column>
        <el-table-column
          label="功能"
          align="center">
          <template slot-scope="scope">
            <span class="chakan"
                  @click="toDetail(scope.row.plan_id, scope.row.plan_channel, scope.row.plan_name)">查看广告位</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="currentPage"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="planListDataTotal">
      </el-pagination>
    </div>
    <el-dialog :title="'计划ID：' + dialogTitlePlanId + ' / 计划名称：' + dialogTitlePlanName + ' / 广告位列表'"
               :visible.sync="dialogTableVisible">
      <div class="search-wrap">
        <span>请选择渠道：</span>
        <el-select v-model="platform" size="small" placeholder="请选择">
          <el-option
            v-for="item in selectOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input v-model="mediaName" icon="search" size="small" placeholder="视频名称"></el-input>
        <el-input v-model="class3Name" icon="search" size="small" placeholder="三级标签"></el-input>
        <el-button type="primary" size="small" @click="adSeatBtn">搜索</el-button>
      </div>
      <el-table :data="adSeatData" border v-loading="dialogTableLoading">
        <el-table-column prop="media_name" label="视频名称" align="center"></el-table-column>
        <el-table-column prop="video_id" label="视频ID" align="center"></el-table-column>
        <el-table-column prop="class3_name" label="三级标签" align="center"></el-table-column>
        <el-table-column prop="ad_seat_b_time" label="展示时间点" align="center"
                         :formatter="dialogTimeFormatter"></el-table-column>
      </el-table>
      <el-pagination
        @size-change="dialogSizeChange"
        @current-change="dialogCurrentPage"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="10"
        layout="sizes, total, prev, pager, next"
        :total="dialogDataTotal">
      </el-pagination>
    </el-dialog>
  </div>
</template>

<script>
  import mediaChannelIdForplatform from '../../../static/json/mediachannle-platform'
  import media from '../../../static/json/media'

  const channelMedias = process.env.TEST === 'test' ? mediaChannelIdForplatform.test : mediaChannelIdForplatform.product
  export default {
    name: 'adseat',
    data () {
      return {
        tableLoading: false,
        planListData: [],
        planListDataTotal: 0,
        // dialog开关
        dialogTableVisible: false,
        dialogTableLoading: false,
        // dialog表格数据
        dialogDataTotal: 0,
        adSeatData: [],
        selectOptions: [],
        platform: '',
        mediaName: '',
        class3Name: '',
        // 该计划在那个平台投放
        platformArr: [],
        // dialog表格当前页
        dialogTableCurrentPage: 1,
        dialogTablePageSize: 10,
        // dialog标题
        dialogTitlePlanId: '',
        dialogTitlePlanName: ''
      }
    },
    created () {
      this.getPlanListData()
    },
    methods: {
      // 获取一级列表数据
      getPlanListData (page = 1) {
        this.tableLoading = true
        this.$http.get('/api2/ad_seat_list', {
          params: {
            page: page
          }
        }).then(res => {
          if (res.code === 200) {
            this.planListData = res.data
            this.planListDataTotal = res.total
          }
          this.tableLoading = false
        })
      },
      // 一级分页
      currentPage (page) {
        this.getPlanListData(page)
      },
      // 查看广告位
      toDetail (planId, planChannel, planName) {
        // 清空上次查询数据
        this.platform = ''
        this.mediaName = ''
        this.class3Name = ''
        this.dialogTableCurrentPage = 1
        this.dialogTablePageSize = 10
        this.dialogTitlePlanId = planId
        this.dialogTitlePlanName = planName
        // 根据端口确定改计划都有哪些平台。
        this.selectOptions = []
        this.platformArr = channelMedias[planChannel]
        this.platformArr.forEach(item => {
          for (let i = 0; i < media.length; i++) {
            if (item === media[i].media_id) {
              let obj = {
                value: item,
                label: media[i].media_name
              }
              this.selectOptions.push(obj)
              break
            }
          }
        })
        this.dialogTableVisible = true
        this.getAdSeatData()
      },
      getAdSeatData () {
        // 获取广告位表格数据
        this.dialogTableLoading = true
        this.$http.get('/api2/ad_seat_detail', {
          params: {
            plan_id: this.dialogTitlePlanId,
            media_channel_id: JSON.stringify(this.platformArr),
            user_select_channel: this.platform,
            video_name: this.mediaName,
            class3: this.class3Name,
            page: this.dialogTableCurrentPage,
            pageNum: this.dialogTablePageSize
          }
        }).then(res => {
          if (res.code === 200) {
            this.adSeatData = res.data
            this.dialogDataTotal = res.total
          }
          this.dialogTableLoading = false
        })
      },
      // 搜索按钮
      adSeatBtn () {
        this.getAdSeatData()
      },
      // 广告位表格每页显示条数变化
      dialogSizeChange (size) {
        this.dialogTablePageSize = size
        this.getAdSeatData()
      },
      // 广告位分页
      dialogCurrentPage (page) {
        this.dialogTableCurrentPage = page
        this.getAdSeatData()
      },
      // 时间格式化
      timeFormatter (row) {
        return new Date(row.plan_b_time).Format('yyyy-MM-dd') + ' -- ' + new Date(row.plan_e_time).Format('yyyy-MM-dd')
      },
      // dialog展示时间格式化
      dialogTimeFormatter (row) {
        return new Date(row.ad_seat_b_time).Format('mm:ss')
      },
      // 端口格式化
      channelFormatter (row) {
        let res = ''
        switch (row.plan_channel) {
          case 1:
            res = '移动端'
            break
          case 2:
            res = 'PC端'
            break
          case 3:
            res = '大屏端'
            break
          case 4:
            res = '短视频'
            break
          case 5:
            res = '百视通'
            break
          default:
            res = '未知端口'
        }
        return res
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  #adseat {
    .el-dialog {
      .search-wrap {
        width: 100%;
        height: 60px;
        overflow: hidden;
        background: #F2F2F2;
        padding: 15px 20px;

        .el-input {
          width: 230px;
        }

        .el-button {
          margin-left: 15px;
        }
      }
    }

    .chakan {
      color: #169bd5;
      cursor: pointer;
    }

    .el-pagination {
      padding: 19px 0px;
      text-align: right;
    }

    .nav {
      margin: 10px 0;

      .navname {
        font-size: 16px;
        font-family: '微软雅黑';
      }
    }
  }
</style>
