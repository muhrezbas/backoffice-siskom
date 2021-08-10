<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Invoice</hero-bar>
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
  </main-section>

  <hero-bar search>Transaction History</hero-bar>

  <main-section>
    <card-component has-table>
      <transaction-table checkable />
    </card-component>
  </main-section>

  <hero-bar search>Topup History</hero-bar>

  <main-section>
    <card-component has-table>
      <topup-table checkable />
    </card-component>
  </main-section>

  <hero-bar search>Package Listing</hero-bar>

  <main-section>
    <card-component has-table>
      <package-table checkable />
    </card-component>
  </main-section>

  <hero-bar search>Total Monthly Bill</hero-bar>

  <main-section>
    <card-component has-table>
      <bill-table checkable />
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
import TransactionTable from "@/components/TransactionTable";
import TopupTable from "@/components/TopupTable";
import PackageTable from "@/components/PackageTable";
import BillTable from "@/components/BillTable";
import Notification from "@/components/Notification";
import JbButton from "@/components/JbButton";

export default {
  name: "Invoice",
  components: {
    MainSection,
    TransactionTable,
    TopupTable,
    PackageTable,
    BillTable,
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
    const titleStack = ref(["Admin", "Invoice"]);

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
