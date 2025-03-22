<template>
  <div class="flex-1 p-4">
    <DashboardHeader class="mb-4" />
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-8 flex flex-col gap-4">
        <div class="flex gap-4">
          <div class="flex-1">
            <DashboardRevenueChart />
          </div>
          <div class="flex-1">
            <DashboardHonoraryCostsChart />
          </div>
        </div>
        
        <div>
          <DashboardPatientListTable />
        </div>
      </div>

      <div class="col-span-4 flex flex-col gap-4">
        <div>
          <DashboardQuoteList />
        </div>
        
        <div>
          <DashboardStudiesList />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style>
</style>