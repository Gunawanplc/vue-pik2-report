import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/vue-pik2-report/',
  server: {
    host: true,
    port: 5174
  }
})

