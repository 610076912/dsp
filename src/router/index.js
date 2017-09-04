import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index/index'
// 推广计划及子页面
import plan from '@/components/plan/plan'
import planIndex from '@/components/plan/plan-index'
import creatnew1 from '@/components/plan/creat-new1'
import creatnew2 from '@/components/plan/creat-new2'

import data from '@/components/data/data'
import plandata from '@/components/data/plandata'
import mediadata from '@/components/data/mediadata'
import finance from '@/components/finance/finance'

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
          path: '/creatnew1',
          name: 'creatnew1',
          component: creatnew1
        },
        {
          path: 'creatnew2',
          name: 'creatnew2',
          component: creatnew2
        },
        {
          path: 'creatnew3',
          component: planIndex
        },
        {
          path: 'creatnew4',
          component: planIndex
        },
        {
          path: 'creatnew5',
          component: planIndex
        },
        {
          path: 'creatnew6',
          component: planIndex
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
      component: finance
    }

  ]
})
