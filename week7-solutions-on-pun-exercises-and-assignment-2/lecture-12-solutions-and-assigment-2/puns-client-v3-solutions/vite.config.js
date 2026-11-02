import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// The Pun API only accepts requests from http://localhost:5173, 5174 and 5175 (CORS),
// so stop other Vite apps if this one starts on another port
export default defineConfig({
  plugins: [react()],
})
