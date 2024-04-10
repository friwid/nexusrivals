<script setup>
import Navbar from "./components/Navbar.vue";
import RegisterDialog from "./components/RegisterDialog.vue";
import LoginDialog from "./components/LoginDialog.vue";
import { inject, computed } from "vue";
import { useTheme } from "vuetify";

const bus = inject("$bus");
const localStorage = inject("$localStorage");

// Get and set theme in localStorage
const theme = useTheme();
theme.global.name.value = localStorage.$getItem("theme") || theme.global.name.value;
bus.$on("changeTheme", () => {
  theme.global.name.value =
  theme.global.name.value === "dark" ? "light" : "dark";
  localStorage.$setItem("theme", theme.global.name.value);
});
</script>

<template>
  <v-app>
    <Navbar></Navbar>
    <v-main>
      <RouterView></RouterView>
      <RegisterDialog></RegisterDialog>
      <LoginDialog></LoginDialog>
    </v-main>
    <footer></footer>
  </v-app>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
