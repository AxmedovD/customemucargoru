<template>
  <AuthLayout>
    <template #title>Sign in to your account</template>
    
    <form class="space-y-6" @submit.prevent="handleSubmit">
      <div v-if="error" class="bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-200 p-3 rounded-md text-sm">
        {{ error }}
      </div>

      <Input
        id="email"
        label="Email address"
        type="email"
        v-model="email"
        placeholder="Enter your email"
        required
      />

      <Input
        id="password"
        label="Password"
        type="password"
        v-model="password"
        placeholder="Enter your password"
        required
      />

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input
            id="remember-me"
            type="checkbox"
            v-model="rememberMe"
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          >
          <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
        </div>

        <router-link to="/auth/reset-password" class="text-sm font-medium text-blue-600 hover:text-blue-500">
          Forgot your password?
        </router-link>
      </div>

      <Button variant="primary" class="w-full" :disabled="loading">
        <template v-if="loading">Signing in...</template>
        <template v-else>Sign in</template>
      </Button>

      <div class="text-sm text-center">
        <router-link to="/auth/register" class="font-medium text-blue-600 hover:text-blue-500">
          Don't have an account? Sign up
        </router-link>
      </div>
    </form>
  </AuthLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import AuthLayout from '@/layouts/AuthLayout.vue'
import Input from '@/components/ui/Input.vue'
import Button from '@/components/ui/Button.vue'

const auth = useAuthStore()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const error = ref('')

const handleSubmit = async () => {
  try {
    error.value = ''
    await auth.login(email.value, password.value)
  } catch (err: any) {
    error.value = err
  }
}
</script>