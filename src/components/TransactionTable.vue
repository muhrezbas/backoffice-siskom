<template>
  <modal-box v-model="isModalActive" title="Please confirm action" has-cancel>
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </modal-box>

  <table>
    <thead>
      <tr>
        <th></th>
        <th>Date</th>
        <th>Total</th>
        <th>Action</th>
        <th>Package</th>
        <th>Remark</th>
      </tr>
    </thead>
    <tbody class="font-semibold">
      <tr v-for="transaction in itemsPaginated" :key="transaction.id">
        <td>{{ transaction._id }}</td>
        <td data-label="Created">{{ transaction.createdAt }}</td>
        <td data-label="TopupCredit">
          {{ transaction.jumlah.toLocaleString("id-ID") }}
        </td>
        <td data-label="Action">{{ transaction.action }}</td>
        <td data-label="PackageType">{{ transaction.package }}</td>
        <td v-if="transaction.remark" data-label="Remark">
          {{ transaction.remark }}
        </td>
        <td v-else data-label="Remark">-</td>
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
  name: "TransactionTable",
  components: {
    ModalBox,
    Level,
    JbButtons,
    JbButton,
  },
  setup() {
    const store = useStore();

    store.commit("search", "")
const items = computed(() => store.state.transaction.filter((admin) => {
      return  String(admin.jumlah).toLowerCase().includes(store.state.search) ||
        String(admin.action).toLowerCase().includes(store.state.search) ||
        admin._id.toLowerCase().includes(store.state.search)
    }));
    //console.log(store.state.transaction, "nana");
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
      mdiTrashCan,
    };
  },
};
</script>
