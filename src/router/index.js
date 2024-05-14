import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue') // Değişiklik burada
    },
    {
      path: '/us',
      name: 'us',
      component: () => import('../views/Us.vue')
    }
  ]
})

export default router
