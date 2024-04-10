import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";


/**
 * Creates a new Vue Router instance.
 * @module router
 */
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { 
      path: "/", 
      name: "home",
      component: HomeView, 
      props: true 
    },
/*     { 
      path: "/register",
      name: "register",
      component: RegisterView, 
      props: true 
    },
    { 
      path: "/login",
      name: "login",
      component: LoginView, 
      props: true 
    }, */
  ],
});

export default router;
