<template>
  <modal-box v-model="paramWindow" title="Set Parameter" :submit="putClient">
    <field label="Blend" wrap-body>
      <check-radio-picker
        name="sample-radio"
        type="radio"
        v-model="userData.blending"
        :options="{ true: 'Yes', false: 'No' }"
      ></check-radio-picker>
    </field>
    <field label="Drop" wrap-body>
      <check-radio-picker
        name="radio"
        type="radio"
        v-model="userData.droping"
        :options="{ true: 'Yes', false: 'No' }"
      ></check-radio-picker>
    </field>
    <div class="overflow-y-auto overflow-x-hidden max-h-paramMobile md:max-h-paramDesktop">
      <div class="flex flex-wrap -mx-3 mb-6">
        <field label="Username" class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <control v-model="userData.username" name="prize" required autocomplete="prize" />
        </field>

        <field label="Company Name" class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <control v-model="userData.companyName" name="prize" required autocomplete="prize" />
        </field>
      </div>

      <div class="flex flex-wrap -mx-3 mb-6">
        <field label="Company Phone Number" class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <control v-model="userData.companyNumber" name="prize" required autocomplete="prize" />
        </field>

        <field label="Company Address" class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <control v-model="userData.companyAddress" name="prize" required autocomplete="prize" />
        </field>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <field label="Name PIC" class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <control v-model="userData.namePic" name="prize" required autocomplete="prize" />
        </field>

        <field label="Contact PIC" class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <control v-model="userData.contactPic" name="prize" required autocomplete="prize" />
        </field>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <field label="Whitelist IP" class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <control v-model="userData.whiteListIp" name="prize" required autocomplete="prize" />
        </field>

        <field label="Finance Email" class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <control v-model="userData.financeEmail" name="prize" required autocomplete="prize" />
        </field>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <field label="Notification Email" class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <control v-model="userData.notifEmail" name="prize" required autocomplete="prize" />
        </field>

        <!-- <field label="Password" class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <control v-model="userData.password" name="prize" required autocomplete="prize" />
        </field>-->
      </div>

      <field label="Priority of Protocol by Operators" v-if="userData.blending == 'false'">
        <div v-for="oper in $store.state.operator" :key="oper._id ?? oper">
          <div>
            <p class="mb-2 mt-2">{{ oper.name }} :</p>
            {{ userData.operators[oper._id][index] }}
            <select
              v-model="userData.operators[oper._id][index]"
              class="w-1/4 mb-2 ml-1"
              v-for="(deta, index) in $store.state.protocol"
              :key="index"
            >
              <option
                v-for="option in $store.state.protocol"
                :key="option._id ?? option"
                :value="option._id"
              >{{ option.supplier ?? option }}</option>
            </select>
          </div>
        </div>
      </field>

      <field
        v-if="userData.blending == 'true' && userData.droping == 'true'"
        label="Quantity Drop"
        class="w-full md:w-1/2 px-3 mb-6 md:mb-0"
      >
        <control v-model="userData.drop" name="drop" required autocomplete="drop" />
      </field>
      <field
        v-if="userData.blending == 'true' && userData.droping == 'true'"
        label="Start Drop"
        class="w-full md:w-1/2 px-3 mb-6 md:mb-0"
      >
        <control v-model="userData.startDrop" name="start drop" required autocomplete="start drop" />
      </field>
      <div v-if="userData.blending == 'true'">
        <jb-buttons type="justify-start lg:justify-end" no-wrap>
          <jb-button class="mr-3" color="info" label="ADD" @click="blendingAdd" />
        </jb-buttons>
        <div v-for="(batch, index) in userData.jumlahBatch" :key="index">
          <h2 class="font-bold">Blending {{ index + 1 }}</h2>
          <field label="Quota" class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <control
              name="quota"
              v-model="userData.batchesPrioties[index].quota"
              required
              autocomplete="quota"
            />
          </field>
          <field label="Start" class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <control
              name="start"
              v-model="userData.batchesPrioties[index].start"
              required
              autocomplete="start"
            />
          </field>
          <field label="Priority of Protocol by Operators" style="margin-top: 20px;">
            <div v-for="oper in $store.state.operator" :key="oper._id ?? oper">
              <div>
                <p class="mb-2 mt-2">{{ oper.name }} :</p>
                {{ userData.operators[oper._id][index2] }}
                <select
                  v-model="userData.batchesPrioties[index].prio[oper._id][index2]"
                  class="w-1/4 mb-2 ml-1"
                  v-for="(deta, index2) in $store.state.protocol"
                  :key="index2"
                >
                  <option
                    v-for="option in $store.state.protocol"
                    :key="option._id ?? option"
                    :value="option._id"
                  >{{ option.supplier ?? option }}</option>
                </select>
              </div>
            </div>
          </field>
        </div>
      </div>
      <!-- <div class="flex flex-wrap -mx-3 mb-6"> -->
      <!-- <field label="Priority Protocol">
        <div>
          <select
            v-model="userData.priority[index]"
            class="w-1/4 mb-2 ml-1"
            v-for="(deta, index) in $store.state.protocol"
            :key="index"
          >
            <option
              v-for="option in $store.state.protocol"
              :key="option._id ?? option"
              :value="option._id"
            >{{ option.supplier ?? option }}</option>
          </select>
        </div>
      </field>-->

      <!-- <field label="Prize" class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <control v-model="userData.total" name="prize" required autocomplete="prize" />
      </field>

      <field label="Prize" class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <control v-model="userData.total" name="prize" required autocomplete="prize" />
      </field>-->
      <!-- </div> -->
    </div>
  </modal-box>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Profile</hero-bar>
  <main-section>
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 w-full mb-6">
      <card-component>
        <table class="table-auto w-full">
          <tbody class="text-xl" v-if="this.client.companyName !== undefined">
            <tr>
              <td>Company Name</td>
              <td>{{ this.client.companyName }}</td>
            </tr>
            <tr></tr>
            <tr>
              <td class>Username</td>
              <td>{{ this.client.companyName }}</td>
            </tr>
            <tr></tr>
            <tr>
              <td class>Company Address</td>
              <td>{{ this.client.companyAddress }}</td>
            </tr>
            <tr></tr>
            <!-- <tr>
              <td class>First Priority Supplier</td>
              <td>{{ this.client.priority[0].supplier }}</td>
            </tr>-->
            <tr></tr>
            <tr>
              <td class>Operators</td>
              <div
                v-for="ope in this.$store.state.prio"
                v-bind:key="ope._id"
                class="d-flex justify-space-between"
              >
                <td>{{ ope.operator.name }}</td>
                <td>
                  <div
                    v-for="priority in ope.protocol"
                    v-bind:key="priority._id"
                  >{{ priority.supplier }}</div>
                </td>
              </div>
            </tr>
            <tr></tr>
            <tr>
              <td class>Name PIC</td>
              <td>{{ this.client.namePic }}</td>
            </tr>
            <tr></tr>
            <tr>
              <td class>Contact PIC</td>
              <td>{{ this.client.contactPic }}</td>
            </tr>
            <tr></tr>
            <tr>
              <td class>Finance Email</td>
              <td>{{ this.client.financeEmail }}</td>
            </tr>
            <tr></tr>
            <tr>
              <td class>Notification Email</td>
              <td>{{ this.client.notifEmail }}</td>
            </tr>
            <tr></tr>
            <tr>
              <td class>WhiteListIp</td>
              <td>{{ this.client.whiteListIp }}</td>
            </tr>
          </tbody>
        </table>
        <div class="flex flex-wrap -mx-3 mb-6">
          <jb-buttons class="mt-5">
            <jb-button @click="goToInvoice" color="info" label="Check Invoice" />
          </jb-buttons>
          <jb-buttons class="mt-5 ml-5">
            <jb-button @click="openParamWindow" color="success" label="Edit Profile" />
          </jb-buttons>
        </div>

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
        </div>-->
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
            :number="this.$store.state.blast"
            label="SMS Blast Delivered"
          />
          <card-widget
            class="tile"
            color="text-blue-500"
            :icon="mdiCellphoneText"
            :number="this.$store.state.otp"
            label="OTP Delivered"
          />
        </div>
      </div>
    </div>
  </main-section>

  <hero-bar :control="true">History</hero-bar>

  <main-section>
    <card-component has-table>
      <sms-table v-if="this.sms" :sms="this.sms" checkable />
    </card-component>
  </main-section>
