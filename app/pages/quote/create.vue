<script setup lang="ts">
import {sub} from 'date-fns';
import type {Period, Range} from '~/types';
import type {MedicalHonoraries, OperativeCost, Quote, Study} from "~~/types";
import type {TableColumn} from "@nuxt/ui";

// Dashboard date range setup
const range = shallowRef<Range>({
  start: sub(new Date(), {days: 14}),
  end: new Date()
});

const period = ref<Period>('daily');

// Quote state with proper defaults
const state = ref<Partial<Quote>>({
  patient: {
    name: '',
    id: '',
  },
  study: '',
  date: new Date(),
  profit: 0,
  author: 'RS',
});

// Navigation items
const items = [[{
  label: 'New Quote',
  icon: 'i-lucide-notepad-text',
  to: '/quote'
}, {
  label: 'Add Supplies',
  icon: 'i-lucide-briefcase-medical',
  to: '/supplies'
}]];

// Form state - exact same refs as original code
const patientName = ref('');
const patientId = ref('');
const selectedStudy = ref<Study | null>(null);
const showStudyDetails = ref(false);
const formLoading = ref(false);
const toast = useToast();

// Step management for multi-step form
const currentStep = ref(1);
const totalSteps = 3;

// Form validation
const isPatientInfoValid = computed(() => {
  return state.value.patient?.name && state.value.patient?.id;
});

const isStudySelected = computed(() => {
  return !!selectedStudy.value;
});

// Fetch study data - using the original fetch approach
const {data: studyData} = await useFetch('/api/studies', {
  method: 'GET',
  server: false,
  onResponse({response}) {
    console.log('response', response)
  }
});

// Using the exact same onChange function as in the original code
async function onChange(event: any) {
  console.log(event)
  const targetStudy = await $fetch(`/api/studies/${event._id}`, {
    method: 'GET',
  })
  if (targetStudy) {
    selectedStudy.value = targetStudy as Study
    showStudyDetails.value = true;
  }
}

// Submit function based on the original submitData function
async function submitQuote() {
  try {
    formLoading.value = true;
    const res = await $fetch(`/api/quote/create`, {
      method: 'POST',
      body: {
        ...state.value,
        study: selectedStudy?.value?._id,
        totalCost: parseFloat(calculatedCost.value.toString()),
        finalPrice: parseFloat(totalPrice.value),
      }
    });

    toast.add({
      title: 'Confirmacion',
      description: 'Cotizacion creada correctamente.',
    });
    return navigateTo(`/quote/${res.body._id}`)



    // Reset form or navigate as needed
  } catch (e) {
    console.error(e);
    toast.add({
      title: 'Error',
      description: 'Ha sucedido un error.',
    });
  } finally {
    formLoading.value = false;
  }
}

// Navigation between steps
function nextStep() {
  if (currentStep.value < totalSteps) {
    currentStep.value++;
  }
}

function prevStep() {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
}

// Using the exact same table column definitions from original code
const supplyColumn = [
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
];

const costColumns = [
  {
    accessorKey: 'name',
    header: 'Costos Operativos'
  },
  {
    accessorKey: 'value',
    header: 'Costo'
  }
];

const honorariesColumns = [
  {
    accessorKey: 'name',
    header: 'Honorarios Medicos'
  },
  {
    accessorKey: 'value',
    header: 'Costo'
  }
];

// Using the original calculation methods
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
  return cost;
});

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
  return (cost + (state.value.profit * cost)).toFixed(2);
});

const calculatedPercentage = computed(() => {
  if (selectedStudy.value) {
    return (calculatedCost.value * state.value.profit).toFixed(2);
  }
  return 0;
});
</script>

