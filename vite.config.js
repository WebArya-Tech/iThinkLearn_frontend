import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://93.127.194.118:8017',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})