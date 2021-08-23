/* eslint-disable */
import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home";
import store from "../store/index";

const routes = [
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: "Dashboard",
      requiresAuth: true
    },
    path: "/",
    name: "home",
    component: Home
  },
  {
    meta: {
      title: "Tables",
      requiresAuth: true
    },
    path: "/tables",
    name: "tables",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "tables" */ "../views/Tables")
  },
  {
    meta: {
      title: "SMS Detail",
      requiresAuth: true
    },
    path: "/smsdetail",
    name: "smsdetail",
    component: () =>
      import(/* webpackChunkName: "forms" */ "../views/SmsDetail")
  },
  {
    meta: {
      title: "SMS Input",
      requiresAuth: true
    },
    path: "/smsinput",
    name: "smsinput",
    component: () => import(/* webpackChunkName: "forms" */ "../views/SmsInput")
  },
  {
    meta: {
      title: "Forms",
      requiresAuth: true
    },
    path: "/forms",
    name: "forms",
    component: () => import(/* webpackChunkName: "forms" */ "../views/Forms")
  },
  {
    meta: {
      title: "Profile",
      requiresAuth: true
    },
    path: "/profile",
    name: "profile",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Profile")
  },
  {
    meta: {
      title: "Invoice",
      requiresAuth: true
    },
    path: "/invoice",
    name: "invoice",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Invoice")
  },
  {
    meta: {
      title: "Setting",
      requiresAuth: true
    },
    path: "/setting",
    name: "setting",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Setting")
  },
  {
    meta: {
      title: "Detail",
      requiresAuth: true
    },
    path: "/detail",
    name: "detail",
    component: () => import(/* webpackChunkName: "profile" */ "../views/Detail")
  },
  {
    meta: {
      title: "Ui",
      requiresAuth: true
    },
    path: "/ui",
    name: "ui",
    component: () => import(/* webpackChunkName: "profile" */ "../views/Ui")
  },
  {
    meta: {
      title: "Login"
    },
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "login" */ "../views/Login")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  }
});

router.beforeEach((to, from, next) => {
  if (to.name !== "login" && !store.getters.isLoggedIn) next({ name: "login" });
  else next();
});

export default router;
