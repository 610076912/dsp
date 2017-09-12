import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  creatData: {
    actId: '',
    creatBasice: {},
    creatCity: {},
    creatTime: {},
    creatMaterial: {},
    creatMedia: {},
    creatMediaType: {},
    creatScene: {}
  }
}

const mutations = {
  ACTID (state, actId) {
    // 改变id的方法
    state.creatData.actId = actId
  },
  BASICE (state, basice) {
    // 改变creatBasice的方法
  }
}
export default new Vuex.Store({
  state,
  mutations
})
