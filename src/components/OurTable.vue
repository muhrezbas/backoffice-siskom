<template>
  <modal-box v-model="isModalActive" title="Edit Country" :submit="putCountry">
    <field label="Label">
      <control v-model="userData.label" name="label" required autocomplete="label" />
    </field>

    <field label="Kode">
      <control v-model="userData.code" name="code" required autocomplete="code" />
    </field>
     <!-- <field label="Status SMS">
      <control v-model="userData.statusSms" name="statusSms" required autocomplete="statusSms" />
    </field> -->
    <card-component has-table>
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Description</th>
              <th>Permission</th>
              <th></th>
            </tr>
          </thead>
          <tbody class="font-semibold">
            <tr v-for="admins in userData.permission" :key="admins.id">
              <td data-label="Feature">{{ admins.code }}</td>
              <td data-label="Description">{{ admins.name }}</td>
              <td class="actions-cell h-0">
                <jb-buttons type="justify-start lg:justify-start" no-wrap>
                  <!-- {{admins.check}} -->

                  <control
                    v-model="admins.statusSms"
                    name="check"
                    type="checkbox"
                    required
                    autocomplete="check"
                  />
                </jb-buttons>
              </td>
            </tr>
          </tbody>
        </table>
      </card-component>

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
        <th>Status Sistem</th>
        <th>code</th>
        <th>label</th>
        <th>status SMPP</th>
        <!-- <th>Paid</th> -->
        <th></th>
      </tr>
    </thead>
    <tbody class="font-semibold">
      <!-- {{JSON.stringify($store.state.submit)}} -->
      <tr v-for="country in itemsPaginated" :key="country._id">
        <td>{{ country._id }}</td>
         <td data-label="Status"><p v-for="status in country.statusSms" :key="status._id"> {{status.label}}</p></td>
         <td data-label="Kode">{{ country.code }}</td>
        <td data-label="Label">{{ country.label }}</td>
         <td data-label="SMPP">{{ country.dlr }}</td>
        <!-- <td data-label="Paid">{{ country.paid }}</td> -->
        <!-- <td data-label="Region">{{ country.region.toUpperCase() }}</td> -->
        <!-- <td class="actions-cell">
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
        </td> -->
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
    const userData = computed(() =>
      reactive({
        kode: "",
        region: "",
        _id: ""
      })
    )
    onMounted(async () => {
      console.log('halo bandung')
      const res = await store.dispatch("fetchOur");
      console.log(store.state.our, "submit")
      //console.log(res, "tes");
      // //console.log(this.$route, "test");
      // fillChartData();
      // //console.log(this.$store.state.client, "tessc");
    });
    const clickEye = (payload) => {
      //console.log(payload, "tesr")
      userData.value.kode = payload.kode
      userData.value.region = payload.region
      userData.value._id = payload._id

      isModalActive.value = true
    }
    const clickTrash = (payload) => {
      //console.log(payload, "tesr")

      userData.value._id = payload._id


      isModalDeleteActive.value = true
    }
    const deleteCountry = () => {
      //console.log(userData.value, "delete country")

      const loginUrl =
        process.env.VUE_APP_BASE_URL +
        "api/operators/deleteCountry/" + userData.value._id + "/";
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
              title: "Delete Country!",
              text: "Success",
              icon: "success",
            });
          }
          store.dispatch("fetchCountrys");
          isModalDeleteActive.value = false

        })
        .catch((error) => {
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
    }
    const putCountry = () => {
      //console.log(userData.value)
      let keyword = {
        kode: userData.value.kode,
        region: userData.value.region
      }
      const loginUrl =
        process.env.VUE_APP_BASE_URL +
        "api/operators/editCountry/" + userData.value._id + "/";
      // commit("auth_request");
      axios
        .put(loginUrl, keyword, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((r) => {
          userData.value.kode = ""
          userData.value.region = ""
          userData.value._id = ""

          if (r.data) {
            Swal.fire({
              title: "EDIT Country!",
              text: "Success",
              icon: "success",
            });
          }
          store.dispatch("fetchCountrys");
          isModalActive.value = false

        })
        .catch((error) => {
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


    }

    store.commit("search", "")
const items = computed(() => store.state.our.filter((admin) => {
      return String(admin.label).toLowerCase().includes(store.state.search) ||
        String(admin.code).toLowerCase().includes(store.state.search) ||
        // admin.paid.toLowerCase().includes(store.state.search) ||
        admin._id.toLowerCase().includes(store.state.search)
    }));
    console.log(items.value, "fna");

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
    console.log(itemsPaginated.value)

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
