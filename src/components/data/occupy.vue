<template>
  <div id="occupy">
    <div class="nav">
      <div class="navname">正在投放广告列表</div>
    </div>
    <div class="form">
      <el-table :data="tableData" stripe border v-loading="tableLoading" style="width: 100%">
        <el-table-column
          :formatter="formatter"
          label="媒体平台"
          width="100"
          align="center"></el-table-column>
        <el-table-column
          :formatter="timeFormatter"
          label="计划时间"
          width="100"
          align="center"></el-table-column>
        <el-table-column
          prop="plan_id"
          label="计划ID"
          width="100"
          align="center"></el-table-column>
        <el-table-column
          prop="plan_name"
          label="计划名称"
          width="100"
          align="center"></el-table-column>
        <el-table-column
          prop="video_id"
          label="视频ID"
          width="100"
          align="center"></el-table-column>
        <el-table-column
          prop="media_name"
          label="占用视频"
          width="146"
          align="center"></el-table-column>
        <el-table-column
          :formatter="classFormatter"
          label="占用视频包含标签"
          width="240"
          align="center"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import media from '../../../static/json/media'
export default {
  name: 'occupy',
  data () {
    return {
      media,
      tableData: [],
      tableLoading: false
    }
  },
  created () {
    this.tableLoading = true
    this.$http.get('/api2/get_occupy_video').then(res => {
      this.tableLoading = false
      if (res.code === 200) {
        this.tableData = res.data
      }
    })
  },
  methods: {
    formatter (row) {
      let currentName = ''
      for (let i in this.media) {
        if (this.media[i].media_id === row.act_channel_id) {
          currentName = this.media[i].media_name
          break
        }
      }
      return currentName
    },
    timeFormatter (row) {
      return this.timeTransform(row.plan_b_time) + '\n' + this.timeTransform(row.plan_e_time)
    },
    classFormatter (row) {
      const allClass = JSON.parse(row.scene)
      let scene = ''
      allClass.forEach(item => {
        const minute = parseInt(item.b_time / (1000 * 60))
        const second = parseInt(item.b_time / 1000) - minute * 60
        scene += '、' + minute + ':' + second + item.class3_name
      })
      return scene.replace(/^、/, '')
    },
    timeTransform (time) {
      return new Date(time).toLocaleDateString().replace(/\/(\d{1,2})/g, '-0$1').replace(/-\d{1}(\d{2})/g, '-$1')
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
#occupy {
  .nav {
    margin: 10px 0;

    .navname {
      font-size: 16px;
      font-family: '微软雅黑';
    }
  }
}
</style>
