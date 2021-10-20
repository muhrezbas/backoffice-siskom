<template>
  <section class="bg-white border-b border-gray-100 p-6">
    <level>
      <h1 class="text-3xl font-semibold leading-tight">
        <slot />
      </h1>
      <div class="flex flex-col control md:flex-row">
        <jb-button
          v-if="confirm"
          class="w-full md:w-auto mr-5"
          label="Confirm"
          color="success"
          outline
          @click="csvFunction"
        />

        <div v-if="csv" class="flex items-stretch justify-start relative">
          <label class="inline-flex">
            <jb-button
              as="a"
              label="Upload"
              :icon="mdiUpload"
              color="info"
              :class="{ 'rounded-r-none': file }"
            />
            <input
              type="file"
              ref="input"
              class="absolute top-0 left-0 w-full h-full opacity-0 outline-none cursor-pointer -z-1"
              :accept="accept"
              @input="upload"
            />
          </label>
          <div v-if="file">
            <span
              class="inline-flex px-4 py-2 justify-center bg-gray-100 border-gray-200 border rounded-r"
            >{{ file.name }}</span>
          </div>
        </div>
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
            v-model="userData.search"
            class="px-3 mx-0 md:mx-2 focus:ring rounded"
            placeholder="Search"
          />
          <jb-button
            v-if="search"
            class="ml-2 md:ml-0"
            label="Filter"
            color="info"
            @click="mencari"
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
import { ref } from 'vue'
import { mdiMonitorClean } from "@mdi/js";
import { mdiUpload } from '@mdi/js'
import { useStore } from "vuex";
import Level from "@/components/Level";
import JbButton from "@/components/JbButton";
import { computed, reactive } from "vue";

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
    csv: {
      type: Boolean,
      default: null
    },
    confirm: {
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
    modelValue: [Object, File, Array],
    label: String,
    icon: String,
    accept: {
      type: String,
      default: null
    },
    backFunction: Function,
    paramFunction: Function,
    searchFunction: Function,
    csvFunction: Function
  },
  emits: ['update:modelValue'],
  setup(props) {
    const file = ref(props.modelValue)
    const store = useStore();
    const userData = computed(() =>
      reactive({
        search: ""
      })
    )
    const mencari = () => {
      console.log('search')
      console.log(userData.value.search)
      store.commit("search", userData.value.search.toLowerCase())
    }
    return {
      mdiMonitorClean,
      userData,
      file,
      mdiUpload,
      mencari
    };
  },
  methods: {
    upload(event) {
      const value = event.target.files || event.dataTransfer.files

      this.file = value[0]
      this.$emit('update:modelValue', this.file)

      // Use this as an example for handling file uploads
      // let formData = new FormData()
      // formData.append('file', this.file)

      // axios
      //   .post(window.routeMediaStore, formData, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data'
      //     },
      //     onUploadProgress: this.progressEvent
      //   })
      //   .then(r => {
      //
      //   })
      //   .catch(err => {
      //
      //   })
    }//,
    // progressEvent (progressEvent) {
    //   this.uploadPercent = Math.round(
    //     (progressEvent.loaded * 100) / progressEvent.total
    //   )
    // }
  },
  watch: {
    modelValue(value) {
      this.file = value

      if (!value) {
        this.$refs.input.value = null
      }
    }
  }
};
</script>
