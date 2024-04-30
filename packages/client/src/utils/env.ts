export const ENV: ImportMetaEnv = import.meta.env

export function isDevEnv(env: ImportMetaEnv): boolean {
  return (
    env.DEV &&
    !env.PROD &&
    !env.SSR &&
    env.MODE === 'development' &&
    env.VITE_USER_NODE_ENV === 'development' &&
    env.VITE_ENV_FILENAME === '.env.development' &&
    env.VITE_API_URL === 'http://localhost:3000/api'
  )
}

export function isTestEnv(env: ImportMetaEnv): boolean {
  return (
    env.DEV &&
    !env.PROD &&
    !env.SSR &&
    env.MODE === 'development' &&
    env.VITE_USER_NODE_ENV === 'test' &&
    env.VITE_ENV_FILENAME === '.env.test' &&
    env.VITE_API_URL === 'https://test.nexusrivals.developers.nexus/api'
  )
}

export function isProdEnv(env: ImportMetaEnv): boolean {
  return (
    !env.DEV &&
    env.PROD &&
    !env.SSR &&
    env.MODE === 'production' &&
    env.VITE_USER_NODE_ENV === 'production' &&
    env.VITE_ENV_FILENAME === '.env.production' &&
    env.VITE_API_URL === 'https://nexusrivals.developers.nexus/api'
  )
}

export function printEnvConsoleInfo(env: ImportMetaEnv): void {
  const devStyle =
    'background-color: yellow; color: black; font-weight: bold; border: 1px solid black; font-size: 1.2em; padding:5px'
  const testStyle =
    'background-color: lightblue; color: black; font-weight: bold; border: 1px solid black; font-size: 1.2em; padding:5px'
  const prodStyle =
    'background-color: lightgreen; color: black; font-weight: bold; border: 1px solid black; font-size: 1.2em; padding:5px'
  const errorStyle =
    'background-color: pink; color: black; font-weight: bold; border: 1px solid black; font-size: 1.2em; padding:5px;'

  let message: string
  let style: string
  switch (true) {
    case isDevEnv(env):
      message = '🛠️ App is running in Development environment 🛠️'
      style = devStyle
      break
    case isTestEnv(env):
      message = '🧪 App is running in Test environment 🧪'
      style = testStyle
      break
    case isProdEnv(env):
      message = '🚀 App is running in Production environment 🚀'
      style = prodStyle
      break
    default:
      message = '⚠️ App is running in an UNRECOGNIZED environment ⚠️'
      style = errorStyle
  }

  console.info('%c%s', style, message)
}
