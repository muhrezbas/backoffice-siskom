<template>
  <section class="bg-white border-b border-gray-100 p-6">
    <level>
      <h1 class="text-3xl font-semibold leading-tight">
        <slot />
      </h1>
      <div v-if="this.$route.name == 'smsdetail'" class="control">
        <input type="text" class="px-3 mr-2 focus:ring rounded" placeholder="Search" />
        <jb-button label="Filter" color="info" @click="confirm" />
      </div>
    </level>
  </section>
</template>

<script>
import { mdiMonitorClean } from '@mdi/js'
import Level from '@/components/Level'
import JbButton from '@/components/JbButton'

export default {
  name: 'HeroBar',
  components: {
    Level,
    JbButton
  },
  setup () {
    return {
      mdiMonitorClean
    }
  }
}
</script>
