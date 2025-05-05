<script setup lang="ts">

import type {TableColumn} from "@nuxt/ui";
import type {Doctor} from "~~/types";

const toast = useToast();


const state = ref({
  name: '',
  specialties: [] as string[],
})
const specialties = [
  "Alergología",
  "Anestesiología",
  "Cardiología",
  "Cirugía General",
  "Dermatología",
  "Endocrinología",
  "Gastroenterología",
  "Geriatría",
  "Ginecología y Obstetricia",
  "Hematología",
  "Infectología",
  "Medicina Familiar",
  "Medicina Interna",
  "Nefrología",
  "Neumología",
  "Neurología",
  "Oftalmología",
  "Oncología",
  "Ortopedia",
  "Otorrinolaringología",
  "Pediatría",
  "Psiquiatría",
  "Radiología",
  "Reumatología",
  "Urología"
];

const columns: TableColumn<Doctor>[] = [
  {
    header: 'Nombre',
    accessorKey: 'name'
  },
  {
    header: 'Especialidades',
    accessorKey: 'specialties'
  }
]

async function createDoctor() {
  try {

    if (!state.value.name) throw new Error('El nombre es requerido')
    if (!state.value.specialties.length) throw new Error('Debe seleccionar al menos una especialidad')

    const res = await $fetch(`/api/doctors/create`, {
      body: {
        ...state.value,
      },
      method: 'POST'


    })
    await refreshNuxtData('doctors');
  } catch (e: any) {
    toast.add({
      title: 'Error',
      description: e.message,
      color: 'error',

    })
  }
}

const {data, status, error} = await useFetch('/api/doctors', {
  method: 'GET',
  key: 'doctors',
})

</script>

<template>
  <UDashboardPanel class="w-full" id="doctors">
    <template #header>
      <UDashboardNavbar title="Listado de Medicos" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse/>
        </template>

        <template #right>
          <!--        <UInput v-model="filter" leading-icon="i-lucide-funnel" placeholder="Buscar Insumo"/>-->
          <!--        <UDropdownMenu :items="items">-->
          <!--          <UButton icon="i-lucide-plus" size="md" class="rounded-full"/>-->
          <!--        </UDropdownMenu>-->
        </template>
      </UDashboardNavbar>
    </template>
    <template #body>
      <UForm class="w-full" :state="state">
        <div class="flex flex-col gap-4 justify-center items-start w-full">
          <UFormField label="Nombre Completo">
            <UInput placeholder="Ingresar nombre..." v-model="state.name"/>
          </UFormField>
          <UFormField label="Especialidad" description="Puede seleccionar varias opciones">
            <UInputMenu multiple v-model="state.specialties" :items="specialties"/>
          </UFormField>
          <UButton @click="createDoctor" class="cursor-pointer" > Guardar</UButton>
        </div>
      </UForm>
      <USeparator/>
      <UTable :data="data" :columns="columns" :loading="status === 'pending'"/>
    </template>
  </UDashboardPanel>

</template>

<style scoped>

</style>
