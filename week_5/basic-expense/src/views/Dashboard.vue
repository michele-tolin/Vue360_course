<template>
  <div class="shadow m-6 p-6">
    <div
      class="w-64 mx-auto"
      v-for="(catData, catIdx) in filteredList"
      :key="catIdx + catData.color"
    >
      <ProgressBar
        :color="randomColor(catIdx)"
        :percent="((catData.tot * 100) / getTotalOutputs['tot']).toFixed(2)"
      >
        <div>{{ catIdx }}</div>
      </ProgressBar>
    </div>
    <div
      class="hidden bg-gray-500 bg-gray-200 text-gray-600 bg-red-500 bg-red-200 text-red-600 bg-orange-500 bg-orange-200 text-orange-600 bg-yellow-500 bg-yellow-200 text-yellow-600 bg-green-500 bg-green-200 text-green-600 bg-teal-500 bg-teal-200 text-teal-600 bg-blue-500 bg-blue-200 text-blue-600 bg-indigo-500 bg-indigo-200 text-indigo-600 bg-purple-500 bg-purple-200 text-purple-600 bg-pink-500 bg-pink-200 text-pink-600"
    >
      I know.. but is for purge
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

import ProgressBar from "@/components/ProgressBar.vue";

export default {
  components: {
    ProgressBar
  },
  computed: {
    ...mapGetters(["getTotalOutputs"]),
    filteredList() {
      const tmp = { ...this.getTotalOutputs };
      delete tmp["tot"];
      for (const i in tmp) {
        tmp[i] = { tot: tmp[i], color: this.randomColor() };
      }
      return tmp;
    }
  },
  methods: {
    randomColor() {
      const colors = [
        "gray",
        "red",
        "orange",
        "yellow",
        "green",
        "teal",
        "blue",
        "indigo",
        "purple",
        "pink"
      ];

      // selecting random color
      const rndColor = colors[Math.floor(Math.random() * colors.length)];

      return rndColor;
    }
  }
};
</script>
