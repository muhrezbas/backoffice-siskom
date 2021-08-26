/* eslint-disable */
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home";
import Dashboard from "../views/Dashboard";
import store from "../store/index";

const routes = [
  {
    meta: {
      title: "Home"
    },
    path: "/",
    name: "home",
    component: Home
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: "Dashboard",
      requiresAuth: true
    },
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard
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
      title: "SenderID",
      requiresAuth: true
    },
    path: "/senderID",
    name: "SenderID",
    component: () => import(/* webpackChunkName: "forms" */ "../views/SenderID")
  },
  {
    meta: {
      title: "Whitelist Content",
      requiresAuth: true
    },
    path: "/whitelistContent",
    name: "Whitelist Content",
    component: () =>
      import(/* webpackChunkName: "forms" */ "../views/WhitelistContent")
  },
  {
    meta: {
      title: "Whitelist Phone Number",
      requiresAuth: true
    },
    path: "/whitelistPhoneNumber",
    name: "Whitelist Phone Number",
    component: () =>
      import(/* webpackChunkName: "forms" */ "../views/WhitelistPhoneNumber")
  },
  {
    meta: {
      title: "Prize",
      requiresAuth: true
    },
    path: "/prize",
    name: "Prize",
    component: () => import(/* webpackChunkName: "forms" */ "../views/Prize")
  },
  {
    meta: {
      title: "Prefix",
      requiresAuth: true
    },
    path: "/prefix",
    name: "Prefix",
    component: () => import(/* webpackChunkName: "forms" */ "../views/Prefix")
  },
  {
    meta: {
      title: "Keyword For Reguler",
      requiresAuth: true
    },
    path: "/keywordReguler",
    name: "Keyword For Reguler",
    component: () => import(/* webpackChunkName: "forms" */ "../views/Keyword")
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
    path: "/invoice/:id",
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
      title: "Admin Setting",
      requiresAuth: true
    },
    path: "/admin",
    name: "admin",
    component: () => import(/* webpackChunkName: "profile" */ "../views/Admin")
  },
  {
    meta: {
      title: "Operator Setting",
      requiresAuth: true
    },
    path: "/operator",
    name: "operator",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Operator")
  },
  {
    meta: {
      title: "Country Setting",
      requiresAuth: true
    },
    path: "/country",
    name: "country",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Country")
  },
  {
    meta: {
      title: "Client",
      requiresAuth: true
    },
    path: "/client",
    name: "client",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Clients"),
    props: true
  },
  {
    meta: {
      title: "Client Detail",
      requiresAuth: true
    },
    path: "/client/:id",
    name: "client detail",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Detail"),
    props: true
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
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  }
});

router.beforeEach((to, from, next) => {
  if (to.name === "login" && !store.getters.isLoggedIn) {
    next();
  } else if (to.name === "home" && !store.getters.isLoggedIn) {
    next();
  } else if (to.name !== "home" && !store.getters.isLoggedIn) {
    next({ name: "login" });
  } else next();
});

export default router;
