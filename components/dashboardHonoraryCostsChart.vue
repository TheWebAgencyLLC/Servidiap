<template>
  <div class="col-span-4 border border-gray-300 rounded shadow p-4">
    <div class="text-red-500 font-medium mb-4">Honorary Cost Chart</div>
    <div class="flex justify-center items-center h-40">
      <div class="w-full h-full relative">
        <canvas ref="chartCanvas"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'

// Reference to the canvas element
const chartCanvas = ref(null)
let chart = null

// Sample data - replace with your actual data
const revenueData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Revenue',
      data: [3000, 3500, 2800, 5000, 4200, 4800],
      borderColor: '#f44336',
      backgroundColor: 'rgba(239, 68, 28, 0.1)',
      tension: 0.4,
      fill: true
    }
  ]
}

// Initialize the chart when component is mounted
onMounted(() => {
  if (chartCanvas.value) {
    chart = new Chart(chartCanvas.value, {
      type: 'line',
      data: revenueData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: true,
              color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
              font: {
                size: 10
              }
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              font: {
                size: 10
              }
            }
          }
        }
      }
    })
  }
})

// Cleanup on unmount
onUnmounted(() => {
  if (chart) {
    chart.destroy()
  }
})
</script>

<style>

</style>