import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import App from './App.vue';
import router from './router';
import keycloakService from '@services/keycloak';
import AuthStorePlugin from './plugins/authStore';

// Styles
import './style.css';

// Create Pinia instance
const pinia = createPinia();

// Use persisted state with Pinia so our store data will persist even after page refresh
pinia.use(piniaPluginPersistedstate);

const renderApp = () => {
  const app = createApp(App);
  app.use(pinia);
  app.use(AuthStorePlugin, { pinia });
  app.use(router);
  app.mount('#app');
}

// renderApp();

// Call keycloak service to init on render
keycloakService.CallInit(renderApp);
