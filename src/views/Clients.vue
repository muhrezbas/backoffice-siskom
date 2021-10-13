<template>
  <modal-box v-model="paramWindow" title="Set Parameter" :submit="postClient">
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

        <field label="Password" class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <control v-model="userData.password" name="prize" required autocomplete="prize" />
        </field>
      </div>
      <!-- <div class="flex flex-wrap -mx-3 mb-6"> -->
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
      <!-- <div class="flex flex-wrap -mx-3 mb-6" v-if="userData.blending == 'true'"> -->
      <!-- <field
          label="Blending of Priority Protocol by Operators"
          v-if="userData.blending == 'true'"
      >-->
      <!-- <div class="flex flex-wrap -mx-3 mb-6"> -->
      <!-- <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <select class>
            <option
              v-for="option in $store.state.protocol"
              :key="option._id ?? option"
              :value="option._id"
            >{{ option.supplier ?? option }}</option>
          </select>
      </div>-->
      <!-- <field label="Supplier" class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <select style="width: 100%;">
            <option
              v-for="option in $store.state.protocol"
              :key="option._id ?? option"
              :value="option._id"
            >{{ option.supplier ?? option }}</option>
          </select>
      </field>-->
      <field
        v-if="userData.blending == 'true' && userData.droping == 'true'"
        label="Quantity Drop"
        class="w-full md:w-1/2 px-3 mb-6 md:mb-0"
      >
        <control v-model="userData.drop" name="drop" required autocomplete="drop" />
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

          <!-- </div> -->

          <!-- <div v-for="oper in $store.state.operator" :key="oper._id ?? oper">
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
          </div>-->
          <!-- </field> -->
          <!-- </div> -->

          <!-- <field label="Prize" class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <control v-model="userData.total" name="prize" required autocomplete="prize" />
      </field>

      <field label="Prize" class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <control v-model="userData.total" name="prize" required autocomplete="prize" />
          </field>-->
          <!-- </div> -->
        </div>
      </div>
    </div>
  </modal-box>
  <title-bar :title-stack="titleStack" />
  <hero-bar class="mb-5">Settings</hero-bar>

  <!-- <hero-bar param :paramFunction="openParamWindow" search>Admin</hero-bar>

  <main-section>
    <card-component has-table>
      <admin-table checkable />
    </card-component>
  </main-section>-->

  <hero-bar
    v-if="$store.state.errorAccess == false"
    param
    :paramFunction="openParamWindow"
    search
  >Users</hero-bar>

  <main-section v-if="$store.state.errorAccess == false">
    <card-component has-table>
      <users-table checkable :admin="true" />
    </card-component>
  </main-section>

  <error-access v-else />
</template>

<script>
/* eslint-disable */
// @ is an alias to /src
import { ref, onMounted, computed, reactive } from "vue";
import { useStore } from "vuex";
import Swal from "sweetalert2";
import axios from "axios";
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
import CheckRadioPicker from "../components/CheckRadioPicker";
// import CheckRadioPicker from "@/components/CheckRadioPicker";
import ErrorAccess from "@/components/ErrorAccess";
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
    ErrorAccess,
    Level,
    Field,
    Control,
    AdminTable,
    CheckRadioPicker,
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
    const userData = computed(() =>
      reactive({
        priority: [],
        username: "",
        companyName: "",
        companyNumber: "",
        companyAddress: "",
        jumlahBatch: 1,
        namePic: "",
        contactPic: "",
        whiteListIp: "",
        financeEmail: "",
        notifEmail: "",
        password: "",
        "blending": "false",
        "drop": 0,
        "droping": "false",
        batchesPrioties: [{
          "quota": 0,
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
        }],
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
    );
    const blendingAdd = () => {
      userData.value.jumlahBatch++
      userData.value.batchesPrioties.push({
        "quota": 0,
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
    // const userBlend = computed(() =>
    //   reactive({
    //     priority: [],
    //     username: "",
    //     companyName: "",
    //     companyNumber: "",
    //     companyAddress: "",
    //     namePic: "",
    //     contactPic: "",
    //     whiteListIp: "",
    //     financeEmail: "",
    //     notifEmail: "",
    //     password: ""

    //   })
    // );

    const fillChartData = () => {
      chartData.value = chartConfig.sampleChartData();
    };
    const postClient = () => {
      console.log(userData.value.blending);

      console.log(userData.value, "test")
      if (userData.value.blending == "true") {
        function hasDuplicates(arr) {
          return arr.some(x => arr.indexOf(x) !== arr.lastIndexOf(x));
        }
        let duplicate = false
        store.state.operator.forEach(element => {
          userData.value.batchesPrioties.forEach(element2 => {

            if (hasDuplicates(element2.prio[element._id])) {
              console.log("Duplicate elements found.");
              Swal.fire({
                title: "ADD Client!",
                text: "Gagal terdapat duplikasi di protocol",
                icon: "warning"
              });
              duplicate = true
              return
            }
          });
          // console.log(userData.value.operators[element._id])
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
          blending: true,
          drop: 0,
          batchesPrioties: userData.value.batchesPrioties
        }
        if (userData.value.droping == "true") {
          requestData.drop = userData.value.drop
        }
        console.log(requestData)
        if (duplicate == false) {
          // console.log(userData.value);
          // let userDataAdd = userData.value;
          // userDataAdd.protocol = userData.value.priority[0];
          const loginUrl = process.env.VUE_APP_BASE_URL + "api/users/client/";
          // commit("auth_request");
          axios
            .post(loginUrl, requestData, {
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
              console.log(error.response.data.message);
              // commit("auth_error");
              // localStorage.removeItem("token");
              Swal.fire({
                title: "ADD Client!",
                text: "Gagal",
                icon: "warning"
              });
              // alert(error.message);
            });
          console.log("No Duplicates found.");
        }
      }
      else {

        function hasDuplicates(arr) {
          return arr.some(x => arr.indexOf(x) !== arr.lastIndexOf(x));
        }
        let duplicate = false
        store.state.operator.forEach(element => {
          console.log(userData.value.operators[element._id])
          if (hasDuplicates(userData.value.operators[element._id])) {
            console.log("Duplicate elements found.");
            Swal.fire({
              title: "ADD Client!",
              text: "Gagal terdapat duplikasi di protocol",
              icon: "warning"
            });
            duplicate = true
            return
          }
        });
        console.log('helllloo')

        if (duplicate == false) {
          console.log(userData.value);
          let userDataAdd = userData.value;
          // userDataAdd.protocol = userData.value.priority[0];
          const loginUrl = process.env.VUE_APP_BASE_URL + "api/users/client/";
          // commit("auth_request");
          axios
            .post(loginUrl, userDataAdd, {
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
              console.log(error.response.data.message);
              // commit("auth_error");
              // localStorage.removeItem("token");
              Swal.fire({
                title: "ADD Client!",
                text: "Gagal",
                icon: "warning"
              });
              // alert(error.message);
            });
          console.log("No Duplicates found.");
        }
      }
    };
    const store = useStore();
    onMounted(async () => {
      await store.dispatch("fetchProtocol");
      await store.dispatch("fetchOperators")
      const operator = store.state.operator
      console.log(operator, "tes")
      userData.value.operators = operator.reduce((acc, curr) => (acc[curr._id] = [], acc), {});
      console.log(userData.value)
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
      postClient,
      mdiPencilBoxOutline,
      mdiFinance,
      mdiMonitorCellphone,
      blendingAdd,
      mdiReload,
      userData,
      mdiTrashCan,
      mdiGithub
    };
  }
};
</script>
