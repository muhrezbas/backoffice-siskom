<template>
  <div class="clientDashboard">
    <title-bar :title-stack="titleStack" />
    <hero-bar>Profile</hero-bar>
    <main-section>
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 w-full mb-6">
        <card-component>
          <table class="table-auto w-full">
            <tbody class="text-xl" v-if="this.client.companyName !== undefined">
              <tr>
                <td>Company Name</td>
                <td>{{ this.client.companyName }}</td>
              </tr>
              <tr></tr>
              <tr>
                <td class>Username</td>
                <td>{{ this.client.companyName }}</td>
              </tr>
              <tr></tr>
              <tr>
                <td class>Company Address</td>
                <td>{{ this.client.companyAddress }}</td>
              </tr>
              <tr></tr>
              <tr>
                <td class>Name PIC</td>
                <td>{{ this.client.namePic }}</td>
              </tr>
              <tr></tr>
              <tr>
                <td class>Contact PIC</td>
                <td>{{ this.client.contactPic }}</td>
              </tr>
              <tr></tr>
              <tr>
                <td class>Finance Email</td>
                <td>{{ this.client.financeEmail }}</td>
              </tr>
              <tr></tr>
              <tr>
                <td class>Notification Email</td>
                <td>{{ this.client.notifEmail }}</td>
              </tr>
              <tr></tr>
              <tr>
                <td class>WhiteListIp</td>
                <td>{{ this.client.whiteListIp }}</td>
              </tr>
            </tbody>
          </table>
          <div class="flex flex-wrap -mx-3 mb-6">
            <jb-buttons class="mt-8 ml-3">
              <jb-button
                @click="goToInvoice"
                color="info"
                label="Check Invoice"
              />
            </jb-buttons>
          </div>

          <!-- <div class="mt-4 text-xl font-bold">
          {{ this.$store.state.client.companyName }}
        </div>
        <div class="mt-1 text-xl">{{ this.$store.state.client.username }}</div>
        <div class="mt-1 text-gray-500">
          {{ this.$store.state.client.companyAddress }}
        </div>
        <div class="mt-1 text-xl">
          Protocol first priority :
          {{ this.$store.state.client.protocol.supplier }}
        </div>-->
        </card-component>
        <div>
          <card-component
            title="Performance"
            :icon="mdiFinance"
            :header-icon="mdiReload"
            class="mb-6"
            @header-icon-click="fillChartData"
          >
            <div v-if="chartData">
              <line-chart :data="chartData" class="h-96" />
            </div>
          </card-component>
          <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <card-widget
              class="tile"
              color="text-blue-500"
              :icon="mdiCellphoneMessage"
              :number="this.$store.state.blast"
              label="SMS Blast Delivered"
            />
            <card-widget
              class="tile"
              color="text-blue-500"
              :icon="mdiCellphoneText"
              :number="this.$store.state.otp"
              label="OTP Delivered"
            />
          </div>
        </div>
      </div>
    </main-section>

    <hero-bar :control="true">History</hero-bar>

    <main-section>
      <card-component has-table>
        <sms-table v-if="this.sms" :sms="this.sms" checkable />
      </card-component>
    </main-section>
  </div>
</template>

<style>
@media screen and (min-width: 1280px) {
  .clientDashboard {
    margin-left: -15rem !important;
  }
}
.clientDashboard {
  margin-left: 0;
}
</style>

<script>
/* eslint-disable */
// @ is an alias to /src
import { useRoute } from "vue-router";
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
  mdiReload,
  mdiGithub
} from "@mdi/js";
import * as chartConfig from "@/components/Charts/chart.config";
import LineChart from "@/components/Charts/LineChart";
import MainSection from "@/components/MainSection";
import TitleBar from "@/components/TitleBar";
import HeroBar from "@/components/HeroBar";
import Field from "@/components/Field";
import Control from "@/components/Control";
import CardWidget from "@/components/CardWidget";
import ModalBox from "@/components/ModalBox";
import CardWidgetTwo from "@/components/CardWidgetTwo";
import CardComponent from "@/components/CardComponent";
import SmsTable from "@/components/SmsTable";
import Notification from "@/components/Notification";
import JbButton from "@/components/JbButton";
import JbButtons from "@/components/JbButtons";
import store from "../store";

