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
    meta: {
      title: "Login"
    },
    path: "/admin/login",
    name: "login_admin",
    component: () => import(/* webpackChunkName: "login" */ "../views/Login")
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: "Dashboard",
      requiresAuth: true
    },
    path: "/dashboard/:id",
    name: "dashboard_client",
    component: () => import(/* webpackChunkName: "login" */ "../views/DetailClient")
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: "Dashboard",
      requiresAuth: true
    },
    path: "/admin/dashboard",
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
    path: "/admin/smsdetail",
    name: "smsdetail",
    component: () =>
      import(/* webpackChunkName: "forms" */ "../views/SmsDetail")
  },
  {
    meta: {
      title: "SMS Input",
      requiresAuth: true
    },
    path: "/admin/smsinput",
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
    path: "/admin/senderID",
    name: "SenderID",
    component: () => import(/* webpackChunkName: "forms" */ "../views/SenderID")
  },
  {
    meta: {
      title: "Whitelist Content",
      requiresAuth: true
    },
    path: "/admin/whitelistContent",
    name: "Whitelist Content",
    component: () =>
      import(/* webpackChunkName: "forms" */ "../views/WhitelistContent")
  },
  {
    meta: {
      title: "Whitelist Phone Number",
      requiresAuth: true
    },
    path: "/admin/whitelistPhoneNumber",
    name: "Whitelist Phone Number",
    component: () =>
      import(/* webpackChunkName: "forms" */ "../views/WhitelistPhoneNumber")
  },
  {
    meta: {
      title: "Prize",
      requiresAuth: true
    },
    path: "/admin/prize",
    name: "Prize",
    component: () => import(/* webpackChunkName: "forms" */ "../views/Prize")
  },
  {
    meta: {
      title: "Prefix",
      requiresAuth: true
    },
    path: "/admin/prefix",
    name: "Prefix",
    component: () => import(/* webpackChunkName: "forms" */ "../views/Prefix")
  },
  {
    meta: {
      title: "Keyword For Reguler",
      requiresAuth: true
    },
    path: "/admin/keywordReguler",
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
    name: "invoice_client",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/InvoiceClient")
  },
  {
    meta: {
      title: "Invoice",
      requiresAuth: true
    },
    path: "/admin/invoice/:id",
    name: "invoice",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Invoice")
  },
  {
    meta: {
      title: "Setting",
      requiresAuth: true
    },
    path: "/admin/setting",
    name: "setting",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Setting")
  },
  {
    meta: {
      title: "Admin Setting",
      requiresAuth: true
    },
    path: "/admin/admin",
    name: "admin",
    component: () => import(/* webpackChunkName: "profile" */ "../views/Admin")
  },
  {
    meta: {
      title: "Admin Roles Setting",
      requiresAuth: true
    },
    path: "/admin/adminRoles",
    name: "adminRoles",
    component: () => import(/* webpackChunkName: "profile" */ "../views/AdminRoles")
  },
  {
    meta: {
      title: "Operator Setting",
      requiresAuth: true
    },
    path: "/admin/operator",
    name: "operator",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Operator")
  },
  {
    meta: {
      title: "Country Setting",
      requiresAuth: true
    },
    path: "/admin/country",
    name: "country",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Country")
  },
  {
    meta: {
      title: "Client",
      requiresAuth: true
    },
    path: "/admin/client",
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
    path: "/admin/client/:id",
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
    path: "/admin/detail",
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
    component: () => import(/* webpackChunkName: "login" */ "../views/LoginClient")
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
  } else if (to.name === "login_admin" && !store.getters.isLoggedIn) {
    next();
  } else if (to.name !== "home" && !store.getters.isLoggedIn) {
    next({ name: "home" });
  } else next();
});

export default router;
