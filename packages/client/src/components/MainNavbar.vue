<script setup lang="ts">
import { inject } from 'vue'
import type { EventBus } from '@/types/types'

const bus = inject<EventBus>('$bus')
if (!bus) {
  throw new Error('bus is not provided!')
}
const openLoginDialog = (): void => {
  bus.$emit('openLoginDialog')
}
const openRegisterDialog = (): void => {
  bus.$emit('openRegisterDialog')
}
const changeTheme = (): void => {
  bus.$emit('changeTheme')
}
</script>

<template>
  <v-btn to="/" size="small" color="primary" icon>
    <v-icon>fas fa-home</v-icon>
  </v-btn>
  <v-toolbar-title>🚀</v-toolbar-title>
  <v-spacer></v-spacer>
  <router-link to="/">HomePage</router-link>
  <router-link to="test">TestPage</router-link>
  <v-btn icon variant="plain" @click="changeTheme()">
    <v-icon>fas fa-circle-half-stroke</v-icon>
  </v-btn>
  <v-btn variant="outlined" size="small" color="primary" :ripple="false" @click="openLoginDialog()">
    Login
  </v-btn>
  <v-btn
    variant="flat"
    size="small"
    color="primary"
    :ripple="false"
    class="ml-1"
    @click="openRegisterDialog()"
  >
    Register
  </v-btn>
</template>

<style module></style>
