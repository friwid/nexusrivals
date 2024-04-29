/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENV_DEBUG: string
  readonly VITE_API_URL: string
  readonly VITE_USER_NODE_ENV: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
