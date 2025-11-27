import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },

  // ⭐ Added so mobile can access website on same Wi-Fi
  server: {
    host: true,          // allows network access instead of only localhost
    port: 5173,          // you can change if frontend runs on a different port
  },
});
