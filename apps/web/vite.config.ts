// vite.config.js
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
   resolve: {
      alias: {
         '@packages': path.resolve(__dirname, '../../packages'),
      },
   },
})
