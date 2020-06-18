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
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import { mapGetters } from "vuex";

  import ProgressBar from "@/components/ProgressBar.vue";

  export default Vue.extend({
    components: {
      ProgressBar,
    },
    computed: {
      ...mapGetters(["getTotalOutputs"]),
      filteredList() {
        const tmp: any = { ...this.getTotalOutputs };
        delete tmp["tot"];
        for (const i in tmp) {
          tmp[i] = { tot: tmp[i], color: this.randomColor() };
        }
        return tmp;
      },
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
          "pink",
        ];

        // selecting random color
        const rndColor = colors[Math.floor(Math.random() * colors.length)];

        return rndColor;
      },
    },
  });
</script>
