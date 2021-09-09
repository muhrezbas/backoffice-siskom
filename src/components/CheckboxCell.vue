<template>
  <component :is="type" class="checkbox-cell">
    <label class="checkbox">
      <input type="checkbox" v-model="checked">
      <span class="check"></span>
    </label>
  </component>
</template>

<script>
export default defineComponent({
name: 'CheckboxCell',
});
</script>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    type: {
      type: String,
      default: 'td'
    }
  });

const checked = ref(false)

    watch(checked, newVal => {
      emit('checked', newVal)
    })
</script>
