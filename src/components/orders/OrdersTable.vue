<template>
  <div class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th scope="col" class="px-6 py-3 text-left">
              <div class="flex items-center">
                <input
                  type="checkbox"
                  :checked="allSelected"
                  @change="toggleAll"
                  class="h-4 w-4 text-blue-600 rounded border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                >
              </div>
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Order ID</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Customer</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Price</th>
            <th scope="col" class="relative px-6 py-3">
              <span class="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="order in orders" :key="order.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <input
                type="checkbox"
                v-model="selectedOrders"
                :value="order.id"
                class="h-4 w-4 text-blue-600 rounded border-gray-300 dark:border-gray-600 focus:ring-blue-500"
              >
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">#{{ order.id }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900 dark:text-white">{{ order.customer }}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">{{ order.phone }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                :class="getStatusClass(order.status)">
                {{ order.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              {{ formatPrice(order.price) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                <PencilSquareIcon class="h-5 w-5" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Order Summary -->
    <div class="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
      <div class="flex justify-between items-center text-sm text-gray-700 dark:text-gray-300">
        <div class="space-x-4">
          <span>Total Orders: {{ orders.length }}</span>
          <span v-if="selectedOrders.length > 0">Selected: {{ selectedOrders.length }}</span>
        </div>
        <div class="space-x-4">
          <span>Total: {{ formatPrice(totalPrice) }}</span>
          <span v-if="selectedOrders.length > 0">Selected Total: {{ formatPrice(selectedTotal) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { PencilSquareIcon } from '@heroicons/vue/24/outline'

const props = defineProps<{
  orders: Array<{
    id: string
    customer: string
    phone: string
    status: string
    price: number
  }>
}>()

const emit = defineEmits<{
  (e: 'update:selectedCount', count: number): void
  (e: 'update:selectedOrders', orderIds: string[]): void
}>()

const selectedOrders = ref<string[]>([])

const allSelected = computed(() => {
  return props.orders.length > 0 && selectedOrders.value.length === props.orders.length
})

const totalPrice = computed(() => {
  return props.orders.reduce((sum, order) => sum + order.price, 0)
})

const selectedTotal = computed(() => {
  return props.orders
    .filter(order => selectedOrders.value.includes(order.id))
    .reduce((sum, order) => sum + order.price, 0)
})

const toggleAll = (event: Event) => {
  const checked = (event.target as HTMLInputElement).checked
  selectedOrders.value = checked ? props.orders.map(order => order.id) : []
}

const getStatusClass = (status: string) => {
  const classes = {
    'New': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'Accept': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'Send': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    'Delivering': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
    'Cancel': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    'Delivered': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'Back': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    'Sold': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
  }
  return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('uz-UZ', {
    style: 'currency',
    currency: 'UZS'
  }).format(price)
}

// Watch selected orders and emit both count and IDs
watch(selectedOrders, (newValue) => {
  emit('update:selectedCount', newValue.length)
  emit('update:selectedOrders', newValue)
})
</script>