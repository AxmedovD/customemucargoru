import { defineStore } from 'pinia'
import { ref } from 'vue'
import { authApi } from '@/services/api'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<any>(null)
  const token = ref<string | null>(localStorage.getItem('token'))
  const loading = ref(false)
  const error = ref<string | null>(null)

  const setToken = (newToken: string | null) => {
    token.value = newToken
    if (newToken) {
      localStorage.setItem('token', newToken)
    } else {
      localStorage.removeItem('token')
    }
  }

  const login = async (email: string, password: string) => {
    try {
      loading.value = true
      error.value = null
      const response = await authApi.login(email, password)
      setToken(response.data.access_token)
      user.value = response.data.user
      router.push('/dashboard')
    } catch (err: any) {
      error.value = err.response?.data?.message || err.response?.data?.email?.[0] || 'Login failed'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  const register = async (name: string, email: string, password: string, password_confirmation: string) => {
    try {
      loading.value = true
      error.value = null
      const response = await authApi.register(name, email, password, password_confirmation)
      setToken(response.data.token)
      user.value = response.data.user
      router.push('/dashboard')
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Registration failed'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    try {
      loading.value = true
      await authApi.logout()
      setToken(null)
      user.value = null
      router.push('/auth/login')
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Logout failed'
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    token,
    loading,
    error,
    login,
    register,
    logout
  }
})