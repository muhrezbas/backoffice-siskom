<template>
  <modal-box v-model="paramWindow" title="Set Parameter" :submit="postKeyword">
    <field label="Keyword">
      <control v-model="userData.code" name="keyword" required autocomplete="keyword" />
    </field>
  </modal-box>
  <title-bar :title-stack="titleStack" />
  <hero-bar
    class="mb-5"
    v-if="$store.state.errorAccess == false"
    v-model="csvData.file"
    csv
    :confirm="csvData.file == null ? false : true"
    :csvFunction="uploadCsv"
  >Settings</hero-bar>

  <div id="keyword" v-if="$store.state.errorAccess == false">
    <hero-bar param :paramFunction="openParamWindow" search>Keyword</hero-bar>

    <main-section>
      <card-component has-table>
        <keyword-table checkable />
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
import KeywordTable from "@/components/KeywordTable";
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
    KeywordTable,
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
    const titleStack = ref(["Admin", "Settings", "Keyword Restriction on Regular"]);

    const chartData = ref(null);
    const store = useStore();

    const paramWindow = ref(false);

    const openParamWindow = () => {
      paramWindow.value = !paramWindow.value;
    };
    const userData = computed(() =>
      reactive({
        code: ""
      })
    );
    const csvData = computed(() =>
      reactive({
        file: null
      })
    );
    const postKeyword = () => {
      //console.log(userData.value);
      const loginUrl =
        process.env.VUE_APP_BASE_URL + "api/operators/registerValidasi/";
      // commit("auth_request");
      axios
        .post(loginUrl, userData.value, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(r => {
          userData.value.code = "";

          if (r.data) {
            Swal.fire({
              title: "ADD Keyword!",
              text: "Success",
              icon: "success"
            });
          }
          store.dispatch("fetchKeyword");
          paramWindow.value = false;
        })
        .catch(error => {
          //console.log(error.response.data.message);
          // commit("auth_error");
          // localStorage.removeItem("token");
          Swal.fire({
            title: "ADD Keyword for validation!",
            text: error.response.data.message,
            icon: "warning"
          });
          // alert(error.message);
        });
    };
     const uploadCsv = () => {
      //console.log('upload')
      //console.log(csvData.value)
      const loginUrl = process.env.VUE_APP_BASE_URL + "api/operators/bulkKeywordReguler/";
      let formData = new FormData()
      formData.append('file', csvData.value.file)
      // commit("auth_request");
      axios
        .post(loginUrl, formData, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(r => {
          csvData.value.file = null

          if (r.data) {
            Swal.fire({
              title: "ADD Bulk Keyword for validation!!",
              text: "Success",
              icon: "success"
            });
          }
          store.dispatch("fetchKeyword");
          paramWindow.value = false;
        })
        .catch(error => {
          //console.log(error);
          // commit("auth_error");
          // localStorage.removeItem("token");
          Swal.fire({
            title: "ADD Bulk Keyword for validation!!",
            text: error.response.data.message,
            icon: "warning"
          });
          // alert(error.message);
        });
    }
    const fillChartData = () => {
      chartData.value = chartConfig.sampleChartData();
    };
    // registerValidasi

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
      postKeyword,
      mdiReload,
      mdiTrashCan,
      mdiGithub,
      uploadCsv,
      csvData,
      userData
    };
  }
};
</script>
