import a from 'axios'
import { API_URL } from '@/config'

// Set config defaults when creating the instance
export const axios = a.create({
  baseURL: API_URL,
})

// Alter defaults after instance has been created
