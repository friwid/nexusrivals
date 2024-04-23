<script setup lang="ts">
import { ref, inject } from 'vue'
import { useDisplay } from 'vuetify'
import { login } from '@/api/api.js'
import type { EventBus } from '@/types/types'

const { mobile } = useDisplay()

type LoginForm = {
  username: string
  password: string
  isRememberMe: boolean
}

const loginForm = ref<LoginForm>({
  username: '',
  password: '',
  isRememberMe: false
})

const isLoading = ref(false)

// Handle submitted form data, send it to axios API
const handleSubmit = (event: SubmitEvent) => {
  //  e.preventDefault()
  isLoading.value = true
  console.log('LoginDialog.vue loginForum.value: ')
  console.table(loginForm.value)
  setTimeout(() => {
    isLoading.value = false
  }, 2000)

  login(event, loginForm.value)
}

// Rules for form validity
type Rule = boolean | string

const valid = ref(false)
const rules = {
  required: (value: string): Rule => !!value || 'Required.',
  countUsername: (value: string): Rule =>
    (value.length >= 3 && value.length <= 16) || '3-16 characters',
  countPassword: (value: string): Rule => value.length >= 8 || 'Min 8 characters.'
}

// Listen to events to open dialogs
const bus = inject<EventBus>('$bus')
if (!bus) {
  throw new Error('bus is not provided.')
}
const loginOverlay = ref(false)

bus.$on('openLoginDialog', () => {
  loginOverlay.value = true
})

const openRegisterDialog = () => {
  bus.$emit('openRegisterDialog')
}
</script>

<template>
  <v-dialog
    v-model="loginOverlay"
    persistent
    no-click-animation
    class="align-center justify-center"
    :fullscreen="mobile"
  >
    <v-card width="450" class="mx-auto">
      <v-toolbar>
        <v-toolbar-title> Login </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn icon variant="plain" size="small" v-on:click="loginOverlay = false">
            <v-icon>fas fa-close</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-form v-on:submit.prevent="handleSubmit" v-model="valid" fluid class="mx-5 mt-5">
        <v-text-field
          v-model="loginForm.username"
          label="Username"
          type="text"
          prepend-inner-icon="fas fa-user"
          :rules="[rules.required, rules.countUsername]"
          autofocus
        ></v-text-field>
        <v-text-field
          v-model="loginForm.password"
          label="Password"
          type="password"
          prepend-inner-icon="fas fa-key"
          :rules="[rules.required, rules.countPassword]"
        ></v-text-field>
        <v-checkbox
          color="secondary"
          v-model="loginForm.isRememberMe"
          label="Remember me."
          hide-details
        ></v-checkbox>
        <v-btn
          type="submit"
          block
          class="mt-2"
          color="primary"
          :disabled="isLoading || !valid"
          :loading="isLoading"
        >
          Login
        </v-btn>
      </v-form>

      <v-card-actions class="justify-center"
        ><v-btn variant="plain" v-on:click="(loginOverlay = false), openRegisterDialog()">
          No account? Register here
        </v-btn></v-card-actions
      >
    </v-card>
  </v-dialog>
</template>
<style module></style>
