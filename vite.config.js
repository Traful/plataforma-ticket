import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  //base: '/ticket/', // Set the base path here
  plugins: [react()],
});