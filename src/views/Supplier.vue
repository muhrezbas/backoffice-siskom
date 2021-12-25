<template>
  <!-- <modal-box v-model="paramWindow" title="Set Parameter" :submit="postCountry">
    <field label="Kode">
      <control
        v-model="userData.kode"
        name="kode"
        required
        autocomplete="kode"
      />
    </field>

    <field label="Region">
      <control
        v-model="userData.region"
        name="region"
        required
        autocomplete="region"
      />
    </field>
  </modal-box> -->
  <title-bar :title-stack="titleStack" />
  <hero-bar class="mb-5">Settings</hero-bar>

  <div id="country" v-if="$store.state.errorAccess == false">
    <hero-bar search>Suppliers</hero-bar>

    <main-section>
      <card-component has-table>
        <country-table checkable />
      </card-component>
    </main-section>
  </div>

  <error-access v-else />
  <!-- <hero-bar search>Users</hero-bar>

  <main-section>
    <card-component has-table>
      <users-table checkable />
    </card-component>
  </main-section>-->
</template>

<script>
/* eslint-disable */
// @ is an alias to /src
import { ref, onMounted, computed, reactive } from "vue";
import { useStore } from "vuex";
import {
  mdiAccountMultiple,
  mdiCashMultiple,
  mdiCellphoneText,
  mdiCellphoneMessage,
  mdiChartTimelineVariant,
  mdiFinance,
  mdiMonitorCellphone,
  mdiPencilBoxOutline,
  mdiReload,
  mdiTrashCan,
  mdiGithub
} from "@mdi/js";
import * as chartConfig from "@/components/Charts/chart.config";
import Swal from "sweetalert2";
import axios from "axios";
import ErrorAccess from "@/components/ErrorAccess";
import LineChart from "@/components/Charts/LineChart";
import MainSection from "@/components/MainSection";
import ModalBox from "@/components/ModalBox";
import Level from "@/components/Level";
import Field from "@/components/Field";
import Control from "@/components/Control";
import TitleBar from "@/components/TitleBar";
import HeroBar from "@/components/HeroBar";
import CardComponent from "@/components/CardComponent";
import CountryTable from "@/components/SupplierTable";
import UsersTable from "@/components/UsersTable";
import Notification from "@/components/Notification";
import JbButtons from "@/components/JbButtons";
import JbButton from "@/components/JbButton";

export default {
  name: "Setting",
  components: {
    MainSection,
    ModalBox,
    Level,
    Field,
    Control,
    CountryTable,
    UsersTable,
    LineChart,
    CardComponent,
    HeroBar,
    TitleBar,
    Notification,
    JbButtons,
    JbButton,
    ErrorAccess
  },
  setup() {
    const store = useStore();
    const titleStack = ref(["Admin", "Settings", "Suppliers"]);

    const chartData = ref(null);

    const paramWindow = ref(false);
    const userData = computed(() =>
      reactive({
        tps: "",
        protocol: ""
      })
    );
    const csvData = computed(() =>
      reactive({
        file: null
      })
    );

    const openParamWindow = () => {
      paramWindow.value = !paramWindow.value;
    };
    // const postCountry = () => {
    //   //console.log(userData.value);
    //   const loginUrl = process.env.VUE_APP_BASE_URL + "api/operators/country/";
    //   // commit("auth_request");
    //   axios
    //     .post(loginUrl, userData.value, {
    //       headers: {
    //         token: localStorage.getItem("token")
    //       }
    //     })
    //     .then(r => {
    //       userData.value.region = "";
    //       userData.value.kode = "";

    //       if (r.data) {
    //         Swal.fire({
    //           title: "ADD Country!",
    //           text: "Success",
    //           icon: "success"
    //         });
    //       }
    //       store.dispatch("fetchCountrys");
    //       paramWindow.value = false;
    //     })
    //     .catch(error => {
    //       //console.log(error);
    //       // commit("auth_error");
    //       // localStorage.removeItem("token");
    //       // Swal.fire({
    //       //   title: "TOP UP!",
    //       //   text: "Gagal",
    //       //   icon: "warning",
    //       // });
    //       // alert(error.message);
    //     });
    // };
    const uploadCsv = () => {
      //console.log('upload')
      //console.log(csvData.value)
      const loginUrl =
        process.env.VUE_APP_BASE_URL + "api/operators/bulkCountries/";
      let formData = new FormData();
      formData.append("file", csvData.value.file);
      // commit("auth_request");
      axios
        .post(loginUrl, formData, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(r => {
          csvData.value.file = null;

          if (r.data) {
            Swal.fire({
              title: "ADD Bulk Country!!",
              text: "Success",
              icon: "success"
            });
          }
          store.dispatch("fetchCountrys");
          paramWindow.value = false;
        })
        .catch(error => {
          //console.log(error);
          // commit("auth_error");
          // localStorage.removeItem("token");
          Swal.fire({
            title: "ADD Bulk Country!!",
            text: error.response.data.message,
            icon: "warning"
          });
          // alert(error.message);
        });
    };
    const fillChartData = () => {
      chartData.value = chartConfig.sampleChartData();
    };

    onMounted(() => {
      fillChartData();
    });

    return {
      titleStack,
      chartData,
      fillChartData,
      paramWindow,
      openParamWindow,
      mdiAccountMultiple,
      mdiCashMultiple,
      mdiCellphoneText,
      mdiCellphoneMessage,
      mdiChartTimelineVariant,
      mdiPencilBoxOutline,
      mdiFinance,
      mdiMonitorCellphone,
      mdiReload,
      mdiTrashCan,
      mdiGithub,
      userData,
      uploadCsv,
      csvData
    };
  }
};
</script>
