import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { port: 5176 },
  preview: { port: 4173 },
  build: {
    sourcemap: false,
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          scroll: ['gsap', 'lenis'],
          forms: ['react-hook-form', 'axios']
        }
      }
    }
  }
});
