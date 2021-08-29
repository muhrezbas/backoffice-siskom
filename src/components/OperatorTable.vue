<template>
  <modal-box v-model="isModalActive" title="Operator Setting" :submit="putOperator">
    <field label="Company Name">
      <control v-model="userData.name" name="Company Name" required autocomplete="Company Name" />
    </field>

    <field label="Nickname">
      <control v-model="userData.nickname" name="prize" required autocomplete="prize" />
    </field>

    <field label="Country">
      <select v-model="userData.country" class="w-full">
        <option
          v-for="option in $store.state.country"
          :key="option._id ?? option"
          :value="option._id"
        >{{ option.region ?? option }}</option>
      </select>
    </field>
  </modal-box>

  <modal-box
    v-model="isModalDeleteActive"
    title="Please confirm action"
    :submit="deleteOperator"
    has-cancel
  >
    <p>Are you sure you want to delete this entry ?</p>
  </modal-box>

  <table>
    <thead>
      <tr>
        <th></th>
        <th>Company Name</th>
        <th>ID</th>
        <th>Nickname</th>
        <th>Country</th>
        <th></th>
      </tr>
    </thead>
    <tbody class="font-semibold">
      <tr v-for="admins in itemsPaginated" :key="admins.id">
        <td>{{ admins.id }}</td>
        <td data-label="Company Name">{{ admins.name }}</td>
        <td data-label="ID">{{ admins._id }}</td>
        <td data-label="Nickname">{{ admins.nickname }}</td>
        <td data-label="Country" v-if="admins.country !== undefined">{{ admins.country.region }}</td>
        <td data-label="Country" v-else>-</td>
        <td class="actions-cell">
          <jb-buttons type="justify-start lg:justify-end" no-wrap>
            <jb-button class="mr-3" color="info" :icon="mdiEye" small @click="clickEye(admins)" />
            <jb-button
              class="mr-3"
              color="info"
              :icon="mdiTrashCan"
              small
              @click="clickTrash(admins)"
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
  name: "OperatorTable",
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

    const items = computed(() => store.state.operator);

    const isModalActive = ref(false);

    const isModalDeleteActive = ref(false);

    const perPage = ref(10);

    const currentPage = ref(0);

    const checkedRows = ref([]);
    const userData = computed(() =>
      reactive({
        name: "",
        nickname: "",
        country: "",
        _id: ""
      })
    )
    const clickEye = (payload) => {
      console.log(payload, "tesr")
      userData.value.name = payload.name
      userData.value.nickname = payload.nickname
      userData.value.country = payload.country._id
      userData.value._id = payload._id


      isModalActive.value = true
    }
    const clickTrash = (payload) => {
      console.log(payload, "tesr")

      userData.value._id = payload._id


      isModalDeleteActive.value = true
    }
    const deleteOperator = () => {
      console.log(userData.value)

      const loginUrl =
        process.env.VUE_APP_BASE_URL +
        "api/operators/delete/" + userData.value._id + "/";
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
              title: "Delete Operator!",
              text: "Success",
              icon: "success",
            });
          }
          store.dispatch("fetchOperators");
          isModalDeleteActive.value = false

        })
        .catch((error) => {
          console.log(error.response.data.message)
          // commit("auth_error");
          // localStorage.removeItem("token");
          Swal.fire({
            title: "Delete Operator!",
            text: error.response.data.message,
            icon: "warning",
          });
          // alert(error.message);
        });
    }
    const putOperator = () => {
      console.log(userData.value)
      let keyword = {
        name: userData.value.name,
        nickname: userData.value.nickname,
        country: userData.value.country,
      }
      const loginUrl =
        process.env.VUE_APP_BASE_URL +
        "api/operators/update/" + userData.value._id + "/";
      // commit("auth_request");
      axios
        .put(loginUrl, keyword, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((r) => {
          userData.value.name = ""
          userData.value.nickname = ""
          userData.value.country = ""
          userData.value._id = ""

          if (r.data) {
            Swal.fire({
              title: "EDIT Operator!",
              text: "Success",
              icon: "success",
            });
          }
          store.dispatch("fetchOperators");
          isModalActive.value = false

        })
        .catch((error) => {
          console.log(error.response.data.message)
          // commit("auth_error");
          // localStorage.removeItem("token");
          Swal.fire({
            title: "EDIT Operator!",
            text: error.response.data.message,
            icon: "warning",
          });
          // alert(error.message);
        });
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
      clickTrash,
      checkedRows,
      deleteOperator,
      putOperator,
      itemsPaginated,
      clickEye,
      pagesList,
      mdiEye,
      mdiTrashCan,
      userData
    };
  }
};
</script>
