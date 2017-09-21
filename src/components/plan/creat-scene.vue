<template>
  <div class="creat-new2">
    <setps :active="1"></setps>
    <div class="content">
      <creat-header title="场景化投放设置" text="场景投放"></creat-header>
      <div class="target-wrap">
        <module-header-compoent title="广告目标选择（单选）"></module-header-compoent>
        <div class="checkbox-wrap">
          <el-checkbox-group v-model="checkList" :max="2" @change="checkChange">
            <el-checkbox v-for="item in checkData" :label="item.target_name" :key="item.target_id"></el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div class="target-con">
        <div class="target-con-top">
          <module-header-compoent title="场景化内容推荐（多选）"></module-header-compoent>
          <ul class="top-content">
            <li v-for="(item,index) in allPack"
                @click.self="showChild(item,index)"
                :class="{'border-color':index===itemClass}"
                ref="liList">
              <span>{{item.pkg_id_val[0].pkg_name}}</span>
              <el-checkbox
                class="check-box"
                :label="item.pkg_id"
                v-model="checkedClass1Id"
                @change="class1Change(item.pkg_id)">
                {{''}}
              </el-checkbox>
              <div class="child-wrap" v-if="index===itemClass" ref="childwrap">
                <el-checkbox
                  v-model="checkedId"
                  v-for="items in item.pkg_id_val"
                  :label="items.class_id"
                  :key="items.class_id">
                  {{items.class_name}}
                </el-checkbox>
              </div>
            </li>
          </ul>
        </div>
        <!--<div class="target-con-bottom">-->
        <!--<module-header-compoent title="查看全部内容"></module-header-compoent>-->
        <!--</div>-->
      </div>
    </div>
    <div class="button-wrap">
      <el-button @click="back">返回</el-button>
      <el-button class="next-btn" type="primary" @click="nextStep">下一步</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import setps from './steps-component.vue'
  import header from './header-component.vue'
  import moduleHeaderCompoent from './module-header-component'

  export default {
    name: 'creatScene',
    data () {
      return {
        // 左边数据
        checkData: ['上海', '北京', '广州', '深圳'],
        // 左边单选的选中数据
        checkList: [],
        // 右边一级的选中数据
        checkedClass1Id: [],
        // 右边二级的选中数据
        checkedId: [],
        // 右边经过转换后的全部数据
        allPack: '',
        // 显示的二级类数据
        childData: '',
        // 绑定class
        itemClass: ''
      }
    },
    created () {
      // 判断vuex中是否有数据
      let vuexData = this.$store.state.creatData.creatScene
      if (vuexData) {
        this.checkedId = vuexData
      } else if (this.$store.state.creatData.actId) {
        this.$http.post('/api2/get_pkg_info', {
          plan_id: this.$store.state.creatData.actId
        }).then(res => {
          console.log(res)
          if (res.code === 200 && res.data.length > 0) {
            let resData = []
            res.data.forEach(function (item) {
              resData.push(item.class_id)
            })
            this.checkedId = resData
            this.$store.commit('SCENE', resData)
          }
        })
      }
      // 特定的数组去重
      Array.prototype._unique = function () {
        this.sort(function (a, b) {
          return a - b
        })
        var res = [this[0]]
        for (let i = 1; i < this.length; i++) {
          if (this[i] !== res[res.length - 1]) {
            res.push(this[i])
          }
        }
        return res
      }
      // 请求广告目标信息
      this.$http.post('/api2/get_target_list', {
        plan_id: this.$store.state.creatData.actId
      }).then(res => {
        if (res.code === 200) {
          this.checkData = res.data
        }
      })
      //
      this.getAllPkg()
    },
    watch: {},
    methods: {
      // 一级类CheckBox改变
      class1Change (val) {
        const that = this
        if (this.checkedClass1Id.indexOf(val) !== -1) {
          for (let i = 0; i < this.allPack.length; i++) {
            if (this.allPack[i].pkg_id * 1 === val * 1) {
              this.allPack[i].pkg_id_val.forEach(item => {
                that.checkedId.push(item.class_id)
              })
              this.checkedId = this.checkedId._unique()
              console.log(this.checkedId)
              // this.checkedId = this.checkedId.concat(this.allPack[i].pkg_id_val)._unique()
              break
            }
          }
        } else {
          for (let j = 0; j < this.allPack.length; j++) {
            if (this.allPack[j].pkg_id === val) {
              this.allPack[j].pkg_id_val.forEach(function (item) {
                if (that.checkedId.indexOf(item.class_id) !== -1) {
                  console.log(that.checkedId.indexOf(item.class_id))
                  console.log(that.checkedId)
                  // that.checkedId.splice(that.checkedId.indexOf(item.class_id), 1)
                  that.$delete(that.checkedId, that.checkedId.indexOf(item.class_id))
                }
              })
              break
            }
          }
        }
      },
      // 点击liList
      showChild (item, index) {
        this.childData = item
        this.itemClass = index
        this.$refs.liList.forEach(function (item) {
          item.style.marginBottom = '15px'
        })
        this.$refs.liList[index].style.marginBottom = '220px'
      },
      // 请求所有包
      getAllPkg () {
        const that = this
        this.$http.get('/api2/get_all_pkg_info', {
          params: {
            plan_id: that.$store.state.creatData.actId
          }
        }).then(res => {
          if (res.code === 200) {
            // 数据转换
            let arr = res.data
            let key = 'pkg_id'
            arr.sort(function (a, b) {
              return a[key].toString().localeCompare(b[key].toString())
            })
            var resultArr = []
            for (var i = 0, len = arr.length; i < len; i++) {
              if (i > 0 && arr[i][key] === arr[i - 1][key]) {
                resultArr[resultArr.length - 1][key + '_val'].push(arr[i])
              } else {
                var obj = {}
                obj[key] = arr[i][key]
                obj[key + '_val'] = [arr[i]]
                resultArr.push(obj)
              }
            }
            console.log(resultArr)
            this.allPack = resultArr
          }
        })
      },
      checkChange (event) {
        // 使其变为单选
        if (event.length === 2) {
          this.$set(this.checkList, event.splice(0, 1))
        }
      },
      // 下一步
      nextStep () {
        if (this.checkedId.length === 0) {
          this.$alert('请选择一个类', '提示', {
            confirmButtonText: '确定'
          })
          // return
        }
        this.$http.post('/api2/add_pkg_info', {
          plan_id: this.$store.state.creatData.actId,
          cls_id_list: JSON.stringify(this.checkedId)
        }).then(res => {
          if (res.code === 200) {
            debugger
            this.$store.commit('SCENE', this.checkedId)
          }
        })
        this.$router.push('/creatTime')
      },
      back () {
        this.$router.go(-1)
      }
    },
    computed: {},
    components: {
      setps,
      'creat-header': header,
      'module-header-compoent': moduleHeaderCompoent
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .creat-new2 {
    .content {
      width: 100%;
      overflow: hidden;
      padding: 15px 30px;
      padding-bottom: 30px;
      border-bottom: 1px solid #cacaca;
      .target-wrap {
        width: 340px;
        height: 700px;
        background: #f9f9f9;
        padding: 20px 30px;
        float: left;
        .checkbox-wrap {
          width: 100%;
          max-height: 90%;
          overflow-y: auto;
          &::-webkit-scrollbar {
            width: 0;
          }
          .el-checkbox {
            width: 100%;
            height: 40px;
            border: 1px solid #cacaca;
            border-bottom: none;
            margin-left: 0;
            line-height: 40px;
            background: #fff;
            &:nth-last-child(1) {
              border-bottom: 1px solid #cacaca;
            }
            .el-checkbox__input {
              position: relative;
              left: 210px;
            }
          }
        }
      }
      .target-con {
        float: left;
        width: 800px;
        padding: 20px 30px;
        border: 1px solid #f9f9f9;
        border-left: none;
        .target-con-top {
          height: 657px;
          overflow: hidden;
          ul.top-content {
            width: 105%;
            max-height: calc(100% - 43px);
            overflow-y: auto;
            display: flex;
            flex-wrap: wrap;
            li {
              width: 22%;
              height: 50px;
              border: 1px solid #c9c9c9;
              line-height: 50px;
              margin-right: 3%;
              margin-bottom: 15px;
              padding: 0 10px;
              cursor: pointer;
              .check-box {
                float: right;
              }
              &:nth-of-type(4n) {
                .child-wrap {
                  left: -580px;
                }
              }
              &:nth-of-type(4n-2){
                .child-wrap {
                  left: -200px;
                }
              }
              &:nth-of-type(4n-1){
                .child-wrap {
                  left: -390px;
                }
              }
              .child-wrap {
                width: 737px;
                height: 200px;
                padding: 0 20px;
                border: 1px solid #c9c9c9;
                position: relative;
                left: -10px;
                top: 10px;
                transition: all .3s;
                overflow-y: auto;
                .el-checkbox {
                  margin-right: 20px;
                  margin-left: 0 !important;
                }
              }
            }
            .border-color {
              border-color #169bd5;
            }
            .margin-bottom {
              margin-bottom 220px;
            }
          }
        }
      }
    }

  }
</style>
