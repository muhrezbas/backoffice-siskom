<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar search>SMS Detail List</hero-bar>
  <main-section>
    <card-component has-table>
      <sms-table v-if="this.sms" :sms="this.sms" checkable />
    </card-component>
  </main-section>
</template>

<script>
/* eslint-disable */
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import {
  mdiMonitorCellphone,
  mdiAccountMultiple,
  mdiTableBorder,
  mdiTableOff,
} from "@mdi/js";
import MainSection from "@/components/MainSection";
import SmsTable from "@/components/SmsTable";
import CardComponent from "@/components/CardComponent";
import TitleBar from "@/components/TitleBar";
import HeroBar from "@/components/HeroBar";

export default {
  name: "SMS Detail",
  components: {
    MainSection,
    HeroBar,
    TitleBar,
    CardComponent,
    SmsTable,
  },
  setup() {
    const store = useStore();

    const sms = computed(() => store.state.sms);
    console.log(sms, "smssss");
    const titleStack = ref(["Admin", "SMS Detail"]);
    onMounted(async () => {
      // fillChartData();
      await store.dispatch("fetchSms");
    });

    return {
      titleStack,
      mdiMonitorCellphone,
      sms,
      mdiAccountMultiple,
      mdiTableBorder,
      mdiTableOff,
    };
  },
};
</script>
