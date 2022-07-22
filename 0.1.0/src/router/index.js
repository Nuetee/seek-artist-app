import { createRouter, createWebHistory } from 'vue-router'
import MyPage from '../views/MyPage.vue'
import ArtworkRegisterPage from '../views/ArtworkRegisterPage.vue'

const routes = [
  {
    path: '/',
    name: 'myPage',
    component: MyPage
  },
  {
    path: '/artwork-register',
    name: 'artworkRegisterPage',
    component: ArtworkRegisterPage
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
