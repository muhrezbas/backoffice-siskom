/* eslint-disable */
import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./css/main.css";

/* Fetch sample data */

// store.dispatch("fetchSms");
// store.dispatch("fetchTransaction");
// store.dispatch("fetchTopup");
// store.dispatch("fetchPackages");
store.dispatch("fetchAdmin");
store.dispatch("fetchOperators");
store.dispatch("fetchCountrys");

/* Default title tag */
const defaultDocumentTitle = "Admin One Vue 3 Tailwind";

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
