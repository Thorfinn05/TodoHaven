import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true, // This allows the server to be accessible from any IP
    open: true  // This opens the browser automatically
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});