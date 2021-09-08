<template>
  <modal-box v-model="paramWindow" :submit="postSender" title="Set Parameter">
    <field label="Sender ID">
      <control
        v-model="userData.senderID"
        name="senderID"
        required
        autocomplete="senderID"
      />
    </field>

    <field label="Region">
      <select v-model="userData.region" class="w-full">
        <option
          v-for="option in ['local', 'international']"
          :key="option._id ?? option"
          :value="option"
          >{{ option.nickname ?? option }}</option
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

  <div id="senderID" v-if="$store.state.errorAccess == false">
    <hero-bar param :paramFunction="openParamWindow" search>Sender ID</hero-bar>
    <main-section>
      <card-component has-table>
        <senderID-table checkable />
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
import LineChart from "@/components/Charts/LineChart";
import MainSection from "@/components/MainSection";
import ModalBox from "@/components/ModalBox";
import Swal from "sweetalert2";
import axios from "axios";
import Level from "@/components/Level";
import Field from "@/components/Field";
import Control from "@/components/Control";
import TitleBar from "@/components/TitleBar";
import HeroBar from "@/components/HeroBar";
import CardComponent from "@/components/CardComponent";
import SenderIDTable from "@/components/SenderIDTable";
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
    SenderIDTable,
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
    const titleStack = ref(["Admin", "Settings", "Sender ID"]);
    const store = useStore();
    onMounted(async () => {
      await store.dispatch("fetchOperators");
      fillChartData();
    });
    const chartData = ref(null);

    const paramWindow = ref(false);
    const userData = computed(() =>
      reactive({
        senderID: "",
        region: "",
        operator: ""
      })
    );
    const operators = computed(() => store.state.operator);
    const postSender = () => {
      console.log(userData.value);
      const loginUrl = process.env.VUE_APP_BASE_URL + "api/operators/senderid/";
      // commit("auth_request");
      axios
        .post(loginUrl, userData.value, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(r => {
          userData.value.region = "";
          userData.value.senderID = "";
          userData.value.operator = "";

          if (r.data) {
            Swal.fire({
              title: "ADD SenderID!",
              text: "Success",
              icon: "success"
            });
          }
          store.dispatch("fetchSenderIDs");
          paramWindow.value = false;
        })
        .catch(error => {
          console.log(error.response.data.message);
          // commit("auth_error");
          // localStorage.removeItem("token");
          Swal.fire({
            title: "ADD SenderID!",
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
      postSender,
      userData
    };
  }
};
</script>
