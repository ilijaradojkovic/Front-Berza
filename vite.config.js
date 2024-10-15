import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   host: '0.0.0.0',
  //   port: 5173,
  //   proxy: {
  //     // Preusmeravanje zahteva sa '/api' na ciljni API
  //     "/api": {
  //       target: "http://157.230.107.88:8001/crypto-run",
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ""),
  //     },
  //   },
  // },
})
