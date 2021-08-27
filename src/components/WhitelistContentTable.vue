<template>
  <modal-box v-model="isModalActive" title="User Setting" :submit="putWhitelistContent">
    <field label="code keyword">
      <control v-model="userData.code" name="code" required autocomplete="code" />
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
  </modal-box>

  <modal-box v-model="isModalDeleteActive" title="Please confirm action" has-cancel>
    <p>Are you sure you want to delete this entry ?</p>
  </modal-box>

  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>code code</th>
        <th>Client</th>
        <th></th>
      </tr>
    </thead>
    <tbody class="font-semibold">
      <tr v-for="country in itemsPaginated" :key="country.id" :v-if="country !== undefined">
        <td>{{ country._id }}</td>
        <td data-label="code">{{ country.code }}</td>
        <td data-label="Client">{{ country.client.companyName }}</td>
        <td class="actions-cell">
          <jb-buttons type="justify-start lg:justify-end" no-wrap>
            <jb-button class="mr-3" color="info" :icon="mdiEye" small @click="clickEye(country)" />
            <jb-button
              class="mr-3"
              color="info"
              :icon="mdiTrashCan"
              small
              @click="isModalDeleteActive = true"
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
      const res = await store.dispatch("fetchWhitelistContent");
      const tes = await store.dispatch("fetchClients");
      console.log(res, tes, "tes");
      // console.log(this.$route, "test");
      // fillChartData();
      // console.log(this.$store.state.client, "tessc");
    });

    const items = computed(() => store.state.whitelistContent);
    const userData = computed(() =>
      reactive({
        code: "",
        client: "",
        _id: ""
      })
    )
    const clickEye = (payload) => {
      console.log(payload, "tesr")
      userData.value.code = payload.code
      userData.value.client = payload.client._id
      userData.value._id = payload._id


      isModalActive.value = true
    }
    const putWhitelistContent = () => {
      console.log(userData.value)
      let keyword = {
        code: userData.value.code,
        client: userData.value.client
      }
      const loginUrl =
        process.env.VUE_APP_BASE_URL +
        "api/operators/editWhitelistContent/" + userData.value._id + "/";
      // commit("auth_request");
      axios
        .put(loginUrl, keyword, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((r) => {
          userData.value.code = ""
          userData.value.client = ""
          userData.value._id = ""

          if (r.data) {
            Swal.fire({
              title: "EDIT Whitelist Contents!",
              text: "Success",
              icon: "success",
            });
          }
          store.dispatch("fetchWhitelistContent");
          isModalActive.value = false

        })
        .catch((error) => {
          console.log(error.response.data.message)
          // commit("auth_error");
          // localStorage.removeItem("token");
          Swal.fire({
            title: "EDIT Whitelist Contents!",
            text: error.response.data.message,
            icon: "warning",
          });
          // alert(error.message);
        });
    }
    console.log(store.state.client, "tess nnannan")
    console.log(store.state.country.Country, "tesss");

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
      putWhitelistContent,
      pagesList,
      clickEye,
      mdiEye,
      mdiTrashCan,
      userData
    };
  }
};
</script>
