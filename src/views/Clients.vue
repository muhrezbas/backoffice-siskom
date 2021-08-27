<template>
  <modal-box v-model="paramWindow" title="Set Parameter" :submit="postClient">
    <div class="flex flex-wrap -mx-3 mb-6">
      <field label="Username" class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <control v-model="userData.username" name="prize" required autocomplete="prize" />
      </field>

      <field label="Company Name" class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <control v-model="userData.companyName" name="prize" required autocomplete="prize" />
      </field>
    </div>

    <div class="flex flex-wrap -mx-3 mb-6">
      <field label="Company Phone Number" class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <control v-model="userData.companyNumber" name="prize" required autocomplete="prize" />
      </field>

      <field label="Company Address" class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <control v-model="userData.companyAddress" name="prize" required autocomplete="prize" />
      </field>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <field label="Name PIC" class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <control v-model="userData.namePic" name="prize" required autocomplete="prize" />
      </field>

      <field label="Contact PIC" class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <control v-model="userData.contactPic" name="prize" required autocomplete="prize" />
      </field>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <field label="Whitelist IP" class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <control v-model="userData.whiteListIp" name="prize" required autocomplete="prize" />
      </field>

      <field label="Finance Email" class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <control v-model="userData.financeEmail" name="prize" required autocomplete="prize" />
      </field>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <field label="Notification Email" class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <control v-model="userData.notifEmail" name="prize" required autocomplete="prize" />
      </field>

      <field label="Password" class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <control v-model="userData.password" name="prize" required autocomplete="prize" />
      </field>
    </div>
    <!-- <div class="flex flex-wrap -mx-3 mb-6"> -->
    <field label="Priority Protocol">
      <div>
        <select
          v-model="userData.priority[index]"
          class="w-1/4 mb-2 ml-1"
          v-for="(deta, index) in $store.state.protocol"
          :key="index"
        >
          <option
            v-for="option in $store.state.protocol"
            :key="option._id ?? option"
            :value="option._id"
          >{{ option.supplier ?? option }}</option>
        </select>
      </div>
    </field>

    <!-- <field label="Prize" class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <control v-model="userData.total" name="prize" required autocomplete="prize" />
      </field>

      <field label="Prize" class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <control v-model="userData.total" name="prize" required autocomplete="prize" />
    </field>-->
    <!-- </div> -->
  </modal-box>
  <title-bar :title-stack="titleStack" />
  <hero-bar class="mb-5">Settings</hero-bar>

  <!-- <hero-bar param :paramFunction="openParamWindow" search>Admin</hero-bar>

  <main-section>
    <card-component has-table>
      <admin-table checkable />
    </card-component>
  </main-section>-->

  <hero-bar param :paramFunction="openParamWindow" search>Users</hero-bar>

  <main-section>
    <card-component has-table>
      <users-table checkable />
    </card-component>
  </main-section>
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
import AdminTable from "@/components/AdminTable";
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
    AdminTable,
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
    const titleStack = ref(["Admin", "Settings"]);

    const chartData = ref(null);

    const paramWindow = ref(false);

    const openParamWindow = () => {
      paramWindow.value = !paramWindow.value;
    };
    const userData = computed(() =>
      reactive({
        priority: [],
        username
          :
          "",
        companyName
          :
          "",
        companyNumber
          :
          "",
        companyAddress
          :
          "",
        namePic
          :
          "",
        contactPic
          :
          "",
        whiteListIp
          :
          "",
        financeEmail
          :
          "",
        notifEmail
          :
          "",
        password
          :
          "",

      })
    )

    const fillChartData = () => {
      chartData.value = chartConfig.sampleChartData();
    };
    const postClient = () => {
      console.log(userData.value)
      function hasDuplicates(arr) {
        return arr.some(x => arr.indexOf(x) !== arr.lastIndexOf(x));
      }



      if (hasDuplicates(userData.value.priority)) {
        console.log("Duplicate elements found.");
        Swal.fire({
          title: "ADD Client!",
          text: "Gagal",
          icon: "warning",
        });

      }
      else {
        console.log(userData.value)
        let userDataAdd = userData.value
        userDataAdd.protocol = userData.value.priority[0]
        const loginUrl =
        process.env.VUE_APP_BASE_URL +
        "api/users/client/";
      // commit("auth_request");
      axios
        .post(loginUrl,userDataAdd, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((r) => {
          userData.value.priority =[];
          userData.value.namePic = "";
          userData.value.companyName = "";
          userData.value.companyNumber = "";
          userData.value.companyAddress = "";
          userData.value.username = "";
          userData.value.contactPic = "";
          userData.value.whiteListIp = "";
          userData.value.password = "";
          userData.value.notifEmail = "";
          userData.value.financeEmail = "";

          if (r.data) {
            Swal.fire({
              title: "ADD Client!",
              text: "Success",
              icon: "success",
            });
          }
          store.dispatch("fetchClients");
          paramWindow.value = false

        })
        .catch((error) => {
          console.log(error.response.data.message)
          // commit("auth_error");
          // localStorage.removeItem("token");
          Swal.fire({
            title: "ADD Client!",
            text: "Gagal",
            icon: "warning",
          });
          // alert(error.message);
        });
        console.log("No Duplicates found.");

      }
    }
    const store = useStore();
    onMounted(async () => {
      await store.dispatch("fetchProtocol");
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
      postClient,
      mdiPencilBoxOutline,
      mdiFinance,
      mdiMonitorCellphone,
      mdiReload,
      userData,
      mdiTrashCan,
      mdiGithub

    };
  }
};
</script>
