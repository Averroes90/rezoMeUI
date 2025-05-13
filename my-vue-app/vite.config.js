import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],

  /** Dev-server prefs */
  server: {
    // --- Hot-module reload (HMR) ----
    // These two lines are usually auto-detected, but adding them
    // eliminates edge-case mismatches on some OS / VPN setups.
    hmr: {
      host: 'localhost',
      port: 5173,
    },

    // --- Proxies for cross-origin calls ----
    // 1) FastAPI backend on port 8000
    // 2) OnlyOffice Document Server on port 82  (adjust if you mapped a different host port)
    proxy: {
      '/api': 'http://localhost:8000',
      '/web-apps': 'http://localhost:82',
    },
  },
});
