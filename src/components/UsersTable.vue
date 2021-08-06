<template>
  <modal-box v-model="isModalActive" title="Please confirm action" has-cancel>
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </modal-box>

  <table>
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>SMS ID</th>
        <th>SMS Time</th>
        <th>SMS Date</th>
        <th>Phone</th>
        <th>Words</th>
        <th>Response</th>
      </tr>
    </thead>
    <tbody class="font-semibold">
      <tr v-for="user in itemsPaginated" :key="user.id">
        <td>{{ user.id }}</td>
        <td data-label="Name">{{ user.name }}</td>
        <td data-label="SmsId">{{ user.sms_id }}</td>
        <td data-label="SmsTime">{{ user.sms_time }}</td>
        <td data-label="SmsDate">{{ user.sms_date }}</td>
        <td data-label="Phone">{{ user.phone }}</td>
        <td data-label="Words">{{ user.words }}</td>
        <td data-label="Response">
          <p v-if="user.response == 1" class="text-green-400">OTP</p>
          <p v-if="user.response == 2" class="text-blue-500">SMS Blast</p>
          <p v-if="user.response == 3" class="text-yellow-500">Pending</p>
          <p v-if="user.response == 4" class="text-red-500">Cancel</p>
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
    JbButton
  },
  setup() {
    const store = useStore();

    const items = computed(() => store.state.users);

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
      currentPage,
      currentPageHuman,
      numPages,
      checkedRows,
      itemsPaginated,
      pagesList,
      mdiEye,
      mdiTrashCan
    };
  }
};
</script>
