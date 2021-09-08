<template>
  <modal-box v-model="isModalActive" title="Admin Setting" :submit="putAdmin">
    <field label="Name">
      <control v-model="userData.name" name="name" required autocomplete="name" />
    </field>

    <field label="Username">
      <control v-model="userData.username" name="username" required autocomplete="username" />
    </field>

    <field label="Admin Code">
      <control v-model="userData.adminCode" name="adminCode" required autocomplete="adminCode" />
    </field>

    <field label="Email">
      <control v-model="userData.email" name="email" required autocomplete="email" />
    </field>
  </modal-box>

  <modal-box
    v-model="isModalDeleteActive"
    title="Please confirm action"
    :submit="deleteAdmin"
    has-cancel
  >
    <p>Are you sure you want to delete this entry ?</p>
  </modal-box>

  <table>
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>ID Admin</th>
        <th>Admin Code</th>
        <!-- <th>Phone</th> -->
        <th>Email</th>
        <th></th>
      </tr>
    </thead>
    <tbody class="font-semibold">
      <tr v-for="admins in itemsPaginated" :key="admins.id">
        <td>{{ admins.id }}</td>
        <td data-label="Name">{{ admins.name }}</td>
        <td data-label="AdminId">{{ admins._id }}</td>
        <td data-label="Admin Code">{{ admins.adminCode }}</td>
        <!-- <td data-label="Phone">{{ admins.phone }}</td> -->
        <td data-label="Email">{{ admins.email }}</td>
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
  name: "AdminTable",
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
      await store.dispatch("fetchAdmin");
    })
    store.commit("search", "")
const items = computed(() => store.state.admin.filter((admin) => {
      return admin.name.toLowerCase().includes(store.state.search) ||
        admin.email.toLowerCase().includes(store.state.search) ||
        admin.adminCode.toLowerCase().includes(store.state.search) ||
        admin._id.toLowerCase().includes(store.state.search)
    }));

    const isModalActive = ref(false);

    const isModalDeleteActive = ref(false);

    const perPage = ref(10);

    const currentPage = ref(0);
    // editAdmin
    const checkedRows = ref([]);
    const userData = computed(() =>
      reactive({
        name: "",
        username: "",
        adminCode: "",
        email: ""
      })
    )
    const clickTrash = (payload) => {
      console.log(payload, "tesr")

      userData.value._id = payload._id


      isModalDeleteActive.value = true
    }
    const putAdmin = () => {
      console.log(userData.value)
      let keyword = {
        name: userData.value.name,
        username: userData.value.username,
        adminCode: userData.value.adminCode,
        email: userData.value.email
      }
      const loginUrl =
        process.env.VUE_APP_BASE_URL +
        "api/admins/editAdmin/" + userData.value._id + "/";
      // commit("auth_request");
      axios
        .put(loginUrl, keyword, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((r) => {
          userData.value.name = ""
          userData.value.username = ""
          userData.value.adminCode = ""
          userData.value.email = ""
          userData.value._id = ""

          if (r.data) {
            Swal.fire({
              title: "EDIT Admin!",
              text: "Success",
              icon: "success",
            });
          }
          store.dispatch("fetchAdmin");
          isModalActive.value = false

        })
        .catch((error) => {
          console.log(error.response)
          let err

          if (error.response.status == 403) {
            err = "Not Authorize"
          }
          else if (error.response.data == undefined) {
            err = error.response
          }

          else {
            err = error.response.data.message
          }
          // commit("auth_error");
          // localStorage.removeItem("token");

          Swal.fire({
            title: "EDIT Admin!",
            text: err,
            icon: "warning",
          });
          // alert(error.message);
        });
    }
    const deleteAdmin = () => {
      console.log(userData.value)

      const loginUrl =
        process.env.VUE_APP_BASE_URL +
        "api/admins/deleteAdmin/" + userData.value._id + "/";
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
              title: "Delete Admin!",
              text: "Success",
              icon: "success",
            });
          }
          store.dispatch("fetchAdmin");
          isModalDeleteActive.value = false

        })
        .catch((error) => {
          console.log(error.response.data.message)
          // commit("auth_error");
          // localStorage.removeItem("token");
          Swal.fire({
            title: "Delete Admin!",
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
    const clickEye = (payload) => {
      console.log(payload, "tesr")
      userData.value.name = payload.name
      userData.value.username = payload.username
      userData.value.adminCode = payload.adminCode
      userData.value.email = payload.email
      userData.value._id = payload._id


      isModalActive.value = true
    }

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
      putAdmin,
      deleteAdmin,
      itemsPaginated,
      clickEye,
      pagesList,
      clickTrash,
      mdiEye,
      mdiTrashCan,
      userData
    };
  }
};
</script>
