<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <!-- Backdrop -->
    <div
      v-if="isSidebarOpen && isMobile"
      class="fixed inset-0 bg-gray-600 bg-opacity-75"
      @click="toggleSidebar"
    ></div>

    <!-- Sidebar -->
    <Sidebar 
      :is-open="isSidebarOpen" 
      :is-mobile="isMobile"
      @toggle="toggleSidebar" 
      class="transition-transform duration-300 ease-in-out"
    />

    <!-- Main Content -->
    <div 
      class="transition-all duration-300 ease-in-out"
      :class="{'lg:pl-64': isSidebarOpen}"
    >
      <Header :is-sidebar-open="isSidebarOpen" @toggle-sidebar="toggleSidebar" />
      <main class="py-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <router-view></router-view>
        </div>
      </main>
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Sidebar from '@/components/dashboard/Sidebar.vue'
import Header from '@/components/dashboard/Header.vue'
import Footer from '@/components/dashboard/Footer.vue'

const isSidebarOpen = ref(true)
const isMobile = ref(false)

const checkMobile = () => {
  isMobile.value = window.innerWidth < 1024
  if (isMobile.value) {
    isSidebarOpen.value = false
  }
}

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>