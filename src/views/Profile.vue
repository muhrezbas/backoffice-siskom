<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Profile</hero-bar>
  <main-section>
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
      <card-widget-two
        class="tile"
        color="text-green-500"
        :icon="mdiCashMultiple"
        :numberOne="280000"
        :numberTwo="280"
        :prefixOne="'Rp '"
        :prefixTwo="'SMS : '"
        label="Available balance"
      />
    </div>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
      <card-component class="h-full flex items-center">
        <img
          src="https://www.freepnglogos.com/uploads/zara-brand/clothing-brand-zara-hd-zara-logo-2020-3.jpg"
        />
        <div class="mt-4 text-xl font-bold">
          Zara
        </div>
        <div class="mt-1 text-base">
          Fashion Cloth
        </div>
        <div class="mt-6 text-gray-500">
          Zara adalah salah satu merek yg berasal dari Spanyol dan bermarkas di
          Arteixo, Gallicia. Zara didirikan pada tahun 1975 oleh Armancio Ortega
          dan Rosallia mera...
        </div>
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
            :number="1300"
            label="SMS Blast Delivered"
          />
          <card-widget
            class="tile"
            color="text-blue-500"
            :icon="mdiCellphoneText"
            :number="2300"
            label="OTP Delivered"
          />
        </div>
      </div>
    </div>
  </main-section>

  <hero-bar :control="true">History</hero-bar>

  <main-section>
    <card-component has-table>
      <sms-table checkable />
    </card-component>
  </main-section>
</template>

<script>
/* eslint-disable */
// @ is an alias to /src
import { ref, onMounted } from "vue";
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
import CardWidget from "@/components/CardWidget";
import CardWidgetTwo from "@/components/CardWidgetTwo";
import CardComponent from "@/components/CardComponent";
import SmsTable from "@/components/SmsTable";
import Notification from "@/components/Notification";
import JbButton from "@/components/JbButton";

export default {
  name: "Profile",
  components: {
    MainSection,
    SmsTable,
    LineChart,
    CardComponent,
    CardWidget,
    CardWidgetTwo,
    HeroBar,
    TitleBar,
    Notification,
    JbButton
  },
  setup() {
    const titleStack = ref(["Admin", "Profile"]);

    const chartData = ref(null);

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
      mdiAccountMultiple,
      mdiCashMultiple,
      mdiCellphoneText,
      mdiCellphoneMessage,
      mdiChartTimelineVariant,
      mdiFinance,
      mdiMonitorCellphone,
      mdiReload,
      mdiGithub
    };
  }
};
</script>
