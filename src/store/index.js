import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import es6Promise from 'es6-promise'
es6Promise.polyfill()

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

let state = {
  creatData: {
    planId: null,
    // 状态
    status: null,
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
    creatEpisode: null,
    creatScene: null,
    creatSmartScene: null,
    channel: null // 用来判别当前计划投放什么类型设备
  },
  materialData: {
    mediachannel: null,
    act_id: null
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
      creatScene: null,
      creatSmartScene: null,
      channel: null
    }
  },
  CHANNEL (state, channel) {
    // 改变id的方法
    state.creatData.channel = channel
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
  SMARTSCENE (state, smartScene) {
    state.creatData.creatSmartScene = smartScene
  },
  MEDIATYPE (state, mediatype) {
    state.creatData.creatMediaType = mediatype
  },
  EPISODE (state, episode) {
    state.creatData.creatEpisode = episode
  },
  STRATEGY (state, strategy) {
    state.creatData.creatStrategy = strategy
  },
  MEDIACHANNEL (state, mediaChannel) {
    state.materialData.mediachannel = mediaChannel
  },
  ACTID (state, actId) {
    state.materialData.act_id = actId
  },
  STATUS (state, status) {
    state.creatData.status = status
  }
}
export default new Vuex.Store({
  state,
  mutations,
  plugins: [vuexLocal.plugin]
})
