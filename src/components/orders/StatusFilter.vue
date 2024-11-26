<template>
  <div class="bg-white dark:bg-gray-800 shadow rounded-lg w-64 flex-shrink-0">
    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
      <h3 class="text-sm font-medium text-gray-700 dark:text-gray-200">Order Status</h3>
    </div>
    
    <div class="p-4">
      <button 
        class="w-full text-left py-2 px-3 rounded-md mb-3 flex items-center justify-between"
        :class="selectedStatus === 'all' ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'"
        @click="selectStatus('all')"
      >
        <div class="flex items-center">
          <InboxStackIcon class="h-5 w-5 mr-2" />
          <span>All Orders</span>
        </div>
        <span class="text-sm font-medium">{{ orders.length }}</span>
      </button>
      
      <div class="space-y-2">
        <button 
          v-for="status in Object.keys(statusConfig)" 
          :key="status"
          class="w-full text-left py-2 px-3 rounded-md text-sm flex items-center justify-between transition-colors duration-150"
          :class="[
            selectedStatus === status ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700',
          ]"
          @click="selectStatus(status)"
        >
          <div class="flex items-center">
            <component :is="getStatusIcon(status)" class="h-5 w-5 mr-2" :class="getStatusIconColor(status)" />
            <span>{{ status }}</span>
          </div>
          <span class="font-medium" :class="getStatusTextColor(status)">{{ getStatusCount(status) }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  InboxStackIcon,
  ClockIcon,
  CheckCircleIcon,
  TruckIcon,
  XCircleIcon,
  CheckIcon,
  ArrowUturnLeftIcon,
  CurrencyDollarIcon
} from '@heroicons/vue/24/outline'

const props = defineProps<{
  orders: Array<{
    id: string
    status: string
    [key: string]: any
  }>
}>()

const emit = defineEmits<{
  (e: 'update:status', status: string): void
}>()

const selectedStatus = ref('all')

const statusConfig = {
  'New': {
    icon: ClockIcon,
    iconColor: 'text-yellow-500',
    textColor: 'text-yellow-600 dark:text-yellow-400'
  },
  'Accept': {
    icon: CheckCircleIcon,
    iconColor: 'text-blue-500',
    textColor: 'text-blue-600 dark:text-blue-400'
  },
  'Send': {
    icon: TruckIcon,
    iconColor: 'text-purple-500',
    textColor: 'text-purple-600 dark:text-purple-400'
  },
  'Delivering': {
    icon: TruckIcon,
    iconColor: 'text-indigo-500',
    textColor: 'text-indigo-600 dark:text-indigo-400'
  },
  'Cancel': {
    icon: XCircleIcon,
    iconColor: 'text-red-500',
    textColor: 'text-red-600 dark:text-red-400'
  },
  'Delivered': {
    icon: CheckIcon,
    iconColor: 'text-green-500',
    textColor: 'text-green-600 dark:text-green-400'
  },
  'Back': {
    icon: ArrowUturnLeftIcon,
    iconColor: 'text-orange-500',
    textColor: 'text-orange-600 dark:text-orange-400'
  },
  'Sold': {
    icon: CurrencyDollarIcon,
    iconColor: 'text-emerald-500',
    textColor: 'text-emerald-600 dark:text-emerald-400'
  }
}

const getStatusCount = (status: string) => {
  return props.orders.filter(order => order.status === status).length
}

const getStatusIcon = (status: string) => {
  return statusConfig[status as keyof typeof statusConfig].icon
}

const getStatusIconColor = (status: string) => {
  return statusConfig[status as keyof typeof statusConfig].iconColor
}

const getStatusTextColor = (status: string) => {
  return statusConfig[status as keyof typeof statusConfig].textColor
}

const selectStatus = (status: string) => {
  selectedStatus.value = status
  emit('update:status', status)
}
</script>