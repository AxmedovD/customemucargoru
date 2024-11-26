<template>
  <AuthLayout>
    <template #title>Create your account</template>
    
    <form class="space-y-6" @submit.prevent="handleSubmit">
      <div v-if="error" class="bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-200 p-3 rounded-md text-sm">
        {{ error }}
      </div>

      <Input
        id="name"
        label="Full name"
        type="text"
        v-model="name"
        placeholder="Enter your full name"
        required
      />

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
        placeholder="Create a password"
        required
      />

      <Input
        id="confirmPassword"
        label="Confirm password"
        type="password"
        v-model="confirmPassword"
        placeholder="Confirm your password"
        required
      />

      <Button variant="primary" class="w-full" :disabled="loading">
        <template v-if="loading">Creating account...</template>
        <template v-else>Create account</template>
      </Button>

      <div class="text-sm text-center">
        <router-link to="/auth/login" class="font-medium text-blue-600 hover:text-blue-500">
          Already have an account? Sign in
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

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')

const handleSubmit = async () => {
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    return
  }

  try {
    error.value = ''
    await auth.register(
      name.value,
      email.value,
      password.value,
      confirmPassword.value
    )
  } catch (err: any) {
    error.value = err
  }
}
</script>