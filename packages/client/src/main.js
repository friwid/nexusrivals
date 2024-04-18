import { createApp } from 'vue'
import App from '@/App.vue'

import './assets/main.css'
// vue-router does not have to be imported explicitely, as Vue does it on its own.
// Doing so still helps with IDE development.
import { RouterLink, RouterView } from 'vue-router'
import $bus from '@/utils/events'
import $localStorage from '@/utils/localStorage'
//floating-ui
import { createPinia } from 'pinia'
import router from '@/router/index'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as styles from 'vuetify/styles'
import colors from 'vuetify/util/colors'
import '@fortawesome/fontawesome-free/css/all.css'
import { aliases, fa } from 'vuetify/iconsets/fa'

const vuetify = createVuetify({
  defaults: {
    global: {
      ripple: false
    }
  },
  display: {
    mobileBreakpoint: 'md',
    thresholds: {
      xs: 0,
      sm: 340,
      md: 540,
      lg: 800,
      xl: 1280
    }
  },
  components,
  directives,
  styles,
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa
    }
  },
  theme: {
    defaultTheme: 'dark',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: colors.pink.darken4,
          secondary: colors.pink.lighten1
        }
      },
      dark: {
        dark: true,
        colors: {
          primary: colors.pink.darken4,
          secondary: colors.pink.lighten1
        }
      }
    }
  }
})

const pinia = createPinia()

const app = createApp(App)

const ENV = import.meta.env
const isDev =
  ENV.DEV &&
  !ENV.PROD &&
  ENV.MODE === 'development' &&
  ENV.VITE_USER_NODE_ENV === 'development' &&
  ENV.VITE_ENV_DEBUG === '.env.development'

isDev ? console.table(ENV) : console.error('--------NOT IN DEV MODE!--------')
app.use(router)
app.use(createPinia())
app.use(vuetify)

app.provide('$bus', $bus)
app.provide('$localStorage', $localStorage)

app.mount('#app')
