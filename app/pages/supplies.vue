<script setup lang="ts">
import type {TableColumn} from "@nuxt/ui";
import type {Quote, Supply} from "~~/types";
import type {Row} from '@tanstack/vue-table'
import {getPaginationRowModel} from '@tanstack/vue-table'

const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')
const UDropdownMenu = resolveComponent('UDropdownMenu')

const items = [[{
  label: 'New Quote',
  icon: 'i-lucide-notepad-text',
  to: '/quote'
}, {
  label: 'Añadir Insumo',
  icon: 'i-lucide-briefcase-medical',
  onClick: () => open.value = true
}]]

const supplies = ref<Supply[]>([])

const {data} = await useFetch('/api/supplies', {
  method: 'GET',
  server: false,
  onResponse({response}) {
    supplies.value = response._data.body;
  }
})

// Stock update modal state
const updateStockModal = ref(false)
const selectedSupply = ref<Supply | null>(null)
const newStockValue = ref(0)

function updateStock(row: Row<Supply>) {
  selectedSupply.value = row.original
  newStockValue.value = row.original.stock
  updateStockModal.value = true
}

async function saveStockUpdate() {
  if (!selectedSupply.value) return

  // Create a copy of the selected supply and update its stock value
  const updatedSupply = {
    ...selectedSupply.value,
    stock: newStockValue.value,
    // Also update the total cost based on the new stock value
    totalCost: newStockValue.value * (selectedSupply.value.costPerUnit || 0)
  }

  const res = await $fetch(`/api/supplies/update`, {
    method: 'POST',
    body: updatedSupply
  })

  console.log(res)
  await refreshNuxtData();
  updateStockModal.value = false
}

const columns: TableColumn<Supply>[] = [
  {
    header: 'Codigo',
    accessorKey: 'code'
  },
  {
    header: 'Insumo',
    accessorKey: 'description'
  },
  {
    header: 'Existencia',
    accessorKey: 'stock',
    cell: ({row}) => {
      return h('div', {class: 'flex items-center gap-2'}, [
        h('span', {}, row.getValue('stock')),
        h(
            UButton,
            {
              label: 'Actualizar',
              variant: 'outline',
              color: 'primary',
              size: 'sm',
              onClick: () => updateStock(row)
            }
        )
      ])
    }
  },
  {
    header: 'Costo por Unidad',
    accessorKey: 'costPerUnit',
    cell: ({row}) => {
      return `VES.${row.getValue('costPerUnit')}`
    }
  },
  {
    header: 'Costo Total',
    accessorKey: 'totalCost',
    cell: ({row}) => {
      return `VES.${row.getValue('totalCost')}`
    }
  },
  {
    id: 'Acciones',
    cell: ({row}) => {
      return h(
          'div',
          {class: 'text-right'},
          h(
              UDropdownMenu,
              {
                content: {
                  align: 'end'
                },
                items: getRowItems(row),
                'aria-label': 'Actions dropdown'
              },
              () =>
                  h(UButton, {
                        label: 'Acciones',
                        variant: 'outline',
                        color: 'primary',
                        class: 'ml-auto',
                        'aria-label': 'Actions dropdown'
                      }
                  )
          )
      )
    }
  }
]

function getRowItems(row: Row<Supply>) {
  return [
    {
      type: 'label',
      label: 'Acciones'
    },
    {
      type: 'separator'
    },
    {
      label: 'Modificar Insumo'
    },
    {
      label: 'Eliminar Insumo'
    }
  ]
}

const filter = ref('')

const filteredResults = computed(() => {
  if (!filter.value) return supplies.value
  return supplies.value.filter(item => item.description.toLowerCase().includes(filter.value.toLowerCase()))
})

//Modal stuff
const open = ref(false)


//Form to submit a new supply.

const formData = ref({
  code: '',
  description: '',
  stock: 0,
  costPerUnit: 0,
  totalCost: 0,
})


// import type { UTableRef } from '#ui/types'
const table = useTemplateRef('table')
const pagination = ref({
  pageIndex: 0,
  pageSize: 10
})

// Calculate total money in stock
const totalMoneyInStock = computed(() => {
  return supplies.value.reduce((total, supply) => {
    return total + (supply.totalCost || 0);
  }, 0);
});


</script>

<template>
  <!-- Add Supply Modal -->
  <UModal v-model:open="open">
    <template #content>
      <UCard>
        <template #header>Añadir Insumo</template>
        <template #default>
          <UForm class="space-y-2" :state="formData">
            <UFormField label="Codigo" class="w-full">
              <UInput v-model="formData.code" class="w-1/3"/>
            </UFormField>
            <UFormField label="Descripcion" class="w-full">
              <UInput v-model="formData.description" class="w-full"/>
            </UFormField>
            <UFormField label="Stock" class="w-full">
              <UInput v-model.number="formData.stock"/>
            </UFormField>
            <UFormField label="Costo por Unidad" class="w-full">
              <UInput v-model="formData.costPerUnit"/>
            </UFormField>
            <UFormField label="Costo Total" class="w-full">
              <UInput v-model="formData.totalCost"/>
            </UFormField>
          </UForm>
        </template>
        <template #footer>
          <div class="flex justify-end space-x-2">
            <UButton>Guardar</UButton>
            <UButton variant="subtle" @click="open = false">Cancelar</UButton>
          </div>
        </template>
      </UCard>
    </template>
  </UModal>

  <!-- Update Stock Modal -->
  <UModal v-model:open="updateStockModal">
    <template #content>
      <UCard>
        <template #header>Actualizar Existencia</template>
        <template #default>
          <div class="space-y-4">
            <div>
              <h3 class="text-lg font-medium text-gray-700">Insumo:</h3>
              <p class="text-xl font-semibold">{{ selectedSupply?.description }}</p>
            </div>
            <UFormField label="Nueva Existencia" class="w-full">
              <UInput
                  v-model.number="newStockValue"
                  type="number"
                  min="0"
                  placeholder="Ingrese el nuevo valor de existencia"
              />
            </UFormField>
          </div>
        </template>
        <template #footer>
          <div class="flex justify-end space-x-2">
            <UButton @click="saveStockUpdate()">Guardar</UButton>
            <UButton variant="subtle" @click="updateStockModal = false">Cancelar</UButton>
          </div>
        </template>
      </UCard>
    </template>
  </UModal>

  <UDashboardPanel id="supplies">
    <template #header>
      <UDashboardNavbar title="Añadir Insumos" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse/>
        </template>
        <template #default>
          Total en existencia: Bs. {{ totalMoneyInStock.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
        </template>

        <template #right>
          <UInput v-model="filter" leading-icon="i-lucide-funnel" placeholder="Buscar Insumo"/>
          <UDropdownMenu :items="items">
            <UButton icon="i-lucide-plus" size="md" class="rounded-full"/>
          </UDropdownMenu>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <UTable
          ref="table"
          v-model:global-filter="filter"
          v-model:pagination="pagination"
          :pagination-options="{
              getPaginationRowModel: getPaginationRowModel()
            }" :data="supplies" :columns="columns">

      </UTable>
      <div class="flex justify-center border-t border-(--ui-border) pt-4">
        <UPagination
            :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
            :items-per-page="table?.tableApi?.getState().pagination.pageSize"
            :total="table?.tableApi?.getFilteredRowModel().rows.length"
            @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
        />
      </div>
    </template>
  </UDashboardPanel>
</template>
