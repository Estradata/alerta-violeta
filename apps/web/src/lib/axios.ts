import a, { AxiosError } from 'axios'
import { API_URL } from '@/config'
import { getStoredToken } from '@/auth'
import { toast } from 'sonner'

// Set config defaults when creating the instance
export const axios = a.create({
  baseURL: API_URL,
})

// Alter defaults after instance has been created
axios.interceptors.request.use(
  (config) => {
    // Get the token from wherever you're storing it (e.g., localStorage)
    const token = getStoredToken()

    // If token exists, set the Authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for handling errors
axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.data) {
      const data = error.response.data as {
        description?: string
      }

      if (data.description) {
        toast.error(data.description)
      }
    }

    return Promise.reject(error)
  }
)
