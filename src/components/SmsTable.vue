<template>
  <modal-box v-model="isModalActive" title="Please confirm action" has-cancel>
    <p>
      Lorem ipsum dolor sit amet
      <b>adipiscing elit</b>
    </p>
    <p>This is sample modal</p>
  </modal-box>

  <div class="overflow-x-auto">
    <table class="table-auto">
      <thead>
        <tr>
          <!-- <th></th> -->
          <th>Carrier</th>
          <th>Coding</th>
          <!-- <th>UDH Length</th> -->
          <th>Out Msg ID</th>
          <th>In Msg ID</th>
          <th>Customer</th>
          <th>SMS In</th>
          <th>SMS Out</th>
          <th>DLR In</th>
          <th>DLR Out</th>
          <th>Sender</th>
          <th>Out Sender</th>
          <th>Receiver</th>
          <th>Operator</th>
          <th>Credit</th>
          <th>Message</th>
          <th>Status Response</th>
          <th>Status Delivery Response</th>

          <th>Status</th>
          <th>Type</th>
          <!-- <th></th> -->
        </tr>
      </thead>
      <tbody class="font-semibold">
        <tr v-for="sms in itemsPaginated" :key="sms.id">
          <!-- <td>{{ sms.id }}</td> -->
          <td
            v-if="sms.protocol != undefined && sms.prize !== null"
            data-label="Carrier"
          >
            {{ sms.protocol.supplier }} {{ sms.prize.akun }}
          </td>
          <!-- <td v-if="sms.protocol != undefined && sms.prize == null" data-label="Carrier">{{ sms.protocol.supplier }}</td> -->
          <td v-else data-label="Carrier"></td>
          <td data-label="Coding">{{ sms.coding }}</td>
          <!-- <td data-label="UDH Length">{{ sms.udh }}</td> -->
          <td data-label="Out Msg ID">{{ sms.carrierMsgID }}</td>
          <td data-label="In Msg ID">{{ sms.refno }}</td>
          <td data-label="Customer">{{ sms.client.companyName }}</td>
          <td data-label="SmsIn">{{ formatDate(sms.smsIn) }}</td>
          <td data-label="SmsOut">{{ formatDate(sms.smsOut) }}</td>
          <td data-label="DlrIn">{{ formatDate(sms.dlrIn) }}</td>
          <td data-label="DlrOut">{{ formatDate(sms.dlrOut) }}</td>
          <td data-label="Sender">{{ sms.masking }}</td>
          <td data-label="OutSender">{{ sms.masking }}</td>
          <td data-label="Receiver">{{ sms.msisdn }}</td>
          <td data-label="Operator" v-if="sms.prize !== null">
            {{ sms.prize.operator.name }}
          </td>
          <td data-label="Credit" v-if="sms.prize !== null">
            {{ sms.prize.total }}
          </td>
          <td data-label="Message">{{ sms.message }}</td>
          <td data-label="Status Response" v-if="sms.submitSms !== undefined">
            {{ sms.submitSms.label }}, {{ sms.submitSms.code }}
          </td>
          <td data-label="Status Response" v-else>-</td>
          <td
            data-label="Status Delivery Response"
            v-if="sms.statusDelivery !== undefined"
          >
            {{ sms.statusDelivery.label }}, {{ sms.statusDelivery.code }}
          </td>
          <td data-label="Status Delivery Response" v-else>-</td>
          <td data-label="Status" v-if="sms.statusDelivery !== undefined">
            <p v-if="sms.statusDelivery.code === '00'" class="text-blue-300">
              Success
            </p>
            <p
              v-else-if="sms.statusDelivery.code === '01'"
              class="text-yellow-500"
            >
              Pending
            </p>
            <p v-else class="text-red-700">Fail</p>
          </td>
          <td data-label="Status" v-else>
            <p class="text-yellow-500">
              Pending
            </p>
          </td>
          <td data-label="Type" v-if="sms.prize !== null">
            <!-- <p>{{ sms.prize }}</p> -->
            <p
              v-if="sms.prize !== null && sms.prize.akun == 'premium'"
              class="text-yellow-500"
            >
              OTP
            </p>
            <p
              v-if="sms.prize !== null && sms.prize.akun == 'reguler'"
              class="text-blue-500"
            >
              SMS Blast
            </p>
          </td>
          <!-- <td class="actions-cell">
        <jb-buttons type="justify-start lg:justify-end" no-wrap>
          <jb-button class="mr-3" color="info" :icon="mdiEye" small @click="isModalActive = true" />
        </jb-buttons>
        </td>-->
        </tr>
      </tbody>
    </table>
  </div>
  <div class="flex justify-between p-4">
    <select
      style="width:150px; margin-right: 25px"
      v-model="perPage"
      class="w-full"
    >
      <option
        v-for="option in [10, 25, 50, 100]"
        :key="option"
        :value="option"
        >{{ option }}</option
      >
    </select>
    <level>
      <jb-buttons>
        <!-- <jb-button
          v-for="page in pagesList"
          @click="currentPage = page"
          :active="page === currentPage"
          :label="page + 1"
          :key="page"
          small
        /> -->
        <jb-button :label="'<<'" @click="currentPage = pagesList[0]" />
        <jb-button
          v-if="currentPage === 0"
          :label="1"
          :active="pagesList[0] === currentPage"
          @click="currentPage = pagesList[0]"
        />
        <jb-button
          v-if="currentPage === 0"
          :label="2"
          :active="pagesList[1] === currentPage"
          @click="currentPage = pagesList[1]"
        />
        <jb-button
          v-if="currentPage === 0"
          :label="3"
          :active="pagesList[2] === currentPage"
          @click="currentPage = pagesList[2]"
        />
        <jb-button
          v-if="
            currentPage < pagesList[pagesList.length - 1] && currentPage > 0
          "
          :label="currentPage"
          @click="currentPage = currentPage - 1"
        />
        <jb-button
          v-if="
            currentPage < pagesList[pagesList.length - 1] && currentPage > 0
          "
          :label="currentPage + 1"
          :active="currentPage"
        />
        <jb-button
          v-if="
            currentPage < pagesList[pagesList.length - 1] && currentPage > 0
          "
          :label="currentPage + 2"
          @click="currentPage = currentPage + 1"
        />
        <jb-button
          v-if="currentPage === pagesList[pagesList.length - 1]"
          :label="pagesList[pagesList.length - 2]"
          @click="currentPage = pagesList[pagesList.length - 3]"
        />
        <jb-button
          v-if="currentPage === pagesList[pagesList.length - 1]"
          :label="pagesList[pagesList.length - 1]"
          @click="currentPage = pagesList[pagesList.length - 2]"
        />
        <jb-button
          v-if="currentPage === pagesList[pagesList.length - 1]"
          :label="pagesList[pagesList.length - 1] + 1"
          :active="pagesList[pagesList.length - 1] === currentPage"
        />
        <jb-button
          :label="'>>'"
          @click="currentPage = pagesList[pagesList.length - 1]"
        />
      </jb-buttons>
      <small class="pl-4">Page {{ currentPageHuman }} of {{ numPages }}</small>
    </level>
  </div>
