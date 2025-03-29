<script setup lang="ts">
  const items = [[{
  label: 'New Quote',
  icon: 'i-lucide-notepad-text',
  to: '/quote'
}, {
  label: 'Add Supplies',
  icon: 'i-lucide-briefcase-medical',
  to: '/supplies'
}]]
</script>

<template>
  <UDashboardPanel id="supplies">
    <template #header>
      <UDashboardNavbar title="Add Supplies" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UDropdownMenu :items="items">
            <UButton icon="i-lucide-plus" size="md" class="rounded-full" />
          </UDropdownMenu>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <!-- <HomeStats :period="period" :range="range" />
      <HomeChart :period="period" :range="range" />
      <HomeSales :period="period" :range="range" /> -->
    </template>
  </UDashboardPanel>
</template>
