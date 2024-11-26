import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import LoginPage from '@/pages/auth/LoginPage.vue'
import RegisterPage from '@/pages/auth/RegisterPage.vue'
import ResetPasswordPage from '@/pages/auth/ResetPasswordPage.vue'
import DashboardPage from '@/pages/DashboardPage.vue'
import OrdersPage from '@/pages/OrdersPage.vue'
import ClientsPage from '@/pages/ClientsPage.vue'
import UsersPage from '@/pages/UsersPage.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/auth/login',
      component: LoginPage,
      meta: { requiresGuest: true }
    },
    {
      path: '/auth/register',
      component: RegisterPage,
      meta: { requiresGuest: true }
    },
    {
      path: '/auth/reset-password',
      component: ResetPasswordPage,
      meta: { requiresGuest: true }
    },
    {
      path: '/',
      component: DashboardLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: DashboardPage
        },
        {
          path: 'orders',
          name: 'Orders',
          component: OrdersPage
        },
        {
          path: 'clients',
          name: 'Clients',
          component: ClientsPage
        },
        {
          path: 'users',
          name: 'Users',
          component: UsersPage
        },
        {
          path: '',
          redirect: '/dashboard'
        }
      ]
    }
  ]
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  
  if (to.meta.requiresAuth && !auth.token) {
    next('/auth/login')
  } else if (to.meta.requiresGuest && auth.token) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router