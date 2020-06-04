<template>
  <div>
    <div v-if="currentFilter && currentFilter != 'All'">
      ProductList for {{ currentFilter }}
    </div>
    <div v-else>
      All products
    </div>

    <div v-if="filteredList" class="flex flex-col items-center justify-start">
      <!-- //todo To ask to Erik... why if i use the keep-alive then the v-for stops at first one?
<keep-alive>
  <component :is="'lineProduct'"
             v-for="prd in filteredList"
             :key="prd.id"
             :prd-data="prd"></component>

</keep-alive>-->
      <component
        :is="'lineProduct'"
        v-for="prd in filteredList"
        :key="prd.id"
        :prd-data="prd"
        @add="addToCart"
      ></component>
    </div>
  </div>
</template>

<script>
import Loading from "../components/Loading";
import Error from "../components/Error";
const LineProduct = () => ({
  component: import(
    /* webpackChunkName: "lineProduct" */ "../components/lineProduct"
  ),
  loading: Loading,
  error: Error
});

//import LineProduct from "../components/lineProduct";
export default {
  name: "ProductList",

  components: {
    LineProduct
  },

  props: {
    categories: {
      type: Array,
      default: () => []
    },
    productList: {
      type: Array,
      default: () => []
    }
  },

  data: () => {
    return {};
  },

  computed: {
    //check filter real existence
    currentFilter: function() {
      var filter = "";
      if (this.categories.length) {
        for (var idx = 0; idx < this.categories.length; idx++) {
          if (this.$route.params.filter === this.categories[idx].id) {
            filter = this.$route.params.filter;
            break;
          }
        }
      }
      return filter;
    },

    //return the list filtered by category
    filteredList: function() {
      var tmp = [];
      if (this.productList.length) {
        if (this.currentFilter && this.currentFilter !== "All") {
          for (var idx = 0; idx < this.productList.length; idx++) {
            if (this.productList[idx].cat === this.currentFilter) {
              tmp.push(this.productList[idx]);
            }
          }
        } else {
          tmp = this.productList;
        }
      }
      return tmp;
    }
  },

  methods: {
    addToCart(value) {
      this.$emit("add", value);
    }
  }
};
</script>

<style scoped></style>
