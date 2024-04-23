import { createRouter, createWebHashHistory } from 'vue-router'

/**
 * Creates a new Vue Router instance.
 * @module router
 */
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      props: true,
      component: () => import('@/views/HomePage.vue')
    }
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
  ]
})

export default router
