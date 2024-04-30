const ENV = import.meta.env

export function isDevEnv(): boolean {
  return (
    ENV.DEV &&
    !ENV.PROD &&
    ENV.MODE === 'development' &&
    ENV.VITE_USER_NODE_ENV === 'development' &&
    ENV.VITE_ENV_DEBUG === '.env.development' &&
    ENV.VITE_API_URL === 'http://localhost:3000/api'
  )
}

export function isTestEnv(): boolean {
  return (
    ENV.DEV &&
    !ENV.PROD &&
    ENV.MODE === 'development' &&
    ENV.VITE_USER_NODE_ENV === 'test' &&
    ENV.VITE_ENV_DEBUG === '.env.test' &&
    ENV.VITE_API_URL === 'https://test.nexusrivals.developers.nexus/api'
  )
}

export function isProdEnv(): boolean {
  return (
    !ENV.DEV &&
    ENV.PROD &&
    ENV.MODE === 'production' &&
    ENV.VITE_USER_NODE_ENV === 'production' &&
    ENV.VITE_ENV_DEBUG === '.env.production' &&
    ENV.VITE_API_URL === 'https://nexusrivals.developers.nexus/api'
  )
}

export function logEnv(): void {
  const devStyle =
    'background-color: yellow; color: black; font-weight: bold; border: 1px solid black; font-size: 1.2em; padding:5px'
  const testStyle =
    'background-color: lightblue; color: black; font-weight: bold; border: 1px solid black; font-size: 1.2em; padding:5px'
  const prodStyle =
    'background-color: lightgreen; color: black; font-weight: bold; border: 1px solid black; font-size: 1.2em; padding:5px'
  const errorStyle =
    'background-color: pink; color: black; font-weight: bold; border: 1px solid black; font-size: 1.2em; padding:5px;'

  switch (true) {
    case isDevEnv():
      console.info('%cApp is running in Development environment 🛠️', devStyle)
      console.table(ENV)
      break
    case isTestEnv():
      console.info('%cApp is running in Test environment 🧪', testStyle)
      console.table(ENV)
      break
    case isProdEnv():
      console.info('%cApp is running in Production environment 🚀', prodStyle)
      break
    default:
      console.error('%cApp is running in an UNRECOGNIZED environment ⚠️', errorStyle)
      console.table(ENV)
  }
}
