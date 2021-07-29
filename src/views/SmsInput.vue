<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>SMS Input</hero-bar>
  <main-section>
    <card-component title="SMS Details KPI" :icon="mdiBallot" @submit.prevent="submit" form>
      <div class="mb-2">
        <span class="block font-bold mb-2">Attachments</span>
        <div class="relative h-40 rounded-lg border-dashed border-2 border-gray-200 bg-white flex justify-center items-center hover:cursor-pointer">
            <div class="absolute">
                <div class="flex flex-col items-center "> <i class="fa fa-cloud-upload fa-3x text-gray-200"></i> <span class="block text-gray-400 font-normal">Attach you files here</span> <span class="block text-gray-400 font-normal">or</span> <span class="block text-blue-400 font-normal">Browse files</span> </div>
            </div> <input type="file" class="h-full w-full opacity-0" name="" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" @change="uploadFile">
            </div>
        <div class="flex justify-between items-center text-gray-400"> <span>Accepted file type: excel only</span> <span class="flex items-center "><i class="fa fa-lock mr-1"></i> secure</span> </div>
      </div>

      <divider/>
    <field label="SMS Wording" help="Max 255 characters">
        <control type="textarea" placeholder="Input your sms wording here..."/>
      </field>
      <jb-buttons>
        <jb-button type="submit" color="info" label="Submit" />
        <jb-button type="reset" color="info" outline label="Reset" />
      </jb-buttons>
    </card-component>
  </main-section>
</template>

<script>
import { ref, reactive } from 'vue'
import { mdiBallot, mdiBallotOutline, mdiAccount, mdiMail, mdiCheck } from '@mdi/js'
import MainSection from '@/components/MainSection'
import TitleBar from '@/components/TitleBar'
import CardComponent from '@/components/CardComponent'
import HeroBar from '@/components/HeroBar'
import Field from '@/components/Field'
import Control from '@/components/Control'
import Divider from '@/components/Divider.vue'
import JbButton from '@/components/JbButton'
import JbButtons from '@/components/JbButtons'

export default {
  name: 'SmsInput',
  components: {
    Divider,
    MainSection,
    HeroBar,
    CardComponent,
    TitleBar,
    Field,
    Control,
    JbButton,
    JbButtons
  },
  setup () {
    const titleStack = ref(['Admin', 'SMS Input'])

    const form = reactive({
      file: null,
      smsWording: ''
    })

    const uploadFile = (event) => {
      console.log(event.target.files)
    }

    const submit = () => {
      //
    }

    return {
      titleStack,
      form,
      submit,
      uploadFile,
      mdiBallot,
      mdiBallotOutline,
      mdiAccount,
      mdiMail,
      mdiCheck
    }
  }
}
</script>