export default {
  name: "Detail",
  components: {
    MainSection,
    SmsTable,
    LineChart,
    CardComponent,
    ModalBox,
    Field,
    Control,
    CardWidget,
    CardWidgetTwo,
    HeroBar,
    TitleBar,
    Notification,
    JbButtons,
    JbButton
  },
  computed: {
    idClient() {
      // We will see what `params` is shortly
      return this.$route.params.id;
    },
    client() {
      return this.$store.state.client;
    },
    sms() {
      return this.$store.state.smsClient;
    }
  },
  methods: {
    goToInvoice() {
      //console.log("hello");
      this.$router.push({
        path: `/invoice/${this.idClient}`
      });
    }
  },
  async created() {
    // //console.log(this.$store.state.client, "test");
    await store.dispatch("fetchClient", { id: this.idClient });
    // await store.dispatch("fetchSmsClient", { id: this.idClient });

    //console.log(this.$store.state.client, "naan");
    // //console.log(this.$store.state.smsClient, "naan");
  },

  setup() {
    const store = useStore();
    const route = useRoute();
    //console.log(route.params.id);
    const paramWindow = ref(false);

    const openParamWindow = () => {
      paramWindow.value = !paramWindow.value;
      let test = [];
      store.state.client.priority.forEach(element => {
        test.push(element._id);
      });
      //console.log(test, "priotriy");
      userData.value.priority = test;
      userData.value.namePic = store.state.client.namePic;
      userData.value.companyName = store.state.client.companyName;
      userData.value.companyNumber = store.state.client.companyNumber;
      userData.value.companyAddress = store.state.client.companyAddress;
      userData.value.username = store.state.client.username;
      userData.value.contactPic = store.state.client.contactPic;
      userData.value.whiteListIp = store.state.client.whiteListIp;
      userData.value.notifEmail = store.state.client.notifEmail;
      userData.value.financeEmail = store.state.client.financeEmail;
    };
    const putClient = () => {
      function hasDuplicates(arr) {
        return arr.some(x => arr.indexOf(x) !== arr.lastIndexOf(x));
      }
      if (hasDuplicates(userData.value.priority)) {
        //console.log("Duplicate elements found.");
        Swal.fire({
          title: "ADD Client!",
          text: "Terdapat duplikat di priority",
          icon: "warning"
        });
      } else {
        const loginUrl =
          process.env.VUE_APP_BASE_URL +
          "api/users/editClient/" +
          route.params.id +
          "/";
        // commit("auth_request");
        //console.log(userData.value);
        axios
          .put(loginUrl, userData.value, {
            headers: {
              token: localStorage.getItem("token")
            }
          })
          .then(r => {
            if (r.data) {
              Swal.fire({
                title: "EDIT Client!",
                text: "Success",
                icon: "success"
              });
            }
            store.dispatch("fetchClient", { id: route.params.id });
            paramWindow.value = false;
          })
          .catch(error => {
            //console.log(error.response.data.message);
            // commit("auth_error");
            // localStorage.removeItem("token");
            Swal.fire({
              title: "EDIT Client!",
              text: error.response.data.message,
              icon: "warning"
            });
            // alert(error.message);
          });
      }
    };
    onMounted(async () => {
      const res = await store.dispatch("fetchSmsClient", {
        id: route.params.id
      });
      await store.dispatch("fetchProtocol");

      //console.log(res, "tes");
      // //console.log(this.$route, "test");
      fillChartData();
      // //console.log(this.$store.state.client, "tessc");
    });

    const titleStack = ref(["User", "Detailed"]);

    const chartData = ref(null);
    const chartColors = {
      default: {
        primary: "#00D1B2",
        info: "#209CEE"
        // danger: '#FF3860'
      }
    };
    const userData = computed(() =>
      reactive({
        priority: [],
        username: "",
        companyName: "",
        companyNumber: "",
        companyAddress: "",
        namePic: "",
        contactPic: "",
        whiteListIp: "",
        financeEmail: "",
        notifEmail: ""
      })
    );

    const randomChartData = (n, l) => {
      const data = [];
      const thisYear = new Date().getYear();
      //console.log(thisYear, "tessss");
      //console.log(n, "nanfka");

      for (let i = 0; i < l.length; i++) {
        console.log(
          n.filter(
            el =>
              new Date(el.createdAt).getMonth() == i &&
              new Date(el.createdAt).getYear() == thisYear
          )
        ),
          "AH";
        data.push(
          n.filter(
            el =>
              new Date(el.createdAt).getMonth() == i &&
              new Date(el.createdAt).getYear() == thisYear
          ).length
        );
        // data.push(Math.round(Math.random() * 200));
      }

      return data;
    };

    const datasetObject = (color, points, labels) => {
      return {
        fill: false,
        borderColor: chartColors.default[color],
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: chartColors.default[color],
        pointBorderColor: "rgba(255,255,255,0)",
        pointHoverBackgroundColor: chartColors.default[color],
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
        data: randomChartData(points, labels),
        tension: 0.5,
        cubicInterpolationMode: "default"
      };
    };
    console.log(
      store.state.smsClient.filter(el => el.prize.akun == "premium"),
      "client prem"
    );
    console.log(
      store.state.smsClient.filter(el => el.prize.akun == "reguler"),
      "client reg"
    );
    const sampleChartData = (points = 12) => {
      const labels = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "Novermber",
        "Desember"
      ];

      // for (let i = 1; i <= points; i++) {
      //   labels.push(`${i}`);
      // }

      return {
        labels,
        datasets: [
          datasetObject(
            "primary",
            store.state.smsClient.filter(el => el.prize.akun == "premium"),
            labels
          ),
          datasetObject(
            "info",
            store.state.smsClient.filter(el => el.prize.akun == "reguler"),
            labels
          )
          // datasetObject('danger', points)
        ]
      };
    };

    const fillChartData = () => {
      chartData.value = sampleChartData();
    };
    //console.log(chartData);
    //console.log(fillChartData);

    return {
      titleStack,
      chartData,
      fillChartData,
      mdiAccountMultiple,
      mdiCashMultiple,
      mdiCellphoneText,
      mdiCellphoneMessage,
      mdiChartTimelineVariant,
      mdiFinance,
      paramWindow,
      openParamWindow,
      mdiMonitorCellphone,
      putClient,
      mdiReload,
      mdiGithub,
      userData
    };
  }
};
</script>
