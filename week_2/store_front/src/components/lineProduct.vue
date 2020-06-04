<template>
  <div
    class="shadow hover:shadow-lg  m-6 w-full sm:w-2/3 lg:w-1/2 flex items-center justify-between"
  >
    <div
      class="w-32 h-32 bg-center bg-cover"
      :style="'background-image: url(' + prdData.img + ')'"
    ></div>
    <div class="flex-1 py-3 px-6 text-left">
      <div class="text-2xl ">
        {{ prdData.name }}
      </div>
      <div @click="goToFull">{{ prdData.desc }} <svg class="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path class="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg></div>
      <div>$ {{ prdData.price }}</div>
      <div>rating: {{ avgRate }}</div>
      <div>available: {{ prdData.availability }}</div>
    </div>
    <div class="w-32 text-right">
      <button
        v-if="prdData.availability > 0"
        class=" text-sm px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-100 rounded whitespace-no-wrap"
        @click="$emit('add', { id: prdData.id })"
      >
        Add to cart
      </button>
      <button
        v-else
        class=" text-sm px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-100 rounded opacity-50 cursor-not-allowed whitespace-no-wrap"
      >
        Out of stock
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "lineProduct",
  props: {
    prdData: {
      type: Object,
      default: () => {
        return {
          img: "https://via.placeholder.com/150?text=Missing+Picture",
          name: "Product main name",
          desc: "Product main description",
          price: 0.0,
          rateList: [],
          availability: 0
        };
      }
    }
  },
  computed: {
    avgRate: function() {
      var tmp = 0;
      if (this.prdData.rateList.length) {
        for (var idx = 0; idx < this.prdData.rateList.length; idx++) {
          tmp += this.prdData.rateList[idx];
        }
        tmp = Math.round(tmp / this.prdData.rateList.length);
      }
      return tmp;
    }
  },
  methods: {
      goToFull: function() {
          this.$router.push({name: 'Product', params: {id: this.prdData.id}});
      }
  }
};
</script>

<style scoped></style>
