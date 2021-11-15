/* eslint-disable */
import { createApp } from "vue";
import axios from "axios";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import Swal from 'sweetalert2'

import "./css/main.css";

/* Fetch sample data */

// store.dispatch("fetchSms");
// store.dispatch("fetchTransaction");
// store.dispatch("fetchTopup");
// store.dispatch("fetchPackages");

// store.dispatch("fetchUsers");
// store.dispatch("fetchCountrys");

axios.interceptors.response.use(undefined, function (error) {
  if (error) {
    let swall = true
    console.log(error, "error ni")
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      store.dispatch("logout");
      console.log('intercept')
      return router.push("/");
    }
    else {
      let err
      if (error.response.status == 403) {
        if (error.response.config.method == "get") {
          swall = false
          store.commit("basic", {
            key: "errorAccess",
            value: true
          });
          console.log()

        }
        err = "Not Authorize"
      }
      else if (error.response.data == undefined) {
        err = error.response
      }
      else if (error.response.data.message == undefined) {
        err = JSON.stringify(error.response.data)
      }

      else {
        err = error.response.data.message
      }
      console.log(err, "cas")
      // commit("auth_error");
      // localStorage.removeItem("token");
      if (swall == true) {

        Swal.fire({
          title: "ERROR!",
          text: err,
          icon: "warning",
        });
      }
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
