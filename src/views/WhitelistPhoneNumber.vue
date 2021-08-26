<template>
  <modal-box v-model="paramWindow" :submit="postWhitelist" title="Set Parameter">
    <field label="Phone Number">
      <control
        v-model="userData.phoneNumber"
        name="phoneNumber"
        required
        autocomplete="phoneNumber"
      />
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
  </modal-box>

  <title-bar :title-stack="titleStack" />
  <hero-bar class="mb-5">Settings</hero-bar>

  <div id="senderID">
    <hero-bar param :paramFunction="openParamWindow" search>Whitelist Phone Number</hero-bar>

    <main-section>
      <card-component has-table>
        <whitelistPhoneNumber-table checkable />
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
import WhitelistPhoneNumberTable from "@/components/WhitelistPhoneNumberTable";
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
    WhitelistPhoneNumberTable,
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
      await store.dispatch("fetchClients");
      fillChartData();
    });
    const userData = computed(() =>
      reactive({
        phoneNumber: "",
        client: ""
      })
    )
    const postWhitelist = () => {
      console.log(userData.value)
      const loginUrl =
        process.env.VUE_APP_BASE_URL +
        "api/operators/createWhitelistNumber/";
      // commit("auth_request");
      axios
        .post(loginUrl, userData.value, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((r) => {
          userData.value.phoneNumber = "";
          userData.value.client = "";

          if (r.data) {
            Swal.fire({
              title: "ADD Whitelist Phone Number!",
              text: "Success",
              icon: "success",
            });
          }
          store.dispatch("fetchWhitelistPhoneNumber");
          paramWindow.value = false

        })
        .catch((error) => {
          console.log(error.response.data.message)
          // commit("auth_error");
          // localStorage.removeItem("token");
          Swal.fire({
            title: "ADD Whitelist Phone Number!",
            text: error.response.data.message,
            icon: "warning",
          });
          // alert(error.message);
        });
    }

    const chartData = ref(null);

    const paramWindow = ref(false);

    const openParamWindow = () => {
      paramWindow.value = !paramWindow.value;
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
      postWhitelist,
      mdiTrashCan,
      mdiGithub,
      userData
    };
  }
};
</script>
