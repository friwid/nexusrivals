export interface EventBus {
  $on(eventName: string, fn: (data?: object) => void): void
  $emit(eventName: string, data?: object): void
  $off(eventName: string, fn: (data?: object) => void): void
}
