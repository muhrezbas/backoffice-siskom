<template>
  <modal-box v-model="paramWindow" title="Set Parameter">
    <field label="Group">
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
    </field>
  </modal-box>
  <title-bar :title-stack="titleStack" />
  <hero-bar class="mb-5">Settings</hero-bar>

  <div id="admin">
    <hero-bar param :paramFunction="openParamWindow" search>Admin</hero-bar>

    <main-section>
      <card-component has-table>
        <admin-table checkable />
      </card-component>
    </main-section>
  </div>

  <div id="operator">
    <hero-bar param :paramFunction="openParamWindow" search>Operator</hero-bar>

    <main-section>
      <card-component has-table>
        <admin-table checkable />
      </card-component>
    </main-section>
  </div>

  <div id="country">
    <hero-bar param :paramFunction="openParamWindow" search>Country</hero-bar>

    <main-section>
      <card-component has-table>
        <admin-table checkable />
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
    const titleStack = ref(["Admin", "Settings"]);

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
        name: "",
        admin_id: "",
        gender: "",
        phone: "",
        email: "",
        division: ""
      }
    };
  }
};
</script>
