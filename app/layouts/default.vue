<script setup lang="ts">
const route = useRoute()
const toast = useToast()

const open = ref(false)

const links = [[{
  label: 'Panel Principal',
  icon: 'i-lucide-layout-dashboard',
  to: '/dashboard',
  onSelect: () => {
    open.value = false
  }
}, {
  label: 'Cotizaciones',
  icon: 'i-lucide-notepad-text',
  to: '/quote-list',
  onSelect: () => {
    open.value = false
  }
}, {
  label: 'Crear Cotizacion',
  icon: 'i-lucide-notepad-text',
  to: '/quote/create',
  onSelect: () => {
    open.value = false
  }
}, {
  label: 'Crear Costo Administrativo',
  icon: 'i-lucide-hand-coins',
  to: '/cost',
  onSelect: () => {
    open.value = false
  }
},
  {
    label: 'Añadir Insumos',
    icon: 'i-lucide-briefcase-medical',
    to: '/supplies',
    onSelect: () => {
      open.value = false
    }
  },
  {
    label: 'Añadir Estudios',
    icon: 'i-lucide-clipboard-plus',
    to: '/study',
    onSelect: () => {
      open.value = false
    }
  },
  {
    label: 'Honorarios Medicos',
    icon: 'i-lucide-user-plus',
    to: '/honorary',
    onSelect: () => {
      open.value = false
    }
  }]]

const groups = computed(() => [{
  id: 'links',
  label: 'Go to',
  items: links.flat()
}, {
  id: 'code',
  label: 'Code',
  items: [{
    id: 'source',
    label: 'View page source',
    icon: 'i-simple-icons-github',
    to: `https://github.com/nuxt-ui-pro/dashboard/blob/main/app/pages${route.path === '/' ? '/index' : route.path}.vue`,
    target: '_blank'
  }]
}])

onMounted(async () => {
  const cookie = useCookie('cookie-consent')
  if (cookie.value === 'accepted') {
    return
  }

  toast.add({
    title: 'We use first-party cookies to enhance your experience on our website.',
    duration: 0,
    close: false,
    actions: [{
      label: 'Accept',
      color: 'neutral',
      variant: 'outline',
      onClick: () => {
        cookie.value = 'accepted'
      }
    }, {
      label: 'Opt out',
      color: 'neutral',
      variant: 'ghost'
    }]
  })
})
</script>

<template>
  <UDashboardGroup unit="rem">
    <UDashboardSidebar
        id="default"
        v-model:open="open"
        collapsible
        resizable
        class="bg-(--ui-bg-elevated)/25"
        :ui="{ footer: 'lg:border-t lg:border-(--ui-border)' }"
    >
      <!-- <template #header="{ collapsed }">
        <TeamsMenu :collapsed="collapsed" />
      </template> -->

      <template #default="{ collapsed }">
        <UDashboardSearchButton :collapsed="collapsed" class="bg-transparent ring-(--ui-border)"/>

        <UNavigationMenu
            :collapsed="collapsed"
            :items="links[0]"
            orientation="vertical"
        />

        <UNavigationMenu
            :collapsed="collapsed"
            :items="links[1]"
            orientation="vertical"
            class="mt-auto"
        />
      </template>

      <template #footer="{ collapsed }">
        <UserMenu :collapsed="collapsed"/>
      </template>
    </UDashboardSidebar>

    <UDashboardSearch :groups="groups"/>

    <slot/>

  </UDashboardGroup>
</template>
