<template>
  <div class="creat-new2">
    <setps :active="1"></setps>
    <div class="content">
      <creat-header title="场景化投放设置" text="场景投放"></creat-header>
      <el-input class="search-input" placeholder="请输入关键词查询" v-model="searchInput">
        <el-button slot="append" @click="search">查询</el-button>
      </el-input>
      <transition name="fade">
        <div class="search-res-wrap" v-show="searchArr.length !== 0">
          <i class="el-icon-close" @click="closeSearchWrap"></i>
          <ul>
            <li v-for="item in searchArr" @click="clickSearchLabel(item)">{{item.class_name}}</li>
          </ul>
        </div>
      </transition>
      <transition name="fade">
        <div class="checked-wrap" v-show="checkedArr.length !== 0">
          <span class="checked-num">已选择标签 （{{checkedArrObj.length}}）个</span>
          <el-button icon="delete2" type="text" @click="clearChecked()">清空已选择标签</el-button>
          <ul>
            <li v-for="item in checkedArrObj">
              {{item.class_name}}
              <i class="el-icon-close" @click="delChecked(item.class_id)"></i>
            </li>
          </ul>
        </div>
      </transition>
      <div class="class-wrap">
        <ul>
          <li v-for="(item, i) in allPack"
              :class="{active: (i === liActindex)}"
              @click="class1Click(i, item.class2Arr)">
            <el-checkbox v-model="class1CheckboxArr[i]" @change="class1CheckboxChange(i, item)"></el-checkbox>
            {{item.class1_name}}
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
                :class="{active: (class2PkgId[liActindex].indexOf(class2.pkg_id) !== -1)}"
                @click="class2Click(class2.pkg_id, class2.valueArr)">{{class2.class_name}}
            </li>
          </ul>
        </div>
        <div class="content-wrap">
          <ul class="cont">
            <li v-for="(item, index) in class2Data[liActindex]">
              <label>
                <input type="checkbox" v-model="checkedAll[item[0].pkg_id]"
                       @change="class2Checkedbox(item, item[0].pkg_id)">
                <span>{{item[0].pkg_name || item[0].arr[0].pkg_name}}</span>
              </label>
              <ul class="class3-cont" v-if="!item[0].py">
                <li
                  v-for="class3 in item"
                  @click="class3Click(class3)"
                  :class="{active: (checkedArr.indexOf(class3.class_id) !== -1)}">{{class3.class_name}}
                </li>
              </ul>
              <ul class="class3-cont-start" v-if="item[0].py">
                <li class="py-wrap" v-for="pys in item">
                  <span>{{pys.py}}</span>
                  <ul>
                    <li
                      v-for="start in pys.arr"
                      :class="{active: (checkedArr.indexOf(start.class_id) !== -1)}"
                      @click="class3Click(start)">
                      {{start.class_name}}
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
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
  import setps from './steps-component.vue'
  import header from './header-component.vue'
  import moduleHeaderCompoent from './module-header-component'

  export default {
    name: 'creatScene',
    data () {
      return {
        // 一级展示图标
        iconClass: '',
        // 全选数据
        checkedAll: {},
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
        // 选中的结果 classid
        checkedArr: [],
        // 选中的结果，obj
        checkedArrObj: [],
        // 搜索输入
        searchInput: '',
        // 所有包的原始数据
        rawAllPkg: [],
        // 搜索结果数据
        searchArr: [],
        // 一级全选框选中状态
        class1CheckboxArr: new Array(5).fill(false)
      }
    },
    created () {
      // 判断vuex中是否有数据
      let vuexData = this.$store.state.creatData.creatScene
      if (vuexData) {
        this.getAllPkg()
        // 选中的最终结果
        this.checkedArr = vuexData.checkedArr
        this.checkedArrObj = vuexData.checkedArrObj
        // 选中的二级pkgId和数组
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
              this.checkedArrObj.push(item)
            })
            // 请求接口拿数据时必须要等到拿到所有包数据以后执行
            this.getAllPkg(function () {
              res.data.forEach(function (item, index) {
                let class1 = Math.floor(item.pkg_id / 1000)
                let class2Data
                that.allPack[class1 - 1].class2Arr.forEach(class2 => {
                  if (class2.pkg_id === item.pkg_id) {
                    class2Data = class2.valueArr
                    if (that.class2Data[class1 - 1].indexOf(class2Data) === -1) {
                      that.class2Data[class1 - 1].push(class2Data)
                      that.class2PkgId[class1 - 1].push(class2.pkg_id)
                    }
                  }
                })
              })
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
      },
      // 检测class2Data[3]变化，给明星增加按拼音首字母排序
      'class2Data.3': {
        handler: function (val) {
          val.forEach((item, index) => {
            let pkgId = item[0].pkg_id
            // 如果item【0】.arr 存在说明该数据已经被按拼音首字母处理过。则跳过！
            if (Array.isArray(item[0].arr)) return
            let data = item
            if (pkgId === 4001 || pkgId === 4002 || pkgId === 4003 || pkgId === 4004) {
              // 先按照拼音首字母排序
              data.sort(function (a, b) {
                if (a.letter.toUpperCase() > b.letter.toUpperCase()) {
                  return 1
                } else if (b.letter.toUpperCase() > a.letter.toUpperCase()) {
                  return -1
                } else {
                  return 0
                }
              })
              // 按照拼音首字母分组
              let res = []
              data.forEach((item, index) => {
                if (index > 0 && data[index].letter === data[index - 1].letter) {
                  res[res.length - 1].arr.push(item)
                } else {
                  let obj = {}
                  obj.py = item.letter
                  obj.arr = [item]
                  obj.pkg_id = item.pkg_id
                  res.push(obj)
                }
              })
              val[index] = res
            }
          })
        },
        deep: true
      },
      // 三级反向全选
      checkedArrObj: 'watchClass3Allchecked'
    },
    methods: {
      // 三级反向全选方法，在首次加载和已选中改变时调
      watchClass3Allchecked (val) {
        if (val.length === 0) {
          this.checkedAll = {}
          return
        }
        // 判断allPack 是否加载完成
        if (this.allPack.length === 0) return
        // 深复制，避免改变被观察者，造成死循环
        let checkedArr = val.concat()
        // 分组
        checkedArr.sort(function (a, b) {
          return a.pkg_id - b.pkg_id
        })
        // 按一级分组
        let classArr = []
        console.log(checkedArr)
        checkedArr.forEach((item, index) => {
          let class1Index = Math.floor(item.pkg_id / 1000)
          if (index > 0 && class1Index === Math.floor(checkedArr[index - 1].pkg_id / 1000)) {
            classArr[classArr.length - 1].cont.push(item)
          } else {
            let obj = {}
            obj.class1Index = class1Index
            obj.cont = [item]
            classArr.push(obj)
          }
        })
        console.log(classArr)
        // 按二级分组
        let pkgArr = []
        checkedArr.forEach((item, index) => {
          if (index > 0 && item.pkg_id === checkedArr[index - 1].pkg_id) {
            pkgArr[pkgArr.length - 1].cont.push(item)
          } else {
            let obj = {}
            obj.pkg_id = item.pkg_id
            obj.cont = [item]
            pkgArr.push(obj)
          }
        })
        // 对比1级是否全选
        classArr.forEach(item => {
          this.class1CheckboxArr[item.class1Index - 1] = this.allPack[item.class1Index - 1].valueArr.length === item.cont.length
        })
        // 对比2级是否全选
        pkgArr.forEach(item => {
          let class1Index = Math.floor(item.pkg_id / 1000)
          this.allPack[class1Index - 1].class2Arr.forEach(allItem => {
            if (allItem.pkg_id === item.pkg_id) {
              let lengthIsEqual = allItem.valueArr.length === item.cont.length
              if (item.cont.length === 0) {
                lengthIsEqual = false
              }
              this.checkedAll[item.pkg_id] = lengthIsEqual
            }
          })
        })
      },
      // 点击搜索结果标签
      clickSearchLabel (item) {
        const that = this
        let isIncludes = this.checkedArr.indexOf(item.class_id) !== -1
        if (isIncludes) {
          this.$message({
            message: '此标签已选中',
            type: 'warning'
          })
        } else {
          // 增加进三级已选
          this.checkedArr.push(item.class_id)
          this.checkedArrObj.push(item)
          // 对应的2级选中
          let class1Index = Math.floor(item.pkg_id / 1000)
          this.allPack[class1Index - 1].class2Arr.forEach(class2 => {
            if (class2.pkg_id === item.pkg_id) {
              let index = that.class2PkgId[class1Index - 1].indexOf(item.pkg_id)
              if (index === -1) {
                that.class2Data[class1Index - 1].unshift(class2.valueArr)
                that.class2PkgId[class1Index - 1].unshift(item.pkg_id)
              }
            }
          })
        }
      },
      // 关闭搜索框，清空搜索结果
      closeSearchWrap () {
        this.searchArr = []
        this.searchInput = ''
      },
      // 搜索
      search () {
        let text = this.searchInput
        if (text === '') return
        let reg = new RegExp(text)
        this.searchArr = this.rawAllPkg.filter(item => {
          if (reg.test(item.class_name)) {
            return item
          }
        })
      },
      // 删除单项
      delChecked (classId) {
        let i = this.checkedArr.indexOf(classId)
        if (i !== -1) {
          this.checkedArr.splice(i, 1)
          this.checkedArrObj.splice(i, 1)
        }
      },
      // 清空所有已选项
      clearChecked () {
        this.checkedArr = []
        this.checkedArrObj = []
        // 三级全选清空
        for (let item in this.checkedAll) {
          this.checkedAll[item] = false
        }
      },
      // 1级全选
      class1CheckboxChange (index, data) {
        if (this.class1CheckboxArr[index]) {
          // 处理二级
          data.class2Arr.forEach(item => {
            this.class2Data[index].push(item.valueArr)
            this.class2PkgId[index].push(item.pkg_id)
          })
          // 处理三级
          data.valueArr.forEach(item => {
            if (this.checkedArr.indexOf(item.class_id) === -1) {
              this.checkedArr.push(item.class_id)
              this.checkedArrObj.push(item)
            }
          })
        } else {
          this.class2PkgId[index] = []
          this.class2Data[index] = []
          data.valueArr.forEach(item => {
            let i = this.checkedArr.indexOf(item.class_id)
            if (i !== -1) {
              this.checkedArr.splice(i, 1)
              this.checkedArrObj.splice(i, 1)
            }
          })
        }
      },
      // 2级全选
      class2Checkedbox (val, index) {
        if (this.checkedAll[index]) {
          val.forEach(item => {
            if (this.checkedArr.indexOf(item.class_id) === -1 && !item.arr) {
              this.checkedArr.push(item.class_id)
              this.checkedArrObj.push(item)
            } else if (Array.isArray(item.arr)) {
              // 增加按字母排序后的数据情况处理
              item.arr.forEach(class3 => {
                if (this.checkedArr.indexOf(class3.class_id) === -1) {
                  this.checkedArr.push(class3.class_id)
                  this.checkedArrObj.push(class3)
                }
              })
            }
          })
        } else {
          delete this.checkedAll[index]
          val.forEach(item => {
            let i = this.checkedArr.indexOf(item.class_id)
            if (i !== -1) {
              this.checkedArr.splice(i, 1)
              this.checkedArrObj.splice(i, 1)
            } else if (i === -1 && Array.isArray(item.arr)) {
              item.arr.forEach(class3 => {
                let class3Index = this.checkedArr.indexOf(class3.class_id)
                if (class3Index !== -1) {
                  this.checkedArr.splice(class3Index, 1)
                  this.checkedArrObj.splice(class3Index, 1)
                }
              })
            }
          })
        }
      },
      // 点击一级
      class1Click (index, class2Arr) {
        this.liActindex = index
        this.class2Arr = class2Arr
      },
      // 点击二级
      class2Click (pkgId, data) {
        let index = this.class2PkgId[this.liActindex].indexOf(pkgId)
        if (index === -1) {
          this.class2Data[this.liActindex].unshift(data)
          this.class2PkgId[this.liActindex].unshift(pkgId)
        } else {
          this.class2Data[this.liActindex].splice(index, 1)
          this.class2PkgId[this.liActindex].splice(index, 1)
        }
      },
      // 点击三级
      class3Click (data) {
        let index = this.checkedArr.indexOf(data.class_id)
        if (index === -1) {
          this.checkedArr.push(data.class_id)
          this.checkedArrObj.push(data)
        } else {
          this.checkedArr.splice(index, 1)
          this.checkedArrObj.splice(index, 1)
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
            // 数据转换
            this.rawAllPkg = res.data
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
                    obj.class1_name = '商品物体类'
                    break
                  case 2:
                    obj.class1_name = '静态场景类'
                    break
                  case 3:
                    obj.class1_name = '行为动作类'
                    break
                  case 4:
                    obj.class1_name = '明星人物类'
                    break
                  case 9:
                    obj.class1_name = '其他'
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
            // 调class3反向全选方法
            this.watchClass3Allchecked(this.checkedArrObj)
            // 回调~
            if (callback) callback()
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
              class2PkgId: this.class2PkgId,
              class2Data: this.class2Data,
              checkedArr: this.checkedArr,
              checkedArrObj: this.checkedArrObj
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
      .search-input {
        width: 320px;
        float: right;
        margin-bottom: 20px;
      }
      .checked-wrap, .search-res-wrap {
        width: 100%;
        min-height: 100px;
        border: 1px solid #f2f2f2;
        float: left;
        margin-bottom: 25px;
        padding: 10px;
        .checked-num {
          font-size: 14px;
        }
        .el-button {
          padding: 5px 15px;
          display: block;
          float: right;
        }
        ul {
          padding-top: 10px;
          li {
            width: 95px;
            height: 28px;
            display: inline-block;
            line-height: 28px;
            padding: 0 6px;
            color: #fff;
            background-color: #169bd5;
            position: relative;
            user-select: none;
            margin: 0 18px 10px 0;
            &:nth-of-type(10n) {
              margin-right: 0;
            }
            i {
              font-size: 10px;
              position: absolute;
              right: 6px;
              top: 6px;
              font-weight: 900;
              cursor: pointer;
            }
          }
        }
      }
      .search-res-wrap {
        position: relative;
        i {
          position: absolute
          right: 10px;
          top: 8px;
          cursor: pointer;
        }
        ul {
          padding-top: 20px;
          li {
            text-align: center;
            cursor: pointer;
          }
        }
      }
      .class-wrap {
        width: 100%;
        background: #F2F2F2;
        padding: 2px;
        overflow: hidden;
        position: relative;
        border-right: 1px solid #f2f2f2;
        & > ul {
          width: 125px;
          height: 100%;
          float: left;
          li {
            width: 100%;
            height: 45px;
            line-height: 40px;
            font-size: 14px;
            cursor: pointer;
            text-indent: 5px;
            border-left: 2px solid transparent;
            transition: all .5s;
            .el-checkbox {
              float: left;
            }
          }
          .active {
            border-left-color: #169bd5;
            background-color: #fff;
          }
        }
        .class2-wrap {
          width: 500px;
          height: 450px;
          background: #fff;
          float: left;
          padding: 15px;
          .seeAll {
            float: right;
            margin-bottom: 10px;
            span {
              border-radius: 15px;
              font-size: 12px;
              border-left: 1px solid rgb(191, 207, 217);
              height: 30px;
              line-height: 9px;
            }
          }
          .class2-cont {
            width: 100%;
            overflow: hidden;
            .active {
              border-color: #169bd5;
              background: #fff;
              color: #169bd5;
            }
            li {
              display: inline-block;
              width: 102px;
              padding: 0 10px;
              text-align: center;
              font-size: 12px;
              height: 30px;
              line-height: 28px;
              border: 1px solid #E4E4E4;
              background: #f2f2f2;
              margin: 0 15px 15px 0;
              cursor: pointer;
              color: #333;
              transition: all .5s;
            }
          }
        }
        .content-wrap {
          width: 528px;
          height: 450px;
          background: #fff;
          overflow: hidden;
          padding: 15px 20px;
          overflow-y: auto;
          position: absolute;
          left: 628px;
          .header {
            font-size: 16px;
            text-indent: 10px;
            border-bottom: 1px #169bd5 dashed;
            height: 35px;
            color: #169bd5;
            margin-bottom: 20px;
          }
          .cont {
            li {
              margin-bottom: 20px;
              & > label {
                input {
                  width: 18px;
                  height: 18px;
                  position: relative;
                  top: 5px;
                }
              }
              span {
                display: inline-block;
                height: 25px;
                font-size: 14px;
                padding: 0 8px;
                color: #169bd5;
                line-height: 25px;
                margin-left: 3px;
                margin-bottom: 15px;
              }
              .class3-cont {
                padding: 0 0px 0 30px;
                .active {
                  border-color: #169bd5;
                  background: #fff;
                  color: #169bd5;
                }
                li {
                  display: inline-block;
                  width: 98px;
                  text-align: center;
                  font-size: 12px;
                  height: 30px;
                  line-height: 28px;
                  border: 1px solid #E4E4E4;
                  background: #f2f2f2;
                  margin: 0 15px 15px 0;
                  cursor: pointer;
                  color: #333;
                  transition: color, background-color, border .5s;
                  &:nth-of-type(4n) {
                    margin-right: 0
                  }
                }
              }
              .class3-cont-start {
                .py-wrap {
                  margin-bottom: 0px;
                  width: 488px;
                  & > span {
                    vertical-align: top;
                    width: 26px;
                  }
                  ul {
                    display: inline-block;
                    width: 440px;
                    .active {
                      border-color: #169bd5;
                      background: #fff;
                      color: #169bd5;
                    }
                    li {
                      display: inline-block;
                      width: 98px;
                      text-align: center;
                      font-size: 12px;
                      height: 30px;
                      line-height: 28px;
                      border: 1px solid #E4E4E4;
                      background: #f2f2f2;
                      margin: 0 15px 15px 0;
                      cursor: pointer;
                      color: #333;
                      transition: color, background .5s;
                      &:nth-of-type(4n) {
                        margin-right: 0
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
      }
      .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */
      {
        opacity: 0
      }
    }
  }
</style>
