import { beforeAll, afterAll, test, expect, afterEach, describe, mock } from 'bun:test'
import $localStorage, { isStorageAvailable } from '../../src/utils/localStorage'
import { GlobalRegistrator } from '@happy-dom/global-registrator'

beforeAll(() => {
  console.log(
    '\n▕▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▏'
  )
  console.log('▕  🧪  Test Local Storage')
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

const originalConsoleError = console.error

describe('Local storage is available', () => {
  afterEach(() => {
    localStorage.clear()
  })

  afterAll(() => {
    console.log('')
  })

  test('isStorageAvailable() returns true', () => {
    expect(isStorageAvailable()).toBe(true)
  })

  test('$setItem with valid value returns true', () => {
    expect($localStorage.$setItem('key', 'value', true)).toBe(true)
  })

  test('$setItem with invalid value returns error and false', () => {
    console.error = mock()
    const invalidValue: any = 9007199254740991n
    expect($localStorage.$setItem('key', invalidValue, true)).toBe(false)
    expect(console.error).toHaveBeenCalledTimes(1)
    console.error = originalConsoleError
  })

  test('$getItem for existing key returns value', () => {
    localStorage.setItem('existingKey', JSON.stringify('existingValue'))
    expect($localStorage.$getItem('existingKey', true)).toStrictEqual('existingValue')
  })

  test('$getItem for existing key with invalid value returns error and false', () => {
    console.error = mock()
    const invalidValue: any = "{'foo': 1}"
    localStorage.setItem('existingKey', invalidValue)
    expect($localStorage.$getItem('existingKey', true)).toStrictEqual(false)
    expect(console.error).toHaveBeenCalledTimes(1)
    console.error = originalConsoleError
  })

  test('$getItem for non-existing key returns null', () => {
    localStorage.setItem('nonExistingKey', JSON.stringify('nonExistingValue'))
    localStorage.removeItem('nonExistingKey')
    expect($localStorage.$getItem('nonExistingKey', true)).toStrictEqual(null)
    expect($localStorage.$getItem('nonExistingKey2', true)).toStrictEqual(null)
  })

  test('$removeItem for existing key returns true', () => {
    localStorage.setItem('existingKey', JSON.stringify('existingValue'))
    expect($localStorage.$removeItem('existingKey', true)).toBe(true)
  })

  test('$removeItem for non-existing key returns true', () => {
    expect($localStorage.$removeItem('nonExistingKey', true)).toBe(true)
  })

  test('$clear returns true', () => {
    expect($localStorage.$clear(true)).toBe(true)
  })
})

describe('Local storage is undefined', () => {
  afterEach(() => {
    localStorage.clear()
  })

  afterAll(() => {
    console.log('')
  })

  test('$setItem returns true', () => {
    expect($localStorage.$setItem('key', 'value', true)).toBe(true)
  })

  test('$getItem for existing key returns value', () => {
    localStorage.setItem('existingKey', JSON.stringify('existingValue'))
    expect($localStorage.$getItem('existingKey', true)).toStrictEqual('existingValue')
  })

  test('$getItem for non-existing key returns null', () => {
    localStorage.setItem('nonExistingKey', JSON.stringify('nonExistingValue'))
    localStorage.removeItem('nonExistingKey')
    expect($localStorage.$getItem('nonExistingKey', true)).toStrictEqual(null)
    expect($localStorage.$getItem('nonExistingKey2', true)).toStrictEqual(null)
  })

  test('$removeItem for existing key returns true', () => {
    localStorage.setItem('existingKey', JSON.stringify('existingValue'))
    expect($localStorage.$removeItem('existingKey', true)).toBe(true)
  })

  test('$removeItem for non-existing key returns true', () => {
    expect($localStorage.$removeItem('nonExistingKey', true)).toBe(true)
  })

  test('$clear returns true', () => {
    expect($localStorage.$clear(true)).toBe(true)
  })
})

describe('Local storage is unavailable', () => {
  afterEach(() => {
    localStorage.clear()
  })

  test('isStorageAvailable() returns false', () => {
    GlobalRegistrator.unregister()
    expect(isStorageAvailable()).toBe(false)
    GlobalRegistrator.register()
  })

  test('$setItem returns false', () => {
    expect($localStorage.$setItem('key', 'value', false)).toBe(false)
  })

  test('$getItem returns false', () => {
    expect($localStorage.$getItem('key', false)).toBe(false)
  })

  test('$removeItem returns false', () => {
    expect($localStorage.$removeItem('key', false)).toBe(false)
  })

  test('$clear returns false', () => {
    expect($localStorage.$clear(false)).toBe(false)
  })
})
