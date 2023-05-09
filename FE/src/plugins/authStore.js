import { useAuthStore } from "@/stores/authStore.js";

// Setup auth store as a plugin so it can be accessed globally in our FE
const authStorePlugin = {
  install(app, option) {
    app.config.globalProperties.$store = useAuthStore(option.pinia);
  }
}

export default authStorePlugin;