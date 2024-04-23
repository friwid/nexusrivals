<script setup lang="ts">
import BaseLayout from '@/components/BaseLayout.vue'
import { inject } from 'vue'
import { useTheme } from 'vuetify'
import type { LocalStorage } from '@/types/types'
import type { EventBus } from '@/types/types'

const bus = inject<EventBus>('$bus')
const localStorage = inject<LocalStorage>('$localStorage')

// Get and set theme in localStorage
const theme = useTheme()

if (localStorage && bus) {
  theme.global.name.value = localStorage.$getItem('theme') || theme.global.name.value
  bus.$on('changeTheme', () => {
    theme.global.name.value = theme.global.name.value === 'dark' ? 'light' : 'dark'
    localStorage.$setItem('theme', theme.global.name.value)
  })
} else {
  throw new Error('bus or localStorage is not provided.')
}
</script>

<template>
  <v-app>
    <BaseLayout></BaseLayout>
  </v-app>
</template>

<style module></style>
