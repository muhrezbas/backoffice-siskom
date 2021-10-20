<template>
  <modal-box v-model="isModalActive" title="Credit Setting" :submit="putCredit">
    <div
      class="overflow-y-auto overflow-x-hidden max-h-paramMobile md:max-h-paramDesktop :max-h-paramDesktop"
    >
      <field label="Tipe Account">
        <select v-model="userData.akun" class="w-full">
          <option
            v-for="option in ['reguler', 'premium']"
            :key="option"
            :value="option"
          >{{ option }}</option>
        </select>
      </field>

      <field label="Credit">
        <control v-model="userData.total" name="prize" required autocomplete="prize" />
      </field>
      <field label="Code Credit">
        <control v-model="userData.kodeCreditClient" name="prize" required autocomplete="prize" />
      </field>

      <field label="Tax">
        <control v-model="userData.tax" name="tax" required autocomplete="tax" />
      </field>
      <field label="Client">
        <select v-model="userData.client" class="w-full">
          <option
            v-for="option in $store.state.clients"
            :key="option._id ?? option"
            :value="option._id"
          >{{ option.companyName ?? option }}</option>
        </select>
      </field>
      <field label="Price of mitracomm">
        <select v-model="userData.prize" class="w-full">
          <option
            v-for="option in $store.state.prize"
            :key="option._id ?? option"
            :value="option._id"
          >{{ option.kodePrize ?? option }}</option>
        </select>
      </field>

      <field label="Operator">
        <select v-model="userData.operator" class="w-full">
          <option
            v-for="option in $store.state.operator"
            :key="option._id ?? option"
            :value="option._id"
          >{{ option.nickname ?? option }}</option>
        </select>
      </field>
    </div>
  </modal-box>

  <modal-box
    v-model="isModalDeleteActive"
    title="Please confirm action"
    :submit="deleteCredit"
    has-cancel
  >
    <p>Are you sure you want to delete this entry ?</p>
  </modal-box>

  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Kode Credit Client</th>
        <th>Tipe Account</th>
        <th>Credit</th>
        <th>Tax</th>
        <th>Price</th>
        <th>Client</th>
        <th>Operator</th>
        <th></th>
      </tr>
    </thead>
    <tbody class="font-semibold">
      <tr v-for="country in itemsPaginated" :key="country.id">
        <td>{{ country._id }}</td>
        <td data-label="Kode Credit Client">{{ country.kodeCreditClient }}</td>
        <td data-label="Tipe Account">{{ country.akun }}</td>
        <td data-label="Credit">{{ country.total }}</td>
        <td data-label="Tax">{{ country.tax }}</td>
        <td data-label="Client">{{ country.client.companyName }}</td>

        <td data-label="Price">{{ country.prize.kodePrize }}</td>
        <!-- <td data-label="Kode">{{ country.akun }}</td> -->
        <td data-label="Operator">{{ country.operator.name }}</td>
        <td class="actions-cell">
          <jb-buttons type="justify-start lg:justify-end" no-wrap>
            <jb-button class="mr-3" color="info" :icon="mdiEye" small @click="clickEye(country)" />
            <jb-button
              class="mr-3"
              color="info"
              :icon="mdiTrashCan"
              small
              @click="clickTrash(country)"
            />
          </jb-buttons>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="table-pagination">
    <level>
      <jb-buttons>
        <jb-button
          v-for="page in pagesList"
          @click="currentPage = page"
          :active="page === currentPage"
          :label="page + 1"
          :key="page"
          small
        />
      </jb-buttons>
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
    </level>
  </div>
</template>

<script>
/* eslint-disable */
import { ref, onMounted, computed, reactive } from "vue";
import { useStore } from "vuex";
import Swal from 'sweetalert2'
import axios from 'axios'
import { mdiEye, mdiTrashCan } from "@mdi/js";
import ModalBox from "@/components/ModalBox";
import Field from "@/components/Field";
import Control from "@/components/Control";
import Level from "@/components/Level";
import JbButtons from "@/components/JbButtons";
import JbButton from "@/components/JbButton";

