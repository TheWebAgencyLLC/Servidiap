<template>
  <UDashboardPanel id="study">
    <template #header>
      <UDashboardNavbar title="Add Study" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse/>
        </template>

        <template #right>
          <UDropdownMenu :items="items">
            <UButton icon="i-lucide-plus" size="md" class="rounded-full"/>
          </UDropdownMenu>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="min-h-screen text-white">
        <!-- Header -->
        <div class="px-8 py-6 border-b border-gray-800">
          <h1 class="text-2xl font-medium">Crear Estudio</h1>
        </div>

        <!-- Main content with side-by-side layout -->
        <div class="flex">
          <!-- Left side - Form section -->
          <div class="w-1/2 px-8 py-6 border-r border-gray-800">
            <!-- Especialidad -->

            <div class="flex flex-col space-y-4">
              <UFormField  class="w-full" label="Especialidad">
                <USelectMenu class="w-1/3" v-model="state.specialty" :items="specialties"/>
              </UFormField>
              <!-- Nombre -->
              <UFormField class="w-full" label="Nombre">
                <UInput class="w-full" v-model="state.name"/>
              </UFormField>
              <UFormField label="Honorarios">
                <UInputMenu v-model="state.medicalHonoraries" label-key="name" multiple class="w-full"
                            :items="honoraries">
                  <template #item="{item}">
                    {{ item.name }} - ${{ item.value }}
                  </template>
                </UInputMenu>
              </UFormField>
              <UFormField label="Costos Operativos">
                <UInputMenu v-model="state.operativeCosts"  label-key="name" multiple class="w-full"
                            :items="opCosts">
                  <template #item="{item}">
                    {{ item.name }} - ${{ item.value }}
                  </template>
                </UInputMenu>
              </UFormField>
              <UFormField label="Insumos">
                <UInputMenu
                  v-model="displaySupplies"
                  label-key="description"
                  multiple
                  class="w-full"
                  :items="supplies">
                  <template class="w-full" #item="{item}">
                    <span class="text-sm lowercase">{{ item.description }}</span> | VES {{ item.totalCost }}
                  </template>
                </UInputMenu>
              </UFormField>
              <USeparator/>
              <!-- Replace your supplies list with this -->
              <div class="flex justify-between items-center" v-for="(item, index) in state.Supplies" :key="index">
                <div class="lowercase">
                  {{ item.supply.description }}
                </div>
                <UInputNumber
                  v-model="state.Supplies[index].count"
                  :min="1"
                />
              </div>
              <!-- Cost Summary -->
              <USeparator class="mt-4"/>
              <div class="mt-4 flex justify-between mx-4">
                <div class="text-lg font-bold">Costo total del estudio:</div>
                <div>{{ calculateCost }} VES</div>
              </div>
            </div>






            <!-- Submit Button -->
            <div class="mt-8">
              <UButton @click="submitStudy"
              >
                Guardar Estudio
              </UButton>
            </div>
          </div>

          <!-- Right side - Table of existing studies -->
          <div class="w-1/2 px-8 py-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-medium">Estudios Existentes</h2>

              <!-- Search field -->
              <div class="relative">
                <input
                  type="text"
                  placeholder="Buscar estudios..."
                  class="px-4 py-2 pr-10 text-white  border border-gray-700 rounded-md focus:outline-none focus:border-green-500"
                />
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                       xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>
            </div>

            <!-- UTable for displaying existing studies -->
            <UTable
              :data="studiesData"
              :columns="columns"
              class="w-full"
            >
              <template #empty-state>
                <div class="text-center py-4 text-gray-400">
                  No data
                </div>
              </template>
              <template #cell-actions="{ row }">
                <div class="flex space-x-2">
                  <button
                    class="p-1 text-blue-400 hover:text-blue-300"
                    title="Editar"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                    </svg>
                  </button>
                  <button
                    class="p-1 text-green-400 hover:text-green-300"
                    title="Duplicar"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                  </button>
                  <button
                    class="p-1 text-red-400 hover:text-red-300"
                    title="Eliminar"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </template>
            </UTable>
          </div>
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import type {MedicalHonoraries, OperativeCost, Study, Supply} from "~~/types";
import type { TableColumn } from '@nuxt/ui'
import type { Row } from '@tanstack/vue-table'

const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')
const UDropdownMenu = resolveComponent('UDropdownMenu')

