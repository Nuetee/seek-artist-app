import { createRouter, createWebHistory } from 'vue-router'
import { 
  save,
  refresh,
  getAccessToken,
  getRefreshToken,
  existCookie,
  isAuth,
  logout
} from '@/modules/auth'
import { authByToken } from '@/modules/kakao'

import MyPage from '../views/MyPage.vue'
import ArtworkRegisterPage from '../views/ArtworkRegisterPage.vue'
import ProfileModifyPage from '../views/ProfileModifyPage.vue'

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
    path: '/profile-modify',
    name: 'profileModifyPage',
    component: ProfileModifyPage
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginPage.vue')
  },
  {
    path: '/auth',
    name: 'AuthPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/AuthPage.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Global navigation guard
router.beforeEach(async function (to, from, next) {

  // Authorization result
  let result = false

  // No authorization information
  if (!isAuth()) {

    // Auto login with Kakao
    if (existCookie('kakao')) {
      const access_token = getAccessToken('kakao')
      const refresh_token = getRefreshToken('kakao')
      const auth_result = await authByToken(access_token, refresh_token)

      // Authentication success
      if (auth_result) {
        await save(
          auth_result.user_id, 
          'kakao', 
          auth_result.access_token, 
          auth_result.profile_image, 
          auth_result.thumbnail_image)
        result = await refresh(
          auth_result.user_id, 
          'kakao', 
          auth_result.access_token, 
          auth_result.refresh_token, 
          auth_result.expire_time)
      }
      else {
        logout('kakao')
      }
    } 
  }

  // Authorized before
  else {
    result = true
  }

  // Guard before access to mainPage
  if (!result && to.path === '/') {
    next('/login')
  } 
  else {
    next()
  }

})

export default router
