<template>
  <div class="col-span-4 border border-gray-300 rounded shadow p-4">
    <div class="flex justify-between items-center mb-4">
      <div class="flex items-center">
        <div class="flex mr-2">
          <UIcon name="i-fa-solid:procedures" class="size-5" />
        </div>
        <span class="font-medium">Studies Per Timeframe</span>
      </div>
      <button class="text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
    <UTable :data="limitedData" class="flex-1"/>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

const data = ref([
  { studyName: 'General Checkup', quantity: 42 },
  { studyName: 'Blood Panel', quantity: 78 },
  { studyName: 'X-Ray', quantity: 35 },
  { studyName: 'MRI Scan', quantity: 23 },
  { studyName: 'Ultrasound', quantity: 56 },
  { studyName: 'ECG', quantity: 45 },
  { studyName: 'Stress Test', quantity: 19 },
  { studyName: 'Endoscopy', quantity: 12 },
  { studyName: 'Colonoscopy', quantity: 17 },
  { studyName: 'Pediatric Assessment', quantity: 31 }
]);

const limitedData = computed(() => {
  return data.value.slice(0, 5);
});
</script>

<style>
</style>