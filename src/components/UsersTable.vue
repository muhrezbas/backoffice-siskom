<template>
  <modal-box v-model="isModalActive" title="Please confirm action" has-cancel>
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </modal-box>

  <table>
    <thead>
      <tr>
        <!-- <th></th> -->
        <th>Company Name</th>
        <th>ID Company</th>
        <th>Username</th>
        <th>Company Address</th>
        <th>Phone</th>
        <th>Name PIC</th>
        <th>Contact PIC</th>
        <th>WhiteListIp</th>
        <th>finance Email</th>
        <th>Notification Email</th>
      </tr>
    </thead>
    <tbody class="font-semibold">
      <tr
        v-for="user in itemsPaginated"
        :key="user._id"
        @click="goTo(user._id)"
      >
        <!-- <router-link :to="'/client/' + user._id"> -->
        <!-- <td>{{ user._id }}</td> -->
        <td data-label="Company Name">{{ user.companyName }}</td>
        <td data-label="ID Company">{{ user._id }}</td>
        <td data-label="username">{{ user.username }}</td>
        <td data-label="Company Address">{{ user.companyAddress }}</td>
        <td data-label="Phone">{{ user.companyNumber }}</td>
        <td data-label="Name PIC">{{ user.namePic }}</td>
        <td data-label="Contact PIC">{{ user.contactPic }}</td>
        <td data-label="WhiteListIp">{{ user.whiteListIp }}</td>
        <td data-label="finance Email">{{ user.financeEmail }}</td>
        <td data-label="Notification Email">{{ user.notifEmail }}</td>
        <!-- </router-link> -->
        <!-- <td data-label="Response">
          <p v-if="user.response == 1" class="text-green-400">OTP</p>
          <p v-if="user.response == 2" class="text-blue-500">SMS Blast</p>
          <p v-if="user.response == 3" class="text-yellow-500">Pending</p>
          <p v-if="user.response == 4" class="text-red-500">Cancel</p>
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
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { mdiEye, mdiTrashCan } from "@mdi/js";
import ModalBox from "@/components/ModalBox";
import Level from "@/components/Level";
import JbButtons from "@/components/JbButtons";
import JbButton from "@/components/JbButton";

export default {
  name: "UsersTable",
  components: {
    ModalBox,
    Level,
    JbButtons,
    JbButton,
  },
  methods: {
    goTo(payload) {
      //console.log("hello");
      this.$router.push({
        path: `/admin/client/${payload}`,
      });
    },
  },
  setup() {
    const store = useStore();
    store.dispatch("fetchClients");

    const items = computed(() => store.state.clients);
    //console.log(items, "tess");

    const isModalActive = ref(false);

    const perPage = ref(10);

    const currentPage = ref(0);

    const checkedRows = ref([]);

    const itemsPaginated = computed(() =>
      items.value.slice(
        perPage.value * currentPage.value,
        perPage.value * (currentPage.value + 1)
      )
    );
    //console.log(itemsPaginated, "tess item");
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
    //console.log(pagesList, "test");

    return {
      isModalActive,
      currentPage,
      currentPageHuman,
      numPages,
      checkedRows,
      itemsPaginated,
      pagesList,
      mdiEye,
      mdiTrashCan,
    };
  },
};
</script>
