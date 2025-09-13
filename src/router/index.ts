import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHistory } from 'vue-router'

type RouterInfo = {
  path: string
  name: string
}

export const routerInfo = {
  home: { path: '/', name: 'Home' } as RouterInfo,
  register: { path: '/register', name: 'UserRegister' } as RouterInfo,
  login: { path: '/login', name: 'Login' } as RouterInfo,
  notes: { path: '/notes', name: 'UserNotes' } as RouterInfo,
  userEdit: { path: '/users/:id/edit', name: 'UserEdit' } as RouterInfo,
}

const routes = [
  { ...routerInfo.home, component: () => import('../views/Home.vue') },
  { ...routerInfo.register, component: () => import('../views/users/Register.vue') },
  { ...routerInfo.login, component: () => import('../views/users/Login.vue') },
  { ...routerInfo.notes, component: () => import('../views/notes/Index.vue'), meta: { requiresAuth: true } },
  { ...routerInfo.userEdit, component: () => import('../views/users/Edit.vue'), meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()

  if (!authStore.accessToken) {
    authStore.loadAuth()
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ path: routerInfo.login.path })
  } else {
    next()
  }
})

export default router
