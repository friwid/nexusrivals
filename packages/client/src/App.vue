<script setup lang="ts">
import BaseLayout from '@/components/BaseLayout.vue'
import { inject, computed } from 'vue'
import { useTheme } from 'vuetify'
import type { LocalStorage } from '@/utils/localStorage'
import type { EventBus } from '@/utils/events'

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