// Dropdown items
const items = [[{
  label: 'New Quote',
  icon: 'i-lucide-notepad-text',
  to: '/quote'
}, {
  label: 'Add Supplies',
  icon: 'i-lucide-briefcase-medical',
  to: '/supplies'
}]];

const specialties = ['Gastroenterlogia', 'Cardiologia', 'Dermatologia', 'Neurologia', 'Oftalmologia', 'Pediatria', 'Urologia']
// Form data (just variables, no logic)
const selectedSpecialty = ref('');
const procedureName = ref('');
const selectedHonorarios = ref([]);
const selectedCostos = ref([]);
const selectedInsumos = ref([]);

const studies = ref<Study[]>([])
const supplies = ref<Supply[]>([])
const supplyTemp = ref<Supply>();
const opCosts = ref<OperativeCost[]>([])
const opCostTemp = ref<OperativeCost>();
const honoraries = ref<MedicalHonoraries[]>([])
const honoraryTemp = ref<MedicalHonoraries>()

const state = ref<Study>({
  name: '',
  Supplies: [],
  operativeCosts: [],
  medicalHonoraries: [],
  cost: 0,
  PVP: 0,
  specialty: ''
})

const {data: studiesData, refresh} = await useFetch('/api/studies/', {
  method: 'GET'
})

const {data: suppliesData} = await useFetch('/api/supplies/', {
  method: 'GET',
  onResponse({response}) {
    supplies.value = response._data.body
  }
})

const {data: opCostData} = await useFetch('/api/operative-costs/', {
  method: 'GET',
  server: false,
  onResponse({response}) {
    opCosts.value = response._data.body
  }
})
const {data: honoraryData} = await useFetch('/api/medical-honoraries/', {
  method: 'GET',
  server: false,
  onResponse({response}) {
    honoraries.value = response._data
  }
})

// Create a computed property that formats your supplies for the UI
const displaySupplies = computed({
  get: () => state.value.Supplies.map(item => item.supply),
  set: (newSupplies: Supply[]) => {
    // Convert incoming supplies from UInputMenu to the desired format
    const currentItems = new Map(
      state.value.Supplies.map(item => [item.supply.id || item.supply.description, item])
    );

    state.value.Supplies = newSupplies.map(supply => {
      const key = supply.id || supply.description;
      return currentItems.has(key)
        ? currentItems.get(key)!
        : {supply, count: 1}; // Default count for new items
    });
  }
});

const calculateCost = computed(() => {
  let cost = 0;
  for (const item of state.value.Supplies) {
    cost = cost + (item.supply.totalCost * item.count);
  }
  for (const opCost of state.value.operativeCosts) {
    cost = cost + opCost.value;
  }
  for (const honorary of state.value.medicalHonoraries) {
    cost = cost + honorary.value;
  }
  return cost
});



// Table configuration
const columns: TableColumn<Study>[] = [
  {header: 'name', accessorKey: 'name'},
  { header: 'specialty', accessorKey: 'specialty'},
  {
    id: 'actions',
    cell: ({row}) => {
      return h(
        'div',
        {class: 'text-right'},
        h(
          UDropdownMenu,
          {
            content: {
              align: 'end',
            },
            items: getRowItems(row),
            'aria-label': 'Acciones Dropdown'

          },
          () =>
            h(UButton, {
              icon: 'i-lucide-ellipsis-vertical',
              color: 'neutral',
              variant: 'ghost',
              class: 'ml-auto',
              'aria-label': 'Actions dropdown'
            })
        )
      )
    }
  }

];

function getRowItems(row: Row<Study>) {
  return [
    {
      type: 'label',
      label: 'Acciones'
    },
    {
      label: 'Editar'
    },
    {
      label: 'Duplicar',
    },
    {
      label: 'Eliminar',
    }
  ]
}

const submitStudy = async () => {
  try {
    // Transform data to match schema requirements
    const body = {
      ...state.value,
      Supplies: state.value.Supplies.map(item => ({
        supply: item.supply._id,
        count: item.count
      })),
      operativeCosts: state.value.operativeCosts.map(item => item._id),
      medicalHonoraries: state.value.medicalHonoraries.map(item => item._id)
    }

    const res = await $fetch('/api/studies/create', {
      method: 'POST',
      body
    })
    console.log(res)
    reloadNuxtApp();
  } catch (e) {
    console.log(e)
  }
}

</script>
