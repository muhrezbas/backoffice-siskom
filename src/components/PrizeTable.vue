<template>
  <modal-box v-model="isModalActive" title="Prize Setting" :submit="putPrize">
    <field label="Tipe Account">
      <select v-model="userData.akun" class="w-full">
        <option v-for="option in ['reguler', 'premium']" :key="option" :value="option">{{ option }}</option>
      </select>
    </field>

    <field label="Prize">
      <control v-model="userData.total" name="prize" required autocomplete="prize" />
    </field>
    <field label="Code Prize">
      <control v-model="userData.kodePrize" name="prize" required autocomplete="prize" />
    </field>

    <field label="Tax">
      <control v-model="userData.tax" name="tax" required autocomplete="tax" />
    </field>

    <field label="Supplier">
      <select v-model="userData.protocol" class="w-full">
        <option
          v-for="option in $store.state.protocol"
          :key="option._id ?? option"
          :value="option._id"
        >{{ option.supplier ?? option }}</option>
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
  </modal-box>

  <modal-box
    v-model="isModalDeleteActive"
    title="Please confirm action"
    :submit="deletePrize"
    has-cancel
  >
    <p>Are you sure you want to delete this entry ?</p>
  </modal-box>

  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Tipe Account</th>
        <th>Prize</th>
        <th>Tax</th>
        <th>Supplier</th>
        <th>Operator</th>
        <th></th>
      </tr>
    </thead>
    <tbody class="font-semibold">
      <tr v-for="country in itemsPaginated" :key="country.id">
        <td>{{ country._id }}</td>
        <td data-label="Tipe Account">{{ country.akun }}</td>
        <td data-label="Prize">{{ country.total }}</td>
        <td data-label="Tax">{{ country.tax }}</td>
        <td data-label="Supplier">{{ country.protocol.supplier }}</td>
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
  name: "PrizeTable",
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
      const res = await store.dispatch("fetchPrize");

      console.log(res, "tes");
      // console.log(this.$route, "test");
      // fillChartData();
      // console.log(this.$store.state.client, "tessc");
    });
    const clickTrash = (payload) => {
      console.log(payload, "tesr")

      userData.value._id = payload._id


      isModalDeleteActive.value = true
    }
    const deletePrize = () => {
      console.log(userData.value, "delete country")

      const loginUrl =
        process.env.VUE_APP_BASE_URL +
        "api/operators/deletePrize/" + userData.value._id + "/";
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
              title: "Delete Prize!",
              text: "Success",
              icon: "success",
            });
          }
          store.dispatch("fetchPrize");
          isModalDeleteActive.value = false

        })
        .catch((error) => {
          // console.log(error.response.data.message)
          // // commit("auth_error");
          // // localStorage.removeItem("token");
          // Swal.fire({
          //   title: "Delete Prize!",
          //   text: error.response.data.message,
          //   icon: "warning",
          // });
          // alert(error.message);
        });
    }
    const clickEye = (payload) => {
      console.log(payload, "tesr")
      userData.value.akun = payload.akun
      userData.value.total = payload.total
      userData.value.operator = payload.operator._id
      userData.value.kodePrize = payload.kodePrize
      userData.value.tax = payload.tax
      userData.value.protocol = payload.protocol._id
      userData.value._id = payload._id


      isModalActive.value = true
    }
    const putPrize = () => {
      console.log(userData.value)
      let keyword = {
        akun: userData.value.akun,
        total: userData.value.total,
        operator: userData.value.operator,
        kodePrize: userData.value.kodePrize,
        tax: userData.value.tax,
        protocol: userData.value.protocol
      }

      const loginUrl =
        process.env.VUE_APP_BASE_URL +
        "api/operators/editPrize/" + userData.value._id + "/";
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
          userData.value.kodePrize = ""
          userData.value.tax = ""
          userData.value.protocol = ""
          userData.value._id = ""

          if (r.data) {
            Swal.fire({
              title: "EDIT Prize!",
              text: "Success",
              icon: "success",
            });
          }
          store.dispatch("fetchPrize");
          isModalActive.value = false

        })
        .catch((error) => {
          // console.log(error.response.data.message)
          // // commit("auth_error");
          // // localStorage.removeItem("token");
          // Swal.fire({
          //   title: "EDIT Prize!",
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
        kodePrize: ""
      })
    )

    store.commit("search", "")
const items = computed(() => store.state.prize.filter((admin) => {
      return admin.akun.toLowerCase().includes(store.state.search) ||
        String(admin.total).toLowerCase().includes(store.state.search) ||
        String(admin.tax).toLowerCase().includes(store.state.search) ||
        String(admin.protocol.supplier).toLowerCase().includes(store.state.search) ||
        String(admin.operator.name).toLowerCase().includes(store.state.search) ||
        admin._id.toLowerCase().includes(store.state.search)
    }));
    console.log(store.state.prize, "tesss");

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
      putPrize,
      clickTrash,
      deletePrize,
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
