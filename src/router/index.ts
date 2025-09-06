import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('../views/Home.vue') },
  { path: '/register', name: 'UserRegister', component: () => import('../views/users/Register.vue') },
  { path: '/login', name: 'Login', component: () => import('../views/users/Login.vue') },
  { path: '/notes', name: 'UserNotes', component: () => import('../views/notes/Index.vue') },
  { path: '/users/:id/edit', name: 'UserEdit', component: () => import('../views/users/Edit.vue') },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
