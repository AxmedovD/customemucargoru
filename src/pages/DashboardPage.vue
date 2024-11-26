<template>
  <div>
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div v-for="stat in stats" :key="stat.name" class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <component :is="stat.icon" class="h-6 w-6 text-gray-400 dark:text-gray-500" aria-hidden="true" />
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{{ stat.name }}</dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ stat.value }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="mt-8">
      <h2 class="text-lg font-medium text-gray-900 dark:text-white">Recent Activity</h2>
      <div class="mt-4 bg-white dark:bg-gray-800 shadow rounded-lg">
        <div class="p-6">
          <p class="text-gray-500 dark:text-gray-400">Your recent activity will appear here.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { HomeIcon, ShoppingCartIcon, UsersIcon, UserGroupIcon, CurrencyDollarIcon } from '@heroicons/vue/24/outline'

const stats = [
  { name: 'Total Orders', value: '246', icon: ShoppingCartIcon },
  { name: 'Total Clients', value: '156', icon: UsersIcon },
  { name: 'Active Users', value: '89', icon: UserGroupIcon },
  { name: 'Revenue', value: '$24,560', icon: CurrencyDollarIcon },
]
</script>