<template>
  <modal-box v-model="isModalActive" title="User Setting">
    <field label="Name">
      <control
        v-model="userData.name"
        name="name"
        required
        autocomplete="name"
      />
    </field>

    <field label="ID Admin">
      <control
        v-model="userData.admin_id"
        name="admin_id"
        required
        autocomplete="admin_id"
      />
    </field>

    <field label="Nickname">
      <control
        v-model="userData.gender"
        name="gender"
        required
        autocomplete="gender"
      />
    </field>

    <field label="Phone">
      <control
        v-model="userData.phone"
        name="phone"
        required
        autocomplete="phone"
      />
    </field>

    <field label="Email">
      <control
        v-model="userData.email"
        name="email"
        required
        autocomplete="email"
      />
    </field>

    <field label="Division">
      <control
        v-model="userData.division"
        name="division"
        required
        autocomplete="division"
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
        <th></th>
        <th>Company Name</th>
        <th>ID</th>
        <th>Nickname</th>
        <th></th>
      </tr>
    </thead>
    <tbody class="font-semibold">
      <tr v-for="admins in itemsPaginated" :key="admins.id">
        <td>{{ admins.id }}</td>
        <td data-label="Company Name">{{ admins.name }}</td>
        <td data-label="ID">{{ admins._id }}</td>
        <td data-label="Nickname">{{ admins.nickname }}</td>
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
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { mdiEye, mdiTrashCan } from "@mdi/js";
import ModalBox from "@/components/ModalBox";
import Field from "@/components/Field";
import Control from "@/components/Control";
import Level from "@/components/Level";
import JbButtons from "@/components/JbButtons";
import JbButton from "@/components/JbButton";

export default {
  name: "OperatorTable",
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

    const items = computed(() => store.state.operator);

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
        name: "",
        admin_id: "",
        gender: "",
        phone: "",
        email: "",
        division: ""
      }
    };
  }
};
</script>
