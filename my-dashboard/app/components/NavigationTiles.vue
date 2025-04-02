<!-- components/NavigationTiles.vue -->
<script setup lang="ts">
const tiles = [
  { id: 'dashboard', title: 'Dashboard', icon: 'i-lucide-layout-dashboard' },
  { id: 'quote', title: 'Create Quote', icon: 'i-lucide-file-plus' },
  { id: 'supplies', title: 'Add Supplies', icon: 'i-lucide-package' },
  { id: 'study', title: 'Add Study', icon: 'i-lucide-book-open' }
];

const navigateTo = (route: string) => {
  useRouter().push(`/${route}`);
};
</script>

<template>
  <div class="navigation-container w-full h-full flex items-center justify-center">
    <div class="relative">
      <!-- Center text with question -->
      <div class="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div class="text-center">
          <p class="text-white text-lg font-medium">Where would you like to navigate to?</p>
        </div>
      </div>

      <!-- Navigation tiles grid -->
      <div class="grid grid-cols-2 gap-12">
        <div v-for="tile in tiles" :key="tile.id" 
          @click="navigateTo(tile.id)"
          class="nav-tile bg-gray-200 w-48 h-48 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white hover:shadow-lg hover:scale-105 group">
          <div class="text-gray-700 group-hover:text-[#232e77] mb-3">
            <UIcon :name="tile.icon" class="w-12 h-12" />
          </div>
          <h3 class="text-gray-800 font-medium text-lg group-hover:text-[#232e77]">{{ tile.title }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>