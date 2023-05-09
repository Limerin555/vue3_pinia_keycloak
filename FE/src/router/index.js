import { createWebHistory, createRouter } from "vue-router";

// COMPONENTS
import Home from '@components/Home.vue';

// Keycloak returns a long ass path everytime, so we need to filter them out.
const filterPath = (to, from, next) => {
  if (to.fullPath !== to.path) {
    next({ path: to.path });
  }

  next();
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: filterPath
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

export default router