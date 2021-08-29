<template>
  <nav-bar
    v-if="
      $route.name !== 'login' &&
        $route.name !== 'home' &&
        $route.name !== 'login_admin' &&
        $route.name !== 'dashboard_client'
    "
  />
  <home-bar v-if="$route.name === 'home'" />
  <client-bar v-if="$route.name === 'dashboard_client'" />
  <aside-menu
    :menu="menu"
    v-if="
      $route.name !== 'login' &&
        $route.name !== 'home' &&
        $route.name !== 'login_admin' &&
        $route.name !== 'dashboard_client' &&
        $route.name !== 'invoice_client'
    "
  />
  <router-view />
</template>

<script>
/* eslint-disable */
// @ is an alias to /src
import { useStore } from "vuex";
import menu from "@/menu.js";
import NavBar from "@/components/NavBar";
import HomeBar from "@/components/HomeBar";
import ClientBar from "@/components/ClientBar";
import AsideMenu from "@/components/AsideMenu";

export default {
  name: "Home",
  components: {
    AsideMenu,
    NavBar,
    HomeBar,
    ClientBar
  },
  created() {
    // console.log(this.$route, "namee")
  },
  setup() {
    const store = useStore();

    store.commit("user", {
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://avatars.dicebear.com/v2/gridy/John-Doe.svg"
    });

    return {
      menu
    };
  }
};
</script>
