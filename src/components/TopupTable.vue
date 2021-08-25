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
        <!-- <th>Type</th> -->
        <th>Package</th>
        <th>Topup Credit</th>
        <!-- <th>Removed Credit</th> -->
        <th>Remark</th>
        <!-- <th>Payment Method</th> -->
      </tr>
    </thead>
    <tbody class="font-semibold">
      <tr v-for="topup in itemsPaginated" :key="topup.id">
        <td>{{ topup._id }}</td>
        <td data-label="Created">{{ topup.createdAt }}</td>
        <td data-label="Package">{{ topup.package }}</td>
        <td v-if="topup.jumlah" data-label="TopupCredit">
          {{ topup.jumlah.toLocaleString("id-ID") }}
        </td>
        <td v-else data-label="TopupCredit">-</td>
        <!-- <td v-if="topup.topup_credit_removed" data-label="TopupCreditRemoved">
          {{ topup.topup_credit_removed }}
        </td>
        <td v-else data-label="TopupCreditRemoved">-</td> -->
        <!-- <td data-label="PackageDate">{{ topup.package_date }}</td> -->
        <!-- <td data-label="Remark">{{ topup.remark }}</td> -->
        <td v-if="topup.remark" data-label="Remark">
          {{ transaction.remark }}
        </td>
        <td v-else data-label="Remark">-</td>
        <!-- <td v-if="topup.payment_method == 1" data-label="PaymentMethod">
          <img
            class="w-20"
            src="https://statik.tempo.co/data/2019/04/23/id_836405/836405_720.jpg"
          />
        </td>
        <td v-if="topup.payment_method == 2" data-label="PaymentMethod">
          <img
            class="w-20"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/BANK_BRI_logo.svg/2560px-BANK_BRI_logo.svg.png"
          />
        </td>
        <td v-if="topup.payment_method == 3" data-label="PaymentMethod">
          <img
            class="w-20"
            src="https://logos-download.com/wp-content/uploads/2016/06/Bank_Mandiri_logo_white_bg.png"
          />
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
  name: "TopupTable",
  components: {
    ModalBox,
    Level,
    JbButtons,
    JbButton,
  },
  setup() {
    const store = useStore();

    const items = computed(() => store.state.topUp);

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
