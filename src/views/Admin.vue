<template>
  <modal-box v-model="paramWindow" title="Set Parameter" :submit="postAdmin">
    <!-- <field label="Group">
      <div class="flex justify-center">
        <control
          class="w-full mr-4"
          v-model="userData.name"
          name="name"
          required
          autocomplete="name"
        />
        <jb-buttons type="justify-start lg:justify-end" no-wrap>
          <jb-button
            class="mr-3"
            color="success"
            :icon="mdiPencilBoxOutline"
            small
            @click="isModalActive = true"
          />
          <jb-button
            class="mr-3"
            color="danger"
            :icon="mdiTrashCan"
            small
            @click="isModalDeleteActive = true"
          />
        </jb-buttons>
      </div>
    </field>-->
    <field label="Name">
      <control
        v-model="userData.name"
        name="name"
        required
        autocomplete="name"
      />
    </field>

    <field label="Username">
      <control
        v-model="userData.username"
        name="username"
        required
        autocomplete="username"
      />
    </field>

    <field label="Admin Code">
      <control
        v-model="userData.adminCode"
        name="adminCode"
        required
        autocomplete="adminCode"
      />
    </field>

    <field label="Email">
      <control
        v-model="userData.email"
        name="email"
        required
        autocomplete="email"
      />
    </field>
    <field label="Password">
      <control
        v-model="userData.password"
        name="email"
        type="password"
        required
        autocomplete="email"
      />
    </field>
  </modal-box>

  <title-bar :title-stack="titleStack" />
  <hero-bar class="mb-5">Settings</hero-bar>

  <div id="admin" v-if="$store.state.errorAccess == false">
    <hero-bar param :paramFunction="openParamWindow" search>Admin</hero-bar>

    <main-section>
      <card-component has-table>
        <admin-table checkable />
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
import ErrorAccess from "@/components/ErrorAccess";
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
    ErrorAccess,
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
    const store = useStore();
    const titleStack = ref(["Admin", "Settings", "Admin"]);

    const chartData = ref(null);

    const paramWindow = ref(false);

    const openParamWindow = () => {
      paramWindow.value = !paramWindow.value;
    };
    const userData = computed(() =>
      reactive({
        name: "",
        username: "",
        adminCode: "",
        email: "",
        password: ""
      })
    );
    const postAdmin = () => {
      console.log(userData.value);
      const loginUrl = process.env.VUE_APP_BASE_URL + "api/admins/register/";
      // commit("auth_request");
      axios
        .post(loginUrl, userData.value, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(r => {
          userData.value.name = "";
          userData.value.username = "";
          userData.value.adminCode = "";
          userData.value.email = "";
          userData.value.password = "";

          if (r.data) {
            Swal.fire({
              title: "ADD Admin!",
              text: "Success",
              icon: "success"
            });
          }
          store.dispatch("fetchAdmin");
          paramWindow.value = false;
        })
        .catch(error => {
          console.log(error.response);
          let err;
          if (error.response.status == 403) {
            err = "Not Authorize";
          } else if (error.response.data == undefined) {
            err = error.response;
          } else {
            err = error.response.data.message;
          }
          console.log(err, "cas");
          // commit("auth_error");
          // localStorage.removeItem("token");

          Swal.fire({
            title: "ADD Admin!",
            text: err,
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
      mdiChartTimelineVariant,
      mdiPencilBoxOutline,
      mdiFinance,
      mdiReload,
      postAdmin,
      mdiTrashCan,
      mdiGithub,
      userData
    };
  }
};
</script>
