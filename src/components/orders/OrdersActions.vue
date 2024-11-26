<template>
  <div class="mt-6">
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg">
      <div class="px-6 py-4">
        <div class="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <!-- Action Buttons -->
          <div class="flex items-center space-x-3">
            <div v-if="selectedCount > 0" class="flex items-center">
              <div class="relative">
                <select
                  v-model="selectedStatus"
                  class="appearance-none rounded-l-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm pl-10 pr-10 py-2.5"
                >
                  <option value="" disabled>Change Status</option>
                  <option v-for="status in statusOptions" :key="status" :value="status">
                    {{ status }}
                  </option>
                </select>
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <TagIcon class="h-5 w-5 text-gray-400" />
                </div>
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <ChevronDownIcon class="h-5 w-5 text-gray-400" />
                </div>
              </div>

              <button
                :disabled="!selectedStatus"
                @click="updateOrderStatuses"
                class="inline-flex items-center px-4 py-2.5 rounded-r-md border border-l-0 border-gray-300 dark:border-gray-600 text-sm font-medium shadow-sm
                  transition-colors duration-200 ease-in-out
                  disabled:opacity-50 disabled:cursor-not-allowed
                  enabled:hover:bg-gray-50 enabled:dark:hover:bg-gray-700
                  text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800"
              >
                <CheckIcon 
                  class="h-4 w-4 mr-1.5"
                  :class="selectedStatus ? 'text-green-500' : 'text-gray-400'"
                />
                Apply to {{ selectedCount }} orders
              </button>
            </div>

            <div class="h-8 w-px bg-gray-200 dark:bg-gray-700" v-if="selectedCount > 0"></div>

            <Button 
              variant="secondary"
              class="flex items-center"
              @click="exportToExcel"
            >
              <ArrowDownTrayIcon class="h-4 w-4 mr-1.5" />
              Export {{ selectedCount ? 'Selected' : 'All' }}
            </Button>
          </div>

          <!-- Pagination -->
          <div class="flex items-center space-x-2">
            <Button
              variant="secondary"
              :disabled="currentPage === 1"
              @click="updatePage(currentPage - 1)"
              class="text-sm"
            >
              <ChevronLeftIcon class="h-4 w-4" />
            </Button>

            <div class="flex items-center space-x-1">
              <button
                v-for="page in displayedPages"
                :key="page"
                @click="updatePage(page)"
                class="px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out"
                :class="page === currentPage ? 
                  'bg-blue-600 text-white' : 
                  'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                {{ page }}
              </button>
            </div>

            <Button
              variant="secondary"
              :disabled="currentPage === totalPages"
              @click="updatePage(currentPage + 1)"
              class="text-sm"
            >
              <ChevronRightIcon class="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import * as XLSX from 'xlsx-js-style'
import { 
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowDownTrayIcon,
  TagIcon,
  ChevronDownIcon,
  CheckIcon
} from '@heroicons/vue/24/outline'
import Button from '@/components/ui/Button.vue'

const props = defineProps<{
  currentPage: number
  totalPages: number
  totalOrders: number
  selectedCount: number
  startIndex: number
  endIndex: number
  orders: Array<{
    id: string
    date: string
    shop: string
    orderType: string
    customer: string
    phone: string
    manager: string
    items: string
    status: string
    price: number
  }>
  selectedOrders: string[]
}>()

const emit = defineEmits<{
  (e: 'update:page', page: number): void
  (e: 'update:status', orderIds: string[], newStatus: string): void
}>()

const selectedStatus = ref('')

const statusOptions = [
  'New',
  'Accept',
  'Send',
  'Delivering',
  'Cancel',
  'Delivered',
  'Back',
  'Sold'
]

// Pagination logic
const displayedPages = computed(() => {
  const pages = []
  const maxDisplayed = 5
  let start = Math.max(1, props.currentPage - Math.floor(maxDisplayed / 2))
  let end = Math.min(props.totalPages, start + maxDisplayed - 1)

  if (end - start + 1 < maxDisplayed) {
    start = Math.max(1, end - maxDisplayed + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

const updatePage = (page: number) => {
  emit('update:page', page)
}

const updateOrderStatuses = () => {
  if (selectedStatus.value && props.selectedOrders.length > 0) {
    emit('update:status', props.selectedOrders, selectedStatus.value)
    selectedStatus.value = '' // Reset selection after update
  }
}

const exportToExcel = () => {
  // Filter orders based on selection
  const ordersToExport = props.selectedCount > 0 
    ? props.orders.filter(order => props.selectedOrders.includes(order.id))
    : props.orders

  // Prepare data for export
  const data = ordersToExport.map(order => ({
    'Order ID': order.id,
    'Date': order.date,
    'Shop': order.shop,
    'Order Type': order.orderType,
    'Customer': order.customer,
    'Phone': order.phone,
    'Manager': order.manager,
    'Items': order.items,
    'Status': order.status,
    'Price': order.price
  }))

  // Create workbook and worksheet
  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.json_to_sheet(data)

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Orders')

  // Generate filename with timestamp
  const timestamp = new Date().toISOString().split('T')[0]
  const filename = `orders_${timestamp}.xlsx`

  // Save file
  XLSX.writeFile(wb, filename)
}
</script>