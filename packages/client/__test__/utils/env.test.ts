import { beforeAll, afterAll, beforeEach, afterEach, describe, test, expect, mock } from 'bun:test'
import { isDevEnv, isTestEnv, isProdEnv, printEnvConsoleInfo } from '../../src/utils/env.ts'

beforeAll(() => {
  console.log(
    '\n▕▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▏'
  )
  console.log('▕  🧪  Test "import.meta.env" Interpretation')
  console.log(
    '▕▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▏\n'
  )
  console.log(
    '▕▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▏'
  )
})

afterAll(() => {
  console.log(
    '▕▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▏\n'
  )
})

const originalConsoleInfo = console.info

const devENV: ImportMetaEnv = {
  BASE_URL: '/',
  MODE: 'development',
  DEV: true,
  PROD: false,
  SSR: false,
  VITE_ENV_FILENAME: '.env.development',
  VITE_API_URL: 'http://localhost:3000/api',
  VITE_USER_NODE_ENV: 'development'
}

const testENV: ImportMetaEnv = {
  BASE_URL: '/',
  MODE: 'development',
  DEV: true,
  PROD: false,
  SSR: false,
  VITE_ENV_FILENAME: '.env.test',
  VITE_API_URL: 'https://test.nexusrivals.developers.nexus/api',
  VITE_USER_NODE_ENV: 'test'
}

const prodENV: ImportMetaEnv = {
  BASE_URL: '/',
  MODE: 'production',
  DEV: false,
  PROD: true,
  SSR: false,
  VITE_ENV_FILENAME: '.env.production',
  VITE_API_URL: 'https://nexusrivals.developers.nexus/api',
  VITE_USER_NODE_ENV: 'production'
}

const invalidENV: ImportMetaEnv = {
  BASE_URL: '/',
  MODE: '',
  DEV: false,
  PROD: true,
  SSR: false,
  VITE_ENV_FILENAME: '',
  VITE_API_URL: '',
  VITE_USER_NODE_ENV: ''
}

describe('Development environment', () => {
  afterAll(() => {
    console.log('')
  })

  test('isDevEnv() returns true', () => {
    expect(isDevEnv(devENV)).toBe(true)
  })

  test('isTestEnv() returns false', () => {
    expect(isTestEnv(devENV)).toBe(false)
  })

  test('isProdEnv() returns false', () => {
    expect(isProdEnv(devENV)).toBe(false)
  })
})

describe('Test environment', () => {
  afterAll(() => {
    console.log('')
  })

  test('isDevEnv() returns false', () => {
    expect(isDevEnv(testENV)).toBe(false)
  })

  test('isTestEnv() returns true', () => {
    expect(isTestEnv(testENV)).toBe(true)
  })

  test('isProdEnv() returns false', () => {
    expect(isProdEnv(testENV)).toBe(false)
  })
})

describe('Production environment', () => {
  afterAll(() => {
    console.log('')
  })

  test('isDevEnv() returns false', () => {
    expect(isDevEnv(prodENV)).toBe(false)
  })

  test('isTestEnv() returns false', () => {
    expect(isTestEnv(prodENV)).toBe(false)
  })

  test('isProdEnv() returns true', () => {
    expect(isProdEnv(prodENV)).toBe(true)
  })
})

describe('Unrecognized environment', () => {
  afterAll(() => {
    console.log('')
  })

  test('isDevEnv() returns false', () => {
    expect(isDevEnv(invalidENV)).toBe(false)
  })

  test('isTestEnv() returns false', () => {
    expect(isTestEnv(invalidENV)).toBe(false)
  })

  test('isProdEnv() returns false', () => {
    expect(isProdEnv(invalidENV)).toBe(false)
  })
})

describe('Print environment to console', () => {
  beforeEach(() => {
    console.info = mock()
  })

  afterEach(() => {
    console.info = originalConsoleInfo
  })

  test('isDevEnv() is true', () => {
    printEnvConsoleInfo(devENV)
    //console.info('%c%s', 'background-color: yellow;', 'test')
    expect(console.info).toHaveBeenCalledTimes(1)
    expect(console.info).toHaveBeenCalledWith(
      '%c%s',
      expect.anything(),
      '🛠️ App is running in Development environment 🛠️'
    )
  })

  test('isTestEnv() is true', () => {
    printEnvConsoleInfo(testENV)
    //console.info('%c%s', 'background-color: yellow;', 'test')
    expect(console.info).toHaveBeenCalledTimes(1)
    expect(console.info).toHaveBeenCalledWith(
      '%c%s',
      expect.anything(),
      '🧪 App is running in Test environment 🧪'
    )
  })

  test('isProdEnv() is true', () => {
    printEnvConsoleInfo(prodENV)
    //console.info('%c%s', 'background-color: yellow;', 'test')
    expect(console.info).toHaveBeenCalledTimes(1)
    expect(console.info).toHaveBeenCalledWith(
      '%c%s',
      expect.anything(),
      '🚀 App is running in Production environment 🚀'
    )
  })

  test('No recognized environment returns true', () => {
    printEnvConsoleInfo(invalidENV)
    //console.info('%c%s', 'background-color: yellow;', 'test')
    expect(console.info).toHaveBeenCalledTimes(1)
    expect(console.info).toHaveBeenCalledWith(
      '%c%s',
      expect.anything(),
      '⚠️ App is running in an UNRECOGNIZED environment ⚠️'
    )
  })
})

/* 
[ "%c%s", "background-color: yellow; color: black; font-weight: bold; border: 1px solid black; font-size: 1.2em; padding:5px",
  "🛠️ App is running in Development environment 🛠️"
]
*/
