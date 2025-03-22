<template>
  <div class="w-64 flex flex-col h-screen sticky top-0 border-r border-b mb-[20px] rounded border-slate-50">
    <div class="p-4 bg-white">
      <div class="flex items-center gap-2 font-semibold text-lg">
        <div class="flex items-center justify-center">
          <Logo />
        </div>
      </div>
    </div>
    
    <nav class="flex-1 overflow-y-auto">
      <ul>
        <li>
          <NuxtLink to="/dashboard" class="flex items-center gap-2 px-4 py-3">
            <div class="flex items-center justify-center">
              <UIcon name="i-material-symbols:dashboard" class="size-5" />
            </div>
            <span>Dashboard</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/quotes" class="flex items-center gap-2 px-4 py-3">
            <div class="flex items-center justify-center">
              <UIcon name="i-material-symbols-light:request-quote-outline" class="size-5" />
            </div>
            <span>Create Quote</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/costs" class="flex items-center gap-2 px-4 py-3">
            <div class="flex items-center justify-center">
              <UIcon name="i-lucide-lab:dollar-sign-square" class="size-5" />
            </div>
            <span>Create Cost</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/supplies" class="flex items-center gap-2 px-4 py-3">
            <div class="flex items-center justify-center">
              <UIcon name="i-streamline:medical-bag" class="size-5" />
            </div>
            <span>Add Supplies</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/procedures" class="flex items-center gap-2 px-4 py-3">
            <div class="flex items-center justify-center">
              <UIcon name="i-fa-solid:procedures" class="size-5" />
            </div>
            <span>Add Procedure</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/honorary" class="flex items-center gap-2 px-4 py-3">
            <div class="flex items-center justify-center">
              <UIcon name="i-healthicons:doctor-outline" class="size-5" />
            </div>
            <span>Honorary List</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
    
    <div class="border-t border-gray-300 p-4 bg-gray-900 text-white">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-center border border-gray-300 w-6 h-6">
          <UIcon name="i-iconamoon:profile" class="size-5" />
        </div>
        <div class="flex items-center gap-1 text-sm">
          <span>Logout</span>
          <UIcon name="i-basil:logout-outline" class="size-5" />
        </div>
      </div>
    </div>
  </div>
</template>