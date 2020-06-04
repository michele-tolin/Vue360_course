<template>
  <div class="about">
    <h1>This is the product full view</h1>

    <full-product @add="addToCart" :prd-data="currentProduct"></full-product>

    <div class="w-1/2 mt-6 p-3 shadow mx-auto">
      <router-link :to="/product/+$route.params.id+'/history'" class="underline">View rating history</router-link>
      <router-view :history="currentProduct.rateList"></router-view>
    </div>

  </div>
</template>
<script>
import fullProduct from "../components/fullProduct";
export default {

  components: {
    fullProduct
  },
  props: {
    productList: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    currentProduct: function () {
      var product = {};
      for (var idx = 0; idx < this.productList.length; idx++) {

        if (this.productList[idx].id === this.$route.params.id) {
          product = this.productList[idx];
          break;
        }
      }
      return product;
    }
  },
  methods: {
    addToCart(value) {
        this.$emit("add", value);
    }
  }
};
</script>
