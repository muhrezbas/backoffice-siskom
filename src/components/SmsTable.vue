<template>
  <modal-box v-model="isModalActive" title="Please confirm action" has-cancel>
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </modal-box>

  <table>
    <thead>
    <tr>
      <th></th>
      <th>Supplier ID</th>
      <th>SMS ID</th>
      <th>SMS Time</th>
      <th>SMS Date</th>
      <th>Phone No.</th>
      <th>Words</th>
      <th>Status</th>
      <th>Type</th>
      <th></th>
    </tr>
    </thead>
    <tbody class="font-semibold">
    <tr v-for="sms in itemsPaginated" :key="sms.id">
      <td>{{ sms.id }}</td>
      <td data-label="SupplierID">{{ sms.supplierId }}</td>
      <td data-label="SmsId">{{ sms.smsId }}</td>
      <td data-label="SmsTime">{{ sms.smsTime }}</td>
      <td data-label="SmsDate">{{ sms.smsDate }}</td>
      <td data-label="PhoneNo">{{ sms.phoneNo }}</td>
      <td data-label="Words">{{ sms.words }}</td>
      <td data-label="Status">
          <p v-if="sms.status == 0" class="text-red-700">Error</p>
          <p v-if="sms.status == 1" class="text-blue-300">Success</p>
          <p v-if="sms.status == 2" class="text-purple-700">Pending</p>
      </td>
      <td data-label="Type">
          <p v-if="sms.type == 1" class="text-yellow-500">OTP</p>
          <p v-if="sms.type == 2" class="text-blue-500">SMS Blast</p>
      </td>
      <td class="actions-cell">
        <jb-buttons type="justify-start lg:justify-end" no-wrap>
          <jb-button class="mr-3" color="info" :icon="mdiEye" small @click="isModalActive = true" />
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
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { mdiEye, mdiTrashCan } from '@mdi/js'
import ModalBox from '@/components/ModalBox'
import Level from '@/components/Level'
import JbButtons from '@/components/JbButtons'
import JbButton from '@/components/JbButton'

export default {
  name: 'SmsTable',
  components: {
    ModalBox,
    Level,
    JbButtons,
    JbButton
  },
  setup () {
    const store = useStore()

    const items = computed(() => store.state.sms)

    const isModalActive = ref(false)

    const perPage = ref(10)

    const currentPage = ref(0)

    const checkedRows = ref([])

    const itemsPaginated = computed(
      () => items.value.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 1))
    )

    const numPages = computed(() => Math.ceil(items.value.length / perPage.value))

    const currentPageHuman = computed(() => currentPage.value + 1)

    const pagesList = computed(() => {
      const pagesList = []

      for (let i = 0; i < numPages.value; i++) {
        pagesList.push(i)
      }

      return pagesList
    })

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
    }
  }
}
</script>
