<template>
  <div class="creat-new2">
    <setps :active="1"></setps>
    <div class="content">
      <creat-header title="场景化投放设置" text="场景投放"></creat-header>
      <div class="target-wrap">
        <module-header-compoent title="广告目标选择（单选）"></module-header-compoent>
        <div class="checkbox-wrap">
          <el-checkbox-group v-model="checkList" :max="2" @change="checkChange">
            <el-checkbox v-for="item in leftData" :label="item.target_name" :key="item.target_id"></el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div class="target-con">
        <div class="target-con-top">
          <module-header-compoent title="场景化内容推荐（多选）"></module-header-compoent>
          <div class="top-content">
            <el-tree
              ref="tree"
              class="tree"
              :highlight-current="true"
              :accordion="true"
              :data="allPack"
              node-key="class_id"
              show-checkbox
              @node-expand="zhankai"
              @node-collapse="heshang"
              :props="props">
            </el-tree>
          </div>
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
  // todo 重写！
  import setps from './steps-component.vue'
  import header from './header-component.vue'
  import moduleHeaderCompoent from './module-header-component'

  export default {
    name: 'creatScene',
    data () {
      return {
        props: {
          label: 'class_name',
          children: 'pkg_id_val'
        },
        // 左边单选的选中数据
        checkList: [],
        // 右边经过转换后的全部数据
        allPack: [],
        leftData: [],
        loding: null
      }
    },
    created () {
//      // loding
//      this.$nextTick(function () {
//        this.loding = this.$loading({
//          target: '.top-content',
//          text: '正在努力加载中'
//        })
//      })
      // 判断vuex中是否有数据
      let vuexData = this.$store.state.creatData.creatScene
      if (vuexData) {
        this.checkedId = vuexData
        this.$nextTick(res => {
          this.$refs.tree.setCheckedKeys(vuexData)
        })
      } else if (this.$store.state.creatData.planId) {
        this.$http.post('/api2/get_pkg_info', {
          plan_id: this.$store.state.creatData.planId
        }).then(res => {
          console.log(res)
          if (res.code === 200 && res.data.length > 0) {
            let resData = []
            res.data.forEach(function (item) {
              resData.push(item.class_id)
            })
            this.$refs.tree.setCheckedKeys(resData)
            this.checkedId = resData
            this.$store.commit('SCENE', resData)
          }
        })
      }
      // 请求广告目标信息
      this.$http.post('/api2/get_target_list', {
        plan_id: this.$store.state.creatData.planId
      }).then(res => {
        if (res.code === 200) {
          this.leftData = res.data
        }
      })
      //
      this.getAllPkg()
    },
    methods: {
      // tree结构展开时
      zhankai (a, b, c) {
        for (let i = 0; i < this.$refs.tree.$el.children.length; i++) {
          this.$refs.tree.$el.children[i].style.marginBottom = '15px'
        }
        c.$el.style.marginBottom = '240px'
        console.log(this.$refs.tree)
      },
      // tree 结构合上时，
      heshang (a, b, c) {
        c.$el.style.marginBottom = '15px'
      },
      // 请求所有包
      getAllPkg () {
        const that = this
        this.$http.get('/api2/get_all_pkg_info', {
          params: {
            plan_id: that.$store.state.creatData.planId
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
                obj.class_name = arr[i].pkg_name
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
        let checkedNodes = this.$refs.tree.getCheckedNodes(true)
        console.log(checkedNodes)
        let resClassArray = []
        if (checkedNodes.length === 0) {
          this.$alert('请选择一个类', '提示', {
            confirmButtonText: '确定'
          })
          return
        }
        // 提取对象中的class_id
        checkedNodes.forEach(item => {
          resClassArray.push(item.class_id)
        })
        this.$http.post('/api2/add_pkg_info', {
          plan_id: this.$store.state.creatData.planId,
          cls_id_list: JSON.stringify(resClassArray)
        }).then(res => {
          if (res.code === 200) {
            this.$store.commit('SCENE', resClassArray)
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
      .target-wrap {
        width: 340px;
        background: #f9f9f9;
        padding: 20px 30px;
        float: left;
        .checkbox-wrap {
          width: 100%;
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
          overflow: hidden;
          div.top-content {
            width: 100%;
            max-height: calc(100% - 43px);
            overflow-y: auto;
            display: flex;
            flex-wrap: wrap;
            .tree {
              width: 100%;
              display: flex;
              flex-wrap: wrap;
              border: none;
              overflow: hidden;
              .el-tree-node {
                width: 22%;
                height: 50px;
                border: 1px solid #c9c9c9;
                margin-right: 4%;
                margin-bottom: 15px;
                cursor: pointer;
                transition all .5s
                &:nth-of-type(4n) {
                  .el-tree-node__children {
                    left: -576px;
                  }
                }
                &:nth-of-type(4n-2) {
                  .el-tree-node__children {
                    left: -192px;
                  }
                }
                &:nth-of-type(4n-1) {
                  .el-tree-node__children {
                    left: -384px;
                  }
                }
                .el-tree-node__content {
                  height: 100%;
                  line-height: 46px;
                }
                .el-tree-node__children {
                  width: 738px;
                  height: 200px;
                  border: 1px solid #ccc;
                  position relative
                  top: 20px;
                  left: 0px;
                  background #fff;
                  overflow-y auto
                  .el-tree-node {
                    float left;
                    width: auto;
                    height: auto;
                    border: none;
                    margin-right: 1%;
                    margin-bottom: 15px;
                    .el-tree-node__expand-icon {
                      display: none;
                    }
                    .el-tree-node__content {
                      padding-right 16px;
                    }
                  }
                }
                &:nth-of-type(4n) {
                  margin-right: 0;
                }
              }
            }
          }
        }
      }
    }

  }
</style>
