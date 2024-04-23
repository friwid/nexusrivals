export interface EventBus {
  $on(eventName: string, fn: (data?: object) => void): void
  $emit(eventName: string, data?: object): void
  $off(eventName: string, fn: (data?: object) => void): void
}

export interface LocalStorage {
  $setItem(key: string, value: string): void
  $getItem(key: string): string | void | null
}
