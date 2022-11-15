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

import ProfilePage from '../views/ProfilePage.vue'
import ArtworkRegisterPage from '../views/ArtworkRegisterPage.vue'
import ArtworkModifyPage from '../views/ArtworkModifyPage.vue'
import ExhibitionRegisterPage from '../views/ExhibitionRegisterPage.vue'
import ExhibitionModifyPage from '../views/ExhibitionModifyPage.vue'

const routes = [
  {
    path: '/',
    name: 'profilePage',
    component: ProfilePage
  },
  {
    path: '/artwork-register',
    name: 'artworkRegisterPage',
    component: ArtworkRegisterPage
  },
  {
    path: '/exhibition-register',
    name: 'exhibitionRegisterPage',
    component: ExhibitionRegisterPage
  },
  {
    path: '/exhibition-modify',
    name: 'exhibitionModifyPage',
    component: ExhibitionModifyPage
  },
  {
    path: '/artwork-modify',
    name: 'artworkModifyPage',
    component: ArtworkModifyPage
  },
  {
    path: '/profile-modify',
    name: 'profileModifyPage',
    component: () => import('../views/ProfileModifyPage.vue')
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
  {
    path: '/invitation',
    name: 'InvitationPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/InvitationPage.vue')
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import(/* webpackChunkName: "about" */ '../views/Test.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const guard_path = [
  '/',
  '/artwork-modify',
  '/artwork-register',
  '/exhibition-register',
  '/profile-modify'
]

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
        result = await save(
          auth_result.user_id, 
          'kakao', 
          auth_result.access_token, 
          auth_result.profile_image, 
          auth_result.thumbnail_image)
        await refresh(
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
  if (guard_path.includes(to.path) && !result) {
    next('/login')
  } 
  else {
    next()
  }

})

export default router
