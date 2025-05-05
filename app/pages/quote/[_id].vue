<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import type { Quote, SupplyWithCount, Study, Patient } from "~~/types";
import { format } from 'date-fns';

const route = useRoute();
const quoteId = route.params._id as string;

// Fetch the quote data
const { data: quoteData, pending } = await useFetch(`/api/quote/${quoteId}`, {
  method: 'GET',
  server: false,
});

// Calculate totals for summary section
const totalSuppliesCost = computed(() => {
  if (!quoteData.value?.study?.Supplies) return 0;

  return quoteData.value.study.Supplies.reduce((acc, item) => {
    return acc + (item.supply.totalCost * item.count);
  }, 0);
});

const totalOperativeCosts = computed(() => {
  if (!quoteData.value?.study?.operativeCosts) return 0;

  return quoteData.value.study.operativeCosts.reduce((acc, item) => {
    return acc + item.value;
  }, 0);
});

const totalHonoraries = computed(() => {
  if (!quoteData.value?.study?.medicalHonoraries) return 0;

  return quoteData.value.study.medicalHonoraries.reduce((acc, item) => {
    return acc + item.value;
  }, 0);
});

// Format date
const formattedDate = computed(() => {
  if (!quoteData.value?.date) return '';
  return format(new Date(quoteData.value.date), 'dd/MM/yyyy');
});

// Table columns for supplies - updated with correct properties
const supplyColumns: TableColumn[] = [
  {
    header: 'Descripción',
    accessorKey: 'description'
  },
  {
    header: 'Cantidad',
    accessorKey: 'quantity'
  },
  {
    header: 'Precio Unitario',
    accessorKey: 'unitPrice'
  },
  {
    header: 'Precio Total',
    accessorKey: 'totalPrice'
  }
];

// Convert supplies to table data
const supplyData = computed(() => {
  if (!quoteData.value?.study?.Supplies) return [];

  return quoteData.value.study.Supplies.map(item => ({
    description: item.supply.description,
    quantity: item.count,
    unitPrice: `VES. ${item.supply.totalCost.toLocaleString()}`,
    totalPrice: `VES. ${(item.supply.totalCost * item.count).toLocaleString()}`
  }));
});

// Handle print function
function printQuote() {
  window.print();
}

// Navigate back to quotes list
function goBack() {
  navigateTo('/quote-list');
}
</script>

