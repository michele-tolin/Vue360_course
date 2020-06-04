<template>
  <div class="about">
    <div
      v-if="cartList && Object.values(cartList).length"
      class="flex flex-col items-center justify-start"
    >
      <h1>
        This is the check out page where all your basket products are listed
      </h1>
      <!-- //todo To ask to Erik... why if i use the keep-alive then the v-for stops at first one?
      <keep-alive>
        <component :is="'lineProduct'"
                   v-for="prd in filteredList"
                   :key="prd.id"
                   :prd-data="prd"></component>

      </keep-alive>-->
      <component
        :is="'lineCartProduct'"
        v-for="prd in cartList"
        :key="prd.id"
        :prd-data="prd"
      ></component>
    </div>
    <div v-else>
      <div class="p-3">Your cart is empty</div>
      <router-link to="/" class="underline"
        >Search by product typology</router-link
      >
    </div>
  </div>
</template>
<script>
import Loading from "../components/Loading";
import Error from "../components/Error";
const LineCartProduct = () => ({
  component: import(
    /* webpackChunkName: "lineProduct" */ "../components/lineCartProduct"
  ),
  loading: Loading,
  error: Error
});
export default {
  components: {
    LineCartProduct
  },
  props: {
    cartList: {
      type: Object,
      default: () => {}
    }
  }
};
</script>
