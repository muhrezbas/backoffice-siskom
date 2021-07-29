<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>SMS Detail List</hero-bar>
  <main-section>

    <card-component has-table>
      <sms-table checkable/>
    </card-component>

  </main-section>
</template>

<script>
import { ref } from 'vue'
import { mdiMonitorCellphone, mdiAccountMultiple, mdiTableBorder, mdiTableOff } from '@mdi/js'
import MainSection from '@/components/MainSection'
import SmsTable from '@/components/SmsTable'
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'

export default {
  name: 'SMS Detail',
  components: {
    MainSection,
    HeroBar,
    TitleBar,
    CardComponent,
    SmsTable
  },
  setup () {
    const titleStack = ref(['Admin', 'SMS Detail'])

    return {
      titleStack,
      mdiMonitorCellphone,
      mdiAccountMultiple,
      mdiTableBorder,
      mdiTableOff
    }
  }
}
</script>
