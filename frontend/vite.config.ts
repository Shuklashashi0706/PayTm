import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Expose on local network
    port: 3000,  // Optional: Specify the port (default is 5173)
  },
})
