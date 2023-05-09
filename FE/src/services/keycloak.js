import Keycloak from 'keycloak-js';
import { useAuthStore } from "@/stores/authStore.js";

const options = {
  url: import.meta.env.VITE_KEYCLOAK_URL,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
  realm: import.meta.env.VITE_KEYCLOAK_REALM
}

const keycloak = new Keycloak(options);
let pinia = null;
let store = null;

function setupStore(piniaInstance) {
  pinia = piniaInstance;
  store = useAuthStore(pinia);
}

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
async function login(piniaInstance, onAuthenticatedCallback) {
  try {
    await setupStore(piniaInstance);

    const authenticated = await keycloak.init({ onLoad: "login-required" });
    store.initOauth(keycloak);
    authenticated ? onAuthenticatedCallback() : alert("not authenticated");

  } catch (error) {
    console.error("Keycloak init failed");
    console.error(error);
  }
};


/**
 * Logout user
 */
function logout(url) {
  keycloak.logout({ redirectUri: url });
}

/**
 * Refreshes token
 */
async function refreshToken() {
  try {
    await keycloak.updateToken(480);
    return keycloak;
  } catch (error) {
    console.error('Failed to refresh token');
    console.error(error);
  }
}

const KeycloakService = {
  CallLogin: login,
  CallLogout: logout,
  CallTokenRefresh: refreshToken
};

export default KeycloakService;