<script setup>
import BaseLayout from '@/components/BaseLayout.vue'
import { inject, computed } from 'vue'
import { useTheme } from 'vuetify'

const bus = inject('$bus')
const localStorage = inject('$localStorage')

// Get and set theme in localStorage
const theme = useTheme()
theme.global.name.value = localStorage.$getItem('theme') || theme.global.name.value
bus.$on('changeTheme', () => {
  theme.global.name.value = theme.global.name.value === 'dark' ? 'light' : 'dark'
  localStorage.$setItem('theme', theme.global.name.value)
})
</script>

<template>
  <v-app>
    <BaseLayout></BaseLayout>
  </v-app>
</template>

<style module></style>
