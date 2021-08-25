<template>
  <modal-box v-model="paramWindow" title="Set Parameter">
    <field label="Tipe Account">
      <control
        v-model="userData.akun"
        name="akun"
        required
        autocomplete="akun"
      />
    </field>

    <field label="Prize">
      <control
        v-model="userData.prize"
        name="prize"
        required
        autocomplete="prize"
      />
    </field>

    <field label="Tax">
      <control v-model="userData.tax" name="tax" required autocomplete="tax" />
    </field>

    <field label="Supplier">
      <control
        v-model="userData.supplier"
        name="supplier"
        required
        autocomplete="supplier"
      />
    </field>

    <field label="Operator">
      <control
        v-model="userData.operator"
        name="operator"
        required
        autocomplete="operator"
      />
    </field>
  </modal-box>
  <title-bar :title-stack="titleStack" />
  <hero-bar class="mb-5">Settings</hero-bar>

  <div id="prize">
    <hero-bar param :paramFunction="openParamWindow" search>Prize</hero-bar>

    <main-section>
      <card-component has-table>
        <prize-table checkable />
      </card-component>
    </main-section>
  </div>

  <!-- <hero-bar search>Users</hero-bar>

  <main-section>
    <card-component has-table>
      <users-table checkable />
    </card-component>
  </main-section> -->
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
import PrizeTable from "@/components/PrizeTable";
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
    PrizeTable,
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
    const titleStack = ref(["Country", "Settings"]);

    const chartData = ref(null);

    const paramWindow = ref(false);

    const openParamWindow = () => {
      paramWindow.value = !paramWindow.value;
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
      mdiCellphoneText,
      mdiCellphoneMessage,
      mdiChartTimelineVariant,
      mdiPencilBoxOutline,
      mdiFinance,
      mdiMonitorCellphone,
      mdiReload,
      mdiTrashCan,
      mdiGithub,
      userData: {
        akun: "",
        prize: "",
        tax: "",
        supplier: "",
        operator: ""
      }
    };
  }
};
</script>
