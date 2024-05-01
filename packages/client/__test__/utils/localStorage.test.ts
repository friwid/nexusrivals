import { beforeAll, afterAll, test, expect } from 'bun:test'
import localStorage from '../../src/utils/localStorage.ts'

beforeAll(() => {
  console.log('\n▕▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▏')
  console.log('▕ Test Local Storage                                            ▏')
  console.log('▕▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▏\n')
  console.log('▕▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▏')
})

localStorage.$setItem('testkey', 'testvalue')

test('$getItem for existing key', () => {
  expect(localStorage.$getItem('testkey')).toStrictEqual('testvalue')
})

test('$getItem for non-existing key', () => {
  expect(localStorage.$getItem('wrongkey')).toStrictEqual(null)
})

test('$removeItem for existing key', () => {
  localStorage.$setItem('removekey', 'removevalue')
  localStorage.$removeItem('removekey')
  expect(localStorage.$getItem('removekey')).toStrictEqual(null)
})

test.todo('clear(): Clear all LocalStorage')

afterAll(() => {
  console.log('▕▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▏')
})