</template>

<script>
/* eslint-disable */
// @ is an alias to /src
import { useRoute } from "vue-router";
import { ref, onMounted, computed, reactive } from "vue";
import { useStore } from "vuex";
import Swal from 'sweetalert2'
import axios from 'axios'
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
import CheckRadioPicker from "../components/CheckRadioPicker";
import HeroBar from "@/components/HeroBar";
import Field from "@/components/Field";
import Control from "@/components/Control";
import CardWidget from "@/components/CardWidget";
import ModalBox from "@/components/ModalBox";
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
    ModalBox,
    Field,
    Control,
    CheckRadioPicker,
    CardWidget,
    CardWidgetTwo,
    HeroBar,
    TitleBar,
    Notification,
    JbButtons,
    JbButton,
  },
  computed: {
    idClient() {
      // We will see what `params` is shortly
      return this.$route.params.id;
    },
    client() {
      return this.$store.state.client;
    },
    sms() {
      return this.$store.state.smsClient;
    },
  },
  methods: {
    goToInvoice() {
      //console.log("hello");
      this.$router.push({
        path: `/admin/invoice/${this.idClient}`,
      });
    },
  },
  async created() {
    // //console.log(this.$store.state.client, "test");
    await store.dispatch("fetchClient", { id: this.idClient });
    // await store.dispatch("fetchSmsClient", { id: this.idClient });
    await store.dispatch("fetchOperators")
    //console.log(this.$store.state.client, "naan");
    // //console.log(this.$store.state.smsClient, "naan");
  },

  setup() {
    const store = useStore();
    const route = useRoute();
    //console.log(route.params.id);
    const paramWindow = ref(false);

    const openParamWindow = () => {
      paramWindow.value = !paramWindow.value;
      let test = []
      // store.state.client.priority.forEach(element => {
      //   test.push(element._id)
      // });
      //  startDrop: 0,
      //   "blending": "false",
      //   "drop": 0,
      //console.log(store.state.client.batch, "batch")

      if (store.state.client.batch !== undefined && store.state.client.batch.length > 0) {
        userData.value.blending = "true"
        store.state.client.batch.forEach(element => {
          //console.log(element, "haloooo")
          userData.value.jumlahBatch++
          let objectBatch = {
            "quota": element.quota,
            start: element.start,
            batch_id: element._id,
            "prio": {
              // "60dad3e9ac63c76bdaf6e263": [

              // ],
              // "60dad401ac63c76bdaf6e264": [

              // ],
              // "60dad412ac63c76bdaf6e265": [

              // ],
              // "60dad423ac63c76bdaf6e266": [

              // ],
              // "60dad431ac63c76bdaf6e267": [

              // ]
            }
          }
          element.prio.forEach(el => {
            objectBatch.prio[el.operator] = el.sendTo
          });
          //console.log(objectBatch)
          userData.value.batchesPrioties.push(objectBatch)
        });



      }
      else {
        let data = {}
        // //console.log(store.state.client.priority, "abfiaehguf")
        store.state.client.priority.forEach(el => {
          // data[el.operator] = el.sendTo
          // //console.log(el, "jpajf")
          data[el.operator] = el.protocol
        });
        //console.log(data, "halo")
        userData.value.operators = data

      }

      //console.log(store.state.client, 'priotriy')
      userData.value.priority = test;
      userData.value.droping = store.state.client.droping
      userData.value.drop = store.state.client.drop
      userData.value.startDrop = store.state.client.startDrop
      userData.value.namePic = store.state.client.namePic;
      userData.value.companyName = store.state.client.companyName;
      userData.value.companyNumber = store.state.client.companyNumber;
      userData.value.companyAddress = store.state.client.companyAddress;
      userData.value.username = store.state.client.username;
      userData.value.contactPic = store.state.client.contactPic;
      userData.value.whiteListIp = store.state.client.whiteListIp;
      userData.value.notifEmail = store.state.client.notifEmail;
      userData.value.financeEmail = store.state.client.financeEmail;

    };
    const putClient = () => {
      function hasDuplicates(arr) {
        return arr.some(x => arr.indexOf(x) !== arr.lastIndexOf(x));
      }
      if (hasDuplicates(userData.value.priority)) {
        //console.log("Duplicate elements found.");
        Swal.fire({
          title: "ADD Client!",
          text: "Terdapat duplikat di priority",
          icon: "warning",
        });

      }
      else {
        if (userData.value.blending == "true") {
          function hasDuplicates(arr) {
            return arr.some(x => arr.indexOf(x) !== arr.lastIndexOf(x));
          }
          let duplicate = false
          store.state.operator.forEach(element => {
            userData.value.batchesPrioties.forEach(element2 => {

              if (hasDuplicates(element2.prio[element._id])) {
                //console.log("Duplicate elements found.");
                Swal.fire({
                  title: "ADD Client!",
                  text: "Gagal terdapat duplikasi di protocol",
                  icon: "warning"
                });
                duplicate = true
                return
              }
            });
            // //console.log(userData.value.operators[element._id])
          });
          let requestData = {
            username: userData.value.username,
            companyName: userData.value.companyName,
            companyNumber: userData.value.companyNumber,
            companyAddress: userData.value.companyAddress,
            namePic: userData.value.namePic,
            contactPic: userData.value.contactPic,
            whiteListIp: userData.value.whiteListIp,
            financeEmail: userData.value.financeEmail,
            notifEmail: userData.value.notifEmail,
            password: userData.value.password,
            startDrop: userData.value.startDrop,
            blending: true,
            drop: 0,
            batchesPrioties: userData.value.batchesPrioties
          }
          if (userData.value.droping == "true") {
            requestData.drop = userData.value.drop
          }
          //console.log(requestData)
          if (duplicate == false) {
            // //console.log(userData.value);
            // let userDataAdd = userData.value;
            // userDataAdd.protocol = userData.value.priority[0];
            const loginUrl =
              process.env.VUE_APP_BASE_URL +
              "api/users/editClient/" + route.params.id + "/";
            // commit("auth_request");
            axios
              .put(loginUrl, requestData, {
                headers: {
                  token: localStorage.getItem("token")
                }
              })
              .then(r => {
                userData.value.priority = [];
                userData.value.namePic = "";
                userData.value.companyName = "";
                userData.value.companyNumber = "";
                userData.value.companyAddress = "";
                userData.value.username = "";
                userData.value.contactPic = "";
                userData.value.whiteListIp = "";
                userData.value.password = "";
                userData.value.notifEmail = "";
                userData.value.financeEmail = "";

                if (r.data) {
                  Swal.fire({
                    title: "ADD Client!",
                    text: "Success",
                    icon: "success"
                  });
                }
                store.dispatch("fetchClients");
                paramWindow.value = false;
              })
              .catch(error => {
                //console.log(error.response.data.message);
                // commit("auth_error");
                // localStorage.removeItem("token");
                Swal.fire({
                  title: "ADD Client!",
                  text: "Gagal",
                  icon: "warning"
                });
                // alert(error.message);
              });
          }

          //   //console.log("No Duplicates found.");
        }
        else {

          function hasDuplicates(arr) {
            return arr.some(x => arr.indexOf(x) !== arr.lastIndexOf(x));
          }
          let duplicate = false
          store.state.operator.forEach(element => {
            //console.log(userData.value.operators[element._id])
            if (hasDuplicates(userData.value.operators[element._id])) {
              //console.log("Duplicate elements found.");
              Swal.fire({
                title: "ADD Client!",
                text: "Gagal terdapat duplikasi di protocol",
                icon: "warning"
              });
              duplicate = true
              return
            }
          });
          //console.log('helllloo')

          if (duplicate == false) {
            let requestData = {
              username: userData.value.username,
              companyName: userData.value.companyName,
              companyNumber: userData.value.companyNumber,
              companyAddress: userData.value.companyAddress,
              namePic: userData.value.namePic,
              contactPic: userData.value.contactPic,
              whiteListIp: userData.value.whiteListIp,
              financeEmail: userData.value.financeEmail,
              notifEmail: userData.value.notifEmail,
              startDrop: 0,
              blending: false,
              drop: 0,
              operators: userData.value.operators
            }
            //console.log(userData.value);
            let userDataAdd = userData.value;
            // userDataAdd.protocol = userData.value.priority[0];
            const loginUrl =
              process.env.VUE_APP_BASE_URL +
              "api/users/editClient/" + route.params.id + "/";
            // commit("auth_request");
            axios
              .put(loginUrl, requestData, {
                headers: {
                  token: localStorage.getItem("token")
                }
              })
              .then(r => {
                userData.value.priority = [];
                userData.value.namePic = "";
                userData.value.companyName = "";
                userData.value.companyNumber = "";
                userData.value.companyAddress = "";
                userData.value.username = "";
                userData.value.contactPic = "";
                userData.value.whiteListIp = "";
                userData.value.password = "";
                userData.value.notifEmail = "";
                userData.value.financeEmail = "";

                if (r.data) {
                  Swal.fire({
                    title: "ADD Client!",
                    text: "Success",
                    icon: "success"
                  });
                }
                store.dispatch("fetchClients");
                paramWindow.value = false;
              })
              .catch(error => {
                //console.log(error.response.data.message);
                // commit("auth_error");
                // localStorage.removeItem("token");
                Swal.fire({
                  title: "ADD Client!",
                  text: "Gagal",
                  icon: "warning"
                });
                // alert(error.message);
              });
            //console.log("No Duplicates found.");
          }
        }
      }

      //   const loginUrl =
      //     process.env.VUE_APP_BASE_URL +
      //     "api/users/editClient/" + route.params.id + "/";
      //   // commit("auth_request");
      //   //console.log(userData.value)
      //   axios
      //     .put(loginUrl, userData.value, {
      //       headers: {
      //         token: localStorage.getItem("token"),
      //       },
      //     })
      //     .then((r) => {

      //       if (r.data) {
      //         Swal.fire({
      //           title: "EDIT Client!",
      //           text: "Success",
      //           icon: "success",
      //         });
      //       }
      //       store.dispatch("fetchClient", { id: route.params.id })
      //       paramWindow.value = false

      //     })
      //     .catch((error) => {
      //       //console.log(error.response.data.message)
      //       // commit("auth_error");
      //       // localStorage.removeItem("token");
      //       Swal.fire({
      //         title: "EDIT Client!",
      //         text: error.response.data.message,
      //         icon: "warning",
      //       });
      //       // alert(error.message);
      //     });
      // }

    }
    onMounted(async () => {
      const res = await store.dispatch("fetchSmsClient", {
        id: route.params.id,
      });
      await store.dispatch("fetchPrio", {
        id: route.params.id,
      });
      await store.dispatch("fetchProtocol");
      //console.log(store.state.prio, "prio")

      //console.log(res, "tes");
      // //console.log(this.$route, "test");
      fillChartData();
      // //console.log(this.$store.state.client, "tessc");
    });

    const titleStack = ref(["Admin", "Detailed"]);

    const chartData = ref(null);
    const chartColors = {
      default: {
        primary: "#00D1B2",
        info: "#209CEE",
        // danger: '#FF3860'
      },
    };
    const userData = computed(() =>
      reactive({
        priority: [],
        username
          :
          "",
        companyName
          :
          "",
        companyNumber
          :
          "",
        companyAddress
          :
          "",
        namePic
          :
          "",
        contactPic
          :
          "",
        whiteListIp
          :
          "",
        financeEmail
          :
          "",
        notifEmail
          :
          "",
        startDrop: 0,
        "blending": "false",
        "drop": 0,
        jumlahBatch: 0,
        "droping": "false",
        batchesPrioties: [],
        "operators": {
          "60dad3e9ac63c76bdaf6e263": [

          ],
          "60dad401ac63c76bdaf6e264": [

          ],
          "60dad412ac63c76bdaf6e265": [

          ],
          "60dad423ac63c76bdaf6e266": [

          ],
          "60dad431ac63c76bdaf6e267": [

          ]
        }

      })
    )
    const blendingAdd = () => {
      userData.value.jumlahBatch++
      userData.value.batchesPrioties.push({
        "quota": 0,
        start: 0,
        "prio": {
          "60dad3e9ac63c76bdaf6e263": [

          ],
          "60dad401ac63c76bdaf6e264": [

          ],
          "60dad412ac63c76bdaf6e265": [

          ],
          "60dad423ac63c76bdaf6e266": [

          ],
          "60dad431ac63c76bdaf6e267": [

          ]
        }
      })
    }

    const randomChartData = (n, l) => {
      const data = [];
      const thisYear = new Date().getYear();
      //console.log(thisYear, "tessss");
      //console.log(n, "nanfka");

      for (let i = 0; i < l.length; i++) {
        console.log(
          n.filter(
            (el) =>
              new Date(el.createdAt).getMonth() == i &&
              new Date(el.createdAt).getYear() == thisYear
          )
        ),
          "AH";
        data.push(
          n.filter(
            (el) =>
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
        cubicInterpolationMode: "default",
      };
    };
    console.log(
      store.state.smsClient.filter((el) => el.prize.akun == "premium"),
      "client prem"
    );
    console.log(
      store.state.smsClient.filter((el) => el.prize.akun == "reguler"),
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
        "Desember",
      ];

      // for (let i = 1; i <= points; i++) {
      //   labels.push(`${i}`);
      // }

      return {
        labels,
        datasets: [
          datasetObject(
            "primary",
            store.state.smsClient.filter((el) => el.prize.akun == "premium"),
            labels
          ),
          datasetObject(
            "info",
            store.state.smsClient.filter((el) => el.prize.akun == "reguler"),
            labels
          ),
          // datasetObject('danger', points)
        ],
      };
    };

    const fillChartData = () => {
      chartData.value = sampleChartData();
    };
    //console.log(chartData);
    //console.log(fillChartData);

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
      paramWindow,
      openParamWindow,
      mdiMonitorCellphone,
      putClient,
      mdiReload,
      blendingAdd,
      mdiGithub,
      userData
    };
  },
};
</script>
