<template>
  <AuthLayout>
    <template #title>Reset your password</template>
    
    <form class="space-y-6" @submit.prevent="handleSubmit">
      <p class="text-sm text-gray-600 text-center mb-6">
        Enter your email address and we'll send you a link to reset your password.
      </p>

      <Input
        id="email"
        label="Email address"
        type="email"
        v-model="email"
        placeholder="Enter your email"
      />

      <Button variant="primary" class="w-full">Send reset link</Button>

      <div class="text-sm text-center">
        <router-link to="/auth/login" class="font-medium text-blue-600 hover:text-blue-500">
          Back to sign in
        </router-link>
      </div>
    </form>
  </AuthLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import Input from '@/components/ui/Input.vue'
import Button from '@/components/ui/Button.vue'

const email = ref('')

const handleSubmit = () => {
  // Handle password reset logic here
  console.log({ email: email.value })
}
</script>