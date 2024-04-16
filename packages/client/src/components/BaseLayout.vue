<script setup>
import MainNavbar from './MainNavbar.vue'
import RegisterDialog from './RegisterDialog.vue'
import LoginDialog from './LoginDialog.vue'
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

<style scoped></style>
