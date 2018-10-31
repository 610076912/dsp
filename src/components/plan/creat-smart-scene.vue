<template>
  <div class="creat-smart-scene">
    <setps :active="1"></setps>
    <div class="content">
      <creat-header title="场景化投放设置" text="行业场景智能推荐"></creat-header>
      <div class="smart-scene-content">
        <div class="content-left">
          <div class="head">广告投放行业</div>
          <div class="main">
            <el-collapse v-model="activeName" accordion v-for="(item, i) in allSmartScene" :key="item.smartClass1Id">
              <el-collapse-item :name="item.smartClass1Id">
                <template slot="title">
                  {{ item.smartClass1Name }}
                  <!--<b v-show="activeName === item.smartClass1Id">已选分类: {{ checkBoxGroupData[i].length }}</b>-->
                  <b v-show="checkBoxGroupData[i].length > 0">已选分类: {{ checkBoxGroupData[i].length }}</b>
                </template>
                <ul>
                  <el-checkbox-group v-model="checkBoxGroupData[i]" @change="handleCheckedCitiesChange">
                  <li v-for="class2 in item.smartClass2" :key="class2.smartClass2Id">
                    {{ class2.smartClass2Name }}
                    <el-checkbox :label="class2.smartClass2Id"></el-checkbox>
                  </li>
                  </el-checkbox-group>
                </ul>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
        <div class="content-right">
          <div class="head">智能推荐标签</div>
          <div class="main">
            <div class="object-class">
              <div class="class-head">商品物体类</div>
              <ul class="class-list">
                <li class="class-item" v-for="item in checkedObject" :key="item.class3id">{{ item.class3name }}</li>
              </ul>
            </div>
            <div class="scene-class">
              <div class="class-head">静态场景类</div>
              <ul class="class-list">
                <li class="class-item" v-for="item in checkedScene" :key="item.class3id">{{ item.class3name }}</li>
              </ul>
            </div>
            <div class="behavior-class">
              <div class="class-head">行为动作类</div>
              <ul class="class-list">
                <li class="class-item" v-for="item in checkedBehavior" :key="item.class3id">{{ item.class3name }}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="clear-float"></div>
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
  export default {
    name: 'creatSmartScene',
    data () {
      return {
        allSmartScene: [],
        activeName: [],
        checkBoxGroupData: [],
        checkedObject: [],
        checkedScene: [],
        checkedBehavior: []
      }
    },
    created () {
      // 请求全部分类
      this.$http.get('/api2/get_smart_scene').then(res => {
        if (res.code === 200) {
          this.allSmartScene = res.data.allSmartScene
          for (const index in this.allSmartScene) {
            this.checkBoxGroupData[index] = []
          }
          // 请求已选分类
          this.$http.get('/api2/get_store_smart_sence', {
            params: {
              plan_id: this.$store.state.creatData.planId
            }
          }).then(res => {
            if (res.code === 200) {
              if (res.data.length > 0) {
                let class2List = res.data[0].smart_class2.split(',')
                class2List = class2List.filter(item => item)
                if (class2List.length > 0) {
                  class2List.forEach(item => {
                    const class1Id = item.split('_')[0] * 1
                    this.checkBoxGroupData[class1Id - 1] = this.checkBoxGroupData[class1Id - 1].concat([item])
                  })
                  this.handleCheckedCitiesChange()
                }
              }
            }
          })
        }
      })
    },
    methods: {
      handleCheckedCitiesChange () {
        let checkedObject = []
        let checkedScene = []
        let checkedBehavior = []
        this.checkBoxGroupData.forEach(item => {
          if (item.length > 0) {
            item.forEach(smartClass2 => {
              const smartClass1Id = smartClass2.split('_')[0] * 1
              const smartClass2Id = smartClass2
              for (const i in this.allSmartScene) {
                if (this.allSmartScene[i].smartClass1Id === smartClass1Id) {
                  const currentSmartClass2 = this.allSmartScene[i].smartClass2
                  for (const j in currentSmartClass2) {
                    if (currentSmartClass2[j].smartClass2Id === smartClass2Id) {
                      checkedObject = checkedObject.concat(currentSmartClass2[j].smartClass3.object)
                      checkedScene = checkedScene.concat(currentSmartClass2[j].smartClass3.scene)
                      checkedBehavior = checkedBehavior.concat(currentSmartClass2[j].smartClass3.behavior)
                      break
                    }
                  }
                  break
                }
              }
            })
          }
        })
        this.checkedObject = checkedObject.length > 0 ? this.arrUnique(checkedObject, 'class3id') : []
        this.checkedScene = checkedScene.length > 0 ? this.arrUnique(checkedScene, 'class3id') : []
        this.checkedBehavior = checkedBehavior.length > 0 ? this.arrUnique(checkedBehavior, 'class3id') : []
      },
      arrUnique (array, key) {
        let result = [array[0]]
        for (let i = 1; i < array.length; i++) {
          const item = array[i]
          let repeat = false
          for (let j = 0; j < result.length; j++) {
            if (item[key] === result[j][key]) {
              repeat = true
              break
            }
          }
          if (!repeat) {
            result.push(item)
          }
        }
        return result
      },
      nextStep () {
        // 已选class2
        let smartClass2 = []
        this.checkBoxGroupData.forEach(item => {
          smartClass2 = smartClass2.concat(item)
        })

        // 已选class1
        let smartClass1 = []
        for (const i in smartClass2) {
          smartClass1[i] = smartClass2[i].split('_')[0]
        }
        smartClass1 = Array.from(new Set(smartClass1))

        // 已选class3
        let class3 = []
        class3 = class3.concat(this.checkedObject).concat(this.checkedScene).concat(this.checkedBehavior)
        const class3Id = []
        class3.forEach(item => {
          class3Id.push(item.class3id)
        })

        this.$http.post('/api2/store_smart_sence', {
          plan_id: this.$store.state.creatData.planId,
          smart_class1: smartClass1.join(),
          smart_class2: smartClass2.join(),
          class3: class3Id.join()
        }).then(res => {
          if (res.code === 200) {
            this.$store.commit('SMARTSCENE', {
              smart_class2: smartClass2.join()
            })
            this.$router.push('/creatScene')
          }
        })
      },
      back () {
        this.$router.go(-1)
      }
    },
    components: {
      setps,
      'creat-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .creat-smart-scene {
    .content {
      width: 100%;
      overflow: hidden;
      padding: 15px 30px;
      padding-bottom: 30px;
      border-bottom: 1px solid #cacaca;
      .smart-scene-content {
        width: 100%;
        border: 1px solid #efefef;
        .content-left {
          width: 338px;
          height: 800px;
          float: left;
          padding: 10px 20px;
          .el-collapse-item__content {
            padding: 0;
          }
          b {
            float: right;
            font-size: 12px;
            font-weight: normal;
            padding-right: 20px;
          }
          li {
            height: 40px;
            line-height 40px;
            border-top: 1px solid rgb(223, 232, 236);
            padding-left: 40px;
            padding-right: 20px;
          }
          .el-checkbox {
            float: right;
            height: 40px;
            .el-checkbox__label{
              display: none;
            }
          }
        }
        .content-right {
          width: 800px;
          height: 800px;
          background: #efefef;
          float: right;
          padding: 10px 20px;
          .class-head {
            height: 20px;
            line-height: 20px;
            font-size: 14px;
            border-left: 2px solid #1d8ce0;
            margin: 10px 0;
          }
          .class-list {
            min-height: 20px;
          }
          .class-item {
            display: inline-block;
            min-width: 94px;
            height: 24px;
            background: rgb(125, 217, 254);
            color: #fff;
            text-align: center;
            line-height: 24px;
            margin: 0 14px 10px 0;
            border-radius: 2px;
          }
        }
        .head {
          font-size: 14px;
          width: 100%;
          height: 50px;
          line-height: 40px;
          border-bottom: 3px solid #1d8ce0;
          margin-bottom: 10px;
        }
        .main {
          width: 100%;
          height: 700px;
          overflow-y: auto;
        }
        .clear-float {
          height: 0px;
          clear: both;
        }
      }
    }
  }
</style>
