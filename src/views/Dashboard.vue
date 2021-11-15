<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Dashboard</hero-bar>
  <main-section>
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
      <card-widget
        class="tile"
        color="text-blue-500"
        :icon="mdiCellphoneMessage"
        :number="$store.state.smsAll"
        label="Number of SMS"
      />
      <card-widget
        class="tile"
        color="text-yellow-500"
        :icon="mdiCheckboxMarked"
        :number="$store.state.deliveredAll"
        label="SMS Delivered"
      />
      <card-widget
        class="tile"
        color="text-purple-500"
        :icon="mdiFlash"
        :number="$store.state.blastAll"
        label="SMS Blast"
      />
      <card-widget
        class="tile"
        color="text-green-500"
        :icon="mdiChartTimelineVariant"
        :number="$store.state.otpAll"
        label="OTP"
      />
    </div>

    <card-component
      title="Performance"
      :icon="mdiFinance"
      :header-icon="mdiReload"
      class="mb-6"
      @header-icon-click="fillChartData"
    >
      <!-- <div v-if="chartData"> -->
      <line-chart :data="chartData" class="h-96" />
      <!-- </div> -->
    </card-component>
    <!-- <title-bar :title-stack="titleStack" /> -->

    <hero-bar v-if="$store.state.errorAccess == false" :control="true">Customer SMS Details List</hero-bar>
    <main-section v-if="$store.state.errorAccess == false">
      <card-component has-table>
        <sms-table v-if="this.sms" :sms="this.sms" checkable />
      </card-component>
    </main-section>

    <error-access v-else />

    <!-- <notification color="info" :icon="mdiMonitorCellphone">
      <b>Responsive table.</b> Collapses on mobile
    </notification>-->

    <!-- <card-component :icon="mdiMonitorCellphone" title="Responsive table" has-table>
      <clients-table />
    </card-component>-->
  </main-section>
</template>

<script>
/* eslint-disable */
// @ is an alias to /src
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import {
  mdiAccountMultiple,
  mdiCheckboxMarked,
  mdiChartTimelineVariant,
  mdiFinance,
  mdiFlash,
  mdiCellphoneMessage,
  mdiMonitorCellphone,
  mdiMessageProcessing,
  mdiCellphoneKey,
  mdiBullhornOutline,
  mdiReload,
  mdiGithub
} from "@mdi/js";
import * as chartConfig from "@/components/Charts/chart.config";
import LineChart from "@/components/Charts/LineChart";
import MainSection from "@/components/MainSection";
import TitleBar from "@/components/TitleBar";
import SmsTable from "@/components/SmsTable";
import HeroBar from "@/components/HeroBar";
import CardWidget from "@/components/CardWidget";
import CardComponent from "@/components/CardComponent";
import ErrorAccess from "../components/ErrorAccess.vue";

// import ClientsTable from '@/components/ClientsTable'
// import JbButton from '@/components/JbButton'

export default {
  name: "Dashboard",
  components: {
    MainSection,
    // ClientsTable,
    LineChart,
    SmsTable,
    CardComponent,
    CardWidget,
    HeroBar,
    TitleBar,
    ErrorAccess
    // JbButton
  },
  computed: {
    sms() {
      return this.$store.state.sms;
    }
  },
  setup() {
    const store = useStore();
    onMounted(async () => {
      await store.dispatch("fetchSms");

      // //console.log(res, "tes");
      // //console.log(this.$route, "test");
      fillChartData();
      tkn();
      //console.log(store.state.sms, "tessc");
      //console.log(store.state.smsAll, "sms All letes");
    });
    //console.log(store.state.sms, "dapetkan");
    //console.log(store.state.smsAll, "sms All");
    const titleStack = ref(["Admin", "Dashboard"]);

    const chartData = ref(null);
    const chartColors = {
      default: {
        primary: "#00D1B2",
        info: "purple",
        yellow: "yellow",
        blue: "blue"
        // danger: '#FF3860'
      }
    };

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
            store.state.sms.filter(el => el.prize !== null && el.statusSms !== null && el.prize.akun == "premium"),
            labels
          ),
          datasetObject(
            "info",
            store.state.sms.filter(
              el => el.prize !== null && el.statusSms !== null && el.prize.akun == "reguler" && el.statusSms.code == 0
            ),
            labels
          ),
          datasetObject("blue", store.state.sms, labels),
          datasetObject(
            "yellow",
            store.state.sms.filter(el => el.statusSms !== null && el.statusSms.code == 0),
            labels
          )
          // datasetObject('danger', points)
        ]
      };
    };

    const fillChartData = () => {
      chartData.value = sampleChartData();
    };
    const tkn = () => {
      var base64Url = localStorage.getItem("token").split(".")[1];
      //console.log(JSON.parse(window.atob(base64Url)));
    };
    //console.log(chartData, "chart");
    //console.log(fillChartData, "fill");

    return {
      titleStack,
      chartData,
      fillChartData,
      tkn,
      mdiAccountMultiple,
      mdiCheckboxMarked,
      mdiChartTimelineVariant,
      mdiFinance,
      mdiCellphoneMessage,
      mdiMonitorCellphone,
      mdiMessageProcessing,
      mdiCellphoneKey,
      mdiBullhornOutline,
      mdiReload,
      mdiFlash,
      mdiGithub
    };
  }
};
</script>
