import axios from 'axios'
import type { RegisterData, LoginData } from '@/types/types'

const API_URL: string = import.meta.env.VITE_API_URL

const authFetch = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    Accept: 'application/json'
  }
})

const apiCall = async (path: string, args: object) => {
  console.log('Making API call to path ' + path + ' with arguments:')
  console.table(args)
  try {
    const response = await authFetch.post(path, args).then((response) => response.data)
    return response
  } catch (error) {
    console.error(error)
    return error
  }
}

export const login = async (e: Event, formData: LoginData) => {
  const username = formData.username
  const password = formData.password
  const isRememberMe = formData.isRememberMe

  return apiCall('/login', { username, password, isRememberMe })
}

export const register = async (e: Event, formData: RegisterData) => {
  const username = formData.username
  const email = formData.email
  const password = formData.password
  const isTerms = formData.isTerms

  return apiCall('/register', { username, email, password, isTerms })
}
