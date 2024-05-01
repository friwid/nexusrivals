export type EventBus = {
  $on(eventName: string, fn: (data?: object) => void): void
  $emit(eventName: string, data?: object): void
  $off(eventName: string, fn: (data?: object) => void): void
}

export type LocalStorage = {
  $setItem(key: string, value: string, isStorageAvailable?: boolean): boolean
  $getItem(key: string, isStorageAvailable?: boolean): string | null | false
  $removeItem(key: string, isStorageAvailable?: boolean): boolean
  $clear(isStorageAvailable?: boolean): boolean
}
export type FormRule = true | string

export type LoginData = {
  username: string
  password: string
  isRememberMe: boolean
}

export type RegisterData = {
  username: string
  email: string
  password: string
  isTerms: boolean
}
