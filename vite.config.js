///
import dotenv from 'dotenv';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  preview: {
    port: process.env.REACT_APP_PORT,
  },
// for dev
  server: {
    port: process.env.REACT_APP_PORT,

  },
  plugins: [react()],
  define: {
    'process.env': process.env
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    testMatch: ['./tests/**/*.test.tsx'],
    globals: true,
    css: true,
  }
})
