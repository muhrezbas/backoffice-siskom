<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Invoice</hero-bar>
  <modal-box v-model="isModalActive" title="Top Up" :submit="postTopUp">
    <field label="Package">
      <control
        v-model="userData.packages"
        name="package"
        required
        autocomplete="package"
      />
    </field>

    <field label="Credit">
      <control
        v-model="userData.jumlah"
        name="jumlah"
        required
        autocomplete="jumlah"
      />
    </field>

    <field label="Remark">
      <control
        v-model="userData.remark"
        name="remark"
        required
        autocomplete="remark"
      />
    </field>
  </modal-box>

  <main-section>
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
      <card-component mb="">
        <level mobile>
          <div>
            <h3 class="text-lg leading-tight text-gray-500">
              Available balance
            </h3>
            <h1 class="text-3xl leading-tight font-semibold">
              <growing-number
                :value="this.$store.state.saldo"
                :prefix="prefixOne"
                :suffix="suffix"
              />
            </h1>
            <!-- <h1 class="leading-tight font-semibold mt-5">
              <growing-number
                :value="numberTwo"
                :prefix="prefixTwo"
                :suffix="suffix"
              />
            </h1> -->
          </div>
          <div>
            <div class="py-5"></div>
            <div class="py-5"></div>
            <jb-button
              @click="isModalActive = true"
              :icon="icon"
              color="success"
              label="Topup"
            />
          </div>
        </level>
      </card-component>
      <!-- <card-widget-two
        class="tile"
        color="text-green-500"
        :icon="mdiCashMultiple"
        :numberOne="this.$store.state.saldo"
        :numberTwo="280"
        :prefixOne="'Rp '"
        :prefixTwo="'SMS : '"
        label="Available balance"
      /> -->
    </div>
  </main-section>

  <hero-bar search>Transaction History</hero-bar>

  <main-section>
    <card-component has-table>
      <transaction-table
        checkable
        v-if="this.$store.state.transaction.length !== 0"
        :transaksi="this.$store.state.transaction"
      />
    </card-component>
  </main-section>

  <hero-bar search>Topup History</hero-bar>

  <main-section>
    <card-component has-table>
      <topup-table checkable />
    </card-component>
  </main-section>

  <!-- <hero-bar search>Package Listing</hero-bar>

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
  </main-section> -->
</template>

<script>
/* eslint-disable */
// @ is an alias to /src
import { ref, onMounted, computed, reactive } from "vue";
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
import GrowingNumber from "@/components/GrowingNumber";
import Icon from "@/components/Icon";
import Level from "@/components/Level";
import ModalBox from "@/components/ModalBox";
import Field from "@/components/Field";
import Control from "@/components/Control";
import HeroBar from "@/components/HeroBar";
import CardWidget from "@/components/CardWidget";
import CardWidgetTwo from "@/components/CardWidgetTwo";
import CardComponent from "@/components/CardComponent";
import TransactionTable from "@/components/TransactionTable";
import axios from "axios";
import Swal from "sweetalert2";
import TopupTable from "@/components/TopupTable";
import PackageTable from "@/components/PackageTable";
import BillTable from "@/components/BillTable";
// import store from "../store";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import Notification from "@/components/Notification";
import JbButton from "@/components/JbButton";
// console.log(this.$route)
// store.dispatch("fetchSaldo", { id: $route });

export default {
  name: "Invoice",
  components: {
    MainSection,
    TransactionTable,
    TopupTable,
    PackageTable,
    BillTable,
    LineChart,
    ModalBox,
    Field,
    Control,
    CardComponent,
    CardWidget,
    GrowingNumber,
    Icon,
    Level,
    CardWidgetTwo,
    HeroBar,
    TitleBar,
    Notification,
    JbButton,
  },
  computed: {
    idClient() {
      // We will see what `params` is shortly
      return this.$route.params.id;
    },
  },
  async created() {
    // console.log(this.$store.state.client, "test");
    // console.log(this.$store.state.client, "naan");
  },
  // method : {
  //   postTopUp() {
  //     console.log(this.userData)
  //     console.log('fafa')
  //   }
  // },
  setup() {
    // Vue

    // this.$swal("Hello Vue world!!!");
    const store = useStore();
    // console.log(this.$route, "tess")
    const route = useRoute();
    // console.log(route, "fsa");
    const userData = computed(() =>
      reactive({
        packages: "",
        jumlah: "",
        remark: "",
      })
    );
    const postTopUp = () => {
      console.log(userData.packages);
      const loginUrl =
        process.env.VUE_APP_BASE_URL +
        "api/admins/topup/60f28280044dfb5b86c07433/";
      // commit("auth_request");
      axios
        .post(loginUrl, userData.value, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((r) => {
          userData.value.packages = "";
          userData.value.remark = "";
          userData.value.jumlah = "";

          if (r.data) {
            Swal.fire({
              title: "TOP UP!",
              text: "Success",
              icon: "success",
            });
          }
          store.dispatch("fetchSaldo", { id: route.params.id });
          isModalActive.value = false;
        })
        .catch((error) => {
          // commit("auth_error");
          // localStorage.removeItem("token");
          Swal.fire({
            title: "TOP UP!",
            text: "Gagal",
            icon: "warning",
          });
          alert(error.message);
        });
      // paramWindow.value = !paramWindow.value;
    };
    const isModalActive = ref(false);

    const isModalDeleteActive = ref(false);
    store.dispatch("fetchSaldo", { id: route.params.id });
    // console.log(store.state.saldo, "saldo")
    const titleStack = ref(["Admin", "Invoice"]);

    const chartData = ref(null);

    const fillChartData = () => {
      chartData.value = chartConfig.sampleChartData();
    };

    onMounted(() => {
      // new swal("Hello Vue world!!!");
      fillChartData();
    });

    return {
      isModalActive,
      isModalDeleteActive,
      postTopUp,
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
      userData,
      mdiReload,
      mdiGithub,
    };
  },
};
</script>