</template>

<script>
/* eslint-disable */
import { computed, ref, reactive } from "vue";
import { useStore } from "vuex";
import { mdiEye, mdiTrashCan } from "@mdi/js";
import ModalBox from "@/components/ModalBox";
import Level from "@/components/Level";
import JbButtons from "@/components/JbButtons";
import JbButton from "@/components/JbButton";

export default {
  name: "SmsTable",
  components: {
    ModalBox,
    Level,
    JbButtons,
    JbButton
  },
  props: ["sms"],
  setup(props) {
    const store = useStore();
    if (props.sms !== undefined) {
      console.log(props.sms, "sms dkdkdk");

      const items = computed(() =>
        props.sms.filter(admin => {
          return (
            admin.message.toLowerCase().includes(store.state.search) ||
            // admin.type.toLowerCase().includes(store.state.search) ||
            String(admin.refno)
              .toLowerCase()
              .includes(store.state.search) ||
            String(admin.msisdn)
              .toLowerCase()
              .includes(store.state.search) ||
            // String(admin.prize.protocol.supplier).toLowerCase().includes(store.state.search) ||
            String(admin.statusSms.label)
              .toLowerCase()
              .includes(store.state.search) ||
            admin._id.toLowerCase().includes(store.state.search)
          );
        })
      );

      // const countPages = 10
      const isModalActive = ref(false);
      const countPages = computed(() =>
        reactive({
          data: 10
        })
      );
      console.log(countPages.value, "values");
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
      const formatDate = date => {
        if (date == undefined) {
          return "-";
        } else {
          var d = new Date(
              date.toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })
            ),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            year = d.getFullYear(),
            seconds = d.getSeconds(),
            minutes = d.getMinutes(),
            hour = d.getHours();

          if (month.length < 2) month = "0" + month;
          if (day.length < 2) day = "0" + day;

          return (
            [year, month, day].join("-") +
            " " +
            [hour, minutes, seconds].join(":")
          );
        }
      };

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
        countPages,
        mdiEye,
        perPage,
        mdiTrashCan,
        formatDate
      };
    }
  }
};
</script>
