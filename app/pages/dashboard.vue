<script setup lang="ts">
import { DashboardQuoteListPanel, DashboardStudiesListPanel } from '#components';
import { sub } from 'date-fns'
import type { Period, Range } from '~/types'

const range = shallowRef<Range>({
	start: sub(new Date(), {days: 14}),
	end: new Date()
})

const period = ref<Period>('daily')

const items = [[{
  label: 'New Quote',
  icon: 'i-lucide-notepad-text',
  to: '/quote'
}, {
  label: 'Add Supplies',
  icon: 'i-lucide-briefcase-medical',
  to: '/supplies'
},
{
  label: 'New Patient',
  icon: 'i-lucide-circle-user-round',
  // add a modal here that pops up not a page route
  to: '/'
},
{
  label: 'Update Status',
  icon: 'i-lucide-rss',
  // add a modal here that pops up not a page route to update the badge
  to: '/'
}]]
</script>

<template>
  <UDashboardPanel id="home">
    <template #header>
      <UDashboardNavbar title="Menu Principal" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UDropdownMenu :items="items">
            <UButton icon="i-lucide-plus" size="md" class="rounded-full" />
          </UDropdownMenu>
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <!-- NOTE: The `-ms-1` class is used to align with the `DashboardSidebarCollapse` button here. -->
          <HomeDateRangePicker v-model="range" class="-ms-1" />

          <HomePeriodSelect v-model="period" :range="range" />
        </template>
      </UDashboardToolbar>
    </template>

    <template #body>
      <div class="grid grid-cols-3 md:grid-cols-2 gap-4">
        <UCard class="w-1/2 flex flex-col justify-center items-center">
          <template #header>
            <span class="text-2xl font-bold">Cotizaciones</span>
          </template>
          <template #default>
            Crear Cotizaciones para estudios
          </template>
          <template #footer>
            <UButton>Navegar</UButton>
          </template>
        </UCard>
      </div><div class="grid grid-cols-3 md:grid-cols-2 gap-4">
        <UCard class="w-1/2 flex flex-col justify-center items-center">
          <template #header>
            <span class="text-2xl font-bold">Listado De Cotizaciones</span>
          </template>
          <template #default>
            Imprimir/Exportar Cotizaciones
          </template>
          <template #footer>
            <UButton>Navegar</UButton>
          </template>
        </UCard>
      </div><div class="grid grid-cols-3 md:grid-cols-2 gap-4">
        <UCard class="w-1/2 flex flex-col justify-center items-center">
          <template #header>
            <span class="text-2xl font-bold">Farmacia</span>
          </template>
          <template #default>
            Inventario de Farmacia
          </template>
          <template #footer>
            <UButton>Navegar</UButton>
          </template>
        </UCard>
      </div><div class="grid grid-cols-3 md:grid-cols-2 gap-4">
        <UCard class="w-1/2 flex flex-col justify-center items-center">
          <template #header>
            <span class="text-2xl font-bold">Medicos</span>
          </template>
          <template #default>
           Agregar/Editar Medicos
          </template>
          <template #footer>
            <UButton>Navegar</UButton>
          </template>
        </UCard>
      </div>
<!--      <div class="grid grid-cols-12 gap-4">-->
<!--        <div class="col-span-8 flex flex-col gap-4">-->
<!--          <div class="grid grid-cols-2 gap-4">-->
<!--            <HomeChart class="w-full" :period="period" :range="range"/>-->
<!--            <HomeHome2Chart class="w-full" :period="period" :range="range"/>-->
<!--          </div>-->
<!--          -->
<!--          <UDashboardPanel>-->
<!--            <DashboardPatientListTable />-->
<!--          </UDashboardPanel>-->
<!--        </div>-->

<!--        <div class="col-span-4 flex flex-col gap-4">-->
<!--          <div>-->
<!--            <DashboardQuoteListPanel />-->
<!--          </div>-->
<!--          -->
<!--          <div>-->
<!--            <DashboardStudiesListPanel />-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
    </template>
  </UDashboardPanel>
</template>
