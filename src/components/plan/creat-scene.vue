<template>
  <div class="creat-new2">
    <setps :active="1"></setps>
    <div class="content">
      <creat-header title="场景化投放设置" text="场景投放"></creat-header>
      <div class="class-wrap">
        <ul>
          <li v-for="(item, i) in allPack"
              :class="{active: (i === liActindex)}"
              @click="class1Click(i, item.class2Arr)"><i class="el-icon-edit"></i>{{item.class1_name}}
          </li>
        </ul>
        <div class="class2-wrap">
          <el-checkbox-button v-model="seeAllBtn[0]" class="seeAll" v-show="liActindex===0" :label="0">查看所有子分类
          </el-checkbox-button>
          <el-checkbox-button v-model="seeAllBtn[1]" class="seeAll" v-show="liActindex===1" :label="1">查看所有子分类
          </el-checkbox-button>
          <el-checkbox-button v-model="seeAllBtn[2]" class="seeAll" v-show="liActindex===2" :label="2">查看所有子分类
          </el-checkbox-button>
          <el-checkbox-button v-model="seeAllBtn[3]" class="seeAll" v-show="liActindex===3" :label="3">查看所有子分类
          </el-checkbox-button>
          <el-checkbox-button v-model="seeAllBtn[4]" class="seeAll" v-show="liActindex===4" :label="4">查看所有子分类
          </el-checkbox-button>
          <ul class="class2-cont">
            <li v-for="class2 in class2Arr"
                :class="{active: (class2PkgId[liActindex].includes(class2.pkg_id))}"
                @click="class2Click(class2.pkg_id, class2.valueArr)">{{class2.class_name}}
            </li>
          </ul>
        </div>
      </div>
      <div class="content-wrap">
        <div class="header">子分类</div>
        <ul class="cont">
          <li v-for="(item, index) in class2Data[liActindex]">
            <el-checkbox v-model="checkedAll[index]" @change="class2Checkedbox(item, index)">全选</el-checkbox>
            <span>{{item[0].pkg_name}}</span>
            <ul class="class3-cont">
              <li
                v-for="class3 in item"
                @click="class3Click(class3)"
                :class="{active: (checkedArr.includes(class3.class_id))}">{{class3.class_name}}
              </li>
            </ul>
          </li>
        </ul>
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
        // 全选数据
        checkedAll: [],
        seeAllBtn: [false, false, false, false, false],
        liActindex: 0,
        class2Arr: [],
        // 记录数据，用来在子分类中展示
        class2PkgId: {
          0: [],
          1: [],
          2: [],
          3: [],
          4: []
        },
        // 记录数据，用来在子分类中展示
        class2Data: {
          0: [],
          1: [],
          2: [],
          3: [],
          4: []
        },
        allPack: [],
        // 选中的结果
        checkedArr: []
      }
    },
    created () {
      // 判断vuex中是否有数据
      let vuexData = this.$store.state.creatData.creatScene
      if (vuexData) {
        console.log(vuexData)
        this.getAllPkg()
        this.checkedArr = vuexData.checkedArr
        this.class2Data = vuexData.class2Data
        this.class2PkgId = vuexData.class2PkgId
        // 分开写 提升从session里那数据时的展示速度。
      } else if (this.$store.state.creatData.planId) {
        this.$http.post('/api2/get_pkg_info', {
          plan_id: this.$store.state.creatData.planId
        }).then(res => {
          if (res.code === 200 && res.data.length > 0) {
            const that = this
            res.data.forEach(item => {
              this.checkedArr.push(item.class_id)
            })
            // 请求接口拿数据时必须要等到拿到所有包数据以后执行
            this.getAllPkg(function () {
              res.data.forEach(function (item) {
                let class1 = Math.floor(item.pkg_id / 1000)
                let class2Data
                that.allPack[class1 - 1].class2Arr.forEach(class2 => {
                  if (class2.pkg_id === item.pkg_id) {
                    class2Data = class2.valueArr
                    if (!that.class2Data[class1 - 1].includes(class2Data)) {
                      that.class2Data[class1 - 1].push(class2Data)
                    }
                  }
                })
              })
              console.log(that.checkedArr, that.class2Data)
            })
          } else {
            this.getAllPkg()
          }
        })
      }
    },
    watch: {
      // 查看所有子类
      seeAllBtn: {
        handler: function (val) {
          // const that = this
          val.forEach((item, i) => {
            if (item) {
              this.class2PkgId[i] = []
              this.class2Data[i] = []
              this.allPack[i].class2Arr.forEach(item1 => {
                this.class2PkgId[i].push(item1.pkg_id)
                this.class2Data[i].push(item1.valueArr)
              })
            } else {
              this.class2PkgId[i] = []
              this.class2Data[i] = []
            }
          })
        },
        deep: true
      }
    },
    methods: {
      // 全选
      class2Checkedbox (val, index) {
        console.log(val, index)
        console.log(this.checkedAll[index])
        if (this.checkedAll[index]) {
          val.forEach(item => {
            if (!this.checkedArr.includes(item.class_id)) {
              this.checkedArr.push(item.class_id)
            }
          })
        } else {
          val.forEach(item => {
            let i = this.checkedArr.indexOf(item.class_id)
            if (i !== -1) {
              this.checkedArr.splice(i, 1)
            }
          })
        }
      },
      class1Click (index, class2Arr) {
        this.liActindex = index
        this.class2Arr = class2Arr
      },
      class2Click (pkgId, data) {
        console.log(pkgId)
        console.log(this.class2PkgId)
        let index = this.class2PkgId[this.liActindex].indexOf(pkgId)
        console.log(index)
        if (index === -1) {
          this.class2Data[this.liActindex].push(data)
          this.class2PkgId[this.liActindex].push(pkgId)
        } else {
          this.class2Data[this.liActindex].splice(index, 1)
          this.class2PkgId[this.liActindex].splice(index, 1)
        }
      },
      class3Click (data) {
        let index = this.checkedArr.indexOf(data.class_id)
        if (index === -1) {
          this.checkedArr.push(data.class_id)
        } else {
          this.checkedArr.splice(index, 1)
        }
      },
      // 请求所有包
      getAllPkg (callback) {
        const that = this
        this.$http.get('/api2/get_all_pkg_info', {
          params: {
            plan_id: that.$store.state.creatData.planId
          }
        }).then(res => {
          if (res.code === 200) {
            console.log(res)
            // 数据转换
            let arr = res.data
            let key = 'pkg_id'
            arr.sort(function (a, b) {
              return a[key].toString().localeCompare(b[key].toString())
            })
            var resultArr = []
            // 分出物体、场景、行为、明星、自定义场景类  class1
            for (var i = 0, len = arr.length; i < len; i++) {
              if (i > 0 && Math.floor(arr[i][key] / 1000) === Math.floor(arr[i - 1][key] / 1000)) {
                resultArr[resultArr.length - 1]['valueArr'].push(arr[i])
              } else {
                var obj = {}
                // obj.class_name = arr[i].pkg_name
                obj['valueArr'] = [arr[i]]
                switch (Math.floor(arr[i][key] / 1000)) {
                  case 1:
                    obj.class1_name = '物体'
                    break
                  case 2:
                    obj.class1_name = '场景'
                    break
                  case 3:
                    obj.class1_name = '行为'
                    break
                  case 4:
                    obj.class1_name = '明星'
                    break
                  case 9:
                    obj.class1_name = '自定义场景'
                    break

                }
                resultArr.push(obj)
              }
            }
            // 分出class2类
            resultArr.forEach((class1) => {
              class1.class2Arr = []
              class1.valueArr.forEach((item, index, class2) => {
                if (index > 0 && class2[index]['pkg_id'] === class2[index - 1]['pkg_id']) {
                  class1.class2Arr[class1.class2Arr.length - 1]['valueArr'].push(class2[index])
                } else {
                  var obj = {}
                  obj.class_name = class2[index].pkg_name
                  obj.pkg_id = class2[index].pkg_id
                  obj['valueArr'] = [class2[index]]
                  class1.class2Arr.push(obj)
                }
              })
            })
            this.allPack = resultArr
            // 默认物体class2数据
            this.class2Arr = resultArr[0].class2Arr
            // 回调~
            if (callback) callback()
            console.log(resultArr)
          }
        })
      },
      // 下一步
      nextStep () {
        let checkedNodes = this.checkedArr
        if (checkedNodes.length === 0) {
          this.$alert('请选择一个类', '提示', {
            confirmButtonText: '确定'
          })
          return
        }
        this.$http.post('/api2/add_pkg_info', {
          plan_id: this.$store.state.creatData.planId,
          cls_id_list: JSON.stringify(checkedNodes)
        }).then(res => {
          if (res.code === 200) {
            this.$store.commit('SCENE', {
              class2PkgId: this.class2PkgId, class2Data: this.class2Data, checkedArr: this.checkedArr
            })
            this.$router.push('/creatMediaType')
          }
        })
      },
      back () {
        this.$router.go(-1)
      }
    },
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
      .class-wrap {
        width: 100%;
        background: #F2F2F2;
        padding: 3px;
        overflow: hidden;
        & > ul {
          width: 150px;
          height: 100%;
          float: left;
          li {
            width: 100%;
            height: 45px;
            line-height: 40px;
            font-size: 16px;
            cursor: pointer;
            text-indent: 15px;
            border-left: 2px solid transparent;
            transition: all .5s;
            i {
              position: relative;
              left: -12px;
              font-size: 14px;
            }
          }
          .active {
            border-left-color: #169bd5;
            background-color: #fff;
          }
        }
        .class2-wrap {
          width: calc(100% - 150px);
          height: 100%;
          min-height: 300px;
          background: #fff;
          float: right;
          padding: 15px;
          .seeAll {
            float: right;
            margin-bottom: 10px;
            span {
              border-radius: 15px;
            }
          }
          .class2-cont {
            width: 100%;
            height: 200px;
            overflow: hidden;
            .active {
              border-color: #169bd5;
              background: #fff;
              color: #169bd5;
            }
            li {
              display: inline-block;
              padding: 0 8px;
              font-size: 14px;
              height: 30px;
              line-height: 28px;
              border: 1px solid #E4E4E4;
              background: #f2f2f2;
              margin: 0 15px 15px 0;
              cursor: pointer;
              color: #999;
              transition: all .5s;
            }
          }
        }
      }
      .content-wrap {
        width: 100%
        overflow: hidden;
        margin: 15px 0;
        min-height: 200px;
        .header {
          font-size: 16px;
          text-indent: 10px;
          border-bottom: 2px #169bd5 dashed;
          height: 35px;
          color: #169bd5;
          margin-bottom: 20px;
        }
        .cont {
          li {
            & > span {
              display: inline-block;
              height: 25px;
              border-left: 2px solid #169bd5;
              font-size: 16px;
              padding: 0 8px;
              color: #169bd5;
              line-height: 25px;
              margin-left: 3px;
            }
            .class3-cont {
              margin-top: 15px;
              .active {
                border-color: #169bd5;
                background: #fff;
                color: #169bd5;
              }
              li {
                display: inline-block;
                padding: 0 20px;
                font-size: 14px;
                height: 24px;
                line-height: 22px;
                border: 1px solid #E4E4E4;
                background: #f2f2f2;
                margin: 0 15px 15px 0;
                cursor: pointer;
                color: #999;
                transition: all .5s;
              }
            }
          }
        }
      }
    }
  }
</style>
