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
    accessorKey: 'stock'
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



</script>

<template>
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
  <UDashboardPanel id="supplies">
    <template #header>
      <UDashboardNavbar title="Añadir Insumos" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse/>
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

      <!-- <HomeStats :period="period" :range="range" />
      <HomeChart :period="period" :range="range" />
      <HomeSales :period="period" :range="range" /> -->

    </template>
  </UDashboardPanel>
</template>
