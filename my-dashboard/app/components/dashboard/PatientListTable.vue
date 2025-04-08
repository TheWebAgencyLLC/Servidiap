<template>
  <div class="col-span-8 border border-gray-300 rounded shadow p-4">
    <div class="flex justify-between items-center mb-4">
      <div class="flex items-center">
        <div class="flex mr-2">
          <UIcon name="i-fluent:patient-20-filled" class="size-5" />
        </div>
        <span class="font-medium">Patient List</span>
      </div>
    </div>
    
    <div class="overflow-x-auto">
      <UTable :data="limitedData" class="flex-1 pb-2">
        <template #status-cell="{ row }">
          <UBadge 
            :color="getStatusColor(row.original.status)" 
            variant="subtle" 
            class="capitalize"
          >
            {{ row.original.status }}
          </UBadge>
        </template>
        <template #documents-cell="{ row }">
          <a 
            href="#" 
            @click.prevent="openPdfFile(row.original.documents)"
            class="inline-block hover:text-primary-500 transition-colors"
            title="Open PDF file"
          >
            <UIcon name="i-bxs:file-pdf" class="size-5" />
          </a>
        </template>
      </UTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { h, resolveComponent } from 'vue'

const UBadge = resolveComponent('UBadge')

const data = ref([
  {
    quoteNo: '4600',
    patientName: 'Carlos Aldape',
    status: 'Completed',
    study: 'General Checkup',
    cost: 594,
    profit: 400,
    documents: "report.pdf"
  },
  {
    quoteNo: '4599',
    patientName: 'Rajesh Gupta',
    status: 'In Progress',
    study: 'Colonoscopy',
    cost: 276,
    profit: 400,
    documents: "testreport.pdf"
  },
  {
    quoteNo: '4598',
    patientName: 'Sam Hirsch',
    status: 'Completed',
    study: 'X-Ray',
    cost: 315,
    profit: 400,
    documents: "report.pdf"
  },
  {
    quoteNo: '4597',
    patientName: 'Nikola Jokic',
    status: 'In Progress',
    study: 'Blood Panel',
    cost: 529,
    profit: 400,
    documents:"testreport.pdf"
  },
  {
    quoteNo: '4596',
    patientName: 'Lebron James',
    status: 'Completed',
    study: 'Ultra Sound',
    cost: 639,
    profit: 400,
    documents: "report.pdf"
  },
  {
    quoteNo: '4600',
    patientName: 'Sven Olafson',
    status: 'Completed',
    study: 'General Checkup',
    cost: 594,
    profit: 400,
    documents: "report.pdf"
  },
  {
    quoteNo: '4600',
    patientName: 'Daquorius Johnson',
    status: 'Completed',
    study: 'General Checkup',
    cost: 594,
    profit: 400,
    documents: "report.pdf"
  },
  {
    quoteNo: '4600',
    patientName: 'John Smith',
    status: 'Completed',
    study: 'General Checkup',
    cost: 594,
    profit: 400,
    documents: "report.pdf"
  },
  {
    quoteNo: '4600',
    patientName: 'Patrick Star',
    status: 'Completed',
    study: 'General Checkup',
    cost: 594,
    profit: 400,
    documents: "report.pdf"
  },
])

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'success'
    case 'In Progress':
      return 'warning'
    default:
      return 'neutral'
  }
}

const limitedData = computed(() => {
  return data.value.slice(0, 7);
});

const openPdfFile = (filename: string) => {
  const baseUrl = '/pdfs/'
  window.open(`${baseUrl}${filename}`, '_blank')
}
</script>

<style>
</style>