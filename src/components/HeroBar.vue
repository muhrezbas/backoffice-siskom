<template>
  <section class="bg-white border-b border-gray-100 p-6">
    <level>
      <h1 class="text-3xl font-semibold leading-tight">
        <slot />
      </h1>
      <div class="control">
        <!-- <jb-button
          v-if="param"
          label="Set Parameter"
          color="info"
          outline
          @click="paramFunction"
        /> -->
        <input
          v-if="search"
          type="text"
          class="px-3 mx-2 focus:ring rounded"
          placeholder="Search"
        />
        <jb-button
          v-if="search"
          label="Filter"
          color="info"
          @click="searchFunction"
        />
      </div>
    </level>
  </section>
</template>

<script>
/* eslint-disable */
import { mdiMonitorClean } from "@mdi/js";
import Level from "@/components/Level";
import JbButton from "@/components/JbButton";

export default {
  name: "HeroBar",
  components: {
    Level,
    JbButton
  },
  props: {
    param: {
      type: Boolean,
      default: null
    },
    search: {
      type: Boolean,
      default: null
    },
    paramFunction: Function,
    searchFunction: Function
  },
  setup() {
    return {
      mdiMonitorClean
    };
  }
};
</script>
