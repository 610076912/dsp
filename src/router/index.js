import Vue from 'vue'
import Router from 'vue-router'
const Index = () => import('@/components/index/index')
// import index from '@/components/index/index'
import login from '@/components/index/login'
// 推广计划及子页面
const plan = () => import(/* webpackChunkName: "plan" */ '@/components/plan/plan')
const planIndex = () => import(/* webpackChunkName: "plan" */ '@/components/plan/plan-index')
const creatBasics = () => import(/* webpackChunkName: "plan" */ '@/components/plan/creat-basics')
const creatScene = () => import(/* webpackChunkName: "plan" */ '@/components/plan/creat-scene')
const creatTime = () => import(/* webpackChunkName: "plan" */ '@/components/plan/creat-time')
const creatCity = () => import(/* webpackChunkName: "plan" */ '@/components/plan/creat-city')
const creatKabCity = () => import(/* webpackChunkName: "plan" */ '@/components/plan/creat-city1')
const creatMedia = () => import(/* webpackChunkName: "plan" */ '@/components/plan/creat-media')
const creatMediaType = () => import(/* webpackChunkName: "plan" */ '@/components/plan/creat-mediatype')
const creatEpisode = () => import(/* webpackChunkName: "plan" */ '@/components/plan/creat-episode')
const creatStrategy = () => import(/* webpackChunkName: "plan" */ '@/components/plan/creat-strategy')
const creatPreview = () => import(/* webpackChunkName: "plan" */ '@/components/plan/creat-preview')
const creatMaterial = () => import(/* webpackChunkName: "plan" */ '@/components/plan/creat-material')
const creatUserDevice = () => import(/* webpackChunkName: "plan" */ '@/components/plan/creat-user&device')
const creatSmartScene = () => import(/* webpackChunkName: "plan" */ '@/components/plan/creat-smart-scene')
// import plan from '@/components/plan/plan'
// import planIndex from '@/components/plan/plan-index'
// import creatBasics from '@/components/plan/creat-basics'
// import creatScene from '@/components/plan/creat-scene'
// import creatTime from '@/components/plan/creat-time'
// import creatCity from '@/components/plan/creat-city'
// import creatMedia from '@/components/plan/creat-media'
// import creatMediaType from '@/components/plan/creat-mediatype'
// import creatStrategy from '@/components/plan/creat-strategy'
// import creatPreview from '@/components/plan/creat-preview'
// import creatMaterial from '@/components/plan/creat-material'
const data = () => import(/* webpackChunkName: "data" */ '@/components/data/data')
const plandata = () => import(/* webpackChunkName: "data" */ '@/components/data/plandata')
const mediadata = () => import(/* webpackChunkName: "data" */ '@/components/data/mediadata')
const timebucket = () => import(/* webpackChunkName: "data" */ '@/components/data/timebucket')
const adseat = () => import(/* webpackChunkName: "data" */ '@/components/data/adseat')
const occupy = () => import(/* webpackChunkName: "data" */ '@/components/data/occupy')

// 引入财务管理页面
const finance = () => import(/* webpackChunkName: "finance" */ '@/components/finance/finance')
const finaDetail = () => import(/* webpackChunkName: "finance" */ '@/components/finance/fina-detail')
const finaHistory = () => import(/* webpackChunkName: "finance" */ '@/components/finance/fina-history')
// import data from '@/components/data/data'
// import plandata from '@/components/data/plandata'
// import mediadata from '@/components/data/mediadata'
// import finance from '@/components/finance/finance'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      component: Index
    },
    {
      path: '/',
      name: 'index',
      component: Index,
      meta: { Auth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/plan',
      component: plan,
      meta: { Auth: true },
      children: [
        {
          path: '',
          name: 'planIndex',
          component: planIndex
        },
        {
          path: '/creatBasics',
          name: 'creatBasics',
          component: creatBasics,
          props: true
        },
        {
          path: '/creatUserDevice',
          name: 'creatUserDevice',
          component: creatUserDevice
        },
        {
          path: '/creatScene',
          name: 'creatScene',
          component: creatScene
        },
        {
          path: '/creatEpisode',
          name: 'creatEpisode',
          component: creatEpisode
        },
        {
          path: '/creatTime',
          name: 'creatTime',
          component: creatTime
        },
        {
          path: '/creatCity',
          name: 'creatCity',
          component: creatCity
        },
        {
          path: '/creatKabCity',
          name: 'creatKabCity',
          component: creatKabCity
        },
        {
          path: '/creatMedia',
          name: 'creatMedia',
          component: creatMedia
        },
        {
          path: '/creatMediaType',
          name: 'creatMediaType',
          component: creatMediaType
        },
        {
          path: '/creatStrategy',
          name: 'creatStrategy',
          component: creatStrategy
        },
        {
          path: '/creatPreview',
          name: 'creatPreview',
          component: creatPreview
        },
        {
          path: '/creatMaterial',
          name: 'creatMaterial',
          component: creatMaterial
        },
        {
          path: '/creatSmartScene',
          name: 'creatSmartScene',
          component: creatSmartScene
        }
      ]
    },
    {
      path: '/data',
      component: data,
      meta: { Auth: true },
      children: [
        {
          path: '',
          name: 'plandata',
          component: plandata
        },
        {
          path: '/mediadata',
          name: 'mediadata',
          component: mediadata
        },
        {
          path: '/timebucket',
          name: '时段分析',
          component: timebucket
        },
        {
          path: '/adseat',
          name: 'adseat',
          component: adseat
        },
        {
          path: '/occupy',
          name: 'occupy',
          component: occupy
        }
      ]
    },
    {
      path: '/finance',
      component: finance,
      meta: { Auth: true },
      children: [
        {
          path: '',
          name: 'finaDetail',
          component: finaDetail
        },
        {
          path: '/finaHistory',
          name: 'finaHistory',
          component: finaHistory
        }
      ]
    }
  ]
})

