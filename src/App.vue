<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useDarkMode } from './composables/useDarkMode'

const { isDarkMode } = useDarkMode()

onMounted(() => {
  // Initialize dark mode on app mount
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  }
})
</script>