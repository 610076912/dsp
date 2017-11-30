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
const creatMedia = () => import(/* webpackChunkName: "plan" */ '@/components/plan/creat-media')
const creatMediaType = () => import(/* webpackChunkName: "plan" */ '@/components/plan/creat-mediatype')
const creatStrategy = () => import(/* webpackChunkName: "plan" */ '@/components/plan/creat-strategy')
const creatPreview = () => import(/* webpackChunkName: "plan" */ '@/components/plan/creat-preview')
const creatMaterial = () => import(/* webpackChunkName: "plan" */ '@/components/plan/creat-material')
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
const finance = () => import(/* webpackChunkName: "finance" */ '@/components/finance/finance')
// import data from '@/components/data/data'
// import plandata from '@/components/data/plandata'
// import mediadata from '@/components/data/mediadata'
// import finance from '@/components/finance/finance'

// 引入财务管理页面
// import finance from '@/components/finance/finance'
import finaCWGK from '@/components/finance/finaCWGK'
import finaCZJL from '@/components/finance/finaCZJL'
import finaHistory from '@/components/finance/finaHistory'

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
      meta: {Auth: true}
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/plan',
      name: 'plan',
      component: plan,
      meta: {Auth: true},
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
          path: '/creatScene',
          name: 'creatScene',
          component: creatScene
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
        }
      ]
    },
    {
      path: '/data',
      name: 'data',
      component: data,
      meta: {Auth: true},
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
        }
      ]
    },
    {
      path: '/finance',
      name: 'finance',
      component: finance,
      meta: {Auth: true},
      children: [
        {
          path: '/',
          name: 'finaCWGK',
          component: finaCWGK
        },
        {
          path: '/finaCZJL',
          name: 'finaCZJL',
          component: finaCZJL
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

