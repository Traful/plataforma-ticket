import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/ticket/',
  server: {
    historyApiFallback: true,
  },
  build: {
    // Asegúrate de que el outDir coincida con la ubicación donde PHP servirá los archivos
    outDir: 'public/ticket',
    emptyOutDir: true,
  },
})