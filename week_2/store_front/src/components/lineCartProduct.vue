<template>
  <div
    class="shadow hover:shadow-lg  m-6 w-full sm:w-2/3 lg:w-1/2 flex items-center justify-between"
  >
    <div
      class="w-16 h-16 bg-center bg-cover"
      :style="'background-image: url(' + prdData.img + ')'"
    ></div>
    <div class="flex-1 py-3 px-6 text-left">
      <div class="text-2xl">{{ prdData.name }}</div>
      <div>
        Quantity: {{ prdData.qty }}
        <font-awesome-icon
          v-for="n in avgRate"
          icon="star"
          :key="n"
        ></font-awesome-icon>
      </div>
    </div>
    <div class="p-3 text-xl">$ {{ prdData.price * prdData.qty }}</div>
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
            availability: 0,
          };
        },
      },
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
      },
    },
  };
</script>

<style scoped></style>
