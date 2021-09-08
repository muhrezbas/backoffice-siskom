<template>
  <modal-box v-model="paramWindow" title="Set Parameter" :submit="postOperator">
    <field label="Company Name">
      <control
        v-model="userData.name"
        name="Company Name"
        required
        autocomplete="Company Name"
      />
    </field>

    <field label="Nickname">
      <control
        v-model="userData.nickname"
        name="prize"
        required
        autocomplete="prize"
      />
    </field>

    <field label="Country">
      <select v-model="userData.country" class="w-full">
        <option
          v-for="option in $store.state.country"
          :key="option._id ?? option"
          :value="option._id"
          >{{ option.region ?? option }}</option
        >
      </select>
    </field>
  </modal-box>

  <title-bar :title-stack="titleStack" />

  <hero-bar class="mb-5" v-if="$store.state.errorAccess == false"
    >Settings</hero-bar
  >

  <div id="operator" v-if="$store.state.errorAccess == false">
    <hero-bar param :paramFunction="openParamWindow" search>Operator</hero-bar>

    <main-section>
      <card-component has-table>
        <operator-table checkable />
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
import ErrorAccess from "@/components/ErrorAccess";
import HeroBar from "@/components/HeroBar";
import CardComponent from "@/components/CardComponent";
import OperatorTable from "@/components/OperatorTable";
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
    OperatorTable,
    UsersTable,
    LineChart,
    CardComponent,
    HeroBar,
    TitleBar,
    Notification,
    ErrorAccess,
    JbButtons,
    JbButton
  },
  setup() {
    const store = useStore();
    //
    onMounted(async () => {
      const res = await store.dispatch("fetchOperators");
      await store.dispatch("fetchCountrys");

      console.log(res, "tes");
      // console.log(this.$route, "test");
      // fillChartData();
      // console.log(this.$store.state.client, "tessc");
    });
    const userData = computed(() =>
      reactive({
        name: "",
        nickname: "",
        country: ""
      })
    );

    const operators = computed(() => store.state.operator);
    const errorAccess = computed(() => store.state.errorAccess);
    console.log(errorAccess.value, "fieho");
    const titleStack = ref(["Admin", "Settings", "Operator"]);

    const chartData = ref(null);
    const postOperator = () => {
      console.log(userData.value);
      const loginUrl = process.env.VUE_APP_BASE_URL + "api/operators/register/";
      // commit("auth_request");
      axios
        .post(loginUrl, userData.value, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(r => {
          userData.value.country = "";
          userData.value.name = "";
          userData.value.nickname = "";

          if (r.data) {
            Swal.fire({
              title: "ADD Operator!",
              text: "Success",
              icon: "success"
            });
          }
          store.dispatch("fetchOperators");
          paramWindow.value = false;
        })
        .catch(error => {
          console.log(error);
          // commit("auth_error");
          // localStorage.removeItem("token");
          Swal.fire({
            title: "ADD Operator!",
            text: error.response.data.message,
            icon: "warning"
          });
          // alert(error.message);
        });
    };

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
      operators,
      paramWindow,
      openParamWindow,
      mdiAccountMultiple,
      mdiCashMultiple,
      mdiCellphoneText,
      mdiCellphoneMessage,
      postOperator,
      mdiChartTimelineVariant,
      mdiPencilBoxOutline,
      mdiFinance,
      mdiMonitorCellphone,
      mdiReload,
      mdiTrashCan,
      mdiGithub,
      userData
    };
  }
};
</script>
