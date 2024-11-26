<template>
  <div class="bg-white dark:bg-gray-800 shadow rounded-lg mb-6">
    <div class="p-6 space-y-6">
      <!-- Basic Filters -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="space-y-1">
          <Input
            id="orderNumber"
            label="Order Number"
            v-model="filters.orderNumber"
            placeholder="Search by order number"
          >
            <template #prefix>
              <HashtagIcon class="h-5 w-5 text-gray-400" />
            </template>
          </Input>
        </div>
        
        <div class="space-y-1">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Client</label>
          <div class="relative">
            <select
              v-model="filters.client"
              class="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10 pr-4 py-2.5"
            >
              <option value="">All Clients</option>
              <option v-for="client in clients" :key="client" :value="client">{{ client }}</option>
            </select>
            <BuildingStorefrontIcon class="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>

        <div class="space-y-1">
          <Input
            id="phone"
            label="Phone Number"
            v-model="filters.phone"
            placeholder="Search by phone"
          >
            <template #prefix>
              <PhoneIcon class="h-5 w-5 text-gray-400" />
            </template>
          </Input>
        </div>
      </div>

      <!-- Date Filters -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-3">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Created Date</label>
          <div class="flex space-x-4">
            <div class="flex-1">
              <Input
                type="date"
                v-model="filters.createdDateFrom"
                placeholder="From"
              >
                <template #prefix>
                  <CalendarIcon class="h-5 w-5 text-gray-400" />
                </template>
              </Input>
            </div>
            <div class="flex-1">
              <Input
                type="date"
                v-model="filters.createdDateTo"
                placeholder="To"
              >
                <template #prefix>
                  <CalendarIcon class="h-5 w-5 text-gray-400" />
                </template>
              </Input>
            </div>
          </div>
        </div>
        
        <div class="space-y-3">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Edit Date</label>
          <div class="flex space-x-4">
            <div class="flex-1">
              <Input
                type="date"
                v-model="filters.lastEditDateFrom"
                placeholder="From"
              >
                <template #prefix>
                  <CalendarIcon class="h-5 w-5 text-gray-400" />
                </template>
              </Input>
            </div>
            <div class="flex-1">
              <Input
                type="date"
                v-model="filters.lastEditDateTo"
                placeholder="To"
              >
                <template #prefix>
                  <CalendarIcon class="h-5 w-5 text-gray-400" />
                </template>
              </Input>
            </div>
          </div>
        </div>
      </div>

      <!-- Filter Actions -->
      <div class="flex justify-end space-x-3">
        <Button 
          variant="secondary" 
          @click="resetFilters"
          class="flex items-center"
        >
          <ArrowPathIcon class="h-4 w-4 mr-1" />
          Reset
        </Button>
        <Button 
          variant="primary" 
          @click="applyFilters"
          class="flex items-center"
        >
          <FunnelIcon class="h-4 w-4 mr-1" />
          Apply Filters
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import { 
  ArrowPathIcon,
  FunnelIcon,
  HashtagIcon,
  BuildingStorefrontIcon,
  PhoneIcon,
  CalendarIcon
} from '@heroicons/vue/24/outline'

const emit = defineEmits<{
  (e: 'reset'): void
  (e: 'apply', filters: typeof filters.value): void
}>()

const filters = ref({
  orderNumber: '',
  client: '',
  phone: '',
  createdDateFrom: '',
  createdDateTo: '',
  lastEditDateFrom: '',
  lastEditDateTo: ''
})

const clients = ['Mgoods', 'MyShop', 'XM-Shop']

const resetFilters = () => {
  filters.value = {
    orderNumber: '',
    client: '',
    phone: '',
    createdDateFrom: '',
    createdDateTo: '',
    lastEditDateFrom: '',
    lastEditDateTo: ''
  }
  emit('reset')
}

const applyFilters = () => {
  emit('apply', filters.value)
}
</script>