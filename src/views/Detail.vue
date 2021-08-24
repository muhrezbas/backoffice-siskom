<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Profile</hero-bar>
  <main-section>
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 w-full mb-6">
      <card-component>
        <table class="table-auto w-full">
          <tbody class="text-xl" v-if="this.client.companyName !== undefined">
            <tr>
              <td>Company Name</td>
              <td>
                {{ this.client.companyName }}
              </td>
            </tr>
            <tr></tr>
            <tr>
              <td class="">Username</td>
              <td>
                {{ this.client.companyName }}
              </td>
            </tr>
            <tr></tr>
            <tr>
              <td class="">Company Address</td>
              <td>
                {{ this.client.companyAddress }}
              </td>
            </tr>
            <tr></tr>
            <tr>
              <td class="">First Priority Supplier</td>
              <td>
                {{ this.client.priority[0].supplier }}
              </td>
            </tr>
            <tr></tr>
            <tr>
              <td class="">Priority</td>
              <td>
                <div
                  v-for="priority in this.client.priority"
                  v-bind:key="priority._id"
                >
                  {{ priority.supplier }}
                </div>
              </td>
            </tr>
            <tr></tr>
            <tr>
              <td class="">Name PIC</td>
              <td>
                {{ this.client.namePic }}
              </td>
            </tr>
            <tr></tr>
            <tr>
              <td class="">Contact PIC</td>
              <td>
                {{ this.client.contactPic }}
              </td>
            </tr>
            <tr></tr>
            <tr>
              <td class="">Finance Email</td>
              <td>
                {{ this.client.financeEmail }}
              </td>
            </tr>
            <tr></tr>
            <tr>
              <td class="">Notification Email</td>
              <td>
                {{ this.client.notifEmail }}
              </td>
            </tr>
            <tr></tr>
            <tr>
              <td class="">WhiteListIp</td>
              <td>
                {{ this.client.whiteListIp }}
              </td>
            </tr>
          </tbody>
        </table>
        <jb-buttons class="mt-5">
          <jb-button @click="goToInvoice" color="info" label="Check Invoice" />
        </jb-buttons>
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
        </div> -->
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
import { mapState } from "vuex";
import {
  mdiAccountMultiple,
  mdiCashMultiple,
  mdiCellphoneText,
  mdiCellphoneMessage,
  mdiChartTimelineVariant,
  mdiFinance,
  mdiMonitorCellphone,
  mdiReload,
  mdiGithub,
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
import JbButtons from "@/components/JbButtons";
import store from "../store";

export default {
  name: "Detail",
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
    JbButtons,
    JbButton,
  },
  computed: {
    ...mapState(["clientOne"]),
    idClient() {
      // We will see what `params` is shortly
      return this.$route.params.id;
    },
    client() {
      return this.$store.state.client;
    },
  },
   methods: {
    goToInvoice(){
      console.log('hello')
       this.$router.push({
          path: `/invoice/${this.idClient}`,
        });
    }
  },
  async created() {
    // console.log(this.$store.state.client, "test");
    await store.dispatch("fetchClient", { id: this.idClient });
    console.log(this.$store.state.client, "naan");
  },

  setup() {
    const titleStack = ref(["Admin", "Detailed"]);

    const chartData = ref(null);

    const fillChartData = () => {
      chartData.value = chartConfig.sampleChartData();
    };

    onMounted(() => {
      // console.log(this.$route, "test");
      fillChartData();
      // console.log(this.$store.state.client, "tessc");
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
      mdiGithub,
    };
  },
};
</script>
