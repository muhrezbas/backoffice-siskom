<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Dashboard</hero-bar>
  <main-section>
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
      <card-widget
        class="tile"
        color="text-blue-500"
        :icon="mdiCellphoneMessage"
        :number="512"
        label="Number of SMS"
      />
      <card-widget
        class="tile"
        color="text-yellow-500"
        :icon="mdiMessageProcessing"
        :number="7770"
        label="SMS Delivered"
      />
      <card-widget
        class="tile"
        color="text-purple-500"
        :icon="mdiBullhornOutline"
        :number="256"
        label="SMS Blast"
      />
      <card-widget
        class="tile"
        color="text-green-500"
        :icon="mdiCellphoneKey"
        :number="256"
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
      <div v-if="chartData">
        <line-chart :data="chartData" class="h-96" />
      </div>
    </card-component>
    <!-- <title-bar :title-stack="titleStack" /> -->
    <hero-bar :control="true">Customer SMS Details List</hero-bar>
    <main-section>
      <card-component has-table>
        <sms-table checkable />
      </card-component>
    </main-section>

    <!-- <notification color="info" :icon="mdiMonitorCellphone">
      <b>Responsive table.</b> Collapses on mobile
    </notification> -->

    <!-- <card-component :icon="mdiMonitorCellphone" title="Responsive table" has-table>
      <clients-table />
    </card-component> -->
  </main-section>
</template>

<script>
/* eslint-disable */
// @ is an alias to /src
import { ref, onMounted } from "vue";
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
    TitleBar
    // JbButton
  },
  setup() {
    const titleStack = ref(["Admin", "Dashboard"]);

    const chartData = ref(null);

    const fillChartData = () => {
      chartData.value = chartConfig.sampleChartData();
    };

    const tkn = () => {
      var base64Url = localStorage.getItem("token").split(".")[1];
      console.log(JSON.parse(window.atob(base64Url)));
    };

    onMounted(() => {
      fillChartData();
      tkn();
    });

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
