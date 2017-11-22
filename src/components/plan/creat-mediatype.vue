<template>
  <div class="creat-mediatype">
    <steps :active="2"></steps>
    <div class="creat-media-content">
      <creat-header title="媒体定向" text="视频类型"></creat-header>
      <div class="media-wrap">
        <el-checkbox v-model="isCheckedAll" @change="checkedAll">全选</el-checkbox>
        <div class="item-wrap" v-for="(item,index) in typeData" :class="{active: liClass[index]}"
             @click="clickItem(index, item.type_id)">
          <i :class="item.type_class"></i>
          {{item.type}}
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
      return {
        chosedType: [],
        isCheckedAll: false,
        typeData: null,
        liClass: [false, false, false, false, false, false, false, false, false, false, false, false, false]
      }
    },
    created () {
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
          console.log(res)
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
        this.liClass = [false, false, false, false, false, false, false, false, false, false, false, false, false]
        chosedType.forEach(function (item) {
          that.typeData.forEach(function (aItem, index) {
            if (item === aItem.type_id) {
              that.$set(that.liClass, index, true)
            }
          })
        })
        console.log(this.chosedType)
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
        this.$http.post('/api2/add_class_plan', {
          class_plan: this.chosedType.join(''),
          plan_id: this.$store.state.creatData.planId
        }).then(res => {
          console.log(res)
          if (res.code === 200) {
            this.$store.commit('MEDIATYPE', this.chosedType)
            this.$router.push('/creatTime ')
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
  @import url('../../assets/font/iconfont.css')
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
        margin-bottom: 70px;
        padding-bottom: 60px;
        .el-checkbox {
          position: absolute;
          top: -55px;
          right: 50px;
        }
        .active {
          border-color: #169bd5 !important;
          color: #169bd5 !important;
          background-color: #fff !important;
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
      }
    }
  }


</style>
