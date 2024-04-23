export interface EventBus {
  $on(eventName: string, fn: (data?: object) => void): void
  $emit(eventName: string, data?: object): void
  $off(eventName: string, fn: (data?: object) => void): void
}

const events = new Map()

export default {
  $on(eventName, fn) {
    if (!events.has(eventName)) {
      events.set(eventName, [])
    }

    events.get(eventName).push(fn)
  },

  // TODO: Implement $off event
  /*   $off(eventName, fn) {
    throw { message: 'Not implemented' }
  }, */

  $emit(eventName, data): void {
    if (events.has(eventName)) {
      events.get(eventName).forEach((fn: (data?: object) => void) => fn(data))
    }
  }
} as EventBus
