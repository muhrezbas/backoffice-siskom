/* eslint-disable */
import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./css/main.css";

/* Fetch sample data */

// store.dispatch("fetchSms");
// store.dispatch("fetchTransaction");
store.dispatch("fetchTopup");
store.dispatch("fetchPackages");
store.dispatch("fetchAdmin");
store.dispatch("fetchUsers");

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
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
createApp(App)
  .use(VueSweetalert2)
  .use(store)
  .use(router)
  .mount("#app");
