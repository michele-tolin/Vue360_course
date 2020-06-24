<template>
  <div>
    <button
      class="font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
      type="button"
      style="transition: all .15s ease"
      :class="classes"
    >
      <slot></slot>
    </button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "CustomButton",
  props: {
    type: String
  },
  computed: {
    classes() {
      const tmp = {
        bg: "",
        txt: ""
      };
      switch (this.type) {
        case "secondary":
          tmp.bg = "bg-gray-500  active:bg-gray-600";
          tmp.txt = "text-white";
          break;

        default:
          tmp.bg = "bg-orange-500 active:bg-orange-600";
          tmp.txt = "text-white";
      }
      return Object.values(tmp).join(" ");
    }
  }
});
</script>
