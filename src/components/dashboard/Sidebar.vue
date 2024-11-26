<template>
  <div>
    <div
      :class="[
        'fixed inset-y-0 flex w-64 flex-col transition-transform duration-300 ease-in-out z-30',
        isMobile ? (isOpen ? 'translate-x-0' : '-translate-x-full') : (isOpen ? 'translate-x-0' : '-translate-x-full'),
      ]"
    >
      <div class="flex min-h-0 flex-1 flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div class="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <div class="flex flex-shrink-0 items-center px-4">
            <h1 class="text-xl font-bold dark:text-white">Your Logo</h1>
          </div>
          <nav class="mt-5 flex-1 space-y-1 px-2">
            <router-link
              v-for="item in menuItems"
              :key="item.name"
              :to="item.path"
              :class="[
                isActive(item.path)
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white',
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
              ]"
            >
              <component
                :is="item.icon"
                :class="[
                  isActive(item.path) ? 'text-gray-500 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-300',
                  'mr-3 flex-shrink-0 h-6 w-6'
                ]"
                aria-hidden="true"
              />
              {{ item.name }}
            </router-link>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { HomeIcon, ShoppingCartIcon, UsersIcon, UserGroupIcon } from '@heroicons/vue/24/outline'

defineProps<{
  isOpen: boolean
  isMobile: boolean
}>()

defineEmits<{
  (e: 'toggle'): void
}>()

const route = useRoute()

const menuItems = [
  { name: 'Dashboard', path: '/dashboard', icon: HomeIcon },
  { name: 'Orders', path: '/orders', icon: ShoppingCartIcon },
  { name: 'Clients', path: '/clients', icon: UsersIcon },
  { name: 'Users', path: '/users', icon: UserGroupIcon }
]

const isActive = (path: string) => route.path === path
</script>