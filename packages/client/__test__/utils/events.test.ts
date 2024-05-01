import { beforeAll, afterAll, beforeEach, afterEach, test, expect, describe, mock } from 'bun:test'

import $bus from '../../src/utils/events.ts'

beforeAll(() => {
  console.log(
    '\n▕▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▏'
  )
  console.log('▕  🧪  Test Event Bus')
  console.log(
    '▕▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▏\n'
  )
  console.log(
    '▕▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▏'
  )
})

afterEach(() => {
  // Clear all events after each test
  $bus.$off = originalBusOff
  $bus.$on = originalBusOn
  $bus.$emit = originalBusEmit
})

afterAll(() => {
  console.log(
    '▕▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▏\n'
  )
})

const originalBusOff = $bus.$off
const originalBusOn = $bus.$on
const originalBusEmit = $bus.$emit

test('Register an event', () => {
  $bus.$on = mock()
  const eventName = 'testEvent'
  const fn = mock()
  $bus.$on(eventName, fn)
  expect($bus.$on).toHaveBeenCalledWith(eventName, fn)
})

test('Emit an event', () => {
  const eventName = 'testEvent'
  const fn = mock()
  $bus.$on(eventName, fn)
  $bus.$emit(eventName)
  expect(fn).toHaveBeenCalled()
})

test('Not emit an event if not registered', () => {
  const eventName = 'testEvent'
  const fn = mock()
  $bus.$emit(eventName)
  expect(fn).not.toHaveBeenCalled()
})

test.todo('$off', () => {})
