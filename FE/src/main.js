import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import App from './App.vue';
import router from './router';
import { useAuthStore } from "@/stores/authStore.js";
import setupInterceptors from '@services/tokenInterceptors';
import keycloakService from '@services/keycloak';
import AuthStorePlugin from './plugins/authStore';

// Styles
import './style.css';

// Create Pinia instance
const pinia = createPinia();

// Use persisted state with Pinia so our store data will persist even after page refresh
pinia.use(piniaPluginPersistedstate);

const store = useAuthStore(pinia);

// Setup token interceptor so every FE API calls will have the access token for BE to verify
setupInterceptors(store);

const renderApp = () => {
  const app = createApp(App);
  app.use(AuthStorePlugin, { pinia });
  app.use(pinia);
  app.use(router);
  app.mount('#app');
}

// Call keycloak service to login on render
keycloakService.CallLogin(pinia, renderApp);
