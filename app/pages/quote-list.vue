<script setup lang="ts">

import type {TableColumn} from "@nuxt/ui";
import type {Quote, Supply} from "~~/types";
import type {Row} from "@tanstack/vue-table";


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
  // onClick: () => open.value = true
}]]

const {data: quoteData} = await useFetch('/api/quote', {
  method: 'GET',
  server: false,
})


const columns: TableColumn<Quote>[] = [
  {
    header: '#',
    accessorKey: '_id'
  },
  {
    header: 'Paciente',
    accessorKey: 'patient.name'
  },
  {
    header: 'Cedula de Identidad',
    accessorKey: 'patient.id'
  },
  {
    header: 'Estudio',
    accessorKey: 'study.name'
  },
  {
    header: 'Fecha',
    accessorKey: 'date'
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
      label: 'Abrir Cotizacion ',
      onClick: () => navigateTo(`/quote/${row.original._id}`)
    },
    {
      label: 'Generar Factura de farmacia',
      onClick: () => generateReceipt(row)
    },
    {
      label: 'Eliminar Cotizacion'
    }
  ]
}

async function generateReceipt(row: any) {

  const _id = row.getValue('_id')
  console.log(_id)
  try {
    const res = await $fetch(`/api/pharmacy-receipt/create`, {
      body: {
        _id
      },
      method: 'POST'
    })
    return navigateTo(`/pharmacy/${res.body}`)
  } catch (e) {
    console.error(e)
  }

}

const globalFilter = ref('')

</script>

<template>
  <UDashboardPanel>
    <template #header>
      <UDashboardNavbar title="Listado de Cotizaciones" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse/>
        </template>

        <template #right>
          <!--        <UInput v-model="filter" leading-icon="i-lucide-funnel" placeholder="Buscar Insumo"/>-->

            <UInput leading-icon="i-lucide-funnel" placeholder="Buscar cotizacion" v-model="globalFilter" class="max-w-sm" />
          <UDropdownMenu :items="items">
            <UButton icon="i-lucide-plus" size="md" class="rounded-full"/>
          </UDropdownMenu>
        </template>
      </UDashboardNavbar>
    </template>
    <template #body>
      <UTable v-model:global-filter="globalFilter" :data="quoteData" :columns="columns"/>
    </template>
  </UDashboardPanel>
</template>

<style scoped>

</style>
