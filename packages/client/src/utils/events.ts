import type { EventBus } from '@/types/types'

const events = new Map()

export default {
  $on(eventName, fn) {
    if (!events.has(eventName)) {
      events.set(eventName, [])
    }

    events.get(eventName).push(fn)
  },

  // TODO: Implement $off event
  $off(eventName, fn) {
    throw new Error(
      '$off(eventName, fn) with parameters eventName "' +
        eventName +
        '" and fn "' +
        fn +
        '": Not implemented yet!'
    )
  },

  $emit(eventName, data): void {
    if (events.has(eventName)) {
      events.get(eventName).forEach((fn: (data?: object) => void) => fn(data))
    }
  }
} as EventBus
