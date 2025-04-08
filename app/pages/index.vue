<script setup lang="ts">
definePageMeta({
  layout: "login",
});

import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const toast = useToast()
const showNavigation = ref(false)

const fields = [{
  name: 'email',
  type: 'text' as const,
  label: 'Email',
  placeholder: 'Enter your email',
  required: true
}, {
  name: 'password',
  label: 'Password',
  type: 'password' as const,
  placeholder: 'Enter your password'
}, {
  name: 'remember',
  label: 'Remember me',
  type: 'checkbox' as const
}]

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

function onSubmit(payload: FormSubmitEvent<Schema>) {
  console.log('Submitted', payload)
  showNavigation.value = true
}

function handleContinue() {
  showNavigation.value = true
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4 mt-4 min-h-screen">
    <UPageCard v-if="!showNavigation" class="w-full max-w-md">
      <div class="bg-white p-4 rounded-xl">
        <Logo />
      </div>
      <UAuthForm
        :schema="schema"
        :fields="fields"
        title="Welcome back!"
        icon="i-lucide-lock"
        @submit="onSubmit"
      >
        <template #description>
          Don't have an account? <ULink to="#" class="text-(--ui-primary) font-medium">Sign up</ULink>.
        </template>
        <template #password-hint>
          <ULink to="#" class="text-(--ui-primary) font-medium" tabindex="-1">Forgot password?</ULink>
        </template>
        <template #validation>
          <UAlert color="error" icon="i-lucide-info" title="Error signing in" />
        </template>
        
        <template #submit>
          <div class="flex flex-col gap-3 w-full">
            <UButton type="submit" block>Sign in</UButton>
            <UButton type="button" block variant="outline" @click="handleContinue">Continue</UButton>
          </div>
        </template>
      </UAuthForm>
    </UPageCard>

    <!-- Navigation Tiles -->
    <div v-else class="w-full h-full fixed inset-0">
      <NavigationTiles />
    </div>
  </div>
</template>

<style scoped>
.min-h-screen {
  min-height: 100vh;
}
</style>