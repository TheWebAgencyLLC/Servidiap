<template>
  <div class="col-span-6 border border-gray-300 rounded shadow p-4">
    <div class="flex justify-between items-center mb-4">
      <div class="flex items-center">
        <div class="w-5 h-5 border border-gray-500 flex items-center justify-center mr-2">
          <span class="text-xs">Icon</span>
        </div>
        <span class="font-medium">Studies Per Timeframe</span>
      </div>
      <button class="text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
    <UTable />
  </div>
</template>

<script setup>

</script>

<style>

</style>