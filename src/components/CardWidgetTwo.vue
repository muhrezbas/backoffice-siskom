<template>
  <card-component mb="">
    <level mobile>
      <div>
        <h3 class="text-lg leading-tight text-gray-500">
          {{ label }}
        </h3>
        <h1 class="text-3xl leading-tight font-semibold">
          <growing-number
            :value="numberOne"
            :prefix="prefixOne"
            :suffix="suffix"
          />
        </h1>
        <h1 class="leading-tight font-semibold mt-5">
          <growing-number
            :value="numberTwo"
            :prefix="prefixTwo"
            :suffix="suffix"
          />
        </h1>
      </div>
      <div>
        <div class="py-5"></div>
        <div class="py-5"></div>
        <jb-button type="submit" :icon="icon" color="success" label="Topup" />
      </div>
    </level>
  </card-component>
</template>

<script>
/* eslint-disable */
import CardComponent from "@/components/CardComponent";
import GrowingNumber from "@/components/GrowingNumber";
import Icon from "@/components/Icon";
import Level from "@/components/Level";
import JbButton from "@/components/JbButton";

export default {
  name: "CardWidget",
  components: { GrowingNumber, CardComponent, Icon, Level, JbButton },
  props: {
    icon: {
      type: String,
      default: null
    },
    numberOne: {
      type: Number,
      default: 0
    },
    numberTwo: {
      type: Number,
      default: 0
    },
    prefixOne: {
      type: String,
      default: null
    },
    prefixTwo: {
      type: String,
      default: null
    },
    suffix: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: null
    }
  }
};
</script>
