import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('../layouts/index.vue'),
    meta: { hidden: true },
    children: [
      {
        path: '/',
        component: () => import('../views/home/index.vue'),
        name: 'Dashboard',
        meta: { icon: 's-home', affix: true, title: '首页' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
