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

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (to.path === '/login' && token) {
    // 如果用户已登录且尝试访问登录页面，重定向到首页
    next('/');
  } else if (to.path !== '/login' && !token) {
    // 如果用户未登录且尝试访问其他页面，重定向到登录页面
    next('/login');
  } else {
    // 其他情况正常导航
    next();
  }
});

export default router
