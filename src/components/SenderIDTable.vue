<template>
  <modal-box v-model="isModalActive" title="User Setting" :submit="putSender">
    <field label="Sender ID">
      <control v-model="userData.senderID" name="senderID" required autocomplete="senderID" />
    </field>
    <field label="Jalur">
      <select v-model="userData.jalur" class="w-full">
        <option
          v-for="option in ['OTP', 'NOTP']"
          :key="option._id ?? option"
          :value="option"
        >{{ option.nickname ?? option }}</option>
      </select>
    </field>
    <field label="Supplier">
      <select v-model="userData.supplier" class="w-full">
        <option
          v-for="option in $store.state.protocol"
          :key="option._id ?? option"
          :value="option._id"
        >{{ option.protocol ?? option }}</option>
      </select>
    </field>
    <field label="Region">
      <select v-model="userData.region" class="w-full">
        <option
          v-for="option in ['local', 'international']"
          :key="option._id ?? option"
          :value="option"
        >{{ option.nickname ?? option }}</option>
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
    :submit="deleteSenderID"
    has-cancel
  >
    <p>Are you sure you want to delete this entry ?</p>
  </modal-box>

  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Sender</th>
        <th>Jalur</th>
        <th>Supplier</th>
        <th>Region</th>
        <th>Operator</th>
        <th></th>
      </tr>
    </thead>
    <tbody class="font-semibold">
      <tr v-for="country in itemsPaginated" :key="country.id">
        <td data-label="ID">{{ country._id }}</td>
        <td data-label="Sender">{{ country.senderID }}</td>
        <td data-label="Jalur">{{ country.jalur }}</td>
        <td
          v-if="country.supplier !== undefined"
          data-label="Supplier"
        >{{ country.supplier.supplier }}</td>
        <td v-else data-label="Supplier">-</td>
        <td data-label="Region">{{ country.region.toUpperCase() }}</td>
        <td data-label="Operator">{{ country.operator.nickname }}</td>
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
  name: "SenderIDTable",
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
      const res = await store.dispatch("fetchSenderIDs");

      //console.log(res, "tes");
      // //console.log(this.$route, "test");
      // fillChartData();
      // //console.log(this.$store.state.client, "tessc");
    });
    const userData = computed(() =>
      reactive({
        senderID: "",
        region: "",
        operator: "",
        _id: ""
      })
    )
    const clickTrash = (payload) => {
      //console.log(payload, "tesr")

      userData.value._id = payload._id


      isModalDeleteActive.value = true
    }
    const deleteSenderID = () => {
      //console.log(userData.value, "delete country")

      const loginUrl =
        process.env.VUE_APP_BASE_URL +
        "api/operators/deleteSenderid/" + userData.value._id + "/";
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
              title: "Delete SenderID!",
              text: "Success",
              icon: "success",
            });
          }
          store.dispatch("fetchSenderIDs");
          isModalDeleteActive.value = false

        })
        .catch((error) => {
          // //console.log(error.response.data.message)
          // // commit("auth_error");
          // // localStorage.removeItem("token");
          // Swal.fire({
          //   title: "Delete SenderID!",
          //   text: error.response.data.message,
          //   icon: "warning",
          // });
          // alert(error.message);
        });
    }
    const clickEye = (payload) => {
      //console.log(payload, "tesr")
      userData.value.senderID = payload.senderID
      userData.value.operator = payload.operator._id
      userData.value.region = payload.region
      userData.value.jalur = payload.jalur
      userData.value.supplier = payload.supplier
      userData.value._id = payload._id

      isModalActive.value = true
    }
    const putSender = () => {
      //console.log(userData.value)
      let keyword = {
        senderID: userData.value.senderID,
        region: userData.value.region,
        operator: userData.value.operator,
        jalur: userData.value.jalur,
        supplier: userData.value.supplier
      }
      const loginUrl =
        process.env.VUE_APP_BASE_URL +
        "api/operators/editSenderid/" + userData.value._id + "/";
      // commit("auth_request");
      axios
        .put(loginUrl, keyword, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((r) => {
          userData.value.senderID = ""
          userData.value.operator = ""
          userData.value.region = ""
          userData.value.jalur = ""
          userData.value.supplier = ""
          userData.value._id = ""

          if (r.data) {
            Swal.fire({
              title: "EDIT Sender ID!",
              text: "Success",
              icon: "success",
            });
          }
          store.dispatch("fetchSenderIDs");
          isModalActive.value = false

        })
        .catch((error) => {
          // //console.log(error.response.data.message)
          // // commit("auth_error");
          // // localStorage.removeItem("token");
          // Swal.fire({
          //   title: "EDIT Sender ID!",
          //   text: error.response.data.message,
          //   icon: "warning",
          // });
          // alert(error.message);
        });


    }

    store.commit("search", "")
    const items = computed(() => store.state.senderid.filter((admin) => {
      return String(admin.senderID).toLowerCase().includes(store.state.search) ||
        admin.region.toLowerCase().includes(store.state.search) ||
        String(admin.operator.nickname).toLowerCase().includes(store.state.search) ||
        admin._id.toLowerCase().includes(store.state.search)
    }));
    //console.log(store.state.senderid, "tesss");

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
      itemsPaginated,
      pagesList,
      deleteSenderID,
      clickTrash,
      mdiEye,
      clickEye,
      putSender,
      mdiTrashCan,
      userData
    };
  }
};
</script>
