<template>
  <footer class="bg-white dark:bg-gray-800 shadow mt-8">
    <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <p class="text-center text-sm text-gray-500 dark:text-gray-400">
        © {{ currentYear }} Your Company. All rights reserved.
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>