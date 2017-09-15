<template>
  <div class="creat-mediatype">
    <steps :active="2"></steps>
    <div class="creat-media-content">
      <creat-header title="媒体定向" text="直投媒体"></creat-header>
      <div class="media-wrap">
        <div class="item-wrap" v-for="item in typeData">
          {{item.type}}
          <el-checkbox v-model="chosedType" :label="item.type_id">{{''}}</el-checkbox>
        </div>
        <div class="item-wrap all-checked">
          全选
          <el-checkbox v-model="isCheckedAll" @change="checkedAll"></el-checkbox>
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

  const mediaType = [{type: '电影', type_id: 'a'}, {type: '电视剧', type_id: 'b'}, {type: '动漫', type_id: 'c'}, {type: '少儿', type_id: 'd'}, {type: '综艺', type_id: 'e'}, {type: '体育', type_id: 'f'}, {type: '音乐', type_id: 'g'}, {type: '电影', type_id: 'h'}, {type: '育儿', type_id: 'i'}, {type: '汽车', type_id: 'j'}, {type: '时尚', type_id: 'k'}]
  export default {
    name: 'creatMediaType',
    data () {
      return {
        chosedType: [],
        isCheckedAll: false,
        typeData: null
      }
    },
    created () {
      // 判断Vuex中是否有数据
      let initData = this.$store.state.creatData.creatMediaType
      if (initData) {
        this.chosedType = initData
      }
      // 获取类型
      this.typeData = mediaType
    },
    methods: {
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
        console.log(this.chosedType)
      },
      // 下一步
      nextStep () {
        if (this.chosedType.length === 0) {
          this.$alert('请选择媒体类型', '提示', {
            confirmButtonText: '确定'
          })
          return
        }
        this.$http.post('/api/add_class_plan', {
          class_plan: this.chosedType.join(''),
          act_id: this.$store.state.creatData.actId
        }).then(res => {
          console.log(res)
          if (res.code === 200) {
            this.$store.commit('MEDIATYPE', this.chosedType)
            this.$router.push('/creatStrategy')
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
          padding-left: 20px;
          line-height 60px;
          position: relative;
          label {
            position absolute;
            right: 15px;
          }
          &:nth-child(4n) {
            margin-right: 0;
          }
        }
        .all-checked {
          width: 100px;
        }
      }
    }
  }


</style>
