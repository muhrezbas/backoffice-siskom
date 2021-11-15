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
    prio: [],
    smsClient: [],
    credit: [],
    clients: [],
    client: {},
    saldo: 0,
    blast: 0,
    adminRoles: [],
    AdminUnsel: [],
    AdminWithRoles: [],
    otp: 0,
    searchMaterial: [],
    blastAll: 0,
    otpAll: 0,
    smsAll: 0,
    deliveredAll: 0,
    transaction: [],
    AdminPermissions: [],
    topUp: [],
    sms: [],
    senderid: [],
    search: "",
    errorAccess: false,
    // transaction: [],
    protocol: [],
    topup: [],
    packages: [],
    admin: [],
    users: [],
    operator: [],
    country: [],
    whitelistContent: [],
    whitelistPhoneNumber: [],
    prize: [],
    prefix: [],
    keyword: []
  },
  mutations: {
    /* Auth commit */
    search(state, payload) {
      state.search = payload;
    },
    searchMaterial(state, payload) {
      state.searchMaterial = payload;
    },
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
      // console.log(client, "res");
      state.client = client;
    },
    clients(state, client) {
      console.log(client, "res");
      state.clients = client;
    },
    smsClient(state, client) {
      console.log(client, "res smsClient");
      state.smsClient = client;
    },
    saldo(state, saldo) {
      console.log(saldo, "res");

      state.saldo = saldo.jumlah;
    },
    transaction(state, saldo) {
      state.transaction = saldo.history.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    },
    topup(state, saldo) {
      state.topUp = saldo.history
        .sort(function (a, b) {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
        .filter(el => el.action == "topup");
    },
    otp(state, otp) {
      state.otp = otp.filter(el => el.prize.akun == "premium").length;
      // state.topUp = saldo.history.filter(el => el.action == "topup");
    },
    blast(state, blast) {
      state.blast = blast.filter(el => el.prize.akun == "reguler").length;
    },
    /* A fit-them-all commit */
    basic(state, payload) {
      console.log(payload.value, state[payload.key], "nana");
      console.log(payload.key, "key");
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
      console.log(value, "value form screen");
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
            router.push("/admin/dashboard");
          }
        })
        .catch(error => {
          commit("auth_error");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          // alert(error.message);
        });
    },
    loginClient({ commit, state }, payload) {
      const loginUrl = process.env.VUE_APP_BASE_URL + "api/users/credential/";
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
            // console.log(decodedToken, "loginnn")
            commit("basic", {
              key: "token",
              value: r.data.access_token
            });
            router.push(`/dashboard/${decodedToken._id}`);
          }
        })
        .catch(error => {
          commit("auth_error");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          // alert(error.message);
        });
    },
    logout({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit("logout");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
        router.push("/");
      });
    },
    fetchClients({ commit }) {
      // console.log(id, "tes");
      const findClientAllUrl =
        process.env.VUE_APP_BASE_URL + `api/admins/client`;
      return axios
        .get(findClientAllUrl, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(r => {
          if (r.data) {
            commit("basic", {
              key: "errorAccess",
              value: false
            });
            console.log(r.data, "client tes da");
            commit(
              "clients",
              r.data.sort(function (a, b) {
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.createdAt) - new Date(a.createdAt);
              })
            );
          }
        })
        .catch(error => {
          console.log(error);
          if (error.message == "Request failed with status code 403") {
            commit("basic", {
              key: "errorAccess",
              value: true
            });
          }
          // alert(error.message);
        });
    },
    fetchSms({ commit }) {
      console.log("sms");
      const findSmsAllUrl =
        process.env.VUE_APP_BASE_URL + "api/operators/findAllSms/";
      return axios
        .get(findSmsAllUrl, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(r => {
          if (r.data) {
            commit("basic", {
              key: "errorAccess",
              value: false
            });
            console.log( r.data.sort(function (a, b) {
              // Turn your strings into dates, and then subtract them
              // to get a value that is either negative, positive, or zero.
              return new Date(b.createdAt) - new Date(a.createdAt);
            }), "faofnoajfioasfj")
            commit("basic", {
              key: "sms",
              value: r.data.sort(function (a, b) {
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.createdAt) - new Date(a.createdAt);
              })
            });
            commit("basic", {
              key: "blastAll",
              value: r.data.filter(
                el => el.prize.akun == "reguler" && el.statusSms.code == 0
              ).length
            });
            commit("basic", {
              key: "otpAll",
              value: r.data.filter(el => el.prize.akun == "premium").length
            });
            commit("basic", {
              key: "smsAll",
              value: r.data.length
            });
            commit("basic", {
              key: "deliveredAll",
              value: r.data.filter(el => el.statusSms.code == 0).length
            });
            // commit("blast", r.data)
            // commit("otp", r.data)
            console.log(r.data, "test");
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
          console.log(error);
          if (error.message == "Request failed with status code 403") {
            commit("basic", {
              key: "errorAccess",
              value: true
            });
          }
          // alert(error.message);
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
    // console.log(error
    // alert(error.message);
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
          console.log(error);
          // alert(error.message);
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
          console.log(error);
          // alert(error.message);
        });
    },
    fetchAdmin({ commit }) {
      const adminUrl = process.env.VUE_APP_BASE_URL + "api/admins/admin/";
      axios
        .get(adminUrl, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(r => {
          if (r.data) {
            commit("basic", {
              key: "errorAccess",
              value: false
            });
            commit("basic", {
              key: "admin",
              value: r.data.sort(function (a, b) {
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.createdAt) - new Date(a.createdAt);
              })
            });
          }
        })
        .catch(error => {
          console.log(error);
          // if (error.message == "Request failed with status code 403") {
          //   commit("basic", {
          //     key: "errorAccess",
          //     value: true
          //   });
          // }
          // alert(error.message);
        });
    },
    fetchAdminRoles({ commit }) {
      const adminUrl =
        process.env.VUE_APP_BASE_URL + "api/admins/getAdminRoles/";
      axios
        .get(adminUrl, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(r => {
          if (r.data) {
            commit("basic", {
              key: "errorAccess",
              value: false
            });
            commit("basic", {
              key: "adminRoles",
              value: r.data.sort(function (a, b) {
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.createdAt) - new Date(a.createdAt);
              })
            });
          }
        })
        .catch(error => {
          console.log(error);
          if (error.message == "Request failed with status code 403") {
            commit("basic", {
              key: "errorAccess",
              value: true
            });
          }
          // alert(error.message);
        });
    },
    fetchAdminPermissionWithRoles({ commit }, id) {
      const adminUrl =
        process.env.VUE_APP_BASE_URL +
        "api/admins/getAdminWithRoles/" +
        id +
        "/";
      return axios
        .get(adminUrl, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(r => {
          if (r.data) {
            commit("basic", {
              key: "errorAccess",
              value: false
            });
            commit("basic", {
              key: "AdminWithRoles",
              value: r.data
            });
          }
        })
        .catch(error => {
          console.log(error);
          if (error.message == "Request failed with status code 403") {
            commit("basic", {
              key: "errorAccess",
              value: true
            });
          }
          // alert(error.message);
        });
    },
    fetchAdminUnsel({ commit }) {
      const adminUrl =
        process.env.VUE_APP_BASE_URL + "api/admins/getAdminUnsel/";
      return axios
        .get(adminUrl, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(r => {
          if (r.data) {
            commit("basic", {
              key: "errorAccess",
              value: false
            });
            commit("basic", {
              key: "AdminUnsel",
              value: r.data
            });
          }
        })
        .catch(error => {
          console.log(error);
          if (error.message == "Request failed with status code 403") {
            commit("basic", {
              key: "errorAccess",
              value: true
            });
          }
          // alert(error.message);
        });
    },
    fetchAdminPermissions({ commit }) {
      const adminUrl =
        process.env.VUE_APP_BASE_URL + "api/admins/getAdminPermissions/";
      return axios
        .get(adminUrl, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(r => {
          if (r.data) {
            console.log(r.data, "test");
            commit("basic", {
              key: "errorAccess",
              value: false
            });
            commit("basic", {
              key: "AdminPermissions",
              value: r.data
            });
          }
        })
        .catch(error => {
          console.log(error);
          if (error.message == "Request failed with status code 403") {
            commit("basic", {
              key: "errorAccess",
              value: true
            });
          }
          // alert(error.message);
        });
    },
    // getAdminPermissions
    fetchOperators({ commit }) {
      const operatorUrl =
        process.env.VUE_APP_BASE_URL + "api/operators/findOperatorAll/";
      return axios
        .get(operatorUrl, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(r => {
          if (r.data) {
            commit("basic", {
              key: "errorAccess",
              value: false
            });
            commit("basic", {
              key: "operator",
              value: r.data.newOperator.sort(function (a, b) {
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.createdAt) - new Date(a.createdAt);
              })
            });
          }
        })
        .catch(error => {
          console.log(error.message, "operator errorr");
          if (error.message == "Request failed with status code 403") {
            commit("basic", {
              key: "errorAccess",
              value: true
            });
          }
          // if(erro)
          // alert(error.message);
        });
    },
    fetchCountrys({ commit }) {
      console.log("conutr");
      const countryUrl =
        process.env.VUE_APP_BASE_URL + "api/operators/findCountryAll/";
      axios
        .get(countryUrl, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(r => {
          if (r.data) {
            commit("basic", {
              key: "errorAccess",
              value: false
            });
            console.log(r.data.Country, "tesss");
            commit("basic", {
              key: "country",
              value: r.data.Country.sort(function (a, b) {
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.createdAt) - new Date(a.createdAt);
              })
            });
          }
        })
        .catch(error => {
          // console.log(error);
          // if (error.message == "Request failed with status code 403") {
          //   commit("basic", {
          //     key: "errorAccess",
          //     value: true
          //   });
          // }
          // alert(error.message);
        });
    },
    fetchSenderIDs({ commit }) {
      const countryUrl =
        process.env.VUE_APP_BASE_URL + "api/operators/senderid/";
      console.log("senderidss");
      axios
        .get(countryUrl, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(r => {
          if (r.data) {
            commit("basic", {
              key: "errorAccess",
              value: false
            });
            console.log(r.data, "senderid");
            commit("basic", {
              key: "senderid",
              value: r.data.sort(function (a, b) {
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.createdAt) - new Date(a.createdAt);
              })
            });
          }
        })
        .catch(error => {
          console.log(error);
          if (error.message == "Request failed with status code 403") {
            commit("basic", {
              key: "errorAccess",
              value: true
            });
          }
          // alert(error.message);
        });
    },
    fetchWhitelistContent({ commit }) {
      const countryUrl =
        process.env.VUE_APP_BASE_URL + "api/operators/whitelistContent/";
      console.log("senderidss");
      axios
        .get(countryUrl, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(r => {
          if (r.data) {
            commit("basic", {
              key: "errorAccess",
              value: false
            });
            console.log(r.data, "whitelist content");
            commit("basic", {
              key: "whitelistContent",
              value: r.data.sort(function (a, b) {
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.createdAt) - new Date(a.createdAt);
              })
            });
          }
        })
        .catch(error => {
          console.log(error);
          if (error.message == "Request failed with status code 403") {
            commit("basic", {
              key: "errorAccess",
              value: true
            });
          }
          // alert(error.message);
        });
    },
    fetchWhitelistPhoneNumber({ commit }) {
      const countryUrl =
        process.env.VUE_APP_BASE_URL + "api/operators/whitelistPhoneNumber/";
      console.log("senderidss");
      axios
        .get(countryUrl, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(r => {
          if (r.data) {
            commit("basic", {
              key: "errorAccess",
              value: false
            });
            console.log(r.data, "whitelistPhoneNumber");
            commit("basic", {
              key: "whitelistPhoneNumber",
              value: r.data.sort(function (a, b) {
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.createdAt) - new Date(a.createdAt);
              })
            });
          }
        })
        .catch(error => {
          console.log(error);
          if (error.message == "Request failed with status code 403") {
            commit("basic", {
              key: "errorAccess",
              value: true
            });
          }
          // alert(error.message);
        });
    },
    fetchPrize({ commit }) {
      const countryUrl = process.env.VUE_APP_BASE_URL + "api/operators/prize/";
      console.log("senderidss");
      axios
        .get(countryUrl, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(r => {
          if (r.data) {
            commit("basic", {
              key: "errorAccess",
              value: false
            });
            console.log(r.data, "prize");
            commit("basic", {
              key: "prize",
              value: r.data.sort(function (a, b) {
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.createdAt) - new Date(a.createdAt);
              })
            });
          }
        })
        .catch(error => {
          console.log(error);
          if (error.message == "Request failed with status code 403") {
            commit("basic", {
              key: "errorAccess",
              value: true
            });
          }
          // alert(error.message);
        });
    },
    fetchCredit({ commit }) {
      const countryUrl = process.env.VUE_APP_BASE_URL + "api/operators/credit/";
      console.log("senderidss");
      axios
        .get(countryUrl, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(r => {
          if (r.data) {
            commit("basic", {
              key: "errorAccess",
              value: false
            });
            console.log(r.data, "credit");
            commit("basic", {
              key: "credit",
              value: r.data.sort(function (a, b) {
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.createdAt) - new Date(a.createdAt);
              })
            });
          }
        })
        .catch(error => {
          console.log(error);
          if (error.message == "Request failed with status code 403") {
            commit("basic", {
              key: "errorAccess",
              value: true
            });
          }
          // alert(error.message);
        });
    },
    fetchPrefix({ commit }) {
      const countryUrl = process.env.VUE_APP_BASE_URL + "api/operators/prefix/";
      console.log("prefix");
      axios
        .get(countryUrl, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(r => {
          if (r.data) {
            commit("basic", {
              key: "errorAccess",
              value: false
            });
            console.log(r.data, "prefix");
            commit("basic", {
              key: "prefix",
              value: r.data.sort(function (a, b) {
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.createdAt) - new Date(a.createdAt);
              })
            });
          }
        })
        .catch(error => {
          console.log(error);
          if (error.message == "Request failed with status code 403") {
            commit("basic", {
              key: "errorAccess",
              value: true
            });
          }
          // alert(error.message);
        });
    },
    fetchKeyword({ commit }) {
      console.log("keywordd");
      const countryUrl =
        process.env.VUE_APP_BASE_URL + "api/operators/keyword/";
      console.log("senderidss");
      axios
        .get(countryUrl, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(r => {
          if (r.data) {
            commit("basic", {
              key: "errorAccess",
              value: false
            });
            console.log(r.data, "keyword");
            commit("basic", {
              key: "keyword",
              value: r.data.sort(function (a, b) {
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.createdAt) - new Date(a.createdAt);
              })
            });
          }
        })
        .catch(error => {
          console.log(error);
          if (error.message == "Request failed with status code 403") {
            commit("basic", {
              key: "errorAccess",
              value: true
            });
          }
          // alert(error.message);
        });
    },
    fetchProtocol({ commit }) {
      const countryUrl = process.env.VUE_APP_BASE_URL + "api/users/protocol/";
      console.log("senderidss");
      axios
        .get(countryUrl, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(r => {
          if (r.data) {
            commit("basic", {
              key: "errorAccess",
              value: false
            });
            console.log(r.data, "keyword");
            commit("basic", {
              key: "protocol",
              value: r.data.sort(function (a, b) {
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.createdAt) - new Date(a.createdAt);
              })
            });
          }
        })
        .catch(error => {
          console.log(error);
          if (error.message == "Request failed with status code 403") {
            commit("basic", {
              key: "errorAccess",
              value: true
            });
          }
          // alert(error.message);
        });
    },
    fetchUsers({ commit }) {
      axios
        .get("data-sources/users.json")
        .then(r => {
          if (r.data) {
            if (r.data.data) {
              commit("basic", {
                key: "users",
                value: r.data.data
              });
            }
          }
        })
        .catch(error => {
          console.log(error);
          // alert(error.message);
        });
    },
    fetchClient({ commit }, id) {
      // console.log(id, "tes");
      const findClientAllUrl =
        process.env.VUE_APP_BASE_URL + `api/admins/client/${id.id}`;
      return axios
        .get(findClientAllUrl, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(r => {
          if (r.data) {
            commit("basic", {
              key: "errorAccess",
              value: false
            });
            console.log(r.data, "client tes");
            commit("client", r.data);
          }
        })
        .catch(error => {
          console.log(error);
          if (error.message == "Request failed with status code 403") {
            commit("basic", {
              key: "errorAccess",
              value: true
            });
          }
          // alert(error.message);
        });
    },
    fetchPrio({ commit }, id) {
      // console.log(id, "tes");
      const findClientAllUrl =
        process.env.VUE_APP_BASE_URL + `api/admins/findPrio/${id.id}`;
      return axios
        .get(findClientAllUrl, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(r => {
          console.log(r, 'kacruuuuuuuuuuuuu')
          if (r.data) {
            commit("basic", {
              key: "prio",
              value: r.data
            });
            console.log(r.data, "client tes");
            commit("basic", {
              key: "prio",
              value: r.data
            });
          }
        })
        .catch(error => {
          console.log(error);
          if (error.message == "Request failed with status code 403") {
            commit("basic", {
              key: "errorAccess",
              value: true
            });
          }
          // alert(error.message);
        });
    },
    fetchSmsClient({ commit }, id) {
      // console.log(id, "tes");
      const findClientAllUrl =
        process.env.VUE_APP_BASE_URL +
        `api/operators/findAllSmsByClient/${id.id}`;
      return axios
        .get(findClientAllUrl, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(r => {
          if (r.data) {
            commit("basic", {
              key: "errorAccess",
              value: false
            });
            console.log(r.data, "sms client tes");
            commit(
              "smsClient",
              r.data.sort(function (a, b) {
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.createdAt) - new Date(a.createdAt);
              })
            );
            commit(
              "blast",
              r.data.sort(function (a, b) {
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.createdAt) - new Date(a.createdAt);
              })
            );
            commit(
              "otp",
              r.data.sort(function (a, b) {
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.createdAt) - new Date(a.createdAt);
              })
            );
          }
          return r.data
        })
        .catch(error => {
          console.log(error, "haloo");

          if (error.message == "Request failed with status code 403") {
            commit("basic", {
              key: "errorAccess",
              value: true
            });
          }
          // alert(error.message);
        });
    },
    fetchSaldo({ commit }, id) {
      console.log(id, "tes");
      const findClientAllUrl =
        process.env.VUE_APP_BASE_URL + `api/admins/checkSaldo/${id.id}`;
      return axios
        .get(findClientAllUrl, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(r => {
          if (r.data) {
            console.log(r.data, "client");

            commit("saldo", r.data);
            commit("topup", r.data);
            commit("transaction", r.data);
          }
        })
        .catch(error => {
          console.log(error.response, "erorr bro");
          alert(error);
        });
    }
  },

  modules: {}
});
