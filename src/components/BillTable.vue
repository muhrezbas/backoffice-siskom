<template>
  <modal-box v-model="isModalActive" title="Please confirm action" has-cancel>
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </modal-box>

  <table>
    <thead>
      <tr>
        <th></th>
        <th>Month</th>
        <th>Package</th>
        <th>Currency Name</th>
        <th>Account</th>
        <th>Price</th>
        <th>Amount</th>
        <th>Bill</th>
      </tr>
    </thead>
    <tbody class="font-semibold">
      <tr v-for="packages in itemsPaginated" :key="packages.id">
        <td>{{ packages.id }}</td>
        <td data-label="Month">{{ packages.created }}</td>
        <td data-label="PackageName">{{ packages.package_name }}</td>
        <td data-label="Currency">{{ packages.currency }}</td>
        <td data-label="Account">{{ packages.account }}</td>
        <td data-label="Price">
          Rp {{ packages.price.toLocaleString("id-ID") }}
        </td>
        <td data-label="Amount">x{{ packages.amount }}</td>
        <td data-label="Bill">
          Rp {{ (packages.price * packages.amount).toLocaleString("id-ID") }}
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
  name: "BillTable",
  components: {
    ModalBox,
    Level,
    JbButtons,
    JbButton
  },
  setup() {
    const store = useStore();

    store.commit("search", "")
const items = computed(() => store.state.packages);

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
