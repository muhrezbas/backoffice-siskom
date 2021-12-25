<template>
  <modal-box v-model="isModalActive" title="Edit Country" :submit="putCountry">
    <field label="Name">
      <control
        v-model="userData.protocol"
        name="name"
        required
        autocomplete="name"
      />
    </field>
    <field label="TPS">
      <control v-model="userData.tps" name="tps" required autocomplete="tps" />
    </field>
  </modal-box>

  <modal-box
    v-model="isModalDeleteActive"
    title="Please confirm action"
    :submit="deleteCountry"
    has-cancel
  >
    <p>Are you sure you want to delete this entry ?</p>
  </modal-box>

  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>TPS</th>
        <th>Protocol</th>
        <!-- <th></th> -->
      </tr>
    </thead>
    <tbody class="font-semibold">
      <tr v-for="country in itemsPaginated" :key="country.id">
        <td v-if="country.bind == false" style="background-color :#F2DEDF">
          {{ country._id }}
        </td>
        <td v-else style="background-color :#DCF2C9">{{ country._id }}</td>
        <td
          v-if="country.bind == false"
          style="background-color :#F2DEDF"
          data-label="TPS"
        >
          {{ country.tps }}
        </td>
        <td v-else style="background-color :#DCF2C9" data-label="TPS">
          {{ country.tps }}
        </td>
        <td
          v-if="country.bind == false"
          data-label="Name"
          style="background-color :#F2DEDF"
        >
          {{ country.protocol }}
        </td>
        <td v-else data-label="Name" style="background-color :#DCF2C9">
          {{ country.protocol }}
        </td>

        <td class="actions-cell">
          <jb-buttons type="justify-start lg:justify-end" no-wrap>
            <jb-button
              class="mr-3"
              color="info"
              :icon="mdiEye"
              small
              @click="clickEye(country)"
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
import Swal from "sweetalert2";
import axios from "axios";
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
    const userData = computed(() =>
      reactive({
        protocol: "",
        tps: "",
        _id: ""
      })
    );
    onMounted(async () => {
      console.log("hello frm supplier");
      const res = await store.dispatch("fetchProtocol");

      //console.log(res, "tes");
      // //console.log(this.$route, "test");
      // fillChartData();
      // //console.log(this.$store.state.client, "tessc");
    });
    const clickEye = payload => {
      //console.log(payload, "tesr")
      userData.value.protocol = payload.protocol;
      userData.value.tps = payload.tps;
      userData.value._id = payload._id;

      isModalActive.value = true;
    };
    const clickTrash = payload => {
      //console.log(payload, "tesr")

      userData.value._id = payload._id;

      isModalDeleteActive.value = true;
    };
    const deleteCountry = () => {
      //console.log(userData.value, "delete country")

      const loginUrl =
        process.env.VUE_APP_BASE_URL +
        "api/operators/deleteCountry/" +
        userData.value._id +
        "/";
      // commit("auth_request");
      axios
        .delete(loginUrl, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(r => {
          if (r.data) {
            Swal.fire({
              title: "Delete Country!",
              text: "Success",
              icon: "success"
            });
          }
          store.dispatch("fetchCountrys");
          isModalDeleteActive.value = false;
        })
        .catch(error => {
          // //console.log(error.response.data.message)
          // // commit("auth_error");
          // // localStorage.removeItem("token");
          // Swal.fire({
          //   title: "Delete Country!",
          //   text: error.response.data.message,
          //   icon: "warning",
          // });
          // alert(error.message);
        });
    };
    const putCountry = () => {
      console.log(userData.value);
      let keyword = {
        protocol: userData.value.protocol,
        tps: userData.value.tps
      };
      const loginUrl =
        process.env.VUE_APP_BASE_URL +
        "api/users/editProtocol/" +
        userData.value._id;
      // commit("auth_request");
      axios
        .put(loginUrl, keyword, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(r => {
          userData.value.protocol = "";
          userData.value.tps = "";
          userData.value._id = "";

          if (r.data) {
            Swal.fire({
              title: "EDIT Supplier!",
              text: "Success",
              icon: "success"
            });
          }
          store.dispatch("fetchProtocol");
          isModalActive.value = false;
        })
        .catch(error => {
          // //console.log(error.response.data.message)
          // // commit("auth_error");
          // // localStorage.removeItem("token");
          // Swal.fire({
          //   title: "EDIT Country!",
          //   text: error.response.data.message,
          //   icon: "warning",
          // });
          // alert(error.message);
        });
    };

    store.commit("search", "");
    const items = computed(() =>
      store.state.protocol.filter(admin => {
        return (
          String(admin.protocol)
            .toLowerCase()
            .includes(store.state.search) ||
          // admin.email.toLowerCase().includes(store.state.search) ||
          admin.supplier.toLowerCase().includes(store.state.search) ||
          admin._id.toLowerCase().includes(store.state.search)
        );
      })
    );
    //console.log(items, "fna");

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
      clickEye,
      clickTrash,
      mdiEye,
      deleteCountry,
      mdiTrashCan,
      putCountry,
      userData
    };
  }
};
</script>
