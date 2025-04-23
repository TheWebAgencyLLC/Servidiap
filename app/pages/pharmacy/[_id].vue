<script setup lang="ts">
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import type { TableColumn } from "@nuxt/ui";
import type { Row } from "@tanstack/vue-table";

const route = useRoute();
const { data: receipt, status } = await useFetch(`/api/pharmacy-receipt/${route.params._id}`, {
  method: 'GET',
});

const UButton = resolveComponent('UButton')

// Función para formatear fechas
function formatDate(date: string | Date) {
  if (!date) return '';
  return format(new Date(date), 'dd MMMM yyyy', { locale: es });
}

// Columnas para la tabla de insumos
const supplyColumns: TableColumn<any>[] = [
  {
    header: 'Descripción',
    accessorKey: 'supply.description'
  },
  {
    header: 'Código',
    accessorKey: 'supply.code'
  },
  {
    header: 'Cantidad',
    accessorKey: 'count'
  },
  {
    header: 'Precio Unitario',
    accessorKey: 'supply.totalCost',
    cell: ({ row }) => {
      return `REF. ${row.original.supply.totalCost}`
    }
  },
  {
    header: 'Subtotal',
    id: 'subtotal',
    cell: ({ row }) => {
      return `REF. ${(row.original.supply.totalCost * row.original.count)}`
    }
  }
];

// Para imprimir la página
function printReceipt() {
  window.print();
}
</script>

<template>
  <UDashboardPanel v-if="status !== 'pending' && receipt">
    <template #header>
      <UDashboardNavbar title="Recibo de Farmacia" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UButton icon="i-lucide-arrow-left" variant="ghost" to="/quote-list" />
        </template>

        <template #right>
          <UButton icon="i-lucide-printer" label="Imprimir" @click="printReceipt" color="primary" />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="p-6 space-y-6 print:p-4">
        <!-- Cabecera del recibo -->
        <div class="flex justify-between items-start">
          <div>
            <h1 class="text-2xl font-bold mb-2">Recibo de Farmacia</h1>
            <UBadge color="primary" size="lg" class="mb-2">Nº {{ receipt.receiptNumber }}</UBadge>
            <p class="text-gray-500">Fecha: {{ formatDate(receipt.date) }}</p>
          </div>
          <div class="text-right">
            <UIcon name="i-lucide-stethoscope" class="text-primary-500 w-16 h-16 mb-2" />
            <p class="font-semibold text-lg">Servidiap C.A</p>
            <p class="text-sm text-gray-500">Caracas, Venezuela</p>
          </div>
        </div>

        <UDivider />

        <!-- Información del paciente y cotización -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UCard>
            <template #header>
              <div class="flex items-center">
                <UIcon name="i-lucide-user" class="mr-2" />
                <h3 class="text-lg font-medium">Información del Paciente</h3>
              </div>
            </template>
            <div class="space-y-2">
              <p><span class="font-medium">Nombre:</span> {{ receipt.quote?.patient?.name }}</p>
              <p><span class="font-medium">C.I.:</span> {{ receipt.quote?.patient?.id }}</p>
            </div>
          </UCard>

          <UCard>
            <template #header>
              <div class="flex items-center">
                <UIcon name="i-lucide-clipboard" class="mr-2" />
                <h3 class="text-lg font-medium">Información del Estudio</h3>
              </div>
            </template>
            <div class="space-y-2">
              <p><span class="font-medium">Estudio:</span> {{ receipt.quote?.study?.name }}</p>
              <p><span class="font-medium">Especialidad:</span> {{ receipt.quote?.study?.specialty }}</p>
            </div>
          </UCard>
        </div>

        <!-- Tabla de insumos -->
        <UCard>
          <template #header>
            <div class="flex items-center">
              <UIcon name="i-lucide-list" class="mr-2" />
              <h3 class="text-lg font-medium">Detalle de Insumos</h3>
            </div>
          </template>
          <UTable :columns="supplyColumns" :data="receipt.Supplies" :ui="{ tbody: { td: { base: 'py-3' } } }" />

          <template #footer>
            <div class="flex justify-end">
              <div class="w-1/3 space-y-2">
                <div class="flex justify-between py-2">
                  <span class="font-medium">Total:</span>
                  <span class="font-bold text-lg">REF. {{ receipt.total }}</span>
                </div>
              </div>
            </div>
          </template>
        </UCard>

        <!-- Notas y términos -->
        <UCard>
          <template #header>
            <div class="flex items-center">
              <UIcon name="i-lucide-info" class="mr-2" />
              <h3 class="text-lg font-medium">Notas Adicionales</h3>
            </div>
          </template>
          <div class="space-y-2 text-sm text-gray-600">
            <p>- Este recibo corresponde únicamente a los insumos farmacéuticos del procedimiento.</p>
            <p>- Los insumos listados se encuentran reservados para el procedimiento programado.</p>
          </div>
        </UCard>

        <!-- Firma -->
        <div class="mt-8 pt-8 border-t border-gray-200">
          <div class="w-64 mx-auto text-center">
            <div class="border-b border-gray-400 pb-2"></div>
            <p class="pt-1 text-sm">Firma Autorizada</p>
          </div>
        </div>
      </div>
    </template>
  </UDashboardPanel>

  <!-- Pantalla de carga -->
  <div v-else class="flex justify-center items-center min-h-screen">
    <USkeleton v-if="pending" class="h-64 w-full max-w-3xl rounded-lg" />
  </div>
</template>

<style scoped>
@media print {
  .print\:p-4 {
    padding: 1rem;
  }

  /* Esconder elementos que no se deben imprimir */
  [class*="UDashboardNavbar"] {
    display: none;
  }
}
</style>
