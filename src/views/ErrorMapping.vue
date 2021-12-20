<template>
  <modal-box v-model="paramWindow" title="Set Parameter" :submit="postSubmit">
    <div
      class="overflow-y-auto overflow-x-hidden max-h-paramMobile md:max-h-paramDesktop :max-h-paramDesktop"
    >
      <field label="Label">
        <control v-model="submitData.label" name="label" required autocomplete="label" />
      </field>

      <field label="Kode">
        <control v-model="submitData.code" name="code" required autocomplete="code" />
      </field>
      <field label="Paid">
        <select v-model="submitData.paid" class="w-full">
          <option v-for="option in [true, false]" :key="option" :value="option">{{ option }}</option>
        </select>
        <!-- <control v-model="submitData.paid" name="paid" required autocomplete="paid" /> -->
      </field>
      <!-- <field label="Status SMS">
      <control v-model="submitData.statusSms" name="statusSms" required autocomplete="statusSms" />
      </field>-->
      <card-component has-table>
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Description</th>
              <!-- <th>Permission</th> -->
              <th></th>
            </tr>
          </thead>
          <tbody class="font-semibold">
            <tr v-for="admins in submitData.statusSms" :key="admins._id">
              <td data-label="Label">{{ admins.label }}</td>
              <td data-label="Code">{{ admins.code }}</td>
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
  <modal-box v-model="ourWindow" title="Set Parameter" :submit="ourSubmit">
    <div
      class="overflow-y-auto overflow-x-hidden max-h-paramMobile md:max-h-paramDesktop :max-h-paramDesktop"
    >
      <field label="Label">
        <control v-model="ourData.label" name="label" required autocomplete="label" />
      </field>

      <field label="Kode">
        <control v-model="ourData.code" name="code" required autocomplete="code" />
      </field>

       <field label="Status SMPP" class="w-full">
        <select v-model="ourData.dlr" style="width: 100%;">
        <option
            v-for="option in ['DELIVRD', 'ACCEPTD', 'REJECTED', 'UNKNOWN', 'EXPIRED', 'UNDELIV']"
            :key="option"
            :value="option"
          >{{ option }}</option>
        </select>
      </field>
      <!-- <field label="Status SMS">
      <control v-model="submitData.statusSms" name="statusSms" required autocomplete="statusSms" />
      </field>-->
      <card-component has-table>
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Description</th>
              <!-- <th>Permission</th> -->
              <th></th>
            </tr>
          </thead>
          <tbody class="font-semibold">
            <tr v-for="our in ourData.statusSms" :key="our._id">
              <td data-label="Label">{{ our.label }}</td>
              <td data-label="Code">{{ our.code }}</td>
              <td class="actions-cell h-0">
                <jb-buttons type="justify-start lg:justify-start" no-wrap>
                  <!-- {{admins.check}} -->

                  <control
                    v-model="our.check"
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
  <modal-box v-model="deliveryWindow" title="Set Parameter" :submit="deliverySubmit">
    <div
      class="overflow-y-auto overflow-x-hidden max-h-paramMobile md:max-h-paramDesktop :max-h-paramDesktop"
    >
      <field label="Label">
        <control v-model="deliveryData.label" name="label" required autocomplete="label" />
      </field>

      <field label="Kode">
        <control v-model="deliveryData.code" name="code" required autocomplete="code" />
      </field>
      <field label="Supplier" class="w-full">
        <select v-model="deliveryData.protocol" style="width: 100%;">
          <option
            v-for="option in $store.state.protocol"
            :key="option._id ?? option"
            :value="option._id"
          >{{ option.supplier ?? option }}</option>
        </select>
      </field>
      <field label="Mapping Error" class="w-full">
        <select v-model="deliveryData.ourError" style="width: 100%;">
          <option
            v-for="option in $store.state.our"
            :key="option._id ?? option"
            :value="option._id"
          >{{ option.label ?? option }}</option>
        </select>
      </field>
    </div>
  </modal-box>
  <title-bar :title-stack="titleStack" />
  <hero-bar
    class="mb-5"
    v-if="$store.state.errorAccess == false"
    v-model="csvData.file"
    :confirm="csvData.file == null ? false : true"
    :csvFunction="uploadCsv"
  >Settings</hero-bar>

  <div id="country" v-if="$store.state.errorAccess == false">
    <hero-bar param :paramFunction="openParamWindow" search>SMS Response</hero-bar>

    <main-section>
      <card-component has-table>
        <submit-table checkable />
      </card-component>
    </main-section>
  </div>

  <div id="country" v-if="$store.state.errorAccess == false">
    <hero-bar param :paramFunction="openOurWindow" search>SMS Status Delivery</hero-bar>

    <main-section>
      <card-component has-table>
        <our-table checkable />
      </card-component>
    </main-section>
  </div>

  <div id="country" v-if="$store.state.errorAccess == false">
    <hero-bar param :paramFunction="openDeliveryWindow" search>SMS Status Delivery Mapping</hero-bar>

    <main-section>
      <card-component has-table>
        <delivery-table checkable />
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
import Swal from "sweetalert2";
import axios from "axios";
import ErrorAccess from "@/components/ErrorAccess";
import LineChart from "@/components/Charts/LineChart";
import MainSection from "@/components/MainSection";
import ModalBox from "@/components/ModalBox";
import Level from "@/components/Level";
import Field from "@/components/Field";
import Control from "@/components/Control";
import TitleBar from "@/components/TitleBar";
import HeroBar from "@/components/HeroBar";
import CardComponent from "@/components/CardComponent";
import SubmitTable from "@/components/SubmitTable";
import DeliveryTable from "@/components/DeliveryTable";
import OurTable from "@/components/OurTable"
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
    SubmitTable,
    DeliveryTable,
    UsersTable,
    OurTable,
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
    const titleStack = ref(["Admin", "Settings", "Country"]);

    const chartData = ref(null);
    const ourWindow = ref(false);
    const ourData = computed(() =>
      reactive({
        code: "",
        label: "",
        statusSms: [],
        dlr: ""
      })
    );
    const deliveryWindow = ref(false);
    const deliveryData = computed(() =>
      reactive({
        code: "",
        label: "",
        protocol: "",
        ourError: ""
      })
    );

    const paramWindow = ref(false);
    const submitData = computed(() =>
      reactive({
        code: "",
        region: "",
        paid: false,
        label: "",
        statusSms: []
      })
    );
    const csvData = computed(() =>
      reactive({
        file: null
      })
    );

    const openParamWindow = () => {
      paramWindow.value = !paramWindow.value;
    };

    const openOurWindow = () => {
      ourWindow.value = !ourWindow.value
    };

    const openDeliveryWindow = () => {
      deliveryWindow.value = !deliveryWindow.value
    };
    const deliverySubmit = () => {
      // console.log(submitData.value);
      let sendData = {
        "label": deliveryData.value.label,
        "code": deliveryData.value.code,
        "protocol": deliveryData.value.protocol,
        "ourError": deliveryData.value.ourError
      }
      console.log(sendData)
      const loginUrl = process.env.VUE_APP_BASE_URL + "api/admins/clientError/";
      // commit("auth_request");
      axios
        .post(loginUrl, sendData, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(r => {
          deliveryData.value.label = "";
          deliveryData.value.code = "";
          deliveryData.value.protocol = "";
          deliveryData.value.ourError = "";


          if (r.data) {
            Swal.fire({
              title: "ADD Mapping Response!",
              text: "Success",
              icon: "success"
            });
          }
          store.dispatch("fetchDelivery");
          deliveryWindow.value = false;
        })
        .catch(error => {
          //console.log(error);
          // commit("auth_error");
          // localStorage.removeItem("token");
          // Swal.fire({
          //   title: "TOP UP!",
          //   text: "Gagal",
          //   icon: "warning",
          // });
          // alert(error.message);
        });
    };

    const ourSubmit = () => {
      // console.log(submitData.value);
      let sendData = {
        "label": ourData.value.label,
        "code": ourData.value.code,
        "statusSms": [],
        "dlr": ourData.value.dlr
      }
      ourData.value.statusSms.forEach(element => {
        if (element.check == true) {
          // console.log(element.check)
          sendData.statusSms.push(element._id)
        }
      });
      console.log(sendData)
      const loginUrl = process.env.VUE_APP_BASE_URL + "api/admins/ourError/";
      // commit("auth_request");
      axios
        .post(loginUrl, sendData, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(r => {
          ourData.value.label = "";
          ourData.value.code = "";

          if (r.data) {
            Swal.fire({
              title: "ADD Status Delivery Response!",
              text: "Success",
              icon: "success"
            });
          }
          store.dispatch("fetchOur");
          ourWindow.value = false;
        })
        .catch(error => {
          //console.log(error);
          // commit("auth_error");
          // localStorage.removeItem("token");
          // Swal.fire({
          //   title: "TOP UP!",
          //   text: "Gagal",
          //   icon: "warning",
          // });
          // alert(error.message);
        });
    };

    const postSubmit = () => {
      // console.log(submitData.value);
      let sendData = {
        "label": submitData.value.label,
        "code": submitData.value.code,
        "paid": submitData.value.paid,
        "statusSms": []
      }
      submitData.value.statusSms.forEach(element => {
        if (element.check == true) {
          // console.log(element.check)
          sendData.statusSms.push(element._id)
        }
      });
      console.log(sendData)
      const loginUrl = process.env.VUE_APP_BASE_URL + "api/admins/submitError/";
      // commit("auth_request");
      axios
        .post(loginUrl, sendData, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(r => {
          submitData.value.label = "";
          submitData.value.code = "";

          if (r.data) {
            Swal.fire({
              title: "ADD SMS Response!",
              text: "Success",
              icon: "success"
            });
          }
          store.dispatch("fetchSubmit");
          paramWindow.value = false;
        })
        .catch(error => {
          //console.log(error);
          // commit("auth_error");
          // localStorage.removeItem("token");
          // Swal.fire({
          //   title: "TOP UP!",
          //   text: "Gagal",
          //   icon: "warning",
          // });
          // alert(error.message);
        });
    };
    const uploadCsv = () => {
      //console.log('upload')
      //console.log(csvData.value)
      const loginUrl = process.env.VUE_APP_BASE_URL + "api/operators/bulkCountries/";
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
              title: "ADD Bulk Country!!",
              text: "Success",
              icon: "success"
            });
          }
          store.dispatch("fetchCountrys");
          paramWindow.value = false;
        })
        .catch(error => {
          //console.log(error);
          // commit("auth_error");
          // localStorage.removeItem("token");
          Swal.fire({
            title: "ADD Bulk Country!!",
            text: error.response.data.message,
            icon: "warning"
          });
          // alert(error.message);
        });
    }
    const fillChartData = () => {
      chartData.value = chartConfig.sampleChartData();
    };

    onMounted(async () => {
      fillChartData();
      const peot = await store.dispatch("fetchProtocol");
      const res = await store.dispatch("fetchStatusSms");
      const our = await store.dispatch("fetchOur")
      res.forEach(element => {
        element.check = false
        submitData.value.statusSms.push(element)
        ourData.value.statusSms.push(element)
      });
      console.log(our, "our")
      console.log(res, "status")


    });

    return {
      titleStack,
      chartData,
      fillChartData,
      paramWindow,
      openParamWindow,
      openOurWindow,
      openDeliveryWindow,
      ourWindow,
      ourData,
      deliveryWindow,
      deliverySubmit,
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
      postSubmit,
      ourSubmit,
      deliverySubmit,
      submitData,
      uploadCsv,
      deliveryData,
      csvData
    };
  }
};
</script>