<template>
  <UDashboardPanel id="quote-management">
    <!-- Header Section -->
    <template #header>
      <UDashboardNavbar title="Crear Nueva Cotización" :ui="{ right: 'gap-3' }">
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

    <!-- Main Content Section -->
    <template #body>
      <div class="p-4 md:p-6 space-y-6">
        <!-- Progress Indicator -->
        <div class="mb-8">
          <div class="flex items-center justify-between mb-2">
            <h2 class="text-lg font-semibold">{{
                currentStep === 1 ? 'Datos del Paciente' : currentStep === 2 ? 'Selección de Estudio' : 'Resumen y Confirmación'
              }}</h2>
            <UBadge>Paso {{ currentStep }} de {{ totalSteps }}</UBadge>
          </div>
          <UProgress v-model="currentStep" :max="totalSteps" :ui="{ track: { background: 'bg-gray-100' } }"
                     color="primary"/>
        </div>

        <!-- Form Container -->
        <UCard :ui="{ body: { padding: 'p-6' } }">
          <UForm>
            <!-- Step 1: Patient Information -->
            <div v-if="currentStep === 1" class="space-y-6">
              <h3 class="text-xl font-semibold mb-4">Información del Paciente</h3>

              <UFormGroup label="Nombre del Paciente" required>
                <UInput v-model="state.patient.name" placeholder="Ingrese el nombre completo"/>
              </UFormGroup>

              <UFormGroup label="Cédula de Identidad" required>
                <UInput v-model="state.patient.id" placeholder="V-12345678"/>
              </UFormGroup>

              <UFormGroup label="Fecha">
                <UDatePicker v-model="state.date" :ui="{ input: { rounded: 'rounded-lg' } }"/>
              </UFormGroup>

              <div class="flex justify-end pt-4">
                <UButton
                    label="Continuar"
                    color="primary"
                    variant="solid"
                    :disabled="!isPatientInfoValid"
                    @click="nextStep"
                    icon="i-lucide-arrow-right"
                    position="right"
                />
              </div>
            </div>

            <!-- Step 2: Study Selection - Using the original selection pattern -->
            <div v-if="currentStep === 2" class="space-y-6">
              <h3 class="text-xl font-semibold mb-4">Selección de Estudio</h3>

              <!--              <UFormField label="Estudio" required>-->
              <!--                &lt;!&ndash; Using the same select approach as in the original code &ndash;&gt;-->
              <!--                <USelect-->
              <!--                    :options="studyData"-->
              <!--                    option-attribute="name"-->
              <!--                    value-attribute="_id"-->
              <!--                    placeholder="Seleccione un estudio"-->
              <!--                    @change="onChange"-->
              <!--                />-->
              <!--              </UFormField>-->
              <UFormField label="Estudio">
                <UInputMenu @update:modelValue="onChange" label-key="name" :items="studyData" v-model="selectedStudy"
                         placeholder="Seleccione un estudio">
                  <template #item="{item}">
                    {{ item.name }}
                  </template>
                </UInputMenu>
              </UFormField>


              <template v-if="showStudyDetails && selectedStudy">
                <UDivider label="Detalles del Estudio" class="my-6"/>

                <!-- Study Details -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 class="text-sm font-medium text-gray-500 mb-2">Información del Estudio</h4>
                    <p class="font-medium">{{ selectedStudy.name }}</p>
                    <p class="text-sm text-gray-600">Especialidad: {{ selectedStudy.specialty }}</p>
                  </div>
                </div>

                <!-- Supplies Table -->
                <div v-if="selectedStudy.Supplies && selectedStudy.Supplies.length > 0" class="mb-6">
                  <h4 class="text-base font-medium mb-2">Insumos Requeridos</h4>
                  <UTable
                      :columns="supplyColumn"
                      :data="selectedStudy.Supplies"
                      :ui="{
                      wrapper: 'border border-gray-200 rounded-lg',
                      th: { base: 'bg-gray-50 text-left font-medium text-gray-700' }
                    }"
                      hover
                  />
                </div>

                <!-- Operative Costs Table -->
                <div v-if="selectedStudy.operativeCosts && selectedStudy.operativeCosts.length > 0" class="mb-6">
                  <h4 class="text-base font-medium mb-2">Costos Operativos</h4>
                  <UTable
                      :columns="costColumns"
                      :data="selectedStudy.operativeCosts"
                      :ui="{
                      wrapper: 'border border-gray-200 rounded-lg',
                      th: { base: 'bg-gray-50 text-left font-medium text-gray-700' }
                    }"
                      hover
                  />
                </div>

                <!-- Medical Honoraries Table -->
                <div v-if="selectedStudy.medicalHonoraries && selectedStudy.medicalHonoraries.length > 0" class="mb-6">
                  <h4 class="text-base font-medium mb-2">Honorarios Médicos</h4>
                  <UTable
                      :columns="honorariesColumns"
                      :data="selectedStudy.medicalHonoraries"
                      :ui="{
                      wrapper: 'border border-gray-200 rounded-lg',
                      th: { base: 'bg-gray-50 text-left font-medium text-gray-700' }
                    }"
                      hover
                  />
                </div>
              </template>

              <div class="flex justify-between pt-4">
                <UButton
                    label="Volver"
                    variant="ghost"
                    @click="prevStep"
                    icon="i-lucide-arrow-left"
                    position="left"
                />
                <UButton
                    label="Continuar"
                    color="primary"
                    variant="solid"
                    :disabled="!isStudySelected"
                    @click="nextStep"
                    icon="i-lucide-arrow-right"
                    position="right"
                />
              </div>
            </div>

            <!-- Step 3: Summary and Confirmation -->
            <div v-if="currentStep === 3" class="space-y-6">
              <h3 class="text-xl font-semibold mb-4">Resumen y Confirmación</h3>

              <!-- Cost Summary -->
              <UCard class="bg-gray-50">
                <div class="space-y-4">
                  <div class="flex justify-between">
                    <span class="text-gray-700">Costo Base:</span>
                    <span class="font-medium">VES. {{ calculatedCost.toLocaleString() }}</span>
                  </div>

                  <UFormGroup label="Porcentaje de Ganancia">
                    <div class="flex space-x-2 items-center">
                      <UInput
                          v-model="state.profit"
                          type="number"
                          min="0"
                          max="1"
                          step="0.01"
                          placeholder="0.10"
                          class="w-24"
                      />
                      <USlider
                          v-model="state.profit"
                          :min="0"
                          :max="1"
                          :step="0.01"
                          class="w-full max-w-xs"
                      />
                      <span class="ml-2">{{ (state.profit * 100).toFixed(0) }}%</span>
                    </div>
                  </UFormGroup>

                  <div class="flex justify-between">
                    <span class="text-gray-700">Monto de Ganancia:</span>
                    <span class="font-medium">VES. {{ calculatedPercentage }}</span>
                  </div>

                  <UDivider class="my-2"/>

                  <div class="flex justify-between">
                    <span class="text-lg font-bold text-gray-800">Precio Final:</span>
                    <span class="text-lg font-bold text-primary">VES. {{ totalPrice }}</span>
                  </div>
                </div>
              </UCard>

              <!-- Patient and Study Summary -->
              <UCard>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- Patient Info Summary -->
                  <div>
                    <h4 class="text-sm font-medium text-gray-500 mb-2">Información del Paciente</h4>
                    <UDivider class="my-2"/>
                    <div class="space-y-2">
                      <div class="flex justify-between">
                        <span class="text-gray-600">Nombre:</span>
                        <span class="font-medium">{{ state.patient.name }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-600">Cédula de Identidad:</span>
                        <span class="font-medium">{{ state.patient.id }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-600">Fecha:</span>
                        <span class="font-medium">{{ new Date(state.date).toLocaleDateString() }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Study Info Summary -->
                  <div v-if="selectedStudy">
                    <h4 class="text-sm font-medium text-gray-500 mb-2">Información del Estudio</h4>
                    <UDivider class="my-2"/>
                    <div class="space-y-2">
                      <div class="flex justify-between">
                        <span class="text-gray-600">Nombre del Estudio:</span>
                        <span class="font-medium">{{ selectedStudy.name }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-600">Especialidad:</span>
                        <span class="font-medium">{{ selectedStudy.specialty }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </UCard>

              <div class="flex justify-between pt-4">
                <UButton
                    label="Volver"
                    variant="ghost"
                    @click="prevStep"
                    icon="i-lucide-arrow-left"
                    position="left"
                />
                <UButton
                    label="Crear Cotización"
                    color="primary"
                    variant="solid"
                    icon="i-lucide-check"
                    position="right"
                    :loading="formLoading"
                    @click="submitQuote"
                />
              </div>
            </div>
          </UForm>
        </UCard>
      </div>
    </template>
  </UDashboardPanel>
</template>

<style scoped>
/* Add responsive print styles */
@media print {
  .no-print {
    display: none;
  }

  /* Ensure proper page breaks */
  .page-break {
    page-break-after: always;
  }
}
</style>
