<script setup lang="ts">
import { ref, shallowReactive, inject } from 'vue'
import { useDisplay } from 'vuetify'
import { registerCall } from '@/api/api'
import type { EventBus, FormRule, RegisterData } from '@/types/types'

const { mobile } = useDisplay()

const registerData = shallowReactive<RegisterData>({
  username: '',
  email: '',
  password: '',
  isTerms: false
})

const isLoading = ref(false)

const handleSubmit = async () => {
  isLoading.value = true
  try {
    const response: object = await registerCall(registerData)
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
  charsUsername: (value: string): FormRule => {
    const usernamePattern = /^[a-zA-Z0-9]+$/
    return usernamePattern.test(value) || 'Only a-z, A-Z and 0-9 allowed.'
  },
  countPassword: (value: string): FormRule => value.length >= 8 || 'Min 8 characters.',
  charsPassword: (value: string): FormRule => {
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/
    return (
      passwordPattern.test(value) ||
      'Needs at least 1 of each: a-z, A-Z, 0-9 and one of these special characters: !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'
    )
  },
  email: (value: string): FormRule => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'Invalid email.'
  }
}

// Listen to registerLoginDialog event
const bus = inject<EventBus>('$bus')
if (!bus) {
  throw new Error('bus is not provided!')
}
let registerOverlay = ref(false)

bus.$on('openRegisterDialog', (): void => {
  registerOverlay.value = true
})

const openLoginDialog = (): void => {
  bus.$emit('openLoginDialog')
}
</script>

<template>
  <v-dialog
    v-model="registerOverlay"
    persistent
    no-click-animation
    class="align-center justify-center"
    :fullscreen="mobile"
  >
    <v-card width="450" class="mx-auto">
      <v-toolbar>
        <v-toolbar-title> Register </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn icon variant="plain" size="small" @click="registerOverlay = false">
            <v-icon>fas fa-close</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-form @submit.prevent="handleSubmit" v-model="valid" fluid class="mx-5 mt-5">
        <v-text-field
          v-model.lazy="registerData.username"
          label="Username"
          type="text"
          prepend-inner-icon="fas fa-user"
          :rules="[rules.required, rules.countUsername, rules.charsUsername]"
          autofocus
        ></v-text-field>
        <v-text-field
          v-model.lazy="registerData.email"
          label="Email"
          type="email"
          prepend-inner-icon="fas fa-envelope"
          :rules="[rules.required, rules.email]"
        ></v-text-field>
        <!-- TODO: Add hint="" persistent-hint for information how the password should be-->
        <v-text-field
          v-model.lazy="registerData.password"
          label="Password"
          type="password"
          prepend-inner-icon="fas fa-key"
          :rules="[rules.required, rules.countPassword, rules.charsPassword]"
        ></v-text-field>
        <v-checkbox
          color="secondary"
          v-model="registerData.isTerms"
          label="I have read and accept the terms and conditions."
          :rules="[rules.required]"
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
          Register
        </v-btn>
      </v-form>

      <v-card-actions class="justify-center"
        ><v-btn variant="plain" @click="(registerOverlay = false), openLoginDialog()">
          Already registered? Login here
        </v-btn></v-card-actions
      >
    </v-card>
  </v-dialog>
</template>
<style module></style>
