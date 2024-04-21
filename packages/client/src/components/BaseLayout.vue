<script setup lang="ts">
import MainNavbar from '@/components/MainNavbar.vue'
import RegisterDialog from '@/components/RegisterDialog.vue'
import LoginDialog from '@/components/LoginDialog.vue'
</script>

<template>
  <v-app-bar density="compact" class="mb-10">
    <MainNavbar />
  </v-app-bar>
  <v-main>
    <RouterView></RouterView>
    <RegisterDialog></RegisterDialog>
    <LoginDialog></LoginDialog>
  </v-main>
</template>

<style module></style>
