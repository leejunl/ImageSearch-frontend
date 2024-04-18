import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "./",
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      }
    }
  },
  server: {
    open: true,
    port: 801,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000/',
        // target: 'http://192.168.62.136:8000/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/chy'),
      }
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))

    }
  }
})
