import { createRouter, createWebHistory } from "vue-router";

import Home from "@/pages/Home.vue";
import Settings from "@/pages/Settings.vue";
import Login from "@/pages/Login.vue";

const routes = [
  {
    path: "/",
    // redirect: "/settings",
    component: Home
  },
  {
    path: "/settings",
    component: Settings
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/:catchAll(.*)", // vue3区别于vue2的写法，vue2中直接/*
    redirect: "/"
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
