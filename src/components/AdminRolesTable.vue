<template>
  <modal-box v-model="isModalActive" title="Admin Setting" :submit="putAdmin">
    <div
      class="overflow-y-auto overflow-x-hidden max-h-paramMobile md:max-h-paramDesktop :max-h-paramDesktop"
    >
      <!-- <field label="Group">
      <div class="flex justify-center">
        <control
          class="w-full mr-4"
          v-model="userData.name"
          name="name"
          required
          autocomplete="name"
        />
        <jb-buttons type="justify-start lg:justify-end" no-wrap>
          <jb-button
            class="mr-3"
            color="success"
            :icon="mdiPencilBoxOutline"
            small
            @click="isModalActive = true"
          />
          <jb-button
            class="mr-3"
            color="danger"
            :icon="mdiTrashCan"
            small
            @click="isModalDeleteActive = true"
          />
        </jb-buttons>
      </div>
      </field>-->
      <field label="Name">
        <control v-model="userData.name" name="name" required autocomplete="name" />
      </field>
      <field label="Code">
        <control v-model="userData.code" name="code" required autocomplete="code" />
      </field>

      <field label="Description">
        <control
          type="textarea"
          v-model="userData.description"
          name="description"
          required
          autocomplete="description"
        />
      </field>
      <!-- {{$store.state.AdminUnsel}} -->
      <!-- {{"tess"}} -->
      <!-- <field label="Admin Code">
      <control v-model="userData.adminCode" name="adminCode" required autocomplete="adminCode" />
      </field>-->
      <!-- {{ userData.select}} -->
      <div class="flex flex-wrap -mx-3 mb-6">
        <field label="AVAILABLE USER" class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <button
            type="button"
            v-for="admins in userData.unselect"
            :key="admins._id"
            @click="clickAdmin(admins)"
            class="px-4 py-3 bg-blue-600 rounded-md text-white outline-none hover:bg-blue-700 hover:shadow-lg focus:ring-4 shadow-lg transform active:scale-x-75 transition-transform flex flex-row justify-center"
          >
            <span class="mr-3">{{ admins.name }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          </button>
          <!-- <control v-model="userData.email" name="email" required autocomplete="email" /> -->
        </field>
        <field label="SELECTED USER" class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <button
            type="button"
            v-for="admins in userData.select"
            :key="admins._id"
            @click="clickAdminSelect(admins)"
            class="px-4 py-3 border border-blue-600 rounded-md text-blue-600 focus:outline-none hover:bg-blue-50 hover:shadow-lg focus:ring-4 shadow-lg transform active:scale-x-75 transition-transform flex flex-row justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
            <span class="ml-3">{{ admins.name }}</span>
          </button>
          <!-- <control v-model="userData.email" name="email" required autocomplete="email" /> -->
        </field>
      </div>
      <!-- {{ userData.permission}} -->
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
                    v-model="admins.check"
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
    </div>
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
        <th>ID Roles</th>
        <th>Admin Roles Code</th>

        <th></th>
      </tr>
    </thead>
    <tbody class="font-semibold">
      <tr v-for="admins in itemsPaginated" :key="admins.id">
        <td>{{ admins.id }}</td>
        <td data-label="Name">{{ admins.name }}</td>
        <td data-label="ID Roles">{{ admins._id }}</td>
        <td data-label="Admin Roles Code">{{ admins.code }}</td>
        <!-- <td data-label="Phone">{{ admins.phone }}</td> -->
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
      await store.dispatch("fetchAdminRoles");
      // await store.dispatch("fetchAdminPermissions");

    })
    store.commit("search", "")
