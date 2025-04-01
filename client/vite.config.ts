import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost', // or '0.0.0.0' to make it accessible externally
    port: 3002        // change the port to any desired value
  }
})
