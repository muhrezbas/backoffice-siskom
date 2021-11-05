<template>
  <modal-box v-model="isModalActive" title="Please confirm action" has-cancel>
    <p>
      Lorem ipsum dolor sit amet
      <b>adipiscing elit</b>
    </p>
    <p>This is sample modal</p>
  </modal-box>

  <table>
    <thead>
      <tr>
        <th></th>
        <th>Carrier</th>
        <th>Out Msg ID</th>
        <th>In Msg ID</th>
        <th>Customer</th>
        <th style="width: 200px;">SMS In</th>
        <th style="width: 200px;">SMS Out</th>
        <th style="width: 200px;">DLR In</th>
        <th style="width: 200px;">DLR Out</th>
        <th>Sender</th>
        <th>Out Sender</th>
        <th>Receiver</th>
        <th>Operator</th>
        <th>Credit</th>
        <th>Message</th>
        <th>Status</th>
        <th>Type</th>
        <!-- <th></th> -->
      </tr>
    </thead>
    <tbody class="font-semibold">
      <tr v-for="sms in itemsPaginated" :key="sms.id">
        <td>{{ sms.id }}</td>
        <td v-if="sms.protocol != undefined" data-label="Carrier">{{ sms.protocol.supplier }}</td>
        <td v-else data-label="Carrier">-</td>
        <td data-label="Out Msg ID">{{ sms.carrierMsgID }}</td>
        <td data-label="In Msg ID">{{ sms.refno }}</td>
        <td data-label="Customer">{{ sms.client.companyName }}</td>
        <td data-label="SmsIn">{{ formatDate(sms.smsIn) }}</td>
        <td data-label="SmsOut">{{ formatDate(sms.smsOut) }}</td>
        <td
          v-if="sms.statusSms !== undefined && sms.statusSms.code == 0"
          data-label="DlrIn"
        >{{ formatDate(sms.dlrIn) }}</td>
        <td v-else data-label="DlrIn">-</td>
        <td
          v-if="sms.statusSms !== undefined && sms.statusSms.code == 0"
          data-label="DlrOut"
        >{{ formatDate(sms.createdAt) }}</td>
        <td v-else data-label="DlrOut">-</td>
        <td data-label="Sender">{{ sms.masking }}</td>
        <td data-label="OutSender">{{ sms.masking }}</td>
        <td data-label="Receiver">{{ sms.msisdn }}</td>
        <td data-label="Operator" v-if="sms.prize !== null">{{ sms.prize.operator.name }}</td>
        <td data-label="Credit" v-if="sms.prize !== null">{{ sms.prize.total }}</td>
        <td data-label="Message">{{ sms.message }}</td>
        <td data-label="Status" v-if="sms.statusSms !== undefined">
          <!-- <p v-if="sms.status == 0" class="text-red-700">Error</p> -->
          <p
            v-if="sms.statusSms !== undefined && sms.statusSms.code == 0"
            class="text-blue-300"
          >{{ sms.statusSms.label }}</p>
          <p v-else class="text-red-700">{{ sms.statusSms["label"] }}</p>
        </td>
        <td data-label="Type" v-if="sms.prize !== null">
          <!-- <p>{{ sms.prize }}</p> -->
          <p v-if="sms.prize.akun == 'otp'" class="text-yellow-500">OTP</p>
          <p v-if="sms.prize.akun == 'reg'" class="text-blue-500">SMS Blast</p>
        </td>
        <!-- <td class="actions-cell">
        <jb-buttons type="justify-start lg:justify-end" no-wrap>
          <jb-button class="mr-3" color="info" :icon="mdiEye" small @click="isModalActive = true" />
        </jb-buttons>
        </td>-->
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
  name: "SmsTable",
  components: {
    ModalBox,
    Level,
    JbButtons,
    JbButton,
  },
  props: ["sms"],
  setup(props) {
    const store = useStore();
    if (props.sms !== undefined) {
      console.log(props.sms, "sms dkdkdk");

      const items = computed(() => props.sms.filter((admin) => {
        return admin.message.toLowerCase().includes(store.state.search) ||
          // admin.type.toLowerCase().includes(store.state.search) ||
          String(admin.refno).toLowerCase().includes(store.state.search) ||
          String(admin.msisdn).toLowerCase().includes(store.state.search) ||
          // String(admin.prize.protocol.supplier).toLowerCase().includes(store.state.search) ||
          String(admin.statusSms.label).toLowerCase().includes(store.state.search) ||
          admin._id.toLowerCase().includes(store.state.search)
      }));

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
      const formatDate = (date) => {
        if (date == undefined) {
          return "-"
        }
        else {
          var d = new Date(date.toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear(),
            seconds = d.getSeconds(),
            minutes = d.getMinutes(),
            hour = d.getHours()

          if (month.length < 2)
            month = '0' + month;
          if (day.length < 2)
            day = '0' + day;

          return [year, month, day].join('-') + " " + [hour, minutes, seconds].join(':')
        }

      }

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
        formatDate,
      };
    }
  },
};
</script>
