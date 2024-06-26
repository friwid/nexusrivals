<script setup lang="ts">
import { ref, shallowReactive, inject } from 'vue'
import { useDisplay } from 'vuetify'
import { loginCall } from '@/api/api'
import type { EventBus, FormRule, LoginData } from '@/types/types'

const { mobile } = useDisplay()

const loginData = shallowReactive<LoginData>({
  username: '',
  password: '',
  isRememberMe: false
})

const isLoading = ref(false)

const handleSubmit = async () => {
  isLoading.value = true
  try {
    const response: object = await loginCall(loginData)
    console.log('API response:')
    console.table(response)
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

// Rules for form validity
const valid = ref(false)
const rules = {
  required: (value: string): FormRule => !!value || 'Required.',
  countUsername: (value: string): FormRule =>
    (value.length >= 3 && value.length <= 16) || '3-16 characters',
  countPassword: (value: string): FormRule => value.length >= 8 || 'Min 8 characters.'
}

// Listen to events to open dialogs
const bus = inject<EventBus>('$bus')
if (!bus) {
  throw new Error('bus is not provided!')
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
          <v-btn icon variant="plain" size="small" @click="loginOverlay = false">
            <v-icon>fas fa-close</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-form @submit.prevent="handleSubmit" v-model="valid" fluid class="mx-5 mt-5">
        <v-text-field
          v-model.lazy="loginData.username"
          label="Username"
          type="text"
          prepend-inner-icon="fas fa-user"
          :rules="[rules.required, rules.countUsername]"
          autofocus
        ></v-text-field>
        <v-text-field
          v-model.lazy="loginData.password"
          label="Password"
          type="password"
          prepend-inner-icon="fas fa-key"
          :rules="[rules.required, rules.countPassword]"
        ></v-text-field>
        <v-checkbox
          color="secondary"
          v-model="loginData.isRememberMe"
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
        ><v-btn variant="plain" @click="(loginOverlay = false), openRegisterDialog()">
          No account? Register here
        </v-btn></v-card-actions
      >
    </v-card>
  </v-dialog>
</template>
<style module></style>
