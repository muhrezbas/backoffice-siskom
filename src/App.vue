<template>
  <nav-bar/>
  <aside-menu :menu="menu"/>
  <router-view/>
</template>

<script>
// @ is an alias to /src
import { useStore } from 'vuex'
import menu from '@/menu.js'
import NavBar from '@/components/NavBar'
import AsideMenu from '@/components/AsideMenu'

export default {
  name: 'Home',
  components: {
    AsideMenu,
    NavBar
  },
  setup () {
    const store = useStore()

    store.commit('user', {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://avatars.dicebear.com/v2/gridy/John-Doe.svg'
    })

    return {
      menu
    }
  }
}
</script>