<template>
  <UDashboardPanel>
    <template #header>
      <UDashboardNavbar title="Detalle de Cotización" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UButton icon="i-lucide-arrow-left" variant="ghost" @click="goBack" />
        </template>
        <template #right>
          <UButton icon="i-lucide-printer" label="Imprimir" variant="soft" @click="printQuote" />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <ULoadingIndicator v-if="pending" />

      <div v-else class="space-y-8 p-4">
        <!-- Quote Header -->
        <UCard>
          <template #header>
            <div class="flex justify-between items-center">
              <h2 class="text-xl font-semibold">Cotización #{{ quoteData?._id }}</h2>
              <UBadge color="primary" size="lg">{{ formattedDate }}</UBadge>
            </div>
          </template>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Patient Info -->
            <div>
              <h3 class="text-sm font-medium text-gray-500 mb-2">Información del Paciente</h3>
              <UDivider class="my-2" />
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-gray-600">Nombre:</span>
                  <span class="font-medium">{{ quoteData?.patient?.name }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Cédula de Identidad:</span>
                  <span class="font-medium">{{ quoteData?.patient?.id }}</span>
                </div>
              </div>
            </div>

            <!-- Study Info -->
            <div>
              <h3 class="text-sm font-medium text-gray-500 mb-2">Información del Estudio</h3>
              <UDivider class="my-2" />
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-gray-600">Nombre del Estudio:</span>
                  <span class="font-medium">{{ quoteData?.study?.name }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Especialidad:</span>
                  <span class="font-medium">{{ quoteData?.study?.specialty }}</span>
                </div><div class="flex justify-between">
                  <span class="text-gray-600">Médico Asignado:</span>
                  <span class="font-medium">{{ quoteData?.doctor?.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </UCard>

        <!-- Supplies Table -->
        <UCard>
          <template #header>
            <h3 class="text-lg font-semibold">Insumos Requeridos</h3>
          </template>

          <UTable :columns="supplyColumns" :data="supplyData" />
        </UCard>

        <!-- Operative Costs -->
        <UCard v-if="quoteData?.study?.operativeCosts?.length">
          <template #header>
            <h3 class="text-lg font-semibold">Costos Operativos</h3>
          </template>

          <ul class="divide-y">
            <li v-for="(cost, index) in quoteData.study.operativeCosts" :key="index" class="py-3 flex justify-between">
              <span>{{ cost.name }}</span>
              <span class="font-medium">VES. {{ cost.value.toLocaleString() }}</span>
            </li>
          </ul>
        </UCard>

        <!-- Medical Honoraries -->
        <UCard v-if="quoteData?.study?.medicalHonoraries?.length">
          <template #header>
            <h3 class="text-lg font-semibold">Honorarios Médicos</h3>
          </template>

          <ul class="divide-y">
            <li v-for="(honoraries, index) in quoteData.study.medicalHonoraries" :key="index" class="py-3 flex justify-between">
              <span>{{ honoraries.name }}</span>
              <span class="font-medium">VES. {{ honoraries.value.toLocaleString() }}</span>
            </li>
          </ul>
        </UCard>

        <!-- Quote Summary -->
        <UCard>
          <template #header>
            <h3 class="text-lg font-semibold">Resumen de Cotización</h3>
          </template>

          <div class="space-y-4">
            <div class="flex justify-between">
              <span class="text-gray-600">Total Insumos:</span>
              <span class="font-medium">VES. {{ totalSuppliesCost.toLocaleString() }}</span>
            </div>

            <div class="flex justify-between">
              <span class="text-gray-600">Total Costos Operativos:</span>
              <span class="font-medium">VES. {{ totalOperativeCosts.toLocaleString() }}</span>
            </div>

            <div class="flex justify-between">
              <span class="text-gray-600">Total Honorarios Médicos:</span>
              <span class="font-medium">VES. {{ totalHonoraries.toLocaleString() }}</span>
            </div>

            <UDivider />

            <div class="flex justify-between">
              <span class="text-gray-600">Costo Total:</span>
              <span class="font-medium">VES. {{ quoteData?.totalCost?.toLocaleString() || '0' }}</span>
            </div>

            <div class="flex justify-between">
              <span class="text-gray-600">Ganancia ({{ quoteData?.profit }}%):</span>
              <span class="font-medium">VES. {{ ((quoteData?.finalPrice || 0) - (quoteData?.totalCost || 0)).toLocaleString() }}</span>
            </div>

            <UDivider />

            <div class="flex justify-between text-lg font-bold">
              <span>Precio Final:</span>
              <span class="text-primary">VES. {{ quoteData?.finalPrice?.toLocaleString() || '0' }}</span>
            </div>
          </div>

          <template #footer>
            <div class="text-sm text-gray-500 italic">
              <p>Cotización generada por: {{ quoteData?.author || 'Usuario del Sistema' }}</p>
              <p>Válida por 15 días a partir de la fecha de emisión.</p>
            </div>
          </template>
        </UCard>

        <!-- Action Buttons -->
        <div class="flex justify-end gap-4 mt-6">
          <UButton variant="outline" label="Volver" @click="goBack" />
          <UButton variant="solid" color="primary" label="Generar Factura"
                   icon="i-lucide-file-text" />
          <UButton variant="solid" color="success" label="Imprimir"
                   icon="i-lucide-printer" @click="printQuote" />
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>

<style scoped>
@media print {
  .no-print {
    display: none;
  }
}
</style>
