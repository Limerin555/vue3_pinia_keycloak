import { defineStore } from "pinia";
import keycloakService from '@services/keycloak';

export const useAuthStore = defineStore({
  id: "storeAuth",
  state: () => {
    return {
      authenticated: false,
      user: {},
      test: false
    }
  },
  persist: true,
  getters: {},
  actions: {
    testAction() {
      this.test = !this.test;
    },
    // Initialize Keycloak OAuth
    async initOauth(keycloak, clearData = true) {
      if(clearData) { await this.clearUserData(); }

      this.authenticated = keycloak.authenticated;
      this.user.username = keycloak.idTokenParsed.preferred_username;
      this.user.token = keycloak.token;
      this.user.refToken = keycloak.refreshToken;
    },
    // Logout user
    async logout() {
      try {
        await keycloakService.CallLogout(import.meta.env.VITE_APP_URL);
        await this.clearUserData();
      } catch (error) {
        console.error(error);
      }
    },
    // Refresh user's token
    async refreshUserToken() {
      try {
        const keycloak = await keycloakService.CallTokenRefresh();
        this.initOauth(keycloak, false);
      } catch (error) {
        console.error(error);
      }
    },
    // Clear user's store data
    clearUserData() {
      this.authenticated = false;
      this.user = {};
    }
  }
});