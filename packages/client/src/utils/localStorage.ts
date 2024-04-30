import type { LocalStorage } from '@/types/types'

const isLocalStorageAvailable = (): boolean => {
  const test = 'test'
  try {
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch (error) {
    return false
  }
}

export default {
  $setItem(key, value) {
    isLocalStorageAvailable()
      ? localStorage.setItem(key, JSON.stringify(value))
      : console.error(
          `Can't $setItem([key=${key}], [value=${value}]): isLocalStorageAvailable returned false.`
        )
  },

  $getItem(key) {
    if (isLocalStorageAvailable()) {
      try {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : null
      } catch (error) {
        console.error('Error while parsing JSON:', error)
        return null
      }
    } else {
      return console.error(`Can't $getItem([key=${key}]): isLocalStorageAvailable returned false.`)
    }
  }
} as LocalStorage
