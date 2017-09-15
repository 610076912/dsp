<template>
  <div class="creat-media">
    <steps :active="2"></steps>
    <div class="creat-media-content">
      <creat-header title="媒体定向" text="直投媒体"></creat-header>
      <div class="media-wrap">
        <div class="item-wrap" v-for="item in medias">
          <img src="../../assets/img/aiqiyi.png" alt="">
          <el-checkbox v-model="item.checked"></el-checkbox>
        </div>
        <div class="item-wrap all-checked">
          全选
          <el-checkbox v-model="allChecked" @change="allCheck"></el-checkbox>
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
  import medias from '@/assets/json/media.json'

  export default {
    name: 'creatMedia',
    data () {
      return {
        medias: medias,
        allChecked: false
      }
    },
    created () {
      // 获取媒体定向信息
      this.$http.get('/api/get_media_plan', {
        params: {
          act_id: 10
        }
      }).then(res => {
        if (res.code === 200) {
          for (let i in this.medias) {
            if (new RegExp(this.medias[i].media_id).test(res.data.media_plan)) {
              this.medias[i].checked = true
            }
          }
        }
      })
    },
    methods: {
      // 下一步
      nextStep () {
        const checkedMedia = []
        this.medias.forEach(item => { if (item.checked) checkedMedia.push(item.media_id) })
        // 提交媒体定向
        this.$http.post('/api/add_media_plan', {
          act_id: 10,
          media_plan: checkedMedia.join('')
        }).then(res => {
          this.$router.push('/creatMediaType')
        })
      },
      back () {
        this.$router.go(-1)
      },
      allCheck () {
        this.allChecked ? this.medias.map(item => { item.checked = true }) : this.medias.map(item => { item.checked = false })
      }
    },
    watch: {
      medias: {
        handler: function (val) {
          val.some(item => { return item.checked === false }) ? this.allChecked = false : this.allChecked = true
        },
        deep: true
      }
    },
    components: {
      steps,
      'creat-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .creat-media {
    .creat-media-content {
      width: 100%;
      padding: 0 30px;
      border-bottom: 1px solid #e4e4e4;
      .media-wrap {
        width: 100%;
        min-height: 250px;
        position: relative;
        padding: 10px 0;
        overflow: hidden;
        margin-bottom: 70px;
        padding-bottom: 60px;
        .item-wrap {
          width: 23%;
          height: 60px;
          float: left;
          margin-right: 30px;
          border: 1px solid #e4e4e4;
          margin-bottom: 24px;
          img {
            width: 85%;
            height: 100%;
          }
          &:nth-child(4n) {
            margin-right: 0;
          }
        }
        .all-checked {
          width: 100px;
          text-align center;
          line-height 60px;
          label {
            margin-left: 15px;
          }
        }
      }
    }
  }


</style>
