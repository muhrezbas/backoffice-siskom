/* eslint-disable */
import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home";

const routes = [
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: "Dashboard"
    },
    path: "/",
    name: "home",
    component: Home
  },
  {
    meta: {
      title: "Tables"
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
      title: "SMS Detail"
    },
    path: "/smsdetail",
    name: "smsdetail",
    component: () =>
      import(/* webpackChunkName: "forms" */ "../views/SmsDetail")
  },
  {
    meta: {
      title: "SMS Input"
    },
    path: "/smsinput",
    name: "smsinput",
    component: () => import(/* webpackChunkName: "forms" */ "../views/SmsInput")
  },
  {
    meta: {
      title: "Forms"
    },
    path: "/forms",
    name: "forms",
    component: () => import(/* webpackChunkName: "forms" */ "../views/Forms")
  },
  {
    meta: {
      title: "Profile"
    },
    path: "/profile",
    name: "profile",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Profile")
  },
  {
    meta: {
      title: "Invoice"
    },
    path: "/invoice",
    name: "invoice",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Invoice")
  },
  {
    meta: {
      title: "Ui"
    },
    path: "/ui",
    name: "ui",
    component: () => import(/* webpackChunkName: "profile" */ "../views/Ui")
  },
  {
    meta: {
      title: "Login",
      formScreen: true
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

export default router;
