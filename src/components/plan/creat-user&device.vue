<style lang="stylus" scoped>
.userAndDevice {
  .content {
    width: 100%;
    overflow: hidden;
    padding: 15px 30px;
    padding-bottom: 30px;
    border-bottom: 1px solid #cacaca;

    .user_content, .device_content {
      padding: 50px 0;
    }

    li {
      line-height: 27px;

      p {
        display: inline-block;
        text-align: right;
        height: 28px;
        margin: 10px;
        width: 90px;
      }

      span:first-of-type {
        border-radius: 14px;
      }

      span {
        cursor: pointer;
        display: inline-block;
        text-align: center;
        height: 28px;
        border: 1px solid #cacaca;
        margin: 10px;
        width: 100px;
        transition: all 0.2s;
      }

      .active {
        background: #169bd5;
        color: #fff;
      }
    }

    .device {
    }

    .mytitle {
      width: 100%;
      margin-top: 20px;
      height: 50px;
      border-bottom: 1px solid #169bd5;

      .txt {
        display: block;
        font-size: 14px;
        width: 130px;
        height: 50px;
        background: #169bd5;
        color: #fff;
        line-height: 50px;
        text-align: center;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }
    }
  }
}
</style>

<template>
  <div class="userAndDevice">
    <setps :active="1"></setps>
    <div class="content">
      <!-- <creat-header title="场景化投放设置" text="用户定向"></creat-header> -->
      <!-- 用户定向 -->
      <div class="user">
        <div class="mytitle">
          <div class="txt">用户定向</div>
        </div>
        <ul class="user_content">
          <li>
            <p>用户性别：</p>
            <span
              v-for="(item, index) in sex"
              :class="{active: item.id === sexChecked}"
              @click="check(item.id)">{{item.name}}</span>
          </li>
          <li>
            <p>用户年龄：</p>
            <span
              v-for="(item, index) in age"
              :class="{active: ageChecked.indexOf(item.id) >= 0}"
              @click="checks(item.id, 'ageChecked')">{{item.name}}</span>
          </li>
          <li>
            <p>婚恋状态：</p>
            <span
              v-for="(item, index) in marriage"
              :class="{active: marriageChecked.indexOf(item.id) >= 0}"
              @click="checks(item.id, 'marriageChecked')">{{item.name}}</span>
          </li>
          <li>
            <p>用户习惯：</p>
            <span
              v-for="(item, index) in habit"
              :class="{active: habitChecked.indexOf(item.id) >= 0 }"
              @click="checks(item.id, 'habitChecked')">{{item.name}}</span>
          </li>
        </ul>
      </div>
      <!-- 设备定向 -->
      <div class="device">
        <div class="mytitle">
          <div class="txt">设备定向</div>
        </div>
        <ul class="device_content">
          <li>
            <p>操作系统：</p>
            <span
              v-for="(item, index) in OS"
              :class="{active: OSchecked.indexOf(item.id) >= 0}"
              @click="checks(item.id, 'OSchecked')">{{item.name}}</span>
          </li>
          <li>
            <p>手机品牌：</p>
            <span
              v-for="(item, index) in phone_brand"
              :class="{active: phoneChecked.indexOf(item.id) >= 0}"
              @click="checks(item.id, 'phoneChecked')">{{item.name}}</span>
          </li>
          <li>
            <p>价格区间：</p>
            <span
              v-for="(item, index) in price"
              :class="{active: priceChecked.indexOf(item.id) >= 0}"
              @click="checks(item.id, 'priceChecked')">{{item.name}}</span>
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
<script>
import setps from './steps-component.vue'
import header from './header-component.vue'

export default {
  components: {
    setps,
    'creat-header': header
  },
  data () {
    return {
      sex: [],
      age: [],
      marriage: [],
      habit: [],
      OS: [],
      phone_brand: [],
      price: [],
      sexChecked: '',
      ageChecked: [],
      marriageChecked: [],
      habitChecked: [],
      OSchecked: [],
      phoneChecked: [],
      priceChecked: []
    }
  },
  created () {
    this.$http.get('http://192.168.1.163:7001/findUserAndDevice', {
      params: {
        plan_id: this.$store.state.creatData.planId
      }
    }).then(res => {
      if (res.code === 200) {
        this.OS = res.data.dic.OS
        this.age = res.data.dic.age
        this.habit = res.data.dic.habit
        this.marriage = res.data.dic.marriage
        this.phone_brand = res.data.dic.phone_brand
        this.price = res.data.dic.price
        this.sex = res.data.dic.sex

        this.OSchecked = res.data.checked.OS.split(',')
        this.ageChecked = res.data.checked.age.split(',')
        this.habitChecked = res.data.checked.habit.split(',')
        this.marriageChecked = res.data.checked.marriage.split(',')
        this.phoneChecked = res.data.checked.phone_brand.split(',')
        this.priceChecked = res.data.checked.price.split(',')
        this.sexChecked = res.data.checked.sex
      }
    })
  },
  methods: {
    check (val) {
      if (this.sexChecked === val) {
        this.sexChecked = ''
      } else {
        this.sexChecked = val
      }
    },
    checks (id, check) {
      // 判断是不是第一个选项（不限），进行操作
      if (id === '0') {
        // 如果没不曾选中过（不限），就选中
        if (this[check].indexOf(id) < 0) {
          console.log('没有全选，即将全选')
          this[check] = [id]
        } else {
          this[check] = []
        }
      } else {
        // 如果点击其他选项，并且之前已经选中过（不限）要先清除（不限）
        if (this[check].indexOf('0') >= 0) {
          this[check].splice(this[check].indexOf('0'), 1)
        }
        // 如果当前选项为不曾选中，就制为选中
        if (this[check].indexOf(id) < 0) {
          this[check].push(id)
        } else {
          this[check].splice(this[check].indexOf(id), 1)
        }
      }
    },
    nextStep () {
      this.$http.post('http://192.168.1.163:7001/setUserAndDevice', {
        plan_id: this.$store.state.creatData.planId,
        sex: this.sexChecked,
        age: this.ageChecked.join(','),
        marriage: this.marriageChecked.join(','),
        habit: this.habitChecked.join(','),
        OS: this.OSchecked.join(','),
        phone_brand: this.phoneChecked.join(','),
        price: this.priceChecked.join(',')
      }).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.$router.push('/creatScene')
        }
      })
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>
