<script>
import api from "@services/api";

export default {
  data() {
    return {
      loading: false,
      blogLink: import.meta.env.VITE_BLOG_LINK
    };
  },
  created() {
  },
  methods: {
    async validateUser() {
      this.loading = true;

      try {
        const apiURL = "/keycloak/validate-token";
        const res = await api.post(apiURL);
        console.log(res.data);

        this.loading = false;
        return;

      } catch (error) {
        this.loading = false;
        console.error(error);
        return;
      }
    }
  }
}
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="@/assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>

  <p class="read-the-docs">
    This project is for a tutorial on how to use Keycloak authentication with Vue 3 + Pinia + Node.
  </p>
  <p class="read-the-docs"> 
    Go to this 
    <a :href="blogLink" target="_blank">
      link
    </a>
    for the full tutorial.
  </p>

  <div class="card">
    <!-- Test Pinia persisted state button -->
    <button 
      class="mr-15"
      type="button" 
      title="Test persisted state"
      @click="$store.testAction"
    >
      Test ({{ $store.test }})
    </button>

    <!-- Refresh token button -->
    <button 
      class="mr-15"
      type="button" 
      title="Refreshes user token"
      @click="$store.refreshUserToken"
    >
      Refresh Token
    </button>
    
    <!-- BE validation button -->
    <button 
      class="mr-15"
      type="button"
      title="Check Console with Dev Tools"
      :disabled="loading"
      @click="validateUser"
    >
      Backend Validation
    </button>

    <!-- Logout button -->
    <button 
      type="button" 
      title="Logout Keycloak user"
      @click="$store.logout"
    >
      Logout
    </button>
  </div>

  <div class="card py-10">
    <h2>Keycloak User</h2>
    <p class="my-5">Username: {{ $store.user.username }}</p>
    <p class="my-5">Token:</p>
    <p class="wrap-text font-small my-5">{{ $store.user.token }}</p>
    <p class="my-5">Refresh Token:</p>
    <p class="wrap-text font-small my-5">{{ $store.user.refToken }}</p>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.read-the-docs {
  color: #888;
}

.my-5 {
  margin-top: 5px;
  margin-bottom: 5px;
}

.mr-15 {
  margin-right: 15px;
}

.py-10 {
  padding-top: 10px;
  padding-bottom: 10px;
}

.wrap-text {
  word-wrap: break-word;
}

.font-small {
  font-size: 10px;
}
</style>