const items = computed(() => store.state.adminRoles.filter((admin) => {
      return admin.name.toLowerCase().includes(store.state.search) ||
        admin.code.toLowerCase().includes(store.state.search) ||
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
        description: "",
        idRole: "",
        unselect: [],
        permission: [],
        permissionOld: [],
        select: [],
        password: "",

      })
    )
    const dataOld = {
      unselectOld: [],
      permissionOld: [],
      selectOld: []
    }
    const clickTrash = (payload) => {
      console.log(payload, "tesr")

      userData.value._id = payload._id


      isModalDeleteActive.value = true
    }
    const putAdmin = async () => {
      let post = {
        "adminRolesName": userData.value.name,
        "adminRolesCode": userData.value.code,
        "idRole": userData.value.idRole,
        "adminSelected": [],
        "adminUnselected": [],
        "adminPermissionSelect": [],
        "adminPermissionUnselect": [],

      }
      await store.dispatch("fetchAdminUnsel");
      // post.adminUc
      userData.value.select.forEach(element => {
        post.adminSelected.push(element._id)
      });
      userData.value.unselect.forEach(element => {
        post.adminUnselected.push(element._id)
      });

      console.log(post.adminUnselected, "before", userData.value.unselect)
      // userData.value.unselect.forEach(element => {
      //   post.adminUnselected.push(element._d)
      // });
      // userData.value.select.forEach(element => {
      //   userData.value.selectOld.forEach(element2 => {
      //     if (String(element._id) == String(element2._id)) {
      //       userData.value.select.splice(j, 1);
      //       len2 = b.length;
      //       // post.adminSelected.push(element._id)
      //     }
      //   });
      // });
      // let dataDiremove = userData.value.select
      console.log(dataOld.selectOld, 'old')
      function remove_duplicates(a, b) {
        let dataIndex = []
        for (var i = 0, len = a.length; i < len; i++) {
          for (var j = 0, len2 = b.length; j < len2; j++) {
            if (a[i]._id === b[j].admin._id) {
              // b.splice(j, 1);
              // userData.value.selectOld.splice(j,1)
              console.log(a[i]._id, b[j].admin._id)
              dataIndex.push(j)
              // len2 = b.length;
            }


          }


        }
        return dataIndex
      }
      function remove_duplicatess(a, b) {
        let dataIndex = []
        for (var i = 0, len = a.length; i < len; i++) {
          for (var j = 0, len2 = b.length; j < len2; j++) {
            if (a[i]._id === b[j]._id) {
              // b.splice(j, 1);
              // userData.value.selectOld.splice(j,1)
              console.log(a[i]._id, b[j]._id, "unselet")
              dataIndex.push(j)
              // len2 = b.length;
            }


          }


        }
        return dataIndex
      }
      // let newArr = [...post.adminSelected]
      let index = remove_duplicates(userData.value.select, store.state.AdminWithRoles.admin)
      index.forEach((element, i) => {
        post.adminSelected.splice(element - i, 1)
        // console.log(test2)
        // adminSelected.push(userData.adminSelected.slice)

      });
      console.log(store.state.AdminUnsel.unselect, "emg ini ad")
      let indexUn = remove_duplicatess(userData.value.unselect, store.state.AdminUnsel.unselect)
      indexUn.forEach((element, i) => {
        post.adminUnselected.splice(element - i, 1)
        // console.log(test1)
        // adminSelected.push(userData.adminSelected.slice)

      });
      console.log(index, "idex", indexUn)
      // userData.value.unselect.forEach(element => {
      //   userData.value.unselectOld.forEach(element2 => {
      //     if (String(element._id) == String(element2._id)) {

      //       // post.adminUnselected.push(element._id)
      //     }
      //   });

      // });
      // console.log(dataOld.permissionOld, userData.value.permission)
      var props = ['name', '_id', 'code'];

      var result = userData.value.permission.filter(function (o1) {
        // filter out (!) items in result2
        return !store.state.AdminWithRoles.permission.some(function (o2) {
          // console.log()
          // console.log(String(o1._id),String(o2._id))
          return String(o1._id) == String(o2.adminPermission._id);          // assumes unique id
        });
      }).map(function (o) {
        // use reduce to make objects with only the required properties
        // and map to apply this to the filtered array as a whole
        return props.reduce(function (newo, name) {
          newo[name] = o[name];
          return newo;
        }, {});
      });

      console.log(result, "stic after")
      userData.value.permission.forEach(element => {
        result.forEach(element2 => {
          if (String(element._id) == String(element2._id)) {
            if (element.check == true) {
              post.adminPermissionSelect.push(element2._id)

              // console.log(String(element2._id))
            }

          }
        });

      });
      userData.value.permission.forEach((element, i) => {
        store.state.AdminWithRoles.permission.forEach((element2, j) => {
          if (String(element._id) == String(element2.adminPermission._id)) {
            if (element.check == false) {
              post.adminPermissionUnselect.push(element._id)
              console.log(element)
              // if (element.check !== element2.check) {
              //   post.adminPermissionUnselect.push(element._id)
              // }
            }
          }
        });

      });

      console.log(post)
      // console.log({
      //   "adminRolesName": "Super-Root",
      //   "adminRolesCode": "SR",
      //   "adminSelected": [],
      //   "adminUnselected": [],
      //   "adminPermissionSelect": ["612256f892109f04618b6bc3"],
      //   "adminPermissionUnselect": []
      // })
      const loginUrl =
        process.env.VUE_APP_BASE_URL +
        "api/admins/addEditAdminPermission/";
      // commit("auth_request");
      axios
        .post(loginUrl, post, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((r) => {
          userData.value.name = ""
          userData.value.description = ""
          userData.value.unselect = []
          userData.value.permission = []
          userData.value.select = []

          if (r.data) {
            Swal.fire({
              title: "EDIT Admin Roles!",
              text: "Success",
              icon: "success",
            });
          }
          store.dispatch("fetchAdminRoles");
          isModalActive.value = false

        })
        .catch((error) => {
          console.log(error.message)
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
          console.log(err, "cas")
          // commit("auth_error");
          // localStorage.removeItem("token");

          Swal.fire({
            title: "EDIT Admin Roles!",
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
          // console.log(error.response.data.message)
          // // commit("auth_error");
          // // localStorage.removeItem("token");
          // Swal.fire({
          //   title: "Delete Admin!",
          //   text: error.response.data.message,
          //   icon: "warning",
          // });
          // alert(error.message);
        });
    }
    const clickAdmin = (payload) => {
      let findThe = userData.value.unselect.findIndex(el => el._id == payload._id)
      userData.value.unselect.splice(findThe, 1)
      userData.value.select.push(payload)
      console.log(findThe)
      console.log(store.state.AdminWithRoles)
    }
    const clickAdminSelect = (payload) => {
      let findThe = userData.value.select.findIndex(el => el._id == payload._id)
      userData.value.select.splice(findThe, 1)
      userData.value.unselect.push(payload)
      console.log(userData.value.unselect, "unselet bro")
      console.log(findThe)
    }
    const itemsPaginated = computed(() =>
      items.value.slice(
        perPage.value * currentPage.value,
        perPage.value * (currentPage.value + 1)
      )
    );
    const clickEye = async (payload) => {
      console.log(payload, "tesr")
      let dataStatic = []
      userData.value.idRole = payload._id
      userData.value.name = payload.name
      userData.value.code = payload.code
      userData.value.permission = []
      await store.dispatch("fetchAdminPermissions");
      await store.dispatch("fetchAdminUnsel");
      await store.dispatch("fetchAdminPermissionWithRoles", payload._id)
      store.state.AdminPermissions.forEach(element => {
        element.check = false
        dataStatic.push(element)
        userData.value.permission.push(element)
      });

      console.log(userData.value.permission, "sbelum peerang")
      console.log(store.state.AdminWithRoles, "admin all")
      let dataSelect = []
      store.state.AdminWithRoles.admin.forEach(element => {
        dataSelect.push(element.admin)
      });
      dataOld.selectOld = dataSelect

      userData.value.select = dataSelect
      userData.value.unselect = []
      console.log(userData.value.select, "sekect")
      // userData.value
      console.log(userData.value.permission, "sbelum")
      console.log(store.state.AdminWithRoles.permission, "uwariad")
      userData.value.permission.forEach(element2 => {
        store.state.AdminWithRoles.permission.forEach(element => {
          // console.log( String(element.adminPermission._id), "sblm if")
          let userID = (element.adminPermission.code)
          let idUser = (element2.code)
          // console.log(idUser, userID)
          // console.log(userID == idUser)
          if (userID == idUser) {
            let findThe = userData.value.permission.findIndex(el => el._id == element2._id)
            // userData.value.permission.splice(findThe, 1)
            dataStatic[findThe].check = true
            userData.value.permission[findThe].check = true
            console.log(findThe)

          }
          else {
            console.log("else")
          }

        });

      });
      //  console.log(store.state.Adminunsel, "posisi skrg")
      userData.value.unselect = store.state.AdminUnsel.unselect
      console.log(userData.value.unselect)
      console.log(userData.value.select)
      dataOld.permissionOld = dataStatic
      // dataOld.selectOld = [...userData.value.permission]
      console.log(dataStatic)


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
      clickAdmin,
      clickAdminSelect,
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
