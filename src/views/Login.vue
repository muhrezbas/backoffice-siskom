<template>
  <main-section class="login">
    <img class="pl-40 max-h-14" src="../assets/logo160.png" />
    <div class="grid grid-cols-1 gap-6 mt-20 xl:grid-cols-2 ">
      <div class="px-40" form>
        <div class="mb-20 mt-6 text-center">
          <h1 class="text-4xl font-normal leading-tight">
            Get started from here
          </h1>
          <p class="font-extralight">Choose your role form below</p>
        </div>
        <field label="COMPANY EMAIL ADDRESS">
          <control
            v-model="form.username"
            :icon="mdiAccount"
            name="login"
            autocomplete="username"
          />
        </field>

        <field label="PASSWORD">
          <control
            v-model="form.password"
            :icon="mdiAsterisk"
            type="password"
            name="password"
            autocomplete="current-password"
          />
        </field>

        <divider />

        <jb-buttons>
          <jb-button
            @click="submit"
            class="w-full"
            type="submit"
            color="info"
            label="Sign In"
          />
        </jb-buttons>
      </div>

      <img class="invisible xl:visible" src="../assets/login.png" />
    </div>
  </main-section>
</template>

<script>
/* eslint-disable */
import store from "../store/index";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { mdiAccount, mdiAsterisk } from "@mdi/js";
import MainSection from "@/components/MainSection";
import CardComponent from "@/components/CardComponent";
import Field from "@/components/Field";
import Control from "@/components/Control";
import Divider from "@/components/Divider.vue";
import JbButton from "@/components/JbButton";
import JbButtons from "@/components/JbButtons";

export default {
  name: "Login",
  components: {
    MainSection,
    CardComponent,
    Field,
    Control,
    Divider,
    JbButton,
    JbButtons
  },
  setup() {
    const form = reactive({
      username: "superAdmin",
      password: "siskom2021"
    });

    const router = useRouter();

    const submit = () => {
      store.dispatch("login", form);
    };

    return {
      form,
      submit,
      mdiAccount,
      mdiAsterisk
    };
  }
};
</script>

<style>
@media screen and (min-width: 1280px) {
  .login {
    margin-left: -15rem !important;
  }
}
.login {
  margin-left: 0;
}
</style>
