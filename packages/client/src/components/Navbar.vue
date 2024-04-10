<script setup>
import { inject } from "vue";

const bus = inject("$bus");
const openLoginDialog = () => {
  bus.$emit("openLoginDialog");
};
const openRegisterDialog = () => {
  bus.$emit("openRegisterDialog");
};
const changeTheme = () => {
  bus.$emit("changeTheme");
};
</script>

<template>
  <v-app-bar density="compact" class="mb-10">
    <v-btn to="/" size="small" color="primary" icon>
      <v-icon>fas fa-home</v-icon>
    </v-btn>
    <v-toolbar-title>🚀</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon variant="plain" @click="changeTheme()">
      <v-icon>fas fa-circle-half-stroke</v-icon>
    </v-btn>
    <v-btn
      variant="outlined"
      size="small"
      color="primary"
      :ripple="false"
      @click="openLoginDialog()"
    >
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
  </v-app-bar>
</template>

<style scoped></style>
