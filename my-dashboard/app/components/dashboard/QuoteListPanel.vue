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
  { quoteNo: 'Q2024-0001', patientName: 'john' },
  { quoteNo: 'Q2024-0002', patientName: 'bill' },
  { quoteNo: 'Q2024-0003', patientName: 'james' },
  { quoteNo: 'Q2024-0004', patientName: 'mary' },
  { quoteNo: 'Q2024-0005', patientName: 'kate' },
  { quoteNo: 'Q2024-0006', patientName: 'carlos' },
  { quoteNo: 'Q2024-0007', patientName: 'this guy' },
  { quoteNo: 'Q2024-0008', patientName: 'sneh' },
  { quoteNo: 'Q2024-0009', patientName: 'rafael' },
  { quoteNo: 'Q2024-0010', patientName: 'jethro' }
]);

const limitedData = computed(() => {
  return data.value.slice(0, 5);
});
</script>

<style>
</style>