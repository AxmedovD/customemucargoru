<template>
  <div>
    <!-- Header with New Order button -->
    <div class="mb-6 flex justify-between items-center">
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">Orders</h1>
      <Button variant="primary" class="flex items-center">
        <PlusIcon class="h-5 w-5 mr-1.5" />
        New Order
      </Button>
    </div>

    <!-- Filters -->
    <OrderFilters
      @reset="handleFilterReset"
      @apply="handleFilterApply"
    />

    <!-- Main Content Area -->
    <div class="flex space-x-6">
      <!-- Status Filter Sidebar -->
      <StatusFilter
        :orders="filteredOrders"
        v-model:status="selectedStatus"
      />

      <!-- Orders Table and Actions -->
      <div class="flex-1">
        <OrdersTable
          :orders="paginatedOrders"
          v-model:selectedCount="selectedCount"
          v-model:selectedOrders="selectedOrders"
        />

        <OrdersActions
          :current-page="currentPage"
          :total-pages="totalPages"
          :total-orders="filteredOrders.length"
          :selected-count="selectedCount"
          :start-index="startIndex"
          :end-index="endIndex"
          :orders="orders"
          :selected-orders="selectedOrders"
          @update:page="handlePageChange"
          @update:status="handleStatusUpdate"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { PlusIcon } from '@heroicons/vue/24/outline'
import Button from '@/components/ui/Button.vue'
import OrderFilters from '@/components/orders/OrderFilters.vue'
import OrdersTable from '@/components/orders/OrdersTable.vue'
import StatusFilter from '@/components/orders/StatusFilter.vue'
import OrdersActions from '@/components/orders/OrdersActions.vue'

// State
const selectedStatus = ref('all')
const selectedCount = ref(0)
const selectedOrders = ref<string[]>([])
const currentPage = ref(1)
const itemsPerPage = 8

// Sample orders data
const orders = ref([
  {
    id: '139440',
    date: '2024-01-23 20:50',
    shop: 'Mgoods',
    orderType: 'Cart',
    customer: 'Muslimbek',
    phone: '+998993610851',
    manager: '—',
    items: 'Anti Vibration Device',
    status: 'New',
    price: 77000
  },
  {
    id: '139439',
    date: '2024-01-23 19:45',
    shop: 'MyShop',
    orderType: 'Cart',
    customer: 'Wukrona Mansurova',
    phone: '+998932951421',
    manager: 'John Smith',
    items: 'Arab Tabobati Xurmo',
    status: 'Delivering',
    price: 197000
  },
  // ... rest of the orders data
])

// Computed properties
const filteredOrders = computed(() => {
  return orders.value.filter(order => {
    if (selectedStatus.value === 'all') return true
    return order.status === selectedStatus.value
  })
})

const totalPages = computed(() => {
  return Math.ceil(filteredOrders.value.length / itemsPerPage)
})

const startIndex = computed(() => {
  return (currentPage.value - 1) * itemsPerPage
})

const endIndex = computed(() => {
  return Math.min(startIndex.value + itemsPerPage, filteredOrders.value.length)
})

const paginatedOrders = computed(() => {
  return filteredOrders.value.slice(startIndex.value, endIndex.value)
})

// Event handlers
const handleFilterReset = () => {
  selectedStatus.value = 'all'
  currentPage.value = 1
}

const handleFilterApply = (filters: any) => {
  // Apply filters logic here
  currentPage.value = 1
}

const handlePageChange = (page: number) => {
  currentPage.value = page
}

const handleStatusUpdate = (orderIds: string[], newStatus: string) => {
  orders.value = orders.value.map(order => {
    if (orderIds.includes(order.id)) {
      return { ...order, status: newStatus }
    }
    return order
  })
  selectedOrders.value = []
  selectedCount.value = 0
}
</script>