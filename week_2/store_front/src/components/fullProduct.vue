<template>
  <div class="w-full">
    <div
      class="shadow hover:shadow-lg  w-full p-6 flex items-center justify-between"
    >
      <div
        class="w-64 h-64 bg-center bg-cover"
        :style="'background-image: url(' + prdData.img + ')'"
      ></div>
      <div class="flex-1 py-3 px-6 text-left">
        <div class="text-2xl ">
          {{ prdData.name }}
        </div>
        <div >{{ prdData.desc }} </div>
        <div>$ {{ prdData.price }}</div>
        <div>Avg rating: {{ avgRate }}
          <font-awesome-icon v-for="n in avgRate" icon="star" :key="n"></font-awesome-icon>
        </div>
        <div>Available: {{ prdData.availability }}</div>
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
  </div>
</template>

<script>
export default {
  name: "fullProduct",
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
          tmp += this.prdData.rateList[idx].val;
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
