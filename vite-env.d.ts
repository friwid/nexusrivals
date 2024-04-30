/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_USER_NODE_ENV: string
  readonly VITE_ENV_FILENAME: string
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
