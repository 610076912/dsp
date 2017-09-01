import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index/index'
import plan from '@/components/plan/plan'
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
      component: plan
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
