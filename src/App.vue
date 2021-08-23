<template>
  <nav-bar v-if="$route.name !== 'login'" />
  <aside-menu :menu="menu" v-if="$route.name !== 'login'" />
  <router-view />
</template>

<script>
/* eslint-disable */
// @ is an alias to /src
import { useStore } from "vuex";
import menu from "@/menu.js";
import NavBar from "@/components/NavBar";
import AsideMenu from "@/components/AsideMenu";

export default {
  name: "Home",
  components: {
    AsideMenu,
    NavBar
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