export default {
  name: "CreditTable",
  components: {
    ModalBox,
    Field,
    Control,
    Level,
    JbButtons,
    JbButton
  },
  setup() {
    const store = useStore();
    onMounted(async () => {
      const res = await store.dispatch("fetchCredit");
      await store.dispatch("fetchPrize");
      await store.dispatch("fetchOperators");
      await store.dispatch("fetchClients");
      //console.log(res, "tes");
      // //console.log(this.$route, "test");
      // fillChartData();
      // //console.log(this.$store.state.client, "tessc");
    });
    const clickTrash = (payload) => {
      //console.log(payload, "tesr")

      userData.value._id = payload._id


      isModalDeleteActive.value = true
    }
    const deleteCredit = () => {
      //console.log(userData.value, "delete country")

      const loginUrl =
        process.env.VUE_APP_BASE_URL +
        "api/operators/deleteCredit/" + userData.value._id + "/";
      // commit("auth_request");
      axios
        .delete(loginUrl, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((r) => {


          if (r.data) {
            Swal.fire({
              title: "Delete Credit!",
              text: "Success",
              icon: "success",
            });
          }
          store.dispatch("fetchCredit");
          isModalDeleteActive.value = false

        })
        .catch((error) => {
          // //console.log(error.response.data.message)
          // // commit("auth_error");
          // // localStorage.removeItem("token");
          // Swal.fire({
          //   title: "Delete Credit!",
          //   text: error.response.data.message,
          //   icon: "warning",
          // });
          // alert(error.message);
        });
    }
    const clickEye = (payload) => {
      //console.log(payload, "tesr")
      userData.value.akun = payload.akun
      userData.value.total = payload.total
      userData.value.operator = payload.operator._id
      userData.value.kodeCreditClient = payload.kodeCreditClient
      userData.value.tax = payload.tax
      userData.value.client = payload.client._id
      userData.value.prize = payload.prize._id
      userData.value._id = payload._id


      isModalActive.value = true
    }
    const putCredit = () => {
      //console.log(userData.value)
      let keyword = {
        akun: userData.value.akun,
        total: userData.value.total,
        operator: userData.value.operator,
        kodeCreditClient: userData.value.kodeCreditClient,
        tax: userData.value.tax,
        prize: userData.value.prize,
        client: userData.value.client,
        kodeCreditClient: userData.value.kodeCreditClient
      }

      const loginUrl =
        process.env.VUE_APP_BASE_URL +
        "api/operators/editCredit/" + userData.value._id + "/";
      // commit("auth_request");
      axios
        .put(loginUrl, keyword, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((r) => {
          userData.value.akun = ""
          userData.value.total = ""
          userData.value.operator = ""
          userData.value.kodeCreditClient = ""
          userData.value.tax = ""
          userData.value.protocol = ""
          userData.value._id = ""
          userData.value.client = ""

          if (r.data) {
            Swal.fire({
              title: "EDIT Credit!",
              text: "Success",
              icon: "success",
            });
          }
          store.dispatch("fetchCredit");
          isModalActive.value = false

        })
        .catch((error) => {
          // //console.log(error.response.data.message)
          // // commit("auth_error");
          // // localStorage.removeItem("token");
          // Swal.fire({
          //   title: "EDIT Credit!",
          //   text: error.response.data.message,
          //   icon: "warning",
          // });
          // alert(error.message);
        });
    }
    const userData = computed(() =>
      reactive({
        akun: "",
        total: 0,
        tax: 0,
        protocol: "",
        operator: "",
        kodeCreditClient: "",
        client: '',
        _id: '',
        prize: ''
      })
    )

    store.commit("search", "")
    const items = computed(() => store.state.credit.filter((admin) => {
      return admin.akun.toLowerCase().includes(store.state.search) ||
        String(admin.total).toLowerCase().includes(store.state.search) ||
        String(admin.tax).toLowerCase().includes(store.state.search) ||
        String(admin.protocol.supplier).toLowerCase().includes(store.state.search) ||
        String(admin.operator.name).toLowerCase().includes(store.state.search) ||
        admin._id.toLowerCase().includes(store.state.search)
    }));
    //console.log(store.state.credit, "tesss");

    const isModalActive = ref(false);

    const isModalDeleteActive = ref(false);

    const perPage = ref(10);

    const currentPage = ref(0);

    const checkedRows = ref([]);

    const itemsPaginated = computed(() =>
      items.value.slice(
        perPage.value * currentPage.value,
        perPage.value * (currentPage.value + 1)
      )
    );

    const numPages = computed(() =>
      Math.ceil(items.value.length / perPage.value)
    );

    const currentPageHuman = computed(() => currentPage.value + 1);

    const pagesList = computed(() => {
      const pagesList = [];

      for (let i = 0; i < numPages.value; i++) {
        pagesList.push(i);
      }

      return pagesList;
    });

    return {
      isModalActive,
      isModalDeleteActive,
      currentPage,
      currentPageHuman,
      numPages,
      checkedRows,
      putCredit,
      clickTrash,
      deleteCredit,
      itemsPaginated,
      pagesList,
      mdiEye,
      mdiTrashCan,
      clickEye,
      userData
    };
  }
};
</script>
