import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: '0.0.0.0', // Necessary for Docker container port mapping
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Proxy local dev requests to Express backend
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
