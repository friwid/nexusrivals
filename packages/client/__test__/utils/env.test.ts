import { beforeAll, afterAll, describe, test, expect } from 'bun:test'
import { isDevEnv, isTestEnv, isProdEnv } from '../../src/utils/env.ts'

beforeAll(() => {
  console.log('\n▕▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▏')
  console.log('▕ Test import.meta.env interpretation                           ▏')
  console.log('▕▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▏\n')
  console.log('▕▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▏')
})

describe('Development environment', () => {
  const ENV: ImportMetaEnv = {
    BASE_URL: '/',
    MODE: 'development',
    DEV: true,
    PROD: false,
    SSR: false,
    VITE_ENV_FILENAME: '.env.development',
    VITE_API_URL: 'http://localhost:3000/api',
    VITE_USER_NODE_ENV: 'development'
  }

  test('isDevEnv() returns true', () => {
    expect(isDevEnv(ENV)).toBe(true)
  })

  test('isTestEnv() returns false', () => {
    expect(isTestEnv(ENV)).toBe(false)
  })

  test('isProdEnv() returns false', () => {
    expect(isProdEnv(ENV)).toBe(false)
  })

  afterAll(() => {
    console.log('')
  })
})

describe('Test environment', () => {
  const ENV: ImportMetaEnv = {
    BASE_URL: '/',
    MODE: 'development',
    DEV: true,
    PROD: false,
    SSR: false,
    VITE_ENV_FILENAME: '.env.test',
    VITE_API_URL: 'https://test.nexusrivals.developers.nexus/api',
    VITE_USER_NODE_ENV: 'test'
  }

  test('isDevEnv() returns false', () => {
    expect(isDevEnv(ENV)).toBe(false)
  })

  test('isTestEnv() returns true', () => {
    expect(isTestEnv(ENV)).toBe(true)
  })

  test('isProdEnv() returns false', () => {
    expect(isProdEnv(ENV)).toBe(false)
  })

  afterAll(() => {
    console.log('')
  })
})

describe('Production environment', () => {
  const ENV: ImportMetaEnv = {
    BASE_URL: '/',
    MODE: 'production',
    DEV: false,
    PROD: true,
    SSR: false,
    VITE_ENV_FILENAME: '.env.production',
    VITE_API_URL: 'https://nexusrivals.developers.nexus/api',
    VITE_USER_NODE_ENV: 'production'
  }

  test('isDevEnv() returns false', () => {
    expect(isDevEnv(ENV)).toBe(false)
  })

  test('isTestEnv() returns false', () => {
    expect(isTestEnv(ENV)).toBe(false)
  })

  test('isProdEnv() returns true', () => {
    expect(isProdEnv(ENV)).toBe(true)
  })

  afterAll(() => {
    console.log('')
  })
})

describe('Unrecognized environment', () => {
  const ENV: ImportMetaEnv = {
    BASE_URL: '/',
    MODE: '',
    DEV: false,
    PROD: true,
    SSR: false,
    VITE_ENV_FILENAME: '',
    VITE_API_URL: '',
    VITE_USER_NODE_ENV: ''
  }

  test('isDevEnv() returns false', () => {
    expect(isDevEnv(ENV)).toBe(false)
  })

  test('isTestEnv() returns false', () => {
    expect(isTestEnv(ENV)).toBe(false)
  })

  test('isProdEnv() returns false', () => {
    expect(isProdEnv(ENV)).toBe(false)
  })

  afterAll(() => {})
})

afterAll(() => {
  console.log('▕▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▏')
})
