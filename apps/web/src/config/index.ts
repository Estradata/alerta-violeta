export const siteConfig = {
  name: 'Alerta Violeta',
  description: '',
}

export const storagePrefix = `alerta_violeta`

export const API_URL = import.meta.env.VITE_API_URL as string
export const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string

console.log('ENV:')
console.log({
  API_URL,
  GOOGLE_MAPS_API_KEY
})
