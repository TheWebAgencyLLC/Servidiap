<script setup lang="ts">
import { sub } from 'date-fns'
import type { Period, Range} from '~/types'

// Existing dashboard code
const range = shallowRef<Range>({
  start: sub(new Date(), {days: 14}),
  end: new Date()
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
const selectedStudy = ref('');
const showStudyDetails = ref(false);


</script>

<template>
  <UDashboardPanel id="home">
    <!-- Keep your existing header section -->
    <template #header>
      <UDashboardNavbar title="Quote Management" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UDropdownMenu :items="items">
            <UButton icon="i-lucide-plus" size="md" class="rounded-full" />
          </UDropdownMenu>
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <HomeDateRangePicker v-model="range" class="-ms-1" />
          <HomePeriodSelect v-model="period" :range="range" />
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
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <!-- Patient Name -->
            <div>
              <label for="patientName" class="block mb-2 text-base">Nombre del Paciente</label>
              <input 
                id="patientName" 
                v-model="patientName" 
                type="text" 
                class="w-full px-4 py-3 border border-gray-700 rounded-md focus:outline-none focus:border-green-500"
              />
            </div>

            <!-- ID -->
            <div>
              <label for="patientId" class="block mb-2 text-base">Cedula de identidad</label>
              <input 
                id="patientId" 
                v-model="patientId" 
                type="text" 
                class="w-full px-4 py-3 border border-gray-700 rounded-md focus:outline-none focus:border-gray-700"
              />
            </div>
          </div>

          <!-- Study -->
          <div class="mb-6">
            <label for="study" class="block mb-2 text-base">Estudio</label>
            <div class="relative">
              <select 
                id="study" 
                v-model="selectedStudy" 
                @change="showStudyDetails = true"
                class="w-full px-4 py-3 border border-gray-700 rounded-md appearance-none focus:outline-none focus:border-gray-700"
              >
                <option value="" disabled selected>Seleccionar estudio</option>
                <option value="test">test</option>
                <option value="study1">Study 1</option>
                <option value="study2">Study 2</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <!-- Study Details (conditionally shown) -->
          <div v-if="showStudyDetails" class="mt-8 border border-gray-800 rounded-lg p-6">
            <div class="mb-6">
              <h2 class="text-xl font-medium mb-8">test</h2>

              <h3 class="text-lg mb-4">Insumos requeridos:</h3>
              
              <!-- Supplies Table -->
              <div class="mb-8">
                <div class="grid grid-cols-12 border-b border-gray-700 py-2">
                  <div class="col-span-8 font-medium">Insumos</div>
                  <div class="col-span-2 font-medium text-right">Cantidad</div>
                  <div class="col-span-2 font-medium text-right">Costo</div>
                </div>
                <div class="grid grid-cols-12 border-b border-gray-700 py-4">
                  <div class="col-span-8 text-gray-300">SULFATO DE ATROPINA 0,5 MG/ML X 1 ML AMP</div>
                  <div class="col-span-2 text-right text-gray-300">1</div>
                  <div class="col-span-2 text-right text-gray-300">783</div>
                </div>
              </div>
              
              <!-- Operative Costs -->
              <div class="mb-8">
                <div class="grid grid-cols-12 border-b border-gray-700 py-2">
                  <div class="col-span-10 font-medium">Costos Operativos</div>
                  <div class="col-span-2 font-medium text-right">Costo</div>
                </div>
                <div class="grid grid-cols-12 border-b border-gray-700 py-4">
                  <div class="col-span-10 text-gray-300">Sala de estudios</div>
                  <div class="col-span-2 text-right text-gray-300">100</div>
                </div>
              </div>
              
              <!-- Medical Fees -->
              <div class="mb-8">
                <div class="grid grid-cols-12 border-b border-gray-700 py-2">
                  <div class="col-span-10 font-medium">Honorarios Medicos</div>
                  <div class="col-span-2 font-medium text-right">Costo</div>
                </div>
                <div class="grid grid-cols-12 border-b border-gray-700 py-4">
                  <div class="col-span-10 text-gray-300">Honorarios Gastroenterologia</div>
                  <div class="col-span-2 text-right text-gray-300">4000</div>
                </div>
              </div>
              
              <!-- Totals -->
              <div class="space-y-4">
                <div class="flex justify-between items-center">
                  <div class="font-medium">Costo total:</div>
                  <div class="text-right">VES.4883</div>
                </div>
                
                <div class="flex justify-between items-center">
                  <div class="flex items-center">
                    <span class="font-medium mr-4">Porcentaje de ganancia:</span>
                    <div class="flex items-center bg-[#0D1323] rounded-md">
                      <button class="px-3 py-1 text-gray-400 hover:text-white">
                        <span class="text-xl">−</span>
                      </button>
                      <span class="mx-2">0%</span>
                      <button class="px-3 py-1 text-gray-400 hover:text-white">
                        <span class="text-xl">+</span>
                      </button>
                    </div>
                  </div>
                  <div class="text-right">VES.0.00</div>
                </div>
                
                <div class="flex justify-between items-center font-bold text-lg">
                  <div>Monto total:</div>
                  <div class="text-right">VES.4883.00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>