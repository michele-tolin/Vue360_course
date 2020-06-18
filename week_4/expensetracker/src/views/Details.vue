<template>
  <div class="shadow m-6 text-left">
    <div class="p-3 text-2xl">Detailed expense list</div>
    <div
      class="grid grid-cols-3 bg-gray-200 text-gray-600 p-3 uppercase shadow"
    >
      <div>category</div>
      <div>item</div>
      <div class="text-right">euro</div>
    </div>
    <div
      v-for="(expence, idx) in getExpenceList"
      :key="idx"
      class="grid grid-cols-3  p-3 shadow-xs"
    >
      <div class="font-bold">{{ expence.category }}</div>
      <div>{{ expence.item }}</div>
      <div class="text-right">{{ parseFloat(expence.euro).toFixed(2) }} €</div>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import { mapGetters } from "vuex";

  export default Vue.extend({
    computed: {
      ...mapGetters(["getExpenceList"]),
    },
  });
</script>
