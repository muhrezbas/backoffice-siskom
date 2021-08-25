<template>
  <modal-box v-model="isModalActive" title="User Setting">
    <field label="Tipe Account">
      <control
        v-model="userData.akun"
        name="akun"
        required
        autocomplete="akun"
      />
    </field>

    <field label="Prize">
      <control
        v-model="userData.prize"
        name="prize"
        required
        autocomplete="prize"
      />
    </field>

    <field label="Tax">
      <control v-model="userData.tax" name="tax" required autocomplete="tax" />
    </field>

    <field label="Supplier">
      <control
        v-model="userData.supplier"
        name="supplier"
        required
        autocomplete="supplier"
      />
    </field>

    <field label="Operator">
      <control
        v-model="userData.operator"
        name="operator"
        required
        autocomplete="operator"
      />
    </field>
  </modal-box>

  <modal-box
    v-model="isModalDeleteActive"
    title="Please confirm action"
    has-cancel
  >
    <p>Are you sure you want to delete this entry ?</p>
  </modal-box>

  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Tipe Account</th>
        <th>Prize</th>
        <th>Tax</th>
        <th>Supplier</th>
        <th>Operator</th>
        <th></th>
      </tr>
    </thead>
    <tbody class="font-semibold">
      <tr v-for="country in itemsPaginated" :key="country.id">
        <td>{{ country._id }}</td>
        <td data-label="Kode">{{ country.akun }}</td>
        <td data-label="Kode">{{ country.total }}</td>
        <td data-label="Kode">{{ country.tax }}</td>
        <td data-label="Kode">{{ country.protocol.supplier }}</td>
        <!-- <td data-label="Kode">{{ country.akun }}</td> -->
        <td data-label="Kode">{{ country.operator.name }}</td>
        <td class="actions-cell">
          <jb-buttons type="justify-start lg:justify-end" no-wrap>
            <jb-button
              class="mr-3"
              color="info"
              :icon="mdiEye"
              small
              @click="isModalActive = true"
            />
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
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
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
      const res = await store.dispatch("fetchPrize");

      console.log(res, "tes");
      // console.log(this.$route, "test");
      // fillChartData();
      // console.log(this.$store.state.client, "tessc");
    });

    const items = computed(() => store.state.prize);
    console.log(store.state.prize, "tesss");

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
      mdiEye,
      mdiTrashCan,
      userData: {
        akun: "",
        prize: "",
        tax: "",
        supplier: "",
        operator: ""
      }
    };
  }
};
</script>
