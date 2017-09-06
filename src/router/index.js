import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index/index'
// 推广计划及子页面
import plan from '@/components/plan/plan'
import planIndex from '@/components/plan/plan-index'
import creatBasics from '@/components/plan/creat-basics'
import creatScene from '@/components/plan/creat-scene'
import creatTime from '@/components/plan/creat-time'
import creatMedia from '@/components/plan/creat-media'
import creatMediaType from '@/components/plan/creat-mediatype'
import creatStrategy from '@/components/plan/creat-strategy'
import creatPreview from '@/components/plan/creat-preview'
import creatMaterial from '@/components/plan/creat-material'

import data from '@/components/data/data'
import plandata from '@/components/data/plandata'
import mediadata from '@/components/data/mediadata'
import finance from '@/components/finance/finance'

// 引入财务管理页面
// import finance from '@/components/finance/finance'
import finaCWGK from '@/components/finance/finaCWGK'
import finaCZJL from '@/components/finance/finaCZJL'
import finaHistory from '@/components/finance/finaHistory'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/plan',
      name: 'plan',
      component: plan,
      children: [
        {
          path: '',
          component: planIndex
        },
        {
          path: '/creatBasics',
          component: creatBasics
        },
        {
          path: '/creatScene',
          component: creatScene
        },
        {
          path: '/creatTime',
          component: creatTime
        },
        {
          path: '/creatMedia',
          component: creatMedia
        },
        {
          path: '/creatMediaType',
          component: creatMediaType
        },
        {
          path: '/creatStrategy',
          component: creatStrategy
        },
        {
          path: '/creatPreview',
          component: creatPreview
        },
        {
          path: '/creatMaterial',
          component: creatMaterial
        }
      ]
    },
    {
      path: '/data',
      name: 'data',
      component: data,
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
