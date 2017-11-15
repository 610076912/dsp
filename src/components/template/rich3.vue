<template>
  <div class="">

  </div>
</template>

<script>
  export default {
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        dialogFormVisible: false,
        tableData: [],
        formLabe: {
          img_url: '', // 图片地址
          click_url: '', // 链接地址
          img_sizeH: '', // 图片高度
          img_sizeW: '', // 图片宽度
          material_platform: 0, // 广告投放平台，默认0 PC
          location: '' // 图片位置
        },
        checkList: ['iPhone'],
        options: [
          {
            value: '1',
            label: '左侧滑入滑出'
          },
          {
            value: '2',
            label: '淡入淡出'
          }
        ],
        value: ''
      }
    },
    methods: {
// 查询状态
      queryState: function () {
        alert('稍后查询！')
      },
// 添加广告
      addAD: function () {
        var size = this.formLabe.img_sizeW + '*' + this.formLabe.img_sizeH
        this.$ajax({
          method: 'post',
          url: '/api/baofeng/addAd',
          data: {
            img_size: size,
            click_url: this.formLabe.click_url,
            img_url: this.formLabe.img_url
          }
        })
          .then(res => {
            console.log(res)
          })
          .catch(error => {
            console.log(error)
          })
      },
// 修改广告
      change: function (val) {
        console.log(val)
        this.dialogFormVisible = true
      },
// 发审广告
      audit: function (val) {
        console.log(val)
      },
// 发布广告
      publish: function (val) {
        this.$ajax({
          method: 'post',
          url: '/api/baofeng/publish',
          data: {id: val}
        }).then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: '发布成功！',
              type: 'success'
            })
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
// 取消发布
      Unpublish: function (val) {
        this.$ajax({
          method: 'post',
          url: '/api/baofeng/cancelPub',
          data: {id: val}
        }).then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: '取消发布成功！',
              type: 'success'
            })
          } else {
            this.$message.error(res.data.msg)
          }
        })
      }
    },
    created () {
// 加载 获取数据
      this.$ajax({
        method: 'get',
        url: '/api//baofeng/getAdsList'
      })
        .then(response => {
          if (response.data.code === 200) {
            this.tableData = response.data.data
            console.log(response.data.data)
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">

</style>
