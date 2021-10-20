<template>
  <modal-box v-model="isModalActive" title="User Setting" :submit="putPrefix">
    <field label="Kode">
      <control v-model="userData.kode" name="kode" required autocomplete="kode" />
    </field>

    <field label="MSISDN">
      <control v-model="userData.msisdn" name="msisdn" required autocomplete="msisdn" />
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
    :submit="deletePrefix"
    title="Please confirm action"
    has-cancel
  >
    <p>Are you sure you want to delete this entry ?</p>
  </modal-box>

  <table>
    <thead>
      <tr>
        <th>Kode</th>
        <th>MSISDN</th>
        <th>Operator</th>
        <th></th>
      </tr>
    </thead>
    <tbody class="font-semibold">
      <tr v-for="prefix in itemsPaginated" :key="prefix.id">
        <td data-label="Kode">{{ prefix.kode }}</td>
        <td data-label="Msisdn">{{ prefix.msisdn }}</td>
        <td data-label="Operator">{{ prefix.operator.name }}</td>
        <td class="actions-cell">
          <jb-buttons type="justify-start lg:justify-end" no-wrap>
            <jb-button class="mr-3" color="info" :icon="mdiEye" small @click="clickEye(prefix)" />
            <jb-button
              class="mr-3"
              color="info"
              :icon="mdiTrashCan"
              small
              @click="clickTrash(prefix)"
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
  name: "CountryTable",
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
      const res = await store.dispatch("fetchPrefix");
      await store.dispatch("fetchOperators");
      //console.log(res, "tes");
      // //console.log(this.$route, "test");
      // fillChartData();
      // //console.log(this.$store.state.client, "tessc");
    });

    store.commit("search", "")
const items = computed(() => store.state.prefix.filter((admin) => {
      return String(admin.kode).toLowerCase().includes(store.state.search) ||
        String(admin.msisdn).toLowerCase().includes(store.state.search) ||
        String(admin.operator.name).toLowerCase().includes(store.state.search) ||
        admin._id.toLowerCase().includes(store.state.search)
    }));
    //console.log(items, "fna");

    const isModalActive = ref(false);

    const isModalDeleteActive = ref(false);

    const perPage = ref(10);

    const currentPage = ref(0);

    const checkedRows = ref([]);
    const userData = computed(() =>
      reactive({
        kode: "",
        msisdn: "",
        operator: "",
        _id: ""
      })
    )
    const clickTrash = (payload) => {
      //console.log(payload, "tesr")

      userData.value._id = payload._id


      isModalDeleteActive.value = true
    }
    const deletePrefix = () => {
      //console.log(userData.value, "delete country")

      const loginUrl =
        process.env.VUE_APP_BASE_URL +
        "api/operators/deletePrefix/" + userData.value._id + "/";
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
              title: "Delete Prefix!",
              text: "Success",
              icon: "success",
            });
          }
          store.dispatch("fetchPrefix");
          isModalDeleteActive.value = false

        })
        .catch((error) => {
          // //console.log(error.response.data.message)
          // // commit("auth_error");
          // // localStorage.removeItem("token");
          // Swal.fire({
          //   title: "Delete Prefix!",
          //   text: error.response.data.message,
          //   icon: "warning",
          // });
          // alert(error.message);
        });
    }
    const putPrefix = () => {
      //console.log(userData.value)
      let keyword = {
        kode: userData.value.kode,
        msisdn: userData.value.msisdn,
        operator: userData.value.operator,
      }

      const loginUrl =
        process.env.VUE_APP_BASE_URL +
        "api/operators/editPrefix/" + userData.value._id + "/";
      // commit("auth_request");
      axios
        .put(loginUrl, keyword, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((r) => {
          userData.value.kode = ""
          userData.value.msisdn = ""
          userData.value.operator = ""
          userData.value._id = ""

          if (r.data) {
            Swal.fire({
              title: "EDIT Prefix!",
              text: "Success",
              icon: "success",
            });
          }
          store.dispatch("fetchPrefix");
          isModalActive.value = false

        })
        .catch((error) => {
          // //console.log(error.response.data.message)
          // // commit("auth_error");
          // // localStorage.removeItem("token");
          // Swal.fire({
          //   title: "EDIT Prefix!",
          //   text: error.response.data.message,
          //   icon: "warning",
          // });
          // alert(error.message);
        });
    }
    const clickEye = (payload) => {
      //console.log(payload, "tesr")
      userData.value.kode = payload.kode
      userData.value.msisdn = payload.msisdn
      userData.value.operator = payload.operator._id
      userData.value._id = payload._id


      isModalActive.value = true
    }

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
      clickEye,
      checkedRows,
      itemsPaginated,
      pagesList,
      mdiEye,
      putPrefix,
      mdiTrashCan,
      clickTrash,
      deletePrefix,
      userData
    };
  }
};
</script>
