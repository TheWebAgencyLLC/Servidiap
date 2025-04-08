<script setup lang="ts">
import {sub} from 'date-fns'
import type {Period, Range} from '~/types'
import type {MedicalHonoraries, OperativeCost, Quote, Study} from "~~/types";
import type {TableColumn} from "@nuxt/ui";

// Existing dashboard code
const range = shallowRef<Range>({
  start: sub(new Date(), {days: 14}),
  end: new Date()
})

const state = ref<Partial<Quote>>({
  patient: {
    name: '',
    id: '',
  },
  study: '',
  date: new Date(),
  profit: 0,
  author: 'RS',
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
}]]

// Form state
const patientName = ref('');
const patientId = ref('');
const selectedStudy = ref<Study>(null);
const showStudyDetails = ref(false);

const {data: studyData} = await useFetch('/api/studies', {
  method: 'GET',
  server: false,
  onResponse({response}) {
    console.log('response', response)
  }
})

async function onChange(event: any) {
  console.log(event)
  const targetStudy = await $fetch(`/api/studies/${event._id}`, {
    method: 'GET',
  })
  if (targetStudy) {
    selectedStudy.value = targetStudy as Study
  }
}

const supplyColumn: TableColumn<Study['Supplies']>[] = [
  {
    accessorKey: 'supply.description',
    header: 'Insumos'
  },
  {
    accessorKey: 'count',
    header: 'Cantidad'
  },
  {
    accessorKey: 'supply.totalCost',
    header: 'Costo'
  }
]

const costColumns: TableColumn<MedicalHonoraries | OperativeCost>[] = [
  {
    accessorKey: 'name',
    header: 'Costos Operativos'
  },
  {
    accessorKey: 'value',
    header: 'Costo'
  }
]
const honorariesColumns: TableColumn<MedicalHonoraries | OperativeCost>[] = [
  {
    accessorKey: 'name',
    header: 'Honorarios Medicos'
  },
  {
    accessorKey: 'value',
    header: 'Costo'
  }
]

const calculatedCost = computed(() => {
  let cost = 0;
  if (selectedStudy.value) {
    for (const item of selectedStudy?.value.Supplies) {
      cost = cost + (item.supply.totalCost * item.count);
    }
    for (const opCost of selectedStudy?.value.operativeCosts) {
      cost = cost + opCost.value;
    }
    for (const honorary of selectedStudy?.value.medicalHonoraries) {
      cost = cost + honorary.value;
    }
  }
  return cost
})

const totalPrice = computed(() => {
  let cost = 0;
  if (selectedStudy.value) {
    for (const item of selectedStudy?.value.Supplies) {
      cost = cost + (item.supply.totalCost * item.count);
    }
    for (const opCost of selectedStudy?.value.operativeCosts) {
      cost = cost + opCost.value;
    }
    for (const honorary of selectedStudy?.value.medicalHonoraries) {
      cost = cost + honorary.value;
    }
  }
  return (cost + (state.value.profit * cost)).toFixed(2)
})

const calculatedPercentage = computed(() => {

  if (selectedStudy.value) {
    return (calculatedCost.value * state.value.profit).toFixed(2)
  }
  return 0
})


</script>

<template>
  <UDashboardPanel id="home">
    <!-- Keep your existing header section -->
    <template #header>
      <UDashboardNavbar title="Quote Management" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse/>
        </template>

        <template #right>
          <UDropdownMenu :items="items">
            <UButton icon="i-lucide-plus" size="md" class="rounded-full"/>
          </UDropdownMenu>
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <HomeDateRangePicker v-model="range" class="-ms-1"/>
          <HomePeriodSelect v-model="period" :range="range"/>
        </template>
        <template #right>
          <UInput
            v-model="searchTerm"
            icon="i-lucide-search"
            placeholder="Search quotes..."
            size="sm"
            class="w-64"
          />
        </template>
      </UDashboardToolbar>
    </template>

    <!-- Main content body -->
    <template #body>
      <div class="min-h-screen text-white">
        <!-- Header -->
        <div class="px-8 py-6 border-b border-gray-800">
          <h1 class="text-2xl font-medium">Crear Cotizacion</h1>
        </div>

        <!-- Form section -->
        <div class="px-8 py-6">
         <UForm class="space-y-4" :state="state">
           <div class="grid grid-cols-2 gap-4 w-1/3">
             <UFormField label="Nombre del paciente" class="w-full">
               <UInput class="w-full" v-model="patientName"/>
             </UFormField>

             <!-- ID -->
             <UFormField label="Cedula de identidad" class="w-full">
               <UInput class="w-full" v-model="patientId"/>
             </UFormField>
           </div>


        <!-- Study -->
        <UFormField class="w-1/3" label="Estudio">
          <UInputMenu @update:modelValue="onChange" label-key="name" :items="studyData" v-model="selectedStudy"
                      class="w-full">
            <template #item="{item}">
              {{ item.name }}
            </template>
          </UInputMenu>
        </UFormField>

        <UCard class="w-full" v-if="selectedStudy">
          <template #header>
            {{ selectedStudy.name }}
          </template>
          <template #default>
            <div>
              Insumos requeridos:
            </div>
            <UTable :data="selectedStudy.Supplies" :columns="supplyColumn"/>
            <UTable :data="selectedStudy.operativeCosts" :columns="costColumns"/>
            <UTable :data="selectedStudy.medicalHonoraries" :columns="honorariesColumns"/>
          </template>
          <template #footer>
            <div class="w-full flex flex-col justify-center items-start gap-2">
              <div class="w-full flex justify-between  ">
                <div>Costo total:</div>
                <div>VES.{{ calculatedCost }}</div>
              </div>
              <div class="flex w-full justify-between  ">
                <div class="w-full flex justify-between items-center">
                  <div class="flex gap-2">
                    <div>Porcentaje de ganancia:</div>
                    <UInputNumber class="w-1/4"
                                  v-model.number="state.profit"
                                  :step="0.01"
                                  :format-options="{
                 style: 'percent'
                 }"
                    />
                  </div>
                </div>
                <div>
                  VES.{{ calculatedPercentage }}
                </div>
              </div>
              <div class="w-full flex justify-between  ">
                <div>Monto total:</div>
                <div class="font-bold">VES.{{ totalPrice }}</div>
              </div>
            </div>
          </template>
        </UCard>
         </UForm>
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>
