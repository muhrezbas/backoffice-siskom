<template>
  <modal-box v-model="paramWindow" :submit="postSender" title="Set Parameter">
    <field label="Kode">
      <control v-model="userData.kode" name="kode" required autocomplete="kode" />
    </field>

    <field label="MSISDN">
      <control v-model="userData.msisdn" name="msisdn" required autocomplete="msisdn" />
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
  </modal-box>
  <title-bar :title-stack="titleStack" />
  <hero-bar class="mb-5">Settings</hero-bar>

  <div id="senderID">
    <hero-bar param :paramFunction="openParamWindow" search>Prefix</hero-bar>

    <main-section>
      <card-component has-table>
        <prefix-table checkable />
      </card-component>
    </main-section>
  </div>

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
import Swal from 'sweetalert2'
import axios from 'axios'
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
import PrefixTable from "@/components/PrefixTable";
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
    PrefixTable,
    UsersTable,
    LineChart,
    CardComponent,
    HeroBar,
    TitleBar,
    Notification,
    JbButtons,
    JbButton
  },
  setup() {
    const titleStack = ref(["Country", "Settings"]);
    const store = useStore();

    onMounted(async () => {
      await store.dispatch("fetchOperators");
      fillChartData();
    });
    const userData = computed(() =>
      reactive({
        kode: "",
        msisdn: "",
        operator: ""
      })
    )

    const chartData = ref(null);

    const paramWindow = ref(false);

    const openParamWindow = () => {
      paramWindow.value = !paramWindow.value;
    };

    const fillChartData = () => {
      chartData.value = chartConfig.sampleChartData();
    };

    const postSender = () => {
      console.log(userData.value)
      const loginUrl =
        process.env.VUE_APP_BASE_URL +
        "api/operators/registerPrefix/";
      // commit("auth_request");
      axios
        .post(loginUrl, userData.value, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((r) => {
          userData.value.kode = "";
          userData.value.msisdn = "";
          userData.value.operator = "";

          if (r.data) {
            Swal.fire({
              title: "ADD Prefix!",
              text: "Success",
              icon: "success",
            });
          }
          store.dispatch("fetchPrefix");
          paramWindow.value = false

        })
        .catch((error) => {
          console.log(error.response.data.message)
          // commit("auth_error");
          // localStorage.removeItem("token");
          Swal.fire({
            title: "ADD Prefix!",
            text: "Gagal",
            icon: "warning",
          });
          // alert(error.message);
        });
    }

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
