import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  test: {
    globals: true, // enables expect globally
    environment: 'jsdom',
    coverage: {
      provider: 'v8',  
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{js,jsx,ts,tsx}'], // ✅ Include all source files
      exclude: ['node_modules', 'src/main.jsx', 'src/**/*.test.{js,jsx,ts,tsx}'], // ✅ Exclude unnecessary files
    }
  },
})
