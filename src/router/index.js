import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import('../views/Home.vue')
  },
  {
    name: 'map',
    path: '/map',
    component: () => import('../views/Map.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
