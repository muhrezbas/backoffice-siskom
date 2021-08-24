/* eslint-disable */
import { createStore } from "vuex";
import axios from "axios";
import router from "../router/index";

export default createStore({
  state: {
    /* Auth */
    status: "",
    token: localStorage.getItem("token") || "",

    /* User */
    userDetail: localStorage.getItem("user") || "",
    userName: null,
    userEmail: null,
    userAvatar: null,

    /* FormScreen - fullscreen form layout (e.g. login page) */
    isFormScreen: false,

    /* Aside */
    isAsideMobileExpanded: false,
    isAsideLgActive: false,

    /* Sample data (commonly used) */
    clients: [],
    client: {},
    saldo: 0,
    transaction: [],
    topUp: [],
    sms: [],
    // transaction: [],
    topup: [],
    packages: [],
    admin: [],
    users: []
  },
  mutations: {
    /* Auth commit */
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token) {
      state.status = "success";
      state.token = token;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
    },
    client(state, client) {
      console.log(client, "res")
      state.client = client;
    },
    saldo(state, saldo) {
      console.log(saldo, "res")
      state.transaction = saldo.history
      state.topUp = saldo.history.filter(el => el.action == 'topup')
      state.saldo = saldo.jumlah;
    },
    /* A fit-them-all commit */
    basic(state, payload) {
      state[payload.key] = payload.value;
    },

    /* User */
    user_success(state, user) {
      state.userDetail = user;
    },
    user(state, payload) {
      if (payload.name) {
        state.userName = payload.name;
      }
      if (payload.email) {
        state.userEmail = payload.email;
      }
      if (payload.avatar) {
        state.userAvatar = payload.avatar;
      }
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    clientOne: state => state.client
  },
  actions: {
    asideMobileToggle({ commit, state }, payload = null) {
      const isShow = payload !== null ? payload : !state.isAsideMobileExpanded;

      document
        .getElementById("app")
        .classList[isShow ? "add" : "remove"]("ml-60");

      document.documentElement.classList[isShow ? "add" : "remove"](
        "m-clipped"
      );

      commit("basic", {
        key: "isAsideMobileExpanded",
        value: isShow
      });
    },
    asideLgToggle({ commit, state }, payload = null) {
      commit("basic", {
        key: "isAsideLgActive",
        value: payload !== null ? payload : !state.isAsideLgActive
      });
    },
    formScreenToggle({ commit, state }, value) {
      commit("basic", { key: "isFormScreen", value });

      document.documentElement.classList[value ? "add" : "remove"](
        "form-screen"
      );
    },
    login({ commit, state }, payload) {
      const loginUrl = process.env.VUE_APP_BASE_URL + "api/admins/login/";
      commit("auth_request");
      axios
        .post(loginUrl, payload)
        .then(r => {
          if (r.data) {
            const token = r.data.access_token;
            localStorage.setItem("token", token);
            axios.defaults.headers.common[
              "Authorization"
            ] = localStorage.getItem("token");
            commit("auth_success", token);
            const base64Url = localStorage.getItem("token").split(".")[1];
            const decodedToken = JSON.parse(window.atob(base64Url));
            localStorage.setItem("user", JSON.stringify(decodedToken));
            commit("user_success", JSON.stringify(decodedToken));
            commit("basic", {
              key: "token",
              value: r.data.access_token
            });
            router.push("/dashboard");
          }
        })
        .catch(error => {
          commit("auth_error");
          localStorage.removeItem("token");
          alert(error.message);
        });
    },
    logout({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit("logout");
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
        router.push("/");
      });
    },
    fetchClients({ commit }) {
      axios
        .get("data-sources/clients.json")
        .then(r => {
          if (r.data) {
            if (r.data.data) {
              commit("basic", {
                key: "clients",
                value: r.data.data
              });
            }
          }
        })
        .catch(error => {
          alert(error.message);
        });
    },
    fetchSms({ commit }) {
      console.log('sms')
      const findSmsAllUrl = process.env.VUE_APP_BASE_URL + "api/operators/findAllSms/";
      axios
        .get(findSmsAllUrl, {
          headers: {
            "token": localStorage.getItem("token")
          }
        })
        .then(r => {

          if (r.data) {
            commit("basic", {
              key: "sms",
              value: r.data
            });
            console.log(r.data, "test")
            if (r.data.data) {
              // console.log(r, "test")
              commit("basic", {
                key: "sms",
                value: r.data.data
              });
            }
          }
        })
        .catch(error => {
          alert(error.message);
        });
    },
    // fetchTransaction({ commit }) {
    //   axios
    //     .get("data-sources/transaction.json")
    //     .then(r => {
    //       if (r.data) {
    //         if (r.data.data) {
    //           commit("basic", {
    //             key: "transaction",
    //             value: r.data.data
    //           });
    //         }
    //       }
    //     })
    //     .catch(error => {
    //       alert(error.message);
    //     });
    // },
    fetchTopup({ commit }) {
      axios
        .get("data-sources/topup.json")
        .then(r => {
          if (r.data) {
            if (r.data.data) {
              commit("basic", {
                key: "topup",
                value: r.data.data
              });
            }
          }
        })
        .catch(error => {
          alert(error.message);
        });
    },
    fetchPackages({ commit }) {
      axios
        .get("data-sources/packages.json")
        .then(r => {
          if (r.data) {
            if (r.data.data) {
              commit("basic", {
                key: "packages",
                value: r.data.data
              });
            }
          }
        })
        .catch(error => {
          alert(error.message);
        });
    },
    fetchAdmin({ commit }) {
      axios
        .get("data-sources/admin.json")
        .then(r => {
          if (r.data) {
            if (r.data.data) {
              commit("basic", {
                key: "admin",
                value: r.data.data
              });
            }
          }
        })
        .catch(error => {
          alert(error.message);
        });
    },
    fetchUsers({ commit }) {
      const findClientAllUrl = process.env.VUE_APP_BASE_URL + "api/admins/client/";
      axios
        .get(findClientAllUrl, {
          headers: {
            "token": localStorage.getItem("token")
          }
        })
        .then(r => {
          if (r.data) {
            commit("basic", {
              key: "users",
              value: r.data
            });
            if (r.data.data) {
              // console.log(r.data.data, "tess")
              commit("basic", {
                key: "users",
                value: r.data.data
              });
            }
          }
        })
        .catch(error => {
          alert(error.message);
        });
    },
    fetchClient({ commit }, id) {
      console.log(id, "tes")
      const findClientAllUrl = process.env.VUE_APP_BASE_URL + `api/admins/client/${id.id}`;
      return axios
        .get(findClientAllUrl, {
          headers: {
            "token": localStorage.getItem("token")
          }
        })
        .then(r => {
          if (r.data) {
            console.log(r.data, "client")
            commit("client", r.data);
          }
        })
        .catch(error => {
          alert(error.message);
        });
    },
    fetchSaldo({ commit }, id) {
      console.log(id, "tes")
      const findClientAllUrl = process.env.VUE_APP_BASE_URL + `api/admins/checkSaldo/${id.id}`;
      return axios
        .get(findClientAllUrl, {
          headers: {
            "token": localStorage.getItem("token")
          }
        })
        .then(r => {
          if (r.data) {
            console.log(r.data, "client")
            commit("saldo", r.data);
          }
        })
        .catch(error => {
          alert(error.message);
        });
    },

  },

  modules: {}
});
