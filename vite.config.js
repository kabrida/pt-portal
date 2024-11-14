import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: '/pt-portal/',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
