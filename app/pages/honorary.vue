<script setup lang="ts">
import type {TableColumn} from "@nuxt/ui";
import type {MedicalHonoraries, OperativeCost} from "~~/types";

const honoraryName = ref('')
const honoraryAmount = ref('')
const items = [[{
  label: 'New Quote',
  icon: 'i-lucide-notepad-text',
  to: '/quote'
}, {
  label: 'Add Supplies',
  icon: 'i-lucide-briefcase-medical',
  to: '/supplies'
}]]

const honoraries = ref<MedicalHonoraries[]>([])

const {data, refresh, status} = await useFetch('/api/medical-honoraries', {
  method: 'GET',
  onResponse({response}) {
    honoraries.value = response._data.body;
  }
})

const addHonorary = () => {
  console.log('Adding honorary:', honoraryName.value, honoraryAmount.value)
  if (honoraryName.value && honoraryAmount.value) {
    data.value = [
      ...data.value,
      {
        name: honoraryName.value,
        amount: honoraryAmount.value
      }
    ]
    console.log('Updated data:', data.value)
    honoraryName.value = ''
    honoraryAmount.value = ''
  }
}

const columns: TableColumn<MedicalHonoraries>[] = [
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
    const res = await $fetch(`/api/medical-honoraries/create`, {
      method: 'POST',
      body: {
        name: honoraryName.value,
        value: honoraryAmount.value
      }
    })
    await refresh();
  } catch (e) {
    console.error(e)
  }
}




</script>

<template>
  <UDashboardPanel id="honorary">
    <template #header>
      <UDashboardNavbar title="Honorary Management" :ui="{ right: 'gap-3' }">
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
      <div class="min-h-screen ">
        <!-- 2-column layout -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-0">
          <!-- Left column: Create Honorary form -->
          <div class="border-r border-gray-800">
            <div class="px-6 py-5 border-b border-gray-800">
              <h2 class="text-xl font-medium">Crear Honorarios Medicos</h2>
            </div>

            <div class="px-6 py-5">
              <div class="space-y-5">
                <div>
                  <label for="honoraryName" class="block mb-2 text-base">
                    Nombre
                  </label>
                  <UInput  v-model="honoraryName" id="honoraryName"
                          class="px-4 py-3 rounded-md focus:outline-none focus:border-green-500"/>
                </div>
                <div>
                  <label for="honoraryAmount" class="block mb-2 text-base">
                    Monto
                  </label>
                  <UInput v-model.number="honoraryAmount" id="honoraryAmount"
                          class="px-4 py-3 rounded-md focus:outline-none focus:border-green-500"/>
                </div>

                <div class="pt-3">
                  <UButton
                    @click="submitData"
                    :loading="status == 'pending'"
                    label="Agregar Honorario"
                    color="success"
                    block
                    :disabled="!honoraryName || !honoraryAmount"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Right column: Honoraries table -->
          <div>
            <div class="px-6 py-5 border-b border-gray-800">
              <h2 class="text-xl font-medium">Lista de Honorarios</h2>
            </div>

            <div class="p-4">
              <UTable
                :loading="status === 'pending'"
                :data="data"
                :columns=columns
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
