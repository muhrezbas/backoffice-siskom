<template>
  <modal-box v-model="paramWindow" title="Set Parameter" :submit="postAdmin">
    <div
      class="overflow-y-auto overflow-x-hidden max-h-paramMobile md:max-h-paramDesktop :max-h-paramDesktop"
    >
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
      <field label="Code">
        <control
          v-model="userData.code"
          name="code"
          required
          autocomplete="code"
        />
      </field>

      <field label="Description">
        <control
          type="textarea"
          v-model="userData.description"
          name="description"
          required
          autocomplete="description"
        />
      </field>
      <!-- {{$store.state.AdminUnsel}} -->
      <!-- {{"tess"}} -->
      <!-- <field label="Admin Code">
      <control v-model="userData.adminCode" name="adminCode" required autocomplete="adminCode" />
      </field>-->
      <div class="flex flex-wrap mb-6">
        <field label="AVAILABLE USER" class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <button
            type="button"
            v-for="admins in userData.unselect"
            :key="admins._id"
            @click="clickAdmin(admins)"
            class="px-4 py-3 bg-blue-600 rounded-md text-white outline-none hover:bg-blue-700 hover:shadow-lg focus:ring-4 shadow-lg transform active:scale-x-75 transition-transform flex flex-row justify-center"
          >
            <span class="mr-3">{{ admins.name }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          </button>
          <!-- <control v-model="userData.email" name="email" required autocomplete="email" /> -->
        </field>
        <field label="SELECTED USER" class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <button
            type="button"
            v-for="admins in userData.select"
            :key="admins._id"
            @click="clickAdminSelect(admins)"
            class="px-4 py-3 border border-blue-600 rounded-md text-blue-600 focus:outline-none hover:bg-blue-50 hover:shadow-lg focus:ring-4 shadow-lg transform active:scale-x-75 transition-transform flex flex-row justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
            <span class="ml-3">{{ admins.name }}</span>
          </button>
          <!-- <control v-model="userData.email" name="email" required autocomplete="email" /> -->
        </field>
      </div>
      <!-- {{ userData.permission}} -->
      <card-component has-table>
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Description</th>
              <th>Permission</th>
              <th></th>
            </tr>
          </thead>
          <tbody class="font-semibold">
            <tr v-for="admins in userData.permission" :key="admins.id">
              <td data-label="Feature">{{ admins.code }}</td>
              <td data-label="Description">{{ admins.name }}</td>
              <td class="actions-cell h-0">
                <jb-buttons type="justify-start lg:justify-start" no-wrap>
                  <!-- {{admins.check}} -->

                  <control
                    v-model="admins.check"
                    name="check"
                    type="checkbox"
                    required
                    autocomplete="check"
                  />
                </jb-buttons>
              </td>
            </tr>
          </tbody>
        </table>
      </card-component>
    </div>
  </modal-box>

  <title-bar :title-stack="titleStack" />
  <hero-bar class="mb-5">Settings</hero-bar>

  <div id="adminRoles" v-if="$store.state.errorAccess == false">
    <hero-bar param :paramFunction="openParamWindow" search
      >Admin Roles</hero-bar
    >

    <main-section>
      <card-component has-table>
        <adminRoles-table checkable />
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
  mdiChevronLeft,
  mdiChevronRight,
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
import AdminRolesTable from "@/components/AdminRolesTable";
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
    AdminRolesTable,
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
    const titleStack = ref(["Admin", "Settings", "Admin Roles"]);

    const chartData = ref(null);

    const isUnselectedClicked = ref(false);

    const isSelectedClicked = ref(false);

    const paramWindow = ref(false);

    const adminUnselectedPayload = reactive({});

    const setUnselectedPayload = payload => {
      adminUnselectedPayload.value = payload;
      isUnselectedClicked.value = true;
    };

    const openParamWindow = async () => {
      await store.dispatch("fetchAdminUnsel");

      userData.value.unselect = [];
      //  console.log(store.state.Adminunsel, "posisi skrg")
      userData.value.unselect = store.state.AdminUnsel.unselect;

      paramWindow.value = !paramWindow.value;
    };
    const userData = computed(() =>
      reactive({
        name: "",
        description: "",
        unselect: [],
        permission: [],
        select: [],
        password: ""
      })
    );
    const clickAdmin = payload => {
      adminUnselectedPayload.value = {};
      console.log(payload, "test");
      let findThe = userData.value.unselect.findIndex(
        el => el._id == payload._id
      );
      userData.value.unselect.splice(findThe, 1);
      userData.value.select.push(payload);
      console.log(findThe);
    };
    const clickAdminSelect = payload => {
      let findThe = userData.value.select.findIndex(
        el => el._id == payload._id
      );
      userData.value.select.splice(findThe, 1);
      userData.value.unselect.push(payload);
      console.log(findThe);
    };
    const postAdmin = () => {
      let post = {
        adminRolesName: userData.value.name,
        adminRolesCode: userData.value.code,
        adminSelected: [],
        adminUnselected: [],
        adminPermissionSelect: [],
        adminPermissionUnselect: []
      };
      // userData.value.unselect.forEach(element => {
      //   post.adminUnselected.push(element._d)
      // });
      userData.value.select.forEach(element => {
        post.adminSelected.push(element._id);
      });
      userData.value.permission.forEach(element => {
        if (element.check == true) {
          post.adminPermissionSelect.push(element._id);
        }
      });
      console.log(post);
      console.log({
        adminRolesName: "Super-Root",
        adminRolesCode: "SR",
        adminSelected: [],
        adminUnselected: [],
        adminPermissionSelect: ["612256f892109f04618b6bc3"],
        adminPermissionUnselect: []
      });
      const loginUrl =
        process.env.VUE_APP_BASE_URL + "api/admins/addEditAdminPermission/";
      // commit("auth_request");
      axios
        .post(loginUrl, post, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(r => {
          // userData.value.name = ""
          // userData.value.description = ""
          // userData.value.unselect = []
          // userData.value.permission = []
          // userData.value.select = []

          if (r.data) {
            Swal.fire({
              title: "ADD Admin Roles!",
              text: "Success",
              icon: "success"
            });
          }
          store.dispatch("fetchAdminRoles");
          paramWindow.value = false;
        })
        .catch(error => {
          console.log(error, "halo errorrrr");
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
            title: "ADD Admin Roles!",
            text: err,
            icon: "warning"
          });
          // // alert(error.message);
        });
    };

    const fillChartData = () => {
      chartData.value = chartConfig.sampleChartData();
    };

    onMounted(async () => {
      await store.dispatch("fetchAdminPermissions");
      store.state.AdminPermissions.forEach(element => {
        element.check = false;
        userData.value.permission.push(element);
      });
      console.log(userData.value.permission, "tessss");
      fillChartData();
    });

    return {
      titleStack,
      chartData,
      isUnselectedClicked,
      isSelectedClicked,
      setUnselectedPayload,
      adminUnselectedPayload,
      fillChartData,
      paramWindow,
      openParamWindow,
      mdiAccountMultiple,
      mdiCashMultiple,
      mdiChevronLeft,
      mdiChevronRight,
      mdiChartTimelineVariant,
      clickAdmin,
      mdiPencilBoxOutline,
      mdiFinance,
      mdiReload,
      clickAdminSelect,
      postAdmin,
      mdiTrashCan,
      mdiGithub,
      userData
    };
  }
};
</script>
