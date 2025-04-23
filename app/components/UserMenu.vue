<script setup lang="ts">
defineProps<{
  collapsed?: boolean
}>()

const user = ref({
  name: 'Ruth Alfonzo',
  avatar: {
    src: 'https://cdn.discordapp.com/attachments/684442343168147529/1359264477958111402/image.png?ex=67f6d931&is=67f587b1&hm=32b421354a689a4aea51ba9c2d37a0f5d8753db6c0d7f6be9d66b731b85c14f3&',
    alt: 'Ruth Alfonzo'
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
    <UColorModeSwitch/>
  </div>
</template>
