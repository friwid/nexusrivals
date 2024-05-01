import type { LocalStorage } from '@/types/types'

export const isStorageAvailable = (): boolean => {
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
  $setItem(key, value, isStorageAvailable) {
    typeof isStorageAvailable === 'undefined' ? (isStorageAvailable = true) : null

    if (isStorageAvailable) {
      try {
        localStorage.setItem(key, JSON.stringify(value))
        return true
      } catch (error) {
        console.error('Error while setting item:', error)
        return false
      }
    } else {
      return false
    }
  },

  $getItem(key, isStorageAvailable) {
    typeof isStorageAvailable === 'undefined' ? (isStorageAvailable = true) : null

    if (isStorageAvailable) {
      try {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : null
      } catch (error) {
        console.error('Error while parsing JSON:', error)
        return false
      }
    } else {
      return false
    }
  },
  $removeItem(key, isStorageAvailable) {
    typeof isStorageAvailable === 'undefined' ? (isStorageAvailable = true) : null

    if (isStorageAvailable) {
      localStorage.removeItem(key)
      return true
    } else {
      return false
    }
  },
  $clear(isStorageAvailable) {
    typeof isStorageAvailable === 'undefined' ? (isStorageAvailable = true) : null

    if (isStorageAvailable) {
      localStorage.clear()
      return true
    } else {
      return false
    }
  }
} as LocalStorage
