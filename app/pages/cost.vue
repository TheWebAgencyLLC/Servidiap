<script setup lang="ts">
import type {TableColumn} from '@nuxt/ui'
import type {OperativeCost} from "~~/types";


const costName = ref('')
const costAmount = ref('')
const items = [[{
  label: 'New Quote',
  icon: 'i-lucide-notepad-text',
  to: '/quote'
}, {
  label: 'Add Supplies',
  icon: 'i-lucide-briefcase-medical',
  to: '/supplies'
}]]

const opcosts = ref([])


const {data, refresh} = await useFetch('/api/operative-costs', {
  method: 'GET',
  server: false,
  onResponse({response}) {
    opcosts.value = response._data.body;
  }
})



const columns: TableColumn<OperativeCost>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre'
  },
  {
    accessorKey: 'value',
    header: 'Monto',
    cell: ({row}) => `VES.${row.getValue('value')}`
  }
]

async function submitData() {
  try {
    const res = await $fetch(`/api/operative-costs/create`, {
      method: 'POST',
      body: {
        name: costName.value,
        value: costAmount.value
      }
    })
    await refresh();
  } catch (e) {
    console.error(e)
  }
}


</script>

<template>
  <UDashboardPanel id="cost">
    <template #header>
      <UDashboardNavbar title="Cost Management" :ui="{ right: 'gap-3' }">
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
        <div class="grid grid-cols-1 md:grid-cols-2 gap-0">
          <!-- Left column: Create Cost form -->
          <div class="border-r border-gray-800">
            <div class="px-6 py-5 border-b border-gray-800">
              <h2 class="text-xl font-medium">Crear Costos Operativos</h2>
            </div>

            <div class="px-6 py-5">
              <div class="space-y-5">
                <div>
                  <label for="costName" class="block mb-2 text-base">
                    Descripcion:
                  </label>
                  <UInput v-model="costName" id="costName"
                          class="px-4 py-3 rounded-md focus:outline-none focus:border-green-500"/>
                </div>
                <!-- Amount -->
                <div>
                  <label for="costAmount" class="block mb-2 text-base">
                    Monto:
                  </label>
                  <UInput  v-model.number="costAmount" id="costAmount"
                           class="px-4 py-3 rounded-md focus:outline-none focus:border-green-500">
                    <template #leading>
                     <span class="text-xs px-4">VES.</span>
                    </template>
                  </UInput>
                </div>

                <!-- Submit button -->
                <div class="pt-3">
                  <UButton
                    @click="submitData"
                    label="Agregar Costos"
                    color="success"
                    block
                    :disabled="!costName || !costAmount"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Right column: Honoraries table -->
          <div>
            <div class="px-6 py-5 border-b border-gray-800">
              <h2 class="text-xl font-medium">Listado de Costos Operativos</h2>
            </div>

            <div class="p-4">
              <UTable
                :data="opcosts"
                :columns="columns"
                :ui="{
                  thead: '',
                  tbody: 'divide-y divide-gray-700',
                  td: {
                    base: 'whitespace-nowrap px-4 py-3 text-sm'
                  }
                }"
              >
              </UTable>
            </div>
          </div>
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>
