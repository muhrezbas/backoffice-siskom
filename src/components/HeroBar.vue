<template>
  <section class="bg-white border-b border-gray-100 p-6">
    <level>
      <h1 class="text-3xl font-semibold leading-tight">
        <slot />
      </h1>
      <div class="flex flex-col control md:flex-row">
        <jb-button
          v-if="param"
          class="w-full md:w-auto"
          label="Set Parameter"
          color="info"
          outline
          @click="paramFunction"
        />
        <div class="flex flex-row justify-between mt-2 md:mt-0">
          <input
            v-if="search"
            type="text"
            class="px-3 mx-0 md:mx-2 focus:ring rounded"
            placeholder="Search"
          />
          <jb-button
            v-if="search"
            class="ml-2 md:ml-0"
            label="Filter"
            color="info"
            @click="searchFunction"
          />
        </div>
        <div class="flex flex-row justify-between mt-2 md:mt-0">
          <jb-button
            v-if="back"
            class="ml-2 md:ml-0"
            label="Back"
            color="info"
            @click="backFunction"
          />
        </div>
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
    back: {
      type: Boolean,
      default: null
    },
    backFunction: Function,
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
