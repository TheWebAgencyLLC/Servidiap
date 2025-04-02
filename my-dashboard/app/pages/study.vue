<template>
  <UDashboardPanel id="study">
    <template #header>
      <UDashboardNavbar title="Add Study" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UDropdownMenu :items="items">
            <UButton icon="i-lucide-plus" size="md" class="rounded-full" />
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
            <div class="mb-6">
              <label for="specialty" class="block mb-2 text-base">Especialidad</label>
              <div class="relative">
                <USelect id="specialty" v-model="selectedSpecialty" :items="items2" class="w-full" />
              </div>
            </div>

            <!-- Nombre -->
            <div class="mb-6">
              <label for="procedureName" class="block mb-2 text-base">Nombre</label>
              <input 
                id="procedureName" 
                v-model="procedureName" 
                type="text" 
                class="w-full px-4 py-3 border border-gray-700 rounded-md  focus:outline-none focus:border-green-500"
              />
            </div>

            <!-- Honorarios - UInputMenu with Multiple Selection -->
            <div class="mb-6">
              <label class="block mb-2 text-base">Honorarios</label>
              <UInputMenu
                v-model="selectedHonorarios"
                :items="honorariosItems"
                multiple
                class="w-full border border-gray-700 rounded-md"
              />
            </div>
            
            <!-- Costos Operativos - UInputMenu with Multiple Selection -->
            <div class="mb-6">
              <label class="block mb-2 text-base">Costos Operativos</label>
              <UInputMenu
                v-model="selectedCostos"
                :items="costosItems"
                multiple
                class="w-full border border-gray-700 rounded-md"
              />
            </div>
            
            <!-- Insumos - UInputMenu with Multiple Selection -->
            <div class="mb-6">
              <label class="block mb-2 text-base">Insumos</label>
              <UInputMenu
                v-model="selectedInsumos"
                :items="insumosItems"
                multiple
                class="w-full border border-gray-700 rounded-md"
              />
            </div>

            <!-- Insumo Quantity Section (displayed for each selected insumo) -->
            <div v-if="selectedInsumos && selectedInsumos.length > 0" class="mt-6 mb-8">
              <h3 class="text-lg mb-4">Cantidad de insumos:</h3>
              <div v-for="insumo in selectedInsumos" :key="insumo" class="flex items-center justify-between mb-4">
                <span class="text-gray-300">{{ insumo }}</span>
                <div class="flex items-center">
                  <button class="px-3 py-1 bg-gray-800 rounded-l-md text-gray-400 hover:text-white">
                    <span class="text-xl">−</span>
                  </button>
                  <span class="mx-4">1</span>
                  <button class="px-3 py-1 bg-gray-800 rounded-r-md text-gray-400 hover:text-white">
                    <span class="text-xl">+</span>
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Cost Summary -->
            <div class="mt-8 p-6 border border-gray-800 rounded-lg ">
              <div class="flex justify-between items-center font-bold text-lg">
                <div>Costo total del estudio:</div>
                <div class="text-right">4883 VES</div>
              </div>
            </div>
            
            <!-- Submit Button -->
            <div class="mt-8">
              <button 
                class="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-md text-white font-medium"
              >
                Guardar Estudio
              </button>
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
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>
            </div>

            <!-- UTable for displaying existing studies -->
            <UTable 
              :rows="[]" 
              :columns="tableColumns"
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
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                    </svg>
                  </button>
                  <button 
                    class="p-1 text-green-400 hover:text-green-300"
                    title="Duplicar"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                  </button>
                  <button 
                    class="p-1 text-red-400 hover:text-red-300"
                    title="Eliminar"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
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

<script setup>
import { ref } from 'vue';

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

const items2 = ref(['Example', 'of', 'specialties']);

// Form data (just variables, no logic)
const selectedSpecialty = ref('');
const procedureName = ref('');
const selectedHonorarios = ref([]);
const selectedCostos = ref([]);
const selectedInsumos = ref([]);

// Mock data for dropdowns
const honorariosItems = ref([
  'Honorarios Gastroenterologia',
  'Honorarios Cardiologia',
  'Honorarios Neurologia',
  'Honorarios Anestesia'
]);

const costosItems = ref([
  'Sala de estudios',
  'Equipos',
  'Personal de apoyo',
  'Hospitalizacion'
]);

const insumosItems = ref([
  'SULFATO DE ATROPINA 0,5 MG/ML X 1 ML AMP',
  'JERINGA 5ML',
  'GUANTES ESTERILES',
  'CATETER INTRAVENOSO'
]);

// Table configuration
const tableColumns = [
  { key: 'name', label: 'name', accessorKey: 'name' },
  { key: 'specialty', label: 'specialty', accessorKey: 'specialty' },
  { key: 'cost', label: 'cost', accessorKey: 'cost' },
  { key: 'actions', label: 'actions', accessorKey: 'actions' }
];
</script>