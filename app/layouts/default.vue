<script setup lang="ts">
const route = useRoute()
const toast = useToast()

const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(_isDark) {
    colorMode.preference = _isDark ? 'dark' : 'light'
  }
})


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
    label: 'Inventario De Farmacia e Insumos',
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
  },
  {
    label: 'Medicos',
    icon: 'i-lucide-user-plus',
    to: '/doctors/create',
    onSelect: () => {
      open.value = false
    }
  }
]]

const groups = computed(() => [{
  id: 'links',
  label: 'Ir a.',
  items: links.flat()
}])

/*onMounted(async () => {
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
})*/
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
        <UColorModeImage
            light="/pink-logo-light.png"
            dark="/dark-mode.png"
            class="w-full max-h-20 object-cover mx-auto"
            alt="Logo"
        />

        <UDashboardSearchButton :collapsed="collapsed" class="bg-transparent ring-(--ui-border)" label="Buscar..."/>

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

    <UDashboardSearch :groups="groups" placeholder="Escribe para buscar..."/>

    <slot/>

  </UDashboardGroup>
</template>
