const events = new Map()

// TODO: give "fn" a type.
export default {
  $on(eventName: string, fn) {
    if (!events.has(eventName)) {
      events.set(eventName, [])
    }

    events.get(eventName).push(fn)
  },

  /* TODO: Implement $off
  $off(eventName: string, fn) {
    throw { message: 'Not implemented' }
  },
*/

  $emit(eventName: string, data?: object) {
    if (events.has(eventName)) {
      events.get(eventName).forEach((fn) => fn(data))
    }
  }
}
