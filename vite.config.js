import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/ticket/',  // Asegúrate de que base tiene la barra al final
  server: {
    historyApiFallback: true,  // Correcto para el entorno de desarrollo
  },
})