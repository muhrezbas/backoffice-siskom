<template>
  <main-section class="login">
    <img class="pl-40 max-h-14" src="../assets/logo160.png" />
    <div class="grid grid-cols-1 gap-6 mt-20 xl:grid-cols-2">
      <div class="mb-20 mt-6 text-center">
        <h1 class="text-3xl xl:text-4xl font-normal leading-tight">BULK WITH CSV</h1>
      </div>
      <hero-bar
        class="mb-5"
        v-if="$store.state.errorAccess == false"
        v-model="csvData.file"
        csv
        :confirm="csvData.file == null ? false : true"
        :csvFunction="uploadCsv"
      >CSV</hero-bar>

      <div class="px-12 md:px-24 lg:px-36 xl:px-40" form>
        <div class="mb-20 mt-6 text-center">
          <h1 class="text-3xl xl:text-4xl font-normal leading-tight">HTTP</h1>
        </div>
        <field label="Masking">
          <control v-model="form.masking" name="masking" autocomplete="masking" />
        </field>

        <field label="msisdn">
          <control v-model="form.msisdn" name="msisdn" autocomplete="msisdn" />
        </field>
        <field label="akun">
          <select v-model="form.akun" class="w-full">
            <option
              v-for="option in ['reguler', 'premium']"
              :key="option"
              :value="option"
            >{{ option }}</option>
          </select>
        </field>
        <field label="message">
          <control v-model="form.message" name="message" autocomplete="message" />
        </field>
        <field label="refno">
          <control v-model="form.refno" name="refno" autocomplete="refno" />
        </field>

        <divider />

        <jb-buttons>
          <jb-button @click="submit" class="w-full" type="submit" color="info" label="Submit" />
        </jb-buttons>
      </div>

      <div class="px-12 md:px-24 lg:px-36 xl:px-40" form>
        <div class="mb-20 mt-6 text-center">
          <h1 class="text-3xl xl:text-4xl font-normal leading-tight">SMPP</h1>
        </div>
        <field label="Masking">
          <control v-model="form2.masking" name="masking" autocomplete="masking" />
        </field>
        <field label="msisdn">
          <control v-model="form2.msisdn" name="msisdn" autocomplete="msisdn" />
        </field>
        <field label="akun">
          <select v-model="form2.akun" class="w-full">
            <option
              v-for="option in ['reguler', 'premium']"
              :key="option"
              :value="option"
            >{{ option }}</option>
          </select>
        </field>
        <field label="message">
          <control v-model="form2.message" name="message" autocomplete="message" />
        </field>
        <field label="refno">
          <control v-model="form2.refno" name="refno" autocomplete="refno" />
        </field>
        <field label="username">
          <control v-model="form2.username" name="username" autocomplete="username" />
        </field>
        <field label="password">
          <control
            v-model="form2.password"
            name="password"
            type="password"
            autocomplete="password"
          />
        </field>

        <divider />

        <jb-buttons>
          <jb-button @click="submit2" class="w-full" type="submit" color="info" label="Submit" />
        </jb-buttons>
      </div>
      <img class="invisible xl:visible" src="../assets/login.png" />
    </div>
  </main-section>
</template>

<script>
/* eslint-disable */
import store from "../store/index";
import Swal from "sweetalert2";
import { computed, reactive } from "vue";
import { useRouter } from "vue-router";
import { mdiAccount, mdiAsterisk } from "@mdi/js";
import MainSection from "@/components/MainSection";
import CardComponent from "@/components/CardComponent";
import Field from "@/components/Field";
import Control from "@/components/Control";
import Divider from "@/components/Divider.vue";
import JbButton from "@/components/JbButton";
import HeroBar from "@/components/HeroBar";
import axios from "axios";
import JbButtons from "@/components/JbButtons";

export default {
  name: "Login",
  components: {
    MainSection,
    CardComponent,
    Field,
    HeroBar,
    Control,
    Divider,
    JbButton,
    JbButtons
  },
  setup() {
    const csvData = computed(() =>
      reactive({
        file: null
      })
    );
    const uploadCsv = () => {
      //console.log('upload')
      //console.log(csvData.value)
      const loginUrl = process.env.VUE_APP_BASE_URL + "api/operators/bulkSms/";
      let formData = new FormData()
      formData.append('file', csvData.value.file)
      formData.append('token', localStorage.getItem("token"))
      // commit("auth_request");
      axios
        .post(loginUrl, formData)
        .then(r => {
          csvData.value.file = null

          if (r.data) {
            Swal.fire({
              title: "SEND Bulk SMS!!",
              text: "Success",
              icon: "success"
            });
          }
          // store.dispatch("fetchCountrys");
          paramWindow.value = false;
        })
        .catch(error => {
          //console.log(error);
          // commit("auth_error");
          // localStorage.removeItem("token");
          Swal.fire({
            title: "SEND Bulk SMS!!",
            text: error.response.data.message,
            icon: "warning"
          });
          // alert(error.message);
        });
    }
    //console.log('enfoanfoianfio')
    const form = reactive({
      message: "Tokopedia - Anda mendapatkan 9 Komplain dari Pembeli. Cek segera detailnya disini  staging.tkp.me/rc/3301",
      akun: "reguler",
      region: "local",
      masking: "Tokopedia",
      msisdn: "6281388220820",
      refno: 22

    });
    const form2 = reactive({
      message: "Tokopedia - Anda mendapatkan 9 Komplain dari Pembeli. Cek segera detailnya disini  staging.tkp.me/rc/3301",
      akun: "reguler",
      region: "local",
      masking: "Tokopedia",
      msisdn: "6281388220820",
      refno: 22,
      username: "tokopedia",
      password: "EltianaGalak2021"

    });

    const router = useRouter();
    // https://sg.160k.id/api/smppTest
    const submit2 = () => {
      const loginUrl = "http://localhost:2000/api/smppTest/";
      // commit("auth_request");
      //console.log(form2, "tes")
      axios
        .post(loginUrl, form2, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then(r => {
          //console.log(r.data, "hallooos")
          if (r.data) {
            Swal.fire({
              title: "Sent",
              text: JSON.stringify(r.data),
              icon: "success"
            });
          }

        })
        .catch(error => {


          // alert(error.message);
        });
      // store.dispatch("loginClient", form);
    };
    const submit = () => {
      const loginUrl = "http://localhost:2000/api/gateway/";
      // commit("auth_request");
      //console.log(form, "tes form1")
      axios
        .post(loginUrl, form, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then(r => {
          //console.log(r.data, "hallooos")
          if (r.data) {
            Swal.fire({
              text: JSON.stringify(r.data)
            });
          }

        })
        .catch(error => {
          //console.log(error);
          Swal.fire({
            title: "Not Sent",
            text: error,
            icon: "error"
          });

          // alert(error.message);
        });
      // store.dispatch("loginClient", form);
    };

    return {
      form,
      submit,
      mdiAccount,
      form2,
      submit2,
      uploadCsv,
      csvData,
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
