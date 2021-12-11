<template>
  <modal-box v-model="paramWindow" title="Set Parameter" :submit="postPrize">
    <div class="overflow-y-auto overflow-x-hidden max-h-paramMobile md:max-h-paramDesktop">
      <field label="Tipe Account">
        <select v-model="userData.akun" class="w-full">
          <option v-for="option in ['reguler', 'premium']" :key="option" :value="option">{{ option }}</option>
        </select>
      </field>

      <field label="Credit">
        <control v-model="userData.total" name="prize" required autocomplete="prize" />
      </field>
      <field label="Code Credit">
        <control v-model="userData.kodeCreditClient" name="prize" required autocomplete="prize" />
      </field>

      <field label="Tax">
        <control v-model="userData.tax" name="tax" required autocomplete="tax" />
      </field>
      <field label="Client">
        <select v-model="userData.client" class="w-full">
          <option
            v-for="option in $store.state.clients"
            :key="option._id ?? option"
            :value="option._id"
          >{{ option.companyName ?? option }}</option>
        </select>
      </field>
      <field label="Price of mitracomm">
        <select v-model="userData.prize" class="w-full">
          <option
            v-for="option in $store.state.prize"
            :key="option._id ?? option"
            :value="option._id"
          >{{ option.kodePrize ?? option }}</option>
        </select>
      </field>

      <field label="Operator">
        <select v-model="userData.operator" class="w-full">
          <option
            v-for="option in $store.state.operator"
            :key="option._id ?? option"
            :value="option._id"
          >{{ option.nickname ?? option }}</option>
        </select>
      </field>
    </div>
  </modal-box>
  <title-bar :title-stack="titleStack" />
  <hero-bar class="mb-5">Settings</hero-bar>

  <div id="prize" v-if="$store.state.errorAccess == false">
    <hero-bar param :paramFunction="openParamWindow" search>Credit</hero-bar>

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
  </main-section>-->
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
import PrizeTable from "@/components/CreditTable";
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
    const titleStack = ref(["Admin", "Settings", "Credit"]);
    const store = useStore();

    const chartData = ref(null);

    const paramWindow = ref(false);
    const userData = computed(() =>
      reactive({
        akun: "",
        total: 0,
        tax: 0,
        operator: "",
        kodeCreditClient: "",
        client: '',
        prize: ''
      })
    );
    const postPrize = () => {
      //console.log(userData.value, "teesss");
      const loginUrl =
        process.env.VUE_APP_BASE_URL + "api/operators/registerCreditByClient/";
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
          userData.value.prize = "";
          userData.value.operator = "";
          userData.value.kodeCreditClient = "";
          userData.value.tax = 0;
          userData.value.client = ""

          if (r.data) {
            Swal.fire({
              title: "ADD Client!",
              text: "Success",
              icon: "success"
            });
          }
          store.dispatch("fetchCredit");
          paramWindow.value = false;
        })
        .catch(error => {
          //console.log(error.response.data.message);
          // commit("auth_error");
          // localStorage.removeItem("token");
          Swal.fire({
            title: "ADD Client!",
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
      const res = await store.dispatch("fetchCredit");
      await store.dispatch("fetchPrize");
      await store.dispatch("fetchOperators");
      await store.dispatch("fetchClients");
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
