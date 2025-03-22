<template>
  <div class="col-span-4 border border-gray-300 rounded shadow p-4">
    <div class="flex justify-between items-center mb-4">
      <div class="flex items-center">
        <div class="flex mr-2">
          <UIcon name="i-material-symbols-light:request-quote-outline" class="size-5" />
        </div>
        <span class="font-medium">Quotes</span>
      </div>
      <a href="#" class="text-sm text-gray-500">See all</a>
    </div>
          
    <UTable :data="limitedData" class="flex-1" />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

const data = ref([
  { quoteNo: 'Q2024-0001', profit: '$3,450.00' },
  { quoteNo: 'Q2024-0002', profit: '$1,875.50' },
  { quoteNo: 'Q2024-0003', profit: '$5,230.75' },
  { quoteNo: 'Q2024-0004', profit: '$2,145.00' },
  { quoteNo: 'Q2024-0005', profit: '$3,780.25' },
  { quoteNo: 'Q2024-0006', profit: '$4,125.50' },
  { quoteNo: 'Q2024-0007', profit: '$1,950.00' },
  { quoteNo: 'Q2024-0008', profit: '$6,350.75' },
  { quoteNo: 'Q2024-0009', profit: '$875.25' },
  { quoteNo: 'Q2024-0010', profit: '$4,500.00' }
]);

const limitedData = computed(() => {
  return data.value.slice(0, 5);
});
</script>

<style>
</style>