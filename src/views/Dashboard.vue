<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Dashboard</hero-bar>
  <main-section>
    <select
      style="width:150px; margin-right: 25px"
      v-model="userData.filterTime"
      class="w-full"
    >
      <option
        v-for="option in [
          { name: '12 Minutes', value: 1 },
          { name: '1 Hour', value: 5 },
          { name: '6 Hour', value: 30 },
          { name: '12 Hour', value: 60 },
          { name: '1 Days', value: 120 },
          { name: '7 days', value: 10080 },
          { name: '28 days', value: 40320 },
          { name: 'All Time', value: 'alltime' }
        ]"
        :key="option"
        :value="option.value"
        >{{ option.name }}</option
      >
    </select>
    <jb-button
      class="mr-3"
      color="info"
      :icon="mdiSearchWeb"
      small
      @click="filter(perPage)"
    />
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
      <card-widget
        class="tile"
        color="text-blue-500"
        :icon="mdiCellphoneMessage"
        :number="sms.length"
        label="Number of SMS"
      />
      <card-widget
        class="tile"
        color="text-yellow-500"
        :icon="mdiCheckboxMarked"
        :number="
          sms.filter(
            el =>
              el.statusSms !== undefined &&
              el.prize !== null &&
              el.statusSms.code == 0
          ).length
        "
        label="SMS Delivered"
      />
      <card-widget
        class="tile"
        color="text-purple-500"
        :icon="mdiFlash"
        :number="
          sms.filter(
            el =>
              el.statusSms !== undefined &&
              el.prize !== null &&
              el.statusSms.code == 0 &&
              el.prize.akun == 'reguler'
          ).length
        "
        label="SMS Blast"
      />
      <card-widget
        class="tile"
        color="text-green-500"
        :icon="mdiChartTimelineVariant"
        :number="
          sms.filter(
            el =>
              el.statusSms !== undefined &&
              el.prize !== null &&
              el.statusSms.code == 0 &&
              el.prize.akun == 'premium'
          ).length
        "
        label="OTP"
      />
      <card-widget
        class="tile"
        color="text-red-500"
        :icon="mdiChartTimelineVariant"
        :number="
          sms.filter(
            el =>
              (el.statusSms !== undefined &&
                el.prize !== null &&
                el.statusSms.code !== 0) ||
              el.statusSms == undefined
          ).length
        "
        label="NOT SENT"
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

    <hero-bar v-if="$store.state.errorAccess == false" :control="true"
      >Customer SMS Details List</hero-bar
    >
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
import { computed, ref, onMounted, reactive } from "vue";
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
  mdiEye,
  mdiSearchWeb,
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
import JbButtons from "@/components/JbButtons";
import JbButton from "@/components/JbButton";

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
    JbButton,
    HeroBar,
    JbButtons,
    TitleBar,
    ErrorAccess
    // JbButton
  },
  // computed: {
  //   sms() {
  //     return this.$store.state.sms;
  //   }
  // },

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
    const userData = computed(() =>
      reactive({
        toTime: new Date(-8640000000000000),
        filterTime: "alltime"
        // smsBlast : sms.value.filter(el => el.prize !== null && el.statusSms !== undefined && el.prize.akun == "reguler" && el.statusSms.code == 0)
      })
    );
    // const toTime = new Date(-8640000000000000);;
    // console.log(toTime.getTime(), "to Time")

    const titleStack = ref(["Admin", "Dashboard"]);
    const sms = computed(() =>
      store.state.sms.filter(admin => {
        return (
          new Date(admin.createdAt).getTime() >=
            userData.value.toTime.getTime() &&
          new Date(admin.createdAt).getTime() <= new Date()
        );
      })
    );
    console.log(sms.value, "tester");

    const filter = payload => {
      if (userData.value.filterTime == "alltime") {
        userData.value.toTime = new Date(-8640000000000000);
      } else {
        console.log(payload, "tesr");
        var d = new Date();

        userData.value.toTime = new Date(
          d.setMinutes(d.getMinutes() - userData.value.filterTime)
        );
        console.log(userData.value.toTime);
      }
    };

    const chartData = ref(null);
    const chartColors = {
      default: {
        primary: "#00D1B2",
        info: "purple",
        yellow: "yellow",
        blue: "blue",
        red: "red"
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
    const sampleChartData = (points = 12) => {
      const labels = declareLabelRange();

      // for (let i = 1; i <= points; i++) {
      //   labels.push(`${i}`);
      // }

      return {
        labels,
        datasets: [
          datasetObject(
            "primary",
            sms.value.filter(
              el =>
                el.prize !== null &&
                el.statusSms !== null &&
                el.prize.akun == "premium"
            ),
            labels
          ),
          datasetObject(
            "info",
            sms.value.filter(
              el =>
                el.prize !== null &&
                el.statusSms !== undefined &&
                el.prize.akun == "reguler" &&
                el.statusSms.code == 0
            ),
            labels
          ),
          datasetObject("blue", sms.value, labels),
          datasetObject(
            "yellow",
            sms.value.filter(
              el => el.statusSms !== undefined && el.statusSms.code == 0
            ),
            labels
          ),
          datasetObject(
            "red",
            sms.value.filter(
              el =>
                (el.statusSms !== undefined &&
                  el.prize !== undefined &&
                  el.statusSms.code !== 0) ||
                el.statusSms == undefined
            ),
            labels
          )
          // datasetObject('danger', points)
        ]
      };
    };

    const fillChartData = () => {
      chartData.value = sampleChartData();
    };

    const todayHours = val => {
      let days = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu"
      ];
      let today = new Date(Date.now() - 1000 * (60 * val));
      let currentDay = days[today.getDay()];
      let currentHours = ("0" + today.getHours()).slice(-2);
      let currentMinutes = ("0" + today.getMinutes()).slice(-2);
      let formattedDate =
        currentDay + ", " + currentHours + ":" + currentMinutes;
      return formattedDate;
    };

    const todayDays = val => {
      let days = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu"
      ];
      let months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      let today = new Date(Date.now() - 1000 * (60 * val));
      let currentDay = days[today.getDay()];
      let currentMonth = months[today.getMonth()];
      let formattedDate =
        currentDay + ", " + today.getDate() + " " + currentMonth;
      return formattedDate;
    };

    const chartLabelHours = interval => {
      let data = [];
      let counter = 0;
      for (let i = 0; i < 12; i++) {
        data[i] = todayHours(counter);
        counter += interval;
      }
      return data.reverse();
    };

    const chartLabelDays = interval => {
      let data = [];
      let counter = 0;
      for (let i = 0; i < 12; i++) {
        data[i] = todayDays(counter);
        counter += interval;
      }
      return data.reverse();
    };

    const declareLabelRange = () => {
      switch (userData.value.filterTime) {
        case 1:
          return chartLabelHours(1);
        case 5:
          return chartLabelHours(5);
        case 30:
          return chartLabelHours(30);
        case 60:
          return chartLabelHours(60);
        case 120:
          return chartLabelHours(120);
        case 10080:
          return chartLabelDays(10080);
        case 40320:
          return chartLabelDays(40320);
        default:
          return [
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
      }
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
      sms,
      mdiCheckboxMarked,
      mdiChartTimelineVariant,
      filter,
      mdiEye,
      mdiFinance,
      mdiCellphoneMessage,
      mdiMonitorCellphone,
      mdiSearchWeb,
      mdiMessageProcessing,
      mdiCellphoneKey,
      userData,
      mdiBullhornOutline,
      mdiReload,
      mdiFlash,
      mdiGithub
    };
  }
};
</script>
