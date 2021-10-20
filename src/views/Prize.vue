<template>
  <modal-box v-model="paramWindow" title="Set Parameter" :submit="postPrize">
    <field label="Tipe Account">
      <select v-model="userData.akun" class="w-full">
        <option
          v-for="option in ['reguler', 'premium']"
          :key="option"
          :value="option"
          >{{ option }}</option
        >
      </select>
    </field>

    <field label="Price">
      <control
        v-model="userData.total"
        name="prize"
        required
        autocomplete="prize"
      />
    </field>
    <field label="Code Price">
      <control
        v-model="userData.kodePrize"
        name="prize"
        required
        autocomplete="prize"
      />
    </field>

    <field label="Tax">
      <control v-model="userData.tax" name="tax" required autocomplete="tax" />
    </field>

    <field label="Supplier">
      <select v-model="userData.protocol" class="w-full">
        <option
          v-for="option in $store.state.protocol"
          :key="option._id ?? option"
          :value="option._id"
          >{{ option.supplier ?? option }}</option
        >
      </select>
    </field>

    <field label="Operator">
      <select v-model="userData.operator" class="w-full">
        <option
          v-for="option in $store.state.operator"
          :key="option._id ?? option"
          :value="option._id"
          >{{ option.nickname ?? option }}</option
        >
      </select>
    </field>
  </modal-box>
  <title-bar :title-stack="titleStack" />
  <hero-bar class="mb-5">Settings</hero-bar>

  <div id="prize" v-if="$store.state.errorAccess == false">
    <hero-bar param :paramFunction="openParamWindow" search>Price</hero-bar>

    <main-section>
      <card-component has-table>
        <prize-table checkable />
      </card-component>
    </main-section>
  </div>

  <error-access v-else />

  <!-- <hero-bar search>Users</hero-bar>

  <main-section>
    <card-component has-table>
      <users-table checkable />
    </card-component>
  </main-section> -->
</template>

<script>
/* eslint-disable */
// @ is an alias to /src
import { ref, onMounted, computed, reactive } from "vue";
import { useStore } from "vuex";
import Swal from "sweetalert2";
import axios from "axios";
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
import LineChart from "@/components/Charts/LineChart";
import MainSection from "@/components/MainSection";
import ModalBox from "@/components/ModalBox";
import Level from "@/components/Level";
import Field from "@/components/Field";
import Control from "@/components/Control";
import TitleBar from "@/components/TitleBar";
import HeroBar from "@/components/HeroBar";
import CardComponent from "@/components/CardComponent";
import PrizeTable from "@/components/PrizeTable";
import UsersTable from "@/components/UsersTable";
import Notification from "@/components/Notification";
import JbButtons from "@/components/JbButtons";
import JbButton from "@/components/JbButton";
import ErrorAccess from "../components/ErrorAccess.vue";

export default {
  name: "Setting",
  components: {
    MainSection,
    ModalBox,
    Level,
    Field,
    Control,
    PrizeTable,
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
    const titleStack = ref(["Admin", "Settings", "Prize"]);
    const store = useStore();

    const chartData = ref(null);

    const paramWindow = ref(false);
    const userData = computed(() =>
      reactive({
        akun: "",
        total: 0,
        tax: 0,
        protocol: "",
        operator: "",
        kodePrize: ""
      })
    );
    const postPrize = () => {
      //console.log(userData.value);
      const loginUrl =
        process.env.VUE_APP_BASE_URL + "api/operators/registerPrizeByOperator/";
      // commit("auth_request");
      axios
        .post(loginUrl, userData.value, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(r => {
          userData.value.akun = "";
          userData.value.total = 0;
          userData.value.protocol = "";
          userData.value.operator = "";
          userData.value.kodePrize = "";
          userData.value.tax = 0;

          if (r.data) {
            Swal.fire({
              title: "ADD Prize!",
              text: "Success",
              icon: "success"
            });
          }
          store.dispatch("fetchPrize");
          paramWindow.value = false;
        })
        .catch(error => {
          //console.log(error.response.data.message);
          // commit("auth_error");
          // localStorage.removeItem("token");
          Swal.fire({
            title: "ADD Prize!",
            text: "Gagal",
            icon: "warning"
          });
          // alert(error.message);
        });
    };

    const openParamWindow = () => {
      paramWindow.value = !paramWindow.value;
    };

    const fillChartData = () => {
      chartData.value = chartConfig.sampleChartData();
    };

    onMounted(async () => {
      await store.dispatch("fetchOperators");
      await store.dispatch("fetchProtocol");
      fillChartData();
    });
    //console.log(store.state.protocol, "tess pro");

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
      postPrize,
      mdiGithub,
      userData
    };
  }
};
</script>
