const isLocalStorageAvailable = () => {
  const test = 'test'
  try {
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch (e) {
    return false
  }
}

export default {
  $setItem(key: string, value: string) {
    isLocalStorageAvailable()
      ? localStorage.setItem(key, JSON.stringify(value))
      : console.log(
          `Can't $setItem([key=${key}], [value=${value}]): isLocalStorageAvailable returned false.`
        )
  },

  $getItem(key: string) {
    if (isLocalStorageAvailable()) {
      try {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : null
      } catch (e) {
        console.error('Error while parsing JSON:', e)
        return null
      }
    } else {
      return console.log(`Can't $getItem([key=${key}]): isLocalStorageAvailable returned false.`)
    }
  }
}
