import Vue from 'vue'
import Vuex from 'vuex'
import es6Promise from 'es6-promise'
es6Promise.polyfill()

Vue.use(Vuex)

let state = {
  creatData: {
    planId: null,
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
  CLEARCREATDATA (state, planId) {
    // 清除数据
    state.creatData = {
      planId: planId,
      creatBasice: {
        name: '',
        group: '',
        day: '',
        all: '',
        date: [],
        channel: null
      },
      creatCity: null,
      creatTime: null,
      creatMaterial: null,
      creatStrategy: null,
      creatMedia: null,
      creatMediaType: null,
      creatScene: null
    }
  },
  PLANID (state, planId) {
    // 改变id的方法
    state.creatData.planId = planId
  },
  BASICE (state, basice) {
    // 改变creatBasice的方法
    state.creatData.creatBasice = basice
  },
  CITY (state, cityMsg) {
    if (state.creatData.creatCity === null) state.creatData.creatCity = {}
    state.creatData.creatCity[cityMsg.type] = cityMsg.msg
  },
  MEDIA (state, Media) {
    state.creatData.creatMedia = Media
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
