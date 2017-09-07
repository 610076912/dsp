<template>
  <div id="creatcity">
    <setps :active="2"></setps>
    <div class="content">
      <creat-header title="地理位置定向" text="按地区"></creat-header>
      <div class="citys">
        <div class="area">
          <div class="top">
            <span class="title">大区划分（快捷选择）</span>
            <el-checkbox class="fr">全选</el-checkbox>
          </div>
          <div class="con">
            <el-tree ref="regionTree" :data="regionList" show-checkbox node-key="lable" :props="regionProps" @check-change="getRegionChecked"></el-tree>
          </div>
        </div>
        <div class="city">
          <div class="top">
            <span class="title">国内城市</span>
            <el-checkbox class="fr">全选</el-checkbox>
          </div>
          <div class="con">
            <el-tree ref="cityTree" :data="cityList" show-checkbox node-key="city_id" :props="cityProps" @check-change="getCityChecked"></el-tree>
          </div>
        </div>
        <div class="checked-city">
          <div class="top">
            <span class="title">已选（{{ checkedCitysNum }}）位置</span>
          </div>
          <div class="con">
            <el-tree ref="checkedCityTree" :data="checkedCitys" :props="checkedCityProps"></el-tree>
          </div>
        </div>
      </div>
    </div>
    <div class="btns">
      <el-button type="info" @click="back">返回</el-button>
      <el-button type="info" @click="next">下一步</el-button>
    </div>
  </div>
</template>

<script>
  import setps from './steps-component.vue'
  import header from './header-component.vue'
  import citys from '@/assets/json/city.json'

  export default {
    name: 'creatcity',
    data () {
      return {
        regionList: [],
        regionProps: {
          label: 'lable'
        },
        cityList: [],
        cityProps: {
          children: 'region_val',
          label: 'lable'
        },
        checkedCitysNum: 0,
        checkedCitys: [],
        checkedCityProps: {
          children: 'region_val',
          label: 'lable'
        },
        checkedCityId: []
      }
    },
    methods: {
      back () {
        this.$router.go(-1)
      },
      next () {
        this.$router.push('/creatMedia')
        console.log(this.checkedCityId)
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
          if (i > 0 && arr[i][key] === arr[i - 1][key]) {
            resultArr[resultArr.length - 1][key + '_val'].push(arr[i])
          } else {
            let obj = {}
            obj[key] = arr[i][key]
            obj['lable'] = arr[i][lable]
            obj[key + '_val'] = [arr[i]]
            resultArr.push(obj)
          }
        }
        return resultArr
      },
      // 获取大区已选city_id
      getRegionChecked () {
        const regions = this.$refs.regionTree.getCheckedKeys(true)
        let checkAreas = []
        for (let i in regions) {
          for (let j in citys.RECORDS) {
            if (regions[i] === citys.RECORDS[j].area) {
              checkAreas.push(citys.RECORDS[j].city_id)
            }
          }
        }
        this.$refs.cityTree.setCheckedKeys(checkAreas, true)
      },
      // 获取省级已选city_id
      getCityChecked () {
        const checkCitys = this.$refs.cityTree.getCheckedKeys(true)
        this.checkedCityId = checkCitys
        this.checkedCitysNum = checkCitys.length
        let checkedCity = []
        for (let i in citys.RECORDS) {
          for (let j in checkCitys) {
            if (checkCitys[j] === citys.RECORDS[i].city_id) {
              checkedCity.push(citys.RECORDS[i])
            }
          }
        }
        this.checkedCitys = this.filterArr(checkedCity, 'region', 'region')
      }
    },
    created: function () {
      const regionArr = this.arrSort(citys.RECORDS, 'area')
      this.regionList = this.filterArr(regionArr, 'area', 'area')
      const cityArr = this.arrSort(citys.RECORDS, 'city_id')
      this.cityList = this.filterArr(cityArr, 'region', 'region')
    },
    components: {
      setps,
      'creat-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  #creatcity{
    .fr{
      float: right
    }
    .content {
      width: 100%;
      overflow: hidden;
      padding: 10px 20px;
      margin-bottom: 50px;

      .citys{
        width: 100%
        height: 550px
        background: #f9f9f9

        .top{
          width: 100%
          border-bottom: 2px solid #169bd5
          font-size: 14px
          margin-bottom: 20px
        }
        .con{
          width: 100%
          height: 430px
          background: #ffffff
          overflow-y: auto
          border: 1px solid #c9c9c9

          .el-tree{
            border: none
          }
          .el-tree-node__content{
            padding: 0 20px !important
            position: relative
            height: 46px
            line-height: 46px
            border-bottom: 1px solid #c9c9c9

            .el-checkbox{
              position: absolute
              right: 0
            }
          }
        }
        .area,.city{
          width: 270px
          height: 100%
          float: left
          margin: 0 40px

          .top{
            height: 60px
            line-height: 60px
          }
        }
        .checked-city{
          width: 458px;
          height: 546px;
          background: #fff;
          float: left;
          margin-top: 2px;
          padding: 0 40px

          .top{
            height: 58px
            line-height: 58px
          }
        }
        .el-tree-node__children{
          background: #f9f9f9
        }
      }
    }
    .btns{
      width: 100%
      height: 130px
      text-align: center
      padding-top: 30px
      border-top: 1px solid #f2f2f2
    }
  }
</style>
