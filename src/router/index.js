import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index/index'
// 推广计划及子页面
import plan from '@/components/plan/plan'
import planIndex from '@/components/plan/plan-index'

import data from '@/components/data/data'
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
        }
      ]
    },
    {
      path: '/data',
      name: 'data',
      component: data
    },
    {
      path: '/finance',
      name: 'finance',
      component: finance
    }

  ]
})
