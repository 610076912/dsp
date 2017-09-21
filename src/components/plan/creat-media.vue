<template>
  <div class="creat-media">
    <steps :active="2"></steps>
    <div class="creat-media-content">
      <creat-header title="媒体定向" text="直投媒体"></creat-header>
      <div class="media-wrap">
        <el-checkbox-group v-model="checkedMedia">
          <div class="item-wrap" v-for="item in medias">
            <img :src="item.media_url" :alt="item.media_name" :title="item.media_name">
            <el-checkbox :label="item.media_id" :key="item.media_id">{{''}}</el-checkbox>
          </div>
        </el-checkbox-group>
        <div class="item-wrap all-checked">
          全选
          <el-checkbox v-model="allChecked" @change="allCheck"></el-checkbox>
        </div>
      </div>
    </div>
    <div class="button-wrap">
      <el-button @click="back">返回</el-button>
      <el-button class="next-btn" type="primary" @click="nextStep" :loading="btnLoading">下一步</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import steps from './steps-component.vue'
  import header from './header-component.vue'
  import medias from '@/assets/json/media.json'

  export default {
    data () {
      return {
        // 活动id
        planId: this.$store.state.creatData.planId,
        // 媒体列表
        medias: medias,
        // 全部媒体id
        allMediaId: [],
        // 已选媒体id
        checkedMedia: [],
        allChecked: false,
        btnLoading: false
      }
    },
    created () {
      this.medias.forEach(item => { this.allMediaId.push(item.media_id) })
      if (this.planId) {
        if (!this.$store.state.creatData.creatMedia) {
          // 获取媒体定向信息
          this.$http.get('/api2/get_media_plan', {
            params: {
              plan_id: this.planId
            }
          }).then(res => {
            if (res.code === 200) {
              const result = []
              res.data.forEach(item => { result.push(item.act_channel_id) })
              this.checkedMedia = result
              this.$store.commit('MEDIA', result)
            }
          })
        } else {
          this.checkedMedia = this.$store.state.creatData.creatMedia
        }
      }
    },
    methods: {
      // 下一步
      nextStep () {
        this.btnLoading = true
        // 提交媒体定向
        this.$http.post('/api2/add_media_plan', {
          plan_id: this.planId,
          channel_id_list: JSON.stringify(this.checkedMedia)
        }).then(res => {
          if (res.code === 200) {
            this.$store.commit('MEDIA', this.checkedMedia)
            this.$router.push('/creatMediaType')
          }
          this.btnLoading = false
        })
      },
      back () {
        this.$router.go(-1)
      },
      allCheck (event) {
        this.checkedMedia = event.target.checked ? this.allMediaId : []
      }
    },
    watch: {
      checkedMedia () {
        this.checkedMedia.length === this.allMediaId.length ? this.allChecked = true : this.allChecked = false
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
            display: inline-block
            width: 160px;
            margin: 0 30px 0 20px
            height: 100%;
            line-height: 60px
            font-size: 16px
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
