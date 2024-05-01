export type EventBus = {
  $on(eventName: string, fn: (data?: object) => void): void
  $emit(eventName: string, data?: object): void
  $off(eventName: string, fn: (data?: object) => void): void
}

export type LocalStorage = {
  $setItem(key: string, value: string): void
  $getItem(key: string): string | void | null
  $removeItem(key: string): string | void | null
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
