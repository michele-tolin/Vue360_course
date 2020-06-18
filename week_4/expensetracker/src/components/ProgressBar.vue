<template>
  <div>
    <div class="relative pt-1">
      <div class="flex mb-2 items-center justify-between">
        <div>
          <span
            class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full"
            :class="lightClass+textClass"
          >
            <slot></slot>
          </span>
        </div>
        <div class="text-right">
          <span class="text-xs font-semibold inline-block" :class="textClass">{{percent}}%</span>
        </div>
      </div>
      <div class="overflow-hidden h-2 mb-4 text-xs flex rounded" :class="lightClass">
        <div
          :style="'width:'+percent+'%'"
          class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
          :class="currentClass"
        ></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "ProgressBar",
  props: {
    color: String,
    percent: String
  },
  computed: {
    currentClass() {
      return "bg-" + this.color + "-500 ";
    },
    lightClass() {
      return "bg-" + this.color + "-200 ";
    },
    textClass() {
      return "text-" + this.color + "-600 ";
    }
  }
});
</script>