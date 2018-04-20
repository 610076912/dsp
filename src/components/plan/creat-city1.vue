<template>
  <div id="creatcity">
    <setps :active="2"></setps>
    <div class="content">
      <creat-header title="地理位置定向" text="按地区"></creat-header>
      <div class="citys" v-loading="loading">
        <div class="city">
          <div class="top">
            <el-radio
              class="fl"
              label="K"
              v-model="areaType">
              K执行单价100
            </el-radio>
          </div>
          <ul class="con">
            <li v-for="item in cityTypeList.K">
              {{item}}
            </li>
          </ul>
        </div>
        <div class="city">
          <div class="top">
            <el-radio
              class="fl"
              label="1"
              v-model="areaType">
              A执行单价60
            </el-radio>
          </div>
          <ul class="con">
            <li v-for="item in cityTypeList.A">
              {{item}}
            </li>
          </ul>
        </div>
        <div class="city">
          <div class="top">
            <el-radio
              class="fl"
              label="1"
              v-model="areaType">
              B执行单价40
            </el-radio>
          </div>
          <ul class="con">
            <li v-for="item in cityTypeList.B">
              {{item}}
            </li>
          </ul>
        </div>
        <div class="city">
          <div class="top">
            <el-radio
              class="fl"
              label="2"
              v-model="areaType">
              全国执行单价35
            </el-radio>
          </div>
          <div class="con">
            <el-tree ref="cityTree" :data="cityList" node-key="city_id" :props="cityProps"></el-tree>
          </div>
        </div>
      </div>
    </div>
    <div class="button-wrap">
      <el-button @click="back">返回</el-button>
      <el-button type="primary" @click="next" :loading="btnLoading">下一步</el-button>
    </div>
  </div>
</template>

<script>
  import setps from './steps-component.vue'
  import header from './header-component.vue'
  import citys from '../../../static/json/city33.json'

  export default {
    name: 'creatCity',
    data () {
      return {
        // 活动id
        planId: this.$store.state.creatData.planId,
        // 分类列表
        cityTypeList: {},
        // 全国列表
        cityList: [],
        cityProps: {
          children: 'region_val',
          label: 'lable',
          disabled: 'disabled'
        },
        // 已选中城市数
        checkedCitysNum: 0,
        // 全有城市列表
        allCityId: [],
        btnLoading: false,
        loading: true,
        timer: null,
        areaType: 1
      }
    },
    created () {
      if (this.planId) {
        if (!this.cityStore) {
          // 获取已选城市
          this.$http.get('/api2/get_region_plan', {
            params: {
              plan_id: this.planId
            }
          }).then(res => {
            if (res.code === 200) {
              this.checkedCityId = res.data
              this.$store.commit('CITY', {
                type: 'cityId',
                msg: res.data
              })
              this.loading = false
            }
          })
          this.loading = false
        } else {
          this.checkedCityId = this.cityStore.cityId
          this.loading = false
        }
      }
      this.getCityTypeList()
      this.loading = false
    },
    mounted () {
      const regionArr = this.arrSort(citys.RECORDS, 'area')
      this.regionList = this.filterArr(regionArr, 'area', 'area')
      const cityArr = this.arrSort(citys.RECORDS, 'city_id')
      this.cityList = this.filterArr(cityArr, 'region', 'region')
    },
    methods: {
      back () {
        this.$router.go(-1)
      },
      next () {
        this.btnLoading = true
        Promise.all([
          this.$http.post('/api2/add_region_plan', {
            plan_id: this.planId,
            // city_id_list: JSON.stringify(this.checkedCityId)
            city_id_list: JSON.stringify(this.checkedCityId)
          }),
          this.$http.post('/api2/add_strategy_plan', {
            plan_id: this.$store.state.creatData.planId,
            frequency: 0,
            casttype: 1,
            billing: 0
          })
        ]).then(res => {
          if (res[0].code === 200) {
            this.$store.commit('CITY', {
              type: 'cityId',
              msg: this.checkedCityId
            })
            this.$store.commit('CITY', {
              type: 'citys',
              msg: this.checkedCitys
            })
          }
          if (res[0].code === 200 && res[1].code === 200) {
            this.$router.push('/creatMaterial')
          }
        })
      },
      // 排序
      arrSort (arr, key) {
        return arr.sort(function (a, b) {
          return a[key].toString().localeCompare(b[key].toString())
        })
      },
      // 数组转换层级树
      filterArr (arr, key, lable) {
        let resultArr = []
        for (let i = 0, len = arr.length; i < len; i++) {
          arr[i]['lable'] = arr[i]['city']
          // 给元数据增加属性 disabled = true 使树状结构的最小项为不可选
          arr[i]['disabled'] = false
          if (i > 0 && arr[i][key] === arr[i - 1][key]) {
            resultArr[resultArr.length - 1][key + '_val'].push(arr[i])
          } else {
            let obj = {}
            obj[key] = arr[i][key]
            obj['lable'] = arr[i][lable]
            obj[key + '_val'] = [arr[i]]
            // 给元数据增加属性 disabled = true 使树状结构的最小项为不可选
            obj['disabled'] = false
            resultArr.push(obj)
          }
        }
        return resultArr
      },
      getCityTypeList () {
        this.$http.get('/api2/get_region_by_kab').then(res => {
          console.log(res)
          if (res.code === 200) {
            this.cityTypeList = res.data
          }
        })
      }
    },
    watch: {
      checkedCityId (val) {
        // 监听cityId改变
        this.$refs.cityTree.setCheckedKeys(val, true)
        this.checkedCitysNum = val.length
        // 过滤出已选城市列表
        let checkedCity = []
        for (let i in citys.RECORDS) {
          for (let j in val) {
            if (val[j] === citys.RECORDS[i].city_id) {
              checkedCity.push(citys.RECORDS[i])
            }
          }
        }
        this.checkedCitys = checkedCity.length > 0 ? this.filterArr(checkedCity, 'region', 'region') : []
      }
    },
    components: {
      setps,
      'creat-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  #creatcity {
    .fl {
      float: left
    }
    .content {
      width: 100%;
      overflow: hidden;
      padding: 10px 20px;

      .citys {
        width: 100%
        height: 550px
        background: #f9f9f9
        padding: 0 35px;
        .top {
          width: 100%
          border-bottom: 2px solid #169bd5
          font-size: 14px
          margin-bottom: 20px
        }
        .con {
          width: 100%
          height: 430px
          background: #ffffff
          overflow-y: auto
          border: 1px solid #c9c9c9
          li {
            width: 100%;
            height: 46px;
            line-height: 46px;
            padding: 0 20px;
            font-size: 14px;
            border: .5px solid #999;
          }
          .el-tree {
            border: none
          }
          .el-tree-node__content {
            padding: 0 20px !important
            position: relative
            height: 46px
            line-height: 46px
            border-bottom: 1px solid #c9c9c9

            .el-checkbox {
              position: absolute
              right: 0
            }
          }
        }
        .city {
          width: 240px
          height: 100%
          float: left
          margin-right: 40px

          .top {
            height: 60px
            line-height: 60px
          }
          &:last-of-type {
            margin-right: 0;
          }
        }
        .el-tree-node__children {
          background: #f9f9f9
        }
      }
    }
  }
</style>
