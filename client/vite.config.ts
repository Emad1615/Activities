import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import mkcert from 'vite-plugin-mkcert';

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: '../ReactivitiesAPI/wwwroot',
    emptyOutDir: true,
    chunkSizeWarningLimit: 1500,
    cssCodeSplit: true,
  },
  server: {
    port: 3000,
  },
  plugins: [react(), mkcert()],
});
