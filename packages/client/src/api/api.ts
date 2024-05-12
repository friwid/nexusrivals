import axios from 'axios'
import type { RegisterData, LoginData } from '@/types/types'

const API_URL: string = import.meta.env.VITE_API_URL

const authFetch = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

const apiPostCall = async (path: string, args: object) => {
  console.log('Making API POST call to path ' + path + ' with arguments:')
  console.table(args)
  try {
    const response = await authFetch.post(path, args).then((response) => response.data)
    return response
  } catch (error) {
    console.error(error)
    return error
  }
}

export const loginCall = async (formData: LoginData) => {
  const username = formData.username
  const password = formData.password
  const isRememberMe = formData.isRememberMe

  return apiPostCall('/api/login', { username, password, isRememberMe })
}

export const registerCall = async (formData: RegisterData) => {
  const username = formData.username
  const email = formData.email
  const password = formData.password
  const isTerms = formData.isTerms

  return apiPostCall('/api/register', { username, email, password, isTerms })
}
