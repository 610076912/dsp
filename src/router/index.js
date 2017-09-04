import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index/index'
import plan from '@/components/plan/plan'
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
      component: plan
    },
    {
      path: '/data',
      name: 'data',
      component: data,
      children: [
        {
          path: '/',
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
