import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
    // Configurations des alias
   '@': path.resolve(__dirname, 'src'),
      '~': path.resolve(__dirname, 'public'),
  },
  }
})
