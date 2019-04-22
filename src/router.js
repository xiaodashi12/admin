import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component:() => import('./views/Login')
    },
    {
      path: '/',
      component:() => import('./views/dashboard'),
      redirect:'/dashboard',
      name:'Dashboard',
      hidden: true,
      children: [{
        path: 'dashboard',
        component: () => import('./views/dashboard/index')
      }]
    },
  ]
})
