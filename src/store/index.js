import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  creatData: {
    actId: 10,
    creatBasice: {
      name: '',
      group: '',
      day: '',
      all: '',
      date: []
    },
    creatCity: null,
    creatTime: null,
    creatMaterial: null,
    creatStrategy: null,
    creatMedia: null,
    creatMediaType: null,
    creatScene: null
  }
}

const mutations = {
  ACTID (state, actId) {
    // 改变id的方法
    state.creatData.actId = actId
  },
  BASICE (state, basice) {
    // 改变creatBasice的方法
    state.creatData.creatBasice = basice
  },
  TIME (state, time) {
    state.creatData.creatTime = time
  },
  SCENE (state, scene) {
    state.creatData.creatScene = scene
  },
  MEDIATYPE (state, mediatype) {
    state.creatData.creatMediaType = mediatype
  },
  STRATEGY (state, strategy) {
    state.creatData.creatStrategy = strategy
  }
}
export default new Vuex.Store({
  state,
  mutations
})
