/* eslint-disable */
import { createApp } from "vue";
import axios from "axios";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./css/main.css";

/* Fetch sample data */

// store.dispatch("fetchSms");
// store.dispatch("fetchTransaction");
// store.dispatch("fetchTopup");
// store.dispatch("fetchPackages");

// store.dispatch("fetchUsers");
// store.dispatch("fetchCountrys");

axios.interceptors.response.use(undefined, function(error) {
  if (error) {
    console.log(error, "error ni")
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      store.dispatch("logout");
      console.log('intercept')
      return router.push("/");
    }
  }
});

/* Default title tag */
const defaultDocumentTitle = "TKDI SMS Dashboard";

/* Collapse mobile aside menu on route change & set document title from route meta */
router.beforeEach(to => {
  store.dispatch("asideMobileToggle", false);
  store.dispatch("asideLgToggle", false);

  store.dispatch("formScreenToggle", !!to.meta.formScreen);
});

router.afterEach(to => {
  if (to.meta && to.meta.title) {
    document.title = `${to.meta.title} — ${defaultDocumentTitle}`;
  } else {
    document.title = defaultDocumentTitle;
  }
});
createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
