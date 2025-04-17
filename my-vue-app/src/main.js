import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

// Vuetify
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          background: '#f9fafb', // Light neutral background
          surface: '#ffffff', // White for surfaces/cards
          primary: '#3b82f6', // Accent color
          secondary: '#6366f1', // Optional secondary accent
          error: '#ef4444', // Red for errors
          info: '#3b82f6', // Could match primary or a variant
          success: '#10b981', // Green
          warning: '#f59e0b', // Amber
          // etc...
        },
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  components,
  directives,
});
createApp(App).use(vuetify).mount('#app');
