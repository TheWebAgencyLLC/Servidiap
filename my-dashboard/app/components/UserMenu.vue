<script setup lang="ts">
defineProps<{
  collapsed?: boolean
}>()

const user = ref({
  name: 'Sneh Mehta',
  avatar: {
    src: 'https://github.com/snehmehta23.png',
    alt: 'Sneh Mehta'
  }
})

const emit = defineEmits(['logout'])

function handleLogout() {
  emit('logout')
}
</script>

<template>
  <div class="flex items-center gap-2">
    <UButton
      v-bind="{
        ...user,
        label: collapsed ? undefined : user?.name,
      }"
      color="neutral"
      variant="ghost"
      :square="collapsed"
    />
    <UTooltip text="Log Out">
      <UButton
        icon="i-lucide-log-out"
        color="neutral"
        variant="ghost"
        square
        @click="handleLogout"
        aria-label="Log out"
      />
    </UTooltip>
  </div>
</template>